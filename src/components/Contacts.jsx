import React,{useState,useEffect} from 'react'
import styled from 'styled-components'
import robot from './robot1.json'
import { Player } from '@lottiefiles/react-lottie-player'
import Logout from './Logout'
// import menu from './menu-btn.svg'


const Container = styled.div`
display:grid;
grid-template-rows:10% 75% 15%;
overflow:hidden;
background-color:#080420;
transition:0.2s all;
    
.brand{
    display:flex;
    align-items:center;
    justify-content:center;
    gap:1rem;
    logo{
        height:2rem;
    }
    h3{
        color:white;
        // text-transform:uppercase;
    }
}
.contacts{
    display:flex;
    flex-direction:column;
    align-items:center;
    overflow:auto;
    gap:0.8rem;
    &::webkit-scrollbar{
        width:0.2rem;
        &-thumb{
            background-color:#ffffff39;
            width:0.1rem;
            border-radius:1rem;
        }
    }

    .contact{
        background-color:#ffffff39;
        min-height:5rem;
        width:90%;
        padding:0.4rem;
        border-radius:0.2rem;
        cursor:pointer;
        gap:1rem;
        display:flex;
        align-items:center;
        transition:0.3s all ease-in-out;

        &:hover{
            background-color: #eae8fb;
        }
        .avatar{
            img{
                height:3rem;
            }
        }
        .username{
            display:flex;
            align-items:center;
            justify-content:center;
            h3{
                color:white;
            }
        }
    }
    .selected{
        background-color:#9186f3;
    }
}
.currentUser{
    background-color:#0d0d30;
    display:flex;
    align-items:center;
    justify-content:center;
    gap:2rem;
    padding:0.4rem;
    width:100%;
    border-radius:0.2rem;
    .avatar{
        flex:1;
        img{
            height:4rem;
            max-inline-size:100%;
        }
    }
    .username{
        flex:2;
        h2{
            font-size:1rem;
        }
    }
    .logout{
        flex:1;
    }
    @media screen and (min-width:720px) and (max-width:1080px) {
    .username{
        h3{
            font-size:1rem;
        }
    }    
    }
}
@media (max-width: 640px){
    z-index:100;
    position:absolute;
    transition:0.2s all;
    left:-100%;
    width:100%;
    display:flex;
    flex-direction:column;
    align-items:center;
    justify-content:space-between;
    height:85vh;
    gap:20px;
    background-color:;
    padding-left:20px;
    padding-right:20px;
    .brand{
        margin-top:10px;
        display:flex;
        align-items:center;
        justify-content:center;
        h3{
            margin-bottom:0;
            margin-top:10px;
        }
    }
    .contacts{
        width:100%;
        .contact{
            width:100%;
        }
    }
}
`

export default function Contacts({contacts,currentUser, menuState,handleChatChange, setMenuState, currentChat}) {
    const [currentUserName, setCurrentUserName] = useState(undefined)
    const [currentUserImage, setCurrentUserImage] = useState(undefined)
    const [currentSelected, setCurrentSelected] = useState(undefined)
    // if(currentChat===undefined){
    //     setCurrentSelected(undefined)
    // }
    useEffect(()=>{
        if(currentUser){
            setCurrentUserImage(currentUser.avatarImage)
            setCurrentUserName(currentUser.username)
        }
    },[currentUser])

    const changeCurrentChat = (index, contact)=>{
        setCurrentSelected(index)
        handleChatChange(contact)
        setMenuState(!menuState)
        document.getElementById('menuContainer').style.left='-100%'
        console.log(menuState);
    }

  return (
    <>
        {
            currentUserImage && currentUserName && <Container 
            className={``} 
            id='menuContainer'>
                
                <div className="brand">
                <Player
                autoplay
                loop
                speed={0.7}
                src={robot}
                style={{ height: '2rem', width: 'auto' }}
                id='logo'
                >
                
                </Player>
                <h3>Family-Chat</h3>
                </div>
                <div className="contacts">
                    {
                        contacts.map((contact, index)=>{
                            return (
                                <div className={`contact ${currentSelected === index ? "selected" : ""}`} 
                                key={index}
                                onClick={()=>changeCurrentChat(index, contact)}
                                >
                                    <div className="avatar">
                                        <img src={`data:image/svg+xml;base64,${contact.avatarImage}`} 
                                        alt={`${contact.username} avatar`} />
                                    </div>
                                    <div className="username">
                                        <h3>{contact.username}</h3>
                                    </div>
                                </div>
                            )
                        })
                    }
                    
                </div>
                <div className="currentUser">
                    <div className="avatar">
                        <img src={`data:image/svg+xml;base64,${currentUserImage}`} 
                        alt={`${currentUserName} avatar`} />
                    </div>
                    <div className="username">
                            <h2>{currentUserName}</h2>
                    </div>
                    <div className="logout" >
                    <Logout />
                    </div>
                </div>
            </Container>
        }
    </>
  )
}
