import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios';
import './pay.css'

let x= false

const Pay = () => {

  const { id } = useParams()
  const CU = JSON.parse(localStorage.getItem("currentUser"));

  const [data, setData] = useState({})
  const [user, setUser] = useState({})
  const [order, setOrder] = useState({})
  


  const onConfirm = () => {


    setOrder({ title: data.title, gigId: data._id, buyerId: CU._id, price: data.price, sellerId: data.userid })
    console.log("confirm clcked ")
    console.log(title + 'price =' + price + 'all the ids = ' + ' ' + buyerId + ' ' + sellerId + ' ' + gigId)
    
  }

  const { title, price, buyerId, sellerId, gigId } = order

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log("submitted")
    try {
      
      
      const res = await axios.post('http://localhost:5000/api/auth/order',


        { title, price, buyerId, sellerId, gigId },
        { withCredentials: true });
     
    } catch (err) {
      console.error(err.response.data.msg);
    }

  }


  useEffect(() => {

    const getGig = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/auth/gig/single/${id}`)

        setData(res.data.gig)
        setUser(res.data.user)

      } catch (err) {
        console.error('Error fetching posts:', err);
      }
    }
    getGig()

  }, [])


  return (
    <>

<div className='c'>
       <h1 className='head'>welcome ! ={CU.username}</h1>
       <div className='title'>
       <h1>Service Offered by = {user.username}</h1>
      <h1>service  title =  {data.title}</h1>
      <h1>service price = ${data.price}</h1>

       </div>
      <div >
      <button className='btn' onClick={onConfirm}>confim order</button>
      {
        order.title!==undefined?<button className='btn' onClick={onSubmit}> place order</button>:<>Click Confirm order</>
      }
      

      </div>
     

</div>
     

    </>
  )
}

export default Pay