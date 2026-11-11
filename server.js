const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 2000;
const ROOT = __dirname;
// shortcut: leads go to a local JSON-lines file; point LEADS_FILE elsewhere or swap for a Sheet/CRM call once sales picks one
const LEADS_FILE = process.env.LEADS_FILE || path.join(ROOT, '.leads', 'leads.jsonl');

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.mp4': 'video/mp4',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.woff2': 'font/woff2',
  '.woff': 'font/woff',
  '.ttf': 'font/ttf'
};

const INTERESTS = ['Price list', 'Site visit', 'Investment advice', 'Plot enquiry', 'Updates'];

// Returns a clean lead, or null if the name or the Indian mobile number is unusable
function validateLead(body) {
  if (!body || typeof body !== 'object') return null;
  const name = String(body.name ?? '').trim().slice(0, 80);
  const phone = String(body.phone ?? '').replace(/\D/g, '').replace(/^(91|0)(?=\d{10}$)/, '');
  if (!name || !/^[6-9]\d{9}$/.test(phone)) return null;
  return {
    at: new Date().toISOString(),
    name,
    phone,
    interest: INTERESTS.includes(body.interest) ? body.interest : 'Call back',
    plot: /^\d{1,3}$/.test(String(body.plot ?? '')) ? String(body.plot) : '',
    message: String(body.message ?? '').replace(/[\u0000-\u001f\u007f]+/g, ' ').trim().slice(0, 500)
  };
}

function sendJson(res, status, obj) {
  res.writeHead(status, { 'Content-Type': 'application/json; charset=utf-8' });
  res.end(JSON.stringify(obj));
}

function handleLead(req, res) {
  let raw = '';
  req.on('data', (chunk) => {
    raw += chunk;
    if (raw.length > 4096) req.destroy();
  });
  req.on('end', () => {
    let lead;
    try { lead = validateLead(JSON.parse(raw)); } catch { lead = null; }
    if (!lead) return sendJson(res, 400, { ok: false, error: 'Name and a 10-digit mobile number are required.' });
    fs.mkdir(path.dirname(LEADS_FILE), { recursive: true }, (mkErr) => {
      if (mkErr) return sendJson(res, 500, { ok: false });
      fs.appendFile(LEADS_FILE, JSON.stringify(lead) + '\n', (err) => {
        if (err) {
          console.error('Lead not saved:', err.message);
          return sendJson(res, 500, { ok: false });
        }
        console.log(`New lead: ${lead.name} ${lead.phone} (${lead.interest}${lead.plot ? `, plot ${lead.plot}` : ''})`);
        sendJson(res, 200, { ok: true });
      });
    });
  });
}

const server = http.createServer((req, res) => {
  let reqUrl;
  try { reqUrl = decodeURI(req.url.split('?')[0]); } catch { reqUrl = ''; }

  if (reqUrl === '/api/enquiry') {
    if (req.method !== 'POST') return sendJson(res, 405, { ok: false });
    return handleLead(req, res);
  }

  if (reqUrl === '/' || reqUrl === '') {
    reqUrl = '/index.html';
  }

  // Never serve dotfiles or dot-folders (.leads, .git, .agents)
  if (reqUrl.split(/[\/\\]/).some((part) => part.startsWith('.'))) {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    return res.end('404 Not Found');
  }

  // Prevent directory traversal
  const safePath = path.normalize(reqUrl).replace(/^(\.\.[\/\\])+/, '');
  const filePath = path.join(ROOT, safePath);

  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('404 Not Found');
      return;
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    // Video partial content (Range requests)
    const range = req.headers.range;
    if (ext === '.mp4' && range) {
      const parts = range.replace(/bytes=/, '').split('-');
      const start = parseInt(parts[0], 10);
      const end = parts[1] ? parseInt(parts[1], 10) : stats.size - 1;

      if (start >= stats.size) {
        res.writeHead(416, { 'Content-Range': `bytes */${stats.size}` });
        return res.end();
      }

      const chunksize = (end - start) + 1;
      const fileStream = fs.createReadStream(filePath, { start, end });
      res.writeHead(206, {
        'Content-Range': `bytes ${start}-${end}/${stats.size}`,
        'Accept-Ranges': 'bytes',
        'Content-Length': chunksize,
        'Content-Type': contentType
      });
      fileStream.pipe(res);
      return;
    }

    res.writeHead(200, {
      'Content-Length': stats.size,
      'Content-Type': contentType,
      'Accept-Ranges': 'bytes',
      // Images rarely change; pages and code must refresh on every visit
      'Cache-Control': safePath.replace(/\\/g, '/').startsWith('/Assets/') ? 'public, max-age=604800' : 'no-cache'
    });
    fs.createReadStream(filePath).pipe(res);
  });
});

if (require.main === module) {
  server.listen(PORT, '0.0.0.0', () => {
    console.log(`MJR Township M2 server running at http://localhost:${PORT}`);
  });
}

module.exports = { validateLead };
