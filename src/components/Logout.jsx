import React from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import axios from 'axios'



    const Container = styled.div`

    
    svg{
        color:white;
        cursor:pointer;
        height:40px;
        width:50px;
        // z-index:99;
        padding:5px;
        border-radius:0.8rem;
        background-color:red;
        path{
            color:white;
            width:auto;
            height:100%;
        }
    }
    `

export default function Logout() {
    const navigate = useNavigate()
    const handleClick = ()=>{
        
            localStorage.removeItem('chat-app-user-family')
            navigate('/login')
    }
  return (
    <Container onClick={handleClick}>
   
   <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fillRule="currentColor" className="bi bi-power" viewBox="0 0 16 16">
  <path d="M7.5 1v7h1V1h-1z"/>
  <path d="M3 8.812a4.999 4.999 0 0 1 2.578-4.375l-.485-.874A6 6 0 1 0 11 3.616l-.501.865A5 5 0 1 1 3 8.812z"/>
</svg>
    </Container>
  )
}
