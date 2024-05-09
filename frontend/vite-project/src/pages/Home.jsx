//import React from 'react'
import React, { useEffect, useState } from "react";
import {  Link, Container} from '@chakra-ui/react';
import { useNavigate } from "react-router-dom";
import { useCookies  } from "react-cookie";
import axios from "axios";
import Featured from "../components/featured/Featured";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/footer/Footer";
import './component.css'

// m={2} refers to the value of `theme.space[2]`



const Home = () => {
  const navigate = useNavigate();
  const [cookies, removeCookie] = useCookies([]);
  const [users, setUsers] = useState([]);
  const [userDetails, setUserDetails ]= useState({})
    useEffect(() => {
const fetchUsers =async ()=>{
     try {
          const res = await axios.get('http://localhost:5000/api/auth/all')
setUsers(res.data)
     }catch (err){
      console.error('Error fetching posts:', err);
     }
}

    const verifyCookie = async () => {
      if (!cookies.token) {
        navigate("/");
      }
      const { data } = await axios.post(
        "http://localhost:5000/api/auth/",
        {},
        { withCredentials: true }
      );
   
      const { status, user } = data;
      localStorage.setItem("currentUser", JSON.stringify(user));
      setUserDetails(user)
      
      
       return status
        ? navigate("/home")
         : (removeCookie("token"), navigate("/"));
    };
    fetchUsers();
    verifyCookie();
  }, [cookies, navigate, removeCookie]);
  const {_id,username , password } = userDetails
  const Logout = () => {
    removeCookie("token");
    localStorage.setItem("currentUser", null);
    navigate("/register");
    
  };


  const cards = [
    {
      id: 1,
      title: "AI Artists",
      desc: "Add talent to AI",
      img: "https://images.pexels.com/photos/7532110/pexels-photo-7532110.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load",
    },
  ]
  
  
  return (
    
    
    
   <>
   <div className="home" style={{margin:"auto"}}>
        
        <Navbar  user={userDetails} logout= {Logout} />
        <Featured />
        {/* <TrustedBy />
        <Slide slidesToShow={5} arrowsScroll={5}>
          {cards.map((card) => (
            <CatCard key={card.id} card={card} />
          ))}
        </Slide> */}
        <div className="features">
          <div className="container">
            <div className="item">
              <h1>A whole world of freelance talent at your fingertips</h1>
              <div className="title">
                <img src="./check.png" alt="" />
                <h1 onClick={Logout}>click</h1>
              </div>
              <p>
                Find high-quality services at every price point. No hourly rates,
                just project-based pricing.
              </p>
              <div className="title">
                <img src="./check.png" alt="" />
                Quality work done quickly
              </div>
              <p>
                Find the right freelancer to begin working on your project within
                minutes.
              </p>
              <div className="title">
                <img src="./check.png" alt="" />
                Protected payments, every time
              </div>
              <p>
                Always know what you'll pay upfront. Your payment isn't released
                until you approve the work.
              </p>
              <div className="title">
                <img src="./check.png" alt="" />
                24/7 support
              </div>
              <p>
                Find high-quality services at every price point. No hourly rates,
                just project-based pricing.
              </p>
            </div>
            <div className="item">
              <video src="./video.mp4"  type="video/mp4" controls />
            </div>
          </div>
        </div>
        <div className="explore">
          <div className="container">
            <h1>Explore the marketplace</h1>
            <div className="items">
              <div className="item">
                <img
                  src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/graphics-design.d32a2f8.svg"
                  alt=""
                />
                <div className="line"></div>
                <span>Graphics & Design</span>
              </div>
              <div className="item">
                <img
                  src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/online-marketing.74e221b.svg"
                  alt=""
                />
                <div className="line"></div>
  
                <span>Digital Marketing</span>
              </div>
              <div className="item">
                <img
                  src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/writing-translation.32ebe2e.svg"
                  alt=""
                />
                <div className="line"></div>
                <span>Writing & Translation</span>
              </div>
              <div className="item">
                <img
                  src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/video-animation.f0d9d71.svg"
                  alt=""
                />
                <div className="line"></div>
                <span>Video & Animation</span>
              </div>
              <div className="item">
                <img
                  src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/music-audio.320af20.svg"
                  alt=""
                />
                <div className="line"></div>
                <span>Music & Audio</span>
              </div>
              <div className="item">
                <img
                  src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/programming.9362366.svg"
                  alt=""
                />
                <div className="line"></div>
                <span>Programming & Tech</span>
              </div>
              <div className="item">
                <img
                  src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/business.bbdf319.svg"
                  alt=""
                />
                <div className="line"></div>
                <span>Business</span>
              </div>
              <div className="item">
                <img
                  src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/lifestyle.745b575.svg"
                  alt=""
                />
                <div className="line"></div>
                <span>Lifestyle</span>
              </div>
              <div className="item">
                <img
                  src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/data.718910f.svg"
                  alt=""
                />
                <div className="line"></div>
                <span>Data</span>
              </div>
              <div className="item">
                <img
                  src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/photography.01cf943.svg"
                  alt=""
                />
                <div className="line"></div>
                <span>Photography</span>
              </div>
            </div>
          </div>
        </div>
        <div className="features dark">
          <div className="container">
            <div className="item">
              <h1>
                liverr <i>business</i>
              </h1>
              <h1>
                A business solution designed for <i>teams</i>
              </h1>
              <p>
                Upgrade to a curated experience packed with tools and benefits,
                dedicated to businesses
              </p>
              <div className="title">
                <img src="./check.png" alt="" />
                Connect to freelancers with proven business experience
              </div>
  
              <div className="title">
                <img src="./check.png" alt="" />
                Get matched with the perfect talent by a customer success manager
              </div>
  
              <div className="title">
                <img src="./check.png" alt="" />
                Manage teamwork and boost productivity with one powerful workspace
              </div>
              <button>Explore Liverr Business</button>
            </div>
            <div className="item">
              <img
                src="https://fiverr-res.cloudinary.com/q_auto,f_auto,w_870,dpr_2.0/v1/attachments/generic_asset/asset/d9c17ceebda44764b591a8074a898e63-1599597624768/business-desktop-870-x2.png"
                alt=""
              />
            </div>
          </div>
        </div>
        {/* <Slide slidesToShow={4} arrowsScroll={4}>
          {projects.map((card) => (
            <ProjectCard key={card.id} card={card} />
          ))}
        </Slide> */}
        
      </div>
     

     <Footer/>

     </>
    
    
    
  )
}

export default Home