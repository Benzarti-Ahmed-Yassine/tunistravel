export interface Governorate {
  id: string;
  name: string;
  nameArabic: string;
  capital: string;
  description: string;
  image: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  attractions: Attraction[];
  cuisine: CuisineItem[];
  culture: CultureTip[];
  transportation: TransportInfo[];
}

export interface Attraction {
  id: string;
  name: string;
  description: string;
  image: string;
  type: string;
  rating: number;
  duration: string;
  coordinates: {
    lat: number;
    lng: number;
  };
}

export interface CuisineItem {
  name: string;
  description: string;
  isSpecialty?: boolean;
}

export interface CultureTip {
  tip: string;
  info: string;
}

export interface TransportInfo {
  title: string;
  info: string;
}

export const governorates: Governorate[] = [
  {
    id: 'tunis',
    name: 'Tunis',
    nameArabic: 'تونس',
    capital: 'Tunis',
    description: 'The capital and largest city of Tunisia, rich in history and culture',
    image: 'https://images.pexels.com/photos/9552935/pexels-photo-9552935.jpeg?auto=compress&cs=tinysrgb&w=800',
    coordinates: { lat: 36.8065, lng: 10.1815 },
    attractions: [
      {
        id: 'medina-tunis',
        name: 'Tunis Medina',
        description: 'UNESCO World Heritage old city with traditional souks',
        image: 'https://images.pexels.com/photos/9552935/pexels-photo-9552935.jpeg?auto=compress&cs=tinysrgb&w=800',
        type: 'Historic District',
        rating: 4.7,
        duration: '4-5 hours',
        coordinates: { lat: 36.7982, lng: 10.1713 }
      },
      {
        id: 'bardo-museum',
        name: 'Bardo Museum',
        description: 'World-renowned museum with Roman mosaics',
        image: 'https://images.pexels.com/photos/6185575/pexels-photo-6185575.jpeg?auto=compress&cs=tinysrgb&w=800',
        type: 'Museum',
        rating: 4.5,
        duration: '2-3 hours',
        coordinates: { lat: 36.8105, lng: 10.1347 }
      }
    ],
    cuisine: [
      { name: 'Couscous Tunisien', description: 'Traditional Friday couscous with lamb and vegetables' },
      { name: 'Brik à l\'oeuf', description: 'Crispy pastry with egg and tuna', isSpecialty: true },
      { name: 'Harissa', description: 'Spicy chili paste - Tunisian staple' }
    ],
    culture: [
      { tip: 'Friday Prayer', info: 'Many businesses close during Friday prayers (12-2 PM)' },
      { tip: 'Medina Etiquette', info: 'Dress modestly when visiting the old city' }
    ],
    transportation: [
      { title: 'Metro & Tram', info: 'Modern light rail system. Tickets: 0.5 TND' },
      { title: 'Taxis', info: 'Yellow taxis. Always negotiate fare beforehand' }
    ]
  },
  {
    id: 'ariana',
    name: 'Ariana',
    nameArabic: 'أريانة',
    capital: 'Ariana',
    description: 'Northern governorate known for Carthage and Sidi Bou Said',
    image: 'https://images.pexels.com/photos/2549018/pexels-photo-2549018.jpeg?auto=compress&cs=tinysrgb&w=800',
    coordinates: { lat: 36.8625, lng: 10.1956 },
    attractions: [
      {
        id: 'sidi-bou-said',
        name: 'Sidi Bou Said',
        description: 'Picturesque blue and white village overlooking the Mediterranean',
        image: 'https://images.pexels.com/photos/2549018/pexels-photo-2549018.jpeg?auto=compress&cs=tinysrgb&w=800',
        type: 'Historic Village',
        rating: 4.8,
        duration: '2-3 hours',
        coordinates: { lat: 36.8697, lng: 10.3472 }
      },
      {
        id: 'carthage',
        name: 'Carthage',
        description: 'Ancient ruins of the legendary Carthaginian empire',
        image: 'https://images.pexels.com/photos/17829148/pexels-photo-17829148.jpeg?auto=compress&cs=tinysrgb&w=800',
        type: 'Archaeological Site',
        rating: 4.6,
        duration: '3-4 hours',
        coordinates: { lat: 36.8531, lng: 10.3294 }
      },
      {
        id: 'la-marsa',
        name: 'La Marsa Beach',
        description: 'Beautiful Mediterranean beach with cafes',
        image: 'https://images.pexels.com/photos/1032650/pexels-photo-1032650.jpeg?auto=compress&cs=tinysrgb&w=800',
        type: 'Beach',
        rating: 4.3,
        duration: '2-4 hours',
        coordinates: { lat: 36.8778, lng: 10.3256 }
      }
    ],
    cuisine: [
      { name: 'Poisson Grillé', description: 'Fresh grilled fish from the Mediterranean' },
      { name: 'Salade Mechouia', description: 'Grilled vegetable salad with harissa' },
      { name: 'Thé à la Menthe', description: 'Traditional mint tea served in cafes' }
    ],
    culture: [
      { tip: 'Beach Etiquette', info: 'Swimwear is acceptable at beaches, modest dress elsewhere' },
      { tip: 'Café Culture', info: 'Enjoy long conversations over mint tea in seaside cafes' }
    ],
    transportation: [
      { title: 'TGM Train', info: 'Connects Tunis to La Marsa via Carthage and Sidi Bou Said' },
      { title: 'Louages', info: 'Shared taxis from Tunis to various destinations' }
    ]
  },
  {
    id: 'ben-arous',
    name: 'Ben Arous',
    nameArabic: 'بن عروس',
    capital: 'Ben Arous',
    description: 'Industrial governorate south of Tunis with traditional crafts',
    image: 'https://images.pexels.com/photos/6185575/pexels-photo-6185575.jpeg?auto=compress&cs=tinysrgb&w=800',
    coordinates: { lat: 36.7469, lng: 10.2281 },
    attractions: [
      {
        id: 'hammam-lif',
        name: 'Hammam Lif',
        description: 'Historic thermal spa town with beautiful architecture',
        image: 'https://images.pexels.com/photos/6185575/pexels-photo-6185575.jpeg?auto=compress&cs=tinysrgb&w=800',
        type: 'Spa Town',
        rating: 4.2,
        duration: '2-3 hours',
        coordinates: { lat: 36.7281, lng: 10.3444 }
      }
    ],
    cuisine: [
      { name: 'Makroud', description: 'Sweet semolina pastry with dates', isSpecialty: true },
      { name: 'Chorba', description: 'Traditional soup with lamb and vegetables' }
    ],
    culture: [
      { tip: 'Craft Workshops', info: 'Visit traditional pottery and textile workshops' },
      { tip: 'Thermal Baths', info: 'Experience traditional hammam culture' }
    ],
    transportation: [
      { title: 'Regional Buses', info: 'Regular bus service to Tunis and surrounding areas' },
      { title: 'Shared Taxis', info: 'Affordable transport between towns' }
    ]
  },
  {
    id: 'manouba',
    name: 'Manouba',
    nameArabic: 'منوبة',
    capital: 'Manouba',
    description: 'Agricultural region known for olive groves and traditional villages',
    image: 'https://images.pexels.com/photos/6185575/pexels-photo-6185575.jpeg?auto=compress&cs=tinysrgb&w=800',
    coordinates: { lat: 36.8103, lng: 10.0964 },
    attractions: [
      {
        id: 'dougga',
        name: 'Dougga',
        description: 'Best-preserved Roman town in North Africa',
        image: 'https://images.pexels.com/photos/17829148/pexels-photo-17829148.jpeg?auto=compress&cs=tinysrgb&w=800',
        type: 'Archaeological Site',
        rating: 4.7,
        duration: '3-4 hours',
        coordinates: { lat: 36.4225, lng: 9.2189 }
      }
    ],
    cuisine: [
      { name: 'Huile d\'Olive', description: 'Premium olive oil from local groves', isSpecialty: true },
      { name: 'Fromage de Chèvre', description: 'Traditional goat cheese' }
    ],
    culture: [
      { tip: 'Olive Harvest', info: 'Visit during harvest season (October-December)' },
      { tip: 'Rural Hospitality', info: 'Experience authentic Tunisian village life' }
    ],
    transportation: [
      { title: 'Rural Buses', info: 'Limited but regular service to main towns' },
      { title: 'Car Rental', info: 'Recommended for exploring rural areas' }
    ]
  },
  {
    id: 'nabeul',
    name: 'Nabeul',
    nameArabic: 'نابل',
    capital: 'Nabeul',
    description: 'Coastal governorate famous for pottery, beaches, and Cap Bon peninsula',
    image: 'https://images.pexels.com/photos/1032650/pexels-photo-1032650.jpeg?auto=compress&cs=tinysrgb&w=800',
    coordinates: { lat: 36.4560, lng: 10.7376 },
    attractions: [
      {
        id: 'hammamet',
        name: 'Hammamet',
        description: 'Popular beach resort with historic medina',
        image: 'https://images.pexels.com/photos/1032650/pexels-photo-1032650.jpeg?auto=compress&cs=tinysrgb&w=800',
        type: 'Beach Resort',
        rating: 4.5,
        duration: 'Full day',
        coordinates: { lat: 36.4000, lng: 10.6167 }
      },
      {
        id: 'nabeul-pottery',
        name: 'Nabeul Pottery Workshops',
        description: 'Traditional ceramic workshops and markets',
        image: 'https://images.pexels.com/photos/6185575/pexels-photo-6185575.jpeg?auto=compress&cs=tinysrgb&w=800',
        type: 'Cultural Site',
        rating: 4.3,
        duration: '2-3 hours',
        coordinates: { lat: 36.4560, lng: 10.7376 }
      }
    ],
    cuisine: [
      { name: 'Poisson au Four', description: 'Baked fish with Mediterranean herbs' },
      { name: 'Salade de Poulpe', description: 'Octopus salad with olive oil and lemon' },
      { name: 'Citrons de Cap Bon', description: 'Famous lemons from the region', isSpecialty: true }
    ],
    culture: [
      { tip: 'Pottery Making', info: 'Watch artisans create traditional ceramics' },
      { tip: 'Beach Culture', info: 'Family-friendly beaches with local seafood restaurants' }
    ],
    transportation: [
      { title: 'Tourist Buses', info: 'Regular service from Tunis to Hammamet' },
      { title: 'Louages', info: 'Shared taxis connecting coastal towns' }
    ]
  },
  {
    id: 'zaghouan',
    name: 'Zaghouan',
    nameArabic: 'زغوان',
    capital: 'Zaghouan',
    description: 'Mountainous region known for Roman aqueducts and natural springs',
    image: 'https://images.pexels.com/photos/17829148/pexels-photo-17829148.jpeg?auto=compress&cs=tinysrgb&w=800',
    coordinates: { lat: 36.4028, lng: 10.1425 },
    attractions: [
      {
        id: 'zaghouan-aqueduct',
        name: 'Roman Aqueduct of Zaghouan',
        description: 'Ancient Roman water temple and aqueduct ruins',
        image: 'https://images.pexels.com/photos/17829148/pexels-photo-17829148.jpeg?auto=compress&cs=tinysrgb&w=800',
        type: 'Archaeological Site',
        rating: 4.4,
        duration: '2-3 hours',
        coordinates: { lat: 36.4028, lng: 10.1425 }
      }
    ],
    cuisine: [
      { name: 'Eau de Source', description: 'Natural spring water from Zaghouan mountains', isSpecialty: true },
      { name: 'Miel de Montagne', description: 'Mountain honey from local beekeepers' }
    ],
    culture: [
      { tip: 'Mountain Hiking', info: 'Explore scenic mountain trails and Roman ruins' },
      { tip: 'Spring Water', info: 'Taste the famous natural spring water' }
    ],
    transportation: [
      { title: 'Mountain Roads', info: 'Winding roads with scenic views' },
      { title: 'Local Buses', info: 'Limited service, car rental recommended' }
    ]
  },
  {
    id: 'bizerte',
    name: 'Bizerte',
    nameArabic: 'بنزرت',
    capital: 'Bizerte',
    description: 'Northern coastal city with beautiful beaches and historic port',
    image: 'https://images.pexels.com/photos/1032650/pexels-photo-1032650.jpeg?auto=compress&cs=tinysrgb&w=800',
    coordinates: { lat: 37.2744, lng: 9.8739 },
    attractions: [
      {
        id: 'bizerte-old-port',
        name: 'Bizerte Old Port',
        description: 'Historic fishing port with traditional boats',
        image: 'https://images.pexels.com/photos/1032650/pexels-photo-1032650.jpeg?auto=compress&cs=tinysrgb&w=800',
        type: 'Historic Port',
        rating: 4.4,
        duration: '2-3 hours',
        coordinates: { lat: 37.2744, lng: 9.8739 }
      }
    ],
    cuisine: [
      { name: 'Poisson de Bizerte', description: 'Fresh fish from the Mediterranean', isSpecialty: true },
      { name: 'Couscous au Poisson', description: 'Fish couscous specialty of the region' }
    ],
    culture: [
      { tip: 'Fishing Culture', info: 'Watch fishermen bring in daily catch at dawn' },
      { tip: 'Beach Life', info: 'Enjoy pristine beaches less crowded than southern resorts' }
    ],
    transportation: [
      { title: 'Coastal Roads', info: 'Scenic drive along the Mediterranean coast' },
      { title: 'Regional Buses', info: 'Regular service from Tunis' }
    ]
  },
  {
    id: 'beja',
    name: 'Béja',
    nameArabic: 'باجة',
    capital: 'Béja',
    description: 'Agricultural heartland known for wheat fields and Roman ruins',
    image: 'https://images.pexels.com/photos/6185575/pexels-photo-6185575.jpeg?auto=compress&cs=tinysrgb&w=800',
    coordinates: { lat: 36.7256, lng: 9.1817 },
    attractions: [
      {
        id: 'beja-medina',
        name: 'Béja Medina',
        description: 'Traditional old town with Ottoman architecture',
        image: 'https://images.pexels.com/photos/9552935/pexels-photo-9552935.jpeg?auto=compress&cs=tinysrgb&w=800',
        type: 'Historic District',
        rating: 4.1,
        duration: '2-3 hours',
        coordinates: { lat: 36.7256, lng: 9.1817 }
      }
    ],
    cuisine: [
      { name: 'Blé de Béja', description: 'High-quality wheat products', isSpecialty: true },
      { name: 'Fromage Fermier', description: 'Traditional farmhouse cheese' }
    ],
    culture: [
      { tip: 'Agricultural Tours', info: 'Visit wheat farms and traditional mills' },
      { tip: 'Rural Markets', info: 'Experience authentic weekly markets' }
    ],
    transportation: [
      { title: 'Rural Transport', info: 'Limited public transport, car recommended' },
      { title: 'Farm Roads', info: 'Explore countryside on rural roads' }
    ]
  },
  {
    id: 'jendouba',
    name: 'Jendouba',
    nameArabic: 'جندوبة',
    capital: 'Jendouba',
    description: 'Northwestern region with forests, hot springs, and Berber heritage',
    image: 'https://images.pexels.com/photos/6185575/pexels-photo-6185575.jpeg?auto=compress&cs=tinysrgb&w=800',
    coordinates: { lat: 36.5011, lng: 8.7803 },
    attractions: [
      {
        id: 'ain-draham',
        name: 'Aïn Draham',
        description: 'Mountain resort town with cork oak forests',
        image: 'https://images.pexels.com/photos/6185575/pexels-photo-6185575.jpeg?auto=compress&cs=tinysrgb&w=800',
        type: 'Mountain Resort',
        rating: 4.3,
        duration: 'Full day',
        coordinates: { lat: 36.7833, lng: 8.6833 }
      }
    ],
    cuisine: [
      { name: 'Sanglier aux Champignons', description: 'Wild boar with forest mushrooms', isSpecialty: true },
      { name: 'Miel de Forêt', description: 'Forest honey from cork oak trees' }
    ],
    culture: [
      { tip: 'Forest Hiking', info: 'Explore cork oak forests and mountain trails' },
      { tip: 'Berber Heritage', info: 'Learn about indigenous Berber culture' }
    ],
    transportation: [
      { title: 'Mountain Roads', info: 'Winding mountain roads with scenic views' },
      { title: 'Limited Transport', info: 'Car rental highly recommended' }
    ]
  },
  {
    id: 'le-kef',
    name: 'Le Kef',
    nameArabic: 'الكاف',
    capital: 'Le Kef',
    description: 'Historic mountain city with Ottoman and Roman heritage',
    image: 'https://images.pexels.com/photos/9552935/pexels-photo-9552935.jpeg?auto=compress&cs=tinysrgb&w=800',
    coordinates: { lat: 36.1742, lng: 8.7050 },
    attractions: [
      {
        id: 'le-kef-kasbah',
        name: 'Le Kef Kasbah',
        description: 'Ottoman fortress with panoramic mountain views',
        image: 'https://images.pexels.com/photos/9552935/pexels-photo-9552935.jpeg?auto=compress&cs=tinysrgb&w=800',
        type: 'Historic Fortress',
        rating: 4.5,
        duration: '2-3 hours',
        coordinates: { lat: 36.1742, lng: 8.7050 }
      }
    ],
    cuisine: [
      { name: 'Couscous aux Légumes', description: 'Vegetable couscous with mountain herbs' },
      { name: 'Thé aux Herbes', description: 'Herbal tea from mountain plants', isSpecialty: true }
    ],
    culture: [
      { tip: 'Mountain Views', info: 'Enjoy panoramic views from the kasbah' },
      { tip: 'Ottoman Heritage', info: 'Explore well-preserved Ottoman architecture' }
    ],
    transportation: [
      { title: 'Mountain Transport', info: 'Regular bus service from Tunis' },
      { title: 'Local Taxis', info: 'Available for short distances within the city' }
    ]
  },
  {
    id: 'siliana',
    name: 'Siliana',
    nameArabic: 'سليانة',
    capital: 'Siliana',
    description: 'Central region known for agriculture and Roman archaeological sites',
    image: 'https://images.pexels.com/photos/17829148/pexels-photo-17829148.jpeg?auto=compress&cs=tinysrgb&w=800',
    coordinates: { lat: 36.0833, lng: 9.3667 },
    attractions: [
      {
        id: 'maktar',
        name: 'Maktar',
        description: 'Roman ruins with well-preserved mosaics',
        image: 'https://images.pexels.com/photos/17829148/pexels-photo-17829148.jpeg?auto=compress&cs=tinysrgb&w=800',
        type: 'Archaeological Site',
        rating: 4.2,
        duration: '2-3 hours',
        coordinates: { lat: 35.8583, lng: 9.2000 }
      }
    ],
    cuisine: [
      { name: 'Produits Fermiers', description: 'Fresh farm products and dairy', isSpecialty: true },
      { name: 'Couscous Traditionnel', description: 'Traditional couscous with local vegetables' }
    ],
    culture: [
      { tip: 'Archaeological Sites', info: 'Explore lesser-known but significant Roman ruins' },
      { tip: 'Farm Visits', info: 'Experience traditional agricultural practices' }
    ],
    transportation: [
      { title: 'Rural Roads', info: 'Good road connections to major sites' },
      { title: 'Local Buses', info: 'Regular service to main towns' }
    ]
  },
  {
    id: 'sousse',
    name: 'Sousse',
    nameArabic: 'سوسة',
    capital: 'Sousse',
    description: 'Major coastal city with UNESCO medina and beautiful beaches',
    image: 'https://images.pexels.com/photos/9552935/pexels-photo-9552935.jpeg?auto=compress&cs=tinysrgb&w=800',
    coordinates: { lat: 35.8256, lng: 10.6411 },
    attractions: [
      {
        id: 'sousse-medina',
        name: 'Sousse Medina',
        description: 'UNESCO World Heritage medina with ribat fortress',
        image: 'https://images.pexels.com/photos/9552935/pexels-photo-9552935.jpeg?auto=compress&cs=tinysrgb&w=800',
        type: 'Historic District',
        rating: 4.6,
        duration: '3-4 hours',
        coordinates: { lat: 35.8256, lng: 10.6411 }
      },
      {
        id: 'port-el-kantaoui',
        name: 'Port El Kantaoui',
        description: 'Modern marina with restaurants and water sports',
        image: 'https://images.pexels.com/photos/1032650/pexels-photo-1032650.jpeg?auto=compress&cs=tinysrgb&w=800',
        type: 'Marina',
        rating: 4.3,
        duration: '2-4 hours',
        coordinates: { lat: 35.8978, lng: 10.5956 }
      }
    ],
    cuisine: [
      { name: 'Poisson à la Sousse', description: 'Local fish preparation with spices', isSpecialty: true },
      { name: 'Makroud Sousse', description: 'Regional variation of the sweet pastry' },
      { name: 'Salade de Fruits de Mer', description: 'Fresh seafood salad' }
    ],
    culture: [
      { tip: 'Medina Shopping', info: 'Bargain for traditional crafts and souvenirs' },
      { tip: 'Beach Resorts', info: 'Mix of traditional culture and modern tourism' }
    ],
    transportation: [
      { title: 'Metro du Sahel', info: 'Light rail connecting Sousse to surrounding areas' },
      { title: 'Tourist Trains', info: 'Scenic train rides along the coast' }
    ]
  },
  {
    id: 'monastir',
    name: 'Monastir',
    nameArabic: 'المنستير',
    capital: 'Monastir',
    description: 'Historic coastal city with impressive ribat and mausoleum',
    image: 'https://images.pexels.com/photos/9552935/pexels-photo-9552935.jpeg?auto=compress&cs=tinysrgb&w=800',
    coordinates: { lat: 35.7643, lng: 10.8113 },
    attractions: [
      {
        id: 'monastir-ribat',
        name: 'Monastir Ribat',
        description: 'Ancient Islamic fortress overlooking the sea',
        image: 'https://images.pexels.com/photos/9552935/pexels-photo-9552935.jpeg?auto=compress&cs=tinysrgb&w=800',
        type: 'Historic Fortress',
        rating: 4.5,
        duration: '2-3 hours',
        coordinates: { lat: 35.7643, lng: 10.8113 }
      }
    ],
    cuisine: [
      { name: 'Couscous au Poisson', description: 'Fish couscous specialty of the coast' },
      { name: 'Pâtisseries Orientales', description: 'Traditional Middle Eastern sweets', isSpecialty: true }
    ],
    culture: [
      { tip: 'Islamic Heritage', info: 'Respect religious sites and dress modestly' },
      { tip: 'Coastal Walks', info: 'Enjoy evening strolls along the historic waterfront' }
    ],
    transportation: [
      { title: 'Airport Access', info: 'International airport with good connections' },
      { title: 'Coastal Roads', info: 'Easy access to other coastal cities' }
    ]
  },
  {
    id: 'mahdia',
    name: 'Mahdia',
    nameArabic: 'المهدية',
    capital: 'Mahdia',
    description: 'Ancient Fatimid capital with pristine beaches and fishing heritage',
    image: 'https://images.pexels.com/photos/1032650/pexels-photo-1032650.jpeg?auto=compress&cs=tinysrgb&w=800',
    coordinates: { lat: 35.5047, lng: 11.0622 },
    attractions: [
      {
        id: 'mahdia-medina',
        name: 'Mahdia Medina',
        description: 'Historic medina on a peninsula with sea views',
        image: 'https://images.pexels.com/photos/9552935/pexels-photo-9552935.jpeg?auto=compress&cs=tinysrgb&w=800',
        type: 'Historic District',
        rating: 4.4,
        duration: '2-3 hours',
        coordinates: { lat: 35.5047, lng: 11.0622 }
      }
    ],
    cuisine: [
      { name: 'Poisson de Mahdia', description: 'Fresh fish from local fishing boats', isSpecialty: true },
      { name: 'Couscous aux Fruits de Mer', description: 'Seafood couscous specialty' }
    ],
    culture: [
      { tip: 'Fishing Heritage', info: 'Watch traditional fishing methods at the port' },
      { tip: 'Fatimid History', info: 'Learn about the ancient Fatimid dynasty' }
    ],
    transportation: [
      { title: 'Coastal Transport', info: 'Regular buses along the coast' },
      { title: 'Fishing Boats', info: 'Traditional boats still used for fishing' }
    ]
  },
  {
    id: 'sfax',
    name: 'Sfax',
    nameArabic: 'صفاقس',
    capital: 'Sfax',
    description: 'Economic capital with historic medina and olive oil production',
    image: 'https://images.pexels.com/photos/9552935/pexels-photo-9552935.jpeg?auto=compress&cs=tinysrgb&w=800',
    coordinates: { lat: 34.7406, lng: 10.7603 },
    attractions: [
      {
        id: 'sfax-medina',
        name: 'Sfax Medina',
        description: 'Well-preserved medina with traditional architecture',
        image: 'https://images.pexels.com/photos/9552935/pexels-photo-9552935.jpeg?auto=compress&cs=tinysrgb&w=800',
        type: 'Historic District',
        rating: 4.3,
        duration: '2-3 hours',
        coordinates: { lat: 34.7406, lng: 10.7603 }
      }
    ],
    cuisine: [
      { name: 'Huile d\'Olive de Sfax', description: 'World-renowned olive oil', isSpecialty: true },
      { name: 'Couscous Sfaxien', description: 'Local variation with seafood and vegetables' }
    ],
    culture: [
      { tip: 'Business Culture', info: 'Sfax is Tunisia\'s economic hub' },
      { tip: 'Olive Oil Tours', info: 'Visit traditional olive oil mills' }
    ],
    transportation: [
      { title: 'Commercial Port', info: 'Major port for trade and transport' },
      { title: 'Highway Access', info: 'Good road connections to all regions' }
    ]
  },
  {
    id: 'kairouan',
    name: 'Kairouan',
    nameArabic: 'القيروان',
    capital: 'Kairouan',
    description: 'Holy city of Islam with the Great Mosque and traditional crafts',
    image: 'https://images.pexels.com/photos/9552935/pexels-photo-9552935.jpeg?auto=compress&cs=tinysrgb&w=800',
    coordinates: { lat: 35.6781, lng: 10.0963 },
    attractions: [
      {
        id: 'great-mosque-kairouan',
        name: 'Great Mosque of Kairouan',
        description: 'One of the most important mosques in Islam',
        image: 'https://images.pexels.com/photos/9552935/pexels-photo-9552935.jpeg?auto=compress&cs=tinysrgb&w=800',
        type: 'Religious Site',
        rating: 4.8,
        duration: '2-3 hours',
        coordinates: { lat: 35.6781, lng: 10.0963 }
      }
    ],
    cuisine: [
      { name: 'Makroud Kairouan', description: 'Famous semolina pastry with dates', isSpecialty: true },
      { name: 'Couscous Traditionnel', description: 'Traditional preparation methods' }
    ],
    culture: [
      { tip: 'Religious Respect', info: 'Dress very modestly and respect prayer times' },
      { tip: 'Carpet Weaving', info: 'Watch traditional carpet making techniques' }
    ],
    transportation: [
      { title: 'Pilgrimage Routes', info: 'Well-connected for religious tourism' },
      { title: 'Central Location', info: 'Good access to all parts of Tunisia' }
    ]
  },
  {
    id: 'kasserine',
    name: 'Kasserine',
    nameArabic: 'القصرين',
    capital: 'Kasserine',
    description: 'Mountain region with Roman ruins and natural parks',
    image: 'https://images.pexels.com/photos/17829148/pexels-photo-17829148.jpeg?auto=compress&cs=tinysrgb&w=800',
    coordinates: { lat: 35.1675, lng: 8.8361 },
    attractions: [
      {
        id: 'chambi-national-park',
        name: 'Chambi National Park',
        description: 'Tunisia\'s highest mountain with diverse wildlife',
        image: 'https://images.pexels.com/photos/6185575/pexels-photo-6185575.jpeg?auto=compress&cs=tinysrgb&w=800',
        type: 'National Park',
        rating: 4.2,
        duration: 'Full day',
        coordinates: { lat: 35.2167, lng: 8.6667 }
      }
    ],
    cuisine: [
      { name: 'Agneau de Montagne', description: 'Mountain lamb with herbs', isSpecialty: true },
      { name: 'Miel Sauvage', description: 'Wild honey from mountain flowers' }
    ],
    culture: [
      { tip: 'Mountain Hiking', info: 'Explore Tunisia\'s highest peaks' },
      { tip: 'Berber Villages', info: 'Visit traditional mountain communities' }
    ],
    transportation: [
      { title: 'Mountain Roads', info: 'Challenging but scenic mountain driving' },
      { title: 'Limited Transport', info: 'Car rental essential for exploration' }
    ]
  },
  {
    id: 'sidi-bouzid',
    name: 'Sidi Bouzid',
    nameArabic: 'سيدي بوزيد',
    capital: 'Sidi Bouzid',
    description: 'Central agricultural region, birthplace of the Arab Spring',
    image: 'https://images.pexels.com/photos/6185575/pexels-photo-6185575.jpeg?auto=compress&cs=tinysrgb&w=800',
    coordinates: { lat: 35.0381, lng: 9.4858 },
    attractions: [
      {
        id: 'sidi-bouzid-memorial',
        name: 'Arab Spring Memorial',
        description: 'Memorial to the start of the Arab Spring movement',
        image: 'https://images.pexels.com/photos/6185575/pexels-photo-6185575.jpeg?auto=compress&cs=tinysrgb&w=800',
        type: 'Memorial',
        rating: 4.0,
        duration: '1-2 hours',
        coordinates: { lat: 35.0381, lng: 9.4858 }
      }
    ],
    cuisine: [
      { name: 'Produits Agricoles', description: 'Fresh agricultural products', isSpecialty: true },
      { name: 'Pain Traditionnel', description: 'Traditional bread from local wheat' }
    ],
    culture: [
      { tip: 'Historical Significance', info: 'Learn about recent Tunisian history' },
      { tip: 'Agricultural Heritage', info: 'Experience traditional farming culture' }
    ],
    transportation: [
      { title: 'Central Roads', info: 'Good connections to major cities' },
      { title: 'Rural Transport', info: 'Limited public transport in rural areas' }
    ]
  },
  {
    id: 'gafsa',
    name: 'Gafsa',
    nameArabic: 'قفصة',
    capital: 'Gafsa',
    description: 'Oasis city with phosphate mining and desert landscapes',
    image: 'https://images.pexels.com/photos/6185575/pexels-photo-6185575.jpeg?auto=compress&cs=tinysrgb&w=800',
    coordinates: { lat: 34.4250, lng: 8.7842 },
    attractions: [
      {
        id: 'gafsa-oasis',
        name: 'Gafsa Oasis',
        description: 'Traditional oasis with date palms and springs',
        image: 'https://images.pexels.com/photos/6185575/pexels-photo-6185575.jpeg?auto=compress&cs=tinysrgb&w=800',
        type: 'Oasis',
        rating: 4.1,
        duration: '2-3 hours',
        coordinates: { lat: 34.4250, lng: 8.7842 }
      }
    ],
    cuisine: [
      { name: 'Dattes de Gafsa', description: 'High-quality dates from oasis palms', isSpecialty: true },
      { name: 'Couscous aux Dattes', description: 'Sweet couscous with dates and nuts' }
    ],
    culture: [
      { tip: 'Oasis Life', info: 'Experience traditional oasis agriculture' },
      { tip: 'Desert Culture', info: 'Learn about desert survival and traditions' }
    ],
    transportation: [
      { title: 'Desert Roads', info: 'Gateway to southern desert regions' },
      { title: 'Mining Transport', info: 'Industrial transport infrastructure' }
    ]
  },
  {
    id: 'tozeur',
    name: 'Tozeur',
    nameArabic: 'توزر',
    capital: 'Tozeur',
    description: 'Desert oasis famous for dates, Star Wars filming, and Sahara tours',
    image: 'https://images.pexels.com/photos/6185575/pexels-photo-6185575.jpeg?auto=compress&cs=tinysrgb&w=800',
    coordinates: { lat: 33.9197, lng: 8.1342 },
    attractions: [
      {
        id: 'chott-el-jerid',
        name: 'Chott el Jérid',
        description: 'Vast salt lake with mirages and unique landscapes',
        image: 'https://images.pexels.com/photos/6185575/pexels-photo-6185575.jpeg?auto=compress&cs=tinysrgb&w=800',
        type: 'Salt Lake',
        rating: 4.6,
        duration: 'Half day',
        coordinates: { lat: 33.7000, lng: 8.4333 }
      },
      {
        id: 'star-wars-sets',
        name: 'Star Wars Film Sets',
        description: 'Original filming locations from Star Wars movies',
        image: 'https://images.pexels.com/photos/6185575/pexels-photo-6185575.jpeg?auto=compress&cs=tinysrgb&w=800',
        type: 'Film Location',
        rating: 4.5,
        duration: 'Full day',
        coordinates: { lat: 33.9197, lng: 8.1342 }
      }
    ],
    cuisine: [
      { name: 'Dattes Deglet Nour', description: 'World\'s finest dates', isSpecialty: true },
      { name: 'Couscous du Désert', description: 'Desert-style couscous with dried fruits' },
      { name: 'Thé du Sahara', description: 'Traditional Saharan tea ceremony' }
    ],
    culture: [
      { tip: 'Desert Tours', info: 'Take camel treks and 4x4 desert expeditions' },
      { tip: 'Oasis Architecture', info: 'Admire traditional brick architecture' }
    ],
    transportation: [
      { title: 'Desert 4x4', info: 'Essential for desert exploration' },
      { title: 'Tourist Flights', info: 'Small airport for tourist charters' }
    ]
  },
  {
    id: 'kebili',
    name: 'Kébili',
    nameArabic: 'قبلي',
    capital: 'Kébili',
    description: 'Saharan governorate with oases, hot springs, and desert adventures',
    image: 'https://images.pexels.com/photos/6185575/pexels-photo-6185575.jpeg?auto=compress&cs=tinysrgb&w=800',
    coordinates: { lat: 33.7047, lng: 8.9689 },
    attractions: [
      {
        id: 'douz',
        name: 'Douz - Gateway to Sahara',
        description: 'Desert town famous for camel festivals and Sahara expeditions',
        image: 'https://images.pexels.com/photos/6185575/pexels-photo-6185575.jpeg?auto=compress&cs=tinysrgb&w=800',
        type: 'Desert Town',
        rating: 4.4,
        duration: 'Full day',
        coordinates: { lat: 33.4667, lng: 9.0333 }
      }
    ],
    cuisine: [
      { name: 'Cuisine Nomade', description: 'Traditional nomadic desert cuisine', isSpecialty: true },
      { name: 'Lait de Chamelle', description: 'Camel milk - traditional desert drink' }
    ],
    culture: [
      { tip: 'Nomadic Culture', info: 'Experience traditional Bedouin lifestyle' },
      { tip: 'Camel Festivals', info: 'Attend seasonal camel racing festivals' }
    ],
    transportation: [
      { title: 'Camel Trekking', info: 'Traditional desert transport' },
      { title: 'Desert Vehicles', info: '4x4 vehicles for deep desert exploration' }
    ]
  },
  {
    id: 'gabes',
    name: 'Gabès',
    nameArabic: 'قابس',
    capital: 'Gabès',
    description: 'Coastal oasis where desert meets the sea, unique ecosystem',
    image: 'https://images.pexels.com/photos/1032650/pexels-photo-1032650.jpeg?auto=compress&cs=tinysrgb&w=800',
    coordinates: { lat: 33.8815, lng: 10.0982 },
    attractions: [
      {
        id: 'gabes-oasis',
        name: 'Gabès Coastal Oasis',
        description: 'Unique oasis ecosystem by the Mediterranean',
        image: 'https://images.pexels.com/photos/1032650/pexels-photo-1032650.jpeg?auto=compress&cs=tinysrgb&w=800',
        type: 'Coastal Oasis',
        rating: 4.2,
        duration: '2-3 hours',
        coordinates: { lat: 33.8815, lng: 10.0982 }
      }
    ],
    cuisine: [
      { name: 'Poisson et Dattes', description: 'Unique combination of seafood and dates', isSpecialty: true },
      { name: 'Salade d\'Oasis', description: 'Fresh salad with oasis vegetables' }
    ],
    culture: [
      { tip: 'Unique Ecosystem', info: 'Only place where oasis meets the sea' },
      { tip: 'Traditional Fishing', info: 'Observe traditional coastal fishing methods' }
    ],
    transportation: [
      { title: 'Coastal Highway', info: 'Main route between north and south' },
      { title: 'Port Access', info: 'Ferry connections to nearby islands' }
    ]
  },
  {
    id: 'medenine',
    name: 'Médenine',
    nameArabic: 'مدنين',
    capital: 'Médenine',
    description: 'Southern region with Berber architecture and desert landscapes',
    image: 'https://images.pexels.com/photos/6185575/pexels-photo-6185575.jpeg?auto=compress&cs=tinysrgb&w=800',
    coordinates: { lat: 33.3549, lng: 10.5055 },
    attractions: [
      {
        id: 'ksar-ouled-soltane',
        name: 'Ksar Ouled Soltane',
        description: 'Ancient Berber granary with unique architecture',
        image: 'https://images.pexels.com/photos/6185575/pexels-photo-6185575.jpeg?auto=compress&cs=tinysrgb&w=800',
        type: 'Historic Architecture',
        rating: 4.3,
        duration: '2-3 hours',
        coordinates: { lat: 33.2833, lng: 10.6167 }
      },
      {
        id: 'matmata',
        name: 'Matmata',
        description: 'Underground Berber homes and Star Wars filming location',
        image: 'https://images.pexels.com/photos/6185575/pexels-photo-6185575.jpeg?auto=compress&cs=tinysrgb&w=800',
        type: 'Berber Village',
        rating: 4.5,
        duration: '3-4 hours',
        coordinates: { lat: 33.5444, lng: 9.9661 }
      }
    ],
    cuisine: [
      { name: 'Cuisine Berbère', description: 'Traditional Berber dishes and preparations', isSpecialty: true },
      { name: 'Pain Berbère', description: 'Traditional Berber bread baked in sand ovens' }
    ],
    culture: [
      { tip: 'Berber Heritage', info: 'Learn about indigenous Berber culture and traditions' },
      { tip: 'Underground Homes', info: 'Experience unique troglodyte architecture' }
    ],
    transportation: [
      { title: 'Desert Roads', info: 'Challenging desert terrain' },
      { title: 'Tourist Circuits', info: 'Organized tours to remote Berber sites' }
    ]
  },
  {
    id: 'tataouine',
    name: 'Tataouine',
    nameArabic: 'تطاوين',
    capital: 'Tataouine',
    description: 'Southernmost region with ksour, desert landscapes, and Star Wars fame',
    image: 'https://images.pexels.com/photos/6185575/pexels-photo-6185575.jpeg?auto=compress&cs=tinysrgb&w=800',
    coordinates: { lat: 32.9297, lng: 10.4517 },
    attractions: [
      {
        id: 'chenini',
        name: 'Chenini',
        description: 'Ancient Berber village built into mountain cliffs',
        image: 'https://images.pexels.com/photos/6185575/pexels-photo-6185575.jpeg?auto=compress&cs=tinysrgb&w=800',
        type: 'Berber Village',
        rating: 4.6,
        duration: '3-4 hours',
        coordinates: { lat: 32.9167, lng: 10.2667 }
      },
      {
        id: 'ksar-hadada',
        name: 'Ksar Hadada',
        description: 'Star Wars filming location with traditional ksar architecture',
        image: 'https://images.pexels.com/photos/6185575/pexels-photo-6185575.jpeg?auto=compress&cs=tinysrgb&w=800',
        type: 'Film Location',
        rating: 4.4,
        duration: '2-3 hours',
        coordinates: { lat: 32.7333, lng: 10.4000 }
      }
    ],
    cuisine: [
      { name: 'Couscous du Sud', description: 'Southern-style couscous with desert spices', isSpecialty: true },
      { name: 'Thé du Désert', description: 'Traditional desert tea ceremony' }
    ],
    culture: [
      { tip: 'Star Wars Tourism', info: 'Visit original Tatooine filming locations' },
      { tip: 'Berber Traditions', info: 'Experience ancient Berber mountain culture' }
    ],
    transportation: [
      { title: 'Remote Access', info: 'Challenging roads to remote mountain villages' },
      { title: 'Guided Tours', info: 'Local guides essential for mountain villages' }
    ]
  }
];

export const getGovernorateById = (id: string): Governorate | undefined => {
  return governorates.find(gov => gov.id === id);
};

export const getAttractionsByGovernorate = (governorateId: string): Attraction[] => {
  const governorate = getGovernorateById(governorateId);
  return governorate?.attractions || [];
};