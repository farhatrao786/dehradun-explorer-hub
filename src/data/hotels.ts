import h1 from "@/assets/hotel-1.jpg";
import h2 from "@/assets/hotel-2.jpg";
import h3 from "@/assets/hotel-3.jpg";
import h4 from "@/assets/hotel-4.jpg";
import h5 from "@/assets/hotel-5.jpg";
import h6 from "@/assets/hotel-6.jpg";
import h7 from "@/assets/hotel-7.jpg";
import h8 from "@/assets/hotel-8.jpg";
import h9 from "@/assets/hotel-9.jpg";
import h10 from "@/assets/hotel-10.jpg";
import h11 from "@/assets/hotel-11.jpg";
import h12 from "@/assets/hotel-12.jpg";

export const hotelImages = [h1, h2, h3, h4, h5, h6, h7, h8, h9, h10, h11, h12];

// Tier-wise image pools so a 5-star resort never shows a budget room photo
const imagePool: Record<number, string[]> = {
  5: [h5, h6, h10, h12],
  4: [h1, h9, h11, h12, h6],
  3: [h7, h2, h3, h10],
  2: [h8, h4, h7],
};


export type Hotel = {
  slug: string;
  name: string;
  img: string;
  gallery: string[];
  stars: number;
  price: string;
  area: string;
  address: string;
  amenities: string[];
  desc: string;
};

type Seed = [name: string, stars: number, price: string, area: string, desc: string];

const A = {
  luxury: ["Free Wi-Fi", "Swimming pool", "Spa & wellness", "Multi-cuisine restaurant", "Bar & lounge", "Fitness centre", "Banquet halls", "Free parking", "24x7 room service", "Airport shuttle"],
  premium: ["Free Wi-Fi", "Restaurant", "Fitness centre", "Conference room", "Free parking", "24x7 front desk", "Laundry service", "Room service"],
  mid: ["Free Wi-Fi", "In-house restaurant", "Free parking", "24x7 front desk", "Power backup", "Laundry service", "Air conditioning"],
  budget: ["Free Wi-Fi", "Air conditioning", "Power backup", "24x7 front desk", "Parking", "Daily housekeeping"],
};

function tier(stars: number) {
  if (stars >= 5) return A.luxury;
  if (stars >= 4) return A.premium;
  if (stars >= 3) return A.mid;
  return A.budget;
}

const seeds: Seed[] = [
  ["Hyatt Regency Dehradun Resort & Spa", 5, "₹9,000 – ₹18,000", "Rajpur Road", "A hillside luxury resort near Malsi forest with an award-winning spa, large pool and expansive banquet lawns overlooking the Shivaliks."],
  ["JW Marriott Hotel Dehradun", 5, "₹10,000 – ₹20,000", "Rajpur Road", "The city's flagship five-star address, with panoramic valley views, fine-dining restaurants and one of the largest ballrooms in Uttarakhand."],
  ["Radisson Hotel Dehradun Rajpur Road", 5, "₹7,500 – ₹14,000", "Rajpur Road", "Contemporary five-star hotel with a rooftop pool, all-day diner and easy access to the city's best cafes and malls."],
  ["Four Points by Sheraton Dehradun", 4, "₹6,000 – ₹11,000", "Chakrata Road", "Reliable international-brand comfort in the city centre, with a rooftop restaurant, pool and business facilities."],
  ["Lemon Tree Hotel Dehradun", 4, "₹4,000 – ₹8,000", "Rajpur Road", "Bright, cheerful interiors and consistent service, well placed for both leisure and business travellers."],
  ["Fairfield by Marriott Dehradun", 4, "₹5,500 – ₹10,000", "Rajpur Road", "Modern rooms, a strong breakfast spread and dependable Marriott service close to the Mussoorie highway."],
  ["Ramada by Wyndham Dehradun", 4, "₹4,500 – ₹9,000", "Rajpur Road", "Spacious rooms and a well-regarded multi-cuisine restaurant, popular for weddings and family stays."],
  ["Hotel Madhuban", 4, "₹3,500 – ₹7,000", "Rajpur Road", "A Dehradun institution, known for old-school hospitality, a leafy courtyard and its long-running restaurant."],
  ["Seyfert Sarovar Portico Dehradun", 4, "₹4,000 – ₹7,500", "Rajpur Road", "Comfortable business hotel with a rooftop restaurant and quick access to the Clock Tower area."],
  ["Regenta Central Sundowner Dehradun", 4, "₹4,000 – ₹7,000", "Rajpur Road", "Smart mid-scale hotel with a lively cafe and easy connectivity to the ISBT and railway station."],
  ["Hotel Pacific Dehradun", 3, "₹3,000 – ₹5,500", "Rajpur Road", "Well-maintained rooms and a popular in-house restaurant, a short walk from shopping streets."],
  ["Red Fox Hotel Dehradun", 3, "₹2,800 – ₹5,000", "Rajpur Road", "Smart-basics hotel from the Lemon Tree group — compact, clean and value-driven."],
  ["Hotel President Dehradun", 3, "₹2,500 – ₹4,500", "Astley Hall", "Central location near Astley Hall with dependable service and easy access to nightlife."],
  ["Hotel Aketa", 3, "₹2,800 – ₹5,000", "Rajpur Road", "Garden-facing rooms and a well-known banquet lawn, favoured for family functions."],
  ["Country Inn & Suites by Radisson Mussoorie Road", 4, "₹5,000 – ₹9,000", "Mussoorie Road", "Hillside property on the way to Mussoorie with valley views and a quiet, resort-like feel."],
  ["Hotel Great Value", 3, "₹3,000 – ₹5,500", "Rajpur Road", "Long-standing business hotel with conference facilities and a central Rajpur Road address."],
  ["Hotel Doon Castle", 3, "₹2,200 – ₹4,000", "Karanpur", "Budget-friendly comfort close to the railway station and Paltan Bazaar."],
  ["The Solitaire Hotel", 3, "₹2,500 – ₹4,500", "Ballupur", "Neat mid-range rooms with a rooftop dining area, handy for FRI visits."],
  ["Hotel Saffron Leaf", 3, "₹2,000 – ₹3,800", "Clement Town", "Simple, tidy rooms near Mindrolling Monastery, popular with pilgrims."],
  ["Hotel Shiva Continental", 3, "₹2,500 – ₹4,500", "Saharanpur Road", "Convenient stopover hotel with parking and a well-rated restaurant."],
  ["Hotel Nidhi Regency", 3, "₹2,200 – ₹4,000", "Prem Nagar", "Quiet residential-area hotel with spacious rooms and friendly staff."],
  ["Hotel Amrit Regency", 3, "₹2,000 – ₹3,600", "Chakrata Road", "Value stay with easy access to markets and the ISBT."],
  ["Hotel Ajanta Continental", 3, "₹2,300 – ₹4,200", "Rajpur Road", "Classic city hotel with roomy interiors and a popular banquet space."],
  ["Hotel Relax Inn", 2, "₹1,500 – ₹2,800", "Karanpur", "Clean budget rooms close to the railway station, good for short stays."],
  ["Hotel Ganga Heights", 2, "₹1,400 – ₹2,600", "Haridwar Road", "Affordable rooms on the Haridwar highway with parking and basic dining."],
  ["Hotel Deep Ganga", 2, "₹1,300 – ₹2,500", "Saharanpur Chowk", "Budget option with quick access to the bus terminal."],
  ["Hotel Meedo Grand", 3, "₹2,400 – ₹4,200", "Rajpur Road", "Central hotel with a rooftop restaurant and dependable service."],
  ["Hotel Drona (GMVN)", 2, "₹1,600 – ₹3,000", "Near ISBT", "State tourism-run property, reliable and well located for onward travel."],
  ["Hotel Doon Empire", 2, "₹1,600 – ₹2,900", "Chakrata Road", "Simple rooms, in-house dining and easy market access."],
  ["Hotel Vishnu Palace", 3, "₹2,000 – ₹3,600", "Rajpur Road", "Comfortable mid-range rooms with a small garden seating area."],
  ["Hotel White House", 3, "₹2,200 – ₹4,000", "Race Course", "Quiet neighbourhood hotel near Race Course market."],
  ["Hotel Him Palace", 2, "₹1,500 – ₹2,700", "Patel Nagar", "Practical budget hotel close to the ISBT and highway."],
  ["Hotel Sun Rise Inn", 2, "₹1,400 – ₹2,600", "Niranjanpur", "Basic rooms with parking, suited to road travellers."],
  ["Rio Resort Dehradun", 4, "₹4,000 – ₹8,000", "Sahastradhara Road", "Green resort near Sahastradhara with cottages, a pool and open-air dining."],
  ["Hotel Nirvana", 3, "₹2,400 – ₹4,300", "Sahastradhara Road", "Peaceful stay on the way to the springs, with valley-facing balconies."],
  ["Sarovar Premiere Dehradun", 4, "₹4,500 – ₹8,500", "Sahastradhara Road", "Premium rooms and a well-appointed spa in a calmer part of the city."],
  ["Hotel Mapple Emerald Resort", 4, "₹4,000 – ₹8,000", "Rajpur", "Forest-edge resort with cottages, lawns and a pool, popular for destination weddings."],
  ["Sun-n-Snow Inn", 3, "₹2,800 – ₹5,000", "Rajpur Road", "Cosy hillside inn with a homely restaurant and mountain views."],
  ["Hotel Doon International", 3, "₹2,500 – ₹4,500", "Chakrata Road", "Established hotel with banquet facilities and a central location."],
  ["Hotel Kanishka Grand", 3, "₹2,200 – ₹4,000", "Rajpur Road", "Neat rooms, good breakfast and helpful front desk staff."],
  ["Hotel Cross Roads", 3, "₹2,100 – ₹3,900", "Ballupur Chowk", "Convenient stay near the Ballupur crossing for FRI and Premnagar."],
  ["Treebo Trend Mount View", 3, "₹1,900 – ₹3,500", "Rajpur Road", "Branded budget stay with consistent housekeeping and Wi-Fi."],
  ["FabHotel Prime Doon Grand", 3, "₹1,800 – ₹3,300", "Karanpur", "Value-focused chain hotel near the railway station."],
  ["OYO Townhouse Rajpur Road", 3, "₹1,700 – ₹3,200", "Rajpur Road", "Modern budget rooms with in-app check-in and central access."],
  ["Hotel Sarthak Regency", 2, "₹1,600 – ₹2,900", "Patel Nagar", "Straightforward, clean rooms suited to business travellers."],
  ["Hotel Krish Residency", 2, "₹1,500 – ₹2,800", "Clement Town", "Quiet budget stay near the monastery and Clement Town market."],
  ["Hotel Grand Legacy", 3, "₹2,300 – ₹4,200", "Saharanpur Road", "Comfortable rooms with parking and a rooftop restaurant."],
  ["The Fern Denzong Dehradun", 4, "₹4,200 – ₹8,000", "Mussoorie Road", "Eco-conscious hotel with hill views, a good restaurant and quiet surroundings."],
  ["Hotel Silver Sand", 2, "₹1,500 – ₹2,700", "Prem Nagar", "Affordable rooms near Prem Nagar market and the university."],
  ["Hotel Green Valley", 3, "₹2,000 – ₹3,700", "Maldevta Road", "Riverside location near Maldevta, good for weekend getaways."],
  ["Hotel Royal Orchid Doon", 3, "₹2,600 – ₹4,700", "Race Course", "Comfortable rooms with a garden restaurant, close to city offices."],
  ["Hotel Snow Crest Inn", 3, "₹2,400 – ₹4,300", "Rajpur Road", "Cosy inn on the Mussoorie route with mountain-facing rooms."],
];

const slugify = (s: string) =>
  s.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

export const hotels: Hotel[] = seeds.map(([name, stars, price, area, desc], i) => {
  const pool = imagePool[stars] ?? imagePool[3];
  const pick = (n: number) => pool[(i + n) % pool.length];
  return {
    slug: slugify(name),
    name,
    stars,
    price,
    area,
    desc,
    img: pick(0),
    gallery: [pick(0), pick(1), pick(2)],
    address: `${name}, ${area}, Dehradun, Uttarakhand`,
    amenities: tier(stars),
  };
});


export const getHotel = (slug: string) => hotels.find((h) => h.slug === slug);
