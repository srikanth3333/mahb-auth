import Link from 'next/link'
import React from 'react'

function CardList() {


    let items = [
        {
            title:'Leave',
            image:'/images/01.png',
            description:'Employee are eligible for overtime pay...'
        },
        {
            title:'Attendance',
            image:'/images/02.png',
            description:'Employee are eligible for overtime pay...'
        },
        {
            title:'Payslips',
            image:'/images/03.png',
            description:'Employee are eligible for overtime pay...'
        },
        {
            title:'Documents',
            image:'/images/04.png',
            description:'Employee are eligible for overtime pay...'
        },
        {
            title:'Claims',
            image:'/images/05.png',
            description:'Employee are eligible for overtime pay...'
        },
        
    ]
    
  return (
    <div className="cardList">
        <div className="container">
            <div className="row">
                {
                    items.map((item,index) => (
                        <div className="col-lg-6 mt-5" key={index}>
                            <Link href="/holidays">
                                <div className="card card-shadow">
                                    <div className="card-body">
                                        <div className='d-flex align-items-center justify-content-center mb-2'>
                                            <img src={item.image} alt="" className='home-icon' />
                                        </div>
                                        <div>
                                            <h6 className='title text-center mt-2'>{item.title}</h6>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    ))
                }
                
            </div>
        </div>
    </div>
  )
}

export default CardList