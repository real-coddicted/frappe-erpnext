# Issue #14 - Configure ESI & Professional Tax

## Issue Details

- **Issue ID**: #14
- **Title**: Configure ESI & Professional Tax
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

Configure the statutory Employee State Insurance (ESI) and Professional Tax (PT) deduction components using conditions and formulas, include them in the required Salary Structures, and verify that ESI is applied only to eligible employees based on the statutory wage threshold.

---

## Prerequisites

- ✅ Issue #5 – Employee Creation & Organization Structure
- ✅ Issue #10 – Salary Structures
- ✅ Issue #11 – Salary Structure Assignments
- ✅ Issue #12 – Payroll Settings & Payroll Period Configuration
- ✅ Issue #13 – Configure Provident Fund (PF)

---

## Acceptance Criteria

- ESI deduction configured as **0.75% of (Basic + HRA + Special Allowance)** for employees where **(B + HRA + SA) ≤ ₹21,000**.
- Professional Tax configured as a fixed deduction of **₹200** for employees where **(B + HRA + SA) ≥ ₹15,000**.
- ESI and Professional Tax deduction components added to the required Salary Structures.
- Salary Slip verification confirms ESI is applied only to eligible employees.

---

# Implementation

## Step 1: Configure Employee State Insurance (ESI)

**Navigation:** HR → Payroll → Salary Component → Employee State Insurance (ESI)

The existing **Employee State Insurance (ESI)** Salary Component was verified and configured instead of creating a new component.

The following configuration was applied:

| Field | Value |
|--------|-------|
| Type | Deduction |
| Abbreviation | ESI |
| Amount Based on Formula | Enabled |
| Condition | `(B + HRA + SA) <= 21000` |
| Formula | `(B + HRA + SA) * 0.0075` |
| Depends on Payment Days | Disabled |

This configuration calculates Employee State Insurance (ESI) at the statutory rate of **0.75%** only when the employee's total salary calculated as **Basic + HRA + Special Allowance** is less than or equal to **₹21,000**.

**Reference:** Figure 1

![ESI Component](../images/issue-14/esi-component.png)

*Figure 1: Employee State Insurance (ESI) configured with wage eligibility condition and statutory deduction formula.*

---

## Step 2: Configure Professional Tax (PT)

**Navigation:** HR → Payroll → Salary Component → Professional Tax

The existing **Professional Tax (PT)** Salary Component was updated using the required salary threshold.

The following configuration was applied:

| Field | Value |
|--------|-------|
| Type | Deduction |
| Abbreviation | PT |
| Condition | `(B + HRA + SA) >= 15000` |
| Amount | `200` |
| Amount Based on Formula | Disabled |

Professional Tax was configured as a fixed deduction of **₹200** whenever **Basic + HRA + Special Allowance** is **₹15,000 or above**.

**Reference:** Figure 2

![Professional Tax Component](../images/issue-14/professional-tax.png)

*Figure 2: Professional Tax configured using the required salary threshold.*

---

## Step 3: Update Salary Structures

**Navigation:** HR → Payroll → Salary Structure

Verified that both deduction components were included in the required Salary Structures:

- Grade A Structure
- Grade C Structure

The following deduction components are present and will be included during payroll processing:

- Provident Fund (PF)
- Employee State Insurance (ESI)
- Professional Tax (PT)
- Income Tax (IT)

**Reference:** Figure 3

![Salary Structure](../images/issue-14/salary-structure-deductions.png)

*Figure 3: Salary Structure containing PF, ESI, Professional Tax, and Income Tax deduction components.*

---

## Step 4: Verify Salary Slip Calculation

**Navigation:** HR → Payroll → Salary Slip

Generated Salary Slips for employees from different salary grades to validate statutory deduction behavior.

### Grade C Employee

Verified that:

- `(B + HRA + SA)` was within the statutory ESI threshold.
- ESI deduction was calculated using:

- Professional Tax deduction of ₹200 was applied because the configured salary condition was satisfied.

**Reference:** Figure 4

![Grade C Salary Slip](../images/issue-14/grade-c-salary-slip.png)

*Figure 4: Grade C Salary Slip showing ESI and Professional Tax deductions.*

### Grade A Employee

Verified that:

- `(B + HRA + SA)` exceeded ₹21,000.
- ESI deduction was **not applied**.
- Professional Tax deduction of ₹200 continued to apply according to the configured condition.

**Reference:** Figure 5

![Grade A Salary Slip](../images/issue-14/grade-a-salary-slip.png)

*Figure 5: Grade A Salary Slip where ESI is not deducted because the employee exceeds the statutory threshold.*

---

## Version Notes

During implementation, several adjustments were required because the ERPNext v15 environment differed from the original issue instructions.

Observed differences:

- ERPNext already contained predefined Employee State Insurance (ESI) and Professional Tax (PT) Salary Components.
- Existing Salary Structures already included deduction rows for ESI and Professional Tax.
- The project salary structure did not use a `GROSS` abbreviation. Instead, statutory deductions were configured using:

to calculate salary eligibility.

- Professional Tax was configured using a fixed amount with a salary condition instead of a formula.
- Depends on Payment Days remained disabled to avoid duplicate deduction calculations.

---

## Verification

| # | Check | Status |
|---|-------|--------|
| 1 | Existing ESI component verified | ✅ |
| 2 | ESI configured as Deduction | ✅ |
| 3 | ESI condition configured as `(B + HRA + SA) <= 21000` | ✅ |
| 4 | ESI formula configured as `(B + HRA + SA) * 0.0075` | ✅ |
| 5 | Existing Professional Tax component verified | ✅ |
| 6 | Professional Tax condition configured as `(B + HRA + SA) >= 15000` | ✅ |
| 7 | Professional Tax fixed amount configured as ₹200 | ✅ |
| 8 | ESI present in Grade A Structure | ✅ |
| 9 | ESI present in Grade C Structure | ✅ |
| 10 | Professional Tax present in Grade A Structure | ✅ |
| 11 | Professional Tax present in Grade C Structure | ✅ |
| 12 | Grade C Salary Slip verified | ✅ |
| 13 | Grade A Salary Slip verified | ✅ |

---

## Observations

- ERPNext already included predefined Employee State Insurance (ESI) and Professional Tax (PT) Salary Components.
- The project salary structure calculates statutory deductions using **Basic + HRA + Special Allowance** instead of a Gross Salary component.
- ESI is calculated only when `(B + HRA + SA) <= ₹21,000`.
- Professional Tax is deducted as a fixed amount of ₹200 when `(B + HRA + SA) >= ₹15,000`.
- Existing Salary Structures already contained deduction rows, therefore only configuration updates were required.
- Salary Slip verification confirmed that ESI is applied only to eligible employees while Professional Tax follows the configured salary threshold.

---

## Result

✅ Verified and configured the existing Employee State Insurance (ESI) Salary Component.

✅ Configured ESI using the condition `(B + HRA + SA) <= 21000` with the formula:

✅ Configured Professional Tax using the condition `(B + HRA + SA) >= 15000` with a fixed deduction amount of **₹200**.

✅ Verified both deduction components within the required Salary Structures.

✅ Validated deduction behavior using Salary Slips for both Grade C and Grade A employees.

The payroll environment is correctly configured for statutory ESI and Professional Tax calculations in ERPNext v15.

---

## Dependencies

- **Depends On:** Issue #5, Issue #10, Issue #11, Issue #12, and Issue #13.

---

## Next Steps

Proceed to the next payroll configuration task.

---

## Document Information

| Item | Value |
|------|-------|
| Author | Shubham Patil |
| Repository | frappe-erpnext |
| Issue | #14 |
| Last Updated | 03-Aug-2026 |

---

## Change Log

| Date | Version | Author | Changes |
|------|---------|--------|---------|
| 03-Aug-2026 | 1.1 | Shubham Patil | Configured existing ESI and Professional Tax components using project salary components (B, HRA, SA), updated Salary Structures, verified statutory deductions using Grade A and Grade C Salary Slips, and documented ERPNext v15 implementation differences. |