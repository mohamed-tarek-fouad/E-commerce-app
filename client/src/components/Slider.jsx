import styled from "styled-components"
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import {sliderItem} from "../data"
import { useState } from "react";
import { mobile } from './../responsive';

const Container=styled.div`
width:100%;
height:100vh;
display:flex;
position:relative;
overflow:hidden;
padding-top:10px;
${mobile({display:"none"})}
`
const Arrow=styled.div`
width:50px;
height:50px;
background-color:white;
border-radius:50%;
display:flex;
align-items:center;
justify-content:center;
position:absolute;
top:0;
bottom:0;
margin:auto;
left:${props=>props.direction==="left"&&"10px"};
right:${props=>props.direction==="right"&&"10px"};
cursor:pointer;
opacity:0.5;
z-index:2;
`
const Wrapper=styled.div`
height:100%;
display:flex;
transition:all 1.5s ease;
transform:translateX(${props=>props.slideIndex*-100}vw);
`
const Slide = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  background-color: #${(props) => props.bg};
`;
const ImgContainer=styled.div`
flex:1;
height:100%;
`
const InfoContainer=styled.div`
flex:1;
padding:50px;
`
const Img=styled.img`
height:80%;
`
const Title=styled.h1`
font-size:70px;

`
const Description=styled.p`
margin:50px 0px;
font-weight:500;
font-size:20px;
letter-spacing:3px
`
const Button=styled.button`
padding:10px;
font-size:20px;
background-color:transparent;
cursor:pointer;
`

const Slider = () => {
  const[slideIndex,setSlideIndex]=useState(0)
    const handleClick=(direction)=>{
if(direction==="left"){
  setSlideIndex(slideIndex > 0 ? slideIndex-1 : 2);
}else{
  setSlideIndex(slideIndex < 2 ? slideIndex+1 : 0);
}
    };
    const handleit=()=>{
window.scrollTo(0,1600)
    }
  return (
    <Container>
      <Arrow direction="left" onClick={()=>handleClick("left")}>
      <ArrowLeftIcon></ArrowLeftIcon>
      </Arrow>
      <Wrapper slideIndex={slideIndex}>
        {sliderItem.map((item)=>( <Slide bg={item.bg} key={item.id}>
          <ImgContainer>
          <Img src={item.img}/>
          
          </ImgContainer>
          <InfoContainer>
              <Title>{item.title}</Title>
              <Description>{item.desc}</Description>
              <Button onClick={()=>handleit()}>show now</Button>
          </InfoContainer>
          </Slide>
          ))}
      </Wrapper>
      <Arrow direction="right" onClick={()=>handleClick("right")}>
      <ArrowRightIcon></ArrowRightIcon>
      </Arrow>
    </Container>
  )
}

export default Slider
