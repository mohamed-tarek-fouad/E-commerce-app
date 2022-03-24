import React from 'react'
import styled from "styled-components";
const Container = styled.div`
height:60px;
background-color:teal;
color:white;
display:flex;
align-items:center;
justify-content:center;
font-size:14px;
font-weight:500;

`
const Announcments = () => {
  return (
    <Container>
     <h1>DON'T COMPROMISE ON STYLE! GET FLAT 30% OFF FOR NEW ARRIVALS</h1> 
    </Container>
  )
}

export default Announcments
