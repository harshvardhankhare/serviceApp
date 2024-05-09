import React, { useEffect, useState } from 'react'
import "./orders.css"
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const Orders = () => {
  
  const navigate = useNavigate();
  const CU = JSON.parse(localStorage.getItem("currentUser"));
  const [data, setData] = useState([])

  

useEffect(() => {

    const getData = async () => {
    
      try {
        const res = await axios.get(`http://localhost:5000/api/auth/order/buyer`, { params: { id: CU._id } }  )
        
        setData(res.data)
      } catch (error) {
        console.error('Error fetching orders:', error);
      }

    }
    getData();

  }, [])

  const handleContact = async (order) => {
    const sellerId = order.sellerId;
    const buyerId = order.buyerId;
    const id = sellerId + buyerId;
    
     console.log(id)

    try {
      const res = await axios.get(`http://localhost:5000/api/auth/conversations/single/${id}`);
      navigate(`/message/${res.data.id}`);
    } catch (err) {
      if (err.response.status === 404) {
        const res = await axios.post(`http://localhost:5000/api/auth/conversations/create`, {
          id:id, ox:order, cu:CU
        });
        navigate(`/message/${res.data.id}`);
      }
    }
  };

  return (
    <div className="orders">
      <div className="container">
        <div className="title">
          <h1>Orders</h1>
        </div>
        <table>
          <tr>
            <th>Image</th>
            <th>Title</th>
            <th>Price</th>
            {<th>{CU.isSeller ? "Buyer" : "Seller"}</th>}
            <th>Contact</th>
          </tr>
          {   data.length==0?<h2>NO Items Found !</h2>: data.map((order) => (
              <tr key={order._id}>
                <td>
                  <img className="image" src={order.img} alt="" />
                </td>
                <td>{order.title}</td>
                <td>{order.price}</td>
                <td>{order.sellerId}</td>
                
                <td>
                  <img
                    className="message"
                    src="./img/message.png"
                    alt=""
                  
                  />
                  <button onClick={() => handleContact(order)}>msg </button>
                </td>
              </tr>
            ))}

        </table>
      </div>
    </div>
  )
}

export default Orders