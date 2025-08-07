import { useState } from "react";
import { Navigation } from "@/components/ui/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Clock, 
  CheckCircle, 
  Package, 
  Truck,
  Eye,
  BarChart3,
  DollarSign
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Order {
  id: string;
  customerName: string;
  items: string[];
  total: number;
  status: "new" | "preparing" | "ready" | "dispatched";
  orderTime: string;
  estimatedTime: number;
}

const mockOrders: Order[] = [
  {
    id: "001",
    customerName: "João Silva",
    items: ["Big Burger Clássico", "Batata Frita Especial", "Refrigerante"],
    total: 54.70,
    status: "new",
    orderTime: "14:30",
    estimatedTime: 25
  },
  {
    id: "002", 
    customerName: "Maria Santos",
    items: ["Cheese Bacon Burger", "Anéis de Cebola"],
    total: 47.80,
    status: "preparing",
    orderTime: "14:25",
    estimatedTime: 20
  },
  {
    id: "003",
    customerName: "Pedro Costa",
    items: ["Big Burger Clássico", "Milkshake de Chocolate"],
    total: 44.80,
    status: "ready",
    orderTime: "14:15",
    estimatedTime: 30
  },
  {
    id: "004",
    customerName: "Ana Oliveira",
    items: ["Cheese Bacon Burger", "Batata Frita", "Refrigerante"],
    total: 58.70,
    status: "dispatched",
    orderTime: "14:10",
    estimatedTime: 35
  }
];

export function RestaurantPanel() {
  const [orders, setOrders] = useState<Order[]>(mockOrders);

  const updateOrderStatus = (orderId: string, newStatus: Order["status"]) => {
    setOrders(prev => 
      prev.map(order => 
        order.id === orderId ? { ...order, status: newStatus } : order
      )
    );
  };

  const getStatusColor = (status: Order["status"]) => {
    switch (status) {
      case "new": return "bg-blue-500";
      case "preparing": return "bg-yellow-500";
      case "ready": return "bg-green-500";
      case "dispatched": return "bg-gray-500";
      default: return "bg-gray-500";
    }
  };

  const getStatusText = (status: Order["status"]) => {
    switch (status) {
      case "new": return "Novo Pedido";
      case "preparing": return "Preparando";
      case "ready": return "Pronto";
      case "dispatched": return "Enviado";
      default: return "Desconhecido";
    }
  };

  const getNextStatus = (status: Order["status"]) => {
    switch (status) {
      case "new": return "preparing";
      case "preparing": return "ready";
      case "ready": return "dispatched";
      default: return status;
    }
  };

  const getNextStatusText = (status: Order["status"]) => {
    switch (status) {
      case "new": return "Iniciar Preparo";
      case "preparing": return "Marcar como Pronto";
      case "ready": return "Enviar para Entrega";
      default: return "";
    }
  };

  const getStatusIcon = (status: Order["status"]) => {
    switch (status) {
      case "new": return <Clock className="w-4 h-4" />;
      case "preparing": return <Package className="w-4 h-4" />;
      case "ready": return <CheckCircle className="w-4 h-4" />;
      case "dispatched": return <Truck className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const todayStats = {
    totalOrders: 28,
    totalRevenue: 1456.80,
    avgOrderValue: 52.03,
    pendingOrders: orders.filter(o => o.status !== "dispatched").length
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation userType="restaurant" />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Painel do Restaurante</h1>
          <p className="text-muted-foreground">
            Gerencie seus pedidos e acompanhe o desempenho
          </p>
        </div>

        <Tabs defaultValue="orders" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-3">
            <TabsTrigger value="orders">Pedidos</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="menu" className="hidden lg:block">Cardápio</TabsTrigger>
          </TabsList>

          <TabsContent value="orders" className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card className="border-0 bg-gradient-card">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Pedidos Hoje</p>
                      <p className="text-2xl font-bold">{todayStats.totalOrders}</p>
                    </div>
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Package className="w-5 h-5 text-primary" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 bg-gradient-card">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Faturamento</p>
                      <p className="text-2xl font-bold">R$ {todayStats.totalRevenue.toFixed(2)}</p>
                    </div>
                    <div className="w-10 h-10 bg-secondary/10 rounded-lg flex items-center justify-center">
                      <DollarSign className="w-5 h-5 text-secondary" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 bg-gradient-card">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Ticket Médio</p>
                      <p className="text-2xl font-bold">R$ {todayStats.avgOrderValue.toFixed(2)}</p>
                    </div>
                    <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
                      <BarChart3 className="w-5 h-5 text-accent" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 bg-gradient-card">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Pendentes</p>
                      <p className="text-2xl font-bold">{todayStats.pendingOrders}</p>
                    </div>
                    <div className="w-10 h-10 bg-yellow-500/10 rounded-lg flex items-center justify-center">
                      <Clock className="w-5 h-5 text-yellow-500" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Orders Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {orders.map((order) => (
                <Card key={order.id} className="border-0 bg-gradient-card shadow-medium">
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">Pedido #{order.id}</CardTitle>
                        <p className="text-sm text-muted-foreground">{order.customerName}</p>
                      </div>
                      <Badge 
                        className={`${getStatusColor(order.status)} text-white`}
                      >
                        <div className="flex items-center space-x-1">
                          {getStatusIcon(order.status)}
                          <span>{getStatusText(order.status)}</span>
                        </div>
                      </Badge>
                    </div>
                  </CardHeader>
                  
                  <CardContent>
                    <div className="space-y-3">
                      <div>
                        <p className="text-sm font-medium mb-1">Itens:</p>
                        <ul className="text-sm text-muted-foreground">
                          {order.items.map((item, index) => (
                            <li key={index}>• {item}</li>
                          ))}
                        </ul>
                      </div>
                      
                      <div className="flex justify-between items-center text-sm">
                        <span>Horário:</span>
                        <span className="font-medium">{order.orderTime}</span>
                      </div>
                      
                      <div className="flex justify-between items-center text-sm">
                        <span>Tempo estimado:</span>
                        <span className="font-medium">{order.estimatedTime} min</span>
                      </div>
                      
                      <div className="flex justify-between items-center font-bold text-lg border-t pt-3">
                        <span>Total:</span>
                        <span className="text-primary">R$ {order.total.toFixed(2)}</span>
                      </div>
                      
                      <div className="flex space-x-2">
                        {order.status !== "dispatched" && (
                          <Button
                            className="flex-1 bg-gradient-primary hover:shadow-glow transition-all duration-300"
                            onClick={() => updateOrderStatus(order.id, getNextStatus(order.status))}
                          >
                            {getNextStatusText(order.status)}
                          </Button>
                        )}
                        
                        <Button variant="outline" size="sm">
                          <Eye className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="analytics">
            <Card className="border-0 bg-gradient-card">
              <CardHeader>
                <CardTitle>Analytics</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Funcionalidade de analytics em desenvolvimento...
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="menu">
            <Card className="border-0 bg-gradient-card">
              <CardHeader>
                <CardTitle>Gerenciar Cardápio</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Funcionalidade de gerenciamento de cardápio em desenvolvimento...
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}