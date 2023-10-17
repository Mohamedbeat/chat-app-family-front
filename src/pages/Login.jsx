import React, {useState, useEffect} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { Player } from '@lottiefiles/react-lottie-player';
import logo from './Animation - 1697295027793.json'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios'
import { LoginRoute } from '../utils/APIRoutes';

// FORM CONTAINER COMPONENT
const FormContainer = styled.div`
  height: 100vh; 
  width: 100vw;
  display: flex; 
  flex-direction:column;
  justify-content:center;
  gap:1rem;
  align-items:center;
  background-color:#131324;
  .brand{
    display:flex;
    align-items:center;
    gap:1rem;
    justify-content:center;
    h1{
      color:white;
    }
  }
  form{
    display:flex;
    flex-direction:column;
    align-items:center;
    justify-content:center;
    gap:1rem;
    background-color:#00000076;
    border-radius:2rem;
    padding:3rem 5rem;
    input{
      background-color:transparent;
      padding:1rem;
      border:0.1rem solid #4e0eff;
      border-radius:0.4rem;
      color:white;
      width:100%;
      font-size:1rem;
      &:focus{
        border:0.1rem solid #997af0;
        outline:none;
      }
    }
    button{
      width:100%;
      background-color:#997af0;
      color:white;
      padding:1rem 2rem;
      border-radius:0.4rem;
      cursor:pointer;
      border:none;
      font-weight:bold;
      fonst-size:1rem;
      text-transform:uppercase;
      transition:0.2s all;
      &:hover{
        background-color:#4e0eff;
      }
    }
    span{
      color:white;
      text-transform:uppercase;
      a{
        text-decoration:none;
        color:#4e0eff;
        text-transform:none;
        font-weight:bold;
      }
    }
  }
  @media (max-width: 640px) {
    .brand{
      display:flex;
      flex-direction:column;
      
    }
    form{
      span{
        text-align: center;
      }
    }
  }
  `


export default function Login() {
  
  const [values, setValues] = useState({
    username:'',
    password:'',
    confirmPassword:'',
  })
  const toastOptions ={
    position:'top-right',
    autoClose:8000,
    pauseOnHover:true,
    draggable:true,
    theme:'dark'
  }
  const navigate = useNavigate()

  const handleSubmit = async (e)=>{
    e.preventDefault()
    try {
      if(handleValidation()){
      const {password, username}= values;
      const data = await axios.post(LoginRoute, {
        username, 
        password,
      })
      if(data.status!==200){
        toast.error(data.msg, toastOptions)
      }else{
        // console.log(data.data);
        localStorage.setItem('chat-app-user-family', JSON.stringify(data.data))
        if(data.data.isAvatarSet){
           navigate('/')
        }else{
          navigate('/setAvatar')
        }
      }
      
    }
    } catch (error) {
      toast.error(error.response.data.msg, toastOptions)
    }
    
    
  }
  const handleChange=(event)=>{
    setValues({...values, [event.target.name] : event.target.value});
  }
  const handleValidation = ()=>{
    

    const {password, username}= values;
    
    if(username===""){
      toast.error("Username is required", toastOptions)
      return false
    }else if (password==="" ) {
      toast.error("Password is required", toastOptions)
      return false
    }
      return true
    
  }
  useEffect(()=>{
    if(localStorage.getItem('chat-app-user-family')){
      navigate('/')
    }
  },[])

  return (
    <FormContainer id='formContainer'>
      <form  onSubmit={(e)=>handleSubmit(e)} noValidate={true} >
        <div className="brand">
        <Player
          autoplay
          loop
          speed={0.7}
          src={logo}
          style={{ height: '6rem', width: 'auto' }}
          id='logo'
        >
          
        </Player>
          <h1>Family-Chat</h1>
        </div>
        <input type="text" 
        name='username' 
        placeholder='Username' 
        onChange={(e)=>handleChange(e)}
        />
        <input type="password" 
        name='password' 
        placeholder='Password' 
        
        onChange={e=>handleChange(e)}
        />
        <button type="submit" >Login</button>
        <span>Dont have an account ? <Link to={'/Register'} >Register</Link> </span>
      </form>
      <ToastContainer />
    </FormContainer>
  )

  
}

