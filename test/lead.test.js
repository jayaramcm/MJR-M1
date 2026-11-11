const test = require('node:test');
const assert = require('node:assert');
const { validateLead } = require('../server.js');

test('accepts Indian mobile numbers in common formats', () => {
  for (const phone of ['9010055596', '+91 90100 55596', '09010055596', '91-9010055596']) {
    assert.strictEqual(validateLead({ name: 'Ravi', phone })?.phone, '9010055596', phone);
  }
});

test('rejects missing names and unusable numbers', () => {
  assert.strictEqual(validateLead({ name: '', phone: '9010055596' }), null);
  assert.strictEqual(validateLead({ name: 'Ravi', phone: '12345' }), null);
  assert.strictEqual(validateLead({ name: 'Ravi', phone: '5010055596' }), null);
  assert.strictEqual(validateLead(null), null);
});

test('keeps only known interests and numeric plot numbers', () => {
  const lead = validateLead({ name: 'Ravi', phone: '9010055596', interest: '<script>', plot: '45; drop' });
  assert.strictEqual(lead.interest, 'Call back');
  assert.strictEqual(lead.plot, '');
  assert.strictEqual(validateLead({ name: 'Ravi', phone: '9010055596', interest: 'Site visit', plot: '45' }).plot, '45');
  assert.strictEqual(validateLead({ name: 'Ravi', phone: '9010055596', interest: 'Updates' }).interest, 'Updates');
});

test('keeps an optional message on one line and at most 500 characters', () => {
  assert.strictEqual(validateLead({ name: 'Ravi', phone: '9010055596' }).message, '');
  assert.strictEqual(validateLead({ name: 'Ravi', phone: '9010055596', message: ' corner\nplot\tplease ' }).message, 'corner plot please');
  assert.strictEqual(validateLead({ name: 'Ravi', phone: '9010055596', message: 'x'.repeat(900) }).message.length, 500);
});
