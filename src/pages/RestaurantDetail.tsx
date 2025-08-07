import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Navigation } from "@/components/ui/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowLeft, 
  Star, 
  Clock, 
  MapPin, 
  Plus, 
  Minus,
  ShoppingCart
} from "lucide-react";

interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
}

interface CartItem extends MenuItem {
  quantity: number;
}

const mockMenuItems: MenuItem[] = [
  {
    id: "1",
    name: "Big Burger Clássico",
    description: "Hambúrguer artesanal 180g, queijo cheddar, alface, tomate, cebola caramelizada",
    price: 28.90,
    image: "https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=300&h=200&fit=crop",
    category: "Hamburguers"
  },
  {
    id: "2",
    name: "Cheese Bacon Burger",
    description: "Hambúrguer 180g, queijo cheddar duplo, bacon crocante, molho especial",
    price: 32.90,
    image: "https://images.unsplash.com/photo-1553979459-d2229ba7433a?w=300&h=200&fit=crop",
    category: "Hamburguers"
  },
  {
    id: "3",
    name: "Batata Frita Especial",
    description: "Batata rústica com queijo cheddar derretido e bacon",
    price: 18.90,
    image: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=300&h=200&fit=crop",
    category: "Acompanhamentos"
  },
  {
    id: "4",
    name: "Milkshake de Chocolate",
    description: "Cremoso milkshake de chocolate com chantilly e calda",
    price: 15.90,
    image: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=300&h=200&fit=crop",
    category: "Bebidas"
  },
  {
    id: "5",
    name: "Anéis de Cebola",
    description: "Cebola empanada e frita, servida com molho barbecue",
    price: 14.90,
    image: "https://images.unsplash.com/photo-1639024471283-03518883512d?w=300&h=200&fit=crop",
    category: "Acompanhamentos"
  },
  {
    id: "6",
    name: "Refrigerante Lata",
    description: "Coca-Cola, Guaraná, Fanta Laranja ou Sprite",
    price: 6.90,
    image: "https://images.unsplash.com/photo-1629203851122-3726ecdf080e?w=300&h=200&fit=crop",
    category: "Bebidas"
  }
];

export function RestaurantDetail() {
  const { id } = useParams();
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("Todos");

  // Mock restaurant data
  const restaurant = {
    id: "1",
    name: "Burger Palace",
    image: "https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=800&h=400&fit=crop",
    rating: 4.8,
    deliveryTime: "25-35 min",
    deliveryFee: 5.99,
    category: "Hamburguers",
    distance: "1.2 km",
    description: "Os melhores hambúrgueres artesanais da cidade, feitos com ingredientes frescos e selecionados."
  };

  const categories = ["Todos", "Hamburguers", "Acompanhamentos", "Bebidas"];

  const filteredItems = selectedCategory === "Todos" 
    ? mockMenuItems 
    : mockMenuItems.filter(item => item.category === selectedCategory);

  const addToCart = (item: MenuItem) => {
    setCart(prev => {
      const existingItem = prev.find(cartItem => cartItem.id === item.id);
      if (existingItem) {
        return prev.map(cartItem =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const removeFromCart = (itemId: string) => {
    setCart(prev => {
      const existingItem = prev.find(cartItem => cartItem.id === itemId);
      if (existingItem && existingItem.quantity > 1) {
        return prev.map(cartItem =>
          cartItem.id === itemId
            ? { ...cartItem, quantity: cartItem.quantity - 1 }
            : cartItem
        );
      }
      return prev.filter(cartItem => cartItem.id !== itemId);
    });
  };

  const getItemQuantity = (itemId: string) => {
    const item = cart.find(cartItem => cartItem.id === itemId);
    return item ? item.quantity : 0;
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation userType="customer" />
      
      {/* Restaurant Header */}
      <div className="relative h-64 overflow-hidden">
        <img
          src={restaurant.image}
          alt={restaurant.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
        
        <div className="absolute top-4 left-4">
          <Link to="/dashboard">
            <Button variant="secondary" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar
            </Button>
          </Link>
        </div>

        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-6">
          <div className="max-w-7xl mx-auto text-white">
            <h1 className="text-3xl font-bold mb-2">{restaurant.name}</h1>
            <p className="text-lg opacity-90 mb-3">{restaurant.description}</p>
            <div className="flex items-center space-x-4 text-sm">
              <div className="flex items-center space-x-1">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span>{restaurant.rating}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Clock className="w-4 h-4" />
                <span>{restaurant.deliveryTime}</span>
              </div>
              <div className="flex items-center space-x-1">
                <MapPin className="w-4 h-4" />
                <span>{restaurant.distance}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Menu */}
          <div className="flex-1">
            {/* Category Filter */}
            <div className="flex flex-wrap gap-2 mb-8">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className="transition-all duration-200"
                >
                  {category}
                </Button>
              ))}
            </div>

            {/* Menu Items */}
            <div className="space-y-6">
              {categories
                .filter(cat => cat !== "Todos")
                .map(category => {
                  const categoryItems = mockMenuItems.filter(item => 
                    selectedCategory === "Todos" || item.category === category
                  );
                  
                  if (categoryItems.length === 0 && selectedCategory !== "Todos") return null;
                  if (selectedCategory !== "Todos" && selectedCategory !== category) return null;

                  return (
                    <div key={category}>
                      {selectedCategory === "Todos" && (
                        <h2 className="text-xl font-bold mb-4">{category}</h2>
                      )}
                      <div className="space-y-4">
                        {categoryItems.map((item) => (
                          <MenuItemCard
                            key={item.id}
                            item={item}
                            quantity={getItemQuantity(item.id)}
                            onAdd={() => addToCart(item)}
                            onRemove={() => removeFromCart(item.id)}
                          />
                        ))}
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>

          {/* Cart Sidebar */}
          <div className="lg:w-80">
            <div className="sticky top-4">
              <Card className="shadow-strong border-0 bg-gradient-card">
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold mb-4 flex items-center">
                    <ShoppingCart className="w-5 h-5 mr-2" />
                    Seu Pedido ({getTotalItems()})
                  </h3>
                  
                  {cart.length === 0 ? (
                    <p className="text-muted-foreground text-center py-8">
                      Seu carrinho está vazio
                    </p>
                  ) : (
                    <div className="space-y-4">
                      {cart.map((item) => (
                        <div key={item.id} className="flex justify-between items-start">
                          <div className="flex-1">
                            <h4 className="font-medium text-sm">{item.name}</h4>
                            <p className="text-primary font-bold">
                              R$ {(item.price * item.quantity).toFixed(2)}
                            </p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Button
                              variant="outline"
                              size="sm"
                              className="h-8 w-8 p-0"
                              onClick={() => removeFromCart(item.id)}
                            >
                              <Minus className="w-3 h-3" />
                            </Button>
                            <span className="w-8 text-center">{item.quantity}</span>
                            <Button
                              variant="outline"
                              size="sm"
                              className="h-8 w-8 p-0"
                              onClick={() => addToCart(item)}
                            >
                              <Plus className="w-3 h-3" />
                            </Button>
                          </div>
                        </div>
                      ))}
                      
                      <div className="border-t pt-4 space-y-2">
                        <div className="flex justify-between">
                          <span>Subtotal:</span>
                          <span>R$ {getTotalPrice().toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Taxa de entrega:</span>
                          <span>R$ {restaurant.deliveryFee.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between font-bold text-lg border-t pt-2">
                          <span>Total:</span>
                          <span>R$ {(getTotalPrice() + restaurant.deliveryFee).toFixed(2)}</span>
                        </div>
                      </div>
                      
                      <Link to="/checkout">
                        <Button className="w-full bg-gradient-primary hover:shadow-glow transition-all duration-300">
                          Finalizar Pedido
                        </Button>
                      </Link>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

interface MenuItemCardProps {
  item: MenuItem;
  quantity: number;
  onAdd: () => void;
  onRemove: () => void;
}

function MenuItemCard({ item, quantity, onAdd, onRemove }: MenuItemCardProps) {
  return (
    <Card className="overflow-hidden hover:shadow-medium transition-all duration-200 border-0 bg-gradient-card">
      <CardContent className="p-0">
        <div className="flex">
          <div className="flex-1 p-4">
            <h3 className="font-semibold text-lg mb-2">{item.name}</h3>
            <p className="text-muted-foreground text-sm mb-3">{item.description}</p>
            <div className="flex items-center justify-between">
              <span className="text-primary font-bold text-lg">
                R$ {item.price.toFixed(2)}
              </span>
              
              {quantity === 0 ? (
                <Button
                  onClick={onAdd}
                  size="sm"
                  className="bg-gradient-primary hover:shadow-glow transition-all duration-300"
                >
                  <Plus className="w-4 h-4 mr-1" />
                  Adicionar
                </Button>
              ) : (
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-8 w-8 p-0"
                    onClick={onRemove}
                  >
                    <Minus className="w-3 h-3" />
                  </Button>
                  <span className="w-8 text-center font-medium">{quantity}</span>
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-8 w-8 p-0"
                    onClick={onAdd}
                  >
                    <Plus className="w-3 h-3" />
                  </Button>
                </div>
              )}
            </div>
          </div>
          
          <div className="w-24 h-24 m-4">
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-full object-cover rounded-md"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}