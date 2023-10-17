import React, {useState, useEffect} from 'react'
import {  useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { Player } from '@lottiefiles/react-lottie-player';
import loader from './Animation - 1697308900233.json'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios'
import { SetAvatarRoute } from '../utils/APIRoutes';
import { Buffer } from 'buffer';

// FORM CONTAINER COMPONENT
const Container = styled.div`
display:flex;
align-items:center;
justify-content:center;
flex-direction:column;
gap:3rem;
background-color:#131324;
height:100vh;
width:100vw;

.loader{
    max-inline-size:100%;
}
.titleContainer{
    h1{
        color:white;
    }
}
.avatars{
    display:flex;
    gap:2rem;
    .avatar{
        border:0.4rem solid transparent;
        padding:0.4rem;
        border-radius:50%;
        display:flex;
        align-items:center;
        justify-content:center;
        transition:0.5s all ease-in-out;
        cursor:pointer;
        &:hover{
            border:0.4rem solid #8a0eff;
        }
        img{
            height:6rem;
        }
    }
    .selected{
        border:0.4rem solid #4e0eff;
    }
}
.submitBtn{
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
  @media (max-width: 640px){
    display:flex;
    align-items:center;
    justify-content:center;
    .titleContainer{
        h1{
            font-size:18px;
        }
    }
    .avatars{
        display:flex;
        flex-direction:row;
        flex-wrap:wrap;
        align-items:center;
        justify-content:center;
        .avatar{
            width:30vw;
            img{
                width:100%;
                height:auto;
            }
        }
    }
  }
`

export default function SetAvatar() {

    const api = "https://api.multiavatar.com";
    const navigate = useNavigate()
    const [avatars, setAvatars] =useState([])
    const [isLoading, setIsLaoding] =useState(false)
    const [ready, setReady] = useState(true)
    const [selectedAvatar, setSelectedAvatar] =useState(undefined)
    const toastOptions ={
        position:'top-right',
        autoClose:8000,
        pauseOnHover:true,
        draggable:true,
        theme:'dark'
      }
      
    useEffect(()=>{
        if(!localStorage.getItem('chat-app-user-family')){
            navigate('/login')
        }
    },[])
      
    useEffect(()=>{
        const setProfiePicture = async ()=>{
        try{
            setIsLaoding(true)
            const data = []
            let  i = 0;
            while(i<4){

                const image = await axios.get(`${api}/${Math.round(Math.random() * 1000)}`)
                
                const buffer =new Buffer(image.data);
                data.push(buffer.toString("base64"))
                console.log(i);
                i++;
            }
            
            // console.log(data);
            setAvatars(data)
            // console.log(avatars);
            setIsLaoding(false)
            setReady(true)
    }catch(error){
        console.log(error);
    }
      }
        setProfiePicture()
    },[])
    // console.log(selectedAvatar);
    const setPP = async ()=>{
        if(selectedAvatar===undefined){
            toast.error("Choose an avatar", toastOptions)
        }else{
            const user = await JSON.parse(localStorage.getItem('chat-app-user-family'))
            const {data} = await axios.post(`${SetAvatarRoute}/${user._id}`,{
                image: avatars[selectedAvatar]
            })
            console.log(data);
            if(data.isSet){
                user.isAvatarSet=true
                user.avatarImage=data.avatarImage
                localStorage.setItem('chat-app-user-family', JSON.stringify(user))
                navigate('/')
            }else{
                toast.error('Error setting avatar, please try again !', toastOptions)
            }
        }
    }
  return (
        <>
      <Container>
        <div className="titleContainer">
            <h1>Pick an avatar for your profile picture:</h1>
        </div>
        
            {
                    isLoading ?
                    <>
                    <Player
                    autoplay
                    loop
                    speed={0.7}
                    src={loader}
                    style={{ height: '5rem', width: 'auto' }}
                  >
                    {/* <Controls visible={true} buttons={['play', 'repeat', 'frame', 'debug']} /> */}
                  </Player>
                    </>
                    :
                    <>
                    <div className="avatars">
            {ready && avatars.map((avatar, index)=>{
                    return <div key={index} className={`avatar ${selectedAvatar === index ? "selected" : ""} `}
                    >1
                        <img src={`data:image/svg+xml;base64,${avatar}`} alt="avatar" 
                        onClick={()=>setSelectedAvatar(index)}/>
                    </div>
                        }
                        
                        
                    )}
                    </div>
                    </>
                     
                }
        <button className='submitBtn' onClick={setPP} >Set as Profile Picture</button>
    </Container>
    <ToastContainer />
    </>
  )
}
