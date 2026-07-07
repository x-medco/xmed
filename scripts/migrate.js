const fs = require('fs');
const path = require('path');
const { Client } = require('pg');
const dns = require('dns');

const schemaPath = path.join(__dirname, '../supabase/schema.sql');
const schemaSql = fs.readFileSync(schemaPath, 'utf8');

async function resolveIPv4(host) {
  return new Promise((resolve) => {
    dns.resolve4(host, (err, addresses) => {
      if (err || !addresses.length) {
        resolve(host); // fallback
      } else {
        resolve(addresses[0]);
      }
    });
  });
}

async function testConfig(pwd, port, ip) {
  console.log(`Testing: IP=${ip}, PORT=${port}, PWD="${pwd}"`);
  const client = new Client({
    host: ip,
    port: port,
    user: 'postgres',
    password: pwd,
    database: 'postgres',
    ssl: { rejectUnauthorized: false }
  });

  try {
    await client.connect();
    console.log('Success! Executing migrations...');
    await client.query(schemaSql);
    console.log('Migration executed successfully!');
    await client.end();
    return true;
  } catch (err) {
    console.log(`Failed for PORT=${port}:`, err.message);
    try { await client.end(); } catch(e) {}
    return false;
  }
}

async function run() {
  const host = 'db.vhqzdmucrbcdubscyrpl.supabase.co';
  const ipv4 = await resolveIPv4(host);
  console.log(`Resolved ${host} to IPv4: ${ipv4}`);
  
  const passwords = ["Rubben'282", "Rubben%27282", "Rubben282"];
  const ports = [5432, 6543];
  
  for (const pwd of passwords) {
    for (const port of ports) {
      const ok = await testConfig(pwd, port, ipv4);
      if (ok) {
        console.log('All migrations completed!');
        process.exit(0);
      }
    }
  }
  
  console.error('All attempts failed.');
  process.exit(1);
}

run();
