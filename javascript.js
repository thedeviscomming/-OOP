class Product {
    constructor(productId, name, price) {
        this.productId = productId;
        this.name = name;
        this.price = price;
    }
}

class ShoppingCartItem {
    constructor(product, quantity) {
        this.product = product;
        this.quantity = quantity;
    }

    totalPrice() {
        return this.product.price * this.quantity;
    }
}

class ShoppingCart {
    constructor() {
        this.items = [];
    }

    addItem(product, quantity) {
        const existingItem = this.items.find(item => item.product.productId === product.productId);
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            this.items.push(new ShoppingCartItem(product, quantity));
        }
        this.displayCart();
    }

    removeItem(productId) {
        this.items = this.items.filter(item => item.product.productId !== productId);
        this.displayCart();
    }

    totalItems() {
        return this.items.reduce((total, item) => total + item.quantity, 0);
    }

    totalPrice() {
        return this.items.reduce((total, item) => total + item.totalPrice(), 0);
    }

    displayCart() {
        const cartDiv = document.getElementById('cart');
        cartDiv.innerHTML = '<h2>Articles du Panier</h2>';
        if (this.items.length === 0) {
            cartDiv.innerHTML += '<p>Le panier est vide.</p>';
            return;
        }
        this.items.forEach(item => {
            cartDiv.innerHTML += `
                <div class="cart-item">
                    <span>${item.product.name} (x${item.quantity})</span>
                    <span>${item.totalPrice().toFixed(2)} €</span>
                    <button onclick="cart.removeItem(${item.product.productId})">Supprimer</button>
                </div>
            `;
        });
        cartDiv.innerHTML += `
            <p>Total articles : ${this.totalItems()}</p>
            <p>Prix total : ${this.totalPrice().toFixed(2)} €</p>
        `;
    }
}

// Initialisation des produits
const product1 = new Product(1, "Pomme", 0.5);
const product2 = new Product(2, "Banane", 0.3);
const product3 = new Product(3, "Orange", 0.6);

// Création du panier
const cart = new ShoppingCart();

// Affichage des produits
const productList = document.getElementById('product-list');
const products = [product1, product2, product3];
products.forEach(product => {
    productList.innerHTML += `
        <div class="product">
            <span>${product.name} - ${product.price.toFixed(2)} €</span>
            <button onclick="cart.addItem(product${product.productId}, 1)">Ajouter au Panier</button>
        </div>
    `;
});

// Créer des variables globales pour les produits
products.forEach(product => {
    window[`product${product.productId}`] = product;
});
