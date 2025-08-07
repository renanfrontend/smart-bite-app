import { useState } from "react";
import { Navigation } from "@/components/ui/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  MapPin, 
  Clock, 
  DollarSign, 
  CheckCircle, 
  Phone,
  Navigation2,
  Package
} from "lucide-react";

interface DeliveryOrder {
  id: string;
  restaurant: string;
  customer: string;
  customerPhone: string;
  pickupAddress: string;
  deliveryAddress: string;
  distance: string;
  estimatedTime: number;
  value: number;
  status: "available" | "accepted" | "picked_up" | "delivered";
  orderTime: string;
}

const mockDeliveryOrders: DeliveryOrder[] = [
  {
    id: "DEL001",
    restaurant: "Burger Palace",
    customer: "João Silva", 
    customerPhone: "(11) 99999-1234",
    pickupAddress: "Rua das Flores, 123 - Centro",
    deliveryAddress: "Av. Paulista, 456 - Bela Vista",
    distance: "2.3 km",
    estimatedTime: 15,
    value: 8.50,
    status: "available",
    orderTime: "15:30"
  },
  {
    id: "DEL002",
    restaurant: "Pizza Italiana",
    customer: "Maria Santos",
    customerPhone: "(11) 99999-5678", 
    pickupAddress: "Rua da Pizza, 789 - Liberdade",
    deliveryAddress: "Rua Augusta, 321 - Consolação",
    distance: "1.8 km",
    estimatedTime: 12,
    value: 6.99,
    status: "accepted",
    orderTime: "15:25"
  },
  {
    id: "DEL003",
    restaurant: "Sushi Express",
    customer: "Pedro Costa",
    customerPhone: "(11) 99999-9012",
    pickupAddress: "Av. Japão, 456 - Liberdade", 
    deliveryAddress: "Rua dos Pinheiros, 789 - Pinheiros",
    distance: "3.1 km",
    estimatedTime: 18,
    value: 9.99,
    status: "picked_up",
    orderTime: "15:15"
  }
];

export function DeliveryPanel() {
  const [orders, setOrders] = useState<DeliveryOrder[]>(mockDeliveryOrders);
  const [isOnline, setIsOnline] = useState(true);

  const updateOrderStatus = (orderId: string, newStatus: DeliveryOrder["status"]) => {
    setOrders(prev => 
      prev.map(order => 
        order.id === orderId ? { ...order, status: newStatus } : order
      )
    );
  };

  const getStatusColor = (status: DeliveryOrder["status"]) => {
    switch (status) {
      case "available": return "bg-blue-500";
      case "accepted": return "bg-yellow-500";
      case "picked_up": return "bg-green-500";
      case "delivered": return "bg-gray-500";
      default: return "bg-gray-500";
    }
  };

  const getStatusText = (status: DeliveryOrder["status"]) => {
    switch (status) {
      case "available": return "Disponível";
      case "accepted": return "Aceito";
      case "picked_up": return "Coletado";
      case "delivered": return "Entregue";
      default: return "Desconhecido";
    }
  };

  const getNextAction = (status: DeliveryOrder["status"]) => {
    switch (status) {
      case "available": return { action: "accepted", text: "Aceitar Corrida" };
      case "accepted": return { action: "picked_up", text: "Marcar como Coletado" };
      case "picked_up": return { action: "delivered", text: "Marcar como Entregue" };
      default: return null;
    }
  };

  const todayStats = {
    deliveries: 12,
    earnings: 89.50,
    distance: 45.2,
    rating: 4.9
  };

  const availableOrders = orders.filter(order => order.status === "available");
  const activeOrders = orders.filter(order => order.status === "accepted" || order.status === "picked_up");

  return (
    <div className="min-h-screen bg-background">
      <Navigation userType="delivery" />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold mb-2">Central do Entregador</h1>
              <p className="text-muted-foreground">
                Gerencie suas entregas e maximize seus ganhos
              </p>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className={`w-3 h-3 rounded-full ${isOnline ? 'bg-green-500' : 'bg-red-500'}`} />
                <span className={`font-medium ${isOnline ? 'text-green-600' : 'text-red-600'}`}>
                  {isOnline ? 'Online' : 'Offline'}
                </span>
              </div>
              <Button 
                variant={isOnline ? "destructive" : "default"}
                onClick={() => setIsOnline(!isOnline)}
              >
                {isOnline ? 'Ficar Offline' : 'Ficar Online'}
              </Button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card className="border-0 bg-gradient-card">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Entregas Hoje</p>
                  <p className="text-2xl font-bold">{todayStats.deliveries}</p>
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
                  <p className="text-sm text-muted-foreground">Ganhos Hoje</p>
                  <p className="text-2xl font-bold">R$ {todayStats.earnings.toFixed(2)}</p>
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
                  <p className="text-sm text-muted-foreground">Distância</p>
                  <p className="text-2xl font-bold">{todayStats.distance} km</p>
                </div>
                <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
                  <Navigation2 className="w-5 h-5 text-accent" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 bg-gradient-card">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Avaliação</p>
                  <p className="text-2xl font-bold">{todayStats.rating}</p>
                </div>
                <div className="w-10 h-10 bg-yellow-500/10 rounded-lg flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-yellow-500" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Active Deliveries */}
          <div>
            <h2 className="text-xl font-bold mb-4">Entregas Ativas ({activeOrders.length})</h2>
            <div className="space-y-4">
              {activeOrders.map((order) => (
                <Card key={order.id} className="border-0 bg-gradient-card shadow-medium">
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">#{order.id}</CardTitle>
                        <p className="text-sm text-muted-foreground">{order.restaurant}</p>
                      </div>
                      <Badge className={`${getStatusColor(order.status)} text-white`}>
                        {getStatusText(order.status)}
                      </Badge>
                    </div>
                  </CardHeader>
                  
                  <CardContent>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex items-start space-x-2">
                          <MapPin className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
                          <div>
                            <p className="text-sm font-medium">Coleta:</p>
                            <p className="text-sm text-muted-foreground">{order.pickupAddress}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start space-x-2">
                          <MapPin className="w-4 h-4 text-secondary mt-1 flex-shrink-0" />
                          <div>
                            <p className="text-sm font-medium">Entrega:</p>
                            <p className="text-sm text-muted-foreground">{order.deliveryAddress}</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex justify-between items-center text-sm">
                        <span>Cliente:</span>
                        <span className="font-medium">{order.customer}</span>
                      </div>
                      
                      <div className="flex justify-between items-center text-sm">
                        <span>Distância:</span>
                        <span className="font-medium">{order.distance}</span>
                      </div>
                      
                      <div className="flex justify-between items-center text-sm">
                        <span>Tempo estimado:</span>
                        <span className="font-medium">{order.estimatedTime} min</span>
                      </div>
                      
                      <div className="flex justify-between items-center font-bold text-lg border-t pt-3">
                        <span>Valor:</span>
                        <span className="text-primary">R$ {order.value.toFixed(2)}</span>
                      </div>
                      
                      <div className="flex space-x-2">
                        {getNextAction(order.status) && (
                          <Button
                            className="flex-1 bg-gradient-primary hover:shadow-glow transition-all duration-300"
                            onClick={() => updateOrderStatus(order.id, getNextAction(order.status)!.action as DeliveryOrder["status"])}
                          >
                            {getNextAction(order.status)!.text}
                          </Button>
                        )}
                        
                        <Button variant="outline" size="sm">
                          <Phone className="w-4 h-4" />
                        </Button>
                        
                        <Button variant="outline" size="sm">
                          <Navigation2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
              
              {activeOrders.length === 0 && (
                <Card className="border-0 bg-gradient-card">
                  <CardContent className="p-8 text-center">
                    <Package className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">Nenhuma entrega ativa no momento</p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>

          {/* Available Deliveries */}
          <div>
            <h2 className="text-xl font-bold mb-4">Corridas Disponíveis ({availableOrders.length})</h2>
            <div className="space-y-4">
              {isOnline ? (
                availableOrders.map((order) => (
                  <Card key={order.id} className="border-0 bg-gradient-card shadow-medium">
                    <CardHeader className="pb-3">
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-lg">#{order.id}</CardTitle>
                          <p className="text-sm text-muted-foreground">{order.restaurant}</p>
                        </div>
                        <Badge className="bg-blue-500 text-white">
                          Disponível
                        </Badge>
                      </div>
                    </CardHeader>
                    
                    <CardContent>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <div className="flex items-start space-x-2">
                            <MapPin className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
                            <div>
                              <p className="text-sm font-medium">Coleta:</p>
                              <p className="text-sm text-muted-foreground">{order.pickupAddress}</p>
                            </div>
                          </div>
                          
                          <div className="flex items-start space-x-2">
                            <MapPin className="w-4 h-4 text-secondary mt-1 flex-shrink-0" />
                            <div>
                              <p className="text-sm font-medium">Entrega:</p>
                              <p className="text-sm text-muted-foreground">{order.deliveryAddress}</p>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex justify-between items-center text-sm">
                          <span>Distância:</span>
                          <span className="font-medium">{order.distance}</span>
                        </div>
                        
                        <div className="flex justify-between items-center text-sm">
                          <span>Tempo estimado:</span>
                          <span className="font-medium">{order.estimatedTime} min</span>
                        </div>
                        
                        <div className="flex justify-between items-center font-bold text-lg border-t pt-3">
                          <span>Valor:</span>
                          <span className="text-primary">R$ {order.value.toFixed(2)}</span>
                        </div>
                        
                        <Button
                          className="w-full bg-gradient-primary hover:shadow-glow transition-all duration-300"
                          onClick={() => updateOrderStatus(order.id, "accepted")}
                        >
                          Aceitar Corrida
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <Card className="border-0 bg-gradient-card">
                  <CardContent className="p-8 text-center">
                    <Clock className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground mb-4">Você está offline</p>
                    <Button onClick={() => setIsOnline(true)}>
                      Ficar Online
                    </Button>
                  </CardContent>
                </Card>
              )}
              
              {isOnline && availableOrders.length === 0 && (
                <Card className="border-0 bg-gradient-card">
                  <CardContent className="p-8 text-center">
                    <Clock className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">Nenhuma corrida disponível no momento</p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}