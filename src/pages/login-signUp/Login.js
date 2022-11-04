import Layout from "../../layout/Layout";
import './signup-Login.css';
import { useFormik } from 'formik'
import * as Yup from 'yup'
import loginUser from "../../services/loginService";
import { toast } from "react-toastify";
import { useNavigate, useSearchParams } from "react-router-dom";
import {useLogedInAction } from "../../context/LogedInProvider";

const validationSchema = Yup.object({
    email: Yup.string()
        .required("email is required !")
        .email('email in not valid !'),
    password: Yup.string()
        .required("password is required !")
        .matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
            'must contain Minimum eight characters, at least one letter, one number !'
        ),
})


const Login = () => {

    const setLogedIn = useLogedInAction()

    const navigate = useNavigate()
    const [searchParam] = useSearchParams()
    const redirect = searchParam.get('redirect')

    const onSubmit = async (values)=>{
        const user = {
            email:values.email,
            password:values.password,
        }
        try {
            const {data} = await loginUser(user)
            setLogedIn(data)
            localStorage.setItem('user',JSON.stringify(data) )
            toast.success(`you are login successfully`)
            navigate(redirect)
            console.log(data); 
        } catch (error) {  
            toast.error(error.response.data.message)
        }
    }
    const formik = useFormik({
        initialValues: { username: "", email: "", password: "", password2: "" },
        onSubmit,
        validateOnMount: true,
        validationSchema,
    })

    console.log(formik.errors.username);
    return (
        <Layout>
            <main className="formContainer">
                <form onSubmit={formik.handleSubmit}>
                    <h2>Login form</h2>
                    <div className="form-control">
                        <label>email</label>
                        <input
                            type="text"
                            onChange={formik.handleChange}
                            value={formik.values.email}
                            name="email"
                        />
                        {formik.errors.email && formik.touched.email && (
                            <div className="error">{formik.errors.email}</div>
                        )}
                    </div>

                    <div className="form-control">
                        <label>password</label>
                        <input
                            type="password"
                            onChange={formik.handleChange}
                            value={formik.values.password}
                            name="password"
                        />
                        {formik.errors.password && formik.touched.password && (
                            <div className="error">{formik.errors.password}</div>
                        )}
                    </div>
                    <button type="submit">Login</button>
                </form>
            </main>
        </Layout>
    );
}

export default Login;