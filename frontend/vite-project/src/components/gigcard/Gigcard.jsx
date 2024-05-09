import React from 'react'
import {  Link, } from '@chakra-ui/react';
import "./gigcard.css"

const Gigcard = ({item}) => {
  
  const img ="https://images.pexels.com/photos/6039245/pexels-photo-6039245.jpeg?auto=compress&cs=tinysrgb&w=1600"
  const pp= "https://images.pexels.com/photos/720606/pexels-photo-720606.jpeg?auto=compress&cs=tinysrgb&w=1600"
  return (
    
    <Link href={`/gig/${item._id}`}  className="link">
      <div className="gigCard">
        <img src={img} alt="" />
        <div className="info">
          <div className="user">
            <img src={pp} alt="" />
            <span>{item.title}</span>
          </div>
          <p>{item.desc}</p>
          <div className="star">
            <img src="./star.png" alt="" />
            <span>{}for star</span>
          </div>
        </div>
        <hr />
        <div className="detail">
          <img src="./heart.png" alt="" />
          <div className="price">
            <span className="price-span">STARTING AT</span>
            <h2>
              $ {item.price}
              {/* <sup>99</sup> */}
            </h2>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default Gigcard