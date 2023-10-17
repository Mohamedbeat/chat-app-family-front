import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import ChatInput from './ChatInput'
import Messages from './Messages'
import axios from 'axios'
import { getAllMsgsRoute, sendMsgRoute } from '../utils/APIRoutes'
import {v4 as uuidv4} from 'uuid'

const Container = styled.div`
position:relative;
display:flex;
flex-direction:column;
// align-items:center;
// justify-content:center;
padding:20px;
width:100%;
height:100%;
overflow:hidden;
svg{
    position:absolute;
    top:10px;
    right:10px;
    cursor:pointer;
    height:30px;
    width:30px;
    z-index:99;
    path{
        width:100%;
        height:100%;
    }
}
.chatHeader{
    flex:1;
    display:flex;
    justify-content:space-between;
    align-items:center;
    padding:0.2rem;
    .userDetails{
        display:flex;
        align-items:center;
        // justify-content:space-around;
        gap:2rem;
        .avatar{
            width:15%;
            height:15%;
            img{
                width:100%;
                height:100%;
            }
        }
        .username{
            display:flex;
            align-items:center;
            justify-content:center;
            h3{
                margin:0;
                font-size:15px;
            }
        }
    }
}
.chatMsgs{
    flex:7;
    padding:1rem 2rem;
    display:flex;
    flex-direction:column;
    gap:1rem;
    overflow:auto;
    .message{
        display:flex;
        align-items:center;
        
        .content{
            max-width:40%;
            overflow-wrap:break-word;
            padding:1rem;
            border-radius:1rem;
            font-size:1.1rem;
            
            color:#d1d1d1;

            p{
                margin:0;
            }
        }
    }
    .sended{
        justify-content:flex-end;
        .content{
            background-color:#7a6def;
        }
    }
    .recived{
        justify-content:flex-start;
        .content{
            background-color:#3f2ced8a;
        }
    }
}
.inputContainer{
    flex:2;
    background-color:#080420;
}

@media (max-width: 640px){
    height:100%;
    padding:40px 20px 0 20px;
    .bi-x-circle{
        top:1rem;
    }
    .chatMsgs{
        .message{

            .content{
                max-width:70%;
            }
        }
    }
}

`


export default function ChatContainer({setCurrentChat, currentChat,currentUser, socket}) {

    const [msgs, setMsgs] =useState([])
    const [arivaleMsg, setArivaleMsg] =useState(null)

    const scrollRef = useRef()
    
    const GETMSGS = async ()=>{
        if(currentChat){

            try {
                const res = await axios.post(getAllMsgsRoute, {
                    from: currentUser._id,
                    to: currentChat._id,
                })
                setMsgs(res.data);
                // console.log(msgs);
            } catch (error) {
                console.log(error);
            }
        }
    }
    useEffect(()=>{
        GETMSGS()
    },[currentChat])
    const handleSendMsg = async (msg)=>{
        try {
            // alert(msg)
            await axios.post(sendMsgRoute, {
                from:currentUser._id,
                to:currentChat._id,
                message: msg,
            })
            console.log(msg);
            socket.current.emit("send-msg", {
                from: currentUser._id,
                to: currentChat._id,
                message: msg,
            })

            const msgsS = [...msgs]
            console.log(msgsS);
            msgsS.push({fromSelf: true, message:msg})
            setMsgs(msgsS)
            
        } catch (error) {
            console.log(error);
        }
    }
    
    console.log(msgs);
    useEffect(()=>{
        if(socket.current){
            socket.current.on("msg-recived", (message)=>{
                console.log(message);
                setArivaleMsg({fromSelf: false, message: message})
            })
        }
    },[socket])

    useEffect(()=>{
        arivaleMsg && setMsgs((prev)=>[...prev, arivaleMsg])
    },[arivaleMsg])

    useEffect(()=>{
        scrollRef.current?.scrollIntoView({behaviour: "smooth"})
    },[msgs])

  return (
    <Container>
        <svg onClick={()=>setCurrentChat(undefined)} xmlns="http://www.w3.org/2000/svg"  fill="currentColor" className="bi bi-x-circle" viewBox="0 0 16 16">
        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
        <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
        </svg>
        <div className="chatHeader">
            <div className="userDetails">
                <div className="avatar">
                <img src={`data:image/svg+xml;base64,${currentChat.avatarImage}`} 
                        alt={`${currentChat.username} avatar`} />
                </div>
                <div className="username">
                    <h3>{currentChat.username}</h3>
                </div>
            </div>
        </div>
        <div className="chatMsgs">
        {/* <Messages />
        <Messages />
        <Messages />
        <Messages /> */}
        {
            msgs?.map((msg, index)=>{
                return(
                    <div key={uuidv4()}  >
                        <div className={`message ${msg.fromSelf ? 'sended' : 'recived'}`} >
                            <div className="content" ref={scrollRef}>
                                <p>{msg.message}</p>
                            </div>
                        </div>
                    </div>
                )
            })
        }
        </div>
        <div className="inputContainer">
        <ChatInput handleSendMsg={handleSendMsg} />
        </div>
    </Container>
  )
}
