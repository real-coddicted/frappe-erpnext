# Issue #24 - Monthly Attendance Report & Role-Based Access

## Issue Details

| Item | Value |
|------|-------|
| **Issue ID** | #24 |
| **Title** | Monthly Attendance Report & Role-Based Access |
| **Status** | ✅ Completed |
| **Company** | Meridian Traders Pvt Ltd (MTPL) |
| **Module** | Frappe HR |
| **Assigned To** | Shubham Patil |

---

# Goal

Provide HR with a centralized attendance report for monitoring employee attendance while ensuring that company-wide attendance information is accessible only to HR users.

---

# Environment

| Component | Version |
|----------|---------|
| ERPNext | v15.118.2 |
| Frappe Framework | v15.116.1 |
| Frappe HR | v15.63.2 |

---

# Prerequisites

- ✅ Issue #7 – Employee Self-Service Configuration
- ✅ Issue #9 – Employee Attendance & Leave Without Pay (LWP)

---

# Acceptance Criteria

- Monthly Attendance Report runs successfully for MTPL.
- Report displays Present, Absent, Leave, and Leave Without Pay (LWP) status for employees.
- Karan Mehta's attendance reflects the Leave Without Pay (LWP) day configured in Issue #9.
- Company-wide attendance data is accessible only to HR Manager and HR User roles.
- Employee users cannot access the company attendance report.

---

# Implementation

## Step 1 – Generate Monthly Attendance Report

**Navigation**

```
HR → Reports → Monthly Attendance Sheet
```

Generated the Monthly Attendance Sheet for the current payroll month.

Configuration used:

| Field | Value |
|------|-------|
| Company | Meridian Traders Pvt Ltd |
| Month | May 2026 |

Verified that the report displayed attendance for all employees, including:

- Present
- Absent
- Leave
- Leave Without Pay (LWP)

**Screenshot**

![Monthly Attendance Report](../images/issue-24/01-monthly-attendance-sheet.png)

*Figure 1 – Monthly Attendance Sheet for Meridian Traders Pvt Ltd.*

---

## Step 2 – Verify Employee Attendance

Logged in as **Karan Mehta** using the HRMS Employee Self-Service portal.

Opened:

```
/hrms
```

Verified that Karan could access only his own attendance information.

Confirmed that his attendance reflected the Leave Without Pay (LWP) day configured during Issue #9.

**Screenshot**

![Employee Attendance](../images/issue-24/02-karan-attendance.png)

*Figure 2 – Karan Mehta's attendance showing the Leave Without Pay (LWP) entry.*

---

## Step 3 – Permission Validation

Verified attendance access for different user roles.

**HR Manager / HR User**

- Can access Monthly Attendance Sheet.
- Can view attendance for all employees.

**Employee**

- Can access only personal attendance through the HRMS portal.
- Cannot access the company-wide Monthly Attendance Report.

This behavior is enforced through Role Permissions together with Employee User Permissions configured in previous issues.

---

# Verification

| Check | Status |
|-------|--------|
| Monthly Attendance Report generated | ✅ |
| Company attendance displayed | ✅ |
| Present / Absent / Leave / LWP shown | ✅ |
| Karan Mehta LWP verified | ✅ |
| HR Manager access verified | ✅ |
| HR User access verified | ✅ |
| Employee restricted to own attendance | ✅ |
| Company-wide report inaccessible to employees | ✅ |

---

# Observations

- Monthly Attendance Sheet provides a consolidated attendance overview for HR.
- Attendance data accurately reflects Leave Without Pay (LWP) records created during attendance processing.
- Employee users can view only their own attendance through the HRMS portal.
- HR roles retain access to company-wide attendance reporting for monitoring and payroll validation.

---

# Result

✅ Successfully generated the Monthly Attendance Report for Meridian Traders Pvt Ltd.

✅ Verified attendance records, including Karan Mehta's Leave Without Pay (LWP) entry.

✅ Confirmed HR Manager and HR User access to company-wide attendance reporting.

✅ Verified Employee users are restricted to viewing only their own attendance information through HRMS.

---

# Dependencies

- Issue #7
- Issue #9

---

# Document Information

| Item | Value |
|------|-------|
| Repository | frappe-erpnext |
| Issue | #24 |
| Status | Completed |
| Author | Shubham Patil |

---

# Change Log

| Date | Version | Changes |
|------|---------|---------|
| 06-Aug-2026 | 1.0 | Generated Monthly Attendance Report, verified attendance data including LWP, and validated role-based access for HR and Employee users. |