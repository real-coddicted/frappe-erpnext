# Issue #4 - Holiday List & Leave Types

## Issue Details
- **Issue ID**: #4
- **Title**: Create Holiday List and Leave Types
- **Status**: ✅ Completed
- **Assigned To**: Shubham Patil
- **Date Completed**: 31-Jul-2026

---

## Environment

- ERPNext v15
- HR Module
- Company: Meridian Traders Pvt Ltd (MTPL)

---

## Objective

Configure the organization's Holiday List and Leave Types required for employee leave management in ERPNext.

---

## Prerequisites

- ✅ Issue #1 (Company Setup) completed
- Company **Meridian Traders Pvt Ltd (MTPL)** exists

---

## Acceptance Criteria

- Holiday List **MTPL Holidays 2026-27** exists
- Holiday List is set as **Company's default holiday list**
- Leave Types **Casual Leave**, **Sick Leave**, and **Earned Leave** exist
- **Earned Leave** has **Is Carry Forward** enabled

---

## Implementation

### Step 1: Create Holiday List

**Navigation:** HR → Holiday List → New

Configured the holiday list with the following values:

| Field | Value |
|-------|-------|
| Holiday List Name | MTPL Holidays 2026-27 |
| Company | Meridian Traders Pvt Ltd |
| From Date | 01-04-2026 |
| To Date | 31-03-2027 |

**Weekly Holidays:**
- Set **Weekly Off** to `Sunday`
- Clicked **Get Weekly Off Dates** to auto-populate all Sundays

**Local Holidays:**
- Clicked **Add Local Holidays**
- Selected **Country = India**
- Imported the predefined Indian public holidays available in ERPNext for the selected date range

**Reference:** Figure 1

![Holiday List](../images/issue-04/holiday-list.png)

*Figure 1: MTPL Holidays 2026-27 showing weekly offs and imported public holidays*

---

### Step 2: Set as Company Default Holiday List

**Navigation:** Setup → Company → Meridian Traders Pvt Ltd

Updated the **Default Holiday List** field to **MTPL Holidays 2026-27**.

> **Note:** The field did not auto-populate. It had to be manually selected and saved. A quick refresh resolved the "Document has been modified" error.

**Reference:** Figure 2

![Company Default Holiday List](../images/issue-04/company-default-holiday.png)

*Figure 2: Company record showing MTPL Holidays 2026-27 as the default holiday list*

---

### Step 3: Create Leave Types

**Navigation:** HR → Leave Type

The ERPNext instance already contained the following default leave types:

- Casual Leave
- Sick Leave
- Leave Without Pay
- Compensatory Off
- Privilege Leave

Only **Earned Leave** was created because the remaining required leave types already existed in the ERPNext instance:

| Field | Value |
|-------|-------|
| Leave Type | Earned Leave |
| Is Carry Forward | ✅ Enabled |
| Is Earned Leave | ✅ Enabled |
| Earned Leave Frequency | Monthly |
| Allocate on Day | Last Day |

**Reference:** Figure 3

![Leave Types List](../images/issue-04/leave-types.png)

*Figure 3: Leave Types list showing Casual Leave, Sick Leave, and Earned Leave (with Carry Forward enabled)*

---

## Verification

| # | Check | Status |
|---|-------|--------|
| 1 | MTPL Holidays 2026-27 exists | ✅ |
| 2 | Holiday List has weekly offs (Sundays) | ✅ |
| 3 | Public holidays imported for India | ✅ |
| 4 | Holiday List assigned as Company's default | ✅ |
| 5 | Casual Leave exists | ✅ |
| 6 | Sick Leave exists | ✅ |
| 7 | Earned Leave exists | ✅ |
| 8 | Earned Leave has Is Carry Forward enabled | ✅ |
| 9 | Configuration saved successfully | ✅ |

---

## Observations

- ERPNext ships with default leave types pre-loaded (Casual Leave, Sick Leave, etc.)
- Only **Earned Leave** needed to be created
- The **Default Holiday List** field in the Company form required manual selection
- The **Add Local Holidays** feature imports the predefined Indian holiday calendar available in ERPNext for the selected date range, reducing manual data entry
- All configurations were saved successfully without errors

---

## Result

✅ Holiday List **MTPL Holidays 2026-27** created with weekly offs and public holidays

✅ Holiday List set as Company's default holiday list

✅ Leave Types **Casual Leave**, **Sick Leave**, and **Earned Leave** exist

✅ **Earned Leave** has **Is Carry Forward** enabled

The HR leave configuration is complete and ready for employee leave allocation and leave applications.

---

## Dependencies
- **Depends On**: Issue #1 (Company Setup)

## Next Steps
Proceed to **Issue #5 - Create Employees**

---

## Document Information

| Item | Value |
|------|-------|
| Author | Shubham Patil |
| Repository | frappe-erpnext |
| Issue | #4 |
| Last Updated | 31-Jul-2026 |