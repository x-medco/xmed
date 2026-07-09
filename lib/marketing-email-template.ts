export interface CustomerStats {
  orderCount: number;
  totalSpent: number;
  lastOrderDate: string | null;
}

export function getMarketingEmailHtml(name: string, stats: CustomerStats | null): string {
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
</html>
`;
}
