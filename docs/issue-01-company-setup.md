# Issue #1 - Company Setup

## Issue Details
- **Issue ID**: #1
- **Title**: Create Base ERPNext Company
- **Status**: ✅ Completed
- **Assigned To**: Shubham Patil
- **Date Completed**: 31-Jul-2026

---

## Environment

- ERPNext v15
- Accounting & HR Modules
- Company: Meridian Traders Pvt Ltd (MTPL)

---

## Objective

Configure the base company record and fiscal year required for all subsequent HR, Payroll, and Accounting operations in ERPNext.

---

## Prerequisites

- ERPNext instance is accessible
- Administrator credentials (provided separately by Payam)

---

## Acceptance Criteria

- Company **Meridian Traders Pvt Ltd (MTPL)** exists
- Default Currency is **INR**
- Country is **India**
- Fiscal Year **2026–2027** (01-Apr-2026 to 31-Mar-2027) exists
- Company is set as **Default Company** in Global Defaults

---

## Implementation

### Step 1: Create Company

**Navigation:** Setup → Company → New

Created the company with the following configuration:

| Field | Value |
|-------|-------|
| Company Name | Meridian Traders Pvt Ltd |
| Company Abbreviation | MTPL |
| Default Currency | INR |
| Country | India |

**Reference:** Figure 1

![Company Details](../images/issue-01/company-details.png)

*Figure 1: Company creation form showing Meridian Traders Pvt Ltd with INR currency and India as country*

---

### Step 2: Create Fiscal Year

**Navigation:** Setup → Fiscal Year → New

Created the fiscal year with the following configuration:

| Field | Value |
|-------|-------|
| Year Start Date | 01-04-2026 |
| Year End Date | 31-03-2027 |

> **Note:** In ERPNext v15, there is no separate **Default Fiscal Year** setting. The system automatically determines the active fiscal year based on transaction posting dates.

**Reference:** Figure 2

![Fiscal Year](../images/issue-01/fiscal-year.png)

*Figure 2: Fiscal Year 2026-2027 configuration*

---

### Step 3: Configure Global Defaults

**Navigation:** Setup → Global Defaults

Verified and confirmed the following settings:

| Setting | Value |
|---------|-------|
| Default Company | Meridian Traders Pvt Ltd |
| Default Currency | INR |
| Country | India |

**Reference:** Figure 3

![Global Defaults](../images/issue-01/global-defaults.png)

*Figure 3: Global Defaults showing Meridian Traders Pvt Ltd as the default company*

---

### Step 4: Validate Fiscal Year

Validated that transactions dated within the configured fiscal year (31-Jul-2026) were accepted without fiscal year validation errors.

---

## Verification

| # | Check | Status |
|---|-------|--------|
| 1 | Company "Meridian Traders Pvt Ltd" exists | ✅ |
| 2 | Company Abbreviation is "MTPL" | ✅ |
| 3 | Default Currency is "INR" | ✅ |
| 4 | Country is "India" | ✅ |
| 5 | Fiscal Year 2026-2027 exists | ✅ |
| 6 | Company appears in Global Defaults | ✅ |
| 7 | Configuration saved successfully | ✅ |

---

## Observations

- Company abbreviation (MTPL) was automatically appended to company-specific master records
- ERPNext v15 does not expose a separate **Default Fiscal Year** setting in Global Defaults
- Fiscal Year selection is determined automatically from the transaction posting date
- Default Currency (INR) and Country (India) were manually selected during company creation

---

## Result

✅ Company **Meridian Traders Pvt Ltd (MTPL)** created with INR currency

✅ Fiscal Year **2026–2027** (01-Apr-2026 to 31-Mar-2027) created

✅ Company set as **Default Company** in Global Defaults

✅ Company ready for HR, Payroll, and Accounting configuration

---

## Dependencies
- **Depends On**: None (This is the first issue)

## Next Steps
Proceed to **Issue #2 - Departments and Designations**

---

## Document Information

| Item | Value |
|------|-------|
| Author | Shubham Patil |
| Repository | frappe-erpnext |
| Issue | #1 |
| Last Updated | 31-Jul-2026 |