export interface Product {
  id: number
  name: string
  price: number
  originalPrice: number | null
  images: string[]
  rating: number
  reviewCount: number
  category: string
  badge: string
  description: string
  longDescription: string
  features: string[]
  nutrition: {
    servingSize: string
    calories: number
    protein: string
    fat: string
    carbs: string
    fiber: string
  }
  customerReviews: {
    id: number
    name: string
    rating: number
    comment: string
    date: string
  }[]
}

export const products: Product[] = [
  {
    id: 1,
    name: "Tree Nuts Almonds",
    price: 1999,
    originalPrice: 2499,
    images: [
      "/images/image_page1_Im1.jpg",
      "/images/image_page2_Im1.jpg"
    ],
    rating: 4.8,
    reviewCount: 124,
    category: "almonds",
    badge: "Best Seller",
    description: "Premium California almonds sourced from the finest orchards. These raw, unsalted almonds are carefully selected for their size, taste, and nutritional value.",
    longDescription: "Our Tree Nuts Almonds are hand-selected from the most prestigious orchards in California's Central Valley. These almonds are known for their superior taste, texture, and nutritional profile. Each almond is carefully inspected to ensure it meets our high quality standards.\n\nThese raw, unsalted almonds are perfect for health-conscious consumers who want the pure, natural taste of almonds without any added salt or preservatives. They're rich in protein, healthy fats, vitamin E, and other essential nutrients.\n\nUse them in your morning smoothie, sprinkle them on your yogurt, add them to your baking recipes, or simply enjoy them as a healthy snack throughout the day.",
    features: [
      "100% Raw and Natural",
      "No Added Salt or Preservatives",
      "Rich in Protein and Healthy Fats",
      "High in Vitamin E",
      "Perfect for Snacking and Baking",
      "Carefully Selected for Size and Quality"
    ],
    nutrition: {
      servingSize: "28g (1/4 cup)",
      calories: 160,
      protein: "6g",
      fat: "14g",
      carbs: "6g",
      fiber: "3g"
    },
    customerReviews: [
      {
        id: 1,
        name: "Priya S.",
        rating: 5,
        comment: "Excellent quality almonds! They're fresh, crunchy, and taste amazing. Perfect for my morning smoothies.",
        date: "2024-01-15"
      },
      {
        id: 2,
        name: "Rajesh K.",
        rating: 4,
        comment: "Great almonds, good size and taste. Would definitely recommend to others.",
        date: "2024-01-10"
      },
      {
        id: 3,
        name: "Anjali M.",
        rating: 5,
        comment: "Best almonds I've ever tasted! Fresh, crunchy, and perfect for snacking.",
        date: "2024-01-08"
      }
    ]
  },
  {
    id: 2,
    name: "Tree Nuts Amla Candy",
    price: 1499,
    originalPrice: null,
    images: [
      "/images/image_page3_Im1.jpg",
      "/images/image_page4_Im1.jpg"
    ],
    rating: 4.9,
    reviewCount: 89,
    category: "candies",
    badge: "Organic",
    description: "Traditional Indian amla candy made from gooseberries. Sweet, tangy, and packed with vitamin C.",
    longDescription: "Our Tree Nuts Amla Candy is made from the finest Indian gooseberries (amla), known for their high vitamin C content and numerous health benefits. These traditional candies are naturally sweetened and preserved using age-old methods.\n\nAmla is considered a superfood in Ayurvedic medicine, known for its immune-boosting properties and antioxidant benefits. Our candies maintain the natural tangy flavor of amla while being perfectly sweetened for enjoyable snacking.\n\nPerfect for boosting immunity, satisfying sweet cravings, or as a healthy alternative to regular candies. Great for kids and adults alike!",
    features: [
      "Made from Fresh Amla",
      "High in Vitamin C",
      "Natural Sweetening",
      "Traditional Recipe",
      "Immune Boosting",
      "Antioxidant Rich"
    ],
    nutrition: {
      servingSize: "30g (6 pieces)",
      calories: 100,
      protein: "1g",
      fat: "0g",
      carbs: "25g",
      fiber: "2g"
    },
    customerReviews: [
      {
        id: 1,
        name: "Meera P.",
        rating: 5,
        comment: "Amazing amla candy! Perfect balance of sweet and tangy. Great for immunity.",
        date: "2024-01-12"
      }
    ]
  },
  {
    id: 3,
    name: "Tree Nuts Dried Apricot",
    price: 2799,
    originalPrice: 3299,
    images: [
      "/images/image_page5_Im1.jpg",
      "/images/image_page6_Im1.jpg"
    ],
    rating: 4.7,
    reviewCount: 156,
    category: "dried-fruits",
    badge: "Premium",
    description: "Premium dried apricots from the finest orchards. Sweet, chewy, and naturally preserved.",
    longDescription: "Our Tree Nuts Dried Apricots are carefully selected from the finest apricot orchards. These premium dried fruits are naturally sweet and chewy, with no added preservatives or artificial sweeteners.\n\nApricots are rich in beta-carotene, fiber, and essential vitamins. Our drying process preserves all the natural nutrients while creating a delicious, shelf-stable snack that's perfect for any time of day.\n\nUse them in your morning oatmeal, add them to trail mixes, or enjoy them as a healthy snack. They're also great for baking and cooking, adding natural sweetness to your favorite recipes.",
    features: [
      "Premium Quality Apricots",
      "Naturally Sweet",
      "No Added Preservatives",
      "Rich in Beta-Carotene",
      "High in Fiber",
      "Perfect for Snacking"
    ],
    nutrition: {
      servingSize: "40g (1/4 cup)",
      calories: 120,
      protein: "2g",
      fat: "0g",
      carbs: "30g",
      fiber: "4g"
    },
    customerReviews: [
      {
        id: 1,
        name: "Amit S.",
        rating: 5,
        comment: "Best dried apricots ever! Sweet, chewy, and perfect quality.",
        date: "2024-01-14"
      }
    ]
  },
  {
    id: 4,
    name: "Tree Nuts Black Currant",
    price: 1899,
    originalPrice: null,
    images: [
      "/images/image_page7_Im1.jpg",
      "/images/image_page8_Im1.jpg"
    ],
    rating: 4.6,
    reviewCount: 203,
    category: "dried-fruits",
    badge: "Popular",
    description: "Premium dried black currants with intense flavor and natural sweetness.",
    longDescription: "Our Tree Nuts Black Currants are carefully dried to preserve their intense flavor and natural sweetness. These premium dried fruits are rich in antioxidants and vitamin C, making them a healthy and delicious snack choice.\n\nBlack currants are known for their unique tart-sweet flavor and numerous health benefits. Our drying process maintains their nutritional value while creating a convenient, shelf-stable product that's perfect for snacking or adding to your favorite recipes.\n\nGreat for adding to cereals, yogurt, or using in baking. They're also perfect for making jams, jellies, or adding to smoothies for an extra boost of flavor and nutrition.",
    features: [
      "Premium Black Currants",
      "Intense Flavor",
      "Rich in Antioxidants",
      "High in Vitamin C",
      "Natural Sweetness",
      "Perfect for Baking"
    ],
    nutrition: {
      servingSize: "30g (1/4 cup)",
      calories: 100,
      protein: "2g",
      fat: "0g",
      carbs: "25g",
      fiber: "3g"
    },
    customerReviews: [
      {
        id: 1,
        name: "Kavita R.",
        rating: 4,
        comment: "Great black currants! Perfect flavor and quality.",
        date: "2024-01-11"
      }
    ]
  },
  {
    id: 5,
    name: "Tree Nuts Black Pepper",
    price: 2399,
    originalPrice: 2899,
    images: [
      "/images/image_page9_Im1.jpg",
      "/images/image_page10_Im1.jpg"
    ],
    rating: 4.5,
    reviewCount: 87,
    category: "spices",
    badge: "Sale",
    description: "Premium black peppercorns with intense aroma and bold flavor.",
    longDescription: "Our Tree Nuts Black Pepper is sourced from the finest pepper plantations. These premium black peppercorns are carefully selected for their size, aroma, and flavor intensity.\n\nBlack pepper is known as the 'King of Spices' and is one of the most widely used spices in the world. Our peppercorns are sun-dried to preserve their essential oils and natural flavor compounds.\n\nPerfect for grinding fresh pepper over your dishes, adding to marinades, or using in cooking. The intense aroma and bold flavor will elevate any dish to new heights.",
    features: [
      "Premium Black Peppercorns",
      "Intense Aroma",
      "Bold Flavor",
      "Sun-Dried",
      "Rich in Essential Oils",
      "Versatile Usage"
    ],
    nutrition: {
      servingSize: "1g (1/4 tsp)",
      calories: 5,
      protein: "0g",
      fat: "0g",
      carbs: "1g",
      fiber: "0g"
    },
    customerReviews: [
      {
        id: 1,
        name: "Rahul M.",
        rating: 4,
        comment: "Excellent black pepper! Strong aroma and perfect for cooking.",
        date: "2024-01-13"
      }
    ]
  },
  {
    id: 6,
    name: "Tree Nuts Black Raisins",
    price: 2199,
    originalPrice: null,
    images: [
      "/images/image_page11_Im1.jpg",
      "/images/image_page12_Im1.jpg"
    ],
    rating: 4.7,
    reviewCount: 142,
    category: "dried-fruits",
    badge: "Fresh",
    description: "Premium black raisins with natural sweetness and chewy texture.",
    longDescription: "Our Tree Nuts Black Raisins are made from the finest grapes, carefully dried to preserve their natural sweetness and chewy texture. These premium dried fruits are rich in natural sugars, fiber, and essential minerals.\n\nBlack raisins are known for their intense sweetness and numerous health benefits. They're a great source of iron, potassium, and antioxidants. Our raisins are naturally dried without any added preservatives or artificial sweeteners.\n\nPerfect for snacking, adding to cereals, or using in baking. They're also great for making energy balls, trail mixes, or adding to your favorite desserts.",
    features: [
      "Premium Black Raisins",
      "Natural Sweetness",
      "Chewy Texture",
      "Rich in Iron",
      "High in Potassium",
      "No Added Preservatives"
    ],
    nutrition: {
      servingSize: "40g (1/4 cup)",
      calories: 130,
      protein: "2g",
      fat: "0g",
      carbs: "35g",
      fiber: "2g"
    },
    customerReviews: [
      {
        id: 1,
        name: "Sneha K.",
        rating: 5,
        comment: "Delicious black raisins! Sweet and chewy, perfect for snacking.",
        date: "2024-01-09"
      }
    ]
  },
  {
    id: 7,
    name: "Tree Nuts Cashew Nuts",
    price: 3599,
    originalPrice: 4199,
    images: [
      "/images/image_page13_Im1.jpg",
      "/images/image_page14_Im1.jpg"
    ],
    rating: 4.9,
    reviewCount: 78,
    category: "cashews",
    badge: "Premium",
    description: "Premium raw cashews with buttery texture and mild flavor.",
    longDescription: "Our Tree Nuts Cashew Nuts are carefully selected for their size, quality, and taste. These premium raw cashews have a naturally buttery texture and mild, sweet flavor that makes them perfect for snacking or cooking.\n\nCashews are rich in healthy fats, protein, and essential minerals like magnesium and zinc. Our cashews are raw and unsalted, preserving their natural nutritional profile and allowing you to control the seasoning.\n\nPerfect for snacking, adding to salads, or using in cooking. They're also great for making cashew milk, butter, or adding to your favorite recipes for extra creaminess and nutrition.",
    features: [
      "Premium Raw Cashews",
      "Buttery Texture",
      "Mild Sweet Flavor",
      "Rich in Healthy Fats",
      "High in Protein",
      "No Added Salt"
    ],
    nutrition: {
      servingSize: "28g (1/4 cup)",
      calories: 155,
      protein: "5g",
      fat: "12g",
      carbs: "9g",
      fiber: "1g"
    },
    customerReviews: [
      {
        id: 1,
        name: "Neha P.",
        rating: 5,
        comment: "Amazing cashews! Buttery texture and perfect quality.",
        date: "2024-01-16"
      }
    ]
  },
  {
    id: 8,
    name: "Tree Nuts Chia Seeds",
    price: 1299,
    originalPrice: null,
    images: [
      "/images/image_page15_Im1.jpg",
      "/images/image_page16_Im1.jpg"
    ],
    rating: 4.6,
    reviewCount: 95,
    category: "seeds",
    badge: "Organic",
    description: "Organic chia seeds packed with omega-3 fatty acids and fiber.",
    longDescription: "Our Tree Nuts Chia Seeds are certified organic and packed with essential nutrients. These tiny seeds are a powerhouse of nutrition, containing high levels of omega-3 fatty acids, fiber, protein, and antioxidants.\n\nChia seeds are known for their ability to absorb liquid and create a gel-like consistency, making them perfect for puddings, smoothies, and baking. They're also great for adding to cereals, yogurt, or sprinkling over salads.\n\nOur chia seeds are carefully cleaned and packaged to maintain their freshness and nutritional value. They're a great addition to any healthy diet and can help support heart health, digestion, and overall wellness.",
    features: [
      "Certified Organic",
      "Rich in Omega-3",
      "High in Fiber",
      "Protein Packed",
      "Antioxidant Rich",
      "Versatile Usage"
    ],
    nutrition: {
      servingSize: "12g (2 tbsp)",
      calories: 60,
      protein: "3g",
      fat: "3g",
      carbs: "5g",
      fiber: "5g"
    },
    customerReviews: [
      {
        id: 1,
        name: "Arjun S.",
        rating: 4,
        comment: "Great chia seeds! Perfect for my morning smoothies.",
        date: "2024-01-13"
      }
    ]
  },
  {
    id: 9,
    name: "Tree Nuts Cummin Seeds",
    price: 2899,
    originalPrice: 3399,
    images: [
      "/images/image_page17_Im1.jpg",
      "/images/image_page18_Im1.jpg"
    ],
    rating: 4.8,
    reviewCount: 167,
    category: "seeds",
    badge: "Premium",
    description: "Premium cumin seeds with intense aroma and warm, earthy flavor.",
    longDescription: "Our Tree Nuts Cumin Seeds are carefully selected for their quality and aroma. These premium cumin seeds have an intense, warm, and earthy flavor that is essential in many cuisines around the world.\n\nCumin is known for its digestive benefits and is rich in essential oils that give it its distinctive aroma. Our cumin seeds are sun-dried to preserve their natural flavor compounds and essential oils.\n\nPerfect for tempering, adding to curries, or using in spice blends. The intense aroma and warm flavor will enhance any dish and provide authentic taste to your cooking.",
    features: [
      "Premium Cumin Seeds",
      "Intense Aroma",
      "Warm Earthy Flavor",
      "Sun-Dried",
      "Rich in Essential Oils",
      "Digestive Benefits"
    ],
    nutrition: {
      servingSize: "1g (1/4 tsp)",
      calories: 5,
      protein: "0g",
      fat: "0g",
      carbs: "1g",
      fiber: "0g"
    },
    customerReviews: [
      {
        id: 1,
        name: "Priya M.",
        rating: 5,
        comment: "Excellent cumin seeds! Strong aroma and perfect for cooking.",
        date: "2024-01-17"
      }
    ]
  },
  {
    id: 10,
    name: "Tree Nuts Dried Kiwi",
    price: 2599,
    originalPrice: null,
    images: [
      "/images/image_page19_Im1.jpg",
      "/images/image_page20_Im1.jpg"
    ],
    rating: 4.7,
    reviewCount: 134,
    category: "dried-fruits",
    badge: "Fresh",
    description: "Premium dried kiwi slices with natural sweetness and tangy flavor.",
    longDescription: "Our Tree Nuts Dried Kiwi is made from the finest fresh kiwis, carefully dried to preserve their natural sweetness and tangy flavor. These premium dried kiwi slices are rich in vitamin C, fiber, and antioxidants.\n\nKiwi is known for its high vitamin C content and numerous health benefits. Our drying process maintains the natural nutrients while creating a delicious, shelf-stable snack that's perfect for any time of day.\n\nPerfect for snacking, adding to cereals, or using in baking. They're also great for making trail mixes, adding to yogurt, or including in your favorite recipes for extra nutrition and flavor.",
    features: [
      "Premium Dried Kiwi",
      "Natural Sweetness",
      "Tangy Flavor",
      "High in Vitamin C",
      "Rich in Fiber",
      "Antioxidant Rich"
    ],
    nutrition: {
      servingSize: "30g (1/4 cup)",
      calories: 100,
      protein: "1g",
      fat: "0g",
      carbs: "25g",
      fiber: "3g"
    },
    customerReviews: [
      {
        id: 1,
        name: "Rajesh P.",
        rating: 4,
        comment: "Delicious dried kiwi! Sweet and tangy, perfect for snacking.",
        date: "2024-01-15"
      }
    ]
  }
]

// Helper functions
export function getProductById(id: number): Product | undefined {
  return products.find(product => product.id === id)
}

export function getProductsByCategory(category: string): Product[] {
  return products.filter(product => product.category === category)
}

export function getFeaturedProducts(): Product[] {
  return products.slice(0, 4) // First 4 products as featured
}

export function getAllProducts(): Product[] {
  return products
}

export interface Category {
  name: string
  slug: string
  count: number
}

export function getCategories(): Category[] {
  const categoryMap = new Map<string, number>()
  
  products.forEach(product => {
    const count = categoryMap.get(product.category) || 0
    categoryMap.set(product.category, count + 1)
  })
  
  return Array.from(categoryMap.entries()).map(([category, count]) => ({
    name: category.charAt(0).toUpperCase() + category.slice(1).replace('-', ' '),
    slug: category,
    count
  }))
} 