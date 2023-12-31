import { Checkbox } from 'antd'
import Link from 'next/link'
import React, { useEffect } from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'



function Login({setLoggedIn}) {


    const [showPassword, setShowPassword] = React.useState(false);
    const [email,setEmail] = React.useState('')
    const [password,setPassword] = React.useState('')
    const [errors,setErrors] = React.useState('')
    const [count,setCount] = React.useState(0)
    const [loading,setLoading] = React.useState(false)
    let router = useRouter()

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };


    const handleLogin = async (e) => {
        e.preventDefault();
        if(!email || !password) {
            alert("Below fields cannot be empty")
            return;
        }

        if(password.length < 8) {
            return;
        }

        setLoading(true)
        let data = {
            "emailAddress": email,
            "password": password,
            "userType": "CaseOwner"
        }
        await axios.post("https://freshdeskdev.myairports.com.my/api/stardesk/login",JSON.stringify(data), {
            headers: {
                'Accept-Language': 'en-US',
                'Content-Type': 'application/json'

            }
        })
        .then(response => {
            localStorage.setItem('profile',JSON.stringify(response.data))
            setLoggedIn(true)
            router.push('/')
            setLoading(false)

        })
        .catch(err => {
            if(err.response?.data?.errors[0]?.errorMessage == 'Wrong password please try again') {
                alert(err.response?.data?.errors[0]?.errorMessage)
                setLoading(false)
                setCount(count + 1)
                if(count >= 5) {
                    setCount(0)
                    blockUser()
                }
                return;
            }
            setLoading(false)
            alert(err.response?.data?.errors[0]?.errorMessage)
        })
        
    }


    const blockUser = async () => {
        await axios.post(`https://freshdeskdev.myairports.com.my/api/stardesk/user-block?email=${email}&flag=true`,{}, {
            headers: {
                'Accept-Language': 'en-US',
                'Content-Type': 'application/json'

            }
        })
        .then(response => {
            console.log(response)
            setLoading(false)
            if(response.message == "success") {
                alert("")
            }
            
        })
        .catch(err => {
            setLoading(false)
        })
    }


  return (
    <div className="bg-padding">
        <div className="d-flex justify-content-center align-items-center vh-100">
            <div className="row justify-content-center w-100">
                <div className="col-lg-8">
                    <div className="card">
                        <div className="card-body p-0">
                            <div className="row">
                                <div className="col-lg-5 py-5 login-img text-center">
                                    <img src="/images/logo.png" className="logo" alt="not found" />
                                    <div className="mt-5"></div>
                                    <img src="/images/login-img.png" className='logo-img' alt="not found" />
                                </div>
                                <div className="col-lg-7">
                                    <div className="py-15">
                                        <h2 className='text-center'>Log In to your account</h2>
                                        {/* <h6>Signin to create, discover and connect with the global community</h6> */}
                                        <form className=" w-75 mx-auto" onSubmit={handleLogin}>
                                            <div className="form-group">
                                                {/* <label htmlFor="">Email/Employee ID</label> */}
                                                <input type="email" onChange={e => setEmail(e.target.value)} className='form-control shadow-none' placeholder='Email:' />
                                            </div>
                                            <div className="form-group mb-0" style={{position:'relative'}}>
                                                {/* <label htmlFor="">Password</label> */}
                                                <input type={showPassword ? 'text' : 'password'}
                                                        onChange={e => {
                                                            setPassword(e.target.value)
                                                            if(e.target.value.length == 0){
                                                                setErrors('')
                                                            }else if(e.target.value.length < 8 && e.target.value.length > 0) {
                                                                setErrors('Password cannot be less than 8 chars')
                                                            } else {
                                                                setErrors('')
                                                            }
                                                        }} 
                                                        className='form-control shadow-none' placeholder='Password:' 
                                                    />
                                                
                                                {
                                                    !showPassword ? 
                                                    <svg onClick={togglePasswordVisibility} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye-fill" viewBox="0 0 16 16" style={{position:'absolute',top:10,right:0}}>
                                                        <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z"/>
                                                        <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z"/>
                                                    </svg>
                                                    :
                                                    <svg onClick={togglePasswordVisibility} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye-slash-fill" viewBox="0 0 16 16" style={{position:'absolute',top:10,right:0}}>
                                                        <path d="m10.79 12.912-1.614-1.615a3.5 3.5 0 0 1-4.474-4.474l-2.06-2.06C.938 6.278 0 8 0 8s3 5.5 8 5.5a7.029 7.029 0 0 0 2.79-.588zM5.21 3.088A7.028 7.028 0 0 1 8 2.5c5 0 8 5.5 8 5.5s-.939 1.721-2.641 3.238l-2.062-2.062a3.5 3.5 0 0 0-4.474-4.474L5.21 3.089z"/>
                                                        <path d="M5.525 7.646a2.5 2.5 0 0 0 2.829 2.829l-2.83-2.829zm4.95.708-2.829-2.83a2.5 2.5 0 0 1 2.829 2.829zm3.171 6-12-12 .708-.708 12 12-.708.708z"/>
                                                    </svg>
                                                }
                                                
                                            </div>
                                            {/* <div className="form-group">
                                                <Checkbox className="checkbox-text">Remember Me</Checkbox>
                                            </div> */}
                                            <span className="text-sm text-danger">{errors}</span>
                                            <div className="form-group">
                                                <button type="submit" disabled={loading} className='btn btn-primary w-100 mt-2 btn-no-outline'>{loading ? 'Please wait loading...' : 'Log In'}</button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Login