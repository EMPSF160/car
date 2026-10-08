// ===================================================
// WHEELS - NEW CAR SALES DATABASE & STATE LAYER
// ===================================================

const STORAGE_KEYS = {
    CARS: 'wheels_cars_db',
    ORDERS: 'wheels_orders_db',
    TEST_DRIVES: 'wheels_test_drives_db',
    INQUIRIES: 'wheels_inquiries_db',
    WISHLIST: 'wheels_wishlist_db',
    COMPARE: 'wheels_compare_db'
};

// Initial Brand New 2026/2027 Vehicle Inventory
const INITIAL_CARS = [
    {
        id: 'car-taycan-gt-2026',
        name: 'Porsche Taycan Turbo GT',
        brand: 'Porsche',
        year: 2026,
        tagline: 'The Pinnacle of Electric Track Dominance',
        price: 230000,
        bodyType: 'Sedan',
        fuelType: 'Electric',
        transmission: '2-Speed Direct Drive',
        engine: 'Dual Permanent Magnet Synchronous Motors',
        horsepower: 1019,
        torque: '988 lb-ft',
        zeroToSixty: '2.1s',
        topSpeed: '190 mph',
        rangeOrMpg: '340 mi Range',
        drivetrain: 'AWD (All-Wheel Drive)',
        stockCount: 4,
        status: 'In Stock',
        featured: true,
        rating: 4.9,
        overview: 'Experience unrelenting speed with the 2026 Porsche Taycan Turbo GT. Featuring Weissach lightweight package options, active aerodynamic wing, and revolutionary 800V fast-charging architecture.',
        image: 'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&w=1200&q=80',
        gallery: [
            'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=1200&q=80'
        ],
        colors: [
            { name: 'Volt Blue Metallic', hex: '#0055ff' },
            { name: 'Ghost Silver Metallic', hex: '#c0c0c0' },
            { name: 'Obsidian Black', hex: '#111111' },
            { name: 'Carmine Crimson', hex: '#dc143c' }
        ],
        trims: [
            { name: 'Turbo GT Standard', priceOffset: 0, desc: 'Full active aero, carbon ceramic brakes, sport chrono' },
            { name: 'Weissach Track Pack', priceOffset: 24500, desc: 'Rear seat delete, fixed carbon wing, titanium cage' },
            { name: 'Executive Heritage Edition', priceOffset: 31000, desc: 'Burmester 3D High-End audio, bespoke Club leather' }
        ],
        warranty: '4 Years / 50,000 Miles + 8-Year Battery Warranty'
    },
    {
        id: 'car-amg-gt63-2026',
        name: 'Mercedes-AMG GT 63 S E Performance',
        brand: 'Mercedes-AMG',
        year: 2026,
        tagline: 'Handcrafted Formula 1 Hybrid V8 Beast',
        price: 198500,
        bodyType: 'Coupe',
        fuelType: 'Plug-in Hybrid',
        transmission: 'AMG SPEEDSHIFT MCT 9G',
        engine: '4.0L Handcrafted V8 Biturbo + Electric Motor',
        horsepower: 831,
        torque: '1033 lb-ft',
        zeroToSixty: '2.7s',
        topSpeed: '196 mph',
        rangeOrMpg: '26 MPG Combined',
        drivetrain: 'AMG Performance 4MATIC+',
        stockCount: 3,
        status: 'In Stock',
        featured: true,
        rating: 4.85,
        overview: 'Direct technology transfer from the Mercedes-AMG PETRONAS Formula 1 team. Combines an ultra-responsive V8 biturbo with an innovative electric drive unit on the rear axle.',
        image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=1200&q=80',
        gallery: [
            'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1555353540-64580b51c258?auto=format&fit=crop&w=1200&q=80'
        ],
        colors: [
            { name: 'MANUFAKTUR Magno Grey', hex: '#4a4e52' },
            { name: 'Hyper Crimson Red', hex: '#c8102e' },
            { name: 'Night Black Opal', hex: '#0f1115' },
            { name: 'Emerald Green Metallic', hex: '#0a3a28' }
        ],
        trims: [
            { name: 'Standard S E Performance', priceOffset: 0, desc: 'AMG Ride Control suspension, 4MATIC+' },
            { name: 'AMG Aerodynamics Carbon Package', priceOffset: 15800, desc: 'Carbon front splitter, rear diffuser, flics' },
            { name: 'Exclusive Studio Edition', priceOffset: 28000, desc: 'Bespoke Nappa leather, 21-inch forged wheels' }
        ],
        warranty: '4 Years / 50,000 Miles Comprehensive'
    },
    {
        id: 'car-ferrari-296-2026',
        name: 'Ferrari 296 GTB Assetto Fiorano',
        brand: 'Ferrari',
        year: 2026,
        tagline: 'Defining Fun to Drive in the Hybrid Supercar Era',
        price: 342000,
        bodyType: 'Coupe',
        fuelType: 'Plug-in Hybrid',
        transmission: '8-Speed F1 Dual-Clutch',
        engine: '120° 2.9L Turbocharged V6 + MGU-K',
        horsepower: 819,
        torque: '546 lb-ft',
        zeroToSixty: '2.4s',
        topSpeed: '205 mph',
        rangeOrMpg: '18 MPG (16 mi EV)',
        drivetrain: 'RWD (Rear-Wheel Drive)',
        stockCount: 2,
        status: 'In Stock',
        featured: true,
        rating: 5.0,
        overview: 'The Ferrari 296 GTB rewrites the rulebook on supercar agility. With its mid-rear turbo V6 coupled with an F1-derived electric motor, the acoustic symphony and steering response are unmatched.',
        image: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&w=1200&q=80',
        gallery: [
            'https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1592198084033-aade902d1aae?auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=1200&q=80'
        ],
        colors: [
            { name: 'Rosso Corsa', hex: '#d40000' },
            { name: 'Giallo Modena', hex: '#ffd200' },
            { name: 'Nero Daytona', hex: '#1c1c1c' },
            { name: 'Blu Pozzi', hex: '#002060' }
        ],
        trims: [
            { name: 'Standard 296 GTB', priceOffset: 0, desc: 'Carbon ceramic brakes, eManettino dial' },
            { name: 'Assetto Fiorano Pack', priceOffset: 34500, desc: 'Multimatic dampers, Lexan rear window, carbon aero' },
            { name: 'Tailor Made Spec', priceOffset: 52000, desc: 'Custom historical livery, Alcantara interior' }
        ],
        warranty: '7 Years Genuine Maintenance Included'
    },
    {
        id: 'car-bmw-m8-2026',
        name: 'BMW M8 Competition Gran Coupe',
        brand: 'BMW',
        year: 2026,
        tagline: 'High-Performance Grand Touring in Pure Luxury',
        price: 144500,
        bodyType: 'Sedan',
        fuelType: 'Twin-Turbo Petrol',
        transmission: '8-Speed M Steptronic with Drivelogic',
        engine: '4.4L BMW M TwinPower Turbo V8',
        horsepower: 617,
        torque: '553 lb-ft',
        zeroToSixty: '3.0s',
        topSpeed: '190 mph',
        rangeOrMpg: '22 MPG Highway',
        drivetrain: 'M xDrive with 2WD Track Mode',
        stockCount: 5,
        status: 'In Stock',
        featured: false,
        rating: 4.8,
        overview: 'A breathtaking 4-door luxury grand coupe engineered for effortless continent crossing at extreme speeds. Features Bowers & Wilkins Diamond Surround sound and M Carbon bucket seats.',
        image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=1200&q=80',
        gallery: [
            'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=1200&q=80'
        ],
        colors: [
            { name: 'Isle of Man Green Metallic', hex: '#0f4c3a' },
            { name: 'Frozen Marina Bay Blue', hex: '#1c5aa6' },
            { name: 'Black Sapphire', hex: '#181818' },
            { name: 'Alpine White', hex: '#f0f0f0' }
        ],
        trims: [
            { name: 'M8 Competition Standard', priceOffset: 0, desc: 'M sport exhaust, adaptive M suspension' },
            { name: 'M Carbon Exterior Package', priceOffset: 9400, desc: 'Carbon mirrors, front inlets, rear spoiler' },
            { name: 'Ultimate First-Class Tier', priceOffset: 16500, desc: 'Bowers & Wilkins audio, Night Vision, executive rear seats' }
        ],
        warranty: '4 Years / 50,000 Miles + 3 Years Free Maintenance'
    },
    {
        id: 'car-lucid-air-2026',
        name: 'Lucid Air Sapphire Edition',
        brand: 'Lucid',
        year: 2026,
        tagline: 'The World’s Fastest Luxury Electric Super-Sedan',
        price: 249000,
        bodyType: 'Sedan',
        fuelType: 'Electric',
        transmission: 'Tri-Motor Direct Drive',
        engine: 'Three Proprietary Electric Motors (1 Front, 2 Rear)',
        horsepower: 1234,
        torque: '1430 lb-ft',
        zeroToSixty: '1.89s',
        topSpeed: '205 mph',
        rangeOrMpg: '427 mi Range',
        drivetrain: 'Torque-Vectoring Sapphire AWD',
        stockCount: 3,
        status: 'In Stock',
        featured: true,
        rating: 4.95,
        overview: 'The Lucid Air Sapphire is a masterclass in EV engineering. Delivering 1,234 horsepower, sub-2 second 0-60 mph acceleration, and an astonishing 427-mile EPA range alongside a 34-inch 5K cockpit display.',
        image: 'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=1200&q=80',
        gallery: [
            'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=1200&q=80'
        ],
        colors: [
            { name: 'Sapphire Blue Metallic', hex: '#002f6c' },
            { name: 'Stealth Matte Titanium', hex: '#505050' },
            { name: 'Cosmic Stellar White', hex: '#f8f8f8' }
        ],
        trims: [
            { name: 'Sapphire Tri-Motor Standard', priceOffset: 0, desc: 'Carbon ceramic brakes, sport bucket seating' },
            { name: 'DreamDrive Pro Autonomous Tier', priceOffset: 12000, desc: '32-sensor LiDAR suite with over-the-air autonomy' }
        ],
        warranty: '5 Years / 60,000 Miles + 8-Year Powertrain/Battery'
    },
    {
        id: 'car-rangerover-sv-2026',
        name: 'Range Rover SV Bespoke Long Wheelbase',
        brand: 'Land Rover',
        year: 2026,
        tagline: 'The Ultimate Expression of Modern Luxury & Peerless Capability',
        price: 235000,
        bodyType: 'SUV',
        fuelType: 'Twin-Turbo Mild Hybrid',
        transmission: '8-Speed Automatic with CommandShift',
        engine: '4.4L Twin-Turbocharged V8 with MHEV',
        horsepower: 606,
        torque: '553 lb-ft',
        zeroToSixty: '4.3s',
        topSpeed: '162 mph',
        rangeOrMpg: '21 MPG Highway',
        drivetrain: 'Intelligent All-Wheel Drive with Terrain Response 2',
        stockCount: 6,
        status: 'In Stock',
        featured: false,
        rating: 4.9,
        overview: 'SV Signature Suite 4-seat configuration with electrically deployable club table, integrated champagne refrigerator, Meridian 3D Signature Sound with active noise cancellation, and ceramic controls.',
        image: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1200&q=80',
        gallery: [
            'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80'
        ],
        colors: [
            { name: 'British Racing Green Satin', hex: '#004225' },
            { name: 'Santorini Gloss Black', hex: '#111111' },
            { name: 'Eiger Grey Metallic', hex: '#5f6468' },
            { name: 'Sunset Gold Satin', hex: '#b38f53' }
        ],
        trims: [
            { name: 'SV Intrepid Theme', priceOffset: 0, desc: 'Satin graphite exterior accents, anthracite metal trim' },
            { name: 'SV Serenity Luxury Suite', priceOffset: 18500, desc: 'Corinthian bronze details, 24-way heated/cooled massage seats' },
            { name: 'SV Bespoke Armor Edition', priceOffset: 48000, desc: 'Factory certified ballistics protection, run-flat wheels' }
        ],
        warranty: '4 Years / 50,000 Miles with 24/7 Roadside Assistance'
    },
    {
        id: 'car-tesla-plaid-2026',
        name: 'Tesla Model S Plaid (Track Edition)',
        brand: 'Tesla',
        year: 2026,
        tagline: 'Relentless Acceleration with Next-Gen Autopilot',
        price: 109990,
        bodyType: 'Sedan',
        fuelType: 'Electric',
        transmission: 'Single-Speed Fixed Gear',
        engine: 'Tri-Motor Carbon-Sleeved Rotors',
        horsepower: 1020,
        torque: '1050 lb-ft',
        zeroToSixty: '1.99s',
        topSpeed: '200 mph',
        rangeOrMpg: '359 mi Range',
        drivetrain: 'Torque-Vectoring Tri-Motor AWD',
        stockCount: 7,
        status: 'In Stock',
        featured: false,
        rating: 4.75,
        overview: 'Equipped with carbon ceramic brakes and high-performance Goodyear supercar tires, the Model S Plaid offers blistering speed, Full Self-Driving capability, and steam gaming console integration on road trips.',
        image: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=1200&q=80',
        gallery: [
            'https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=1200&q=80'
        ],
        colors: [
            { name: 'Ultra Red Metallic', hex: '#990000' },
            { name: 'Stealth Grey', hex: '#3d4246' },
            { name: 'Pearl White Multi-Coat', hex: '#fbfbfb' },
            { name: 'Deep Metallic Blue', hex: '#002f6c' }
        ],
        trims: [
            { name: 'Plaid Standard Configuration', priceOffset: 0, desc: 'Yoke or round steering, 22-speaker audio' },
            { name: 'Plaid Track Package', priceOffset: 20000, desc: 'Silicon carbide brake rotors, 20" Zero-G wheels, 200mph unlock' },
            { name: 'Full Self-Driving (FSD) Supervised', priceOffset: 8000, desc: 'Auto lane change, Navigate on Autopilot, Summon' }
        ],
        warranty: '4 Years / 50,000 Miles + 8-Year Battery Warranty'
    },
    {
        id: 'car-audi-rs-etron-2026',
        name: 'Audi RS e-tron GT Performance',
        brand: 'Audi',
        year: 2026,
        tagline: 'Sculpted Grand Tourer Powered by High-Voltage Innovation',
        price: 167000,
        bodyType: 'Coupe',
        fuelType: 'Electric',
        transmission: '2-Speed Rear Transmission',
        engine: 'Dual Permanent-Magnet Electric Motors',
        horsepower: 912,
        torque: '757 lb-ft',
        zeroToSixty: '2.5s',
        topSpeed: '160 mph',
        rangeOrMpg: '365 mi Range',
        drivetrain: 'Electric quattro AWD with Torque Vectoring',
        stockCount: 4,
        status: 'In Stock',
        featured: false,
        rating: 4.88,
        overview: 'With continuous power delivery, active air suspension, rear-wheel steering, and an expressive aerodynamic silhouette, the 2026 RS e-tron GT Performance offers unrivaled grand touring comfort.',
        image: 'https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?auto=format&fit=crop&w=1200&q=80',
        gallery: [
            'https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80'
        ],
        colors: [
            { name: 'Tactical Green Metallic', hex: '#374b3d' },
            { name: 'Daytona Gray Pearl', hex: '#4c4e51' },
            { name: 'Tango Red Metallic', hex: '#b2182b' },
            { name: 'Mythos Black Metallic', hex: '#111111' }
        ],
        trims: [
            { name: 'Performance Edition', priceOffset: 0, desc: 'Tungsten carbide coated brakes, Bang & Olufsen 3D' },
            { name: 'Carbon Black Optics Package', priceOffset: 11200, desc: 'Gloss carbon roof, mirror caps, black badging' },
            { name: 'Dynamic Plus Full Package', priceOffset: 19800, desc: 'Ceramic brakes, e-torque vectoring plus, matrix headlights' }
        ],
        warranty: '4 Years / 50,000 Miles + 8-Year High-Voltage Battery'
    }
];

// Initial Test Drive Sample Bookings
const INITIAL_TEST_DRIVES = [
    {
        id: 'TD-9021',
        customerName: 'Marcus Sterling',
        customerEmail: 'customer@wheels.com',
        customerPhone: '+1 (555) 392-1084',
        carId: 'car-taycan-gt-2026',
        carName: 'Porsche Taycan Turbo GT',
        date: '2026-10-15',
        time: '14:30',
        showroom: 'Wheels Downtown Flagship Showroom',
        testDriveType: 'Dealership Track Experience',
        status: 'Confirmed',
        notes: 'VIP customer interested in Weissach Track Pack options.'
    },
    {
        id: 'TD-9022',
        customerName: 'Elena Rostova',
        customerEmail: 'elena.rostova@techcorp.io',
        customerPhone: '+1 (555) 778-9901',
        carId: 'car-amg-gt63-2026',
        carName: 'Mercedes-AMG GT 63 S E Performance',
        date: '2026-10-18',
        time: '11:00',
        showroom: 'Wheels West Coast Supercenter',
        testDriveType: 'Home / Office Concierge Test Drive',
        status: 'Pending',
        notes: 'Requested delivery to corporate headquarters for test drive.'
    }
];

// Initial Sales Orders & Token Reservations
const INITIAL_ORDERS = [
    {
        id: 'ORD-2026-8801',
        customerName: 'Marcus Sterling',
        customerEmail: 'customer@wheels.com',
        customerPhone: '+1 (555) 392-1084',
        carId: 'car-lucid-air-2026',
        carName: 'Lucid Air Sapphire Edition',
        selectedColor: 'Sapphire Blue Metallic',
        selectedTrim: 'DreamDrive Pro Autonomous Tier',
        basePrice: 249000,
        trimOffset: 12000,
        destinationFee: 1850,
        taxAmount: 18270,
        totalPrice: 281120,
        depositPaid: 1000,
        paymentMethod: 'Credit Card / Token Escrow',
        orderDate: '2026-10-02',
        estimatedDelivery: '2026-11-20',
        status: 'Factory Allocated',
        progressPercent: 40,
        timeline: [
            { step: 'Order Reserved & Deposit Verified', date: '2026-10-02', done: true },
            { step: 'Factory Production Allocation', date: '2026-10-05', done: true },
            { step: 'Vehicle Assembly & Quality Inspection', date: '2026-10-25', done: false },
            { step: 'Port Transit / Dealer Arrival', date: '2026-11-12', done: false },
            { step: 'White-Glove VIP Delivery', date: '2026-11-20', done: false }
        ]
    }
];

// INITIAL INQUIRIES
const INITIAL_INQUIRIES = [
    {
        id: 'INQ-104',
        name: 'David K. Vance',
        email: 'dvance@apexcapital.com',
        phone: '+1 (555) 912-3400',
        carInterested: 'Ferrari 296 GTB Assetto Fiorano',
        message: 'Interested in trade-in valuation for my 2023 911 GT3 RS against the 296 GTB.',
        date: '2026-10-07',
        status: 'New Lead'
    }
];

// Data Store Engine Class
class CarDatabase {
    constructor() {
        this.init();
    }

    init() {
        if (!localStorage.getItem(STORAGE_KEYS.CARS)) {
            localStorage.setItem(STORAGE_KEYS.CARS, JSON.stringify(INITIAL_CARS));
        }
        if (!localStorage.getItem(STORAGE_KEYS.TEST_DRIVES)) {
            localStorage.setItem(STORAGE_KEYS.TEST_DRIVES, JSON.stringify(INITIAL_TEST_DRIVES));
        }
        if (!localStorage.getItem(STORAGE_KEYS.ORDERS)) {
            localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(INITIAL_ORDERS));
        }
        if (!localStorage.getItem(STORAGE_KEYS.INQUIRIES)) {
            localStorage.setItem(STORAGE_KEYS.INQUIRIES, JSON.stringify(INITIAL_INQUIRIES));
        }
        if (!localStorage.getItem(STORAGE_KEYS.WISHLIST)) {
            localStorage.setItem(STORAGE_KEYS.WISHLIST, JSON.stringify(['car-taycan-gt-2026']));
        }
        if (!localStorage.getItem(STORAGE_KEYS.COMPARE)) {
            localStorage.setItem(STORAGE_KEYS.COMPARE, JSON.stringify([]));
        }
    }

    // --- CARS ---
    getAllCars() {
        try {
            return JSON.parse(localStorage.getItem(STORAGE_KEYS.CARS)) || INITIAL_CARS;
        } catch (e) {
            return INITIAL_CARS;
        }
    }

    getCarById(id) {
        const cars = this.getAllCars();
        return cars.find(car => car.id === id) || cars[0];
    }

    saveCar(carData) {
        const cars = this.getAllCars();
        const existingIdx = cars.findIndex(c => c.id === carData.id);
        if (existingIdx >= 0) {
            cars[existingIdx] = { ...cars[existingIdx], ...carData };
        } else {
            if (!carData.id) {
                carData.id = 'car-' + Date.now();
            }
            cars.unshift(carData);
        }
        localStorage.setItem(STORAGE_KEYS.CARS, JSON.stringify(cars));
        this.notifyUpdate();
        return carData;
    }

    deleteCar(id) {
        let cars = this.getAllCars();
        cars = cars.filter(c => c.id !== id);
        localStorage.setItem(STORAGE_KEYS.CARS, JSON.stringify(cars));
        this.notifyUpdate();
        return true;
    }

    // --- TEST DRIVES ---
    getTestDrives() {
        try {
            return JSON.parse(localStorage.getItem(STORAGE_KEYS.TEST_DRIVES)) || [];
        } catch (e) {
            return [];
        }
    }

    bookTestDrive(data) {
        const testDrives = this.getTestDrives();
        const newBooking = {
            id: 'TD-' + Math.floor(1000 + Math.random() * 9000),
            status: 'Confirmed',
            bookedAt: new Date().toISOString(),
            ...data
        };
        testDrives.unshift(newBooking);
        localStorage.setItem(STORAGE_KEYS.TEST_DRIVES, JSON.stringify(testDrives));
        this.notifyUpdate();
        return newBooking;
    }

    updateTestDriveStatus(id, newStatus) {
        const testDrives = this.getTestDrives();
        const item = testDrives.find(td => td.id === id);
        if (item) {
            item.status = newStatus;
            localStorage.setItem(STORAGE_KEYS.TEST_DRIVES, JSON.stringify(testDrives));
            this.notifyUpdate();
            return true;
        }
        return false;
    }

    // --- ORDERS & RESERVATIONS ---
    getOrders() {
        try {
            return JSON.parse(localStorage.getItem(STORAGE_KEYS.ORDERS)) || [];
        } catch (e) {
            return [];
        }
    }

    createOrder(orderData) {
        const orders = this.getOrders();
        const newOrder = {
            id: 'ORD-2026-' + Math.floor(1000 + Math.random() * 9000),
            orderDate: new Date().toISOString().split('T')[0],
            estimatedDelivery: new Date(Date.now() + 45 * 86400000).toISOString().split('T')[0],
            status: 'Deposit Paid',
            progressPercent: 20,
            timeline: [
                { step: 'Order Reserved & Deposit Verified', date: new Date().toISOString().split('T')[0], done: true },
                { step: 'Factory Production Allocation', date: 'Upcoming', done: false },
                { step: 'Vehicle Assembly & Inspection', date: 'Upcoming', done: false },
                { step: 'Port Transit / Dealer Arrival', date: 'Upcoming', done: false },
                { step: 'White-Glove VIP Delivery', date: 'Upcoming', done: false }
            ],
            ...orderData
        };
        orders.unshift(newOrder);
        localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));
        this.notifyUpdate();
        return newOrder;
    }

    updateOrderStatus(orderId, newStatus, newProgress) {
        const orders = this.getOrders();
        const order = orders.find(o => o.id === orderId);
        if (order) {
            order.status = newStatus;
            if (newProgress !== undefined) {
                order.progressPercent = newProgress;
            }
            localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));
            this.notifyUpdate();
            return true;
        }
        return false;
    }

    // --- INQUIRIES & LEADS ---
    getInquiries() {
        try {
            return JSON.parse(localStorage.getItem(STORAGE_KEYS.INQUIRIES)) || [];
        } catch (e) {
            return [];
        }
    }

    addInquiry(data) {
        const inquiries = this.getInquiries();
        const newInq = {
            id: 'INQ-' + Math.floor(100 + Math.random() * 900),
            date: new Date().toISOString().split('T')[0],
            status: 'New Lead',
            ...data
        };
        inquiries.unshift(newInq);
        localStorage.setItem(STORAGE_KEYS.INQUIRIES, JSON.stringify(inquiries));
        this.notifyUpdate();
        return newInq;
    }

    // --- WISHLIST / SAVED CARS ---
    getWishlist() {
        try {
            return JSON.parse(localStorage.getItem(STORAGE_KEYS.WISHLIST)) || [];
        } catch (e) {
            return [];
        }
    }

    toggleWishlist(carId) {
        let wishlist = this.getWishlist();
        let added = false;
        if (wishlist.includes(carId)) {
            wishlist = wishlist.filter(id => id !== carId);
            added = false;
        } else {
            wishlist.push(carId);
            added = true;
        }
        localStorage.setItem(STORAGE_KEYS.WISHLIST, JSON.stringify(wishlist));
        this.notifyUpdate();
        return { added, total: wishlist.length };
    }

    isInWishlist(carId) {
        return this.getWishlist().includes(carId);
    }

    // --- COMPARE LIST ---
    getCompareList() {
        try {
            return JSON.parse(localStorage.getItem(STORAGE_KEYS.COMPARE)) || [];
        } catch (e) {
            return [];
        }
    }

    toggleCompare(carId) {
        let compareList = this.getCompareList();
        let added = false;
        if (compareList.includes(carId)) {
            compareList = compareList.filter(id => id !== carId);
            added = false;
        } else {
            if (compareList.length >= 4) {
                return { error: 'You can compare maximum 4 vehicles at a time.' };
            }
            compareList.push(carId);
            added = true;
        }
        localStorage.setItem(STORAGE_KEYS.COMPARE, JSON.stringify(compareList));
        this.notifyUpdate();
        return { added, total: compareList.length };
    }

    clearCompare() {
        localStorage.setItem(STORAGE_KEYS.COMPARE, JSON.stringify([]));
        this.notifyUpdate();
    }

    isInCompare(carId) {
        return this.getCompareList().includes(carId);
    }

    // --- RESET ---
    resetDemoData() {
        localStorage.setItem(STORAGE_KEYS.CARS, JSON.stringify(INITIAL_CARS));
        localStorage.setItem(STORAGE_KEYS.TEST_DRIVES, JSON.stringify(INITIAL_TEST_DRIVES));
        localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(INITIAL_ORDERS));
        localStorage.setItem(STORAGE_KEYS.INQUIRIES, JSON.stringify(INITIAL_INQUIRIES));
        localStorage.setItem(STORAGE_KEYS.WISHLIST, JSON.stringify(['car-taycan-gt-2026']));
        localStorage.setItem(STORAGE_KEYS.COMPARE, JSON.stringify([]));
        this.notifyUpdate();
    }

    notifyUpdate() {
        window.dispatchEvent(new CustomEvent('wheels-db-updated'));
    }
}

// Global Single Instance
window.carDB = new CarDatabase();
