# Issue #10 - Salary Structure(s)

## Issue Details

- **Issue ID**: #10
- **Title**: Salary Structure(s)
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

Configure the salary structure framework required for payroll processing by:

- Verifying or creating the required Salary Components.
- Creating Salary Structures for Grade A and Grade C employees.
- Keeping all Salary Structures in **Draft** state.
- Preparing the structures for assignment in **Issue #11**.

---

## Prerequisites

- ✅ Issue #1 – Company Setup
- ✅ Issue #2 – Departments & Designations
- ✅ Issue #3 – Employee Grades & Employee Groups

---

## Acceptance Criteria

- At least two Salary Structures exist covering Grade A/B and Grade C tiers.
- Each Salary Structure includes Basic and HRA earnings at minimum.
- Salary Structures remain in **Draft** status.
- Salary assignment is deferred to Issue #11.

---

# Implementation

## Step 1: Verify Salary Components

**Navigation:** HR → Salary Component

Verified that the required earning components were available.

| Salary Component | Type | Status |
|-----------------|------|--------|
| Basic | Earning | ✅ Verified |
| House Rent Allowance (HRA) | Earning | ✅ Verified |
| Special Allowance | Earning | ✅ Verified |

These components were confirmed before creating Salary Structures.

> **Note:** Deduction components (PF, ESI, Professional Tax, TDS) were intentionally left out because they are implemented in later issues (#13, #14, and #15).

**Reference:** Figure 1

![Salary Components](../images/issue-10/salary-components.png)

*Figure 1: Salary Component list showing Basic, House Rent Allowance, and Special Allowance.*

---

## Step 2: Create Grade A Salary Structure

**Navigation:** HR → Salary Structure → New

Created the **Grade A Structure** with the following configuration.

| Field | Value |
|--------|-------|
| Salary Structure | Grade A Structure |
| Company | Meridian Traders Pvt Ltd |
| Payroll Frequency | Monthly |
| Status | Draft |
| Is Active | Yes |

Configured the Earnings table as follows:

| Component | Amount |
|-----------|---------|
| Basic | 30,000 |
| House Rent Allowance | 15,000 |
| Special Allowance | 10,000 |

No deductions were added.

The Salary Structure was saved in **Draft** status.

**Reference:** Figure 2

![Grade A Structure](../images/issue-10/grade-a-structure.png)

*Figure 2: Grade A Salary Structure configured with earnings and saved as Draft.*

---

## Step 3: Create Grade C Salary Structure

Created the **Grade C Structure** using lower salary values.

| Field | Value |
|--------|-------|
| Salary Structure | Grade C Structure |
| Company | Meridian Traders Pvt Ltd |
| Payroll Frequency | Monthly |
| Status | Draft |
| Is Active | Yes |

Configured the Earnings table.

| Component | Amount |
|-----------|---------|
| Basic | 15,000 |
| House Rent Allowance | 7,500 |
| Special Allowance | 5,000 |

The structure was saved without submitting.

**Reference:** Figure 3

![Grade C Structure](../images/issue-10/grade-c-structure.png)

*Figure 3: Grade C Salary Structure configured with earnings and saved as Draft.*

---

## Step 4: Grade Mapping

As specified in the issue requirements, Salary Structures will be reused for employee grades.

| Employee Grade | Salary Structure |
|----------------|------------------|
| Grade A | Grade A Structure |
| Grade B | Grade A Structure (Reused) |
| Grade C | Grade C Structure |

Salary Structure Assignment will be completed during **Issue #11**.

---

## Verification

| # | Check | Status |
|---|-------|--------|
| 1 | Basic Salary Component verified | ✅ |
| 2 | House Rent Allowance verified | ✅ |
| 3 | Special Allowance verified | ✅ |
| 4 | Grade A Structure created | ✅ |
| 5 | Grade C Structure created | ✅ |
| 6 | Grade A Structure saved as Draft | ✅ |
| 7 | Grade C Structure saved as Draft | ✅ |
| 8 | Grade A contains Basic + HRA | ✅ |
| 9 | Grade C contains Basic + HRA | ✅ |
| 10 | Grade B mapped to reuse Grade A Structure | ✅ |
| 11 | No deduction components configured | ✅ |

---

## Observations

- Existing Salary Components were verified before creating Salary Structures.
- Only earning components were configured because deduction components are implemented in later issues.
- All Salary Structures remain in **Draft** status as required.
- Grade B employees will reuse the Grade A Structure during Salary Structure Assignment in Issue #11.

---

## Result

✅ Verified required Salary Components.

✅ Created **Grade A Structure**.

✅ Created **Grade C Structure**.

✅ Configured all required earnings.

✅ Left all Salary Structures in **Draft** status.

✅ Prepared Salary Structures for employee assignment in **Issue #11**.

---

## Dependencies

- **Depends On:** Issue #3 – Employee Grades & Employee Groups

---

## Next Steps

Proceed to **Issue #11 – Salary Structure Assignment**.

---

## Suggested Screenshots

You only need **three screenshots**:

1. **salary-components.png**
   - HR → Salary Component list
   - Shows **Basic**, **House Rent Allowance**, and **Special Allowance**.

2. **grade-a-structure.png**
   - Open **Grade A Structure**
   - Show:
     - Draft Status
     - Company
     - Earnings table

3. **grade-c-structure.png**
   - Open **Grade C Structure**
   - Show:
     - Draft Status
     - Company
     - Earnings table

*(No separate screenshot is needed for Grade B since the issue requirement is to reuse Grade A Structure.)*

---

## Document Information

| Item | Value |
|------|-------|
| Author | Shubham Patil |
| Repository | frappe-erpnext |
| Issue | #10 |
| Last Updated | 03-Aug-2026 |

---

## Change Log

| Date | Version | Author | Changes |
|------|---------|--------|---------|
| 03-Aug-2026 | 1.0 | Shubham Patil | Created Salary Components verification, Salary Structures for Grade A and Grade C, documented Grade mapping, and verified acceptance criteria. |