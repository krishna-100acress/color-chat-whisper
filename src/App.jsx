
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";

import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import Leads from "./pages/Leads";
import Tickets from "./pages/Tickets";
import CreateUser from "./pages/CreateUser";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import UserManagement from "./pages/UserManagement";

const queryClient = new QueryClient();

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState("employee");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuthStatus = () => {
      const loggedIn = localStorage.getItem("isLoggedIn") === "true";
      const role = localStorage.getItem("userRole") || "employee";

      setIsLoggedIn(loggedIn);
      setUserRole(role);
      setIsLoading(false);
    };

    checkAuthStatus();

    window.addEventListener("storage", checkAuthStatus);
    return () => {
      window.removeEventListener("storage", checkAuthStatus);
    };
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          </div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route
              path="/login"
              element={!isLoggedIn ? <Login /> : <Navigate to="/" replace />}
            />
            
            {/* Protected routes with Layout */}
            <Route
              path="/"
              element={
                isLoggedIn ? (
                  <Layout userRole={userRole}>
                    <Dashboard userRole={userRole} />
                  </Layout>
                ) : (
                  <Navigate to="/login" replace />
                )
              }
            />
            <Route
              path="/leads"
              element={
                isLoggedIn ? (
                  <Layout userRole={userRole}>
                    <Leads userRole={userRole} />
                  </Layout>
                ) : (
                  <Navigate to="/login" replace />
                )
              }
            />
            <Route
              path="/tickets"
              element={
                isLoggedIn ? (
                  <Layout userRole={userRole}>
                    <Tickets userRole={userRole} />
                  </Layout>
                ) : (
                  <Navigate to="/login" replace />
                )
              }
            />
            <Route
              path="/users"
              element={
                isLoggedIn && userRole === "super-admin" ? (
                  <Layout userRole={userRole}>
                    <UserManagement userRole={userRole} />
                  </Layout>
                ) : (
                  <Navigate to="/" replace />
                )
              }
            />
            <Route
              path="/create-admin"
              element={
                isLoggedIn && userRole === "super-admin" ? (
                  <Layout userRole={userRole}>
                    <CreateUser userRole={userRole} userType="admin" />
                  </Layout>
                ) : (
                  <Navigate to="/" replace />
                )
              }
            />
            <Route
              path="/create-leader"
              element={
                isLoggedIn && userRole === "head-admin" ? (
                  <Layout userRole={userRole}>
                    <CreateUser userRole={userRole} userType="leader" />
                  </Layout>
                ) : (
                  <Navigate to="/" replace />
                )
              }
            />
            <Route
              path="/create-employee"
              element={
                isLoggedIn && userRole === "team-leader" ? (
                  <Layout userRole={userRole}>
                    <CreateUser userRole={userRole} userType="employee" />
                  </Layout>
                ) : (
                  <Navigate to="/" replace />
                )
              }
            />
            <Route
              path="/settings"
              element={
                isLoggedIn && userRole === "super-admin" ? (
                  <Layout userRole={userRole}>
                    <div>
                      <h1 className="text-2xl font-bold mb-4">Settings</h1>
                      <div className="bg-white rounded-lg shadow p-6">
                        <p className="text-gray-600">Settings interface coming soon...</p>
                      </div>
                    </div>
                  </Layout>
                ) : (
                  <Navigate to="/" replace />
                )
              }
            />
            <Route
              path="/team"
              element={
                isLoggedIn && userRole === "head-admin" ? (
                  <Layout userRole={userRole}>
                    <div>
                      <h1 className="text-2xl font-bold mb-4">Team Management</h1>
                      <div className="bg-white rounded-lg shadow p-6">
                        <p className="text-gray-600">Team management interface coming soon...</p>
                      </div>
                    </div>
                  </Layout>
                ) : (
                  <Navigate to="/" replace />
                )
              }
            />
            <Route
              path="/employees"
              element={
                isLoggedIn && userRole === "team-leader" ? (
                  <Layout userRole={userRole}>
                    <div>
                      <h1 className="text-2xl font-bold mb-4">My Employees</h1>
                      <div className="bg-white rounded-lg shadow p-6">
                        <p className="text-gray-600">Employee management interface coming soon...</p>
                      </div>
                    </div>
                  </Layout>
                ) : (
                  <Navigate to="/" replace />
                )
              }
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
