import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "./add.css"

const Add = () => {
  const navigate = useNavigate();
const [gig, setGig]= useState({})

 const handleChange =(e)=>{
   setGig((gig)=>{
             return {...gig , [e.target.name]:e.target.value};
   }  )
  }
const {title, desc , cats , servicetitle, shortdesc , deltime , revnum , price}   = gig

const onSubmit = async e=>{
  e.preventDefault();
  console.log (title+  desc +  cats + servicetitle + shortdesc + deltime + revnum + price)

  try {
        
    const res = await axios.post('http://localhost:5000/api/auth/addgig', 
   
    {title, desc , cats , servicetitle, shortdesc , deltime , revnum , price} ,
      { withCredentials: true });
      const data = res.data;
      const { success} = data
    
    
    if (success){
      navigate("/home")
    }

  
  } catch (err) {
    console.error(err.response.data.msg);
  }


}

  return (
<>
   
    <div className="add">
        
    <div className="container" >
      <h1>Add New Gig</h1>
      <form  className="sections" onSubmit={onSubmit}>
      <div className="info">
          <label htmlFor="">Title</label>
          <input
            type="text"
            name="title"
            onChange={handleChange}
            placeholder="e.g. I will do something I'm really good at"
          />
          <label htmlFor="">Category</label>
          <select name="cats" id="cats" onChange={handleChange}>
            <option value="design">Design</option>
            <option value="web">Web Development</option>
            <option value="animation">Animation</option>
            <option value="music">Music</option>
          </select>
          {/* <label htmlFor="">Cover Image</label>
          <input type="file" />
          <label htmlFor="">Upload Images</label>
          <input type="file" multiple /> */}
          <label htmlFor="">Description</label>
          <textarea name="desc"  placeholder="Brief descriptions to introduce your service to customers" onChange={handleChange} cols="0" rows="16"></textarea>
          <button type="submit">Create</button>
        </div>
        <div className="details">
          <label htmlFor="">Service Title</label>
          <input type="text" name="servicetitle" placeholder="e.g. One-page web design" onChange={handleChange} />
          <label htmlFor="">Short Description</label>
          <textarea name="shortdesc"  placeholder="Short description of your service" onChange={handleChange} cols="30" rows="10"></textarea>
          <label htmlFor="">Delivery Time (e.g. 3 days)</label>
          <input type="number" name="deltime" onChange={handleChange} />
          <label htmlFor="">Revision Number</label>
          <input type="number" name="revnum" onChange={handleChange} />
          {/* <label htmlFor="">Add Features</label>
          <input type="text" placeholder="e.g. page design" />
          <input type="text" placeholder="e.g. file uploading" />
          <input type="text" placeholder="e.g. setting up a domain" />
          <input type="text" placeholder="e.g. hosting" /> */}
          <label htmlFor="">Price</label>
          <input type="number" name="price" onChange={handleChange} />
        </div>
        
      </form>
    </div>
  </div>
  </>
  )
}

export default Add 




