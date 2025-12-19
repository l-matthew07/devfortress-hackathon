/**
 * Shopify Service
 * Fetches store data or returns mocked data for hackathon demo
 */

// Mock store data for hackathon demo - comprehensive realistic data
const getMockStoreData = () => {
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  const lastWeek = new Date(today);
  lastWeek.setDate(lastWeek.getDate() - 7);

  return {
    storeName: "Urban Threads Clothing Co.",
    storeUrl: "urbanthreads.myshopify.com",
    currency: "USD",
    
    // Products with detailed information
    products: [
      { 
        id: 1, 
        title: "Classic Black Hoodie", 
        price: 49.99, 
        compareAtPrice: 69.99,
        inventory: 3, 
        vendor: "Urban Threads",
        category: "Hoodies",
        sku: "UTH-BLK-001",
        weight: 0.8,
        status: "active",
        tags: ["hoodie", "black", "winter", "casual"],
        salesCount: 127,
        views: 450
      },
      { 
        id: 2, 
        title: "Premium White Cotton Tee", 
        price: 29.99, 
        compareAtPrice: null,
        inventory: 42, 
        vendor: "Urban Threads",
        category: "T-Shirts",
        sku: "UTT-WHT-002",
        weight: 0.3,
        status: "active",
        tags: ["tee", "white", "cotton", "summer", "basic"],
        salesCount: 283,
        views: 892
      },
      { 
        id: 3, 
        title: "Slim Fit Blue Jeans", 
        price: 79.99, 
        compareAtPrice: 99.99,
        inventory: 15, 
        vendor: "Urban Threads",
        category: "Pants",
        sku: "UTJ-BLU-003",
        weight: 1.2,
        status: "active",
        tags: ["jeans", "blue", "slim-fit", "denim"],
        salesCount: 94,
        views: 312
      },
      { 
        id: 4, 
        title: "Red Athletic Sneakers", 
        price: 89.99, 
        compareAtPrice: 119.99,
        inventory: 8, 
        vendor: "Footwear Co.",
        category: "Shoes",
        sku: "UTS-RED-004",
        weight: 0.9,
        status: "active",
        tags: ["sneakers", "red", "athletic", "running"],
        salesCount: 56,
        views: 201
      },
      { 
        id: 5, 
        title: "Green Canvas Backpack", 
        price: 59.99, 
        compareAtPrice: 79.99,
        inventory: 0, 
        vendor: "Accessories Plus",
        category: "Accessories",
        sku: "UTA-GRN-005",
        weight: 0.7,
        status: "active",
        tags: ["backpack", "green", "canvas", "travel"],
        salesCount: 38,
        views: 156
      },
      {
        id: 6,
        title: "Navy Blue Windbreaker",
        price: 64.99,
        compareAtPrice: 84.99,
        inventory: 22,
        vendor: "Urban Threads",
        category: "Jackets",
        sku: "UTJ-NAV-006",
        weight: 0.6,
        status: "active",
        tags: ["jacket", "navy", "windbreaker", "outdoor"],
        salesCount: 71,
        views: 245
      },
      {
        id: 7,
        title: "Gray Wool Beanie",
        price: 19.99,
        compareAtPrice: null,
        inventory: 67,
        vendor: "Urban Threads",
        category: "Accessories",
        sku: "UTA-GRY-007",
        weight: 0.1,
        status: "active",
        tags: ["beanie", "gray", "wool", "winter"],
        salesCount: 145,
        views: 378
      },
      {
        id: 8,
        title: "Khaki Chino Shorts",
        price: 39.99,
        compareAtPrice: 49.99,
        inventory: 31,
        vendor: "Urban Threads",
        category: "Shorts",
        sku: "UTS-KHA-008",
        weight: 0.4,
        status: "active",
        tags: ["shorts", "khaki", "chino", "summer"],
        salesCount: 112,
        views: 289
      }
    ],
    
    // Sales data
    ordersToday: 12,
    revenueToday: 543.87,
    ordersYesterday: 18,
    revenueYesterday: 892.45,
    ordersThisWeek: 87,
    revenueThisWeek: 4234.56,
    ordersLastWeek: 124,
    revenueLastWeek: 5892.34,
    ordersThisMonth: 342,
    revenueThisMonth: 18234.89,
    
    // Metrics
    averageOrderValue: 53.31,
    averageOrderValueToday: 45.32,
    averageOrderValueLastWeek: 47.52,
    conversionRate: 2.8,
    conversionRateToday: 2.1,
    
    // Customers
    totalCustomers: 1247,
    newCustomersToday: 5,
    returningCustomersToday: 7,
    customerRetentionRate: 68.5,
    
    // Inventory
    totalProducts: 8,
    lowStockProducts: [
      { id: 1, title: "Classic Black Hoodie", inventory: 3, category: "Hoodies" },
      { id: 4, title: "Red Athletic Sneakers", inventory: 8, category: "Shoes" },
      { id: 5, title: "Green Canvas Backpack", inventory: 0, category: "Accessories" }
    ],
    outOfStockProducts: [
      { id: 5, title: "Green Canvas Backpack", inventory: 0, category: "Accessories" }
    ],
    
    // Cart data
    abandonedCarts: 7,
    abandonedCartValue: 312.45,
    averageAbandonedCartValue: 44.64,
    
    // Top selling products
    topSellingProducts: [
      { title: "Premium White Cotton Tee", salesCount: 283, revenue: 8484.17 },
      { title: "Gray Wool Beanie", salesCount: 145, revenue: 2898.55 },
      { title: "Slim Fit Blue Jeans", salesCount: 94, revenue: 7519.06 }
    ],
    topSellingProduct: "Premium White Cotton Tee",
    
    // Recent orders with more detail
    recentOrders: [
      { 
        id: 1001, 
        total: 79.98, 
        items: [
          { product: "Premium White Cotton Tee", quantity: 2, price: 29.99 }
        ], 
        status: "fulfilled",
        customerName: "John Smith",
        createdAt: new Date(today.getTime() - 2 * 60 * 60 * 1000).toISOString(),
        shippingCost: 5.99
      },
      { 
        id: 1002, 
        total: 49.99, 
        items: [
          { product: "Classic Black Hoodie", quantity: 1, price: 49.99 }
        ], 
        status: "pending",
        customerName: "Sarah Johnson",
        createdAt: new Date(today.getTime() - 5 * 60 * 60 * 1000).toISOString(),
        shippingCost: 5.99
      },
      { 
        id: 1003, 
        total: 169.98, 
        items: [
          { product: "Slim Fit Blue Jeans", quantity: 1, price: 79.99 },
          { product: "Red Athletic Sneakers", quantity: 1, price: 89.99 }
        ], 
        status: "fulfilled",
        customerName: "Mike Davis",
        createdAt: new Date(today.getTime() - 8 * 60 * 60 * 1000).toISOString(),
        shippingCost: 7.99
      },
      {
        id: 1004,
        total: 89.97,
        items: [
          { product: "Gray Wool Beanie", quantity: 3, price: 19.99 },
          { product: "Navy Blue Windbreaker", quantity: 1, price: 64.99 }
        ],
        status: "fulfilled",
        customerName: "Emily Chen",
        createdAt: new Date(yesterday.getTime()).toISOString(),
        shippingCost: 6.99
      }
    ],
    
    // Traffic data
    sessionsToday: 542,
    sessionsYesterday: 678,
    pageViewsToday: 1247,
    bounceRate: 45.2,
    
    // Product performance
    bestPerformingCategory: "T-Shirts",
    worstPerformingCategory: "Accessories",
    
    // Discounts and promotions
    activeDiscounts: 2,
    totalDiscountValueUsedToday: 34.50,
    
    // Shipping
    averageShippingTime: 3.2, // days
    fulfillmentRate: 96.8,
    
    // Trends
    revenueTrend: "down", // "up", "down", "stable"
    revenueChangePercent: -12.5,
    orderTrend: "down",
    orderChangePercent: -8.3,
    
    // Date info
    currentDate: today.toISOString(),
    yesterdayDate: yesterday.toISOString(),
    lastWeekDate: lastWeek.toISOString()
  };
};

/**
 * Fetch store data
 * For hackathon: returns mock data
 * In production: would call Shopify Admin API
 */
const fetchStoreData = async () => {
  // TODO: Replace with actual Shopify Admin API call
  // For hackathon, return mock data
  return getMockStoreData();
};

module.exports = {
  fetchStoreData
};
