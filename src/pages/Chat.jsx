import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { HOST, allUsersRoute } from '../utils/APIRoutes';
import Contacts from '../components/Contacts';
import './css.css'
import Welcome from '../components/Welcome';
import ChatContainer from '../components/ChatContainer';
import {io} from 'socket.io-client'


const Container = styled.div`
height:100vh;
width:100vw;
display:flex;
flex-direction:column;
justify-content:center;
gap:1rem;
align-items:center;
background-color:#131324;
color:white;
.menu{
  display:none;
  transition:0.2s all;
}
.container{
  height:85vh;
  width:85vw;
  background-color:#00000076;
  grid-template-columns: 25% 75%;
  display: grid;
  @media screen and (min-width:720px) and (max-width:1080px) {
    grid-template-columns: 35% 65%;
  }
  
}

@media screen and (max-width:640px)  {
  grid-template-columns: 30% 70%;
}
@media (max-width: 640px){
  position:relative;
  display :flex;
  flex-direction:column;
  // justify-content:end;
  
  width:100%;
  .menu{
    position:absolute;
    display:block;
    color:white;
    top:4rem;
    left:1rem;
    cursor:pointer;
    height:30px;
    transition:0.2s all;
    z-index:150;
    svg{
      height:100%;
      width:100%;
    }
  }
  .container{
    display:flex;
    flex-direction:column;
    align-items:center;
    justify-content:center;
    width:100%;



  }
}
`

export default function Chat() {
  const socket = useRef()
// console.log(localStorage.getItem('chat-app-user'));
const navigate = useNavigate()
const [contacts, setContacts] = useState([])
const [currentUser, setCurrentUser] = useState(undefined)
const [currentChat, setCurrentChat] = useState(undefined)
const[menuState, setMenuState]=useState(false)


const toastOptions ={
  position:'top-right',
  autoClose:8000,
  pauseOnHover:true,
  draggable:true,
  theme:'dark'
}

  useEffect(()=>{
    if(currentUser){
      socket.current = io(HOST)
      socket.current.emit("add-user", currentUser._id)

    }
  },[currentUser])

useEffect(()=>{
  
  if(!localStorage.getItem('chat-app-user-family')){
      navigate('/login')
  }else{
    setCurrentUser(JSON.parse(localStorage.getItem('chat-app-user-family')))
  }
  
},[])

const getAllcontacts = async ()=>{
    
      try {
        if(currentUser.isAvatarSet){
    // console.log(`${allUsersRoute}/${currentUser._id}`);
          const allUsers = await axios.get(`${allUsersRoute}/${currentUser._id}`)
          setContacts(allUsers.data)
        }else{
          navigate('/setAvatar')
        }
  } catch (error) {
    // toast.error(error.message, toastOptions)
    // console.log(error);
  }
    
  
}

useEffect(()=>{

    getAllcontacts()

},[currentUser])

const toggleMenu = ()=>{
  document.getElementById('menu').style.transition='0.2s all'
  // console.log(menuState);
  

  if(menuState){
    document.getElementById('menuContainer').style.left='-100%'
    document.getElementById('menu').style.rotate='180deg'
    setMenuState(!menuState)
  }else{
    document.getElementById('menuContainer').style.left='0%'
    document.getElementById('menu').style.rotate='0deg'
    setMenuState(!menuState)
  }
  // console.log(document.getElementById('menuContainer').classList);
}
const handleChatChange = (chat)=>{
  setCurrentChat(chat)
}


  return (
    <Container>
      <div  className='menu'  onClick={()=>toggleMenu}>
                <svg onClick={toggleMenu} id='menu' xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-list" viewBox="0 0 16 16">
                <path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"/>
                </svg>
      </div>
      <div 
      // className={`${menuState ? 'container' : ''} ${menuState ? '' : 'menuhide'} `}
      className='container'
       >
        <Contacts contacts={contacts} currentUser={currentUser} menuState={menuState}
        setMenuState ={setMenuState}
        handleChatChange={handleChatChange} 
        currentChat={currentChat}
        />{
          currentChat === undefined ?
          <Welcome currentUser={currentUser} />
          : 
          <ChatContainer setCurrentChat={setCurrentChat} currentChat={currentChat} 
          currentUser={currentUser} socket={socket} />
        }
      </div>
      <ToastContainer />
    </Container>
  )
}
