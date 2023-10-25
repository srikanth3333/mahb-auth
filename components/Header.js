import React from 'react'
import Link from 'next/link'

function Header({title,navigate}) {
  return (
    <div className="header d-flex align-items-center justify-content-between">
        <div className='d-flex'>
            <img src="/icons/menu.png" alt="" className="icon-sm me-3" />
        </div>
        <div>
          <img src="/icons/Search.png" alt="" className="icon me-3" />
          <img src="/icons/BellNotification.png" alt="" className="icon me-3" />
          <img src="/icons/User.png" alt="" className="icon me-3" />
        </div>
    </div>
  )
}

export default Header