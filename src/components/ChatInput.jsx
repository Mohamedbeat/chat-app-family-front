import React, { useState } from 'react'
import styled from 'styled-components'
import Picker from 'emoji-picker-react'
// import emoji from './emoji-laughing.svg'
// import send from './send.svg'


const Container = styled.div`

display:grid;
grid-template-columns:5% 95%;
align-items:center;
background-color:#080420;
height:100%;
width:100%;

.button-container{
    .emoji{
        position:relative;
        svg{
            position:unset;
            color:white;
            cursor:pointer;
            height:40px;
            width:50px;
            // z-index:99;
            padding:5px;
            border-radius:0.8rem;
            background-color:#9186f3;
            path{
                color:white;
                width:auto;
                height:100%;
            }
        }
        .EmojiPickerReact{
            scale:80%;
            left:-35px;
            position:absolute;
            top:-405px;
            z-index:90;
            background-color:#080420;
            box-shadow: 0 5px 10px #9a86f3;
            border-color:#8186f3;

            .emoji-scroll-wrapper::webkit-scrollbar{
                background-color:#080420;
                width:5px;
                &-thumb{
                    background-color:#8186f3;
                }
            }
            
            .emoji-categories{
                button{
                    filter:contrast(0);
                }
            }
            .epr-preview{
                display:none;
            }
            .epr-search{
                background-color:transparent;
                border-color:#8186f3;
            }
            .epr-emoji-category-label{
                background-color:transparent;
            }
        }
    }
}
.input-container{
    display:flex;
    align-items:center;
    justify-content:space-around;
    input{
        width:80%;
        height:40px;
        background-color:#6656ef75;
        color:white;
        border:none;
        border-radius:2rem;
        padding-left:1rem;
        font-size:1rem;
        transition:0.2s all;
        &::selection{
            background-color:#9186f3;
        }
        &::focus{
            outline:none;
        }
    }
    svg{
        position:unset;
        color:white;
        cursor:pointer;
        height:40px;
        width:50px;
        z-index:1;
        padding:5px;
        border-radius:0.8rem;
        background-color:#9186f3;
        path{
            color:white;
            width:auto;
            height:100%;
        }
    }
}

@media (max-width: 640px){
    gap:20px;
    .input-container{
        justify-content:center;
        gap:15px;
        input{
            width:60%;
            font-size:14px;
        }
    }
}
`


export default function ChatInput({handleSendMsg}) {
    const [showEmojiPicker, setShowEmojiPicker] = useState(false)
    const [msg, setMsg] = useState("")

    const handleEmojiPicker =()=>{
        setShowEmojiPicker(!showEmojiPicker)
        // console.log(showEmojiPicker);
    }

//     const onEmojiClick = (event, emojiObject)=>{
//         let message = msg;
// console.log(emojiObject);
//         message += emojiObject.emoji;
//         console.log(emojiObject.emoji);
//         setMsg(message)
//     }
// console.log(msg);

    const sendChat = (event)=>{
        event.preventDefault()
        if(msg.length>0){
            handleSendMsg(msg)
            setMsg('')
        }
    }
  return (
    <Container>
        <div className="button-container">
            <div className="emoji">
             {showEmojiPicker&& <Picker onEmojiClick={(emojiObject)=>setMsg((prevMsg)=>prevMsg + emojiObject.emoji)} />}   
            <svg onClick={handleEmojiPicker} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-emoji-laughing" viewBox="0 0 16 16">
            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
            <path d="M12.331 9.5a1 1 0 0 1 0 1A4.998 4.998 0 0 1 8 13a4.998 4.998 0 0 1-4.33-2.5A1 1 0 0 1 4.535 9h6.93a1 1 0 0 1 .866.5zM7 6.5c0 .828-.448 0-1 0s-1 .828-1 0S5.448 5 6 5s1 .672 1 1.5zm4 0c0 .828-.448 0-1 0s-1 .828-1 0S9.448 5 10 5s1 .672 1 1.5z"/>
            </svg>
                
            </div>
        </div>
        <form action="" className="input-container" onSubmit={(e)=>sendChat(e)}>
            <input type="text" placeholder='Type your message here' value={msg} onChange={(e)=>setMsg(e.target.value)} onClick={()=>setShowEmojiPicker(false)} />
                <svg onClick={(e)=>{
                    setShowEmojiPicker(false)
                    sendChat(e)
                }}
                 className='submit bi bi-send' xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"  viewBox="0 0 16 16">
                <path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576 6.636 10.07Zm6.787-8.201L1.591 6.602l4.339 2.76 7.494-7.493Z"/>
                </svg>
        </form>


    </Container>
  )
}
