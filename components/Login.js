import { Checkbox } from 'antd'
import Link from 'next/link'
import React from 'react'

function Login() {
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
                                        <form className="w-75" onSubmit={e => e.preventDefault()}>
                                            <div className="form-group">
                                                {/* <label htmlFor="">Email/Employee ID</label> */}
                                                <input type="text" className='form-control shadow-none' placeholder='Username:' />
                                            </div>
                                            <div className="form-group">
                                                {/* <label htmlFor="">Password</label> */}
                                                <input type="password" className='form-control shadow-none' placeholder='Password:' />
                                            </div>
                                            <div className="form-group">
                                                <Checkbox className="checkbox-text">Remember Me</Checkbox>
                                            </div>
                                            <div className="form-group">
                                                <Link href="/home">
                                                    <button className='btn btn-primary w-100 mt-2 btn-no-outline'>Log In</button>
                                                </Link>
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