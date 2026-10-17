/**
 * ==============================================================================
 * PRAZILKAR PORTFOLIO — GOOGLE APPS SCRIPT CONTACT FORM BACKEND
 * ==============================================================================
 * Project: Prazilkar Creative Portfolio
 * URL: https://script.google.com/u/0/home/projects/1t1oNWtQdVOK2YFpUwt21kIA43Mv6uYuzozivkWCYIRyO8mtWJNnrK2Bp/edit
 *
 * FEATURES:
 * 1. Automatically records submissions into your Google Sheet (creates headers if empty)
 * 2. Sends an instant formatted email notification to your Gmail with the lead's details
 * 3. Sends an optional elegant auto-reply to the person who contacted you
 * 4. Anti-spam honeypot filter to block bots
 * 5. CORS-friendly JSON responses for Next.js / React
 * ==============================================================================
 */

// ------------------------------------------------------------------------------
// CONFIGURATION (Customize if needed)
// ------------------------------------------------------------------------------
const CONFIG = {
  // Enter your email here to receive instant inquiry alerts (e.g. "prazilkar@gmail.com")
  NOTIFY_EMAIL: "",
  
  // Sheet name where inquiries will be stored
  SHEET_NAME: "Inquiries",
  
  // Send automatic confirmation reply to the sender? (true / false)
  SEND_AUTOREPLY: true,
  
  // Your professional signature/brand name
  BRAND_NAME: "Prazilkar | Creative Visual Editor"
};

/**
 * Handle HTTP POST requests from the portfolio contact form
 */
function doPost(e) {
  const lock = LockService.getScriptLock();
  
  try {
    // Wait up to 30 seconds for concurrent write locks
    lock.waitLock(30000);
    
    // Parse incoming payload (supports JSON and form-urlencoded)
    let data = {};
    if (e && e.postData && e.postData.contents) {
      try {
        data = JSON.parse(e.postData.contents);
      } catch (jsonErr) {
        data = e.parameter || {};
      }
    } else if (e && e.parameter) {
      data = e.parameter;
    }

    const timestamp = new Date();
    const name = (data.name || "").trim();
    const email = (data.email || "").trim();
    const subject = (data.subject || "Portfolio Inquiry").trim();
    const message = (data.message || "").trim();
    const honeypot = (data.honeypot || "").trim();

    // 1. Anti-spam check: if honeypot trap is filled, silently ignore
    if (honeypot.length > 0) {
      return createJsonResponse({
        result: "success",
        message: "Submission received"
      });
    }

    // 2. Validate required fields
    if (!name || !email || !message) {
      return createJsonResponse({
        result: "error",
        message: "Missing required fields (name, email, or message)"
      });
    }

    // 3. Save into Google Spreadsheet
    const sheet = getOrCreateSheet();
    sheet.appendRow([
      timestamp,
      name,
      email,
      subject,
      message,
      "New"
    ]);

    // Format new row
    const lastRow = sheet.getLastRow();
    sheet.getRange(lastRow, 1).setNumberFormat("yyyy-mm-dd hh:mm:ss");

    // 4. Send Instant Email Alert to YOU
    sendNotificationEmail(name, email, subject, message, timestamp);

    // 5. Send Optional Auto-Reply to the Sender
    if (CONFIG.SEND_AUTOREPLY && isValidEmail(email)) {
      sendAutoReplyEmail(name, email, subject);
    }

    // Return success response
    return createJsonResponse({
      result: "success",
      message: "Your message has been sent successfully. Prazilkar will review and respond shortly.",
      timestamp: timestamp.toISOString()
    });

  } catch (error) {
    return createJsonResponse({
      result: "error",
      message: error.toString()
    });
  } finally {
    lock.releaseLock();
  }
}

/**
 * Handle HTTP GET requests (Health Check)
 */
function doGet(e) {
  return createJsonResponse({
    status: "active",
    service: "Prazilkar Portfolio Contact Backend",
    timestamp: new Date().toISOString()
  });
}

/**
 * Get or create the Inquiries sheet with formatted column headers
 */
function getOrCreateSheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet() || SpreadsheetApp.create("Prazilkar Portfolio Leads");
  let sheet = ss.getSheetByName(CONFIG.SHEET_NAME);
  
  if (!sheet) {
    sheet = ss.insertSheet(CONFIG.SHEET_NAME);
  }

  // If first row is empty, set up headers
  if (sheet.getLastRow() === 0) {
    const headers = ["Timestamp", "Name", "Email", "Subject", "Message", "Status"];
    const headerRange = sheet.getRange(1, 1, 1, headers.length);
    headerRange.setValues([headers]);
    headerRange.setBackground("#0b0c14");
    headerRange.setFontColor("#00e5ff");
    headerRange.setFontWeight("bold");
    headerRange.setFontFamily("Roboto");
    sheet.setFrozenRows(1);
    
    // Set column widths for readability
    sheet.setColumnWidth(1, 160); // Timestamp
    sheet.setColumnWidth(2, 180); // Name
    sheet.setColumnWidth(3, 220); // Email
    sheet.setColumnWidth(4, 200); // Subject
    sheet.setColumnWidth(5, 450); // Message
    sheet.setColumnWidth(6, 100); // Status
  }

  return sheet;
}

/**
 * Send stylized HTML notification to Prazilkar
 */
function sendNotificationEmail(name, email, subject, message, timestamp) {
  const formattedDate = Utilities.formatDate(timestamp, Session.getScriptTimeZone(), "MMM dd, yyyy 'at' hh:mm a");
  
  const htmlBody = `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; background: #07070a; color: #f4f4f6; border-radius: 16px; overflow: hidden; border: 1px solid rgba(255,255,255,0.1);">
      <div style="background: linear-gradient(135deg, #0891b2, #7c3aed); padding: 28px; text-align: center;">
        <h1 style="margin: 0; font-size: 24px; font-weight: 800; color: #ffffff; letter-spacing: 1px;">PRAZILKAR STUDIO</h1>
        <p style="margin: 6px 0 0; font-size: 13px; color: rgba(255,255,255,0.85); text-transform: uppercase; letter-spacing: 2px;">New Creative Inquiry Received</p>
      </div>

      <div style="padding: 28px;">
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
          <tr>
            <td style="padding: 10px 0; color: #9da0b3; font-size: 13px; width: 110px;">Sender Name:</td>
            <td style="padding: 10px 0; color: #ffffff; font-size: 15px; font-weight: 600;">${escapeHtml(name)}</td>
          </tr>
          <tr>
            <td style="padding: 10px 0; color: #9da0b3; font-size: 13px;">Email:</td>
            <td style="padding: 10px 0; color: #06b6d4; font-size: 14px;">
              <a href="mailto:${escapeHtml(email)}" style="color: #06b6d4; text-decoration: none;">${escapeHtml(email)}</a>
            </td>
          </tr>
          <tr>
            <td style="padding: 10px 0; color: #9da0b3; font-size: 13px;">Subject:</td>
            <td style="padding: 10px 0; color: #f59e0b; font-size: 14px; font-weight: 500;">${escapeHtml(subject)}</td>
          </tr>
          <tr>
            <td style="padding: 10px 0; color: #9da0b3; font-size: 13px;">Received At:</td>
            <td style="padding: 10px 0; color: #9da0b3; font-size: 13px;">${formattedDate}</td>
          </tr>
        </table>

        <div style="background: rgba(255,255,255,0.04); border-left: 3px solid #06b6d4; padding: 18px; border-radius: 8px; margin-bottom: 24px;">
          <p style="margin: 0 0 8px; font-size: 12px; color: #9da0b3; text-transform: uppercase; letter-spacing: 1px; font-weight: 600;">Project Details / Message:</p>
          <p style="margin: 0; font-size: 14px; line-height: 1.6; color: #e2e8f0; white-space: pre-wrap;">${escapeHtml(message)}</p>
        </div>

        <div style="text-align: center; margin-top: 24px;">
          <a href="mailto:${escapeHtml(email)}?subject=Re: ${encodeURIComponent(subject)}" 
             style="display: inline-block; background: linear-gradient(135deg, #06b6d4, #0891b2); color: #000000; font-weight: 700; font-size: 13px; text-decoration: none; padding: 12px 28px; border-radius: 9999px;">
            Reply to ${escapeHtml(name)} →
          </a>
        </div>
      </div>

      <div style="background: rgba(255,255,255,0.02); padding: 16px; text-align: center; border-top: 1px solid rgba(255,255,255,0.06); font-size: 11px; color: #5e6175;">
        Automated notification from Prazilkar Portfolio Website
      </div>
    </div>
  `;

  let recipient = CONFIG.NOTIFY_EMAIL;
  try {
    if (!recipient) {
      recipient = Session.getEffectiveUser().getEmail();
    }
  } catch (e) {}

  // If no recipient email is configured or resolved, log and skip email so the sheet submission succeeds!
  if (!recipient || !isValidEmail(recipient)) {
    Logger.log("Notice: Please enter your email in CONFIG.NOTIFY_EMAIL to receive email alerts.");
    return;
  }

  try {
    MailApp.sendEmail({
      to: recipient,
      subject: `⚡ New Inquiry: "${subject}" from ${name}`,
      htmlBody: htmlBody,
      replyTo: email
    });
  } catch (mailErr) {
    Logger.log("Email notification warning: " + mailErr.toString());
  }
}

/**
 * Send professional auto-reply confirmation to the sender
 */
function sendAutoReplyEmail(name, email, subject) {
  if (!email || !isValidEmail(email)) return;
  const htmlBody = `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; background: #07070a; color: #f4f4f6; border-radius: 16px; overflow: hidden; border: 1px solid rgba(255,255,255,0.1);">
      <div style="background: linear-gradient(135deg, #06b6d4, #8b5cf6); padding: 28px; text-align: center;">
        <h1 style="margin: 0; font-size: 22px; font-weight: 800; color: #ffffff; letter-spacing: 1px;">PRAZILKAR</h1>
        <p style="margin: 4px 0 0; font-size: 12px; color: rgba(255,255,255,0.9); text-transform: uppercase; letter-spacing: 1.5px;">Video Editor • Photo Editor • Content Creator</p>
      </div>

      <div style="padding: 28px; font-size: 14px; line-height: 1.6; color: #cbd5e1;">
        <p style="margin: 0 0 16px; color: #ffffff; font-size: 16px; font-weight: 600;">Hello ${escapeHtml(name)},</p>
        
        <p style="margin: 0 0 16px;">
          Thank you for reaching out regarding <strong>"${escapeHtml(subject)}"</strong>. I have received your message and will review your project details shortly.
        </p>

        <p style="margin: 0 0 16px;">
          I typically review briefs and respond within 24 hours to discuss creative direction, timelines, and deliverables.
        </p>

        <div style="margin: 24px 0; padding: 16px; background: rgba(255,255,255,0.03); border-radius: 10px; border: 1px solid rgba(255,255,255,0.08);">
          <p style="margin: 0 0 6px; font-size: 12px; color: #06b6d4; font-weight: 600; text-transform: uppercase;">In the meantime:</p>
          <p style="margin: 0; font-size: 13px; color: #9da0b3;">
            Feel free to explore my latest creative edits and Instagram Reels on my portfolio.
          </p>
        </div>

        <p style="margin: 24px 0 0; color: #ffffff; font-weight: 600;">
          Best regards,<br>
          <span style="color: #06b6d4;">Prazilkar</span><br>
          <span style="font-size: 12px; color: #9da0b3; font-weight: normal;">Video Editor • Photo Editor • Content Creator</span>
        </p>
      </div>
    </div>
  `;

  try {
    MailApp.sendEmail({
      to: email,
      subject: `Thank you for contacting Prazilkar — "${subject}"`,
      htmlBody: htmlBody
    });
  } catch (err) {
    Logger.log("Auto-reply send warning: " + err.toString());
  }
}

/**
 * Standardized JSON HTTP Response Helper with CORS
 */
function createJsonResponse(payload) {
  return ContentService.createTextOutput(JSON.stringify(payload))
    .setMimeType(ContentService.MimeType.JSON);
}

/**
 * Sanitize HTML characters to prevent XSS in email bodies
 */
function escapeHtml(text) {
  if (!text) return "";
  return String(text)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

/**
 * Basic email syntax validation
 */
function isValidEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}
