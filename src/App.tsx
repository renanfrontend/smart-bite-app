import { useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthForm } from "@/components/auth/AuthForm";
import { Dashboard } from "@/pages/Dashboard";
import { RestaurantDetail } from "@/pages/RestaurantDetail";
import { RestaurantPanel } from "@/pages/RestaurantPanel";
import { DeliveryPanel } from "@/pages/DeliveryPanel";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  const [user, setUser] = useState<{ email: string; userType: string } | null>(null);

  const handleLogin = (email: string, password: string, userType: string) => {
    // Simulate authentication
    setUser({ email, userType });
  };

  const handleRegister = (data: any) => {
    // Simulate registration
    setUser({ email: data.email, userType: data.userType });
  };

  const handleLogout = () => {
    setUser(null);
  };

  const getDashboardRoute = (userType: string) => {
    switch (userType) {
      case "restaurant": return "/restaurant";
      case "delivery": return "/delivery";
      default: return "/dashboard";
    }
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route 
              path="/" 
              element={
                user ? (
                  <Navigate to={getDashboardRoute(user.userType)} replace />
                ) : (
                  <AuthForm onLogin={handleLogin} onRegister={handleRegister} />
                )
              } 
            />
            <Route 
              path="/dashboard" 
              element={
                user && user.userType === "customer" ? (
                  <Dashboard onLogout={handleLogout} />
                ) : (
                  <Navigate to="/" replace />
                )
              } 
            />
            <Route 
              path="/restaurant/:id" 
              element={
                user ? (
                  <RestaurantDetail />
                ) : (
                  <Navigate to="/" replace />
                )
              } 
            />
            <Route 
              path="/restaurant" 
              element={
                user && user.userType === "restaurant" ? (
                  <RestaurantPanel />
                ) : (
                  <Navigate to="/" replace />
                )
              } 
            />
            <Route 
              path="/delivery" 
              element={
                user && user.userType === "delivery" ? (
                  <DeliveryPanel />
                ) : (
                  <Navigate to="/" replace />
                )
              } 
            />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
