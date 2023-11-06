import axios from 'axios'
import moment from 'moment';
import React from 'react'

let logoutTimer;


function startLogoutTimer(logoutCallback, timeout = 30 * 60 * 1000) {
    logoutTimer = setTimeout(logoutCallback,timeout)
}

function resetLogoutTimer() {
    clearTimeout(logoutTimer)
}

function Index() {

  const [data,setData] = React.useState('')
  const [editState,setEditState] = React.useState(false)
  const [busSpeedLimit,setBusSpeedLimit] = React.useState('')
  const [busSpeedLimitCount,setBusSpeedLimitCount] = React.useState('')
  const [firstTicketCreationTime,setFirstTicketCreationTime]= React.useState('')
  const [secondTicketCreationTime,setSecondTicketCreationTime]= React.useState('')
  let profile =  JSON.parse(localStorage.getItem('profile'))

  React.useEffect(() => {
    getData()
  },[])


  const getData = () => {
    axios.get(`https://freshdeskdev.myairports.com.my/api/iot/details?credentials=%7B%7D&details=%7B%7D&principal=%7B%7D`, {
      headers: {
        'Authorization': `Bearer ${profile.token}`
      }
    })
    .then(response => {
      setData(response.data)
      setBusSpeedLimit(response.data.bus_speed_limit)
      setBusSpeedLimitCount(response.data.bus_speed_limit_count)
      setFirstTicketCreationTime(response.data.first_ticket_creation_time)
      setSecondTicketCreationTime(response.data.second_ticket_creation_time)

    })
    .catch(err => {
      console.error(err)
    })
  }




  const handleSubmit = () => {
    let data = {
      "busSpeedLimit": busSpeedLimit,
      "busSpeedLimitCount": busSpeedLimitCount,
      "firstTicketCreationTime": firstTicketCreationTime,
      "secondTicketCreationTime": secondTicketCreationTime
    };
    
    axios.post("https://freshdeskdev.myairports.com.my/api/iot/details",data,{
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${profile.token}`
      }
    })
    .then(response => {
      setEditState(false)
      alert(response.data)
      getData()
    })
    .catch(err => {
      console.log(err)
    })
  }

  
  React.useEffect(() => {


    const logout = () => {
        localStorage.clear()
        location.reload()
    }

    startLogoutTimer(logout, 30 * 60 * 1000);

    const handleUserActivity = () => {
        resetLogoutTimer();
    }


    window.addEventListener('mousemove', handleUserActivity);
    window.addEventListener('keydown', handleUserActivity);


    return () => {
        window.removeEventListener('mousemove',handleUserActivity);
        window.removeEventListener('keydown',handleUserActivity);
    }

  },[])
  



  return (
    <>
      <div className="container">
            <div className="card my-4 shadow-custom border-radius-0">
              <div className="card-header py-3 px-4">
                    <div className="d-flex">
                      <h5 className="card-title mb-0">Speed Limit  Count</h5>
                      <div className="ms-5 pointer" onClick={() => setEditState(true)}>
                        <img src="/icons/tabler_edit.png" alt="" />
                        <span className="edit-btn ms-1">Edit</span>
                      </div>
                    </div>
              </div>
              <div className="card-body px-4">
                  <div className="d-flex align-items-center mb-3">
                    <p className="item-width">Bus Speed Limit :</p>
                    <div className="d-flex align-items-center">
                      {
                        editState == false ?
                        <p className="ms-2 font-weight-bold">{data.bus_speed_limit}</p>
                        :  
                        <input type="number"  onChange={(e) => setBusSpeedLimit(e.target.value)} defaultValue={data.bus_speed_limit} className="custom-input" />
                      }
                      <p className="ms-2">km/hr</p>
                    </div>
                  </div>
                  <div className="d-flex align-items-center mb-3">
                    <p className="item-width">Bus Speed Limit Count :</p>
                    
                    {
                      editState == false ?
                        <p className="ms-2 font-weight-bold">{data.bus_speed_limit_count}</p>
                      :  
                        <input  type="number" onChange={(e) => setBusSpeedLimitCount(e.target.value)} defaultValue={data.bus_speed_limit_count} className="custom-input" />
                    }
                  </div>
              </div>
            </div>
            <div className="card shadow-custom border-radius-0">
              <div className="card-header py-3 px-4">
                    <div className="d-flex">
                      <h5 className="card-title mb-0">Auto ticket generation for bus breakdown</h5>
                      {/* <div className="ms-5">
                        <img src="/icons/tabler_edit.png" alt="" />
                        <span className="edit-btn ms-1">Edit</span>
                      </div> */}
                    </div>
              </div>
              <div className="card-body px-4">
                  <div className="d-flex align-items-center mb-3">
                    <p className="item-width">First ticket Creation time:</p>
                    <div className="d-flex align-items-center">
                     
                      {
                      editState == false ?
                        <p className="ms-2 font-weight-bold">{data.first_ticket_creation_time}</p>
                      :  
                        <input  type="number" onChange={(e) => setFirstTicketCreationTime(e.target.value)} defaultValue={data.first_ticket_creation_time} className="custom-input" />
                      }
                      <p className="ms-2">min</p>
                    </div>
                  </div>
                  <div className="d-flex align-items-center mb-3">
                    <p className="item-width">Second ticket Creation time:</p>
                    <div className="d-flex align-items-center">
                      
                      {
                        editState == false ?
                        <p className="ms-2 font-weight-bold">{data.second_ticket_creation_time}</p>
                      :  
                        <input  type="number" onChange={(e) => setSecondTicketCreationTime(e.target.value)} defaultValue={data.second_ticket_creation_time} className="custom-input" />
                      }
                      <p className="ms-2">hr</p>
                    </div>
                  </div>
              </div>
            </div>
            <div className='d-flex justify-content-center my-5'>
              <button disabled={editState ? false : true} className="btn btn-secondary me-5" onClick={() => setEditState(false)}>Cancel</button>
              <button disabled={editState ? false : true} className="btn btn-secondary " onClick={handleSubmit}>Submit</button>
            </div>
            
          </div>
    </>
  )
}

export default Index