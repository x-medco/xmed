const fs = require('fs');
const path = require('path');
const XLSX = require('xlsx');
const { Client } = require('pg');

// Custom HTML Template Generator (JS version for zero-dependency execution)
function getMarketingEmailHtml(name, stats) {
  const formattedName = name && name.trim() ? name.trim() : 'Researcher';
  
  let statsBoxHtml = '';
  if (stats && stats.orderCount > 0) {
    const dateStr = stats.lastOrderDate 
      ? new Date(stats.lastOrderDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
      : 'N/A';
      
    statsBoxHtml = `
      <tr>
        <td style="padding:20px 30px 10px 30px;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#101733; border:1px solid #1c2440; border-radius:12px;">
            <tr>
              <td style="padding:24px 26px;">
                <div style="font-family:Arial, Helvetica, sans-serif; font-size:12px; font-weight:bold; letter-spacing:2px; color:#5fa8ff; padding-bottom:14px; text-transform:uppercase;">YOUR RESEARCH COLLABORATION</div>
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                  <tr><td style="padding:9px 0; border-bottom:1px solid #1c2440; font-family:Arial, Helvetica, sans-serif; font-size:14px; color:#dfe6f7;"><span style="color:#5fa8ff; font-weight:bold;">&#10003;&nbsp;&nbsp;</span>Research Runs: <span style="font-weight:bold; color:#ffffff;">${stats.orderCount} Batches Completed</span></td></tr>
                  <tr><td style="padding:9px 0; border-bottom:1px solid #1c2440; font-family:Arial, Helvetica, sans-serif; font-size:14px; color:#dfe6f7;"><span style="color:#5fa8ff; font-weight:bold;">&#10003;&nbsp;&nbsp;</span>Verified Purity Guarantee: <span style="font-weight:bold; color:#10b981;">&ge;99.0% HPLC Standard</span></td></tr>
                  <tr><td style="padding:9px 0; font-family:Arial, Helvetica, sans-serif; font-size:14px; color:#dfe6f7;"><span style="color:#5fa8ff; font-weight:bold;">&#10003;&nbsp;&nbsp;</span>Last Synthesis Date: <span style="font-weight:bold; color:#ffffff;">${dateStr}</span></td></tr>
                </table>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    `;
  } else {
    statsBoxHtml = `
      <tr>
        <td style="padding:20px 30px 10px 30px;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#101733; border:1px solid #1c2440; border-radius:12px;">
            <tr>
              <td style="padding:24px 26px;">
                <div style="font-family:Arial, Helvetica, sans-serif; font-size:12px; font-weight:bold; letter-spacing:2px; color:#5fa8ff; padding-bottom:14px; text-transform:uppercase;">THE NEW X-MED EXPERIENCE</div>
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                  <tr><td style="padding:9px 0; border-bottom:1px solid #1c2440; font-family:Arial, Helvetica, sans-serif; font-size:14px; color:#dfe6f7;"><span style="color:#5fa8ff; font-weight:bold;">&#10003;&nbsp;&nbsp;</span>Cleaner, modern interface</td></tr>
                  <tr><td style="padding:9px 0; border-bottom:1px solid #1c2440; font-family:Arial, Helvetica, sans-serif; font-size:14px; color:#dfe6f7;"><span style="color:#5fa8ff; font-weight:bold;">&#10003;&nbsp;&nbsp;</span>Faster website performance</td></tr>
                  <tr><td style="padding:9px 0; border-bottom:1px solid #1c2440; font-family:Arial, Helvetica, sans-serif; font-size:14px; color:#dfe6f7;"><span style="color:#5fa8ff; font-weight:bold;">&#10003;&nbsp;&nbsp;</span>Simplified product discovery</td></tr>
                  <tr><td style="padding:9px 0; border-bottom:1px solid #1c2440; font-family:Arial, Helvetica, sans-serif; font-size:14px; color:#dfe6f7;"><span style="color:#5fa8ff; font-weight:bold;">&#10003;&nbsp;&nbsp;</span>Detailed research information</td></tr>
                  <tr><td style="padding:9px 0; font-family:Arial, Helvetica, sans-serif; font-size:14px; color:#dfe6f7;"><span style="color:#5fa8ff; font-weight:bold;">&#10003;&nbsp;&nbsp;</span>Secure and reliable access</td></tr>
                </table>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    `;
  }

  return `<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>X-MED — Our Website Is Live Again</title>
<!--[if mso]>
<xml>
<o:OfficeDocumentSettings>
<o:PixelsPerInch>96</o:PixelsPerInch>
</o:OfficeDocumentSettings>
</xml>
<![endif]-->
</head>
<body style="margin:0; padding:0; background-color:#05070f;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#05070f;">
<tr>
<td align="center" style="padding:32px 16px;">

<table role="presentation" width="600" cellpadding="0" cellspacing="0" style="width:600px; max-width:600px; background-color:#0b1020; border:1px solid #1c2440; border-radius:14px; overflow:hidden;">

  <!-- Logo -->
  <tr>
    <td align="center" style="padding:40px 20px 10px 20px;">
      <div style="font-family:Arial, Helvetica, sans-serif; font-weight:bold; font-size:30px; letter-spacing:1px; color:#5fa8ff;">X-MED</div>
    </td>
  </tr>

  <!-- Badge -->
  <tr>
    <td align="center" style="padding:0 20px 26px 20px;">
      <table role="presentation" cellpadding="0" cellspacing="0">
        <tr>
          <td style="border:1px solid #3b6bd6; border-radius:20px; padding:8px 18px; font-family:Arial, Helvetica, sans-serif; font-size:11px; font-weight:bold; letter-spacing:2px; color:#5fa8ff;">OFFICIAL ANNOUNCEMENT</td>
        </tr>
      </table>
    </td>
  </tr>

  <!-- Headline -->
  <tr>
    <td align="center" style="padding:0 24px; font-family:Arial, Helvetica, sans-serif; font-size:32px; line-height:1.2; font-weight:bold; color:#f4f7ff;">
      OUR WEBSITE IS<br>
      <span style="color:#5fa8ff;">LIVE AGAIN</span>
    </td>
  </tr>

  <!-- Subtitle -->
  <tr>
    <td align="center" style="padding:22px 40px 0 40px; font-family:Arial, Helvetica, sans-serif; font-size:15px; line-height:1.7; color:#9aa6c3;">
      A <span style="color:#5fa8ff; font-weight:bold;">cleaner</span> experience. <span style="color:#5fa8ff; font-weight:bold;">Faster</span> access.<br>
      Built for <span style="color:#5fa8ff; font-weight:bold;">serious research</span>.
    </td>
  </tr>

  <!-- Message Body Part 1 -->
  <tr>
    <td align="left" style="padding:36px 40px 10px 40px; font-family:Arial, Helvetica, sans-serif; font-size:15px; line-height:1.6; color:#dfe6f7;">
      Hi ${formattedName},<br><br>
      At X-MED, our focus has always been simple: <strong>quality you can trust</strong>.<br><br>
      Every peptide we offer is &ge;99% purity, third-party batch tested, and backed by a Certificate of Analysis &mdash; so you know exactly what you're getting, every time. From sourcing to shipping, we hold our process to a standard built for serious research.
    </td>
  </tr>

  <!-- Personalization / Feature box -->
  ${statsBoxHtml}

  <!-- Message Body Part 2 -->
  <tr>
    <td align="left" style="padding:20px 40px 10px 40px; font-family:Arial, Helvetica, sans-serif; font-size:15px; line-height:1.6; color:#dfe6f7;">
      We've also refreshed things on our end &mdash; <strong>x-med.co</strong> is live with a cleaner look, if you'd like to take a peek.<br><br>
      Thank you for trusting us with your research needs. We're here if you need anything.
    </td>
  </tr>

  <!-- CTA Button -->
  <tr>
    <td align="center" style="padding:28px 20px 6px 20px;">
      <!--[if mso]>
      <v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="https://x-med.co?utm_source=email&utm_medium=campaign&utm_campaign=relaunch_2026" style="height:50px;v-text-anchor:middle;width:280px;" arcsize="50%" strokecolor="#3b6bff" fillcolor="#3b6bff">
      <w:anchorlock/>
      <center style="color:#ffffff;font-family:Arial,sans-serif;font-size:14px;font-weight:bold;">EXPLORE THE NEW WEBSITE &#8594;</center>
      </v:roundrect>
      <![endif]-->
      <!--[if !mso]><!-- -->
      <a href="https://x-med.co?utm_source=email&utm_medium=campaign&utm_campaign=relaunch_2026" target="_blank" style="background-color:#3b6bff; background-image:linear-gradient(100deg,#3b6bff,#7c5cff); border-radius:30px; color:#ffffff; display:inline-block; font-family:Arial, Helvetica, sans-serif; font-size:14px; font-weight:bold; letter-spacing:1px; padding:16px 32px; text-decoration:none;">EXPLORE THE NEW WEBSITE &#8594;</a>
      <!--<![endif]-->
    </td>
  </tr>

  <!-- URL -->
  <tr>
    <td align="center" style="padding:16px 20px 0 20px; font-family:Arial, Helvetica, sans-serif; font-size:16px; font-weight:bold; color:#5fa8ff;">x-med.co</td>
  </tr>

  <!-- Divider -->
  <tr>
    <td align="center" style="padding:44px 30px 0 30px; font-family:Arial, Helvetica, sans-serif; font-size:11px; font-weight:bold; letter-spacing:2px; color:#6b7699; border-top:1px solid #1c2440; padding-top:24px;">
      BUILT ON THE SAME SCIENTIFIC PILLARS
    </td>
  </tr>

  <!-- Pillars -->
  <tr>
    <td style="padding:24px 20px 20px 20px;">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
        <tr>
          <td width="33%" align="center" style="font-family:Arial, Helvetica, sans-serif; padding:0 8px;">
            <div style="font-size:22px; color:#5fa8ff; padding-bottom:8px;">&#9879;</div>
            <div style="font-size:13px; font-weight:bold; color:#f0f4ff; padding-bottom:4px;">HPLC Tested</div>
            <div style="font-size:11px; color:#8b96b8; line-height:1.5;">&#8805;99% verified batch certification</div>
          </td>
          <td width="33%" align="center" style="font-family:Arial, Helvetica, sans-serif; padding:0 8px; border-left:1px solid #1c2440; border-right:1px solid #1c2440;">
            <div style="font-size:22px; color:#5fa8ff; padding-bottom:8px;">&#10052;</div>
            <div style="font-size:13px; font-weight:bold; color:#f0f4ff; padding-bottom:4px;">Cold Chain</div>
            <div style="font-size:11px; color:#8b96b8; line-height:1.5;">Temperature-safe dispatch</div>
          </td>
          <td width="33%" align="center" style="font-family:Arial, Helvetica, sans-serif; padding:0 8px;">
            <div style="font-size:22px; color:#5fa8ff; padding-bottom:8px;">&#128737;</div>
            <div style="font-size:13px; font-weight:bold; color:#f0f4ff; padding-bottom:4px;">Research Support</div>
            <div style="font-size:11px; color:#8b96b8; line-height:1.5;">Direct help when required</div>
          </td>
        </tr>
      </table>
    </td>
  </tr>

  <!-- Sign off sign -->
  <tr>
    <td align="center" style="padding:10px 36px 16px 36px; font-family:Arial, Helvetica, sans-serif; font-size:15px; line-height:1.7; color:#dfe6f7;">
      Warm regards,<br>
      <span style="color:#5fa8ff; font-weight:bold;">X-MED Team</span>
    </td>
  </tr>

  <!-- Tagline -->
  <tr>
    <td align="center" style="padding:10px 20px 36px 20px; font-family:Arial, Helvetica, sans-serif; font-size:14px; font-weight:bold; letter-spacing:3px; color:#5fa8ff;">
      QUALITY YOU CAN TRUST.
    </td>
  </tr>

  <!-- Footer -->
  <tr>
    <td align="center" style="padding:20px 20px 32px 20px; border-top:1px solid #1c2440; font-family:Arial, Helvetica, sans-serif; font-size:11px; line-height:1.8; color:#5c6684;">
      © 2026 X-MED Research Laboratories<br>
      For Research Use Only
    </td>
  </tr>

</table>

</td>
</tr>
</table>
</body>
</html>`;
}

// Load Environment Variables manually
function loadEnv() {
  const envFiles = ['.env', '.env.local'];
  envFiles.forEach(file => {
    const filePath = path.join(process.cwd(), file);
    if (fs.existsSync(filePath)) {
      const content = fs.readFileSync(filePath, 'utf-8');
      content.split('\n').forEach(line => {
        const trimmed = line.trim();
        if (trimmed && !trimmed.startsWith('#')) {
          const eqIndex = trimmed.indexOf('=');
          if (eqIndex > 0) {
            const key = trimmed.substring(0, eqIndex).trim();
            const val = trimmed.substring(eqIndex + 1).trim().replace(/^['"]|['"]$/g, '');
            if (!process.env[key]) {
              process.env[key] = val;
            }
          }
        }
      });
    }
  });
}

loadEnv();

const dbConfig = {
  host: 'db.vhqzdmucrbcdubscyrpl.supabase.co',
  port: 6543,
  user: 'postgres',
  password: "Rubben%27282",
  database: 'postgres',
  ssl: { rejectUnauthorized: false }
};

// Resend send function
async function sendEmailViaResend(apiKey, toEmail, name, html) {
  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: 'X-Med Reagents <sales@x-med.co>',
        to: [toEmail],
        subject: 'Quality You Can Trust | X-MED Update',
        html: html
      })
    });

    const data = await response.text();
    if (!response.ok) {
      return { success: false, error: data };
    }
    return { success: true, response: data };
  } catch (err) {
    return { success: false, error: err.message };
  }
}

// Fetch all database customers
async function fetchDbCustomers() {
  const client = new Client(dbConfig);
  try {
    await client.connect();
    
    // We get customer profiles and aggregate order stats
    const query = `
      SELECT 
        c.email, 
        c.full_name,
        COUNT(o.id) as order_count,
        SUM(o.total) as total_spent,
        MAX(o.created_at) as last_order_date
      FROM public.customers c
      LEFT JOIN public.orders o ON c.id = o.customer_id
      GROUP BY c.email, c.full_name
    `;
    const res = await client.query(query);
    return res.rows.map(row => ({
      email: row.email.toLowerCase().trim(),
      name: row.full_name || '',
      orderCount: parseInt(row.order_count || '0', 10),
      totalSpent: parseFloat(row.total_spent || '0'),
      lastOrderDate: row.last_order_date ? new Date(row.last_order_date) : null,
      source: 'database'
    }));
  } catch (err) {
    console.error("Warning: Could not fetch from Supabase database:", err.message);
    return [];
  } finally {
    await client.end();
  }
}

// Fetch Excel customers
function fetchExcelCustomers() {
  const excelPath = path.join(process.cwd(), 'orders-2026-07-07-12-37-10.xlsx');
  if (!fs.existsSync(excelPath)) {
    console.warn(`Warning: Excel file not found at ${excelPath}`);
    return [];
  }

  const workbook = XLSX.readFile(excelPath);
  const sheetName = workbook.SheetNames[0];
  const sheet = workbook.Sheets[sheetName];
  const rows = XLSX.utils.sheet_to_json(sheet);
  
  // We aggregate Excel rows by email
  const excelClients = new Map();
  
  rows.forEach(row => {
    const email = row['Email (Billing)'];
    if (!email) return;
    
    const emailKey = email.toLowerCase().trim();
    const firstName = row['First Name (Billing)'] || '';
    const lastName = row['Last Name (Billing)'] || '';
    const fullName = `${firstName} ${lastName}`.trim();
    const orderTotal = parseFloat(row['Order Total Amount'] || '0');
    const orderDateStr = row['Order Date'];
    const orderDate = orderDateStr ? new Date(orderDateStr) : null;
    
    if (excelClients.has(emailKey)) {
      const existing = excelClients.get(emailKey);
      existing.orderCount += 1;
      existing.totalSpent += orderTotal;
      if (orderDate && (!existing.lastOrderDate || orderDate > existing.lastOrderDate)) {
        existing.lastOrderDate = orderDate;
      }
      if (!existing.name && fullName) {
        existing.name = fullName;
      }
    } else {
      excelClients.set(emailKey, {
        email: emailKey,
        name: fullName,
        orderCount: 1,
        totalSpent: orderTotal,
        lastOrderDate: orderDate,
        source: 'excel'
      });
    }
  });

  return Array.from(excelClients.values());
}

// Sleep utility to limit rate
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Parse args
const args = process.argv.slice(2);
const dryRun = args.includes('--dry-run');
const testIndex = args.indexOf('--test');
const testEmail = testIndex !== -1 ? args[testIndex + 1] : null;
const sendAll = args.includes('--send-all');

const limitIndex = args.indexOf('--limit');
const limitValue = limitIndex !== -1 ? parseInt(args[limitIndex + 1], 10) : null;

const offsetIndex = args.indexOf('--offset');
const offsetValue = offsetIndex !== -1 ? parseInt(args[offsetIndex + 1], 10) : 0;

let resendKeyArg = null;
const keyIndex = args.indexOf('--resend-key');
if (keyIndex !== -1) {
  resendKeyArg = args[keyIndex + 1];
}

const RESEND_API_KEY = resendKeyArg || process.env.RESEND_API_KEY;

async function main() {
  console.log("====================================================");
  console.log("             X-MED MARKETING DISPATCHER              ");
  console.log("====================================================");
  
  // 1. Gather all contacts
  console.log("Gathering customer list...");
  const dbCusts = await fetchDbCustomers();
  console.log(`Found ${dbCusts.length} clients in Supabase DB.`);
  
  const excelCusts = fetchExcelCustomers();
  console.log(`Found ${excelCusts.length} clients in Excel file.`);
  
  // 2. Merge lists
  const mergedMap = new Map();
  
  // Add DB customers first
  dbCusts.forEach(c => {
    mergedMap.set(c.email, {
      email: c.email,
      name: c.name,
      orderCount: c.orderCount,
      totalSpent: c.totalSpent,
      lastOrderDate: c.lastOrderDate,
      source: 'database'
    });
  });
  
  // Add/Merge Excel customers
  excelCusts.forEach(c => {
    if (mergedMap.has(c.email)) {
      const existing = mergedMap.get(c.email);
      existing.orderCount = Math.max(existing.orderCount, c.orderCount);
      existing.totalSpent = Math.max(existing.totalSpent, c.totalSpent);
      if (c.lastOrderDate && (!existing.lastOrderDate || c.lastOrderDate > existing.lastOrderDate)) {
        existing.lastOrderDate = c.lastOrderDate;
      }
      if (!existing.name && c.name) {
        existing.name = c.name;
      }
      existing.source = 'merged';
    } else {
      mergedMap.set(c.email, c);
    }
  });
  
  const allClients = Array.from(mergedMap.values());
  console.log(`Merged customer list: ${allClients.length} unique clients.`);
  
  // Slice target list based on offset and limit
  let targetClients = allClients;
  if (offsetValue > 0 || limitValue !== null) {
    const end = limitValue !== null ? offsetValue + limitValue : allClients.length;
    targetClients = allClients.slice(offsetValue, end);
    console.log(`Slicing clients list: using index range ${offsetValue} to ${end - 1} (${targetClients.length} clients in scope).`);
  }
  
  // 3. Perform actions
  if (dryRun) {
    console.log("\n[DRY RUN] Client List Summary:");
    console.log("--------------------------------------------------------------------------------------------------");
    console.log("Email                                    | Name                 | Orders | Total Spent | Last Order");
    console.log("--------------------------------------------------------------------------------------------------");
    targetClients.slice(0, 50).forEach(c => {
      const emailCol = c.email.padEnd(40).substring(0, 40);
      const nameCol = c.name.padEnd(20).substring(0, 20);
      const ordersCol = String(c.orderCount).padStart(6);
      const spentCol = `€${c.totalSpent.toFixed(2)}`.padStart(11);
      const dateCol = c.lastOrderDate ? c.lastOrderDate.toLocaleDateString() : 'N/A';
      console.log(`${emailCol} | ${nameCol} | ${ordersCol} | ${spentCol} | ${dateCol}`);
    });
    if (targetClients.length > 50) {
      console.log(`... and ${targetClients.length - 50} more clients.`);
    }
    console.log("--------------------------------------------------------------------------------------------------");
    console.log(`Dry run complete. No emails were sent.`);
    console.log(`To send a test email, run: node scripts/send-marketing-email.js --test <email>`);
    console.log(`To send to all clients, run: node scripts/send-marketing-email.js --send-all`);
    process.exit(0);
  }
  
  if (testEmail) {
    console.log(`\n[TEST SEND] Target Email: ${testEmail}`);
    
    // We check if this email is in our list to get real stats, otherwise use mock stats
    const matchedClient = allClients.find(c => c.email === testEmail.toLowerCase().trim());
    let clientStats = null;
    let clientName = 'Researcher';
    
    if (matchedClient) {
      clientName = matchedClient.name;
      clientStats = {
        orderCount: matchedClient.orderCount,
        totalSpent: matchedClient.totalSpent,
        lastOrderDate: matchedClient.lastOrderDate
      };
      console.log(`Found recipient in customer list! Personalizing with real stats.`);
    } else {
      // Mock stats for test
      clientName = 'Test Researcher';
      clientStats = {
        orderCount: 3,
        totalSpent: 120.00,
        lastOrderDate: new Date('2026-06-15')
      };
      console.log(`Email not in database. Using premium mock personalization stats.`);
    }
    
    const html = getMarketingEmailHtml(clientName, clientStats);
    
    // Write preview file locally so the user can inspect it
    const previewFile = path.join(process.cwd(), 'marketing-email-preview.html');
    fs.writeFileSync(previewFile, html);
    console.log(`Saved local HTML preview to: file://${previewFile}`);
    
    // Also save to artifacts directory
    const artifactPreviewFile = '/Users/shikha/.gemini/antigravity/brain/404f701d-9236-4a0d-90d8-e03f4038d012/marketing-email-preview.html';
    try {
      fs.writeFileSync(artifactPreviewFile, html);
      console.log(`Saved artifact HTML preview to: file://${artifactPreviewFile}`);
    } catch (aErr) {
      // ignore artifact write errors
    }
    
    if (!RESEND_API_KEY) {
      console.error("Error: RESEND_API_KEY environment variable is not defined.");
      console.log("You can provide it via command line: node scripts/send-marketing-email.js --test 5hourweb@gmail.com --resend-key re_YOURKEY");
      process.exit(1);
    }
    
    console.log("Sending email via Resend API...");
    const res = await sendEmailViaResend(RESEND_API_KEY, testEmail, clientName, html);
    if (res.success) {
      console.log("SUCCESS! Test email sent successfully.");
      console.log("Resend API response:", res.response);
    } else {
      console.error("FAILED! Resend API returned error:", res.error);
    }
    process.exit(0);
  }
  
  if (sendAll) {
    console.log(`\n[BULK SEND] Preparing to send to ${targetClients.length} clients.`);
    if (!RESEND_API_KEY) {
      console.error("Error: RESEND_API_KEY environment variable is not defined.");
      process.exit(1);
    }
    
    console.log(`WARNING: You are about to send marketing emails to ${targetClients.length} clients in the target scope.`);
    console.log("Press Ctrl+C to abort, or wait 10 seconds before transmission starts...");
    await sleep(10000);
    
    let sentCount = 0;
    let failedCount = 0;
    
    for (let i = 0; i < targetClients.length; i++) {
      // Automatic 50-email batching pause
      if (i > 0 && i % 50 === 0) {
        console.log(`\n====================================================`);
        console.log(`Completed batch of 50 emails.`);
        console.log(`Pausing for 15 seconds to respect Resend API rate limits...`);
        console.log(`====================================================\n`);
        await sleep(15000);
      }

      const client = targetClients[i];
      const html = getMarketingEmailHtml(client.name, {
        orderCount: client.orderCount,
        totalSpent: client.totalSpent,
        lastOrderDate: client.lastOrderDate
      });
      
      console.log(`[${i+1}/${targetClients.length}] Sending to ${client.name} (${client.email})...`);
      const res = await sendEmailViaResend(RESEND_API_KEY, client.email, client.name, html);
      if (res.success) {
        sentCount++;
        console.log(`  -> Sent!`);
      } else {
        failedCount++;
        console.error(`  -> Failed: ${res.error}`);
      }
      
      // Delay between individual sends to respect Resend rate limits (2 requests/sec max)
      await sleep(650);
    }
    
    console.log("\n====================================================");
    console.log("               DISPATCH RUN COMPLETED                ");
    console.log("====================================================");
    console.log(`Total Targets:      ${targetClients.length}`);
    console.log(`Successfully Sent:  ${sentCount}`);
    console.log(`Failed Sends:       ${failedCount}`);
    process.exit(0);
  }
  
  // Default help message
  console.log("\nUsage:");
  console.log("  --dry-run                         List all deduplicated client details and stats");
  console.log("  --test <email>                     Send a personalized sample email to <email> and save local HTML preview");
  console.log("  --send-all                         Send the personalized email to all merged client contacts");
  console.log("  --resend-key <key>                 Provide the Resend API key directly");
  console.log("\nExample Test Run:");
  console.log("  NODE_PATH=./node_modules node scripts/send-marketing-email.js --test 5hourweb@gmail.com");
}

main().catch(console.error);
