import React, { useEffect, useState } from 'react'
import "./mygigs.css"
import { useNavigate } from "react-router-dom";
import { useCookies  } from "react-cookie";
import { Link } from '@chakra-ui/react';
import getCurrentUser from '../../../utils/getCurrentUser';
import axios from 'axios';
const Mygigs = () => {
  const currentuser = getCurrentUser();
const [service, setService]=useState([])
    

useEffect ( ()=>{
    const getdata=  async ()=>{
        const res = await axios.get(`http://localhost:5000/api/auth/service?userId=${currentuser._id}`)
              setService(res.data)
    }
  
 getdata();
},[])

const handleDelete = async (id) => {
        const res = await axios.delete(`http://localhost:5000/api/auth/service/${id}`,{cu:currentuser},
    
      )
      console.log(res.data)
//       if(x){
//         alert("deleted")
//       }
 };

  return (
    <div className="myGigs">
    <div className="container">
      <div className="title">
        <h1>{currentuser.isSeller ? "services provided by You" : "Orders"}</h1>
        {currentuser.isSeller && (
          <Link href="/add">
            <button>Add New Service</button>
          </Link>
        )}
      </div>
      <table>
            <tr>
              <th>Image</th>
              <th>Title</th>
              <th>Price</th>
              <th>Sales</th>
              <th>Action</th>
            </tr>
            {service.map((gig) => (
              <tr key={gig._id}>
                <td>
                  <img className="image" src={gig.cover} alt="" />
                </td>
                <td>{gig.title}</td>
                <td>{gig.price}</td>
                <td>{gig.sales}</td>
                <td>
                  <img
                    className="delete"
                    src="./delete.png"
                    alt=""
                    onClick={() => handleDelete(gig._id)}
                  />
                </td>
              </tr>
            ))}
          </table>
    </div>
  </div>
  )
}

export default Mygigs