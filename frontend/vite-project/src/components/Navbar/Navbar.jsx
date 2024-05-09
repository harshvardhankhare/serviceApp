import React, { useEffect, useState } from "react";
import {  useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
//import removeCookie from 'react-cookie'
import {  Link, } from '@chakra-ui/react';
import "./navbar.css"
const Navbar = ({user ,logout }) => {
  const navigate = useNavigate();
   const [active, setActive] = useState(false);
  const [open, setOpen] = useState(false);

  const { pathname } = useLocation();

  const isActive = () => {
    window.scrollY > 0 ? setActive(true) : setActive(false);
  };

  useEffect(() => {
    window.addEventListener("scroll", isActive);
    return () => {
      window.removeEventListener("scroll", isActive);
    };
  }, []);

  const Logout = logout
  
  const currentUser = user



  return (
    <div className={active || pathname !== "/" ? "navbar active" : "navbar"}>
    <div className="container">
      <div className="logo">
        <Link className="link" href="/home">
          <span className="text">Harsh</span>
        </Link>
        <span className="dot">.</span>
        
      </div>
      <div className="links">
        <span>Liverr Business</span>
        <Link href="/explore">  <span>Explore</span></Link> 
        <span>English</span>
        {!currentUser?.isSeller && <span>Become a Seller</span>}
        {currentUser ? (
          <div className="user" onClick={()=>setOpen(!open)}>
            <img
              src="https://images.pexels.com/photos/1115697/pexels-photo-1115697.jpeg?auto=compress&cs=tinysrgb&w=1600"
              alt=""
            />
            <span>{currentUser?.username}</span>
            {open && <div className="options">
              {currentUser.isSeller && (
                <>
                  <Link className="link" href="/mygigs">
                    Services
                  </Link>
                  <Link className="link" href="/add">  Add a New Service</Link>
                </>
              )}
              <Link className="link" href="/orders">
                Orders
              </Link>
              <Link className="link" href="/messages">
                Messages
              </Link>
              <Link className="link" to="/" onClick={Logout}>
                Logout
              </Link>
            </div>}
          </div>
        ) : (
          <>
            <span><Link href="/">sign in</Link></span>
            <Link className="link" href="/register">
              <button>Join</button>
            </Link>
          </>
        )}
      </div>
    </div>
    {(active || pathname !== "/") && (
      <>
        <hr />
        <div className="menu">
          <Link className="link menuLink" to="/">
            Graphics & Design
          </Link>
          <Link className="link menuLink" to="/">
            Video & Animation
          </Link>
          <Link className="link menuLink" to="/">
            Writing & Translation
          </Link>
          <Link className="link menuLink" to="/">
            AI Services
          </Link>
          <Link className="link menuLink" to="/">
            Digital Marketing
          </Link>
          <Link className="link menuLink" to="/">
            Music & Audio
          </Link>
          <Link className="link menuLink" to="/">
            Programming & Tech
          </Link>
          <Link className="link menuLink" to="/">
            Business
          </Link>
          <Link className="link menuLink" to="/">
            Lifestyle
          </Link>
        </div>
        <hr />
      </>
    )}
  </div>
  )
}

export default Navbar