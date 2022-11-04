export const CartReducer = (state, action) => {
    switch (action.type) {
        case 'add_to_cart': {
            const updateCart = [...state.cart];
            const index = updateCart.findIndex((c) => c.id === action.payload.id)
            if (index < 0) {
                updateCart.push({ ...action.payload, quantity: 1 })
            } else {
                const cart = { ...updateCart[index] };
                cart.quantity++;
                updateCart[index] = cart
            }
            return { ...state, cart: updateCart, total: state.total + action.payload.price }
        }
        case 'increment': {
            const updateCart = [...state.cart];
            const index = updateCart.findIndex((c) => c.id === action.payload.id)
            const updateCartIndex = { ...updateCart[index] }
            updateCartIndex.quantity++;
            updateCart[index] = updateCartIndex
            return { ...state, cart: updateCart, total: state.total + action.payload.price }
        }
        case 'decrement': {
            const updateCart = [...state.cart];
            const index = updateCart.findIndex((c) => c.id === action.payload.id)
            const updateCartIndex = { ...updateCart[index] }
            if (updateCartIndex.quantity === 1) {
                updateCart.splice(index, 1)
            } else {
                updateCartIndex.quantity--;
                updateCart[index] = updateCartIndex
            }

            return { ...state, cart: updateCart, total: state.total - action.payload.price }
        }
        default:
            return state;
    }
}