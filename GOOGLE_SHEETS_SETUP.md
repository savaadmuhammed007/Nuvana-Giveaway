# 📊 Google Sheets Backend Integration Guide for Nuvana.go

This campaign uses **Google Sheets** via **Google Apps Script** as a secure, serverless database. No private service accounts or secret keys are exposed on the frontend!

---

## 🚀 3-Minute 1-Click Setup

### Step 1: Create a Google Sheet
1. Open [Google Sheets](https://sheets.new) and create a new blank spreadsheet.
2. Name it: **`Nuvana.go Pappinisseri Campaign Leads`**

### Step 2: Open Apps Script
1. In the Google Sheet top menu, click **Extensions** → **Apps Script**.
2. Erase any existing code in the editor.
3. Open the file [`google-apps-script/Code.gs`](./google-apps-script/Code.gs) in this project, copy all its code, and paste it into the Apps Script editor.
4. Click **Save (💾)** or press `Ctrl + S`.

### Step 3: Deploy as Web App
1. Click the blue **Deploy** button (top right) → select **New deployment**.
2. Click the gear icon (⚙️) next to "Select type" and choose **Web app**.
3. Fill in the deployment details:
   - **Description**: `Nuvana Campaign Giveaway API`
   - **Execute as**: `Me (your-email@gmail.com)`
   - **Who has access**: **`Anyone`** ⚠️ *(Crucial: This allows the campaign web app to submit leads securely without login)*
4. Click **Deploy**.
5. Grant access / Authorize permissions if prompted by Google.
6. Copy the **Web App URL** (it will look like `https://script.google.com/macros/s/AKfycb.../exec`).

### Step 4: Connect to Your Website
You can link the Google Sheet in two easy ways:

#### Option A: In-App Admin Settings (Immediate)
1. On the website, scroll to the footer and click **Admin Portal** (or click the shield icon in the top corner).
2. Enter PIN: `pappinisseri2026`
3. In the **Google Sheets Sync** card, paste your copied Web App URL and click **Save & Connect**.

#### Option B: Environment Variable (`.env`)
Create a `.env` file in the root directory:
```env
VITE_GOOGLE_SCRIPT_URL=https://script.google.com/macros/s/AKfycb.../exec
```

---

## 📋 Google Sheet Columns Automatically Formatted:
1. **Timestamp**: Exact date & time of submission
2. **Entry ID**: Unique giveaway reference (e.g. `PAP-2026-00421`)
3. **Full Name**: Participant name
4. **WhatsApp Number**: Validated Indian mobile number
5. **Email**: Optional email
6. **Location**: Kerala area / town (e.g. Keecheri, Aaron, Kalliasseri, Dharmasala, Pappinisseri)
7. **Interested Service**: Travel, Cargo, Visa, Ticketing, or Multiple
8. **Consent**: Opt-in confirmation
9. **Referral Code**: Participant's personal invite code
10. **Referred By**: Inviter's Entry ID if entered via friend's link
11. **QR Source**: Location tag of the scanned poster (e.g. `pappinisseri-junction`, `bus-stand`, `keechery-poster`)
12. **Device**: Browser & mobile model info
13. **Entry Status**: `Active` / `Verified`

---

## 🔒 Security & Offline Mode
- The frontend features automatic fallback: if offline or before the sheet is connected, all leads and analytics are safely preserved locally and ready to sync.
- Duplicate mobile numbers are automatically detected and prevented from creating multiple entries.
