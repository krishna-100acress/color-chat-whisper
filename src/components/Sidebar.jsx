import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  User,
  Users,
  UserPlus,
  Ticket,
  Building2,
  Home,
  LogOut,
  Settings,
  Menu,
  X
} from 'lucide-react';

const Sidebar = ({ userRole, isCollapsed, onToggle }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
    window.location.reload();
  };

  const userName = localStorage.getItem('userName') || 'User';
  const userEmail = localStorage.getItem('userEmail') || '';

  const navigationItems = {
    'super-admin': [
      { path: '/', icon: Home, label: 'Dashboard' },
      { path: '/leads', icon: Building2, label: 'All Leads' },
      { path: '/users', icon: Users, label: 'Manage Users' },
      { path: '/create-admin', icon: UserPlus, label: 'Create Admin' },
      { path: '/settings', icon: Settings, label: 'Settings' }
    ],
    'head-admin': [
      { path: '/', icon: Home, label: 'Dashboard' },
      { path: '/leads', icon: Building2, label: 'My Leads' },
      { path: '/team', icon: Users, label: 'Team Management' },
      { path: '/create-leader', icon: UserPlus, label: 'Create Team Leader' },
      { path: '/tickets', icon: Ticket, label: 'Team Tickets' }
    ],
    'team-leader': [
      { path: '/', icon: Home, label: 'Dashboard' },
      { path: '/leads', icon: Building2, label: 'Assigned Leads' },
      { path: '/employees', icon: Users, label: 'My Employees' },
      { path: '/create-employee', icon: UserPlus, label: 'Add Employee' },
      { path: '/tickets', icon: Ticket, label: 'Manage Tickets' }
    ],
    employee: [
      { path: '/', icon: Home, label: 'Dashboard' },
      { path: '/leads', icon: Building2, label: 'My Leads' },
      { path: '/tickets', icon: Ticket, label: 'My Tickets' }
    ]
  };

  const navItems = navigationItems[userRole] || navigationItems['employee'];

  const getRoleDisplayName = (role) => {
    switch (role) {
      case 'super-admin':
        return 'Super Admin';
      case 'head-admin':
        return 'Head Admin';
      case 'team-leader':
        return 'Team Leader';
      case 'employee':
        return 'Employee';
      default:
        return 'User';
    }
  };

  const handleMobileToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleLinkClick = () => {
    setMobileOpen(false);
  };

  return (
    <>
      {/* Mobile menu button */}
      <button 
        className="mobile-menu-btn md:hidden"
        onClick={handleMobileToggle}
        aria-label="Toggle mobile menu"
      >
        {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Mobile backdrop */}
      {mobileOpen && (
        <div 
          className="mobile-backdrop md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`sidebar ${isCollapsed ? 'collapsed' : ''} ${mobileOpen ? 'mobile-open' : ''}`}>
        <div className="sidebar-header">
          <div className="sidebar-logo">
            <Building2 className="icon" />
          </div>
          {!isCollapsed && (
            <div className="sidebar-title">
              <h1>100acres.com</h1>
              <p>CRM Dashboard</p>
            </div>
          )}
          {/* Mobile close button inside sidebar */}
          <button 
            className="mobile-close-btn md:hidden"
            onClick={() => setMobileOpen(false)}
            aria-label="Close sidebar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="sidebar-nav">
          <ul>
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <li key={item.path}>
                  <NavLink
                    to={item.path}
                    end={item.path === '/'}
                    className={({ isActive }) =>
                      `sidebar-link ${isActive ? 'active' : ''}`
                    }
                    onClick={handleLinkClick}
                  >
                    <Icon className="icon" />
                    {!isCollapsed && <span>{item.label}</span>}
                  </NavLink>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="sidebar-footer">
          <div className="sidebar-user">
            <div className="user-icon">
              <User className="icon-small" />
            </div>
            {!isCollapsed && (
              <div className="user-info">
                <p className="user-name">{userName}</p>
                <p className="user-role">{getRoleDisplayName(userRole)}</p>
              </div>
            )}
          </div>
          <button className="logout-btn" onClick={handleLogout}>
            <LogOut className="icon" />
            {!isCollapsed && <span>Logout</span>}
          </button>
        </div>
      </div>

      <style>{`
        .mobile-menu-btn {
          position: fixed;
          top: 1rem;
          left: 1rem;
          z-index: 1001;
          background: #1e293b;
          color: white;
          border: none;
          border-radius: 0.5rem;
          padding: 0.75rem;
          box-shadow: 0 4px 6px rgba(0,0,0,0.1);
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .mobile-menu-btn:hover {
          background: #334155;
          transform: scale(1.05);
        }

        .mobile-backdrop {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.5);
          z-index: 999;
          backdrop-filter: blur(2px);
        }

        .mobile-close-btn {
          background: none;
          border: none;
          color: #cbd5e1;
          cursor: pointer;
          padding: 0.5rem;
          border-radius: 0.5rem;
          margin-left: auto;
          transition: background 0.2s ease;
        }

        .mobile-close-btn:hover {
          background: #334155;
        }

        .sidebar {
          background: linear-gradient(145deg, #1e293b, #111827);
          box-shadow: 4px 0 12px rgba(0,0,0,0.3);
          color: white;
          border-right: 1px solid #334155;
          transition: all 0.3s ease;
          width: 16rem;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          font-family: 'Segoe UI', sans-serif;
          position: fixed;
          left: 0;
          top: 0;
          z-index: 1000;
        }

        .sidebar.collapsed {
          width: 4rem;
        }

        /* Mobile styles */
        @media (max-width: 768px) {
          .sidebar {
            transform: translateX(-100%);
            width: 280px;
            max-width: 80vw;
          }
          
          .sidebar.mobile-open {
            transform: translateX(0);
          }
          
          .sidebar.collapsed {
            width: 280px;
            max-width: 80vw;
          }
        }

        .sidebar-header {
          padding: 1.25rem 1rem;
          border-bottom: 1px solid #334155;
          display: flex;
          align-items: center;
        }

        .sidebar-logo {
          background-color: #3b82f6;
          padding: 0.6rem;
          border-radius: 0.75rem;
          box-shadow: 0 4px 6px rgba(0,0,0,0.15);
        }

        .sidebar-title {
          margin-left: 0.85rem;
          flex: 1;
        }

        .sidebar-title h1 {
          font-size: 1rem;
          font-weight: 600;
          margin: 0;
        }

        .sidebar-title p {
          font-size: 0.75rem;
          color: #94a3b8;
          margin: 0;
        }

        .sidebar-nav {
          flex: 1;
          padding: 1rem 0.75rem;
          overflow-y: auto;
        }

        .sidebar-nav ul {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .sidebar-link {
          display: flex;
          align-items: center;
          padding: 0.6rem 0.85rem;
          margin-bottom: 0.5rem;
          border-radius: 0.6rem;
          color: #cbd5e1;
          text-decoration: none;
          transition: all 0.2s ease-in-out;
        }

        .sidebar-link:hover {
          background-color: #334155;
          transform: translateX(2px);
        }

        .sidebar-link.active {
          background-color: #e0e7ff;
          color: #1e293b;
          font-weight: 700;
          box-shadow: inset 4px 0 0 0 #3b82f6;
        }

        .sidebar-link .icon {
          width: 1.25rem;
          height: 1.25rem;
          flex-shrink: 0;
        }

        .sidebar-link span {
          margin-left: 0.85rem;
          font-size: 0.95rem;
        }

        .sidebar-footer {
          padding: 1rem;
          border-top: 1px solid #334155;
        }

        .sidebar-user {
          display: flex;
          align-items: center;
          margin-bottom: 1rem;
        }

        .user-icon {
          background: white;
          color: #1e293b;
          padding: 0.5rem;
          border-radius: 999px;
          box-shadow: 0 2px 4px rgba(255,255,255,0.1);
          flex-shrink: 0;
        }

        .icon-small {
          width: 1rem;
          height: 1rem;
        }

        .user-info {
          margin-left: 0.75rem;
          min-width: 0;
        }

        .user-name {
          font-size: 0.9rem;
          font-weight: 600;
          margin: 0;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .user-role {
          font-size: 0.75rem;
          color: #94a3b8;
          margin: 0;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .logout-btn {
          display: flex;
          align-items: center;
          background: none;
          border: none;
          color: #cbd5e1;
          cursor: pointer;
          padding: 0.6rem 0.85rem;
          border-radius: 0.6rem;
          width: 100%;
          transition: background 0.2s ease;
        }

        .logout-btn:hover {
          background-color: #334155;
        }

        .logout-btn .icon {
          width: 1.25rem;
          height: 1.25rem;
          flex-shrink: 0;
        }

        .logout-btn span {
          margin-left: 0.75rem;
          font-size: 0.95rem;
        }

        /* Ensure content doesn't hide behind sidebar on desktop */
        @media (min-width: 769px) {
          body {
            margin-left: 16rem;
          }
          
          body.sidebar-collapsed {
            margin-left: 4rem;
          }
        }
      `}</style>
    </>
  );
};

export default Sidebar;