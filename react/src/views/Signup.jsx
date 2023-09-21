import { useRef, useState } from "react"
import { Link } from "react-router-dom"
import axiosClient from "../axios-client";
import { useStateContext } from "../contexts/ContextProvider";

// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';


export default function Signup() {

    const nameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const PasswordconfirmationRef = useRef();

    const [errors, setErrors] = useState(null)
    const { setUser, setToken } = useStateContext()

    // const res = () => toast (
    //     errors
    //   );

    const onSubmit = (ev) => {
        ev.preventDefault()
        const payload = {
            name: nameRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value,
            password_confirmation: PasswordconfirmationRef.current.value
        }
        // console.log(payload);
        axiosClient.post('/signup', payload)
            .then(({ data }) => {
                setUser(data.user)
                setToken(data.token)

            })
            .catch(err => {
                const response = err.response;
                if (response && response.status === 422) {
                    //   console.log(response.data.errors);  \
                    setErrors(response.data.errors.name[0])
                    // console.log();
                }
            })
    }

    const [passwordType, setPasswordType] = useState("password");
    const [passwordInput, setPasswordInput] = useState("");
    const [confirmPasswordtype, setConfirmPasswordtype] = useState("password")
    const [confirmPasswordinput, setConfirmPasswordinput] = useState("")
    const handlePasswordChange = (e) => {
        setPasswordInput(e.target.value);
    }
    const handleConPasswordChange = (e) => {
        setConfirmPasswordinput(e.target.value);
    }
    const togglePassword = () => {
        if (passwordType === "password") {
            setPasswordType("text")
            return;
        }
        setPasswordType("password")
    }

    const toggleConPassword = () => {
        if (confirmPasswordtype === "password") {
            setConfirmPasswordtype("text")
            return;
        }
        setConfirmPasswordtype("password")
    }


    function Aleart() {
        return (
            alert("SignUp Completed")
        )
    }

    return (

        <div className='mainContainerSign'>
            <div className='logoSignin'>
                <h1 className='logoIMSSignin'>Inventory</h1>
            </div>
            <div className="signFlexElement">
                <div className='sideimageSignin'>
                    <img id="sideImgSignin" class src="src/assets/login-image/FrameloginSignup.png"></img>
                </div>
                <div className="signinPageBox">
                    <div className='signinBoxHeading'>
                        <div className='welcomeNameSignin'>
                            <h2 className="signUpWelcome">Hi Welcome back</h2>
                        </div>
                        <div className='SignInWith'>
                            <p className='Sign'>Sign in with your credentials</p>
                        </div>
                    </div>
                    <form onSubmit={onSubmit} id="allForm">
                        <div className='nameContentSignin'>

                            <div className='namelablesSignin'>
                                <label className='nameLableSignin'>Name <span className="requiredField" >*</span></label>
                            </div>
                            <div className='emailInputSignin'>
                                <input ref={nameRef} type="text" className='nameInputSign' placeholder="Enter your Name" />
                            </div>
                        </div>
                        <div className='emailContentSignin'>

                            <div className='emailablesSignin'>
                                <label className='emailLableSignin'>Email <span className="requiredField" >*</span></label>
                            </div>
                            <div className='emailInputSignin'>
                                <input ref={emailRef} type="email" className='emailinputSignin' placeholder="Enter your Email" />
                            </div>
                        </div>
                        <div className='passwordSignin'>
                            <div className='passwordLablesSignin'>
                                <label className='passLableSignin'>Password <span className="requiredField" >*</span></label>
                            </div>
                            <div className='passworIinputSignin'>
                                <input ref={PasswordconfirmationRef} type={confirmPasswordtype} onChange={handleConPasswordChange} className='passwordInputSign' value={confirmPasswordinput} placeholder="Enter your Password" />
                                <div className="passEyeBtn" onClick={toggleConPassword}>
                                    {confirmPasswordtype == "password" ? <i className="fa-solid fa-eye-slash" style={{ color: "#fff",cursor: 'pointer' }}></i> : <i className="fa-solid fa-eye" style={{ color: "#0DF2DC",cursor: 'pointer' }}></i>}
                                </div>
                            </div>
                        </div>
                        <div className='confirmpasswordSignin'>
                            <div className='conPasswordLablesSignin'>
                                <label className='conPassLableSignin'>Confirm Password <span className="requiredField" >*</span></label>
                            </div>
                            <div className='passworIinputSignin'>
                                <input ref={passwordRef} type={passwordType} onChange={handlePasswordChange} value={passwordInput} className='confirmpasswordInputSign' placeholder="Enter your Password" />
                                <div className="conEyeBtn" onClick={togglePassword}>
                                    {passwordType === "password" ? <i className="fa-solid fa-eye-slash" style={{ color: "#fff", cursor: 'pointer' }}></i> : <i className="fa-solid fa-eye" style={{ color: "#0DF2DC", cursor: 'pointer' }}></i>}
                                </div>
                            </div>
                        </div>
                        <div className='btnSignin'>
                            <button className='SigninBtn'>Signup</button>
                        </div>
                    </form>
                    <p className="goLoginpage">
                        Already Registered? <Link to="/login" style={{ borderStyle: "none" }}><span className="goLoginPageSpan">Login</span></Link>
                    </p>
                    {/* <button className="signinWithGoogle" onClick={Aleart}>
                        <img className="fa-brands fa-google" id="googleLogoIcon" src="src/assets/images/google.png"/>
                        <p className="signinGoogle">Signin With Google</p>
                    </button> */}
                </div>
                {/* <ToastContainer /> */}
            </div>
        </div>
    )

}










        //             <div className="login-signup-form animated fadeInDown">
        //     <div className="form">
        //         <form onSubmit={onSubmit}>
        //             <h1 className="title">Signup for free</h1>
        //             {errors && <div className="alert">
        //                     {Object.keys(errors).map(key => (
        //                         <p key={key}>{errors[key][0]}</p>
        //                     ))}
        //                 </div>
        //             }
        //             <input ref={nameRef} type="text" placeholder="FullName" />
        //             <input ref={emailRef} type="email" placeholder="Email" />
        //             <input ref={passwordRef} type="password" placeholder="Password" />
        //             <input ref={PasswordconfirmationRef} type="password" placeholder="Passwordconfirmation" />
        //             <button className="btn btn-block">Signup</button>
        //             <p className="message">
        //                     Not Registered? <Link to="/login">Login</Link>
        //             </p>
        //         </form>
        //     </div>

        // </div>