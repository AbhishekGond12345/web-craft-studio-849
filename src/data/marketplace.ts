import provider1 from "@/assets/provider-1.jpg";
import provider2 from "@/assets/provider-2.jpg";
import provider3 from "@/assets/provider-3.jpg";
import provider4 from "@/assets/provider-4.jpg";
import provider5 from "@/assets/provider-5.jpg";

export type MealType = "Breakfast" | "Lunch" | "Dinner";

export type TiffinProvider = {
  id: string;
  name: string;
  owner: string;
  image: string;
  city: string;
  area: string;
  cuisine: string;
  veg: "Pure Veg" | "Veg & Non-Veg";
  rating: number;
  reviews: number;
  verified: boolean;
  startingPrice: number;
  deliveryTime: string;
  distanceKm: number;
  availability: "Available" | "Fully Booked" | "Closed Today";
  deliveryAreas: string[];
  mealTypes: MealType[];
  about: string;
  phone: string;
  todaysMenu: { meal: MealType; time: string; items: string[]; price: number }[];
  weeklyMenu: { day: string; lunch: string; dinner: string }[];
  plans: { id: string; name: string; period: string; price: number; meals: string; save?: string }[];
  reviewList: { name: string; rating: number; date: string; text: string }[];
};

export const tiffinProviders: TiffinProvider[] = [
  {
    id: "maa-kitchen",
    name: "Maa Kitchen",
    owner: "Sunita Deshmukh",
    image: provider1,
    city: "Pune",
    area: "Kothrud",
    cuisine: "Maharashtrian & North Indian",
    veg: "Pure Veg",
    rating: 4.8,
    reviews: 412,
    verified: true,
    startingPrice: 95,
    deliveryTime: "30-40 min",
    distanceKm: 1.4,
    availability: "Available",
    deliveryAreas: ["Kothrud", "Karve Nagar", "Warje", "Erandwane"],
    mealTypes: ["Lunch", "Dinner"],
    about:
      "Run by Sunita tai for the last 11 years, Maa Kitchen cooks everything fresh in small batches with cold-pressed groundnut oil and zero preservatives. Popular with working professionals in Kothrud.",
    phone: "+91 98220 41185",
    todaysMenu: [
      {
        meal: "Lunch",
        time: "12:00 PM - 1:30 PM",
        items: ["Varan Dal", "Jeera Rice", "3 Phulka", "Bhendi Masala", "Koshimbir", "Lonche", "Shrikhand"],
        price: 110,
      },
      {
        meal: "Dinner",
        time: "7:30 PM - 9:00 PM",
        items: ["Masoor Dal", "Rice", "3 Chapati", "Aloo Matar", "Salad", "Papad"],
        price: 95,
      },
    ],
    weeklyMenu: [
      { day: "Monday", lunch: "Varan Bhaat, Bhendi Masala", dinner: "Masoor Dal, Aloo Matar" },
      { day: "Tuesday", lunch: "Amti, Kobi Bhaji", dinner: "Palak Dal, Gawar Bhaji" },
      { day: "Wednesday", lunch: "Rajma Chawal, Salad", dinner: "Dal Fry, Mix Veg" },
      { day: "Thursday", lunch: "Kadhi Khichdi, Papad", dinner: "Chana Masala, Rice" },
      { day: "Friday", lunch: "Puri Bhaji, Shrikhand", dinner: "Tur Dal, Bharli Vangi" },
      { day: "Saturday", lunch: "Pulao, Raita", dinner: "Paneer Bhurji, Chapati" },
      { day: "Sunday", lunch: "Puran Poli Special Thali", dinner: "Khichdi, Kadhi" },
    ],
    plans: [
      { id: "daily", name: "Daily Plan", period: "per day", price: 110, meals: "Lunch or Dinner" },
      { id: "weekly", name: "Weekly Plan", period: "per week", price: 680, meals: "Lunch only", save: "Save ₹90" },
      { id: "monthly", name: "Monthly Plan", period: "per month", price: 2600, meals: "Lunch + Dinner", save: "Save ₹700" },
    ],
    reviewList: [
      { name: "Rohit Kulkarni", rating: 5, date: "12 Sep 2026", text: "Tastes exactly like home. The varan bhaat on Mondays is unbeatable." },
      { name: "Sneha Patil", rating: 5, date: "04 Sep 2026", text: "Always on time and the quantity is generous for the price." },
      { name: "Amit Jadhav", rating: 4, date: "28 Aug 2026", text: "Great food. Would love a slightly spicier option for dinner." },
    ],
  },
  {
    id: "ghar-ka-swad",
    name: "Ghar Ka Swad",
    owner: "Rekha Sharma",
    image: provider2,
    city: "Pune",
    area: "Viman Nagar",
    cuisine: "Punjabi Home Food",
    veg: "Veg & Non-Veg",
    rating: 4.6,
    reviews: 289,
    verified: true,
    startingPrice: 120,
    deliveryTime: "35-45 min",
    distanceKm: 2.8,
    availability: "Available",
    deliveryAreas: ["Viman Nagar", "Kharadi", "Yerwada", "Kalyani Nagar"],
    mealTypes: ["Lunch", "Dinner"],
    about:
      "Hearty Punjabi cooking with fresh malai, hand-kneaded atta and slow-cooked rajma. Non-veg thalis are available on Wednesdays and Sundays.",
    phone: "+91 90280 77341",
    todaysMenu: [
      {
        meal: "Lunch",
        time: "12:30 PM - 2:00 PM",
        items: ["Rajma", "Steamed Rice", "2 Tawa Roti", "Jeera Aloo", "Onion Salad", "Boondi Raita"],
        price: 130,
      },
      {
        meal: "Dinner",
        time: "8:00 PM - 9:30 PM",
        items: ["Dal Makhani", "3 Roti", "Seasonal Sabzi", "Salad", "Gulab Jamun"],
        price: 140,
      },
    ],
    weeklyMenu: [
      { day: "Monday", lunch: "Rajma Chawal", dinner: "Dal Makhani, Roti" },
      { day: "Tuesday", lunch: "Chole, Rice", dinner: "Aloo Gobi, Roti" },
      { day: "Wednesday", lunch: "Chicken Curry Thali", dinner: "Egg Curry, Rice" },
      { day: "Thursday", lunch: "Kadhi Chawal", dinner: "Matar Paneer, Roti" },
      { day: "Friday", lunch: "Sarson Saag, Makki Roti", dinner: "Dal Tadka, Rice" },
      { day: "Saturday", lunch: "Veg Pulao, Raita", dinner: "Shahi Paneer, Naan" },
      { day: "Sunday", lunch: "Butter Chicken Thali", dinner: "Chole Bhature" },
    ],
    plans: [
      { id: "daily", name: "Daily Plan", period: "per day", price: 130, meals: "Lunch or Dinner" },
      { id: "weekly", name: "Weekly Plan", period: "per week", price: 820, meals: "Lunch only", save: "Save ₹90" },
      { id: "monthly", name: "Monthly Plan", period: "per month", price: 3100, meals: "Lunch + Dinner", save: "Save ₹800" },
    ],
    reviewList: [
      { name: "Priya Nair", rating: 5, date: "10 Sep 2026", text: "Dal makhani is restaurant quality but feels homemade." },
      { name: "Karan Bhatia", rating: 4, date: "01 Sep 2026", text: "Sunday butter chicken thali is worth the wait." },
    ],
  },
  {
    id: "healthy-tiffin-hub",
    name: "Healthy Tiffin Hub",
    owner: "Dr. Meera Iyer",
    image: provider3,
    city: "Pune",
    area: "Baner",
    cuisine: "Diet & Millet Meals",
    veg: "Pure Veg",
    rating: 4.7,
    reviews: 198,
    verified: true,
    startingPrice: 150,
    deliveryTime: "25-35 min",
    distanceKm: 3.5,
    availability: "Fully Booked",
    deliveryAreas: ["Baner", "Balewadi", "Aundh", "Pashan"],
    mealTypes: ["Breakfast", "Lunch", "Dinner"],
    about:
      "Calorie-counted meals designed by a certified nutritionist. Every box lists macros, uses millets instead of refined flour and keeps oil under 10g per meal.",
    phone: "+91 99215 60034",
    todaysMenu: [
      { meal: "Breakfast", time: "7:30 AM - 9:00 AM", items: ["Moong Chilla", "Mint Chutney", "Fruit Bowl", "Herbal Tea"], price: 120 },
      {
        meal: "Lunch",
        time: "12:00 PM - 1:30 PM",
        items: ["2 Bajra Roti", "Grilled Paneer", "Sprouts Salad", "Curd", "Lauki Sabzi"],
        price: 175,
      },
      { meal: "Dinner", time: "7:00 PM - 8:30 PM", items: ["Quinoa Khichdi", "Steamed Veggies", "Curd", "Soup"], price: 165 },
    ],
    weeklyMenu: [
      { day: "Monday", lunch: "Bajra Roti, Grilled Paneer", dinner: "Quinoa Khichdi" },
      { day: "Tuesday", lunch: "Jowar Roti, Soya Curry", dinner: "Veg Daliya, Soup" },
      { day: "Wednesday", lunch: "Brown Rice, Dal, Salad", dinner: "Millet Upma" },
      { day: "Thursday", lunch: "Ragi Roti, Chana Sabzi", dinner: "Oats Khichdi" },
      { day: "Friday", lunch: "Red Rice, Sambar", dinner: "Tofu Stir Fry, Roti" },
      { day: "Saturday", lunch: "Buddha Bowl", dinner: "Moong Dal Cheela" },
      { day: "Sunday", lunch: "Detox Thali", dinner: "Veg Clear Soup, Salad" },
    ],
    plans: [
      { id: "daily", name: "Daily Plan", period: "per day", price: 175, meals: "Lunch or Dinner" },
      { id: "weekly", name: "Weekly Plan", period: "per week", price: 1120, meals: "Lunch only", save: "Save ₹105" },
      { id: "monthly", name: "Monthly Plan", period: "per month", price: 4200, meals: "Lunch + Dinner", save: "Save ₹1,100" },
    ],
    reviewList: [
      { name: "Ananya Rao", rating: 5, date: "09 Sep 2026", text: "Lost 4 kg in two months without feeling hungry. Portions are smart." },
      { name: "Vikram Shetty", rating: 4, date: "22 Aug 2026", text: "Slightly pricey but the quality of ingredients shows." },
    ],
  },
  {
    id: "student-tiffin-point",
    name: "Student Tiffin Point",
    owner: "Ramesh Yadav",
    image: provider4,
    city: "Pune",
    area: "Katraj",
    cuisine: "Everyday Indian",
    veg: "Veg & Non-Veg",
    rating: 4.3,
    reviews: 526,
    verified: false,
    startingPrice: 70,
    deliveryTime: "20-30 min",
    distanceKm: 0.9,
    availability: "Available",
    deliveryAreas: ["Katraj", "Dhankawadi", "Ambegaon", "Bibwewadi"],
    mealTypes: ["Lunch", "Dinner"],
    about:
      "Budget-friendly tiffins built for hostel students. Unlimited roti on monthly plans and a flexible skip-a-day policy during exams and holidays.",
    phone: "+91 88888 21470",
    todaysMenu: [
      { meal: "Lunch", time: "12:00 PM - 2:00 PM", items: ["Tur Dal", "Rice", "4 Chapati", "Aloo Matar", "Pickle"], price: 75 },
      { meal: "Dinner", time: "8:00 PM - 10:00 PM", items: ["Mix Dal", "Rice", "4 Chapati", "Cabbage Sabzi", "Papad"], price: 70 },
    ],
    weeklyMenu: [
      { day: "Monday", lunch: "Dal Rice, Aloo Matar", dinner: "Mix Dal, Cabbage" },
      { day: "Tuesday", lunch: "Chole, Rice", dinner: "Dal Fry, Bhindi" },
      { day: "Wednesday", lunch: "Egg Curry, Rice", dinner: "Veg Pulao" },
      { day: "Thursday", lunch: "Kadhi Khichdi", dinner: "Dal, Aloo Bhaji" },
      { day: "Friday", lunch: "Rajma Chawal", dinner: "Soya Chunk Curry" },
      { day: "Saturday", lunch: "Veg Biryani", dinner: "Dal Rice, Sabzi" },
      { day: "Sunday", lunch: "Chicken Masala Thali", dinner: "Khichdi, Papad" },
    ],
    plans: [
      { id: "daily", name: "Daily Plan", period: "per day", price: 75, meals: "Lunch or Dinner" },
      { id: "weekly", name: "Weekly Plan", period: "per week", price: 460, meals: "Lunch only", save: "Save ₹65" },
      { id: "monthly", name: "Monthly Plan", period: "per month", price: 1750, meals: "Lunch + Dinner", save: "Save ₹500" },
    ],
    reviewList: [
      { name: "Sahil Mane", rating: 5, date: "14 Sep 2026", text: "Cheapest proper meal near college and the quantity is huge." },
      { name: "Fatima Sheikh", rating: 4, date: "30 Aug 2026", text: "Dinner sometimes arrives late but food is always hot." },
    ],
  },
  {
    id: "homemeal-kitchen",
    name: "HomeMeal Kitchen",
    owner: "Lakshmi Venkatesh",
    image: provider5,
    city: "Pune",
    area: "Hinjewadi",
    cuisine: "South Indian",
    veg: "Pure Veg",
    rating: 4.5,
    reviews: 341,
    verified: true,
    startingPrice: 105,
    deliveryTime: "30-40 min",
    distanceKm: 4.2,
    availability: "Available",
    deliveryAreas: ["Hinjewadi Phase 1", "Hinjewadi Phase 2", "Wakad", "Marunji"],
    mealTypes: ["Breakfast", "Lunch", "Dinner"],
    about:
      "Authentic Tamil home cooking with freshly ground masalas, idli batter fermented overnight and filter coffee available as an add-on.",
    phone: "+91 97655 30219",
    todaysMenu: [
      { meal: "Breakfast", time: "7:00 AM - 9:30 AM", items: ["3 Idli", "Medu Vada", "Sambar", "Coconut Chutney"], price: 90 },
      {
        meal: "Lunch",
        time: "12:30 PM - 2:00 PM",
        items: ["Sambar", "Rasam", "Rice", "Beans Poriyal", "Curd", "Appalam"],
        price: 115,
      },
      { meal: "Dinner", time: "7:30 PM - 9:00 PM", items: ["3 Dosa", "Sambar", "Tomato Chutney", "Filter Coffee"], price: 105 },
    ],
    weeklyMenu: [
      { day: "Monday", lunch: "Sambar Rice, Poriyal", dinner: "Dosa, Chutney" },
      { day: "Tuesday", lunch: "Vathal Kuzhambu, Rice", dinner: "Idli, Sambar" },
      { day: "Wednesday", lunch: "Curd Rice, Pickle", dinner: "Uthappam, Chutney" },
      { day: "Thursday", lunch: "Lemon Rice, Kootu", dinner: "Rava Dosa" },
      { day: "Friday", lunch: "Bisi Bele Bath", dinner: "Pongal, Vada" },
      { day: "Saturday", lunch: "Coconut Rice, Poriyal", dinner: "Set Dosa, Sagu" },
      { day: "Sunday", lunch: "Special Meals with Payasam", dinner: "Upma, Chutney" },
    ],
    plans: [
      { id: "daily", name: "Daily Plan", period: "per day", price: 115, meals: "Lunch or Dinner" },
      { id: "weekly", name: "Weekly Plan", period: "per week", price: 700, meals: "Lunch only", save: "Save ₹105" },
      { id: "monthly", name: "Monthly Plan", period: "per month", price: 2750, meals: "Lunch + Dinner", save: "Save ₹650" },
    ],
    reviewList: [
      { name: "Deepak Subramanian", rating: 5, date: "11 Sep 2026", text: "Finally proper sambar in Hinjewadi. Filter coffee is a bonus." },
      { name: "Nisha Menon", rating: 4, date: "25 Aug 2026", text: "Very consistent. Wish they delivered to Tathawade too." },
    ],
  },
];

export type LaundryProvider = {
  id: string;
  name: string;
  area: string;
  rating: number;
  reviews: number;
  verified: boolean;
  distanceKm: number;
  pickup: string;
  delivery: string;
  startingPrice: number;
  about: string;
  services: { name: string; price: string; note: string }[];
};

export const laundryProviders: LaundryProvider[] = [
  {
    id: "sparkle-laundry",
    name: "Sparkle Laundry Co.",
    area: "Kothrud, Pune",
    rating: 4.7,
    reviews: 236,
    verified: true,
    distanceKm: 1.2,
    pickup: "Same day, 2 slots",
    delivery: "48 hours",
    startingPrice: 55,
    about: "Machine wash with hypoallergenic detergent, separate load per household and free pickup above ₹299.",
    services: [
      { name: "Wash & Fold", price: "₹55/kg", note: "Min 3 kg" },
      { name: "Wash & Iron", price: "₹75/kg", note: "Min 3 kg" },
      { name: "Ironing", price: "₹8/piece", note: "Steam press" },
      { name: "Dry Cleaning", price: "₹120/piece", note: "Shirts & trousers" },
      { name: "Blanket Cleaning", price: "₹299/piece", note: "Double bed" },
    ],
  },
  {
    id: "freshfold-express",
    name: "FreshFold Express",
    area: "Viman Nagar, Pune",
    rating: 4.5,
    reviews: 174,
    verified: true,
    distanceKm: 2.6,
    pickup: "Within 90 minutes",
    delivery: "24 hours",
    startingPrice: 65,
    about: "Express turnaround for working professionals with live order updates and doorstep QC check.",
    services: [
      { name: "Wash & Fold", price: "₹65/kg", note: "24 hr delivery" },
      { name: "Wash & Iron", price: "₹85/kg", note: "24 hr delivery" },
      { name: "Ironing", price: "₹10/piece", note: "Same day" },
      { name: "Dry Cleaning", price: "₹140/piece", note: "Premium fabrics" },
      { name: "Shoe Cleaning", price: "₹249/pair", note: "Deep clean" },
    ],
  },
  {
    id: "royal-drycleaners",
    name: "Royal Dry Cleaners",
    area: "Baner, Pune",
    rating: 4.8,
    reviews: 312,
    verified: true,
    distanceKm: 3.1,
    pickup: "Next day",
    delivery: "72 hours",
    startingPrice: 90,
    about: "Specialists in sarees, lehengas, suits and delicate fabrics with hand finishing and garment covers.",
    services: [
      { name: "Premium Cleaning", price: "₹350/piece", note: "Silk saree, lehenga" },
      { name: "Dry Cleaning", price: "₹160/piece", note: "Suit, blazer" },
      { name: "Wash & Fold", price: "₹90/kg", note: "Premium detergent" },
      { name: "Curtain Cleaning", price: "₹220/piece", note: "Per panel" },
      { name: "Ironing", price: "₹12/piece", note: "Hand finished" },
    ],
  },
  {
    id: "quickwash-hub",
    name: "QuickWash Hub",
    area: "Katraj, Pune",
    rating: 4.2,
    reviews: 148,
    verified: false,
    distanceKm: 0.8,
    pickup: "Twice daily",
    delivery: "48 hours",
    startingPrice: 45,
    about: "Student-friendly rates with hostel bulk pickup every Monday and Thursday evening.",
    services: [
      { name: "Wash & Fold", price: "₹45/kg", note: "Hostel special" },
      { name: "Wash & Iron", price: "₹60/kg", note: "Min 4 kg" },
      { name: "Ironing", price: "₹7/piece", note: "Bulk discount" },
      { name: "Blanket Cleaning", price: "₹249/piece", note: "Single bed" },
    ],
  },
];

export const orders = [
  {
    id: "TC-TIF-48219",
    type: "Tiffin",
    provider: "Maa Kitchen",
    detail: "Monthly Plan · Lunch + Dinner",
    date: "16 Sep 2026",
    amount: 2600,
    status: "Out for Delivery",
  },
  {
    id: "TC-TIF-48102",
    type: "Tiffin",
    provider: "HomeMeal Kitchen",
    detail: "Daily Plan · Breakfast",
    date: "15 Sep 2026",
    amount: 90,
    status: "Delivered",
  },
  {
    id: "TC-LAU-20874",
    type: "Laundry",
    provider: "Sparkle Laundry Co.",
    detail: "Wash & Iron · 5 kg",
    date: "14 Sep 2026",
    amount: 375,
    status: "Washing",
  },
  {
    id: "TC-LAU-20690",
    type: "Laundry",
    provider: "Royal Dry Cleaners",
    detail: "Dry Cleaning · 3 pieces",
    date: "09 Sep 2026",
    amount: 480,
    status: "Delivered",
  },
];

export const tiffinStatusFlow = ["Order Placed", "Food Preparing", "Out for Delivery", "Delivered"];
export const laundryStatusFlow = [
  "Pickup Scheduled",
  "Picked Up",
  "Washing",
  "Quality Check",
  "Ready for Delivery",
  "Out for Delivery",
  "Delivered",
];

export const coupons = [
  { code: "FIRST50", label: "₹50 off your first order", detail: "New customers only" },
  { code: "MONTHLY10", label: "10% off monthly subscriptions", detail: "Max discount ₹300" },
  { code: "FESTIVE20", label: "20% off festival special thali", detail: "Valid till 30 Sep" },
  { code: "REFER100", label: "₹100 wallet credit per referral", detail: "Friend must order once" },
];

export const rupees = (value: number) => `₹${value.toLocaleString("en-IN")}`;

export const getProvider = (id: string) => tiffinProviders.find((p) => p.id === id);
export const getLaundry = (id: string) => laundryProviders.find((p) => p.id === id);
