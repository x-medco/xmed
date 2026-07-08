export interface EmailTemplate {
  id: string;
  name: string;
  trigger: string;
  delay: string;
  subject: string;
  stats: {
    sent: number;
    opened: string;
    clicked: string;
    converted: string;
  };
  getHtml: (vars: any) => string;
}

// Helper to wrap content in a premium responsive layout matching the X-MED brand
const wrapTemplate = (subject: string, contentHtml: string) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${subject}</title>
  <style>
    body {
      margin: 0;
      padding: 0;
      background-color: #030712;
      color: #f3f4f6;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
      -webkit-font-smoothing: antialiased;
    }
    .wrapper {
      width: 100%;
      background-color: #030712;
      padding: 40px 0;
    }
    .container {
      max-width: 580px;
      margin: 0 auto;
      background: linear-gradient(135deg, #0b1527 0%, #060b14 100%);
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 24px;
      overflow: hidden;
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5);
    }
    .header {
      padding: 30px 40px;
      border-bottom: 1px solid rgba(255, 255, 255, 0.05);
      text-align: center;
    }
    .logo {
      font-size: 22px;
      font-weight: 800;
      letter-spacing: -0.02em;
      color: #ffffff;
      text-decoration: none;
    }
    .logo-blue {
      color: #2563eb;
    }
    .content {
      padding: 40px;
    }
    .badge {
      display: inline-block;
      font-family: monospace;
      font-size: 10px;
      font-weight: 750;
      color: #2563eb;
      background-color: rgba(37, 99, 235, 0.1);
      border: 1px solid rgba(37, 99, 235, 0.2);
      padding: 4px 10px;
      border-radius: 12px;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      margin-bottom: 16px;
    }
    .title {
      font-size: 24px;
      font-weight: 800;
      line-height: 1.25;
      color: #ffffff;
      margin: 0 0 16px 0;
    }
    .text {
      font-size: 14px;
      line-height: 1.6;
      color: #9ca3af;
      margin: 0 0 24px 0;
    }
    .button-container {
      margin: 30px 0;
      text-align: center;
    }
    .button {
      display: inline-block;
      background: linear-gradient(135deg, #2563eb 0%, #7c3aed 100%);
      color: #ffffff !important;
      font-size: 13px;
      font-weight: 700;
      text-decoration: none;
      padding: 14px 32px;
      border-radius: 12px;
      box-shadow: 0 10px 20px rgba(37, 99, 235, 0.2);
      text-transform: uppercase;
      letter-spacing: 0.05em;
      transition: all 0.2s ease;
    }
    .product-box {
      background: rgba(255, 255, 255, 0.02);
      border: 1px solid rgba(255, 255, 255, 0.05);
      border-radius: 16px;
      padding: 20px;
      margin-bottom: 24px;
    }
    .product-table {
      width: 100%;
      border-collapse: collapse;
    }
    .product-img {
      width: 80px;
      height: 80px;
      border-radius: 10px;
      border: 1px solid rgba(255, 255, 255, 0.08);
      object-fit: cover;
    }
    .product-name {
      font-size: 15px;
      font-weight: 700;
      color: #ffffff;
      margin: 0;
    }
    .product-desc {
      font-size: 12px;
      color: #6b7280;
      margin: 4px 0 0 0;
    }
    .product-price {
      font-size: 15px;
      font-family: monospace;
      font-weight: 700;
      color: #ffffff;
      text-align: right;
    }
    .badges-row {
      margin-top: 30px;
      padding-top: 24px;
      border-t: 1px solid rgba(255, 255, 255, 0.05);
      text-align: center;
    }
    .badge-item {
      display: inline-block;
      font-size: 11px;
      color: #6b7280;
      margin: 0 12px;
    }
    .badge-dot {
      display: inline-block;
      width: 6px;
      height: 6px;
      background-color: #10b981;
      border-radius: 50%;
      margin-right: 4px;
    }
    .footer {
      padding: 30px 40px;
      border-top: 1px solid rgba(255, 255, 255, 0.05);
      background-color: rgba(0, 0, 0, 0.2);
      text-align: center;
      font-size: 12px;
      color: #4b5563;
      line-height: 1.5;
    }
    .footer a {
      color: #9ca3af;
      text-decoration: none;
    }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="container">
      <div class="header">
        <a href="https://x-med.co" class="logo"><span class="logo-blue">X-</span>MED</a>
      </div>
      <div class="content">
        ${contentHtml}
        
        <div class="badges-row">
          <div class="badge-item"><span class="badge-dot"></span>HPLC Passed</div>
          <div class="badge-item"><span class="badge-dot"></span>EU Cold Chain</div>
          <div class="badge-item"><span class="badge-dot"></span>Sterile Reconstitution</div>
        </div>
      </div>
      <div class="footer">
        © 2026 X-Med Research Laboratories. All Rights Reserved.<br>
        This communication is intended for registered researchers in the European Union.<br>
        Support: <a href="mailto:support@x-med.co">support@x-med.co</a> | <a href="#">Unsubscribe</a>
      </div>
    </div>
  </div>
</body>
</html>
`;

export const emailAutomations: EmailTemplate[] = [
  // 1. Abandoned Cart - 30 minutes
  {
    id: 'abandoned-cart-30m',
    name: 'Abandoned Cart (30m)',
    trigger: 'Add to cart without checkout',
    delay: '30 Minutes',
    subject: 'You left something behind.',
    stats: { sent: 482, opened: '68.5%', clicked: '24.1%', converted: '12.4%' },
    getHtml: (vars) => wrapTemplate('You left something behind.', `
      <span class="badge">Incomplete Research Run</span>
      <h1 class="title">Secure Your Peptide Batch</h1>
      <p class="text">
        Dear Researcher,<br><br>
        We noticed you added items to your laboratory cart but did not complete checkout. Don't let your research runs stall. Secure your verified compounds before inventory sells out.
      </p>
      
      <div class="product-box">
        <table class="product-table">
          <tr>
            <td style="width: 90px;">
              <img src="${vars.image || 'https://res.cloudinary.com/tedfhije/image/upload/v1783369834/xmed27_ou6g8b.png'}" class="product-img" alt="Reagent" />
            </td>
            <td>
              <h4 class="product-name">${vars.productName || 'BPC-157'}</h4>
              <p class="product-desc">${vars.strength || '5 Mg'} · High-Purity Verified</p>
            </td>
            <td class="product-price">
              €${Number(vars.price || 50).toFixed(2)}
            </td>
          </tr>
        </table>
      </div>

      <div class="button-container">
        <a href="https://x-med.co/cart" class="button">Resume Order</a>
      </div>
    `)
  },

  // 2. Abandoned Cart - 12 hours (Product benefits + reviews)
  {
    id: 'abandoned-cart-12h',
    name: 'Abandoned Cart (12h)',
    trigger: 'Add to cart without checkout',
    delay: '12 Hours',
    subject: 'Verify the HPLC Certifications of your batch.',
    stats: { sent: 320, opened: '59.2%', clicked: '18.4%', converted: '8.1%' },
    getHtml: (vars) => wrapTemplate('Verify the HPLC Certifications of your batch.', `
      <span class="badge">Purity Validation</span>
      <h1 class="title">Synthesized For Research Accuracy</h1>
      <p class="text">
        Every batch of our lyophilized vials undergoes High-Performance Liquid Chromatography (HPLC) and Mass Spectrometry validation.<br><br>
        <strong>Why biochemists trust X-MED:</strong><br>
        • Minimum 99% Verified purity on all vials.<br>
        • Light-protected, temperature-regulated distribution hubs.<br>
        • Free 2ml sterile water vial shipped with every peptide vial.
      </p>

      <div class="product-box" style="background: rgba(16, 185, 129, 0.02); border-color: rgba(16, 185, 129, 0.15);">
        <p class="product-desc" style="color: #10b981; font-family: monospace; font-weight: bold; margin-bottom: 8px;">HPLC CERTIFICATE PASSED</p>
        <p class="product-name" style="font-size: 14px;">"The quality and consistency is remarkable. Our chromatography tests confirmed >99.4% purity. Shipped fast and cold-chain protected."</p>
        <p class="product-desc" style="margin-top: 4px;">— Dr. Helena S., European BioLabs</p>
      </div>

      <div class="button-container">
        <a href="https://x-med.co/cart" class="button">Complete Purchase</a>
      </div>
    `)
  },

  // 3. Abandoned Cart - 24 hours (5% Discount)
  {
    id: 'abandoned-cart-24h',
    name: 'Abandoned Cart (24h) - 5% Coupon',
    trigger: 'Add to cart without checkout',
    delay: '24 Hours',
    subject: 'Exclusive: 5% Coupon for your research run.',
    stats: { sent: 215, opened: '74.8%', clicked: '35.6%', converted: '22.8%' },
    getHtml: (vars) => wrapTemplate('Exclusive: 5% Coupon for your research run.', `
      <span class="badge">Exclusive Grant</span>
      <h1 class="title">Save 5% On Your Assay Materials</h1>
      <p class="text">
        Dear Researcher,<br><br>
        To assist with your laboratory budget constraints, we have generated a unique 5% discount code for your cart items. This discount is valid for the next 24 hours only.
      </p>

      <div class="product-box" style="text-align: center; padding: 24px; border: 1px dashed rgba(37, 99, 235, 0.4); background: rgba(37, 99, 235, 0.02);">
        <span style="font-size: 12px; color: #9ca3af; font-family: monospace;">COUPON CODE:</span>
        <h2 style="font-family: monospace; font-size: 28px; font-weight: 900; color: #2563eb; margin: 8px 0 0 0; letter-spacing: 0.1em;">LABRUN5</h2>
      </div>

      <div class="button-container">
        <a href="https://x-med.co/cart?code=LABRUN5" class="button">Apply 5% Off & Checkout</a>
      </div>
    `)
  },

  // 4. Abandoned Cart - 48 hours (Final reminder)
  {
    id: 'abandoned-cart-48h',
    name: 'Abandoned Cart (48h)',
    trigger: 'Add to cart without checkout',
    delay: '48 Hours',
    subject: 'Last Call: Clearing pending carts.',
    stats: { sent: 154, opened: '44.1%', clicked: '11.0%', converted: '4.8%' },
    getHtml: (vars) => wrapTemplate('Last Call: Clearing pending carts.', `
      <span class="badge">System Clean</span>
      <h1 class="title">Pending Cart Expiration Notice</h1>
      <p class="text">
        Dear Researcher,<br><br>
        We are preparing to clear pending holds in our distribution warehouse to free up stock for other laboratory queues. This is your final reminder to secure your batch before the cart expires.
      </p>

      <div class="button-container">
        <a href="https://x-med.co/cart" class="button">Checkout Vials Now</a>
      </div>
    `)
  },

  // 5. Order Confirmation (Invoice + summary)
  {
    id: 'order-confirmation',
    name: 'Order Confirmation',
    trigger: 'Completed Checkout purchase',
    delay: 'Immediately',
    subject: 'Order Confirmed: Invoice #XM-10924',
    stats: { sent: 531, opened: '98.2%', clicked: '45.1%', converted: '0.0%' },
    getHtml: (vars) => wrapTemplate('Order Confirmed: Invoice #XM-10924', `
      <span class="badge" style="background-color: rgba(16, 185, 129, 0.1); border-color: rgba(16, 185, 129, 0.2); color: #10b981;">Order Confirmed</span>
      <h1 class="title">XM-10924 Received</h1>
      <p class="text">
        Thank you for choosing X-Med. Your payment has been confirmed, and your research materials have entered our packaging queue.
      </p>

      <div class="product-box">
        <h3 style="font-size: 14px; font-weight: bold; color: #ffffff; margin-top: 0; margin-bottom: 12px; font-family: monospace;">INVOICE DETAILS</h3>
        <table style="width: 100%; text-align: left; font-size: 12px; color: #9ca3af; border-collapse: collapse;">
          <tr style="border-bottom: 1px solid rgba(255, 255, 255, 0.05);">
            <td style="padding: 8px 0;">Product: ${vars.productName || 'BPC-157 5Mg'}</td>
            <td style="padding: 8px 0; text-align: right;">1x €${Number(vars.price || 50).toFixed(2)}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: bold; color: #ffffff;">Total Amount Paid</td>
            <td style="padding: 8px 0; text-align: right; font-weight: bold; color: #ffffff; font-family: monospace;">€${Number(vars.price || 50).toFixed(2)}</td>
          </tr>
        </table>
      </div>

      <div class="product-box">
        <h3 style="font-size: 14px; font-weight: bold; color: #ffffff; margin-top: 0; margin-bottom: 8px; font-family: monospace;">SHIPPING SUMMARY</h3>
        <p class="product-desc" style="color: #d1d5db; font-size: 13px; line-height: 1.5; margin: 0;">
          Recipient: ${vars.customerName || 'Dr. Albert R.'}<br>
          Address: ${vars.address || 'BioLabs facility, Room 402, Munich, Germany'}<br>
          Estimated Delivery: 3-5 Business Days
        </p>
      </div>

      <div class="button-container">
        <a href="https://x-med.co/account" class="button">View Order History</a>
      </div>
    `)
  },

  // 6. Shipping Confirmation
  {
    id: 'shipping-confirmation',
    name: 'Shipping Confirmation',
    trigger: 'Order status marked as shipped',
    delay: 'Immediately',
    subject: 'Your X-Med package has shipped.',
    stats: { sent: 502, opened: '92.4%', clicked: '72.1%', converted: '0.0%' },
    getHtml: (vars) => wrapTemplate('Your X-Med package has shipped.', `
      <span class="badge">En Route</span>
      <h1 class="title">Package Dispatched</h1>
      <p class="text">
        We have handed over your package to our dedicated courier hub. Tracking has been initialized.
      </p>

      <div class="product-box">
        <table style="width: 100%; font-size: 13px; color: #9ca3af;">
          <tr>
            <td>COURIER</td>
            <td style="text-align: right; color: #ffffff; font-weight: bold;">Schengen Express Air</td>
          </tr>
          <tr>
            <td>TRACKING ID</td>
            <td style="text-align: right; color: #2563eb; font-weight: bold; font-family: monospace;">${vars.trackingNumber || 'SE-9876543-XM'}</td>
          </tr>
          <tr>
            <td>DELIVERY ESTIMATE</td>
            <td style="text-align: right; color: #ffffff; font-weight: bold;">Tomorrow, July 9, 2026</td>
          </tr>
        </table>
      </div>

      <div class="button-container">
        <a href="https://x-med.co/track?id=${vars.trackingNumber || 'SE-9876543-XM'}" class="button">Track Package</a>
      </div>
    `)
  },

  // 7. Out for Delivery
  {
    id: 'out-for-delivery',
    name: 'Out for Delivery',
    trigger: 'Package reaches local post node',
    delay: 'Courier scans out',
    subject: 'XM-Package: Arriving Today.',
    stats: { sent: 498, opened: '95.6%', clicked: '54.2%', converted: '0.0%' },
    getHtml: (vars) => wrapTemplate('XM-Package: Arriving Today.', `
      <span class="badge" style="background-color: rgba(37,99,235,0.1); border-color: rgba(37,99,235,0.2); color: #2563eb;">Arriving Today</span>
      <h1 class="title">Courier In Transit</h1>
      <p class="text">
        Your shipment of research compounds is out for delivery with the local courier node and will arrive at your specified laboratory address today.
      </p>

      <div class="product-box">
        <p class="product-name" style="font-size: 13px;">DELIVERY METHOD: Contactless Lab Dropoff</p>
        <p class="product-desc" style="margin-top: 4px;">Notice: Ensure refrigerated storage is prepared for instant transfer upon dropoff to avoid compound degradation.</p>
      </div>

      <div class="button-container">
        <a href="https://x-med.co/track" class="button">View Dispatch Map</a>
      </div>
    `)
  },

  // 8. Delivered Email
  {
    id: 'delivered-email',
    name: 'Delivered Email',
    trigger: 'Courier marks delivered',
    delay: '1 Hour after delivery',
    subject: 'Delivered: Guide to reconstitution.',
    stats: { sent: 496, opened: '84.2%', clicked: '61.4%', converted: '0.0%' },
    getHtml: (vars) => wrapTemplate('Delivered: Guide to reconstitution.', `
      <span class="badge" style="background-color: rgba(16, 185, 129, 0.1); border-color: rgba(16, 185, 129, 0.2); color: #10b981;">Delivered Successfully</span>
      <h1 class="title">Lab Assets Received</h1>
      <p class="text">
        Dear Researcher,<br><br>
        We hope your package arrived safely. To assist with your analysis runs, we have compiled a quick product usage and reconstitution guide for your lab.
      </p>

      <div class="product-box">
        <h4 class="product-name">RECONSTITUTION OVERVIEW</h4>
        <p class="product-desc" style="line-height: 1.5; margin-top: 6px;">
          1. Let the lyophilized vial reach room temperature.<br>
          2. Introduce 2.0ml of bacteriostatic water slowly down the inside glass wall.<br>
          3. Gently swirl (do NOT shake) until completely clear.<br>
          4. Store reconstituted solution at 2-8°C. Use within 21 days.
        </p>
      </div>

      <div class="button-container">
        <a href="https://x-med.co/about#guides" class="button">Read Detailed Guides</a>
      </div>
    `)
  },

  // 9. Cross-Sell & Upsell
  {
    id: 'cross-sell-upsell',
    name: 'Cross-Sell & Upsell',
    trigger: '7 days post delivery',
    delay: '7 Days',
    subject: 'Peptides often studied together.',
    stats: { sent: 110, opened: '51.4%', clicked: '19.8%', converted: '6.4%' },
    getHtml: (vars) => wrapTemplate('Peptides often studied together.', `
      <span class="badge">Study Synergy</span>
      <h1 class="title">Expand Your Lab Analysis</h1>
      <p class="text">
        Dear Researcher,<br><br>
        Studies show that research utilizing BPC-157 is often conducted in conjunction with TB-500 to evaluate synergistic tissue repair mechanisms. Consider expanding your next assay run.
      </p>

      <div class="product-box">
        <table class="product-table">
          <tr>
            <td style="width: 90px;">
              <img src="https://res.cloudinary.com/tedfhije/image/upload/v1783369827/xmed26_xjvze2.png" class="product-img" alt="TB-500" />
            </td>
            <td>
              <h4 class="product-name">TB-500 (Thymosin Beta-4)</h4>
              <p class="product-desc">10 Mg vial · ≥99% HPLC Certified</p>
            </td>
            <td class="product-price">
              €120.00
            </td>
          </tr>
        </table>
      </div>

      <div class="button-container">
        <a href="https://x-med.co/products/tb-500-10mg" class="button">View Study Specifications</a>
      </div>
    `)
  },

  // 10. Reorder Reminder
  {
    id: 'reorder-reminder',
    name: 'Reorder Reminder',
    trigger: '21 days post purchase',
    delay: '21 Days',
    subject: 'Ready for your next research batch?',
    stats: { sent: 98, opened: '56.7%', clicked: '28.4%', converted: '15.2%' },
    getHtml: (vars) => wrapTemplate('Ready for your next research batch?', `
      <span class="badge">Batch Replenish</span>
      <h1 class="title">Replenish Your Laboratory Supplies</h1>
      <p class="text">
        Dear Researcher,<br><br>
        Reconstituted peptides typically degrade after 21 days. If you are preparing for your next sequence of assay runs, replenish your stock now to ensure uninterrupted testing schedules.
      </p>

      <div class="button-container">
        <a href="https://x-med.co/products" class="button">Reorder Reagents</a>
      </div>
    `)
  },

  // 11. Back in Stock Alert
  {
    id: 'back-in-stock',
    name: 'Back in Stock Alert',
    trigger: 'Inventory quantity > 0',
    delay: 'Instant notification',
    subject: 'Back in stock: Retatrutide Quick Pen',
    stats: { sent: 88, opened: '86.1%', clicked: '48.2%', converted: '31.4%' },
    getHtml: (vars) => wrapTemplate('Back in stock: Retatrutide Quick Pen', `
      <span class="badge">Inventory Replenished</span>
      <h1 class="title">Retatrutide Quick Pen Available</h1>
      <p class="text">
        Dear Researcher,<br><br>
        You asked to be notified when the X-Med Retatrutide Quick Pen 10MG – 3ML was back in stock. Fresh batches have cleared quality control and are ready for distribution.
      </p>

      <div class="product-box">
        <table class="product-table">
          <tr>
            <td style="width: 90px;">
              <img src="https://res.cloudinary.com/tedfhije/image/upload/v1783446972/ChatGPT_Image_Jul_7_2026_06_14_47_AM_ttkfde.png" class="product-img" alt="Retatrutide Pen" />
            </td>
            <td>
              <h4 class="product-name">Retatrutide Quick Pen 10MG</h4>
              <p class="product-desc">10MG - 3ML · Click Dosing</p>
            </td>
            <td class="product-price">
              €170.00
            </td>
          </tr>
        </table>
      </div>

      <div class="button-container">
        <a href="https://x-med.co/products/retatrutide-10mg-quick-pen" class="button">Order Pen Device</a>
      </div>
    `)
  },

  // 12. Price Drop Alert
  {
    id: 'price-drop',
    name: 'Price Drop Alert',
    trigger: 'Product price drops in DB',
    delay: 'Instant notification',
    subject: 'Price Drop: Save on GHK-Cu 50MG',
    stats: { sent: 64, opened: '81.4%', clicked: '38.6%', converted: '19.4%' },
    getHtml: (vars) => wrapTemplate('Price Drop: Save on GHK-Cu 50MG', `
      <span class="badge">Price Adjustment</span>
      <h1 class="title">GHK-Cu 50MG Price Lowered</h1>
      <p class="text">
        Dear Researcher,<br><br>
        A product on your wishlist, GHK-Cu 50MG, has received a price adjustment. Save on your next lab setup.
      </p>

      <div class="product-box">
        <table class="product-table">
          <tr>
            <td style="width: 90px;">
              <img src="https://res.cloudinary.com/tedfhije/image/upload/v1783428786/xmedBG3_baweau.png" class="product-img" alt="GHK-Cu" />
            </td>
            <td>
              <h4 class="product-name">GHK-Cu Copper Peptide</h4>
              <p class="product-desc">50 Mg vial · ≥99% Purity</p>
            </td>
            <td class="product-price">
              <span style="color: #6b7280; text-decoration: line-through; font-size: 12px; margin-right: 6px;">€80.00</span>
              €70.00
            </td>
          </tr>
        </table>
      </div>

      <div class="button-container">
        <a href="https://x-med.co/products/ghk-cu-50mg" class="button">Buy GHK-Cu</a>
      </div>
    `)
  },

  // 13. Low Stock / Urgency
  {
    id: 'low-stock-urgency',
    name: 'Low Stock / Urgency Alert',
    trigger: 'Stock falls below threshold',
    delay: 'System notice',
    subject: 'Running Low: Only 3 vials remaining.',
    stats: { sent: 72, opened: '65.2%', clicked: '21.0%', converted: '11.8%' },
    getHtml: (vars) => wrapTemplate('Running Low: Only 3 vials remaining.', `
      <span class="badge">Critical Stock</span>
      <h1 class="title">Inventory Depletion Notice</h1>
      <p class="text">
        Dear Researcher,<br><br>
        Inventory of Retatrutide 10mg is selling fast and has dropped below critical levels. Secure your materials immediately before the synthesis batch is exhausted.
      </p>

      <div class="button-container">
        <a href="https://x-med.co/products" class="button">Secure Stock Now</a>
      </div>
    `)
  },

  // 14. Win-Back Campaign
  {
    id: 'win-back',
    name: 'Win-Back Campaign (60d)',
    trigger: 'No orders for 60 days',
    delay: '60 Days Inactive',
    subject: 'Exclusive support grant for your research.',
    stats: { sent: 43, opened: '48.9%', clicked: '15.4%', converted: '9.2%' },
    getHtml: (vars) => wrapTemplate('Exclusive support grant for your research.', `
      <span class="badge">Grants Program</span>
      <h1 class="title">Support For Your Lab Project</h1>
      <p class="text">
        Dear Researcher,<br><br>
        We noticed your laboratory hasn't conducted any runs with X-Med materials in the last two months. We want to support your upcoming projects with a customized voucher code.
      </p>

      <div class="product-box" style="text-align: center; padding: 24px; border: 1px dashed rgba(37, 99, 235, 0.4); background: rgba(37, 99, 235, 0.02);">
        <span style="font-size: 12px; color: #9ca3af; font-family: monospace;">10% VOUCHER CODE:</span>
        <h2 style="font-family: monospace; font-size: 28px; font-weight: 900; color: #2563eb; margin: 8px 0 0 0; letter-spacing: 0.1em;">RESTART10</h2>
      </div>

      <div class="button-container">
        <a href="https://x-med.co/products?code=RESTART10" class="button">Redeem Voucher & Shop</a>
      </div>
    `)
  },

  // 15. Referral Program
  {
    id: 'referral-program',
    name: 'Referral Program',
    trigger: 'Successful order delivery',
    delay: '3 Days post delivery',
    subject: 'Earn research credits with colleagues.',
    stats: { sent: 94, opened: '72.4%', clicked: '31.6%', converted: '14.0%' },
    getHtml: (vars) => wrapTemplate('Earn research credits with colleagues.', `
      <span class="badge">Colleague Network</span>
      <h1 class="title">Invite Researchers, Earn Credits</h1>
      <p class="text">
        Dear Researcher,<br><br>
        Help other labs discover HPLC-passed reagents. Invite a colleague to X-Med. They will receive 10% off their first run, and your lab will earn €15.00 in research credits.
      </p>

      <div class="button-container">
        <a href="https://x-med.co/account#referrals" class="button">Share Referral Link</a>
      </div>
    `)
  }
];
