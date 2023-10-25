import React from 'react'

function Footer() {
  return (
    <div className="footer">
        <div className="container">
            <div className="d-flex justify-content-between align-items-center">
                <div className='active text-center'>
                    <img src="/icons/Dashboard.png" className='footer-icon' alt="" />
                    {/* <h6 className="icon-text text-white m-0">Services</h6> */}
                </div>
                <div className='text-center'>
                    <img src="/icons/Home.png" className='footer-icon' alt="" />
                    <h6 className="icon-text">Home</h6>
                </div>
                <div className='text-center'>
                    <img src="/icons/profile.png" className='footer-icon' alt="" />
                    <h6 className="icon-text">Profile</h6>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Footer