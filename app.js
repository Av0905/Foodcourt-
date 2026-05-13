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
const categoryBtns = document.querySelectorAll('.category-btn');

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

window.startPayment = function (method) {
    const initial = document.getElementById('initialPaymentState');
    const processing = document.getElementById('processingState');
    const success = document.getElementById('successState');

    initial.style.display = 'none';
    processing.style.display = 'block';

    // Simulate Payment Gateway Logic
    setTimeout(() => {
        processing.style.display = 'none';
        success.style.display = 'block';
        cart = [];
        updateCart();
    }, 2500);
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
