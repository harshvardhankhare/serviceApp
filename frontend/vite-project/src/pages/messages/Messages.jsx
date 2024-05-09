import React ,  {useState, useEffect} from 'react'
import { Link } from '@chakra-ui/react';
import "./messages.css"
import axios from 'axios';


const Messages = () => {
  const CU = JSON.parse(localStorage.getItem("currentUser"));
  const [data,setData]=useState([])
    
const handleRead =()=>{

}

useEffect(()=>{
  const getData = async () => {

    try {
      const res = await axios.get(`http://localhost:5000/api/auth/conversations`,{ params: { id: CU._id } } )
      console.log(res.data)
      setData(res.data)
    } catch (error) {
      console.error('Error fetching orders:', error);
    }

  }
  getData();


},[])
      

 

  return (
    <div className="messages">
      <div className="container">
        <div className="title">
          <h1>Messages</h1>
        </div>
        <table>
            <tr>
              <th>{CU.isSeller ? "Buyer" : "Seller"}</th>
              <th>Last Message</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
            {data.map((c) => (
              <tr
                className={
                  ((CU.isSeller && !c.readBySeller) ||
                    (!CU.isSeller && !c.readByBuyer)) &&
                  "active"
                }
                key={c.id}
              >
                <td>{CU.isSeller ? c.rec : c.sender}</td>
                <td>
                  <Link href={`/message/${c.id}`} className="link">
                    {c?.lastMessage?.substring(0, 100)}...
                  </Link>
                </td>
                {/* <td>{moment(c.updatedAt).fromNow()}</td> */}
                <td>
                  {/* {((CU.isSeller && !c.readBySeller) ||
                    (!CU.isSeller && !c.readByBuyer)) && ( */}
                    <button onClick={() => handleRead(c.id)}>
                      Mark as Read
                    </button>
                  {/* )} */}
                </td>
              </tr>
            ))}
          </table>
</div>
    </div>
  )
}

export default Messages