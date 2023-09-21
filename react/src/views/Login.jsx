import { useRef, useState } from "react";
import { Link } from "react-router-dom"
import { useStateContext } from "../contexts/ContextProvider";
import axiosClient from "../axios-client";

// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';


export default function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();

  const [errors, setErrors] = useState("gokul")

  const { setUser, setToken } = useStateContext()
  const onSubmit = (ev) => {
    ev.preventDefault()
    const payload = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    }


    axiosClient.post('/login', payload)
      .then(({ data }) => {
        setUser(data.user)
        setToken(data.token)

      })
      .catch(err => {
        // debugger;
        const response = err.response;
        if (response && response.status === 422) {
          if (response.data.errors) {
            setErrors(response.data.errors.password[0])
            // toast(response.data.errors);
            // setErrors
            // console.log(response.data.errors.email[0]);
          }
          else {
            setErrors({
              email: [response.data.message]
            })
          }

          // errors.map(error => {
          // for (let i = 0; i < errors.length; i++) {
          //   console.log(errors[i].email);
            
          // }
        }
      })

  }
  const [passwordType, setPasswordType] = useState("password");
  const [passwordInput, setPasswordInput] = useState("");

  const handlePasswordChange = (e) => {
    setPasswordInput(e.target.value);
  }

const togglePassword = () => {
  if (passwordType === "password") {
      setPasswordType("text")
      return;
  }
  setPasswordType("password")
  }


  // const res = () => toast (
  //   errors
  // );

  return (
    <div className='mainContainer'>
      <div className='logo'>
        <h1 className='logoIMS'>Inventory</h1>
      </div>
      <div className='loginBox'>
        <div className='loginBoxHeading'>
          <div className='welcomeName'>
            <h2>Hi Welcome back</h2>
          </div>
          <div className='SignInWith'>
            <p className='Sign'>Login with your credentials</p>
          </div>
        </div>
        <form onSubmit={onSubmit}>
          <div className='emailContent'>
            <div className='emailables'>
              <label className='emailLable'>Email <span className="requiredField">*</span></label>
            </div>
            <div className='emailInput'>
              <input ref={emailRef} type="email" className='emailinput' placeholder="Enter your Email" />
            </div>
          </div>
          <div className='password'>
            <div className='passwordLables'>
              <label className='passLable'>Password <span className="requiredField">*</span></label>
            </div>
            <div className='passworIinput'>
              <input ref={passwordRef} type={passwordType} onChange={handlePasswordChange} className='passwordInput' value={passwordInput} placeholder="Enter your Password" />
              <div className="loginEyeBtn" onClick={togglePassword}>
              {passwordType === "password" ? <i className="fa-solid fa-eye-slash" style={{color:"#fff"}}></i> : <i className="fa-solid fa-eye" style={{color:"#0DF2DC"}}></i>}
              </div>
            </div>
          </div>
          <div className='btn'>
            <button className='LoginBtn' >Login</button>
          </div>
        </form>
        {/* <ToastContainer /> */}
        {/* <div className="error">

          
        </div> */}
        <p className="gosigninPage">
          Not Registered? <Link to="/signup" style={{borderStyle : "none"}}><span className="goSignupPageSpan">Create an Account</span></Link>
        </p>
      </div>
      <div className='sideimage'>
        <img className="sideImg" src="src/assets/login-image/FrameloginSignup.png"></img>
      </div>
    </div>
    // <div className="login-signup-form animated fadeInDown">
    //     <div className="form">
    //         <form onSubmit={onSubmit}>
    //             <h1 className="title">Login in your Account</h1>
            //     {errors && <div className="alert">
            //         {Object.keys(errors).map(key => (
            //             <p key={key}>{errors[key][0]}</p>
            //         ))}                    

            // }
    //             <input ref={emailRef} type="email" placeholder="Email" />
    //             <input ref={passwordRef} type="password" placeholder="Password" />
    //             <button className="btn btn-block">Login</button>
    //             <p className="message">
    //                     Not Registered? <Link to="/signup">Create an account</Link>
    //             </p>
    //         </form>
    //     </div>

    // </div>
  )

}