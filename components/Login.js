import { Checkbox } from 'antd'
import Link from 'next/link'
import React from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'

function Login({setLoggedIn}) {


    const [email,setEmail] = React.useState('')
    const [password,setPassword] = React.useState('')
    let router = useRouter()


    const handleLogin = async (e) => {
        e.preventDefault();
        if(!email || !password) {
            alert("Below fields cannot be empty")
            return;
        }
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

        })
        .catch(err => {
            console.log(err)
            alert("Invalid credentials")
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
                                    <img src="/images/login-img.png" alt="not found" />
                                </div>
                                <div className="col-lg-7">
                                    <div className="py-15">
                                        <h2>Sign In to your account</h2>
                                        <h6>Signin to create, discover and connect with the global community</h6>
                                        <form className="w-75" onSubmit={handleLogin}>
                                            <div className="form-group">
                                                {/* <label htmlFor="">Email/Employee ID</label> */}
                                                <input type="text" onChange={e => setEmail(e.target.value)} className='form-control shadow-none' placeholder='Email:' />
                                            </div>
                                            <div className="form-group">
                                                {/* <label htmlFor="">Password</label> */}
                                                <input type="password" onChange={e => setPassword(e.target.value)} className='form-control shadow-none' placeholder='Password:' />
                                            </div>
                                            <div className="form-group">
                                                <Checkbox className="checkbox-text">Remember Me</Checkbox>
                                            </div>
                                            <div className="form-group">
                                                <button type="submit" className='btn btn-primary w-100 mt-2 btn-no-outline'>Log In</button>
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