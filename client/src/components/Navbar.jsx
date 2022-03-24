import React from 'react'
import styled from "styled-components";
import { Search } from "@material-ui/icons"
import Badge from '@mui/material/Badge';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import{mobile} from "../responsive"
import { useDispatch, useSelector } from 'react-redux';
import {Link} from "react-router-dom";
import { useNavigate } from "react-router-dom";
import LogoutIcon from '@mui/icons-material/Logout';
import { logout } from '../redux/userSlice';


const Container = styled.div`
  height:60px;
  margin-bottom:3px;
  padding-bottom:10px;
  background-color: #fcf5f5;
  ${mobile({height:"50px"})}
  
  
`;
const Wrapper=styled.div`
padding: 10px 20px;
display:flex;
justify-content:space-between;
align-items:center;
${mobile({padding:"10px 0px"})}
`
const Left=styled.div`flex:1;
display:flex;
align-items:center;

`
const Right=styled.div`flex:1;
display:flex;
align-items:center;
justify-content:flex-end
${mobile({flex:2,justifyContent:"center"})}
`
const Center=styled.div`flex:1;
text-align:center;
`
const Language=styled.span`
font-size:14px;
cursor: pointer;
${mobile({display:"none"})}
`
const SearchContainer=styled.div`
border:0.5px solid lightgray;
display:flex;
align-items:center;
margin-left:25px;

`
const Input=styled.input`
border:none;
${mobile({width:"50px"})}
`
const Logo=styled.h1`
font-weight:bold;
cursor:pointer;
${mobile({fontSize:"24px"})};

`
const MenuItem=styled.div`
font-size:14px;
cursor:pointer;
margin-left:25px;
${mobile({fontSize:"12px",marginLeft:"10px"})}
`


const Navbar = () => {
  const quantity =useSelector(state=>state.cart.quantity)
  let navigate = useNavigate();
  
  const handLogOut=()=>{
logout()
  }
  const handClick=()=>{
    navigate("/")
  }
  return (
    <Container>
      <Wrapper>
        <Left>
          <Language>EN</Language>
          <SearchContainer>
            <Input placeholder='search'></Input>
            <Search style={{color:"gray",fontSize:16}}></Search>
          </SearchContainer>
        </Left>

        <Center>
          <Logo onClick={()=>handClick()}>
            
            MAWLANAA.
           
          </Logo>
          </Center>
        <Right>
          <Link to="/register">
            <MenuItem>Register</MenuItem>
          </Link>
          <Link to="/login">
          <MenuItem>Sign In</MenuItem>
          </Link>
          <MenuItem>
          <Link to="/cart">
          <Badge badgeContent={quantity} color="primary">
      <ShoppingCartOutlinedIcon color="action" />
          </Badge>
          </Link>
          </MenuItem>
          <LogoutIcon style={{paddingLeft:"200px",cursor:'pointer'}}onClick={()=>handLogOut()}/>
        </Right>
      </Wrapper>
      
    </Container>
  )
}

export default Navbar
