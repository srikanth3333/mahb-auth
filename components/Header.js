import React from 'react'
import Link from 'next/link'
import axios from 'axios'
import moment from 'moment'

function Header({title,navigate}) {

  const [logsData,setLogsData] = React.useState(null)
  let profile =  JSON.parse(localStorage.getItem('profile'))

  React.useEffect(() => {
    logsDataFunc()
  },[])

  const logsDataFunc = () => {
    axios.get(`https://freshdeskdev.myairports.com.my/api/iot/logs?credentials=%7B%7D&details=%7B%7D&principal=%7B%7D`, {
      headers: {
        'Authorization': `Bearer ${profile.token}`
      }
    })
    .then(response => {
      setLogsData(response.data)
    })
    .catch(err => {
      console.error(err)
    })
  }

  return (
    <div className="header d-flex align-items-center justify-content-between">
        <div>
          <p className='text-sm text-white'>Last Updated By: {logsData?.updatedBy}</p>
          <p className='text-sm text-white'>Updated At: {moment(logsData?.updatedAt).format('DD-MM-YYYY hh:mm A')}</p>
        </div>
        <div>
          {/* <img src="/icons/Search.png" alt="" className="icon me-3" />
          <img src="/icons/BellNotification.png" alt="" className="icon me-3" />
          <img src="/icons/User.png" alt="" className="icon me-3" /> */}
          <div className="">
                
                
                <button className="btn btn-danger btn-sm ms-3" onClick={() => {
                    localStorage.clear();
                    location.reload()
                  }}>Logout</button>
            </div>
        </div>
    </div>
  )
}

export default Header