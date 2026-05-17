// Initialize Supabase
const supabaseUrl = 'https://riilgsgetpduapkhcaak.supabase.co';
const supabaseKey = 'sb_publishable_uBoxeP7I5HAE7hz9AB3LMg_a9qOd0nf';
const supabaseClient = window.supabase.createClient(supabaseUrl, supabaseKey);

const menuItems = [
    // Burgers & Pizza (Standard)
    {
        id: 1,
        name: "Classic Cheeseburger",
        category: "burger",
        price: 149,
        image: "./assets/burger.png",
        desc: "Juicy veg patty with cheese, lettuce, and signature sauce."
    },
    {
        id: 2,
        name: "Pepperoni Passion",
        category: "pizza",
        price: 349,
        image: "./assets/pizza.png",
        desc: "Hand-tossed crust with loaded pepperoni and mozzarella."
    },
    {
        id: 3,
        name: "Dragon Sushi Roll",
        category: "sushi",
        price: 399,
        image: "./assets/dragon-sushi-roll.png",
        desc: "Fresh salmon and tuna nigiri with signature dragon rolls."
    },
    // Chinese
    {
        id: 7,
        name: "Veg Manchurian Dry",
        category: "chinese",
        price: 160,
        image: "./assets/veg-manchurian-dry.png",
        desc: "Deep-fried veg balls tossed in spicy soy-garlic sauce."
    },
    {
        id: 8,
        name: "Hakka Noodles",
        category: "chinese",
        price: 140,
        image: "./assets/hakka-noodles.png",
        desc: "Classic stir-fried noodles with fresh garden vegetables."
    },
    // Kathiyawadi
    {
        id: 9,
        name: "Kathiyawadi Thali",
        category: "kathiyawadi",
        price: 220,
        image: "./assets/kathiyawadi-thali.png",
        desc: "Authentic thali with Bajra Rotla, Baingan Bharta, and more."
    },
    {
        id: 10,
        name: "Vagharelo Rotlo",
        category: "kathiyawadi",
        price: 130,
        image: "./assets/vagharelo-rotlo.png",
        desc: "Traditional spiced buttermilk soaked millet bread."
    },
    // South Indian
    {
        id: 11,
        name: "Masala Dosa",
        category: "southindian",
        price: 120,
        image: "./assets/masala-dosa.png",
        desc: "Crispy rice crepe filled with spiced potato masala."
    },
    {
        id: 12,
        name: "Idli Sambar (2 Pcs)",
        category: "southindian",
        price: 80,
        image: "./assets/idli-sambar.png",
        desc: "Soft steamed rice cakes served with hot sambar and chutney."
    },
    // North Indian
    {
        id: 13,
        name: "Chicken Dum Biryani",
        category: "northindian",
        price: 299,
        image: "./assets/chicken-biryani.png",
        desc: "Aromatic basmati rice cooked with tender chicken and authentic spices."
    },
    {
        id: 14,
        name: "Classic Butter Chicken",
        category: "northindian",
        price: 349,
        image: "./assets/butter-chicken.png",
        desc: "Rich and creamy tomato gravy with tender roasted chicken chunks."
    },
    {
        id: 15,
        name: "Paneer Tikka",
        category: "northindian",
        price: 249,
        image: "./assets/paneer-tikka.png",
        desc: "Cottage cheese marinated in yogurt and spices, grilled to perfection."
    },
    // Desserts
    {
        id: 16,
        name: "Sizzling Brownie",
        category: "desserts",
        price: 199,
        image: "./assets/chocolate-brownie.png",
        desc: "Warm chocolate brownie topped with vanilla ice cream and hot fudge."
    },
    // Beverages
    {
        id: 17,
        name: "Creamy Cold Coffee",
        category: "beverages",
        price: 149,
        image: "./assets/cold-coffee.png",
        desc: "Refreshing cold coffee blended with ice cream and chocolate syrup."
    },
    // Fast Food
    {
        id: 18,
        name: "Steamed Chicken Momos",
        category: "fastfood",
        price: 129,
        image: "./assets/momos.png",
        desc: "Juicy chicken mince stuffed in thin wrappers, served with spicy dip."
    },
    // Italian
    {
        id: 19,
        name: "Alfredo Penne Pasta",
        category: "italian",
        price: 279,
        image: "./assets/pasta.png",
        desc: "Penne tossed in a rich, creamy cheese sauce with herbs and olives."
    }
];


let cart = [];

// DOM Elements
const menuGrid = document.getElementById('menuGrid');
const cartCount = document.getElementById('cartCount');
const cartSidebar = document.getElementById('cartSidebar');
const cartItemsList = document.getElementById('cartItemsList');
const cartTotal = document.getElementById('cartTotal');
const cartToggle = document.getElementById('cartToggle');
const closeCart = document.getElementById('closeCart');
const checkoutBtn = document.getElementById('checkoutBtn');
const paymentModal = document.getElementById('paymentModal');
const loginModal = document.getElementById('loginModal');
const loginBtn = document.getElementById('loginBtn');
const categoryBtns = document.querySelectorAll('.category-btn');
const trackerModal = document.getElementById('trackerModal');
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const mobileSidebar = document.getElementById('mobileSidebar');
const closeMobileMenu = document.getElementById('closeMobileMenu');

// Initialize Menu
function displayMenuItems(items) {
    menuGrid.innerHTML = items.map(item => `
        <div class="menu-card" data-category="${item.category}">
            <img src="${item.image}" alt="${item.name}" class="menu-img">
            <div class="menu-content">
                <h3>${item.name}</h3>
                <p>${item.desc}</p>
                <div class="menu-footer">
                    <span class="price">₹${item.price}</span>
                    <button class="add-btn" onclick="addToCart(${item.id})">
                        <i class="fas fa-plus"></i> Add
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

// Category Filtering
categoryBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        categoryBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const category = btn.dataset.category;

        if (category === 'all') {
            displayMenuItems(menuItems);
        } else {
            const filtered = menuItems.filter(item => item.category === category);
            displayMenuItems(filtered);
        }
    });
});

// Cart Functions
function addToCart(id) {
    const item = menuItems.find(i => i.id === id);
    const cartItem = cart.find(i => i.id === id);

    if (cartItem) {
        cartItem.quantity++;
    } else {
        cart.push({ ...item, quantity: 1 });
    }

    updateCart();
    openCartSidebar();
}

function updateCart() {
    // Update Count
    const totalCount = cart.reduce((acc, item) => acc + item.quantity, 0);
    cartCount.innerText = totalCount;

    // Update List
    cartItemsList.innerHTML = cart.map(item => `
        <div class="cart-item">
            <img src="${item.image}" alt="${item.name}">
            <div class="item-info">
                <h4>${item.name}</h4>
                <p>₹${item.price} x ${item.quantity}</p>
            </div>
            <div style="margin-left: auto;">
                <i class="fas fa-trash-alt" style="color: #ff4d4d; cursor: pointer;" onclick="removeFromCart(${item.id})"></i>
            </div>
        </div>
    `).join('');

    // Update Total
    const total = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    cartTotal.innerText = `₹${total}`;
}

function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    updateCart();
}

// UI Handlers
function openCartSidebar() {
    cartSidebar.classList.add('active');
}

cartToggle.addEventListener('click', openCartSidebar);
closeCart.addEventListener('click', () => cartSidebar.classList.remove('active'));

// Payment Simulation
checkoutBtn.addEventListener('click', () => {
    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }
    cartSidebar.classList.remove('active');
    paymentModal.classList.add('active');
});

function closeModal() {
    paymentModal.classList.remove('active');
}

window.startPayment = async function (method) {
    const phone = document.getElementById('checkoutPhone').value;
    const address = document.getElementById('checkoutAddress').value;

    if (!phone || !address) {
        alert("Please enter delivery address and phone number.");
        return;
    }

    const initial = document.getElementById('initialPaymentState');
    const processing = document.getElementById('processingState');
    const success = document.getElementById('successState');

    initial.style.display = 'none';
    processing.style.display = 'block';

    const totalStr = cartTotal.innerText.replace('₹', '');
    const totalPrice = parseFloat(totalStr);

    try {
        const { error } = await supabaseClient
            .from('orders')
            .insert([{
                user_id: currentUser ? currentUser.id : null,
                cart_items: JSON.stringify(cart),
                total_price: totalPrice,
                delivery_address: address,
                contact_number: phone
            }]);
        
        if (!error) {
            paymentModal.classList.remove('active');
            cart = [];
            updateCart();
            
            showToast("Order Accepted by Restaurant!");
            trackerModal.classList.add('active');
            
            setTimeout(() => {
                initTrackerMap();
            }, 300);
            
            initial.style.display = 'block';
            processing.style.display = 'none';
        } else {
            alert("Failed to place order: " + error.message);
            initial.style.display = 'block';
            processing.style.display = 'none';
        }
    } catch (err) {
        alert("Database connection error.");
        initial.style.display = 'block';
        processing.style.display = 'none';
    }
}

// Login Simulation
loginBtn.addEventListener('click', (e) => {
    e.preventDefault();
    loginModal.classList.add('active');
});

// Auth State
let isLoginMode = true;
let currentUser = JSON.parse(localStorage.getItem('foodCourtUser')) || null;

// If user is already logged in from a previous session, update UI immediately
if (currentUser) {
    loginBtn.innerHTML = `<i class="fas fa-user"></i> ${currentUser.name}`;
    loginBtn.style.background = '#28a745';
}

window.toggleAuthMode = function() {
    isLoginMode = !isLoginMode;
    const nameInput = document.getElementById('authName');
    const title = document.getElementById('authTitle');
    const subtitle = document.getElementById('authSubtitle');
    const submitBtn = document.getElementById('authSubmitBtn');
    const toggleText = document.getElementById('authToggleText');
    const toggleLink = document.getElementById('authToggleLink');

    if (isLoginMode) {
        nameInput.style.display = 'none';
        title.innerText = 'Welcome Back';
        subtitle.innerText = 'Log in to access your saved addresses and orders.';
        submitBtn.innerText = 'Log In';
        toggleText.innerText = 'Don\'t have an account?';
        toggleLink.innerText = 'Register';
    } else {
        nameInput.style.display = 'block';
        title.innerText = 'Create Account';
        subtitle.innerText = 'Join us to experience premium food delivery.';
        submitBtn.innerText = 'Register';
        toggleText.innerText = 'Already have an account?';
        toggleLink.innerText = 'Log In';
    }
};

window.handleAuth = async function() {
    const name = document.getElementById('authName').value;
    const email = document.getElementById('authEmail').value;
    const password = document.getElementById('authPassword').value;
    const submitBtn = document.getElementById('authSubmitBtn');
    
    if (!email || !password || (!isLoginMode && !name)) {
        alert("Please fill all required fields");
        return;
    }

    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
    
    try {
        if (isLoginMode) {
            const { data, error } = await supabaseClient
                .from('users')
                .select('*')
                .eq('email', email)
                .eq('password', password)
                .single();
                
            if (error || !data) {
                alert("Authentication failed: Invalid credentials");
                return;
            }
            currentUser = data;
        } else {
            const { data: existingUser } = await supabaseClient
                .from('users')
                .select('*')
                .eq('email', email)
                .maybeSingle();
                
            if (existingUser) {
                alert("Email already registered!");
                return;
            }
            
            const { data, error } = await supabaseClient
                .from('users')
                .insert([{ name, email, password }])
                .select()
                .single();
                
            if (error) {
                alert("Registration failed: " + error.message);
                return;
            }
            currentUser = data;
        }
        
        closeLoginModal();
        localStorage.setItem('foodCourtUser', JSON.stringify(currentUser));
        loginBtn.innerHTML = `<i class="fas fa-user"></i> ${currentUser.name}`;
        loginBtn.style.background = '#28a745';
        alert(isLoginMode ? "Logged in successfully!" : "Registered successfully!");
    } catch (err) {
        alert("Database connection error. Check your internet or Supabase configuration.");
    } finally {
        submitBtn.innerText = isLoginMode ? 'Log In' : 'Register';
    }
};

window.closeLoginModal = function () {
    loginModal.classList.remove('active');
}

window.finishPayment = function() {
    paymentModal.classList.remove('active');
    document.getElementById('successState').style.display = 'none';
    document.getElementById('initialPaymentState').style.display = 'block';
}

// Scroll Animations
window.addEventListener('scroll', () => {
    const animatedElements = document.querySelectorAll('.animate');
    animatedElements.forEach(el => {
        const position = el.getBoundingClientRect().top;
        if (position < window.innerHeight - 100) {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        }
    });
});

// Initial Display
displayMenuItems(menuItems);

function showToast(message) {
    const container = document.getElementById('toastContainer');
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `<i class="fas fa-check-circle"></i> <span>${message}</span>`;
    container.appendChild(toast);
    
    setTimeout(() => toast.classList.add('show'), 10);
    
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

let mapInstance = null;
window.initTrackerMap = function() {
    const distanceKm = (Math.random() * 3 + 1).toFixed(1);
    const etaMins = Math.floor(distanceKm * 6 + 10);
    
    document.getElementById('trackerDistance').innerText = `${distanceKm} km`;
    document.getElementById('trackerEta').innerText = `${etaMins} mins`;

    if (!mapInstance) {
        mapInstance = L.map('map').setView([19.0760, 72.8777], 13);
        L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
            attribution: '&copy; OpenStreetMap contributors'
        }).addTo(mapInstance);
    }
    
    const restaurantLat = 19.0760 + (Math.random() - 0.5) * 0.05;
    const restaurantLng = 72.8777 + (Math.random() - 0.5) * 0.05;
    
    const userLat = restaurantLat + (Math.random() - 0.5) * 0.05;
    const userLng = restaurantLng + (Math.random() - 0.5) * 0.05;

    const resIcon = L.divIcon({ html: '<i class="fas fa-store fa-2x" style="color:var(--primary);"></i>', className: 'custom-div-icon' });
    const userIcon = L.divIcon({ html: '<i class="fas fa-map-marker-alt fa-2x" style="color:#ff4d4d;"></i>', className: 'custom-div-icon' });

    mapInstance.eachLayer(layer => {
        if (layer instanceof L.Marker || layer instanceof L.Polyline) {
            mapInstance.removeLayer(layer);
        }
    });

    L.marker([restaurantLat, restaurantLng], {icon: resIcon}).addTo(mapInstance);
    L.marker([userLat, userLng], {icon: userIcon}).addTo(mapInstance);

    const latlngs = [[restaurantLat, restaurantLng], [userLat, userLng]];
    const polyline = L.polyline(latlngs, {color: '#ff8c00', dashArray: '5, 10', weight: 3}).addTo(mapInstance);
    mapInstance.fitBounds(polyline.getBounds(), {padding: [50, 50]});

    document.getElementById('step1').classList.add('active');
    document.getElementById('step2').classList.remove('active');
    document.getElementById('step3').classList.remove('active');
    
    setTimeout(() => { document.getElementById('step2').classList.add('active'); }, 4000);
    setTimeout(() => { document.getElementById('step3').classList.add('active'); }, 8000);
}

window.closeTracker = function() {
    trackerModal.classList.remove('active');
}

// Mobile Sidebar Logic
if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', () => {
        mobileSidebar.classList.add('active');
    });
}

if (closeMobileMenu) {
    closeMobileMenu.addEventListener('click', () => {
        mobileSidebar.classList.remove('active');
    });
}

window.closeMobileMenuFunc = function() {
    mobileSidebar.classList.remove('active');
}
