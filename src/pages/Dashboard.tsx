import { useState } from "react";
import { Navigation } from "@/components/ui/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  Star, 
  Clock, 
  MapPin, 
  Filter,
  ShoppingCart,
  Heart
} from "lucide-react";
import { Link } from "react-router-dom";
import deliveryHero from "@/assets/delivery-hero.jpg";

interface Restaurant {
  id: string;
  name: string;
  image: string;
  rating: number;
  deliveryTime: string;
  deliveryFee: number;
  category: string;
  distance: string;
  isPromoted?: boolean;
}

const mockRestaurants: Restaurant[] = [
  {
    id: "1",
    name: "Burger Palace",
    image: "https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=400&h=300&fit=crop",
    rating: 4.8,
    deliveryTime: "25-35 min",
    deliveryFee: 5.99,
    category: "Hamburguers",
    distance: "1.2 km",
    isPromoted: true
  },
  {
    id: "2", 
    name: "Pizza Italiana",
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop",
    rating: 4.6,
    deliveryTime: "30-40 min",
    deliveryFee: 4.50,
    category: "Pizza",
    distance: "0.8 km"
  },
  {
    id: "3",
    name: "Sushi Express",
    image: "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=400&h=300&fit=crop",
    rating: 4.9,
    deliveryTime: "20-30 min",
    deliveryFee: 6.99,
    category: "Japonesa",
    distance: "2.1 km"
  },
  {
    id: "4",
    name: "Taco Loco",
    image: "https://images.unsplash.com/photo-1565299507177-b0ac66763828?w=400&h=300&fit=crop",
    rating: 4.5,
    deliveryTime: "15-25 min",
    deliveryFee: 3.99,
    category: "Mexicana",
    distance: "1.5 km"
  },
  {
    id: "5",
    name: "Café Gourmet",
    image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400&h=300&fit=crop",
    rating: 4.7,
    deliveryTime: "10-20 min",
    deliveryFee: 2.99,
    category: "Café",
    distance: "0.5 km"
  },
  {
    id: "6",
    name: "Açaí Premium",
    image: "https://images.unsplash.com/photo-1488900128323-21503983a07e?w=400&h=300&fit=crop",
    rating: 4.4,
    deliveryTime: "15-25 min",
    deliveryFee: 4.99,
    category: "Açaí",
    distance: "1.8 km"
  }
];

const categories = ["Todos", "Hamburguers", "Pizza", "Japonesa", "Mexicana", "Café", "Açaí"];

interface DashboardProps {
  onLogout: () => void;
}

export function Dashboard({ onLogout }: DashboardProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [favorites, setFavorites] = useState<string[]>([]);

  const toggleFavorite = (restaurantId: string) => {
    setFavorites(prev => 
      prev.includes(restaurantId) 
        ? prev.filter(id => id !== restaurantId)
        : [...prev, restaurantId]
    );
  };

  const filteredRestaurants = mockRestaurants.filter(restaurant => {
    const matchesSearch = restaurant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         restaurant.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "Todos" || restaurant.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-background">
      <Navigation userType="customer" onLogout={onLogout} />
      
      {/* Hero Section */}
      <div className="relative h-64 bg-gradient-hero overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={deliveryHero}
            alt="DeliveryTech Hero"
            className="w-full h-full object-cover opacity-20"
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 h-full flex items-center">
          <div className="text-white">
            <h1 className="text-4xl font-bold mb-2">
              Comida deliciosa, entrega rápida
            </h1>
            <p className="text-xl opacity-90">
              Descubra os melhores restaurantes da sua região
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
              <Input
                placeholder="Buscar restaurantes ou pratos..."
                className="pl-10 h-12"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button variant="outline" size="lg" className="sm:w-auto">
              <Filter className="w-4 h-4 mr-2" />
              Filtros
            </Button>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2">
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
        </div>

        {/* Promoted Restaurants */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Restaurantes em Destaque</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRestaurants
              .filter(restaurant => restaurant.isPromoted)
              .map((restaurant) => (
                <RestaurantCard
                  key={restaurant.id}
                  restaurant={restaurant}
                  isFavorite={favorites.includes(restaurant.id)}
                  onToggleFavorite={() => toggleFavorite(restaurant.id)}
                  isPromoted
                />
              ))}
          </div>
        </div>

        {/* All Restaurants */}
        <div>
          <h2 className="text-2xl font-bold mb-4">Todos os Restaurantes</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredRestaurants.map((restaurant) => (
              <RestaurantCard
                key={restaurant.id}
                restaurant={restaurant}
                isFavorite={favorites.includes(restaurant.id)}
                onToggleFavorite={() => toggleFavorite(restaurant.id)}
              />
            ))}
          </div>
        </div>

        {filteredRestaurants.length === 0 && (
          <div className="text-center py-12">
            <p className="text-lg text-muted-foreground">
              Nenhum restaurante encontrado para "{searchTerm}"
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

interface RestaurantCardProps {
  restaurant: Restaurant;
  isFavorite: boolean;
  onToggleFavorite: () => void;
  isPromoted?: boolean;
}

function RestaurantCard({ restaurant, isFavorite, onToggleFavorite, isPromoted }: RestaurantCardProps) {
  return (
    <Link to={`/restaurant/${restaurant.id}`}>
      <Card className="group hover:shadow-strong transition-all duration-300 cursor-pointer border-0 bg-gradient-card overflow-hidden">
        <div className="relative">
          <img
            src={restaurant.image}
            alt={restaurant.name}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute top-3 right-3 flex gap-2">
            {isPromoted && (
              <Badge className="bg-accent text-accent-foreground">
                Destaque
              </Badge>
            )}
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0 bg-white/80 hover:bg-white"
              onClick={(e) => {
                e.preventDefault();
                onToggleFavorite();
              }}
            >
              <Heart className={`w-4 h-4 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} />
            </Button>
          </div>
          <div className="absolute bottom-3 left-3">
            <Badge variant="secondary" className="bg-white/90">
              {restaurant.category}
            </Badge>
          </div>
        </div>
        
        <CardContent className="p-4">
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">
              {restaurant.name}
            </h3>
            <div className="flex items-center space-x-1">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className="text-sm font-medium">{restaurant.rating}</span>
            </div>
          </div>
          
          <div className="space-y-2 text-sm text-muted-foreground">
            <div className="flex items-center space-x-1">
              <Clock className="w-4 h-4" />
              <span>{restaurant.deliveryTime}</span>
              <span>•</span>
              <span>R$ {restaurant.deliveryFee.toFixed(2)} entrega</span>
            </div>
            <div className="flex items-center space-x-1">
              <MapPin className="w-4 h-4" />
              <span>{restaurant.distance}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}