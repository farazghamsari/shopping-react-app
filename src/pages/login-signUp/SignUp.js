import Layout from "../../layout/Layout";
import './signup-Login.css';
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import signupUser from "../../services/sigupService";
import { toast } from 'react-toastify'
import { useLogedInAction } from "../../context/LogedInProvider";

const validationSchema = Yup.object({

    username: Yup.string()
        .required("name is required !")
        .matches(/^(?=.{6,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/,
            'username in not valid !'
        ),
    email: Yup.string()
        .required("email is required !")
        .email('email in not valid !'),
    phone:Yup.string()
        .required("phone number is required !")
        .matches(/^[0-9]{11}$/,'phone number is not valid !')
        .nullable(),
    password: Yup.string()
        .required("password is required !")
        .matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
            'must contain Minimum eight characters, at least one letter, one number !'
        ),
    password2: Yup.string()
        .required("confirm password is required !")
        .oneOf([Yup.ref('password'), null],
            'passwords not match !'
        ),
})



const SignUp = () => {
    const navigate = useNavigate()
    const setLogedIn = useLogedInAction()
    const [searchParam] = useSearchParams()
    const redirect = searchParam.get('redirect')
    console.log(redirect);
  const onSubmit = async(values)=>{
        const user = {
            name:values.username,
            email:values.email,
            phoneNumber:values.phone,   
            password:values.password,
        }
        try {
           const {data} = await signupUser(user)
           toast.success(`welcome dear ${user.name} `)
           setLogedIn(data)
           localStorage.setItem('user',JSON.stringify(data) )
           navigate(redirect)
        } catch (error) {  
            toast.error(error.response.data.message)
        }
       
    }  
    
    const formik = useFormik({
        initialValues: { username: "", email: "",phone:"", password: "", password2: "" },
        onSubmit,
        validationSchema,
        validateOnMount: true,
    })

    return (
        <Layout>
            <main className="formContainer">
                <form onSubmit={formik.handleSubmit}>
                    <h2>sign up form</h2>
                    <div className="form-control">
                        <label>username</label>
                        <input
                            type="text"
                            onChange={formik.handleChange}
                            value={formik.values.username}
                            name="username"
                        />
                        {formik.errors.username && formik.touched.username && (
                            <div className="error">{formik.errors.username}</div>
                        )}
                    </div>
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
                        <label>phone number</label>
                        <input
                            type="text"
                            onChange={formik.handleChange}
                            value={formik.values.phone}
                            name="phone"
                        />
                        {formik.errors.phone && formik.touched.phone && (
                            <div className="error">{formik.errors.phone}</div>
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
                    <div className="form-control">
                        <label>confirm password</label>
                        <input
                            type="password"
                            onChange={formik.handleChange}
                            value={formik.values.password2}
                            name="password2"
                        />
                        {formik.errors.password2 && formik.touched.password2 && (
                            <div className="error">{formik.errors.password2}</div>
                        )}
                    </div>
                    <button type="submit" >Submit</button>
                    <div className="loginLink">
                        Already a member ?
                        <Link to={`/Login?redirect=${redirect}`}>
                            Login
                        </Link>
                    </div>
                </form>
            </main>
        </Layout>
    );
}

export default SignUp;