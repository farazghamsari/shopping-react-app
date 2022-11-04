import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import './app.css'
import CartProvider from "./context/CartProvider";
import LogedInProvider from "./context/LogedInProvider";
import CartPage from "./pages/cartPage/CartPage";
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import Login from "./pages/login-signUp/Login";
import SignUp from "./pages/login-signUp/SignUp";
import UserPannel from "./pages/userPannel/UserPannel";
const App = () => {
    return (
        <BrowserRouter>
            <LogedInProvider>
                <CartProvider>
                    <ToastContainer />
                    <Routes>
                        <Route path="/Login" element={<Login />} />
                        <Route path="/signUp" element={<SignUp />} />
                        <Route path="/user-pannel" element={<UserPannel />} />
                        <Route path="/cart" element={<CartPage />} />
                        <Route path="/" element={<HomePage />} />
                    </Routes>
                </CartProvider>   
            </LogedInProvider>  
        </BrowserRouter>

    );
}

export default App;