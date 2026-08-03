# Issue #12 - Payroll Settings & Payroll Period Configuration

## Issue Details

- **Issue ID**: #12
- **Title**: Configure Payroll Settings and Payroll Period
- **Status**: ✅ Completed
- **Assigned To**: Shubham Patil
- **Date Completed**: 03-Aug-2026

---

## Environment

- ERPNext v15.118.2
- Frappe Framework v15.116.1
- Frappe HR v15.63.2
- Company: Meridian Traders Pvt Ltd (MTPL)

---

## Objective

Configure the global payroll settings required for payroll processing and verify that an active Payroll Period exists for the company.

The payroll configuration should ensure payroll calculations are based on employee leave records and that Payroll Entry can be created successfully for the configured payroll period.

---

## Prerequisites

- ✅ Issue #1 – Company Setup
- ✅ Issue #2 – Departments & Designations
- ✅ Issue #3 – Employee Grades & Employee Groups
- ✅ Issue #10 – Salary Structures
- ✅ Issue #11 – Salary Structure Assignments

---

## Acceptance Criteria

- Payroll calculation configured according to attendance/leave.
- Active Payroll Period exists for Meridian Traders Pvt Ltd.
- Payroll Entry can be created successfully using the configured payroll settings.

---

# Implementation

## Step 1: Verify Payroll Settings

**Navigation:** HR → Payroll → Payroll Settings

Verified the payroll configuration.

| Setting | Value |
|---------|-------|
| Calculate Payroll Working Days Based On | Leave |
| Fraction of Daily Salary for Half Day | 0.5 |
| Company | Meridian Traders Pvt Ltd |

> **Note:** In the current ERPNext v15 version, the older **"Calculate Payroll Based on Attendance"** option has been replaced with **"Calculate Payroll Working Days Based On"**. Configuring this value as **Leave** ensures payroll calculations consider employee leave records, including Leave Without Pay (LWP).

**Reference:** Figure 1

![Payroll Settings](../images/issue-12/payroll-settings.png)

*Figure 1: Payroll Settings configured to calculate payroll based on Leave.*

---

## Step 2: Verify Payroll Period

**Navigation:** HR → Payroll → Payroll Period

Verified that an active Payroll Period already exists.

| Payroll Period | Company |
|---------------|---------|
| FY 2026-2027 | Meridian Traders Pvt Ltd |

Since the required Payroll Period was already available, no duplicate Payroll Period was created.

**Reference:** Figure 2

![Payroll Period](../images/issue-12/payroll-period-list.png)

*Figure 2: Existing Payroll Period for Meridian Traders Pvt Ltd.*

---

## Step 3: Validate Payroll Entry

**Navigation:** HR → Payroll → Payroll Entry → New

Created a new Payroll Entry for verification.

Verified the following:

- Company selected successfully.
- Payroll Frequency set to **Monthly**.
- Payroll Payable Account populated correctly.
- Payroll Entry accepted the configured payroll period dates.

> **Version Note:** In ERPNext v15, Payroll Entry does not expose a separate **Payroll Period** field. Instead, payroll processing is determined from the selected **Start Date**, **End Date**, and **Payroll Frequency**.

**Reference:** Figure 3

![Payroll Entry](../images/issue-12/payroll-entry.png)

*Figure 3: Payroll Entry initialized successfully using the configured payroll settings.*

---

## Verification

| # | Check | Status |
|---|-------|--------|
| 1 | Payroll Settings verified | ✅ |
| 2 | Payroll based on Leave configured | ✅ |
| 3 | Payroll Period exists | ✅ |
| 4 | Company configuration verified | ✅ |
| 5 | Payroll Entry opens successfully | ✅ |
| 6 | Payroll Frequency configured | ✅ |
| 7 | Payroll processing dates accepted | ✅ |

---

## Observations

- ERPNext v15 replaces the older **Calculate Payroll Based on Attendance** setting with **Calculate Payroll Working Days Based On**.
- Payroll calculations are configured to use **Leave** records.
- The Payroll Period **FY 2026-2027** already existed and matched the project requirements.
- No duplicate Payroll Period was created.
- Payroll Entry successfully initializes using the configured company, payroll frequency, and payroll date range.
- The current ERPNext v15 interface derives payroll processing from the selected dates instead of requiring a separate Payroll Period selection.

---

## Result

✅ Verified Payroll Settings configuration.

✅ Confirmed payroll calculations are based on Leave records.

✅ Verified Payroll Period **FY 2026-2027** for Meridian Traders Pvt Ltd.

✅ Successfully validated Payroll Entry configuration.

The payroll environment is correctly configured and ready for payroll generation in subsequent issues.

---

## Dependencies

- **Depends On:** Issue #1, Issue #2, Issue #3, Issue #10, and Issue #11.

---

## Next Steps

Proceed to **Issue #13 – Provident Fund (PF) Configuration**.

---

## Document Information

| Item | Value |
|------|-------|
| Author | Shubham Patil |
| Repository | frappe-erpnext |
| Issue | #12 |
| Last Updated | 03-Aug-2026 |

---

## Change Log

| Date | Version | Author | Changes |
|------|---------|--------|---------|
| 03-Aug-2026 | 1.0 | Shubham Patil | Completed payroll settings verification, validated existing Payroll Period, and confirmed Payroll Entry initialization for ERPNext v15. |