import React, { useEffect, useState } from 'react'
import "./message.css"
import {  useParams } from "react-router-dom";
import { Link } from '@chakra-ui/react'
import axios from 'axios';

const Message = () => {
  const { id } = useParams();
  const CU = JSON.parse(localStorage.getItem("currentUser"));
  const [data, setData] = useState([])
   const [desc , setdesc]=useState("")
  //  const onChange =(e)=>{
  //   console.log(e.target.value)
  //      setdesc(e.target.value)
  //  }
  useEffect(() => {

    const getData = async () => {

      try {
        const res = await axios.get(`http://localhost:5000/api/auth/message/${id}`,)
        console.log(res.data)
        setData(res.data)
      } catch (error) {
        console.error('Error fetching orders:', error);
      }

    }
    getData();

  }, [])
  const handleSubmit =  async (e) => {
    const  conversationId=id
    const userId=CU._id
    console.log(desc)
    e.preventDefault();
          try {
       const res = await axios.post("http://localhost:5000/api/auth/message/",
       {conversationId,desc,userId}, 
        { withCredentials: true }
      )
      
console.log(res.data)

          }catch(err){
            console.error('Error creating msg', err);
          }
      
  };

  return (
    <div className="message">
      <div className="container">
        <span className="breadcrumbs">
          <Link href="/messages">Messages</Link>  John Doe
        </span>
        <div className="messages">
            {data.map((m) => (
              <div className={m.userId === CU._id ? "owner item" : "item"} key={m._id}>
                <img
                  src="https://images.pexels.com/photos/270408/pexels-photo-270408.jpeg?auto=compress&cs=tinysrgb&w=1600"
                  alt=""
                />
                <p>{m.desc}</p>
              </div>
            ))}
          </div>
        
       
        <hr />
       
        <form className="write" onSubmit={handleSubmit}>
          <textarea name='desc' type="text" placeholder="write a message" onChange={(e)=>setdesc(e.target.value) } />
          <button type="submit">Send</button>
        </form>
      </div>
    </div>
  )
}

export default Message