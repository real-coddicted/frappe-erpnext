import React, { useState, useEffect } from 'react';
import { Link, Outlet, useLocation, NavLink } from 'react-router-dom';
import { 
  LogOut, Calendar, Clock, DollarSign, FileText, 
  ChevronRight, Users, CheckSquare, LayoutDashboard, Menu, X 
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { apiGet } from '../api/client';

const Dashboard = () => {
  const { logout } = useAuth();
  const [context, setContext] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const fetchContext = async () => {
      try {
        const data = await apiGet('/method/hr_ess_api.api.permissions.get_my_dashboard_context');
        setContext(data.message);
      } catch (err) {
        setError(err.message || 'Failed to load dashboard context');
      } finally {
        setLoading(false);
      }
    };
    fetchContext();
  }, []);

  const handleLogout = async () => {
    await logout();
  };

  const closeSidebar = () => setSidebarOpen(false);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f8f9ff]">
        <div className="w-8 h-8 border-3 border-[#4f46e5] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f8f9ff] p-4">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm max-w-md w-full text-center">
          <h2 className="text-xl font-bold text-slate-900 mb-2">Unable to Load Dashboard</h2>
          <p className="text-sm text-slate-500 mb-6">{error}</p>
          <button 
            onClick={handleLogout} 
            className="px-4 py-2 bg-slate-900 text-white text-sm font-medium rounded-lg hover:bg-slate-800 transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const { employee_name, modules = {}, has_team, has_leave_approvals, branding } = context || {};
  const isRoot = location.pathname === '/';
  const firstName = (employee_name || 'User').split(' ')[0];

  const cards = [
    {
      id: 'leave',
      title: 'Leave & Time Off',
      icon: <Calendar className="w-5 h-5 text-sky-600" />,
      bgIcon: 'bg-sky-50',
      tag: 'Balances & Requests',
      description: 'View current leave balances, holiday calendars, and submit leave requests.',
      route: '/leave',
      hasPermission: modules.leave,
    },
    {
      id: 'attendance',
      title: 'Attendance & Logs',
      icon: <Clock className="w-5 h-5 text-indigo-600" />,
      bgIcon: 'bg-indigo-50',
      tag: 'Daily Activity',
      description: 'Check in or out, review recorded punch logs, and monitor regularized entries.',
      route: '/attendance',
      hasPermission: modules.attendance,
    },
    {
      id: 'salary',
      title: 'Salary & Payslips',
      icon: <DollarSign className="w-5 h-5 text-emerald-600" />,
      bgIcon: 'bg-emerald-50',
      tag: 'Compensation',
      description: 'Access and download monthly verified salary slips and deduction statements.',
      route: '/salary',
      hasPermission: modules.salary,
    },
    {
      id: 'tax',
      title: 'Tax Declaration',
      icon: <FileText className="w-5 h-5 text-amber-600" />,
      bgIcon: 'bg-amber-50',
      tag: 'Compliance',
      description: 'Submit proof of investments, tax-saving allowances, and exemptions.',
      route: '/tax',
      hasPermission: modules.tax,
    },
    {
      id: 'team',
      title: 'My Direct Reports',
      icon: <Users className="w-5 h-5 text-teal-600" />,
      bgIcon: 'bg-teal-50',
      tag: 'Management',
      description: 'View direct team member profiles, roles, and real-time attendance status.',
      route: '/team',
      hasPermission: has_team,
    },
    {
      id: 'approvals',
      title: 'Leave Approvals',
      icon: <CheckSquare className="w-5 h-5 text-rose-600" />,
      bgIcon: 'bg-rose-50',
      tag: 'Action Required',
      description: 'Review, approve, or reject pending leave tickets submitted by direct reports.',
      route: '/approvals',
      hasPermission: has_leave_approvals,
    }
  ];

  return (
    <div className="min-h-screen bg-[#f8f9ff] text-slate-800 flex">
      {/* Mobile Backdrop */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-40 lg:hidden"
          onClick={closeSidebar}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed top-0 bottom-0 left-0 w-64 bg-white border-r border-slate-200/80 z-50 flex flex-col transition-transform duration-200 ease-in-out
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        {/* Logo */}
        <div className="h-16 px-6 border-b border-slate-100 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5 font-semibold text-slate-900 tracking-tight" onClick={closeSidebar}>
            {branding?.company_logo ? (
              <img src={branding.company_logo} alt="Logo" className="max-h-7 w-auto" />
            ) : (
              <div className="w-8 h-8 rounded-lg bg-[#4f46e5] text-white flex items-center justify-center font-bold text-sm">
                P
              </div>
            )}
            <span className="text-base">{branding?.company_name || 'ESS Portal'}</span>
          </Link>
          <button className="lg:hidden text-slate-400 hover:text-slate-600" onClick={closeSidebar}>
            <X size={18} />
          </button>
        </div>

        {/* Navigation */}
        <div className="flex-1 overflow-y-auto px-4 py-5 space-y-6">
          <div>
            <div className="px-3 mb-2 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
              Workspace
            </div>
            <nav className="space-y-1">
              <NavLink 
                to="/" 
                end 
                onClick={closeSidebar}
                className={({ isActive }) => `flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium transition-colors ${
                  isActive ? 'bg-[#4f46e5] text-white shadow-xs' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <LayoutDashboard size={18} />
                <span>Dashboard</span>
              </NavLink>

              {modules.leave && (
                <NavLink 
                  to="/leave" 
                  onClick={closeSidebar}
                  className={({ isActive }) => `flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium transition-colors ${
                    isActive ? 'bg-[#4f46e5] text-white' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                  }`}
                >
                  <Calendar size={18} />
                  <span>Leave</span>
                </NavLink>
              )}

              {modules.attendance && (
                <NavLink 
                  to="/attendance" 
                  onClick={closeSidebar}
                  className={({ isActive }) => `flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium transition-colors ${
                    isActive ? 'bg-[#4f46e5] text-white' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                  }`}
                >
                  <Clock size={18} />
                  <span>Attendance</span>
                </NavLink>
              )}

              {modules.salary && (
                <NavLink 
                  to="/salary" 
                  onClick={closeSidebar}
                  className={({ isActive }) => `flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium transition-colors ${
                    isActive ? 'bg-[#4f46e5] text-white' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                  }`}
                >
                  <DollarSign size={18} />
                  <span>Salary</span>
                </NavLink>
              )}

              {modules.tax && (
                <NavLink 
                  to="/tax" 
                  onClick={closeSidebar}
                  className={({ isActive }) => `flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium transition-colors ${
                    isActive ? 'bg-[#4f46e5] text-white' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                  }`}
                >
                  <FileText size={18} />
                  <span>Tax Declaration</span>
                </NavLink>
              )}
            </nav>
          </div>

          {(has_team || has_leave_approvals) && (
            <div>
              <div className="px-3 mb-2 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                Management
              </div>
              <nav className="space-y-1">
                {has_team && (
                  <NavLink 
                    to="/team" 
                    onClick={closeSidebar}
                    className={({ isActive }) => `flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium transition-colors ${
                      isActive ? 'bg-[#4f46e5] text-white' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                    }`}
                  >
                    <Users size={18} />
                    <span>My Team</span>
                  </NavLink>
                )}
                {has_leave_approvals && (
                  <NavLink 
                    to="/approvals" 
                    onClick={closeSidebar}
                    className={({ isActive }) => `flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium transition-colors ${
                      isActive ? 'bg-[#4f46e5] text-white' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                    }`}
                  >
                    <CheckSquare size={18} />
                    <span>Approvals</span>
                  </NavLink>
                )}
              </nav>
            </div>
          )}
        </div>

        {/* Profile Footer */}
        <div className="p-3 border-t border-slate-100 bg-slate-50/60">
          <div className="flex items-center justify-between p-2 rounded-xl bg-white border border-slate-200/60">
            <Link to="/profile" className="flex items-center gap-2.5 min-w-0 flex-1 hover:opacity-80 transition-opacity">
              <div className="w-8 h-8 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-xs font-semibold text-slate-700 shrink-0">
                {firstName.charAt(0)}
              </div>
              <div className="min-w-0">
                <p className="text-xs font-semibold text-slate-900 truncate">{employee_name}</p>
                <p className="text-[11px] text-[#4f46e5] font-medium">View Profile</p>
              </div>
            </Link>
            <button 
              onClick={handleLogout} 
              className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg transition-colors shrink-0 ml-1"
              title="Log Out"
            >
              <LogOut size={16} />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col lg:pl-64 min-w-0">
        {/* Top Header */}
        <header className="h-16 px-6 bg-white/80 backdrop-blur-md border-b border-slate-200/70 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center gap-3">
            <button 
              className="lg:hidden p-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu size={18} />
            </button>
            <span className="text-xs font-medium text-slate-500">
              Workspace <span className="mx-1 text-slate-300">/</span> <strong className="text-slate-800 font-medium">Dashboard</strong>
            </span>
          </div>

          <div className="text-xs text-slate-500 font-medium">
            {new Date().toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })}
          </div>
        </header>

        {/* Content Body */}
        <main className="flex-1 p-6 lg:p-10 max-w-7xl w-full mx-auto">
          {isRoot ? (
            <div className="space-y-8">
              {/* Clean Welcome Banner */}
              <div>
                <h1 className="text-2xl lg:text-3xl font-bold text-slate-900 tracking-tight">
                  Welcome back, {firstName}
                </h1>
                <p className="text-sm text-slate-500 mt-1">
                  Access your employee self-service records, time off, and payroll below.
                </p>
              </div>

              {/* Module Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {cards.map(card => {
                  if (!card.hasPermission) return null;

                  return (
                    <Link
                      to={card.route}
                      key={card.id}
                      className="group bg-white rounded-2xl border border-slate-200/80 p-6 flex flex-col justify-between hover:border-indigo-300 hover:shadow-md transition-all duration-150"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-4">
                          <div className={`w-10 h-10 rounded-xl ${card.bgIcon} flex items-center justify-center`}>
                            {card.icon}
                          </div>
                          <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">
                            {card.tag}
                          </span>
                        </div>

                        <h3 className="text-base font-semibold text-slate-900 group-hover:text-[#4f46e5] transition-colors">
                          {card.title}
                        </h3>
                        <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                          {card.description}
                        </p>
                      </div>

                      <div className="pt-6 mt-4 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-[#4f46e5]">
                        <span>Open module</span>
                        <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                      </div>
                    </Link>
                  );
                })}
              </div>

              {cards.every(c => !c.hasPermission) && (
                <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center">
                  <p className="text-sm text-slate-500">You don't have access to any modules yet.</p>
                </div>
              )}
            </div>
          ) : (
            <Outlet />
          )}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
