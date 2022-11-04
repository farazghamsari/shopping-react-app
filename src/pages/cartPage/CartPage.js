import { useCart, useCartActions } from "../../context/CartProvider";
import { BiTrash } from 'react-icons/bi'
import Layout from "../../layout/Layout";
import style from './cartPage.module.css'
import { Link } from "react-router-dom";
import { useLogedIn } from "../../context/LogedInProvider";
const CartPage = () => {
    const { cart, total } = useCart()
    const dispatch = useCartActions()
    const isLogin = useLogedIn()
    const incrementHandler = (cart) => {
        dispatch({ type: "increment", payload: cart })
    }
    const decrementHandler = (cart) => {
        dispatch({ type: "decrement", payload: cart })
    }
    console.log(cart);
    return (
        <Layout>
            <main className={style.container}>
                <div className={style.carts}>
                    {cart.length ? cart.map((c) => (
                        <div className={style.cart} key={c.id}>
                            <div className={style.cartImg}>
                                <img src={c.image} alt={c.name}></img>
                            </div>
                            <div className={style.cartDetail}>
                                <div className={style.cartPrice}>
                                    <p>{c.name}</p>
                                    <p>$ {c.price}</p>
                                </div>
                                <div className={style.btns}>
                                    <button className={style.decrement} onClick={() => decrementHandler(c)}>
                                        {c.quantity > 1 ? "-" : <BiTrash />}
                                    </button >
                                    <span>{c.quantity}</span>
                                    <button className={style.increment} onClick={() => incrementHandler(c)}>+</button>
                                </div>   
                            </div>
                            
                        </div>
                    )
                    ) : (
                        <div className={style.noProduct}>
                            <h2>You dont have any Product ...</h2>
                            <Link to='/' >
                                <button>go to products List</button>
                            </Link>
                        </div>
                    )}
                </div>
                <div className={style.totalPrice}>
                    <div className={style.totalDetails}>
                        <p>products price ({cart.length})</p>
                        <p>{total}</p>
                    </div>
                    <div className={style.totalDetails}>
                        <p>total price </p>
                        <p>{total}</p>
                    </div>
                    <Link to={isLogin ? '/user-pannel' : '/signUp?redirect=/user-Pannel'}>
                        <button className={style.purchaseBtn}>complete purchase</button>
                    </Link>
                </div>
            </main>
        </Layout>
    );
}

export default CartPage;