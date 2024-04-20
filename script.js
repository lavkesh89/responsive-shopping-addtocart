let quantity = 1;
let selectedColor = '';
let selectedSize = '';
let cart = [];

const addToCartBtn = document.querySelector('.add-to-cart');
const cartSidebar = document.querySelector('.cart-sidebar');
const closeCartBtn = document.querySelector('.close-cart');
const cartItems = document.querySelector('.cart-items');
const cartTotal = document.querySelector('.cart-total');
let iconCartSpan = document.querySelector('.icon-cart span');

function incrementQuantity() {
    quantity++;
    document.getElementById("quantity").textContent = quantity;
}

function decrementQuantity() {
    if (quantity > 1) {
        quantity--;
        document.getElementById("quantity").textContent = quantity;
    }
}

function selectColor(colorOption) {
    const colorOptions = document.querySelectorAll('.color-option');
    colorOptions.forEach(option => {
        option.style.border = 'none';
    });

    colorOption.style.border = '2px solid black';
    selectedColor = colorOption.dataset.color;
}


function addToCart() {
    const sizeRadios = document.querySelectorAll('input[name="size"]');
    let selectedSize;
    sizeRadios.forEach(radio => {
        if (radio.checked) {
            selectedSize = radio.value;
        }
    });

    iconCartSpan.innerHTML=`${quantity}`; // write the icon increment value
    

    const product = {
        color: selectedColor,
        size: selectedSize,
        quantity: quantity
    };

    const existingProductIndex = cart.findIndex(item =>
        item.color === product.color && item.size === product.size
    );

    if (existingProductIndex !== -1) {
        cart[existingProductIndex].quantity += product.quantity;
    } else {
        cart.push(product);
    }

    updateCart();
    openCart();
    
    // quantity = 1;
    // document.getElementById("quantity").textContent = quantity;
}

addToCartBtn.addEventListener('click', addToCart);

closeCartBtn.addEventListener('click', closeCart);

function openCart() {
    cartSidebar.classList.add('open');
}

function closeCart() {
    cartSidebar.classList.remove('open');
}

function updateCart() {
    cartItems.innerHTML = '';
    let total = 0;

    cart.forEach((item, index) => {
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');
        cartItem.innerHTML = `
            <span>Color: ${item.color}</span>
            <span>Size: ${item.size}</span>
            <span>Quantity: ${item.quantity}</span>
            <button class="remove-item" onclick="removeItem(${index})">Remove</button>
        `;
        cartItems.appendChild(cartItem);
        total += item.quantity;
    });

    cartTotal.querySelector('p').textContent = `Total: ${total} Items`;
}

function removeItem(index) {
    cart.splice(index, 1);
    updateCart();
}
