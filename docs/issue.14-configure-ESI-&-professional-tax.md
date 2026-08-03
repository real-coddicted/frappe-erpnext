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

- ESI deduction configured as **0.75% of Gross Salary** for employees with **Gross Salary ≤ ₹21,000**.
- Professional Tax configured using the required slab condition (**₹200 for Gross Salary ≥ ₹15,000**).
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
| Condition | `GROSS <= 21000` |
| Formula | `GROSS * 0.0075` |
| Depends on Payment Days | Disabled |

This configuration ensures that ESI is calculated only for employees whose Gross Salary does not exceed the statutory eligibility limit.

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
| Condition | `GROSS >= 15000` |
| Amount | `200` |
| Amount Based on Formula | Disabled |

Employees earning below the configured threshold do not receive the Professional Tax deduction, while employees meeting the threshold are deducted a fixed amount of ₹200.

**Reference:** Figure 2

![Professional Tax Component](../images/issue-14/professional-tax.png)

*Figure 2: Professional Tax configured using the required salary threshold.*

---

## Step 3: Update Salary Structures

**Navigation:** HR → Payroll → Salary Structure

Verified that both deduction components were included in the required Salary Structures:

- Grade A Structure
- Grade C Structure

The following deduction components are present:

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

Salary Slip preview was used to verify deduction eligibility.

Verification performed:

- **Grade C Employee** (Gross Salary ≤ ₹21,000)
  - ESI calculated as **0.75% of Gross Salary**.
- **Grade A Employee** (Gross Salary > ₹21,000)
  - ESI not applied.
- Professional Tax applied according to the configured salary threshold.

---

## Version Notes

During implementation, the current ERPNext v15 environment differed slightly from the original task instructions.

Observed differences:

- ERPNext already contained predefined **Employee State Insurance (ESI)** and **Professional Tax (PT)** Salary Components, therefore no additional components were created.
- Existing Salary Structures already contained deduction rows for ESI and Professional Tax. The implementation focused on configuring the required conditions and formulas instead of adding duplicate rows.
- Professional Tax was implemented using a salary threshold condition with a fixed deduction amount, matching the project requirements.

These changes preserved the intended payroll configuration while remaining compatible with ERPNext v15.

---

## Verification

| # | Check | Status |
|---|-------|--------|
| 1 | Existing ESI component verified | ✅ |
| 2 | ESI configured as Deduction | ✅ |
| 3 | ESI condition configured as `GROSS <= 21000` | ✅ |
| 4 | ESI formula configured as `GROSS * 0.0075` | ✅ |
| 5 | Existing Professional Tax component verified | ✅ |
| 6 | Professional Tax threshold configured as `GROSS >= 15000` | ✅ |
| 7 | Professional Tax amount configured as ₹200 | ✅ |
| 8 | ESI present in Grade A Structure | ✅ |
| 9 | ESI present in Grade C Structure | ✅ |
|10 | Professional Tax present in Grade A Structure | ✅ |
|11 | Professional Tax present in Grade C Structure | ✅ |
|12 | Salary Slip verification completed | ✅ |

---

## Observations

- ERPNext already included predefined **Employee State Insurance (ESI)** and **Professional Tax (PT)** Salary Components.
- ESI uses both a **condition** and a **formula**, ensuring deductions are calculated only for employees meeting the statutory wage eligibility.
- Professional Tax uses a salary threshold condition with a fixed deduction amount.
- Existing Salary Structures already contained deduction rows, requiring only configuration updates instead of structural changes.

---

## Result

✅ Verified and configured the existing Employee State Insurance (ESI) Salary Component.

✅ Configured ESI deduction as **0.75% of Gross Salary** with eligibility condition **`GROSS <= 21000`**.

✅ Configured Professional Tax using the required salary threshold **`GROSS >= 15000`** with a deduction amount of **₹200**.

✅ Verified both deduction components within the required Salary Structures.

✅ Confirmed deduction eligibility through Salary Slip verification.

The payroll configuration is now ready for statutory deduction processing.

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
| 03-Aug-2026 | 1.0 | Shubham Patil | Configured Employee State Insurance (ESI) with statutory wage eligibility and deduction formula, configured Professional Tax salary threshold, verified Salary Structures, documented ERPNext v15 implementation differences, and validated payroll deduction eligibility. |