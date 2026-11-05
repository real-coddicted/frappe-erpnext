import React, { useState, useEffect, useMemo } from 'react';
import {
  Calendar,
  CalendarCheck,
  Plane,
  Briefcase,
  Activity,
  Plus,
  X,
  CheckCircle,
  AlertCircle,
  Clock,
  FileText,
  Trash2,
  Filter,
  Sparkles,
  ArrowRight,
  ChevronRight,
  Info,
  CalendarRange
} from 'lucide-react';
import { apiGet, apiPost } from '../api/client';

const Leave = () => {
  const [balances, setBalances] = useState([]);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [showModal, setShowModal] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);
  const [activeFilter, setActiveFilter] = useState('All');

  // Form State
  const [formData, setFormData] = useState({
    leave_type: '',
    from_date: '',
    to_date: '',
    reason: ''
  });

  const fetchData = async () => {
    try {
      setLoading(true);
      const [balRes, histRes] = await Promise.all([
        apiGet('/method/hr_ess_api.api.leave.get_my_leave_balance'),
        apiGet('/method/hr_ess_api.api.leave.get_my_leaves')
      ]);
      const fetchedBalances = balRes.message || [];
      setBalances(fetchedBalances);
      setHistory(histRes.message || []);
      
      if (fetchedBalances.length > 0 && !formData.leave_type) {
        setFormData(prev => ({ ...prev, leave_type: fetchedBalances[0].leave_type }));
      }
    } catch (err) {
      setToastMessage({
        type: 'error',
        title: 'Error loading data',
        desc: err.message || 'Failed to fetch leave data'
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Calculate day difference between from_date and to_date
  const calculatedDays = useMemo(() => {
    if (!formData.from_date) return 0;
    if (!formData.to_date) return 1;

    const start = new Date(formData.from_date);
    const end = new Date(formData.to_date);
    if (isNaN(start.getTime()) || isNaN(end.getTime())) return 0;

    const diffTime = end.getTime() - start.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
    return diffDays > 0 ? diffDays : 0;
  }, [formData.from_date, formData.to_date]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const updated = { ...prev, [name]: value };
      // Auto-sync end date to start date if end date is blank or earlier
      if (name === 'from_date' && (!prev.to_date || prev.to_date < value)) {
        updated.to_date = value;
      }
      return updated;
    });
  };

  const handleApplyLeave = async (e) => {
    e.preventDefault();
    if (calculatedDays <= 0) return;

    setSubmitLoading(true);

    try {
      await apiPost('/method/hr_ess_api.api.leave.apply_leave', {
        leave_type: formData.leave_type,
        from_date: formData.from_date,
        to_date: formData.to_date,
        reason: formData.reason
      });
      
      setToastMessage({
        type: 'success',
        title: 'Application Submitted',
        desc: `Your ${calculatedDays}-day leave request is sent to your reporting manager.`
      });

      setShowModal(false);
      setFormData({
        leave_type: balances.length > 0 ? balances[0].leave_type : '',
        from_date: '',
        to_date: '',
        reason: ''
      });

      await fetchData();
      
      setTimeout(() => setToastMessage(null), 4500);
    } catch (err) {
      setToastMessage({
        type: 'error',
        title: 'Submission Failed',
        desc: err.message || 'Could not submit your leave application.'
      });
    } finally {
      setSubmitLoading(false);
    }
  };

  const handleWithdrawRequest = (id) => {
    // Currently no dedicated cancel/withdraw API endpoint is available in hr_ess_api
    alert(`Withdrawal for ticket ${id} is not yet supported in this version.`);
  };

  const filteredHistory = useMemo(() => {
    if (activeFilter === 'All') return history;
    return history.filter((item) => item.status === activeFilter);
  }, [history, activeFilter]);

  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    try {
      const d = new Date(dateStr + 'T00:00:00');
      return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    } catch {
      return dateStr;
    }
  };

  const getCategoryTheme = (leaveType, idx) => {
    const name = (leaveType || '').toLowerCase();
    if (name.includes('sick') || name.includes('medical')) {
      return {
        accent: 'teal', text: 'text-teal-600', badgeBg: 'bg-teal-50', dot: 'bg-teal-500', bar: 'bg-teal-500', iconName: 'activity'
      };
    }
    if (name.includes('casual') || name.includes('floating')) {
      return {
        accent: 'amber', text: 'text-amber-600', badgeBg: 'bg-amber-50', dot: 'bg-amber-500', bar: 'bg-amber-500', iconName: 'briefcase'
      };
    }
    const themes = [
      { accent: 'indigo', text: 'text-indigo-600', badgeBg: 'bg-indigo-50', dot: 'bg-indigo-600', bar: 'bg-indigo-600', iconName: 'plane' },
      { accent: 'teal', text: 'text-teal-600', badgeBg: 'bg-teal-50', dot: 'bg-teal-500', bar: 'bg-teal-500', iconName: 'activity' },
      { accent: 'amber', text: 'text-amber-600', badgeBg: 'bg-amber-50', dot: 'bg-amber-500', bar: 'bg-amber-500', iconName: 'briefcase' }
    ];
    return themes[idx % themes.length];
  };

  const renderIcon = (name) => {
    switch (name) {
      case 'plane':
        return <Plane className="w-5 h-5 text-indigo-600" />;
      case 'activity':
        return <Activity className="w-5 h-5 text-teal-600" />;
      case 'briefcase':
        return <Briefcase className="w-5 h-5 text-amber-600" />;
      default:
        return <Calendar className="w-5 h-5 text-indigo-600" />;
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Approved':
        return {
          wrapper: 'bg-emerald-50 text-emerald-700 border-emerald-200/80',
          dot: 'bg-emerald-500',
          icon: <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
        };
      case 'Rejected':
        return {
          wrapper: 'bg-rose-50 text-rose-700 border-rose-200/80',
          dot: 'bg-rose-500',
          icon: <AlertCircle className="w-3.5 h-3.5 text-rose-600" />
        };
      default:
        return {
          wrapper: 'bg-amber-50 text-amber-700 border-amber-200/80',
          dot: 'bg-amber-500',
          icon: <Clock className="w-3.5 h-3.5 text-amber-600" />
        };
    }
  };

  if (loading && balances.length === 0) {
    return (
      <div className="flex h-72 w-full flex-col items-center justify-center gap-3">
        <div className="h-8 w-8 animate-spin rounded-full border-3 border-[#4f46e5] border-t-transparent"></div>
        <p className="text-xs font-medium text-slate-400">Loading leave data...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8f9ff] text-slate-800 font-sans antialiased selection:bg-indigo-100 selection:text-indigo-900 pb-16">
      {/* Top Application Bar */}
      <header className="sticky top-0 z-20 h-16 w-full border-b border-slate-200/80 bg-white/90 backdrop-blur-md px-4 sm:px-8">
        <div className="mx-auto flex h-full max-w-6xl items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#4f46e5] text-white font-bold text-sm shadow-xs">
              P
            </div>
            <div className="flex items-center gap-1.5 text-xs font-medium text-slate-500">
              <span className="hover:text-slate-800 cursor-pointer">Workspace</span>
              <ChevronRight size={14} className="text-slate-300" />
              <span className="font-semibold text-slate-900">Leave</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="hidden sm:inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
              <Clock size={13} className="text-[#4f46e5]" />
              <span>FY Cycle</span>
            </span>

            <button
              onClick={() => setShowModal(true)}
              className="inline-flex items-center gap-1.5 rounded-xl bg-[#4f46e5] px-3.5 py-2 text-xs font-semibold text-white shadow-xs hover:bg-[#4338ca] active:scale-95 transition-all"
            >
              <Plus size={16} />
              <span>Apply for Leave</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Workspace Canvas */}
      <main className="mx-auto max-w-6xl px-4 sm:px-8 pt-8 space-y-8">
        {/* Page Hero Section */}
        <section className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 rounded-full bg-indigo-50 px-2.5 py-0.5 text-[11px] font-semibold tracking-wide uppercase text-indigo-700 mb-2">
              <Sparkles size={13} className="text-indigo-600" />
              <span>Personnel Time Off Hub</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
              Leave & Time Off
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              Track allocated PTO quotas, check accrual schedules, and register future leaves.
            </p>
          </div>

          <div className="flex items-center gap-3 bg-white p-2.5 rounded-xl border border-slate-200/80 shadow-2xs self-start sm:self-auto">
            <div className="h-9 w-9 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold text-sm">
              ✓
            </div>
            <div className="text-xs">
              <div className="font-semibold text-slate-900">Accruals Synchronized</div>
              <div className="text-slate-400">Records up to date</div>
            </div>
          </div>
        </section>

        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-500">
              Annual Balance Quotas
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {balances.map((item, idx) => {
              const theme = getCategoryTheme(item.leave_type, idx);
              const totalAlloc = item.total_allocation || 15;
              const percentage = Math.min(100, Math.round((item.balance / totalAlloc) * 100));

              return (
                <div
                  key={idx}
                  className="group relative flex flex-col justify-between rounded-2xl bg-white p-6 shadow-xs border border-slate-200/80 hover:border-indigo-300 hover:shadow-md transition-all duration-200"
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${theme.badgeBg}`}>
                        {renderIcon(theme.iconName)}
                      </div>
                      <span className="rounded-full bg-slate-50 px-2.5 py-1 text-[11px] font-semibold text-slate-600 border border-slate-100">
                        {totalAlloc} Days Allotted
                      </span>
                    </div>

                    <h3 className="mt-4 text-base font-semibold text-slate-900 group-hover:text-[#4f46e5] transition-colors">
                      {item.leave_type}
                    </h3>

                    <div className="mt-2 flex items-baseline gap-1.5">
                      <span className="text-3xl font-extrabold tracking-tight text-slate-900 font-mono">
                        {item.balance}
                      </span>
                      <span className="text-xs font-medium text-slate-500">days available</span>
                    </div>
                  </div>

                  {/* Progress Meter */}
                  <div className="mt-6 pt-4 border-t border-slate-100">
                    <div className="flex items-center justify-between text-[11px] text-slate-500 mb-1.5 font-medium">
                      <span>Remaining Quota</span>
                      <span className="font-mono text-slate-700">{percentage}%</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-slate-100 overflow-hidden">
                      <div
                        className={`h-full rounded-full ${theme.bar} transition-all duration-700 ease-out`}
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
            
            {balances.length === 0 && (
              <div className="col-span-full bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs text-center text-sm text-slate-500">
                No active leave balances found.
              </div>
            )}
          </div>
        </section>

        <section className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div>
              <h2 className="text-lg font-bold text-slate-900">Application History</h2>
              <p className="text-xs text-slate-500">
                Audit log of pending requests and manager authorizations.
              </p>
            </div>

            {/* Filter Pills */}
            <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl self-start sm:self-auto border border-slate-200/60">
              {['All', 'Pending', 'Approved', 'Rejected'].map((filter) => {
                const count =
                  filter === 'All'
                    ? history.length
                    : history.filter((h) => h.status === filter).length;

                return (
                  <button
                    key={filter}
                    onClick={() => setActiveFilter(filter)}
                    className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
                      activeFilter === filter
                        ? 'bg-white text-slate-900 shadow-xs'
                        : 'text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    <span>{filter}</span>
                    <span
                      className={`rounded-full px-1.5 py-0.2 text-[10px] font-bold ${
                        activeFilter === filter ? 'bg-slate-100 text-slate-800' : 'bg-transparent text-slate-400'
                      }`}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Leave History List */}
          {filteredHistory.length > 0 ? (
            <div className="space-y-3">
              {filteredHistory.map((item, index) => {
                const badge = getStatusBadge(item.status);
                const isSingleDay = item.from_date === item.to_date;

                return (
                  <div
                    key={item.name || index}
                    className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-2xl bg-white p-5 shadow-xs border border-slate-200/80 hover:border-slate-300 transition-all"
                  >
                    <div className="flex items-start gap-4 min-w-0">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-slate-50 border border-slate-100 text-slate-600">
                        <CalendarCheck size={20} className="text-[#4f46e5]" />
                      </div>

                      <div className="min-w-0 space-y-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <h4 className="text-sm font-bold text-slate-900">{item.leave_type}</h4>
                          <span className="text-[11px] font-mono text-slate-400">#{item.name}</span>
                        </div>

                        <div className="flex flex-wrap items-center gap-2 text-xs text-slate-600 font-medium">
                          <span className="flex items-center gap-1.5 text-slate-800">
                            <CalendarRange size={13} className="text-slate-400" />
                            {formatDate(item.from_date)}
                            {!isSingleDay && ` → ${formatDate(item.to_date)}`}
                          </span>
                          <span className="text-slate-300">·</span>
                          <span className="rounded-md bg-slate-100 px-2 py-0.5 text-[11px] font-semibold text-slate-700">
                            {item.total_leave_days} {item.total_leave_days === 1 ? 'Day' : 'Days'}
                          </span>
                          {item.creation && (
                            <>
                              <span className="text-slate-300">·</span>
                              <span className="text-slate-400 text-[11px]">Applied {formatDate(item.creation.split(' ')[0])}</span>
                            </>
                          )}
                        </div>

                        {item.description && (
                          <p className="text-xs text-slate-500 italic pt-1 leading-relaxed max-w-xl">
                            "{item.description}"
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Right Action & Badge */}
                    <div className="flex items-center justify-between sm:justify-end gap-3 self-stretch sm:self-center border-t sm:border-t-0 pt-3 sm:pt-0 border-slate-100">
                      <div
                        className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold border ${badge.wrapper}`}
                      >
                        {badge.icon}
                        <span>{item.status}</span>
                      </div>

                      {item.status === 'Pending' && (
                        <button
                          type="button"
                          onClick={() => handleWithdrawRequest(item.name)}
                          className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:bg-rose-50 hover:text-rose-600 transition"
                          title="Withdraw Application"
                        >
                          <Trash2 size={16} />
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-50 text-[#4f46e5] mb-3">
                <FileText size={26} />
              </div>
              <h3 className="text-base font-semibold text-slate-900">No applications found</h3>
              <p className="mt-1 text-xs text-slate-500 max-w-sm">
                No leave tickets match the selected filter. Click below to submit a new time off request.
              </p>
              <button
                type="button"
                onClick={() => setShowModal(true)}
                className="mt-4 inline-flex items-center gap-1.5 rounded-xl bg-slate-100 px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-200 transition"
              >
                <Plus size={15} />
                <span>Create Request</span>
              </button>
            </div>
          )}
        </section>
      </main>

      {/* Floating Application Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-xs p-4 animate-in fade-in duration-150">
          <div
            className="w-full max-w-lg rounded-2xl bg-white shadow-2xl border border-slate-100 p-6 sm:p-7 space-y-6 animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-[#4f46e5]">
                  <Plane size={20} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900">Apply for Time Off</h3>
                  <p className="text-xs text-slate-500">Submit requests for manager sign-off</p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition"
              >
                <X size={18} />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleApplyLeave} className="space-y-4">
              {/* Leave Type Select */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700">Leave Category</label>
                <select
                  name="leave_type"
                  value={formData.leave_type}
                  onChange={handleInputChange}
                  required
                  className="w-full rounded-xl bg-slate-50 border border-slate-200 px-3.5 py-2.5 text-xs text-slate-900 font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#4f46e5]/20 focus:border-[#4f46e5] transition"
                >
                  {balances.map((b) => (
                    <option key={b.leave_type} value={b.leave_type}>
                      {b.leave_type} ({b.balance} days available)
                    </option>
                  ))}
                </select>
              </div>

              {/* Date Pickers */}
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-700">Start Date</label>
                  <input
                    type="date"
                    name="from_date"
                    value={formData.from_date}
                    onChange={handleInputChange}
                    required
                    className="w-full rounded-xl bg-slate-50 border border-slate-200 px-3.5 py-2 text-xs text-slate-900 font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#4f46e5]/20 focus:border-[#4f46e5] transition"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-700">End Date</label>
                  <input
                    type="date"
                    name="to_date"
                    min={formData.from_date}
                    value={formData.to_date}
                    onChange={handleInputChange}
                    required
                    className="w-full rounded-xl bg-slate-50 border border-slate-200 px-3.5 py-2 text-xs text-slate-900 font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#4f46e5]/20 focus:border-[#4f46e5] transition"
                  />
                </div>
              </div>

              {/* Calculated Summary Pill */}
              {calculatedDays > 0 && (
                <div className="flex items-center justify-between rounded-xl bg-indigo-50/70 p-3 text-xs text-indigo-900 border border-indigo-100">
                  <div className="flex items-center gap-2">
                    <Info size={15} className="text-[#4f46e5]" />
                    <span>Duration Calculated:</span>
                  </div>
                  <span className="font-bold font-mono text-sm text-[#4f46e5]">
                    {calculatedDays} {calculatedDays === 1 ? 'working day' : 'working days'}
                  </span>
                </div>
              )}

              {/* Reason / Notes */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700">
                  Reason & Handover Context
                </label>
                <textarea
                  name="reason"
                  rows={3}
                  value={formData.reason}
                  onChange={handleInputChange}
                  placeholder="Outline handover coverage, emergency phone availability..."
                  className="w-full rounded-xl bg-slate-50 border border-slate-200 p-3 text-xs text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#4f46e5]/20 focus:border-[#4f46e5] transition resize-none"
                />
              </div>

              {/* Actions Footer */}
              <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="rounded-xl px-4 py-2.5 text-xs font-semibold text-slate-600 hover:bg-slate-100 transition"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={submitLoading || calculatedDays <= 0}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#4f46e5] px-5 py-2.5 text-xs font-semibold text-white shadow-xs hover:bg-[#4338ca] active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed transition"
                >
                  {submitLoading ? (
                    <div className="h-4 w-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                  ) : (
                    <>
                      <span>Submit Application</span>
                      <ArrowRight size={14} />
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Floating Success/Error Toast */}
      {toastMessage && (
        <div
          className={`fixed bottom-6 right-6 z-50 flex items-start gap-3 rounded-2xl p-4 shadow-xl border text-xs max-w-sm animate-in slide-in-from-bottom-5 duration-200 ${
            toastMessage.type === 'error'
              ? 'bg-rose-900 text-white border-rose-800'
              : toastMessage.type === 'info'
              ? 'bg-slate-900 text-white border-slate-800'
              : 'bg-slate-900 text-white border-slate-800'
          }`}
        >
          {toastMessage.type === 'error' ? (
            <AlertCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
          ) : (
            <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
          )}

          <div className="flex-1 space-y-0.5">
            <h4 className="font-bold text-white text-xs">{toastMessage.title}</h4>
            <p className="text-slate-300 text-[11px] leading-relaxed">{toastMessage.desc}</p>
          </div>

          <button
            onClick={() => setToastMessage(null)}
            className="text-slate-400 hover:text-white transition"
          >
            <X size={14} />
          </button>
        </div>
      )}
    </div>
  );
};

export default Leave;
