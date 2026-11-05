import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { apiGet, apiPost } from '../api/client';
import { 
  Timer, 
  Verified, 
  Fingerprint,
  LogIn,
  LogOut,
  CalendarDays,
  Download,
  ChevronDown,
  CheckCircle,
  XCircle,
  Clock,
  AlertCircle
} from 'lucide-react';

const Attendance = () => {
  const today = new Date();
  const [month, setMonth] = useState(today.getMonth() + 1);
  const [year, setYear] = useState(today.getFullYear());
  
  const [lastCheckin, setLastCheckin] = useState(null);
  const [attendanceList, setAttendanceList] = useState([]);
  
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [error, setError] = useState(null);
  const [actionError, setActionError] = useState(null);
  const [toastMsg, setToastMsg] = useState(null);

  // Live Timer State
  const [secondsElapsed, setSecondsElapsed] = useState(0);

  const fetchStatus = async () => {
    try {
      const res = await apiGet('/method/hr_ess_api.api.attendance.get_my_last_checkin_status');
      setLastCheckin(res.message || null);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchAttendance = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await apiGet('/method/hr_ess_api.api.attendance.get_my_attendance', { month, year });
      setAttendanceList(res.message || []);
    } catch (err) {
      setError(err.message || 'Failed to fetch attendance history');
    } finally {
      setLoading(false);
    }
  }, [month, year]);

  useEffect(() => {
    fetchStatus();
  }, []);

  useEffect(() => {
    fetchAttendance();
  }, [fetchAttendance]);

  // Handle Live Timer
  useEffect(() => {
    let intervalId;
    if (lastCheckin && lastCheckin.log_type === 'IN' && lastCheckin.time) {
      const checkinTime = new Date(lastCheckin.time).getTime();
      
      intervalId = setInterval(() => {
        const now = new Date().getTime();
        const diffSeconds = Math.floor((now - checkinTime) / 1000);
        setSecondsElapsed(diffSeconds > 0 ? diffSeconds : 0);
      }, 1000);
    } else {
      setSecondsElapsed(0);
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [lastCheckin]);

  const handleCheckInOut = async () => {
    setActionError(null);
    setActionLoading(true);
    
    const nextLogType = (lastCheckin && lastCheckin.log_type === 'IN') ? 'OUT' : 'IN';
    
    try {
      await apiPost('/method/hr_ess_api.api.attendance.check_in_out', { log_type: nextLogType });
      await fetchStatus();
      setToastMsg(`Punch ${nextLogType.toLowerCase()} logged successfully!`);
      setTimeout(() => setToastMsg(null), 3000);
    } catch (err) {
      setActionError(err.message || `Failed to check ${nextLogType.toLowerCase()}`);
    } finally {
      setActionLoading(false);
    }
  };

  const formatTime = (totalSec) => {
    const h = Math.floor(totalSec / 3600);
    const m = Math.floor((totalSec % 3600) / 60);
    const s = totalSec % 60;
    return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  const isCheckedIn = lastCheckin && lastCheckin.log_type === 'IN';
  const lastPunchTime = lastCheckin && lastCheckin.time ? new Date(lastCheckin.time) : null;
  
  const formattedLastPunch = lastPunchTime 
    ? lastPunchTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) 
    : 'Never';

  // Calculate stats for the month
  const stats = useMemo(() => {
    let present = 0, halfDay = 0, absent = 0, onLeave = 0;
    attendanceList.forEach(a => {
      if (a.status === 'Present') present++;
      else if (a.status === 'Half Day') halfDay++;
      else if (a.status === 'Absent') absent++;
      else if (a.status === 'On Leave') onLeave++;
    });
    return { present, halfDay, absent, onLeave };
  }, [attendanceList]);

  // Calculate Daily Target Progress (Assuming 8 hours target)
  const targetSeconds = 8 * 3600;
  const progressPercent = Math.min(100, Math.max(0, (secondsElapsed / targetSeconds) * 100));

  const getStatusColor = (status) => {
    switch (status) {
      case 'Present': return 'bg-emerald-50 text-emerald-700 dot-emerald-500';
      case 'Absent': return 'bg-rose-50 text-rose-700 dot-rose-500';
      case 'Half Day': return 'bg-amber-50 text-amber-800 dot-amber-500';
      case 'On Leave': return 'bg-indigo-50 text-indigo-700 dot-indigo-500';
      default: return 'bg-slate-100 text-slate-700 dot-slate-400';
    }
  };

  return (
    <div className="flex flex-col w-full max-w-5xl mx-auto space-y-6">
      
      {/* Header */}
      <section className="flex flex-col gap-1 border-b border-slate-200/80 pb-4">
        <div className="flex items-center gap-2">
          <Timer size={24} className="text-[#4f46e5]" />
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Attendance & Logs</h1>
        </div>
        <p className="text-sm text-slate-500">Track your daily work hours, punches, and monthly shifts.</p>
      </section>

      {actionError && (
        <div className="p-3 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 text-sm flex items-center gap-2">
          <AlertCircle size={18} />
          <span>{actionError}</span>
        </div>
      )}

      {/* Active Session Card */}
      <section className="flex flex-col relative overflow-hidden rounded-2xl bg-white border border-slate-200/80 p-5 shadow-xs">
        <div className="absolute -right-12 -top-12 w-48 h-48 rounded-full bg-indigo-50 blur-3xl pointer-events-none"></div>
        
        <div className="flex items-center justify-between gap-3 mb-4 relative z-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-50 border border-slate-200 shadow-xs">
            {isCheckedIn ? (
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            ) : (
              <span className="w-2 h-2 rounded-full bg-slate-400"></span>
            )}
            <span className="font-semibold text-xs text-slate-700">
              {isCheckedIn ? 'Clocked In' : 'Clocked Out'}
            </span>
          </div>
          <div className="flex items-center gap-1 text-slate-500 text-xs font-medium">
            <Verified size={14} />
            <span>Biometric Geo-fenced</span>
          </div>
        </div>
        
        <div className="flex flex-col items-center justify-center text-center py-2 gap-1 relative z-10">
          <span className="text-[10px] uppercase tracking-wider text-slate-500 font-bold">Active Session</span>
          <div className="flex items-baseline justify-center gap-1 text-slate-900">
            <span className="text-5xl tracking-tight font-extrabold font-mono tabular-nums">
              {formatTime(secondsElapsed)}
            </span>
          </div>
          <p className="text-xs text-slate-500 flex items-center gap-1 mt-1">
            <Clock size={13} className="text-[#4f46e5]" />
            <span>Shift: General Day</span>
          </p>
        </div>
        
        <div className="my-4 p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between gap-3 relative z-10">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-[#4f46e5] shrink-0">
              <Fingerprint size={20} />
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-[10px] uppercase font-bold text-slate-500">Last Punch</span>
              <span className="text-sm text-slate-900 font-semibold truncate">
                {formattedLastPunch} {lastCheckin ? `(${lastCheckin.log_type})` : ''}
              </span>
            </div>
          </div>
          <span className="px-2 py-0.5 rounded-full bg-slate-200 text-slate-700 text-[10px] font-bold whitespace-nowrap">
            Office Wi-Fi
          </span>
        </div>

        <div className="flex flex-col gap-1.5 mb-5 relative z-10">
          <div className="flex justify-between items-center text-xs font-medium text-slate-500">
            <span>Daily Target (8h 00m)</span>
            <span className="font-bold text-slate-700 tabular-nums">{Math.round(progressPercent)}%</span>
          </div>
          <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
            <div 
              className="h-full bg-[#4f46e5] rounded-full transition-all duration-500" 
              style={{ width: `${progressPercent}%` }}
            ></div>
          </div>
        </div>

        <button 
          className={`relative z-10 w-full h-12 rounded-xl text-sm font-bold flex items-center justify-center gap-2 shadow-sm active:scale-[0.99] transition-all ${
            isCheckedIn 
              ? 'bg-[#4f46e5] hover:bg-[#4338ca] text-white' 
              : 'bg-emerald-600 hover:bg-emerald-700 text-white'
          }`}
          onClick={handleCheckInOut}
          disabled={actionLoading}
          type="button"
        >
          {actionLoading ? (
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
          ) : isCheckedIn ? (
            <>
              <LogOut size={18} />
              <span>Clock Out (Punch Out)</span>
            </>
          ) : (
            <>
              <LogIn size={18} />
              <span>Clock In (Punch In)</span>
            </>
          )}
        </button>
      </section>

      {/* Monthly Log */}
      <section className="flex flex-col gap-4 pt-2">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <CalendarDays size={20} className="text-[#4f46e5]" />
            <h2 className="text-lg font-bold text-slate-900">Monthly Log</h2>
          </div>
          <button className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold flex items-center gap-1.5 transition-colors">
            <Download size={14} />
            <span>Export</span>
          </button>
        </div>

        {/* Date Filters */}
        <div className="grid grid-cols-2 gap-3">
          <div className="flex flex-col gap-1 p-2.5 rounded-xl bg-white border border-slate-200/80 shadow-xs relative">
            <span className="text-[10px] uppercase font-bold text-slate-500">Select Month</span>
            <select 
              value={month} 
              onChange={(e) => setMonth(Number(e.target.value))}
              className="appearance-none bg-transparent text-sm font-bold text-slate-900 outline-none w-full z-10 cursor-pointer"
            >
              {Array.from({length: 12}, (_, i) => i + 1).map(m => (
                <option key={m} value={m}>
                  {new Date(2000, m - 1).toLocaleString('default', { month: 'long' })}
                </option>
              ))}
            </select>
            <ChevronDown size={16} className="absolute right-3 bottom-3 text-slate-400 pointer-events-none" />
          </div>
          
          <div className="flex flex-col gap-1 p-2.5 rounded-xl bg-white border border-slate-200/80 shadow-xs relative">
            <span className="text-[10px] uppercase font-bold text-slate-500">Select Year</span>
            <select 
              value={year} 
              onChange={(e) => setYear(Number(e.target.value))}
              className="appearance-none bg-transparent text-sm font-bold text-slate-900 outline-none w-full z-10 cursor-pointer"
            >
              {[...Array(5)].map((_, i) => {
                const y = today.getFullYear() - i;
                return <option key={y} value={y}>{y}</option>;
              })}
            </select>
            <ChevronDown size={16} className="absolute right-3 bottom-3 text-slate-400 pointer-events-none" />
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-4 gap-3 my-2">
          <div className="flex flex-col items-center justify-center p-3 rounded-xl bg-white border border-slate-200/80 shadow-xs text-center">
            <span className="text-xl font-extrabold text-slate-900 tabular-nums">{String(stats.present).padStart(2, '0')}</span>
            <span className="text-[10px] font-bold text-slate-500">Present</span>
          </div>
          <div className="flex flex-col items-center justify-center p-3 rounded-xl bg-white border border-slate-200/80 shadow-xs text-center">
            <span className="text-xl font-extrabold text-slate-900 tabular-nums">{String(stats.halfDay).padStart(2, '0')}</span>
            <span className="text-[10px] font-bold text-slate-500">Half Day</span>
          </div>
          <div className="flex flex-col items-center justify-center p-3 rounded-xl bg-white border border-slate-200/80 shadow-xs text-center">
            <span className="text-xl font-extrabold text-slate-900 tabular-nums">{String(stats.absent).padStart(2, '0')}</span>
            <span className="text-[10px] font-bold text-slate-500">Absent</span>
          </div>
          <div className="flex flex-col items-center justify-center p-3 rounded-xl bg-white border border-slate-200/80 shadow-xs text-center">
            <span className="text-xl font-extrabold text-slate-900 tabular-nums">{String(stats.onLeave).padStart(2, '0')}</span>
            <span className="text-[10px] font-bold text-slate-500">On Leave</span>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="flex flex-col gap-3">
        <div className="flex items-center justify-between border-b border-slate-200/60 pb-2">
          <span className="text-xs uppercase tracking-wider text-slate-500 font-bold">Detailed Day Timeline</span>
        </div>

        <div className="flex flex-col gap-3">
          {loading ? (
            <div className="py-10 text-center">
              <div className="w-8 h-8 mx-auto border-4 border-[#4f46e5]/30 border-t-[#4f46e5] rounded-full animate-spin"></div>
              <p className="mt-3 text-sm text-slate-500">Loading records...</p>
            </div>
          ) : attendanceList.length > 0 ? (
            attendanceList.map((row, idx) => {
              const dDate = new Date(row.attendance_date);
              const dayName = dDate.toLocaleString('default', { weekday: 'short' });
              const dateNum = dDate.getDate();
              const fullDate = dDate.toLocaleString('default', { month: 'short', day: 'numeric', year: 'numeric' });
              
              const colorClasses = getStatusColor(row.status);
              // Extract parts for dot coloring
              const dotClass = colorClasses.split(' ').find(c => c.startsWith('dot-'))?.replace('dot-', 'bg-') || 'bg-slate-500';
              const badgeClasses = colorClasses.split(' ').filter(c => !c.startsWith('dot-')).join(' ');

              return (
                <div key={idx} className="flex flex-col p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs gap-3 hover:border-slate-300 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-11 h-11 rounded-xl bg-slate-50 border border-slate-100 flex flex-col items-center justify-center leading-tight shrink-0">
                        <span className="text-[10px] uppercase text-slate-500 font-bold">{dayName}</span>
                        <span className="text-sm font-extrabold text-slate-900">{dateNum}</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm font-bold text-slate-900">{fullDate}</span>
                        <span className="text-[11px] font-medium text-slate-500">Shift: {row.shift || 'Default'}</span>
                      </div>
                    </div>
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold border border-white/0 ${badgeClasses}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${dotClass}`}></span>
                      {row.status}
                    </span>
                  </div>
                  
                  {/* Mock detailed times since frappe Attendance doctype typically just stores status by default, unless configured otherwise. */}
                  {row.status !== 'Absent' && row.status !== 'On Leave' && (
                    <div className="grid grid-cols-3 gap-2 p-2.5 rounded-xl bg-slate-50 text-center">
                      <div className="flex flex-col">
                        <span className="text-[10px] font-bold text-slate-500">Check In</span>
                        <span className="text-xs font-bold text-slate-900">--:--</span>
                      </div>
                      <div className="flex flex-col border-x border-slate-200">
                        <span className="text-[10px] font-bold text-slate-500">Check Out</span>
                        <span className="text-xs font-bold text-slate-900">--:--</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[10px] font-bold text-slate-500">Total</span>
                        <span className="text-xs font-bold text-slate-900">--h --m</span>
                      </div>
                    </div>
                  )}

                  {row.leave_type && (
                    <div className="flex items-center justify-between p-2.5 rounded-xl bg-indigo-50/50 border border-indigo-100">
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-indigo-700 font-bold">Leave: {row.leave_type}</span>
                      </div>
                    </div>
                  )}
                </div>
              );
            })
          ) : (
            <div className="py-12 text-center bg-white rounded-2xl border border-slate-200/80">
              <CalendarDays size={32} className="mx-auto text-slate-300 mb-3" />
              <p className="text-sm font-semibold text-slate-900">No attendance records</p>
              <p className="text-xs text-slate-500 mt-1">Select a different month or year</p>
            </div>
          )}
        </div>
      </section>

      {/* Floating Toast */}
      {toastMsg && (
        <div className="fixed bottom-20 right-4 z-50 animate-in slide-in-from-bottom-5 duration-300">
          <div className="flex items-center gap-2.5 px-4 py-3 rounded-xl bg-slate-900 text-white shadow-xl border-l-4 border-emerald-500">
            <CheckCircle className="text-emerald-400 w-5 h-5" />
            <span className="text-sm font-bold">{toastMsg}</span>
          </div>
        </div>
      )}
      
    </div>
  );
};

export default Attendance;
