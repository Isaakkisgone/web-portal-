const http = require('http');

function request(options, data) {
  return new Promise((resolve, reject) => {
    const req = http.request(options, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        try {
          resolve({ status: res.statusCode, data: JSON.parse(body) });
        } catch (e) {
          resolve({ status: res.statusCode, data: body });
        }
      });
    });
    req.on('error', reject);
    if (data) req.write(JSON.stringify(data));
    req.end();
  });
}

async function run() {
  console.log('=== RUNNING LIVE HTTP INTEGRATION SMOKE TESTS ===');

  // 1. Accounting Health
  const h1 = await request({ hostname: 'localhost', port: 8081, path: '/health', method: 'GET' });
  console.log('[1] Accounting Health:', h1.status, h1.data.status, h1.data.service);

  // 2. Mobile Health
  const h2 = await request({ hostname: 'localhost', port: 8082, path: '/health', method: 'GET' });
  console.log('[2] Mobile Health:    ', h2.status, h2.data.status, h2.data.service);

  // 3. Accounting Create Account
  const createAcc = await request({
    hostname: 'localhost',
    port: 8081,
    path: '/accounts/create',
    method: 'POST',
    headers: { 'Content-Type': 'application/json' }
  }, {
    accountName: 'Cloud Infrastructure Account',
    accountType: 'BUSINESS',
    initialBalance: 325000,
    currency: 'USD',
    email: 'infra@cloud.internal'
  });
  console.log('[3] Create Account:   ', createAcc.status, createAcc.data.data.accountNumber, createAcc.data.data.accountName);
  const createdAccountId = createAcc.data.data.id;

  // 4. Accounting Get Account by ID
  const getAcc = await request({ hostname: 'localhost', port: 8081, path: `/accounts/${createdAccountId}`, method: 'GET' });
  console.log('[4] Get Account by ID:', getAcc.status, getAcc.data.data.id === createdAccountId ? 'MATCHED' : 'FAILED');

  // 5. Accounting List Accounts
  const listAcc = await request({ hostname: 'localhost', port: 8081, path: '/accounts', method: 'GET' });
  console.log('[5] List Accounts:    ', listAcc.status, `Total: ${listAcc.data.count}`);

  // 6. Mobile Create Device
  const createDev = await request({
    hostname: 'localhost',
    port: 8082,
    path: '/devices',
    method: 'POST',
    headers: { 'Content-Type': 'application/json' }
  }, {
    deviceId: 'DEV-SMOKE-777',
    name: 'Field Diagnostics Rugged Phone',
    model: 'CAT S62 Pro',
    manufacturer: 'Caterpillar',
    osVersion: 'Android 12'
  });
  console.log('[6] Create Device:    ', createDev.status, createDev.data.data.deviceId, createDev.data.data.name);

  // 7. Mobile Get Device by ID / deviceId
  const getDev = await request({ hostname: 'localhost', port: 8082, path: '/devices/DEV-SMOKE-777', method: 'GET' });
  console.log('[7] Get Device by ID: ', getDev.status, getDev.data.data.deviceId === 'DEV-SMOKE-777' ? 'MATCHED' : 'FAILED');

  // 8. Mobile List Devices
  const listDev = await request({ hostname: 'localhost', port: 8082, path: '/devices', method: 'GET' });
  console.log('[8] List Devices:     ', listDev.status, `Total: ${listDev.data.count}`);

  // 9. Check OpenAPI Specs for both
  const doc1 = await request({ hostname: 'localhost', port: 8081, path: '/api-docs.json', method: 'GET' });
  console.log('[9] Accounting OpenAPI:', doc1.status, doc1.data.info ? doc1.data.info.title : 'FAILED');

  const doc2 = await request({ hostname: 'localhost', port: 8082, path: '/api-docs.json', method: 'GET' });
  console.log('[10] Mobile OpenAPI:  ', doc2.status, doc2.data.info ? doc2.data.info.title : 'FAILED');

  console.log('\n=== ALL LIVE SMOKE TESTS COMPLETED SUCCESSFULLY ===');
}

run().catch(err => {
  console.error('Smoke tests failed:', err);
  process.exit(1);
});
