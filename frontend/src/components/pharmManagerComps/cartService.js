import Cart from './cart';
import CartItem from './cartItem';

export class CartService {
    getCart() {
        return window.cart || new Cart();
    }

    addToCart(product) {
        let cart = window.cart || new Cart();
        let existing = cart.items.find(x => x.product.id === product.id);
        if (existing) {
            existing.quantity += 1;
            existing.sell_price = existing.product.sell_price * existing.quantity;
        } else {
            cart.items.push(new CartItem(product, 1, product.sell_price));
        }

        cart.total = cart.items.map(x => x.sell_price).reduce((x, y) => x + y);
        window.cart = cart;
    }

    removeItem(id) {
        let cart = window.cart
            for(var i = 0; i < cart.length; i++) {
            if(cart[i].id === id) {
                cart.splice(i, 1);
            }
        }
    }
}


export default CartService;