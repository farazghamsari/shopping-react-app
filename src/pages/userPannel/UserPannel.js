import { useCart } from "../../context/CartProvider";
import { useLogedIn } from "../../context/LogedInProvider";
import Layout from "../../layout/Layout";
import './userPannel.css'
const UserPannel = () => {
    const userData = useLogedIn()
    const {cart,total} = useCart()
    console.log(cart);
    return ( 
        <Layout>
            <main className="user-pannel">
                <div className="user-info">
                    <p>username : {userData.name}</p>
                    <p>phone number : {userData.phoneNumber}</p>
                    <p>email : {userData.email}</p>
                </div>
                <div className="user-purchase">
                    <div className="products-price" >
                        {cart.length>0 ? 
                        (cart.map((c)=>(
                            <div key={c.id} className='product-detail'>
                                <p >{`${c.name} (${c.quantity}) : `}</p>
                                <p>{`${c.price * c.quantity} $`}</p>
                            </div>
                           
                        ))):(
                            <div className="product-detail">
                                you dont have any product !
                            </div>
                        )}
                        <div  className='product-detail-total'>
                                <p >total price : </p>
                                <p>{total} $</p>
                        </div>    
                    </div>
                    <button>purchase</button>
                </div>
            </main>
        </Layout>
     );
}
 
export default UserPannel;