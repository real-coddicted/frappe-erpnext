# Issue #15 - TDS Computation

## Issue Details

- **Issue ID**: #15
- **Title**: TDS Computation
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

Configure Income Tax (TDS) computation for employees by creating an Income Tax Slab for the Financial Year, assigning it to Salary Structure Assignments, configuring the Income Tax Salary Component, and verifying tax deductions through Salary Slip previews.

---

## Prerequisites

- ✅ Issue #11 – Salary Structure Assignments
- ✅ Issue #14 – Configure ESI & Professional Tax

---

## Acceptance Criteria

- Income Tax Slab configured for FY 2026–27.
- Income Tax Slab assigned to Salary Structure Assignments.
- Income Tax Salary Component configured with the required payable account.
- Salary Slip preview shows non-zero TDS for higher earning employees.
- Salary Slip preview shows zero or minimal TDS for lower earning employees.

---

# Implementation

## Step 1: Configure Income Tax Slab

**Navigation:** HR → Payroll → Income Tax Slab

Created a new Income Tax Slab for the financial year using the New Tax Regime.

The following configuration was applied:

| Field | Value |
|--------|-------|
| Title | New Tax Regime FY 2026-27 |
| Effective From | 01-04-2026 |
| Company | Meridian Traders Pvt Ltd |

Configured the following tax slabs:

| Annual Taxable Income | Tax Rate |
|-----------------------|----------|
| ₹0 – ₹3,00,000 | 0% |
| ₹3,00,001 – ₹6,00,000 | 5% |
| ₹6,00,001 – ₹9,00,000 | 10% |
| ₹9,00,001 – ₹12,00,000 | 15% |
| ₹12,00,001 – ₹15,00,000 | 20% |
| Above ₹15,00,000 | 30% |

The Income Tax Slab was saved and submitted successfully.

**Reference:** Figure 1

![Income Tax Slab](../images/issue-15/income-tax-slab.png)

*Figure 1: Income Tax Slab configured for FY 2026–27 using the New Tax Regime.*

---

## Step 2: Assign Income Tax Slab

**Navigation:** HR → Payroll → Salary Structure Assignment

Opened the existing Salary Structure Assignment and assigned the configured Income Tax Slab.

Configuration verified:

| Field | Value |
|--------|-------|
| Income Tax Slab | New Tax Regime FY 2026-27 |

The assignment was saved successfully.

**Reference:** Figure 2

![Salary Structure Assignment](../images/issue-15/salary-structure-assignment-tax-slab.png)

*Figure 2: Income Tax Slab assigned to Salary Structure Assignment.*

---

## Step 3: Configure Income Tax Salary Component

**Navigation:** HR → Payroll → Salary Component → Income Tax

Verified the existing **Income Tax (IT)** Salary Component.

Configured the required accounting entry.

| Field | Value |
|--------|-------|
| Company | Meridian Traders Pvt Ltd |
| Account | Payroll Payable |

The component was saved successfully.

**Reference:** Figure 3

![Income Tax Component](../images/issue-15/income-tax-component.png)

*Figure 3: Income Tax Salary Component configured with Payroll Payable account.*

---

## Step 4: Verify TDS Calculation

**Navigation:** HR → Payroll → Salary Slip

Generated Salary Slip previews to verify automatic TDS calculation.

Verification performed:

- **Priya Sharma (Highest Salary)**
  - Income Tax (TDS) deduction generated automatically.
  - Non-zero deduction confirmed.

- **Lower Salary Employee**
  - Income Tax deduction was zero or significantly lower according to the configured tax slab.

This confirms ERPNext correctly computes TDS based on the assigned Income Tax Slab.

**Reference:** Figure 4

![Salary Slip TDS Verification](../images/issue-15/salary-slip-tds-preview.png)

*Figure 4: Salary Slip preview verifying automatic TDS calculation.*

---

## Version Notes

The implementation in ERPNext v15 differs slightly from older documentation.

Observed differences:

- Income Tax becomes available through Salary Structure Assignments once an Income Tax Slab is configured.
- Existing Income Tax Salary Component was reused instead of creating a new component.
- Only the required payable account configuration was added.
- Salary Slip automatically calculated TDS after assigning the Income Tax Slab.

These differences are consistent with ERPNext v15 payroll functionality.

---

## Verification

| # | Check | Status |
|---|-------|--------|
| 1 | Income Tax Slab created | ✅ |
| 2 | Tax Slab submitted | ✅ |
| 3 | New Tax Regime configured | ✅ |
| 4 | Salary Structure Assignment updated | ✅ |
| 5 | Income Tax Salary Component verified | ✅ |
| 6 | Payroll Payable account configured | ✅ |
| 7 | Higher salary employee shows TDS deduction | ✅ |
| 8 | Lower salary employee shows zero/minimal TDS | ✅ |
| 9 | Salary Slip calculation verified | ✅ |

---

## Observations

- ERPNext v15 automatically computes TDS after assigning an Income Tax Slab to the Salary Structure Assignment.
- Existing Income Tax Salary Component was reused.
- Payroll Payable account mapping is required for successful payroll processing.
- Higher earning employees receive TDS deductions automatically according to the configured slab.
- Lower earning employees remain exempt or receive minimal deductions depending on taxable income.

---

## Result

✅ Configured Income Tax Slab for FY 2026–27 using the New Tax Regime.

✅ Assigned the Income Tax Slab to Salary Structure Assignments.

✅ Configured the Income Tax Salary Component with the required Payroll Payable account.

✅ Verified automatic TDS computation using Salary Slip previews.

The payroll system is now configured to automatically compute statutory Income Tax (TDS) deductions.

---

## Dependencies

- **Depends On:** Issue #11 and Issue #14.

---

## Next Steps

Proceed to the next payroll configuration issue.

---

## Document Information

| Item | Value |
|------|-------|
| Author | Shubham Patil |
| Repository | frappe-erpnext |
| Issue | #15 |
| Last Updated | 04-Aug-2026 |

---

## Change Log

| Date | Version | Author | Changes |
|------|---------|--------|---------|
| 04-Aug-2026 | 1.0 | Shubham Patil | Configured Income Tax Slab using the New Tax Regime, assigned the slab to Salary Structure Assignments, configured the Income Tax Salary Component, verified Payroll Payable account mapping, and validated automatic TDS computation through Salary Slip previews. |