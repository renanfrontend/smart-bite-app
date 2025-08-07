import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  ShoppingBag, 
  User, 
  Store, 
  Truck, 
  BarChart3,
  LogOut,
  Bell
} from "lucide-react";
import { cn } from "@/lib/utils";

interface NavigationProps {
  userType?: "customer" | "restaurant" | "delivery" | "admin";
  onLogout?: () => void;
}

export function Navigation({ userType = "customer", onLogout }: NavigationProps) {
  const location = useLocation();
  
  const getNavItems = () => {
    switch (userType) {
      case "restaurant":
        return [
          { href: "/restaurant", label: "Pedidos", icon: ShoppingBag },
          { href: "/restaurant/menu", label: "Cardápio", icon: Store },
          { href: "/restaurant/analytics", label: "Analytics", icon: BarChart3 },
        ];
      case "delivery":
        return [
          { href: "/delivery", label: "Corridas", icon: Truck },
          { href: "/delivery/profile", label: "Perfil", icon: User },
        ];
      case "admin":
        return [
          { href: "/admin", label: "Dashboard", icon: BarChart3 },
          { href: "/admin/restaurants", label: "Restaurantes", icon: Store },
          { href: "/admin/deliveries", label: "Entregas", icon: Truck },
        ];
      default:
        return [
          { href: "/dashboard", label: "Início", icon: ShoppingBag },
          { href: "/orders", label: "Pedidos", icon: User },
        ];
    }
  };

  const navItems = getNavItems();

  return (
    <nav className="bg-white border-b border-border shadow-soft">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-8">
            <Link to="/dashboard" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                <Truck className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-foreground">DeliveryTech</span>
            </Link>
            
            <div className="hidden md:flex space-x-6">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    to={item.href}
                    className={cn(
                      "flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                      location.pathname === item.href
                        ? "text-primary bg-primary/10"
                        : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" className="relative">
              <Bell className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-primary text-white text-xs rounded-full flex items-center justify-center">
                3
              </span>
            </Button>
            
            <Button variant="ghost" size="sm">
              <User className="w-5 h-5 mr-2" />
              Perfil
            </Button>
            
            {onLogout && (
              <Button variant="ghost" size="sm" onClick={onLogout}>
                <LogOut className="w-5 h-5 mr-2" />
                Sair
              </Button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}