
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { isAuthenticated } from "./utils/auth";
import Navbar from "./components/Navbar";
import PrivateRoute from "./components/PrivateRoute";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import CreatePost from "./pages/CreatePost";
import EditPost from "./pages/EditPost";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <div className="min-h-screen bg-gray-50">
            <Navbar />
            <Routes>
              {/* Public Routes */}
              <Route
                path="/"
                element={
                  isAuthenticated() ? (
                    <Navigate to="/dashboard" replace />
                  ) : (
                    <Navigate to="/login" replace />
                  )
                }
              />
              <Route
                path="/login"
                element={
                  isAuthenticated() ? (
                    <Navigate to="/dashboard" replace />
                  ) : (
                    <Login />
                  )
                }
              />
              <Route
                path="/register"
                element={
                  isAuthenticated() ? (
                    <Navigate to="/dashboard" replace />
                  ) : (
                    <Register />
                  )
                }
              />

              {/* Protected Routes */}
              <Route
                path="/dashboard"
                element={
                  <PrivateRoute>
                    <Dashboard />
                  </PrivateRoute>
                }
              />
              <Route
                path="/create-post"
                element={
                  <PrivateRoute>
                    <CreatePost />
                  </PrivateRoute>
                }
              />
              <Route
                path="/edit-post/:id"
                element={
                  <PrivateRoute>
                    <EditPost />
                  </PrivateRoute>
                }
              />

              <Route
                path="*"
                element={
                  <Navigate to={isAuthenticated() ? "/dashboard" : "/login"} replace />
                }
              />
            </Routes>
          </div>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
