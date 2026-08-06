# Issue #16 - Payroll Entry & Salary Slip Generation

## Issue Details

- **Issue ID:** #16
- **Title:** Payroll Entry → Salary Slips
- **Status:** ✅ Completed
- **Assigned To:** Shubham Patil
- **Date Completed:** 04-Aug-2026

---

## Environment

- ERPNext v15.118.2
- Frappe Framework v15.116.1
- Frappe HR v15.63.2
- Company: Meridian Traders Pvt Ltd (MTPL)

---

## Objective

Generate and submit a complete payroll cycle for Meridian Traders Pvt Ltd by creating a Payroll Entry, retrieving all employees, generating Salary Slips, and validating that attendance records from **Issue #9** correctly produce **Leave Without Pay (LWP)** deductions during payroll processing.

---

## Prerequisites

- ✅ Issue #9 – Employee Attendance & Leave Without Pay
- ✅ Issue #11 – Salary Structure Assignments
- ✅ Issue #12 – Payroll Settings & Payroll Period
- ✅ Issue #13 – Provident Fund (PF)
- ✅ Issue #14 – ESI & Professional Tax
- ✅ Issue #15 – TDS Computation

---

## Acceptance Criteria

- Payroll Entry successfully generated for all employees.
- All six employees retrieved into Payroll Entry.
- Salary Slips successfully generated and submitted.
- Karan Mehta's Salary Slip reflects Leave Without Pay (LWP) deduction from attendance.
- Payroll completed successfully without payroll calculation errors.

---

# Implementation

## Step 1: Create Payroll Entry

**Navigation:** HR → Payroll → Payroll Entry

Created a new Payroll Entry using the configured payroll settings.

Configuration used:

| Field | Value |
|--------|-------|
| Company | Meridian Traders Pvt Ltd |
| Payroll Frequency | Monthly |
| Start Date | 01-05-2026 |
| End Date | 31-05-2026 |

Clicked **Get Employees** to retrieve employees eligible for payroll.

The Payroll Entry successfully retrieved all six active employees.

**Reference:** Figure 1

![Payroll Entry](../images/issue-16/payroll-entry.png)

*Figure 1: Payroll Entry showing all six employees successfully retrieved for payroll processing.*

---

## Step 2: Attendance Validation

Payroll calculations automatically used attendance records created in **Issue #9**.

Attendance verification confirmed:

- All employees were marked Present for working days.
- **Karan Mehta** had one unapproved Absent day.
- No Leave Application existed for the absence.
- ERPNext automatically converted the absence into **Leave Without Pay (LWP)**.

**Reference:** Figure 2

![Karan Attendance](../images/issue-16/karan-attendance.png)

*Figure 2: Attendance record showing Karan Mehta with one unapproved absent day.*

---

## Step 3: Verify Normal Attendance

Verified another employee with complete attendance to ensure payroll calculations differed correctly.

**Anjali Nair** maintained full attendance throughout the payroll period without any Leave Without Pay deduction.

**Reference:** Figure 3

![Anjali Attendance](../images/issue-16/anjali-attendance.png)

*Figure 3: Attendance record showing Anjali Nair with full attendance.*

---

## Step 4: Generate Salary Slips

After employee retrieval:

- Submitted the Payroll Entry.
- Clicked **Create Salary Slips**.
- ERPNext generated Salary Slips for all six employees.

Payroll calculations included:

- Basic Salary
- House Rent Allowance (HRA)
- Special Allowance (SA)
- Provident Fund (PF)
- Employee State Insurance (ESI)
- Professional Tax (PT)
- Income Tax (TDS)
- Leave Without Pay (where applicable)

Verified Anjali Nair's Salary Slip to confirm successful payroll calculation.

**Reference:** Figure 4

![Salary Slip](../images/issue-16/anjali-salary-slip.png)

*Figure 4: Successfully generated Salary Slip for Anjali Nair.*

---

## Step 5: Submit Salary Slips

All generated Salary Slips were successfully submitted.

ERPNext displayed a successful completion message after payroll processing.

**Reference:** Figure 5

![Payroll Success](../images/issue-16/payroll-success.png)

*Figure 5: Payroll successfully completed and Salary Slips submitted.*

---

## Version Notes

During implementation, ERPNext v15 behaved slightly differently from earlier documentation.

Observed differences:

- Payroll Entry derives payroll processing from the selected **Start Date** and **End Date** instead of requiring a separate Payroll Period selection.
- Salary Slips are generated through the **Create Salary Slips** action after retrieving employees.
- Attendance records automatically determine **Payment Days** and **Leave Without Pay (LWP)**.
- Payroll integrates deductions configured in previous issues, including Provident Fund (PF), Employee State Insurance (ESI), Professional Tax (PT), and Income Tax (TDS).

---

## Verification

| # | Check | Status |
|---|-------|--------|
| 1 | Payroll Entry created | ✅ |
| 2 | Company configured correctly | ✅ |
| 3 | All six employees retrieved | ✅ |
| 4 | Salary Slips generated | ✅ |
| 5 | Salary Slips submitted | ✅ |
| 6 | Attendance integrated into payroll | ✅ |
| 7 | Karan Mehta shows one Leave Without Pay day | ✅ |
| 8 | Employees with full attendance have no LWP deduction | ✅ |
| 9 | Payroll calculations completed successfully | ✅ |

---

## Observations

- Payroll Entry successfully retrieved all six active employees.
- Attendance records from Issue #9 automatically determined Payment Days.
- Karan Mehta's single unapproved absence resulted in one Leave Without Pay (LWP) deduction.
- Employees with full attendance generated Salary Slips without LWP deductions.
- Provident Fund (PF), Employee State Insurance (ESI), Professional Tax (PT), and Income Tax (TDS) were automatically calculated using previously configured Salary Components.
- Employee email notification warnings did not affect payroll processing or Salary Slip generation.

---

## Result

✅ Successfully created Payroll Entry for Meridian Traders Pvt Ltd.

✅ Retrieved all six employees into the payroll cycle.

✅ Generated and submitted Salary Slips for all employees.

✅ Verified automatic Leave Without Pay (LWP) deduction for Karan Mehta based on attendance.

✅ Confirmed payroll calculations correctly integrated Attendance, Salary Structures, Provident Fund (PF), Employee State Insurance (ESI), Professional Tax (PT), and Income Tax (TDS).

The payroll process completed successfully and the system is ready for subsequent payroll cycles.

---

## Dependencies

**Depends On:** Issue #9, Issue #11, Issue #12, Issue #13, Issue #14, and Issue #15.

---

## Next Steps

Proceed to the next HR and Payroll implementation task.

---

## Document Information

| Item | Value |
|------|-------|
| Author | Shubham Patil |
| Repository | frappe-erpnext |
| Issue | #16 |
| Last Updated | 04-Aug-2026 |

---

## Change Log

| Date | Version | Author | Changes |
|------|---------|--------|---------|
| 04-Aug-2026 | 1.0 | Shubham Patil | Generated Payroll Entry, retrieved all employees, generated and submitted Salary Slips, verified automatic Leave Without Pay deduction from attendance, validated payroll calculations, and documented ERPNext v15 payroll workflow. |