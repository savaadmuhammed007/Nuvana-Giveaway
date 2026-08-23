/**
 * ==============================================================================
 * NUVANA.GO - PAPPINISSERI LAUNCH CAMPAIGN ("Scan • Explore • Win")
 * Google Apps Script - Secure Google Sheets Endpoint
 * ==============================================================================
 * 
 * Instructions:
 * 1. Open Google Sheets (create a new blank spreadsheet: "Nuvana.go Pappinisseri Campaign Leads")
 * 2. Go to Extensions > Apps Script
 * 3. Delete any default code and paste this entire file
 * 4. Click "Deploy" > "New deployment" (or "Manage deployments" > Edit > New Version)
 * 5. Select type: "Web app"
 * 6. Description: "Nuvana Campaign Webhook"
 * 7. Execute as: "Me"
 * 8. Who has access: "Anyone" (CRITICAL: MUST BE "Anyone")
 * 9. Click "Deploy", authorize permissions, and copy the Web App URL!
 * 10. Paste the Web App URL in your .env (VITE_GOOGLE_SCRIPT_URL=...) or in the Admin Settings.
 * ==============================================================================
 */

const SHEET_NAME = "Giveaway_Entries";

const HEADERS = [
  "Timestamp",
  "Entry ID",
  "Full Name",
  "WhatsApp Number",
  "Email",
  "Location",
  "Interested Service",
  "Consent",
  "Referral Code",
  "Referred By",
  "QR Source",
  "Device",
  "Entry Status"
];

function setupSheet(sheet) {
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADERS);
    const headerRange = sheet.getRange(1, 1, 1, HEADERS.length);
    headerRange.setBackground("#F7941D");
    headerRange.setFontColor("#FFFFFF");
    headerRange.setFontWeight("bold");
    headerRange.setHorizontalAlignment("center");
    sheet.setFrozenRows(1);
  }
}

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.tryLock(10000);

  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    let sheet = ss.getSheetByName(SHEET_NAME);
    if (!sheet) {
      sheet = ss.getSheets()[0] || ss.insertSheet(SHEET_NAME);
    }
    setupSheet(sheet);

    // Parse incoming data
    let data = {};
    if (e && e.postData && e.postData.contents) {
      try {
        data = JSON.parse(e.postData.contents);
      } catch (err) {
        data = e.parameter || {};
      }
    } else if (e && e.parameter) {
      data = e.parameter;
    }

    // Handle Delete Entry Action
    if (data.action === "delete" && data.entryId) {
      const allData = sheet.getDataRange().getValues();
      for (let i = 1; i < allData.length; i++) {
        if (String(allData[i][1]).trim() === String(data.entryId).trim()) {
          sheet.deleteRow(i + 1);
          return ContentService.createTextOutput(JSON.stringify({
            status: "success",
            message: "Entry " + data.entryId + " deleted from Google Sheet"
          })).setMimeType(ContentService.MimeType.JSON);
        }
      }
      return ContentService.createTextOutput(JSON.stringify({
        status: "not_found",
        message: "Entry ID not found"
      })).setMimeType(ContentService.MimeType.JSON);
    }

    const timestamp = data.timestamp || new Date().toISOString();
    const entryId = data.entryId || "NUV-2026-" + Math.floor(10000 + Math.random() * 90000);
    const fullName = data.fullName || "";
    const phone = data.phone || "";
    const email = data.email || "";
    const location = data.location || "";
    const service = data.service || "";
    const consent = data.consent || "YES";
    const referralCode = data.referralCode || entryId;
    const referredBy = data.referredBy || "";
    const qrSource = data.qrSource || "direct-web";
    const device = data.device || "";
    const entryStatus = data.entryStatus || "Active";

    // Duplicate check by phone number (last 10 digits)
    const phoneClean = String(phone).replace(/\D/g, '').slice(-10);
    if (phoneClean) {
      const allData = sheet.getDataRange().getValues();
      for (let i = 1; i < allData.length; i++) {
        const existingPhone = String(allData[i][3]).replace(/\D/g, '').slice(-10);
        if (existingPhone === phoneClean) {
          return ContentService.createTextOutput(JSON.stringify({
            status: "duplicate",
            message: "Mobile number already entered",
            entryId: allData[i][1]
          })).setMimeType(ContentService.MimeType.JSON);
        }
      }
    }

    // Append new row
    sheet.appendRow([
      timestamp,
      entryId,
      fullName,
      phone,
      email,
      location,
      service,
      consent,
      referralCode,
      referredBy,
      qrSource,
      device,
      entryStatus
    ]);

    const totalEntries = Math.max(1, sheet.getLastRow() - 1);

    return ContentService.createTextOutput(JSON.stringify({
      status: "success",
      entryId: entryId,
      totalEntries: totalEntries,
      message: "Entry recorded successfully"
    })).setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      status: "error",
      message: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}

function doGet(e) {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    let sheet = ss.getSheetByName(SHEET_NAME);
    if (!sheet) {
      sheet = ss.getSheets()[0];
    }
    if (!sheet) {
      return ContentService.createTextOutput(JSON.stringify({
        status: "success",
        totalEntries: 0,
        entries: []
      })).setMimeType(ContentService.MimeType.JSON);
    }

    const rows = sheet.getDataRange().getValues();
    if (rows.length <= 1) {
      return ContentService.createTextOutput(JSON.stringify({
        status: "success",
        totalEntries: 0,
        entries: []
      })).setMimeType(ContentService.MimeType.JSON);
    }

    const entries = [];
    for (let i = 1; i < rows.length; i++) {
      const r = rows[i];
      if (!r[1] && !r[3]) continue; // Skip empty rows
      entries.push({
        timestamp: r[0] ? new Date(r[0]).toISOString() : new Date().toISOString(),
        entryId: String(r[1] || ''),
        fullName: String(r[2] || ''),
        phone: String(r[3] || ''),
        email: String(r[4] || ''),
        location: String(r[5] || ''),
        service: String(r[6] || ''),
        consent: String(r[7] || '') === 'YES' || r[7] === true,
        referralCode: String(r[8] || r[1] || ''),
        referredBy: String(r[9] || ''),
        qrSource: String(r[10] || 'direct-web'),
        device: String(r[11] || ''),
        status: String(r[12] || 'Verified'),
        referralCount: 0
      });
    }

    // Calculate dynamic referral counts
    const refMap = {};
    entries.forEach(item => {
      if (item.referredBy) {
        refMap[item.referredBy] = (refMap[item.referredBy] || 0) + 1;
      }
    });
    entries.forEach(item => {
      item.referralCount = refMap[item.entryId] || refMap[item.referralCode] || 0;
    });

    return ContentService.createTextOutput(JSON.stringify({
      status: "success",
      campaign: "Nuvana.go Pappinisseri Launch 2026",
      totalEntries: entries.length,
      entries: entries
    })).setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({
      status: "error",
      message: err.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}
