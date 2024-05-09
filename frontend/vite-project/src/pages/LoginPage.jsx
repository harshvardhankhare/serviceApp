import { Stack, InputGroup, InputLeftElement, InputRightElement, Input , Link, Text} from '@chakra-ui/react';
import { Button, Container , Heading} from '@chakra-ui/react'
import { AtSignIcon ,LockIcon } from '@chakra-ui/icons'
import axios from 'axios';
import React, { useState } from 'react';
import {  useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";
import "./component.css";
import Navbar from '../components/Navbar/Navbar';

const LoginPage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    password: ""
  });
  const { username, password } = formData;
  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleError = (err) =>
    toast.error(err, {
      position: "bottom-left",
    });
  const handleSuccess = (msg) =>
    toast.success(msg, {
      position: "bottom-left",
    });

  const onSubmit = async e => {
    e.preventDefault();
    console.log(formData);
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', { username, password },
        { withCredentials: true }
      );
      const data = res.data;
      const { success, message } = data
      // navigate('/home');

      if (success) {
        toast({
          title: 'Account created.',
          description: "We've created your account for you.",
          status: 'success',
          duration: 9000,
          isClosable: true,
        })
        alert("login seccesfull")
        navigate("/home");

      } else {
        handleError(message);
      }
    } catch (err) {
      console.error(err.response.data.msg);
    }

  }
  return (
    <>
    <Navbar/>
     <Container >

<Heading as='h2' size='2xl' pl={10}  >   Login To Our App</Heading>

<form  onSubmit={e => onSubmit(e)}>
      <Stack mt={4} spacing={4}>
        <InputGroup>
          <InputLeftElement pointerEvents={'none'}>
            <AtSignIcon color={"gray"} />

          </InputLeftElement>
          <Input type="text" placeholder="Username" name="username" value={username} onChange={e => onChange(e)} required />
        </InputGroup>
        <InputGroup>
        <InputGroup>
    <InputLeftElement
      pointerEvents='none'
      color='gray.300'
      fontSize='1.2em'
    >
      <LockIcon color={"gray"} />
    </InputLeftElement>
    <Input type="password" placeholder="Password" name="password" value={password} onChange={e => onChange(e)} required />
    
  </InputGroup>
        </InputGroup>
        
        <Button type='submit' colorScheme='blue'>LOGIN</Button>
        <Text>Don't Have An Account ? <Link href='/register' color={'blue'}  >Register</Link></Text>
      </Stack>
      </form>

</Container> 
    </>

   
      
  

    
  )
}

export default LoginPage;