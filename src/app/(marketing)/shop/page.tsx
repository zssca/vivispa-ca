'use client';

import { useState, useEffect, useMemo, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useShoppingCart } from '@/contexts/shopping-cart-context';
import { formatPrice } from '@/lib/square-client';
import { Product } from '@/types/data';

// UI Components
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';
import { Section } from '@/components/ui/section';
import { ProductCard } from '@/components/ui/product-card';

// Icons
import { 
  Search, 
  Filter, 
  ShoppingCart
} from 'lucide-react';
import Link from 'next/link';

// Constants
const ITEMS_PER_PAGE = 12;

function ShopContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // State
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [priceRange, setPriceRange] = useState('all');
  const [sortBy, setSortBy] = useState('name');

  const [currentPage, setCurrentPage] = useState(1);

  // Shopping cart
  const { addToCart, updateQuantity, getCartItemQuantity, getTotalItems } = useShoppingCart();

  // Load initial data
  useEffect(() => {
    const loadProducts = async () => {
      try {
        const response = await fetch('/api/items');
        if (response.ok) {
          const data = await response.json();
          console.log('API Response:', data);
          // Ensure data is an array
          if (Array.isArray(data)) {
            console.log('First product:', data[0]);
            setProducts(data);
          } else {
            console.warn('API returned non-array data:', data);
            setProducts([]);
          }
        } else {
          console.error('API response not ok:', response.status, response.statusText);
          setProducts([]);
        }
      } catch (error) {
        console.error('Failed to load products:', error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  // Filter and sort products
  const { filteredProducts, categories } = useMemo(() => {
    if (!products || !Array.isArray(products)) {
      return { filteredProducts: [], categories: [] };
    }
    
    let filtered = [...products];

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Category filter
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    // Price filter
    if (priceRange !== 'all') {
      filtered = filtered.filter(product => {
        const price = product.price;
        switch (priceRange) {
          case 'low': return price < 5000;
          case 'mid': return price >= 5000 && price <= 15000;
          case 'high': return price > 15000;
          default: return true;
        }
      });
    }

    // Sort products
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-low': return a.price - b.price;
        case 'price-high': return b.price - a.price;
        case 'category': return (a.category || '').localeCompare(b.category || '');
        case 'name':
        default:
          return a.name.localeCompare(b.name);
      }
    });

    // Get unique categories
    const cats = [...new Set(products.map(p => p.category).filter((cat): cat is string => Boolean(cat)))];

    return { filteredProducts: filtered, categories: cats };
  }, [products, searchTerm, selectedCategory, priceRange, sortBy]);

  // Pagination
  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  // Handlers
  const handleAddToCart = (product: Product) => {
    addToCart(product);
  };

  const handleBuyNow = (product: Product) => {
    addToCart(product);
    router.push('/shop/cart');
  };

  const handleUpdateQuantity = (productId: string, newQuantity: number) => {
    updateQuantity(productId, newQuantity);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Loading state
  if (loading) {
    return (
      <Section>
        <div className="space-y-6">
          <div className="space-y-2">
            <Skeleton className="h-8 w-64" />
            <Skeleton className="h-4 w-96" />
          </div>
          <Skeleton className="h-20 w-full" />
          <Skeleton className="h-32 w-full" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <Card key={i}>
                <Skeleton className="h-48 w-full rounded-t-lg" />
                <CardContent className="p-4 space-y-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-3 w-20" />
                  <Skeleton className="h-6 w-16" />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </Section>
    );
  }

  return (
    <Section>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col lg:flex-row gap-6">
        {/* Left Sidebar - Filters (Desktop) */}
        <div className="hidden lg:block w-64 flex-shrink-0">
          <div className="sticky top-6">
            <Card className="border border-border bg-card">
              <CardContent className="p-4">
                <div className="space-y-3">
                  {/* Search */}
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search products..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 h-10"
                    />
                    {searchTerm && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setSearchTerm('')}
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 w-8 p-0"
                      >
                        ×
                      </Button>
                    )}
                  </div>

                  {/* Category */}
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger className="h-10">
                      <SelectValue placeholder="All Categories" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  {/* Price Range */}
                  <Select value={priceRange} onValueChange={setPriceRange}>
                    <SelectTrigger className="h-10">
                      <SelectValue placeholder="All Prices" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Prices</SelectItem>
                      <SelectItem value="low">Under $50</SelectItem>
                      <SelectItem value="mid">$50 - $150</SelectItem>
                      <SelectItem value="high">$150+</SelectItem>
                    </SelectContent>
                  </Select>

                  {/* Availability */}
                  <Select defaultValue="all">
                    <SelectTrigger className="h-10">
                      <SelectValue placeholder="Availability" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Products</SelectItem>
                      <SelectItem value="in-stock">In Stock</SelectItem>
                      <SelectItem value="low-stock">Low Stock</SelectItem>
                      <SelectItem value="out-of-stock">Out of Stock</SelectItem>
                    </SelectContent>
                  </Select>

                  {/* Brand */}
                  <Select defaultValue="all">
                    <SelectTrigger className="h-10">
                      <SelectValue placeholder="All Brands" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Brands</SelectItem>
                      <SelectItem value="vivi-spa">Vivi Spa</SelectItem>
                      <SelectItem value="premium">Premium Collection</SelectItem>
                      <SelectItem value="organic">Organic Line</SelectItem>
                    </SelectContent>
                  </Select>

                  {/* Rating */}
                  <Select defaultValue="all">
                    <SelectTrigger className="h-10">
                      <SelectValue placeholder="Rating" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Ratings</SelectItem>
                      <SelectItem value="5">5 Stars</SelectItem>
                      <SelectItem value="4">4+ Stars</SelectItem>
                      <SelectItem value="3">3+ Stars</SelectItem>
                    </SelectContent>
                  </Select>

                  {/* Sort By */}
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="h-10">
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="name">Name A-Z</SelectItem>
                      <SelectItem value="price-low">Price: Low to High</SelectItem>
                      <SelectItem value="price-high">Price: High to Low</SelectItem>
                      <SelectItem value="category">Category</SelectItem>
                      <SelectItem value="rating">Highest Rated</SelectItem>
                      <SelectItem value="newest">Newest First</SelectItem>
                    </SelectContent>
                  </Select>

                  {/* Clear All Button */}
                  {(searchTerm || selectedCategory !== 'all' || priceRange !== 'all') && (
                    <Button
                      variant="outline"
                      size="lg"
                      onClick={() => {
                        setSearchTerm('');
                        setSelectedCategory('all');
                        setPriceRange('all');
                      }}
                      className="w-full"
                    >
                      Clear All
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Mobile/Tablet Filters */}
        <div className="lg:hidden w-full">
          <Card className="border border-border bg-card">
            <CardContent className="p-4">
              <div className="space-y-2">
                {/* Search */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search products..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 h-10"
                  />
                  {searchTerm && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setSearchTerm('')}
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 w-8 p-0"
                    >
                      ×
                    </Button>
                  )}
                </div>

                {/* Filter Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger className="h-10">
                      <SelectValue placeholder="All Categories" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  
                  <Select value={priceRange} onValueChange={setPriceRange}>
                    <SelectTrigger className="h-10">
                      <SelectValue placeholder="All Prices" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Prices</SelectItem>
                      <SelectItem value="low">Under $50</SelectItem>
                      <SelectItem value="mid">$50 - $150</SelectItem>
                      <SelectItem value="high">$150+</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select defaultValue="all">
                    <SelectTrigger className="h-10">
                      <SelectValue placeholder="Availability" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Products</SelectItem>
                      <SelectItem value="in-stock">In Stock</SelectItem>
                      <SelectItem value="low-stock">Low Stock</SelectItem>
                      <SelectItem value="out-of-stock">Out of Stock</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select defaultValue="all">
                    <SelectTrigger className="h-10">
                      <SelectValue placeholder="All Brands" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Brands</SelectItem>
                      <SelectItem value="vivi-spa">Vivi Spa</SelectItem>
                      <SelectItem value="premium">Premium Collection</SelectItem>
                      <SelectItem value="organic">Organic Line</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select defaultValue="all">
                    <SelectTrigger className="h-10">
                      <SelectValue placeholder="Rating" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Ratings</SelectItem>
                      <SelectItem value="5">5 Stars</SelectItem>
                      <SelectItem value="4">4+ Stars</SelectItem>
                      <SelectItem value="3">3+ Stars</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="h-10">
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="name">Name A-Z</SelectItem>
                      <SelectItem value="price-low">Price: Low to High</SelectItem>
                      <SelectItem value="price-high">Price: High to Low</SelectItem>
                      <SelectItem value="category">Category</SelectItem>
                      <SelectItem value="rating">Highest Rated</SelectItem>
                      <SelectItem value="newest">Newest First</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Clear All Button */}
                {(searchTerm || selectedCategory !== 'all' || priceRange !== 'all') && (
                  <Button
                    variant="outline"
                    size="lg"
                    onClick={() => {
                      setSearchTerm('');
                      setSelectedCategory('all');
                      setPriceRange('all');
                    }}
                    className="w-full"
                  >
                    Clear All
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="flex-1 space-y-6">


          {/* Products */}
          <div className="space-y-4">
          {/* Section Header */}
          {filteredProducts.length > 0 && (
            <Card className="border border-border bg-card">
              <CardContent className="p-4">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div className="flex-1">
                    <h2 className="text-xl font-bold mb-2">
                      {selectedCategory !== 'all' ? `${selectedCategory} Products` : 'All Products'}
                    </h2>
                    <p className="text-sm text-muted-foreground">
                      Showing <span className="font-medium text-foreground">{Math.min(ITEMS_PER_PAGE, filteredProducts.length)}</span> of <span className="font-medium text-foreground">{filteredProducts.length}</span> products
                      {currentPage > 1 && ` (Page ${currentPage} of ${totalPages})`}
                    </p>
                  </div>
                  
                  {filteredProducts.length > ITEMS_PER_PAGE && (
                    <div className="text-sm font-medium px-3 py-1 bg-muted rounded-md">
                      Page {currentPage} of {totalPages}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Products Grid */}
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {paginatedProducts.map((product) => {
                const quantity = getCartItemQuantity(product.id);
                
                return (
                  <ProductCard
                    key={product.id}
                    product={product}
                    quantity={quantity}
                    onAddToCart={handleAddToCart}
                    onBuyNow={handleBuyNow}
                    onUpdateQuantity={handleUpdateQuantity}
                  />
                );
              })}
            </div>
          ) : (
            // Empty State
            <Card className="border-0 bg-muted/30">
              <CardContent className="flex flex-col items-center justify-center py-16">
                <div className="text-center max-w-md">
                  <div className="w-24 h-24 mx-auto mb-6 bg-muted rounded-full flex items-center justify-center">
                    <Search className="w-12 h-12 text-muted-foreground" />
                  </div>
                  <h2 className="text-2xl font-bold mb-3">No Products Found</h2>
                  <p className="text-muted-foreground mb-6">
                    Try adjusting your search terms or filters to find what you&apos;re looking for.
                  </p>
                  <Button 
                    onClick={() => {
                      setSearchTerm('');
                      setSelectedCategory('all');
                      setPriceRange('all');
                    }}
                    size="lg"
                    className="w-full sm:w-auto"
                  >
                    Clear All Filters
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Pagination */}
          {filteredProducts.length > ITEMS_PER_PAGE && (
            <div className="flex items-center justify-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                Previous
              </Button>
              
              <div className="flex items-center gap-1">
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  const page = i + 1;
                  return (
                    <Button
                      key={page}
                      variant={currentPage === page ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => handlePageChange(page)}
                      className="w-8 p-0"
                    >
                      {page}
                    </Button>
                  );
                })}
              </div>
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                Next
              </Button>
            </div>
          )}
          </div>
        </div>
      </div>
      </div>
    </Section>
  );
}

function ShopPageSkeleton() {
  return (
    <Section spacing="lg">
      <div className="container mx-auto px-4">
        <div className="space-y-6 md:space-y-8">
          {/* Header */}
          <div className="text-center">
            <Skeleton className="h-12 w-64 mx-auto mb-4" />
            <Skeleton className="h-6 w-96 mx-auto" />
          </div>

          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Skeleton className="h-10 flex-1" />
            <Skeleton className="h-10 w-48" />
            <Skeleton className="h-10 w-48" />
            <Skeleton className="h-10 w-48" />
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <Skeleton key={i} className="h-96 w-full" />
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={<ShopPageSkeleton />}>
      <ShopContent />
    </Suspense>
  );
}