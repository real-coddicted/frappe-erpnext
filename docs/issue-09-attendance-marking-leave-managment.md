# Issue #9 - Employee Attendance + Leave Without Pay

## Issue Details

- **Issue ID**: #9
- **Title**: Employee Attendance + Leave Without Pay
- **Status**: ✅ Completed
- **Assigned To**: Shubham Patil
- **Date Completed**: 04-Aug-2026

---

## Environment

- ERPNext v15.118.2
- Frappe Framework v15.116.1
- Frappe HR v15.63.2
- Company: Meridian Traders Pvt Ltd (MTPL)

---

## Objective

Capture monthly attendance for all employees using the Attendance Tool, simulate one unapproved absence for Karan Mehta, and prepare attendance records for Leave Without Pay (LWP) calculation during payroll generation.

---

## Prerequisites

- ✅ Issue #4 – Holiday List Configuration
- ✅ Issue #5 – Employee Creation & Organization Structure

---

## Acceptance Criteria

- Attendance marked for all 6 employees for the payroll month.
- Karan Mehta has exactly one Absent day.
- No Leave Application exists for the absent day.
- Holiday List is respected during attendance marking.

---

# Implementation

## Step 1: Open Attendance Tool

**Navigation:** HR → Attendance → Attendance Tool

Opened the Attendance Tool and configured attendance for the payroll month.

Configuration used:

| Field | Value |
|--------|-------|
| Company | Meridian Traders Pvt Ltd |
| Department | All Departments (Blank) |
| Employees | All Active Employees |
| Attendance Month | Payroll Month |

The Attendance Tool was used to generate attendance records for all active employees.

**Reference:** Figure 1

![Attendance Tool](../images/issue-9/attendance-tool.png)

*Figure 1: Attendance Tool configured for monthly attendance processing.*

---

## Step 2: Mark Employee Attendance

Using the Attendance Tool:

- Marked all six employees as **Present** on all working days.
- Weekly offs and holidays defined in the Holiday List were left unmarked.
- Attendance followed the configured Holiday List automatically.

To simulate Leave Without Pay (LWP):

- **Karan Mehta** was marked **Absent** for **one working day**.
- No Leave Application was created for that absence.

This ensures ERPNext treats the absence as **Leave Without Pay (LWP)** during payroll generation.

---

## Step 3: Verify Attendance Records

**Navigation:** HR → Attendance

Verified that attendance records were successfully created.

Verification confirmed:

- Attendance exists for all six employees.
- Karan Mehta has exactly one **Absent** record.
- Remaining working days are marked **Present**.
- Holidays and weekly offs are excluded according to the Holiday List.

**Reference:** Figure 2

![Attendance Records](../images/issue-9/attendance-records.png)

*Figure 2: Attendance records showing employee attendance including one unapproved absence for Karan Mehta.*

---

## Version Notes

Implementation in ERPNext v15 follows the Attendance Tool workflow.

Observed behavior:

- Attendance Tool automatically generates attendance records for the selected employees.
- Weekly offs and holidays configured in the Holiday List do not require manual attendance.
- Leave Without Pay (LWP) is not calculated during attendance entry.
- The single unapproved absence is carried forward and automatically appears as **Leave Without Pay (LWP)** when Salary Slips are generated in **Issue #16**.

---

## Verification

| # | Check | Status |
|---|-------|--------|
| 1 | Attendance Tool configured | ✅ |
| 2 | Attendance marked for all six employees | ✅ |
| 3 | Holiday List respected | ✅ |
| 4 | Karan Mehta has exactly one Absent day | ✅ |
| 5 | No Leave Application exists for absent day | ✅ |
| 6 | Attendance records generated successfully | ✅ |
| 7 | Attendance ready for payroll processing | ✅ |

---

## Observations

- Attendance was recorded only for working days.
- Holidays and weekly offs were automatically excluded using the configured Holiday List.
- One unapproved absence was intentionally created for Karan Mehta to simulate Leave Without Pay.
- These attendance records will directly influence payroll calculations in **Issue #16**, where the absent day will appear as an LWP deduction.

---

## Result

✅ Successfully recorded monthly attendance for all six employees.

✅ Marked Karan Mehta with exactly one unapproved Absent day.

✅ Verified Holiday List integration during attendance marking.

✅ Prepared attendance data for Leave Without Pay (LWP) calculation during payroll generation.

The attendance module is correctly configured and ready for payroll processing.

---

## Dependencies

- **Depends On:** Issue #4 and Issue #5.

---

## Next Steps

Proceed to **Issue #16 – Payroll Generation & Salary Slip Verification**, where the attendance records will be used to calculate Payment Days and Leave Without Pay (LWP).

---

## Document Information

| Item | Value |
|------|-------|
| Author | Shubham Patil |
| Repository | frappe-erpnext |
| Issue | #9 |
| Last Updated | 04-Aug-2026 |

---

## Change Log

| Date | Version | Author | Changes |
|------|---------|--------|---------|
| 04-Aug-2026 | 1.0 | Shubham Patil | Configured Attendance Tool, recorded monthly attendance for all six employees, simulated one unapproved absence for Karan Mehta, verified Holiday List integration, and prepared attendance records for Leave Without Pay (LWP) calculation in payroll. |