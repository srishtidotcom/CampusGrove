// CampusGrove Tree Database
const TREES = [
  {
    id: "T001",
    name: "Banyan Tree",
    scientificName: "Ficus benghalensis",
    localName: "Vad / Bargad",
    isLocal: true,
    age: 87,
    height: "22 m",
    girth: "4.3 m",
    location: "Main Quad, Near Admin Block",
    coordinates: { lat: 18.5204, lng: 73.8567 },
    planted: "1938",
    health: "Excellent",
    healthScore: 95,
    category: "Shade Tree",
    co2Absorbed: "48 kg/year",
    waterNeeded: "120 L/week",
    lastInspected: "2026-02-10",
    nextInspection: "2026-05-10",
    description: "One of the oldest trees on campus, this magnificent Banyan is a living landmark. Its aerial roots span over 15 meters, creating a natural canopy beloved by students.",
    funFact: "The Great Banyan Tree in Kolkata is over 250 years old — this one is well on its way!",
    nativeRegion: "Indian Subcontinent",
    care: [
      {
        issue: "Yellowing Leaves",
        cause: "Iron deficiency or overwatering",
        treatment: "Apply ferrous sulfate solution (5g/liter) at the base. Reduce watering frequency. Check soil drainage.",
        urgency: "Low"
      },
      {
        issue: "Aerial Root Damage",
        cause: "Physical breakage by vandalism or storms",
        treatment: "Do NOT remove aerial roots. Support broken roots with bamboo stakes. Report to campus horticulture team immediately.",
        urgency: "High"
      },
      {
        issue: "Bark Peeling",
        cause: "Fungal infection or pest activity",
        treatment: "Apply copper oxychloride paste on exposed areas. Consult a certified arborist for large-scale peeling.",
        urgency: "Medium"
      }
    ],
    images: [],
    tags: ["Heritage Tree", "Sacred", "Shade Provider", "Wildlife Habitat"]
  },
  {
    id: "T002",
    name: "Neem Tree",
    scientificName: "Azadirachta indica",
    localName: "Nimba / Neem",
    isLocal: true,
    age: 42,
    height: "14 m",
    girth: "1.8 m",
    location: "Boys Hostel Pathway, Block B",
    coordinates: { lat: 18.5210, lng: 73.8573 },
    planted: "1984",
    health: "Good",
    healthScore: 82,
    category: "Medicinal Tree",
    co2Absorbed: "21 kg/year",
    waterNeeded: "60 L/week",
    lastInspected: "2026-01-20",
    nextInspection: "2026-04-20",
    description: "This hardy Neem is a natural pest repellent and air purifier. Students and faculty often pluck its leaves for medicinal uses. Its bitter compounds have been used in Ayurveda for millennia.",
    funFact: "Neem leaves release over 70 bioactive compounds, making it one of nature's most powerful pharmacies.",
    nativeRegion: "Indian Subcontinent / Myanmar",
    care: [
      {
        issue: "Leaf Curl / Webbing",
        cause: "Mite infestation",
        treatment: "Spray neem oil solution (ironic but effective!) or insecticidal soap. Repeat every 7 days for 3 weeks.",
        urgency: "Medium"
      },
      {
        issue: "White Powdery Coating on Leaves",
        cause: "Powdery mildew fungus",
        treatment: "Spray mixture of baking soda (1 tsp) + dish soap (few drops) in 1L water. Improve air circulation around trunk.",
        urgency: "Low"
      }
    ],
    images: [],
    tags: ["Medicinal", "Pest Repellent", "Air Purifier", "Ayurvedic"]
  },
  {
    id: "T003",
    name: "Rain Tree",
    scientificName: "Samanea saman",
    localName: "Vilayati Siris",
    isLocal: false,
    age: 55,
    height: "18 m",
    girth: "3.1 m",
    location: "Science Block, West Wing",
    coordinates: { lat: 18.5198, lng: 73.8562 },
    planted: "1971",
    health: "Good",
    healthScore: 78,
    category: "Shade Tree",
    co2Absorbed: "37 kg/year",
    waterNeeded: "90 L/week",
    lastInspected: "2026-02-05",
    nextInspection: "2026-05-05",
    description: "Originally from tropical South America, the Rain Tree earns its name by closing its leaves before rain. Its vast crown creates a perfect reading nook for students.",
    funFact: "Rain Trees fold their leaves at night and before rain — a behavior called nyctinasty, controlled by light and humidity sensors in the leaf joints.",
    nativeRegion: "Central & South America (introduced)",
    care: [
      {
        issue: "Cavity in Trunk",
        cause: "Heartwood decay from old injury",
        treatment: "Do NOT fill with concrete (outdated practice). Use breathable wound dressings. Have a professional arborist assess structural integrity.",
        urgency: "High"
      },
      {
        issue: "Dead Branches",
        cause: "Natural dieback or storm damage",
        treatment: "Perform crown-thinning by a licensed pruner. Remove dead wood in dry season (Oct–Feb). Never prune more than 25% of crown.",
        urgency: "Medium"
      }
    ],
    images: [],
    tags: ["Exotic", "Shade Provider", "Large Canopy", "Avenue Tree"]
  },
  {
    id: "T004",
    name: "Indian Laburnum",
    scientificName: "Cassia fistula",
    localName: "Amaltas / Bahawa",
    isLocal: true,
    age: 28,
    height: "9 m",
    girth: "0.9 m",
    location: "Botanical Garden, Plot 4",
    coordinates: { lat: 18.5192, lng: 73.8558 },
    planted: "1998",
    health: "Excellent",
    healthScore: 91,
    category: "Flowering Tree",
    co2Absorbed: "14 kg/year",
    waterNeeded: "40 L/week",
    lastInspected: "2026-03-01",
    nextInspection: "2026-06-01",
    description: "The State Tree of Kerala and National Tree of Thailand, Amaltas bursts into stunning golden-yellow cascades every April–May. A photographer's delight on campus.",
    funFact: "In Ayurveda, almost every part of Amaltas — bark, leaves, flowers, seeds, and pods — is used medicinally. It's truly a complete pharmacy.",
    nativeRegion: "Indian Subcontinent / Sri Lanka",
    care: [
      {
        issue: "No Flowering",
        cause: "Insufficient sunlight or nitrogen-heavy soil",
        treatment: "Reduce nitrogen fertilizer. Apply phosphorus-rich fertilizer (bone meal or super phosphate) before flowering season (March). Ensure at least 6 hrs of direct sunlight.",
        urgency: "Low"
      },
      {
        issue: "Pod Drop",
        cause: "Normal seasonal cycle or stress",
        treatment: "Collect fallen pods to prevent accidental ingestion. If premature, check for root stress and improve drainage.",
        urgency: "Low"
      }
    ],
    images: [],
    tags: ["Flowering", "National Significance", "Ornamental", "Medicinal Pods"]
  },
  {
    id: "T005",
    name: "Peepal Tree",
    scientificName: "Ficus religiosa",
    localName: "Peepal / Ashwattha",
    isLocal: true,
    age: 120,
    height: "25 m",
    girth: "5.8 m",
    location: "Near Old Library, Heritage Grove",
    coordinates: { lat: 18.5215, lng: 73.8580 },
    planted: "1906",
    health: "Good",
    healthScore: 74,
    category: "Heritage Tree",
    co2Absorbed: "56 kg/year",
    waterNeeded: "100 L/week",
    lastInspected: "2026-01-15",
    nextInspection: "2026-04-15",
    description: "The oldest tree on campus, this Peepal predates the college itself. Sacred in Hindu, Buddhist, and Jain traditions, under this tree the Buddha is said to have attained enlightenment.",
    funFact: "Peepal is rare — it releases oxygen 24 hours a day, unlike most trees. Ancient texts called it 'the tree of life.'",
    nativeRegion: "Indian Subcontinent",
    care: [
      {
        issue: "Root Intrusion into Buildings",
        cause: "Aggressive root growth seeking moisture",
        treatment: "Install linear root barriers (HDPE) immediately. Do NOT cut roots indiscriminately — assess with arborist. Alert Facilities Dept.",
        urgency: "High"
      },
      {
        issue: "Lichen / Moss on Bark",
        cause: "Humid conditions (usually harmless)",
        treatment: "Generally leave them. If excessive, spray diluted lime wash on trunk. Improve air circulation by clearing undergrowth.",
        urgency: "Low"
      },
      {
        issue: "Large Branch Crack",
        cause: "Age, storm, or structural weakness",
        treatment: "Immediately cordon off area. Call campus arborist. Do NOT attempt self-repair. May need professional cable-bracing.",
        urgency: "Critical"
      }
    ],
    images: [],
    tags: ["Heritage", "Sacred", "Oldest on Campus", "24hr O₂", "Buddha's Tree"]
  },
  {
    id: "T006",
    name: "Gulmohar",
    scientificName: "Delonix regia",
    localName: "Gulmohar / Flamboyant",
    isLocal: false,
    age: 35,
    height: "11 m",
    girth: "1.5 m",
    location: "Main Gate Avenue, Left Row",
    coordinates: { lat: 18.5220, lng: 73.8550 },
    planted: "1991",
    health: "Excellent",
    healthScore: 88,
    category: "Flowering Tree",
    co2Absorbed: "19 kg/year",
    waterNeeded: "50 L/week",
    lastInspected: "2026-02-28",
    nextInspection: "2026-05-28",
    description: "Perhaps the most photographed tree on campus, Gulmohar's blazing orange-red crown turns the avenue into a fiery tunnel every summer. It's every graduating student's favourite backdrop.",
    funFact: "IUCN lists Delonix regia as endangered in its native dry deciduous forests of Madagascar — yet it thrives as a street tree worldwide.",
    nativeRegion: "Madagascar (introduced)",
    care: [
      {
        issue: "Branch Brittleness",
        cause: "Gulmohar branches are naturally brittle",
        treatment: "Schedule pre-monsoon pruning (May–June) to reduce wind-load. Remove V-shaped forks with included bark. Mark a 5m safety zone during storms.",
        urgency: "High"
      },
      {
        issue: "Sap Oozing from Bark",
        cause: "Bacterial or fungal wetwood disease",
        treatment: "Avoid water stress. Improve drainage. Apply Bordeaux paste (copper sulfate + lime) to oozing areas. Consult plant pathologist.",
        urgency: "Medium"
      }
    ],
    images: [],
    tags: ["Exotic", "Flowering", "Avenue Tree", "Summer Bloom", "Instagram Famous"]
  },
  {
    id: "T007",
    name: "Mango Tree",
    scientificName: "Mangifera indica",
    localName: "Aam / Mango",
    isLocal: true,
    age: 60,
    height: "15 m",
    girth: "2.4 m",
    location: "Faculty Quarters, Garden Area",
    coordinates: { lat: 18.5185, lng: 73.8570 },
    planted: "1966",
    health: "Fair",
    healthScore: 65,
    category: "Fruit Tree",
    co2Absorbed: "28 kg/year",
    waterNeeded: "80 L/week",
    lastInspected: "2025-12-10",
    nextInspection: "2026-03-10",
    description: "India's national fruit tree on campus! This veteran mango has fed generations of students. Now showing signs of age with minor decay, it's under close monitoring by the horticulture team.",
    funFact: "Mangoes have been cultivated in India for over 4,000 years. The Mughal emperor Akbar planted an orchard of 100,000 mango trees.",
    nativeRegion: "Indian Subcontinent / Southeast Asia",
    care: [
      {
        issue: "Powdery Mildew on Inflorescence",
        cause: "Erysiphe polygoni fungus",
        treatment: "Spray wettable sulfur (0.2%) or karathane before flowering begins. Avoid wetting foliage during watering.",
        urgency: "Medium"
      },
      {
        issue: "Mango Hopper Infestation",
        cause: "Idioscopus nitidulus (common in flowering season)",
        treatment: "Spray carbaryl (0.1%) or imidacloprid at first sign of hoppers. Apply twice with 15-day interval.",
        urgency: "High"
      },
      {
        issue: "Hollow Trunk Section",
        cause: "Heartwood decay (tree age)",
        treatment: "The area has been assessed. No intervention needed currently. Annual monitoring is in place. DO NOT insert foreign materials.",
        urgency: "Low"
      }
    ],
    images: [],
    tags: ["Fruit Bearing", "National Fruit", "Veteran", "Monitoring Required"]
  },
  {
    id: "T008",
    name: "Java Plum",
    scientificName: "Syzygium cumini",
    localName: "Jamun",
    isLocal: true,
    age: 45,
    height: "16 m",
    girth: "2.0 m",
    location: "Sports Ground, East Boundary",
    coordinates: { lat: 18.5178, lng: 73.8560 },
    planted: "1981",
    health: "Excellent",
    healthScore: 90,
    category: "Fruit Tree",
    co2Absorbed: "32 kg/year",
    waterNeeded: "70 L/week",
    lastInspected: "2026-02-20",
    nextInspection: "2026-05-20",
    description: "This massive Jamun is a summer institution — students flock here in June when the sweet-tart purple fruits rain down. A key feeder tree for campus birds and bats.",
    funFact: "Jamun seeds are used in Ayurveda to control blood sugar in Diabetes Type 2 patients. The fruit turns your tongue purple — a rite of passage for campus freshers!",
    nativeRegion: "Indian Subcontinent / Southeast Asia",
    care: [
      {
        issue: "Scale Insects on Branches",
        cause: "Pulvinaria psidii (soft scales)",
        treatment: "Scrub scales with mild soap solution. Spray neem oil (2%) solution. Introduce natural predators (ladybugs) where possible.",
        urgency: "Medium"
      },
      {
        issue: "Over-fruiting / Branch Sag",
        cause: "Heavy fruit load during June–August",
        treatment: "Provide temporary bamboo prop supports during fruiting season. No permanent action needed.",
        urgency: "Low"
      }
    ],
    images: [],
    tags: ["Fruit Bearing", "Wildlife Feeder", "Medicinal Seed", "Campus Favourite"]
  },
  {
    id: "T009",
    name: "Arjuna Tree",
    scientificName: "Terminalia arjuna",
    localName: "Arjun / Arjuna",
    isLocal: true,
    age: 33,
    height: "13 m",
    girth: "1.4 m",
    location: "Near Pond / Water Body, Campus Lake",
    coordinates: { lat: 18.5170, lng: 73.8545 },
    planted: "1993",
    health: "Good",
    healthScore: 85,
    category: "Medicinal Tree",
    co2Absorbed: "24 kg/year",
    waterNeeded: "55 L/week",
    lastInspected: "2026-02-15",
    nextInspection: "2026-05-15",
    description: "Native to river banks and highlands, the Arjuna tree loves campus life near the lake. Its bark, used in cardiac medicine for 3,000 years, has a distinctive pale-grey buttressed form.",
    funFact: "Modern clinical studies confirm Arjuna bark extract strengthens heart muscle, reduces bad cholesterol, and improves exercise tolerance. Ancient wisdom, modern proof.",
    nativeRegion: "Indian Subcontinent",
    care: [
      {
        issue: "Waterlogging of Roots",
        cause: "Lake water level rise during monsoon",
        treatment: "Monitor during monsoon. Build temporary raised ring bund (25cm earthen mound) around base. Ensure surface drainage is clear.",
        urgency: "Medium"
      }
    ],
    images: [],
    tags: ["Medicinal", "Riparian", "Cardiac Health", "Ayurvedic"]
  },
  {
    id: "T010",
    name: "African Tulip",
    scientificName: "Spathodea campanulata",
    localName: "Flame of the Forest",
    isLocal: false,
    age: 22,
    height: "10 m",
    girth: "0.8 m",
    location: "Staff Parking Lot, Behind Canteen",
    coordinates: { lat: 18.5225, lng: 73.8575 },
    planted: "2004",
    health: "Good",
    healthScore: 80,
    category: "Flowering Tree",
    co2Absorbed: "16 kg/year",
    waterNeeded: "45 L/week",
    lastInspected: "2026-01-30",
    nextInspection: "2026-04-30",
    description: "A stunning ornamental tree with vivid orange-red trumpet flowers, the African Tulip adds a tropical drama to the campus skyline. Its hollow buds hold water — a natural water pistol!",
    funFact: "The buds of African Tulip store water. Children (and biology students) love squeezing them to squirt water. The tree is pollinated by sunbirds who hover to drink nectar.",
    nativeRegion: "West Africa (introduced)",
    care: [
      {
        issue: "Invasive Root System",
        cause: "Fast-growing exotic species",
        treatment: "Install root barriers around nearby paths. Monitor for root uplift of paving. Considered invasive in some states — do not propagate seeds.",
        urgency: "Medium"
      },
      {
        issue: "Loss of Flowers Off-Season",
        cause: "Normal — flowers mainly Oct–March",
        treatment: "No action required. This is seasonal behavior. Supplement with slow-release fertilizer in September.",
        urgency: "Low"
      }
    ],
    images: [],
    tags: ["Exotic", "Flowering", "Invasive Watch", "Bird Pollinated", "Ornamental"]
  }
];

// Statistics computed from data
const STATS = {
  total: TREES.length,
  local: TREES.filter(t => t.isLocal).length,
  exotic: TREES.filter(t => !t.isLocal).length,
  totalCO2: TREES.reduce((sum, t) => sum + parseInt(t.co2Absorbed), 0),
  avgHealth: Math.round(TREES.reduce((sum, t) => sum + t.healthScore, 0) / TREES.length),
  heritage: TREES.filter(t => t.tags.includes("Heritage") || t.tags.includes("Heritage Tree")).length
};

// Get tree by ID
function getTreeById(id) {
  return TREES.find(t => t.id === id) || null;
}

// Get health color
function getHealthColor(score) {
  if (score >= 85) return '#22c55e';
  if (score >= 70) return '#eab308';
  if (score >= 55) return '#f97316';
  return '#ef4444';
}

// Get urgency badge
function getUrgencyClass(urgency) {
  const map = { 'Critical': 'urgency-critical', 'High': 'urgency-high', 'Medium': 'urgency-medium', 'Low': 'urgency-low' };
  return map[urgency] || 'urgency-low';
}
