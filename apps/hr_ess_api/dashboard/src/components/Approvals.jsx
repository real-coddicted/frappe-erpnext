import React, { useState, useEffect } from 'react';
import { 
  CheckSquare, 
  Check, 
  X, 
  Calendar as CalendarIcon, 
  User, 
  Clock, 
  FileText, 
  AlertCircle, 
  Sparkles,
  Inbox
} from 'lucide-react';
import { apiGet, apiPost } from '../api/client';

const Approvals = () => {
  const [approvals, setApprovals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [actionLoading, setActionLoading] = useState(null);
  const [viewTab, setViewTab] = useState('active'); // 'active' or 'history'
  const [history, setHistory] = useState([]);

  useEffect(() => {
    fetchApprovals();
  }, []);

  const fetchApprovals = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await apiGet('/method/hr_ess_api.api.manager.get_leave_approvals');
      setApprovals(data.message || []);
    } catch (err) {
      setError(err.message || 'Failed to load leave approvals');
    } finally {
      setLoading(false);
    }
  };

  const handleAction = async (leaveId, action) => {
    try {
      setActionLoading(leaveId);
      await apiPost('/method/hr_ess_api.api.manager.submit_leave_approval', {
        leave_id: leaveId,
        action: action
      });

      // Find the item to move to local session history
      const targeted = approvals.find(a => a.name === leaveId);
      if (targeted) {
        setHistory(prev => [{ ...targeted, resolution: action, resolvedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }, ...prev]);
      }

      // Remove from active list
      setApprovals(prev => prev.filter(a => a.name !== leaveId));
    } catch (err) {
      alert(err.message || `Failed to ${action.toLowerCase()} leave request`);
    } finally {
      setActionLoading(null);
    }
  };

  // Helper date formatter
  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    return new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  if (loading) {
    return (
      <div className="flex h-72 w-full flex-col items-center justify-center gap-3">
        <div className="h-8 w-8 animate-spin rounded-full border-3 border-[#4f46e5] border-t-transparent"></div>
        <p className="text-xs font-medium text-slate-400">Loading pending approvals...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full max-w-5xl mx-auto space-y-6">
      
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-200/80 pb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-rose-50 text-rose-700 text-[11px] font-semibold tracking-wide uppercase mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-600 animate-pulse"></span>
            Management Review
          </div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Leave Approvals</h1>
          <p className="text-sm text-slate-500 mt-0.5">
            Review and sign off on vacation requests and leave applications submitted by your team.
          </p>
        </div>

        {/* Status Pill & Tab Switches */}
        <div className="flex items-center gap-2 self-start sm:self-center">
          <div className="bg-slate-100 p-1 rounded-xl flex items-center gap-1 border border-slate-200/60">
            <button
              onClick={() => setViewTab('active')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                viewTab === 'active'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <span>Pending</span>
              {approvals.length > 0 && (
                <span className="px-1.5 py-0.2 rounded-full text-[10px] font-bold bg-[#4f46e5] text-white">
                  {approvals.length}
                </span>
              )}
            </button>
            <button
              onClick={() => setViewTab('history')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                viewTab === 'history'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <span>Reviewed Today</span>
              {history.length > 0 && (
                <span className="px-1.5 py-0.2 rounded-full text-[10px] font-bold bg-slate-200 text-slate-700">
                  {history.length}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Error Banner */}
      {error && (
        <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-sm flex items-start gap-3">
          <AlertCircle className="w-5 h-5 shrink-0 text-rose-600 mt-0.5" />
          <div className="flex-1">
            <p className="font-semibold">Unable to fetch approvals</p>
            <p className="text-xs text-rose-600/90 mt-0.5">{error}</p>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div className="space-y-4">
        {/* Active Tab */}
        {viewTab === 'active' && (
          <>
            {approvals.length === 0 ? (
              <div className="bg-white rounded-2xl border border-slate-200/80 p-12 text-center flex flex-col items-center justify-center">
                <div className="w-14 h-14 rounded-2xl bg-indigo-50 text-[#4f46e5] flex items-center justify-center mb-3">
                  <Sparkles size={28} />
                </div>
                <h3 className="text-base font-semibold text-slate-900">All caught up!</h3>
                <p className="text-xs text-slate-500 max-w-sm mt-1">
                  There are no pending leave applications awaiting your approval right now.
                </p>
              </div>
            ) : (
              approvals.map((req) => {
                const isSingleDay = req.from_date === req.to_date;
                const isOperating = actionLoading === req.name;

                return (
                  <div
                    key={req.name}
                    className="bg-white rounded-2xl border border-slate-200/80 p-5 lg:p-6 shadow-xs hover:border-slate-300 transition-all flex flex-col gap-4"
                  >
                    {/* Top Row: Employee + Type Badge */}
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-slate-100 border border-slate-200 text-slate-700 font-bold text-sm flex items-center justify-center shrink-0">
                          {(req.employee_name || 'U').charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <h3 className="text-sm font-bold text-slate-900 leading-tight">
                            {req.employee_name}
                          </h3>
                          <span className="text-[11px] font-mono text-slate-400">
                            {req.employee}
                          </span>
                        </div>
                      </div>

                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-50 text-[#4f46e5] border border-indigo-100/60">
                        {req.leave_type}
                      </span>
                    </div>

                    {/* Middle Block: Dates & Reason Note */}
                    <div className="bg-slate-50/80 rounded-xl p-3.5 border border-slate-100 space-y-2.5">
                      <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                        <div className="flex items-center gap-2 text-slate-700 font-medium">
                          <CalendarIcon className="w-4 h-4 text-slate-400" />
                          <span>
                            {formatDate(req.from_date)} {isSingleDay ? '' : `→ ${formatDate(req.to_date)}`}
                          </span>
                        </div>

                        <span className="px-2 py-0.5 rounded-md bg-white border border-slate-200 text-[11px] font-bold text-slate-700">
                          {req.total_leave_days} {req.total_leave_days === 1 ? 'Day' : 'Days'}
                        </span>
                      </div>

                      {req.description && (
                        <div className="text-xs text-slate-600 bg-white p-2.5 rounded-lg border border-slate-100 italic leading-relaxed">
                          "{req.description}"
                        </div>
                      )}
                    </div>

                    {/* Bottom Row: Actions */}
                    <div className="flex items-center justify-between pt-1">
                      <div className="flex items-center gap-1.5 text-xs text-slate-400">
                        <Clock size={14} />
                        <span>Awaiting decision</span>
                      </div>

                      <div className="flex items-center gap-2">
                        {/* Reject */}
                        <button
                          type="button"
                          onClick={() => handleAction(req.name, 'Rejected')}
                          disabled={isOperating}
                          className="px-3.5 py-1.5 rounded-lg text-xs font-semibold text-rose-600 bg-white border border-rose-200 hover:bg-rose-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1.5"
                        >
                          <X size={14} />
                          <span>{isOperating ? 'Updating...' : 'Reject'}</span>
                        </button>

                        {/* Approve */}
                        <button
                          type="button"
                          onClick={() => handleAction(req.name, 'Approved')}
                          disabled={isOperating}
                          className="px-4 py-1.5 rounded-lg text-xs font-semibold text-white bg-[#4f46e5] hover:bg-[#4338ca] transition-colors shadow-xs disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1.5"
                        >
                          <Check size={14} />
                          <span>{isOperating ? 'Updating...' : 'Approve'}</span>
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </>
        )}

        {/* Reviewed Today Tab */}
        {viewTab === 'history' && (
          <div className="space-y-3">
            {history.length === 0 ? (
              <div className="bg-white rounded-2xl border border-slate-200/80 p-12 text-center flex flex-col items-center justify-center">
                <Inbox size={32} className="text-slate-300 mb-2" />
                <p className="text-xs text-slate-500">No actions performed in this active session.</p>
              </div>
            ) : (
              history.map((item) => (
                <div 
                  key={item.name}
                  className="bg-white rounded-xl border border-slate-200/70 p-4 flex items-center justify-between text-xs"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center font-bold text-slate-600 text-xs">
                      {item.employee_name?.charAt(0)}
                    </div>
                    <div>
                      <p className="font-semibold text-slate-800">{item.employee_name}</p>
                      <p className="text-slate-400 text-[11px]">{item.leave_type} · {item.total_leave_days} Day(s)</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-[11px] text-slate-400">{item.resolvedAt}</span>
                    <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold ${
                      item.resolution === 'Approved'
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : 'bg-rose-50 text-rose-700 border border-rose-200'
                    }`}>
                      {item.resolution}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>

    </div>
  );
};

export default Approvals;
