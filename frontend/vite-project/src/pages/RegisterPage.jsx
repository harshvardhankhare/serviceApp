// client/src/components/RegisterPage.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { Button, Container , Heading, Stack , FormControl} from '@chakra-ui/react'
import {  InputGroup, InputLeftElement, InputRightElement, Input , Link, Text} from '@chakra-ui/react';
import { AtSignIcon ,LockIcon } from '@chakra-ui/icons'
import "./register.css"
import Navbar from '../components/Navbar/Navbar';

const RegisterPage = () => {
  const [file, setFile] = useState(null);
  const navigate = useNavigate();
 
const [user , setUser]= useState({})
  const handleChange = (e) => {
    setUser((user) => {
      return { ...user, [e.target.name]: e.target.value };
    });
  };

  const handleSeller = (e) => {
    setUser((user) => {
      return { ...user, isSeller: e.target.checked };
    });
  };

  const { username, password , email , desc , isSeller , country} = user;


  // const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    


    try {
        
      const res = await axios.post('http://localhost:5000/api/auth/register', 
     
              {username , password, email , desc , isSeller, country ,file},
        { withCredentials: true });
      
      
      navigate("/");

    
    } catch (err) {
      console.error(err.response.data.msg);
    }
  };

  return (
  <>
    <Navbar/>
<div className="register">
 
<form onSubmit={onSubmit}>
  <div className="left">
    <h1>Create a new account</h1>
    <label htmlFor="">Username</label>
    <input
      name="username"
      type="text"
      placeholder="johndoe"
      onChange={handleChange}
    />
    <label htmlFor="">Email</label>
    <input
      name="email"
      type="email"
      placeholder="email"
      onChange={handleChange}
    />
    <label htmlFor="">Password</label>
    <input name="password" type="password" onChange={handleChange} />
    {/* <label htmlFor="">Profile Picture</label>
    <input type="file" onChange={(e) => setFile(e.target.files[0])} /> */}
    <label htmlFor="">Country</label>
    <input
      name="country"
      type="text"
      placeholder="Usa"
      onChange={handleChange}
    />
    <button type="submit">Register</button>
  </div>
  <div className="right">
    <h1>I want to become a seller</h1>
    <div className="toggle">
      <label htmlFor="">Activate the seller account</label>
      <label className="switch">
        <input type="checkbox" onChange={handleSeller} />
        <span className="slider round"></span>
      </label>
    </div>
    <label htmlFor="">Phone Number</label>
    <input
      name="phone"
      type="text"
      placeholder="+1 234 567 89"
      onChange={handleChange}
    />
    <label htmlFor="">Description</label>
    <textarea
      placeholder="A short description of yourself"
      name="desc"
      id=""
      cols="30"
      rows="10"
      onChange={handleChange}
    ></textarea>
  </div>
  
</form>
<span>Already have an Account  <Link href="/">Login</Link></span>

</div>
</>
  );
};

export default RegisterPage;
