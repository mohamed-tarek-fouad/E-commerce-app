import styled from "styled-components"
import { mobile } from "../responsive"
import { useState } from 'react';
import { login } from './../redux/apiCalls';
import { useDispatch, useSelector } from 'react-redux';
const Container=styled.div`
width:100vw;
height:100vh;
background:linear-gradient(rgba(255,255,255,0.5),rgba(255,255,255,0.5)), url("https://images.pexels.com/photos/1253413/pexels-photo-1253413.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940") center;
background-repeat: no-repeat;
background-size: cover;
display:flex;
align-items:center;
justify-content:center;
`
const Wrapper=styled.div`
padding:20px;
width:25%;
background-color:white;
${mobile({width:"75%"})}
`
const Form=styled.form`
display:flex;
flex-direction:column;
`
const Title=styled.h1`
font-size:24px;
font-weight:300;
`
const Input=styled.input`
flex:1;
min-width:40%;
margin:10px 0px;
padding:10px;

`

const Button=styled.button`
width:40%;
border:none;
padding:15px 20px;
background-color:teal;
color:white;
cursor:pointer;
margin-bottom:10px;
&:disabled{
  color:green;
  cursor:not-allowed;
}
`
const Link=styled.a`
margin:5px 0px;
font-size:12px;
text-decoration:underline;
cursor:pointer;
`
const Error=styled.span`
color:red;
`

const Login = () => {
  const [mail,setMail]=useState("")
  const [password,setPassword]=useState("")
  const dispatch=useDispatch()
  const {isFetching,error}=useSelector(state=>state.user)
  const handleClick=(e)=>{
    e.preventDefault()
    login(dispatch,{mail,password})
  }
  return (
    <Container>
      <Wrapper>
          <Title>SIGN IN</Title>
          <Form>
              <Input placeholder="mail" onChange={(e)=>setMail(e.target.value)}/>
              <Input placeholder="password" type="password" onChange={(e)=>setPassword(e.target.value)}/>
              <Button onClick={handleClick} disabled={isFetching}>LOGIN</Button>
              {error&&<Error>something went wrong</Error>}
              <Link>I DONT REMEMBER THE PASSWORD</Link>
              <Link>CREATE A NEW ACCOUNT</Link>
          </Form>
      </Wrapper>
    </Container>
  )
}

export default Login
