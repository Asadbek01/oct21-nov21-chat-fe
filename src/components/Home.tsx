import 'bootstrap/dist/css/bootstrap.min.css'
import { Container, Row, Col, Form, ListGroup, Button, ListGroupItem } from 'react-bootstrap'
import { io } from 'socket.io-client'
import {BsChatLeftTextFill, BsEmojiSmile, BsThreeDots} from "react-icons/bs"

import { FormEvent, KeyboardEventHandler, useEffect, useState } from 'react'
<<<<<<< HEAD
import User from './types/IUser'
import Message from './types/IMessage'
=======
import User from '../types/IUser'
import Message from '../types/IMessage'
>>>>>>> 9d3779e4f47f829479c7ba8309f9d416cba60aac

const ADDRESS = 'http://localhost:3030'
const socket = io(ADDRESS, { transports: ['websocket'] })

<<<<<<< HEAD
=======
// 1) EVERY TIME I REFRESH THE BROWSER, A CONNECTION ESTABLISHES WITH THE SERVER
// 2) IF THE SERVER WELCOMES US, IT WILL RESPOND US WITH A 'connect' EVENT
// 3) WE CAN SET UP AN EVENT LISTENER FOR IT, AND WE CAN EXECUTE OUR LOGIC WHEN THAT HAPPENS
// 4) WE CAN SUBMIT NOW OUR USERNAME TO THE SERVER, EMITTING A 'setUsername' EVENT
// 5) IF THE SERVER ACCEPTS OUR USERNAME, IT WILL EMIT US BACK ANOTHER EVENT, CALLED 'loggedin'
// 6) WE CAN SET UP ANOTHER EVENT LISTENER FOR THE 'loggedin' EVENT
// 7) LISTENING TO THIS 'loggedin' EVENT ALLOWS US TO DISABLE THE USERNAME FIELD AND ENABLE THE MESSAGE FIELD
// 8) AFTER LOGGIN IN WE CAN FETCH THE LIST OF ONLINE USERS WITH fetchOnlineUsers()
// 9) THE SERVER DOESN'T JUST SEND A 'loggedin' EVENT WHENEVER A NEW CLIENT CONNECTS, IT'S ALSO SENDING AN EVENT OF TYPE
// 'newConnection' TO ALL THE OTHER CLIENTS CURRENTLY CONNECTED
// 10) WE CAN SET UP AN EVENT LISTENER FOR 'newConnection' IN ORDER TO BEING AWARE WHEN SOMEONE ELSE ENTERS THE CHAT
// 11) WHEN WE SEND A MESSAGE WE CAN EMIT A 'sendmessage' EVENT FOR DISPATCHING MESSAGES TO THE SERVER
// 12) AFTER SENDING A MESSAGE WE ALSO NEED TO TAKE CARE OF OUR CHAT HISTORY, APPENDING OUR MESSAGE AT THE END OF IT
// 13) FINALLY, WE NEED TO SET AN EVENT LISTENER FOR RECEIVING MESSAGES FROM THE SERVER (COMING FROM OTHER CLIENTS):
// WE NEED TO SET UP A LISTENER FOR THE 'message' EVENT AND APPEND EVERY MESSAGE WE RECEIVE TO OUR CHAT HISTORY,
// TAKING CARE OF RE-EVALUATING THE VALUE OF chatHistory BEFORE APPENDING THE MESSAGE (OTHERWISE chatHistory WILL BE STUCK
// WITH ITS INITIAL VALUE, WHICH IS AN EMPTY ARRAY)
>>>>>>> 9d3779e4f47f829479c7ba8309f9d416cba60aac

const Home = () => {
  const [username, setUsername] = useState('')
  const [message, setMessage] = useState('')
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [onlineUsers, setOnlineUsers] = useState<User[]>([])
  const [chatHistory, setChatHistory] = useState<Message[]>([])

  useEffect(() => {
    
    socket.on('connect', () => {
      console.log('connection established!')
    })

    socket.on('loggedin', () => {
      console.log("You're correctly logged in now")
      setIsLoggedIn(true)
      fetchOnlineUsers()

      socket.on('newConnection', () => {
<<<<<<< HEAD
        console.log('Look! another client connected!')
        fetchOnlineUsers()
      })
     

      socket.on('message', (newMessage: Message) => {
=======
        // this is for the already connected clients!
        // will never be sent to a user that just logged in
        console.log('Look! another client connected!')
        fetchOnlineUsers()
      })

      socket.on('message', (newMessage: Message) => {
        // setChatHistory([...chatHistory, newMessage])
        // bug?
>>>>>>> 9d3779e4f47f829479c7ba8309f9d416cba60aac
        setChatHistory((currentChatHistory) => [
          ...currentChatHistory,
          newMessage,
        ])
      })
    })
  }, [])

  const handleUsernameSubmit = (e: FormEvent) => {
    e.preventDefault()
    socket.emit('setUsername', {
      username,
    })
  }

  const fetchOnlineUsers = async () => {
    try {
      let response = await fetch(ADDRESS + '/online-users')
      if (response.ok) {
        let data = await response.json()
        console.log('online users: ', data)
        let users = data.onlineUsers
        setOnlineUsers(users)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleMessageSubmit = (e: FormEvent) => {
    e.preventDefault()

<<<<<<< HEAD
=======
    // a valid message for our platform is made by these properties
    // text
    // sender
    // timestamp
    // id

>>>>>>> 9d3779e4f47f829479c7ba8309f9d416cba60aac
    const messageToSend: Message = {
      text: message,
      sender: username,
      id: socket.id,
      timestamp: Date.now(),
    }

    socket.emit('sendmessage', messageToSend)
    setChatHistory([...chatHistory, messageToSend])
<<<<<<< HEAD
=======
    // [...chatHistory] <-- creates an exact copy of chatHistory
>>>>>>> 9d3779e4f47f829479c7ba8309f9d416cba60aac
    setMessage('')
  }

  return (
    <Container fluid className='px-4 mt-3'>
      <Row style={{ height: '95vh' }}>
     <Col md={3}>
     <Row style={{border:'1px solid gray' , height: "95vh" }} className='  sidebar'>
     <Col md={8} className='mt-2' >
       <Col md={8}>
       
                  <img src="https://picsum.photos/50" alt="avatar" style={{borderRadius:"50%"}} />
       </Col>

                  </Col>
                  <Col md={4} className='mt-2' >
                  <BsChatLeftTextFill style={{fontSize:"20px", color:"gray"}} className='mr-3'/><BsThreeDots style={{fontSize:"20px", color:"rgb(84 101 11)"}}/>
                  </Col>
                
             <strong className='text-light' style={{ margin: 80}}> No conversation yet</strong>
           </Row>
     </Col>
        
        <Col md={9} className='d-flex flex-column justify-content-between header'>
         
          <Col md={3} className='ml-auto'>
          <Form onSubmit={handleUsernameSubmit} className='mt-1'>
            <Form.Control
              type='text'
              placeholder='Enter your username'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              disabled={isLoggedIn}
            />
          </Form>
<<<<<<< HEAD
          
          </Col>
          <ListGroup >
            {chatHistory.map((message) => (
               username === message.sender ? (

                 <ListGroup.Item key={message.timestamp} className="d-flex ml-auto  mt-1" style={{borderStyle: "none", width: "40%"}} >
                <img src="https://picsum.photos/50" alt="avatar" style={{borderRadius:"50%"}} />
              <div className='m-2'>
                <strong className='mr-2'>{message.sender}:</strong>
                {message.text}
                </div>
                <span className='ml-auto mt-4 text-secondary'>{new Date(message.timestamp).toLocaleTimeString()}</span>
              </ListGroup.Item>
                ) : (
                  <ListGroup.Item key={message.timestamp} className="d-flex m-1 " style={{borderStyle: "none", width: "40%"}} >
                 <img src="https://picsum.photos/50" alt="avatar" style={{borderRadius:"50%"}} />
              <div className='m-2'>
                <strong className='mr-2'>{message.sender}:</strong>
                {message.text}
                </div>
                <span className='ml-auto mt-4 text-secondary'>{new Date(message.timestamp).toLocaleTimeString()}</span>
                </ListGroup.Item>
                )
            ))}
          </ListGroup>
          <Form onSubmit={handleMessageSubmit} className='mb-2'>
            <Form.Control
              type='text'
              placeholder='😀 Enter your message'
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              disabled={!isLoggedIn}
              />
          </Form>
        </Col>
      
=======
          {/* MIDDLE SECTION: CHAT HISTORY */}
          <ListGroup>
            {chatHistory.map((message) => (
              <ListGroup.Item key={message.timestamp}>
                {message.text}
              </ListGroup.Item>
            ))}
          </ListGroup>
          {/* BOTTOM SECTION: NEW MESSAGE INPUT FIELD */}
          <Form onSubmit={handleMessageSubmit}>
            <Form.Control
              type='text'
              placeholder='Enter your message'
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              disabled={!isLoggedIn}
            />
          </Form>
        </Col>
        <Col md={2}>
          {/* ONLINE USERS COL */}
          <div className='mb-3'>Connected users:</div>
          <ListGroup>
            {onlineUsers.map((user) => (
              <ListGroup.Item key={user.id}>{user.username}</ListGroup.Item>
            ))}
          </ListGroup>
        </Col>
>>>>>>> 9d3779e4f47f829479c7ba8309f9d416cba60aac
      </Row>
    </Container>
  )
}

export default Home