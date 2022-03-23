import 'bootstrap/dist/css/bootstrap.min.css'
import { Container, Row, Col, Form, ListGroup, Button, ListGroupItem } from 'react-bootstrap'
import { io } from 'socket.io-client'
import {BsChatLeftTextFill, BsEmojiSmile, BsThreeDots} from "react-icons/bs"
import { FormEvent, KeyboardEventHandler, useEffect, useState } from 'react'
import User from './types/IUser'
import Message from './types/IMessage'

const ADDRESS = 'http://localhost:3030'
const socket = io(ADDRESS, { transports: ['websocket'] })


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
        console.log('Look! another client connected!')
        fetchOnlineUsers()
      })
     

      socket.on('message', (newMessage: Message) => {
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

    const messageToSend: Message = {
      text: message,
      sender: username,
      id: socket.id,
      timestamp: Date.now(),
    }

    socket.emit('sendmessage', messageToSend)
    setChatHistory([...chatHistory, messageToSend])
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
      
      </Row>
    </Container>
  )
}

export default Home