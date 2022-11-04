import { NavLink } from 'react-router-dom'
import { BiLogIn, BiCartAlt,BiUser} from 'react-icons/bi'
import './navigation.css'
import { useCart } from '../../context/CartProvider'
import { useLogedIn } from '../../context/LogedInProvider'
import { useEffect, useState } from 'react'
const Navigation = () => {
    const { cart } = useCart()
    const isLogIn = useLogedIn()
    const [width,setWidth] = useState(window.innerWidth)
    const updateWidth = ()=>{
        setWidth(window.innerWidth)
    }
    useEffect(()=>{
        window.addEventListener('resize',updateWidth)
        return ()=>{
            window.removeEventListener('resize',updateWidth)
        }
    },[width])
    console.log(width);
    return (
        <header className='navbar'>
            <nav>
                <ul>
                    <li>
                        <NavLink to="/" className={(nav) => nav.isActive ? "active" : ""} end>Home</NavLink>
                    </li>
                </ul>
                <div className='login-basket'>
                    <div className='login-btn'>
                        <NavLink to={isLogIn ? "/user-pannel": "/SignUp"}>
                            { width > 420 ? (
                                <button>
                                    {isLogIn ? (isLogIn.name ) : ( 'login / signup')}
                                    {isLogIn ? <BiUser /> :<BiLogIn /> }
                                </button>
                            ):(
                                <button>
                                    {isLogIn ? <BiUser /> :<BiLogIn />}
                                </button>
                            )
                            }
                        </NavLink>
                    </div>
                    <div className='cart-box'>
                        <NavLink to="/cart">
                            <div className='shopping-basket'>
                                <BiCartAlt />
                                <span className={cart.length ? 'carts-number' : ''}>{cart.length > 0 && cart.length}</span>
                            </div>
                        </NavLink>
                    </div>

                </div>
            </nav>
        </header>
    );
}

export default Navigation;