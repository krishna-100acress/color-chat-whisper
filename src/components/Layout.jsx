
import React, { useState } from 'react';
import Sidebar from './Sidebar';

const Layout = ({ children, userRole }) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  return (
    <div className="app-layout">
      <Sidebar 
        userRole={userRole} 
        isCollapsed={sidebarCollapsed} 
        onToggle={toggleSidebar} 
      />
      <div className={`main-content ${sidebarCollapsed ? 'sidebar-collapsed' : ''}`}>
        <div style={{ padding: '1.5rem' }}>
          {children}
        </div>
      </div>
      
      <style>{`
        .app-layout {
          display: flex;
          min-height: 100vh;
        }

        .main-content {
          flex: 1;
          margin-left: 16rem;
          transition: margin-left 0.3s ease;
          background-color: #f8fafc;
          min-height: 100vh;
        }

        .main-content.sidebar-collapsed {
          margin-left: 4rem;
        }

        @media (max-width: 768px) {
          .main-content {
            margin-left: 0;
          }
          
          .sidebar {
            transform: translateX(-100%);
          }
          
          .sidebar.open {
            transform: translateX(0);
          }
        }
      `}</style>
    </div>
  );
};

export default Layout;
