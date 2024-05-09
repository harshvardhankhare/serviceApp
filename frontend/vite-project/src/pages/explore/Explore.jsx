import React, { useEffect, useRef, useState } from "react";
import "./explore.css"
import Gigcard from '../../components/gigcard/Gigcard';

import Navbar from "../../components/Navbar/Navbar";
import { useLocation } from "react-router-dom";
import axios from 'axios';


const Explore = () => {

    const [data, setData]= useState([""])


    useEffect(()=>{

        const getGigs =async ()=>{
          try {
               const res = await axios.get(`http://localhost:5000/api/auth/gigs/explore`)
               //console.log(res.data)
                    setData(res.data)
                  
                    
          }catch (err){
           console.error('Error fetching posts:', err);
          }
     }
    
     getGigs();
    
    },[]);

  return (
      
   <div className="gigs">
   <div className="container">
     <span className="breadcrumbs">Liverr  Graphics & Design </span>
     <h1>AI Artists</h1>
     <p>
       Explore the boundaries of art and technology with Liverr's AI artists
     </p>
     {/* <div className="menu">
       <div className="left">
         <span>Budget</span>
         <input  type="number" placeholder="min" />
         <input  type="number" placeholder="max" />
         <button >Apply</button>
       </div>
       <div className="right">
         <span className="sortBy">Sort by</span>
         <span className="sortType">
           {sort === "sales" ? "Best Selling" : "Newest"}
         </span>
          <img src="./down.png" alt="somthing" onClick={() => setOpen(!open)} />
         {open && (
           <div className="rightMenu">
             {sort === "sales" ? (
               <span onClick={() => reSort("createdAt")}>Newest</span>
             ) : (
               <span onClick={() => reSort("sales")}>Best Selling</span>
               )}
               <span onClick={() => reSort("sales")}>Popular</span>
           </div>
         )} 
       </div>
     </div> */}
     <div className="cards">

       
       {
         data.length==0?<h2>NO Items Found !</h2>: data.map((d) => (
       
         
            <Gigcard key={d.id} item={d} />        
               
            ))
       }
      
    
     </div>
   </div>
 </div>
  )
}

export default Explore