# Issue #13 - Configure Provident Fund (PF)

## Issue Details

- **Issue ID**: #13
- **Title**: Configure Provident Fund (PF)
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

Configure the statutory Provident Fund (PF) deduction component, include it in the required Salary Structures, and update Employee payroll records with dummy Provident Fund account information required for payroll processing.

---

## Prerequisites

- ✅ Issue #5 – Employee Creation & Organization Structure
- ✅ Issue #10 – Salary Structures
- ✅ Issue #11 – Salary Structure Assignments
- ✅ Issue #12 – Payroll Settings & Payroll Period Configuration

---

## Acceptance Criteria

- PF deduction component configured at **12% of Basic Salary**.
- PF deduction component added to the required Salary Structures.
- Dummy Provident Fund account information recorded for all employees.

---

# Implementation

## Step 1: Configure Provident Fund Salary Component

**Navigation:** HR → Payroll → Salary Component → Provident Fund

The existing **Provident Fund** Salary Component was verified and configured instead of creating a new component.

The following configuration was applied:

| Field | Value |
|--------|-------|
| Type | Deduction |
| Abbreviation | PF |
| Amount Based on Formula | Enabled |
| Formula | `B * 0.12` |
| Depends on Payment Days | Disabled |

> **Important:** The **Depends on Payment Days** option was disabled because the PF formula already references the Basic salary component (`B`), which itself is calculated based on payment days. Keeping both enabled would result in duplicate payment-days dependency.

**Reference:** Figure 1

![Provident Fund Component](../images/issue-13/pf-component.png)

*Figure 1: Provident Fund Salary Component configured using a formula equal to 12% of Basic Salary.*

---

## Step 2: Update Salary Structures

**Navigation:** HR → Payroll → Salary Structure

Added the **Provident Fund (PF)** deduction component to the following Salary Structures:

- Grade A Structure
- Grade C Structure

The deduction was added under the **Deductions** table while keeping the Salary Structures aligned with the project requirements.

**Reference:** Figure 2

![Salary Structure PF](../images/issue-13/salary-structure-pf.png)

*Figure 2: Provident Fund deduction added to the Salary Structure.*

---

## Step 3: Update Employee Payroll Information

**Navigation:** HR → Employee → Salary

Updated all six Employee records with dummy Provident Fund account information.

Example dummy values used:

| Employee | PF Account Number |
|----------|-------------------|
| Priya Sharma | 101234567801 |
| Rahul Verma | 101234567802 |
| Anjali Nair | 101234567803 |
| Karan Mehta | 101234567804 |
| Sneha Iyer | 101234567805 |
| Vikram Singh | 101234567806 |

**Reference:** Figure 3

![Employee PF Account](../images/issue-13/employee-pf-account.png)

*Figure 3: Dummy Provident Fund account recorded in the Employee Salary section.*

---

## Version Notes

During implementation, the current ERPNext v15 environment differed slightly from the original task instructions.

Observed differences:

- The system already contained a **Provident Fund** Salary Component, therefore no additional PF component was created.
- The Employee master did **not** expose a dedicated **UAN** field. Instead, the available **Provident Fund Account** field was used to record dummy Provident Fund information for all employees.
- The existing Salary Structures had already been submitted as part of Issue #11. Since submitted Salary Structures cannot be modified, they were cancelled/deleted and recreated to include the PF deduction before recreating the corresponding Salary Structure Assignments.

These changes preserved the intended payroll configuration while remaining compatible with the ERPNext v15 implementation.

---

## Verification

| # | Check | Status |
|---|-------|--------|
| 1 | Existing Provident Fund component verified | ✅ |
| 2 | PF configured as Deduction | ✅ |
| 3 | Formula configured as `B * 0.12` | ✅ |
| 4 | Amount Based on Formula enabled | ✅ |
| 5 | Depends on Payment Days disabled | ✅ |
| 6 | PF added to Grade A Structure | ✅ |
| 7 | PF added to Grade C Structure | ✅ |
| 8 | Employee PF account information updated | ✅ |
| 9 | Salary Structures recreated successfully | ✅ |
|10| Salary Structure Assignments recreated successfully | ✅ |

---

## Observations

- ERPNext already included a predefined **Provident Fund** Salary Component.
- The statutory PF deduction was implemented using the formula **12% of Basic Salary (`B * 0.12`)**.
- Disabling **Depends on Payment Days** prevents duplicate payment-days calculations because the Basic component already accounts for attendance.
- The Employee DocType in the current ERPNext v15 environment stores Provident Fund information using the **Provident Fund Account** field instead of a dedicated **UAN** field.
- Salary Structures required recreation because submitted documents cannot be modified after Salary Structure Assignments have been created.

---

## Result

✅ Verified and configured the existing Provident Fund Salary Component.

✅ Configured statutory PF deduction at **12% of Basic Salary**.

✅ Added Provident Fund deduction to the required Salary Structures.

✅ Updated all employee payroll records with dummy Provident Fund account information.

✅ Recreated Salary Structures and Salary Structure Assignments after incorporating the PF deduction.

The payroll configuration is now ready for statutory deduction processing in subsequent payroll issues.

---

## Dependencies

- **Depends On:** Issue #5, Issue #10, Issue #11, and Issue #12.

---

## Next Steps

Proceed to **Issue #14 – Configure Professional Tax (PT)**.

---

## Document Information

| Item | Value |
|------|-------|
| Author | Shubham Patil |
| Repository | frappe-erpnext |
| Issue | #13 |
| Last Updated | 03-Aug-2026 |

---

## Change Log

| Date | Version | Author | Changes |
|------|---------|--------|---------|
| 03-Aug-2026 | 1.0 | Shubham Patil | Configured Provident Fund formula, updated Salary Structures, recreated Salary Structures and Salary Structure Assignments, populated dummy Provident Fund account information, and documented ERPNext v15 implementation differences. |