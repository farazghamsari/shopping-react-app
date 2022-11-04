import { Link } from "react-router-dom";
import { useCart, useCartActions } from "../../context/CartProvider";
import { toast } from 'react-toastify'

const isInCart = (cart, product) => {
    return cart.some((c) => c.id === product.id)
}
console.log(isInCart);
const Product = (product) => {
    const dispatch = useCartActions();
    const { cart } = useCart();
    const addProductToBasket = (product) => {
        dispatch({ type: "add_to_cart", payload: product })
        toast.success(`${product.name} add to cart successfully`)
    }
    return (
        <div className="product" key={product.id}>
            <div className="cart-img">
                <img src={product.image} alt={product.name}></img>
            </div>
            <div className="cart-detail">
                <p>{product.name}</p>
                <p>$ {product.price}</p>
                <button onClick={() => addProductToBasket(product)}>{isInCart(cart, product) ? (
                    <Link to='/cart'>complete purchase</Link>
                )
                    : 'Add to cart'}</button>
            </div>
        </div>
    );
}

export default Product;