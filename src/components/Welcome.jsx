import React from 'react'
import styled from 'styled-components'
import robotWelcome from './robot-welcome.json'
import { Player } from '@lottiefiles/react-lottie-player'



const Container = styled.div`
display:flex;
flex-direction:column;
align-items:center;
justify-content:center;

#robotWelcome{
    width:40%;
    height:auto;
}
h1{

    span{
        color:#4e00ff;
    }
}

@media (max-width: 640px){
    #robotWelcome{
        width:60%;
        height:auto;
    }
    
}
`

export default function Welcome({currentUser}) {
  return (
    <Container>
        <Player
          autoplay
          loop
          speed={0.7}
          src={robotWelcome}
          id='robotWelcome'
        >
          
        </Player>
        <h1>Welcome, <span>{currentUser?.username}!</span></h1>
        <h3>Contact your friends :)</h3>
    </Container>
  )
}
