// Location map build (S06). Re-run after changing SITE (the surveyed lat/long) or to refresh map data.
//
// 1. Download the data into an empty folder outside the project (about 12 MB; © OpenStreetMap contributors, ODbL):
//    Q='[out:json][timeout:150];(way["highway"~"^(motorway|trunk|primary)$"](16.0,77.7,17.65,79.18);way["highway"="secondary"](16.45,78.2,16.85,78.75););out geom;'
//    curl -s --data-urlencode "data=$Q" https://overpass-api.de/api/interpreter -o roads.json
//    Q2='[out:json][timeout:120];(way["natural"="water"]["water"~"reservoir|lake"](16.0,77.7,17.65,79.18);relation["natural"="water"]["water"~"reservoir|lake"](16.0,77.7,17.65,79.18);way["waterway"="river"](16.0,77.7,17.65,79.18););out geom;'
//    curl -s --data-urlencode "data=$Q2" https://overpass-api.de/api/interpreter -o water.json
//    # driving route, site to Hyderabad (lon,lat;lon,lat): use the same point as SITE below
//    curl -s "https://router.project-osrm.org/route/v1/driving/78.4682,16.6299;78.4867,17.3850?overview=full&geometries=geojson" -o route-site.json
// 2. node redesign/tools/build-location-map.cjs <data folder> .
// 3. Copy the printed cam0 / cam2 values into the [data-step] .map-cam rules in css/styles.css.
// Builds the S06 location map from OpenStreetMap data (ODbL, "© OpenStreetMap contributors").
// Writes Assets/web/location-basemap.svg and replaces the <svg> inside .loc-map in index.html.
// Usage: node map.cjs <osm data dir> <project root>
const fs = require('fs');
const path = require('path');
const [dataDir, root] = process.argv.slice(2);
const read = (f) => JSON.parse(fs.readFileSync(path.join(dataDir, f), 'utf8'));

// Projection: equirectangular with cos(lat) correction; 600 x 700 frame
const LON0 = 77.7, LAT0 = 17.65, KY = 700 / 1.65, KX = KY * Math.cos(16.8 * Math.PI / 180);
const P = (lat, lon) => [(lon - LON0) * KX, (LAT0 - lat) * KY];
const inFrame = ([x, y], m = 40) => x > -m && x < 600 + m && y > -m && y < 700 + m;

// Douglas-Peucker on projected points
function simplify(pts, tol) {
  if (pts.length < 3) return pts;
  const keep = new Uint8Array(pts.length); keep[0] = keep[pts.length - 1] = 1;
  const stack = [[0, pts.length - 1]];
  while (stack.length) {
    const [a, b] = stack.pop();
    const [x1, y1] = pts[a], [x2, y2] = pts[b];
    const dx = x2 - x1, dy = y2 - y1, len = Math.hypot(dx, dy) || 1;
    let max = 0, idx = -1;
    for (let i = a + 1; i < b; i++) {
      const d = Math.abs(dy * pts[i][0] - dx * pts[i][1] + x2 * y1 - y2 * x1) / len;
      if (d > max) { max = d; idx = i; }
    }
    if (max > tol) { keep[idx] = 1; stack.push([a, idx], [idx, b]); }
  }
  return pts.filter((_, i) => keep[i]);
}
const f1 = (n) => (Math.round(n * 10) / 10).toString();
const toD = (pts, close) => 'M' + pts.map(([x, y]) => f1(x) + ' ' + f1(y)).join('L') + (close ? 'Z' : '');
const area = (pts) => Math.abs(pts.reduce((s, [x, y], i) => { const [x2, y2] = pts[(i + 1) % pts.length]; return s + x * y2 - x2 * y; }, 0) / 2);

// ---------- Water ----------
const water = read('water.json').elements;
const lakes = [], rivers = [];
for (const e of water) {
  if (e.type === 'way' && e.tags.waterway === 'river') {
    const pts = simplify(e.geometry.map((g) => P(g.lat, g.lon)), 0.5);
    if (pts.some((p) => inFrame(p, 0))) rivers.push({ d: toD(pts), major: /krishna|musi|dindi|manjira/i.test(e.tags.name || '') });
  } else if (e.type === 'way' && e.geometry) {
    const pts = simplify(e.geometry.map((g) => P(g.lat, g.lon)), 0.35);
    if (pts.length > 3 && area(pts) > 3 && pts.some((p) => inFrame(p, 0))) lakes.push(toD(pts, true));
  } else if (e.type === 'relation') {
    const rings = (e.members || []).filter((m) => m.role === 'outer' && m.geometry)
      .map((m) => simplify(m.geometry.map((g) => P(g.lat, g.lon)), 0.35)).filter((r) => r.length > 2);
    if (rings.reduce((s, r) => s + area(r), 0) > 3 && rings.some((r) => r.some((p) => inFrame(p, 0)))) {
      // outer members are often open segments of one ring; draw them as one filled path
      lakes.push(rings.map((r) => toD(r)).join('') + 'Z');
    }
  }
}

// ---------- Roads ----------
const roads = read('roads.json').elements;
const cls = { motorway: [], trunk: [], primary: [], secondary: [] };
for (const e of roads) {
  const pts = simplify(e.geometry.map((g) => P(g.lat, g.lon)), 0.45);
  if (pts.length > 1 && pts.some((p) => inFrame(p, 0))) cls[e.tags.highway]?.push(toD(pts));
}
const join = (arr) => arr.join('');

const basemap = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 700" width="600" height="700">
<!-- Base map: © OpenStreetMap contributors (ODbL). Built by redesign tooling; regenerate rather than edit by hand. -->
<rect width="600" height="700" fill="#F5EDE4"/>
<g fill="#CFDFDE" stroke="#BCD2D1" stroke-width=".5">${lakes.map((d) => `<path d="${d}"/>`).join('')}</g>
<g fill="none" stroke-linecap="round" stroke-linejoin="round">
<path stroke="#BED3D2" stroke-width="2.2" d="${join(rivers.filter((r) => r.major).map((r) => r.d))}"/>
<path stroke="#E0CFBF" stroke-width="1.2" d="${join(cls.primary)}"/>
<defs><path id="trunk" d="${join(cls.trunk)}"/><path id="mway" d="${join(cls.motorway)}"/></defs>
<use href="#trunk" stroke="#CDB7A3" stroke-width="3.2"/>
<use href="#trunk" stroke="#FFFFFF" stroke-width="1.9"/>
<use href="#mway" stroke="#BFA48D" stroke-width="3.8"/>
<use href="#mway" stroke="#FFFFFF" stroke-width="2.4"/>
</g>
</svg>
`;
const basemapFile = path.join(root, 'Assets/web/location-basemap.svg');
fs.writeFileSync(basemapFile, basemap);

// ---------- Route (OSRM over OSM), site to Hyderabad ----------
const routeCoords = read('route-site.json').routes[0].geometry.coordinates; // [lon, lat]
const routePts = simplify(routeCoords.map(([lon, lat]) => P(lat, lon)), 0.35);
const routeD = toD(routePts);

// ---------- Places ----------
const place = (lat, lon) => P(lat, lon).map((n) => Math.round(n * 10) / 10);
const SITE = place(16.6299, 78.4682); // shortcut: approximate point on NH 167K about 3 km from Kalwakurthy; replace with the surveyed pin
const towns = {
  hyd: { at: place(17.385, 78.4867), name: 'Hyderabad', big: true, dx: 34, dy: -10, sub: 'Outer Ring Road' },
  air: { at: place(17.2403, 78.4294), name: 'RGI Airport', dx: -12, dy: 4, end: true },
  jad: { at: place(16.763, 78.137), name: 'Jadcherla', dx: 0, dy: -12, mid: true },
  ngk: { at: place(16.4821, 78.3247), name: 'Nagarkurnool', dx: -12, dy: 4, end: true },
  srs: { at: place(16.0733, 78.8686), name: 'Srisailam', dx: -12, dy: 4, end: true },
  aml: { at: place(16.85, 78.53), name: 'Amangal', dx: 12, dy: 4, small: true },
  town: { at: place(16.652, 78.486), name: 'Kalwakurthy', big: true, dx: -26, dy: -6, end: true },
};
const [hx, hy] = towns.hyd.at;
const pin = (k, t) => {
  const [x, y] = t.at;
  const anchor = t.end ? ' text-anchor="end"' : t.mid ? ' text-anchor="middle"' : '';
  const sub = t.sub ? `<text class="m-label m-sub" x="${f1(x + t.dx)}" y="${f1(y + t.dy + 17)}">${t.sub}</text>` : '';
  return `<g class="m-pin pin-${k}"><circle class="m-dot${t.small ? ' is-small' : ''}" cx="${x}" cy="${y}" r="${t.big ? 5.5 : t.small ? 3.5 : 4.5}"/><text class="m-label${t.big ? ' m-big' : ''}${t.small ? ' m-sub' : ''}" x="${f1(x + t.dx)}" y="${f1(y + t.dy)}"${anchor}>${t.name}</text>${sub}</g>`;
};
const [sx, sy] = SITE;
const cx = sx + 16, cy = sy + 10; // callout card top-left: below-right of the pin, clear of the route north
const CW = 214, CH = 60;
const svg = `<svg viewBox="0 0 600 700" role="img" aria-labelledby="locMapTitle">
              <title id="locMapTitle">Map of the area: MJR Township on NH 167K near Kalwakurthy, with the driving route north along the Srisailam highway to Hyderabad's Outer Ring Road and the airport, and Jadcherla, Nagarkurnool and Srisailam nearby</title>
              <defs>
                <radialGradient id="cityGlow"><stop offset="0" stop-color="#E9DCD0" stop-opacity=".95"/><stop offset="1" stop-color="#E9DCD0" stop-opacity="0"/></radialGradient>
                <clipPath id="calloutClip"><rect x="${f1(cx + 6)}" y="${f1(cy + 6)}" width="58" height="${CH - 12}" rx="6"/></clipPath>
                <filter id="calloutShadow" x="-20%" y="-20%" width="140%" height="160%"><feDropShadow dx="0" dy="4" stdDeviation="6" flood-color="#49332C" flood-opacity=".18"/></filter>
              </defs>
              <g class="map-cam">
                <circle cx="${hx}" cy="${hy}" r="62" fill="url(#cityGlow)"/>
                <image href="Assets/web/location-basemap.svg" width="600" height="700"/>
                <path class="m-route-bg" d="${routeD}"/>
                <path class="m-route" pathLength="1" d="${routeD}"/>
                ${Object.entries(towns).map(([k, t]) => pin(k, t)).join('\n                ')}
                <g class="m-pin pin-site">
                  <circle class="m-pulse" cx="${sx}" cy="${sy}" r="9"/>
                  <path class="m-site" d="M${sx} ${sy}c-8-10-12.5-16-12.5-22.5a12.5 12.5 0 0 1 25 0c0 6.5-4.5 12.5-12.5 22.5Z"/>
                  <circle cx="${sx}" cy="${f1(sy - 22.5)}" r="4" fill="#FFFFFF"/>
                  <g class="m-callout" filter="url(#calloutShadow)">
                    <path class="m-callout-tail" d="M${f1(sx + 2)} ${f1(sy + 2)}L${f1(cx + 14)} ${f1(cy + 2)}L${f1(cx + 30)} ${f1(cy + 2)}Z"/>
                    <rect class="m-callout-card" x="${f1(cx)}" y="${f1(cy)}" width="${CW}" height="${CH}" rx="10"/>
                    <image href="Assets/web/location-01-site.webp" x="${f1(cx + 6)}" y="${f1(cy + 6)}" width="58" height="${CH - 12}" preserveAspectRatio="xMidYMid slice" clip-path="url(#calloutClip)"/>
                    <text class="m-callout-title" x="${f1(cx + 76)}" y="${f1(cy + 27)}">MJR Township</text>
                    <text class="m-callout-sub" x="${f1(cx + 76)}" y="${f1(cy + 45)}">NH 167K · Kalwakurthy</text>
                  </g>
                </g>
                <circle class="m-car" cx="${sx}" cy="${sy}" r="6"/>
              </g>
              <g class="m-compass" transform="translate(556 52)"><circle r="20"/><path d="M0-13 5 4 0 1-5 4Z"/><text y="-25" text-anchor="middle">N</text></g>
            </svg>`;

const htmlFile = path.join(root, 'index.html');
let html = fs.readFileSync(htmlFile, 'utf8');
const a = html.indexOf('<svg viewBox="0 0 600 700" role="img" aria-labelledby="locMapTitle">');
const b = html.indexOf('</svg>', a) + 6;
if (a < 0) throw new Error('location map svg not found');
html = html.slice(0, a) + svg + html.slice(b);
html = html.replace(/<!-- shortcut: town positions[^>]*-->/, '<!-- shortcut: the site pin is an approximate point on NH 167K about 3 km from Kalwakurthy; replace SITE in redesign/tools/build-location-map.cjs with the surveyed lat/long and rebuild -->');
fs.writeFileSync(htmlFile, html);

// camera targets for the CSS (viewBox centre 300,350)
const cam = (fx, fy, s) => `translate(${f1(300 - fx * s)}px, ${f1(350 - fy * s)}px) scale(${s})`;
console.log(JSON.stringify({
  basemapKB: (fs.statSync(basemapFile).size / 1024).toFixed(0),
  lakes: lakes.length, rivers: rivers.length, roads: Object.fromEntries(Object.entries(cls).map(([k, v]) => [k, v.length])),
  routePts: routePts.length, site: SITE, town: towns.town.at,
  cam0: cam(sx + 92, sy - 30, 2.2), cam2: cam(255, 440, 1.55),
}, null, 1));
