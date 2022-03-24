import styled from "styled-components"
import Navbar from "../components/Navbar"
import Announcments from './../components/Announcments';
import Products from "../components/Products";
import NewsLetter from "../components/Newsletter";
import Footer from "../components/Footer"
import { mobile } from "../responsive";
import { useLocation } from "react-router-dom";
import { useState } from 'react';
const Container=styled.div`

`
const Title=styled.h1`
margin:20px;
`
const FilterContainer=styled.div`
display:flex;
justify-content:space-between;
`
const Filter=styled.div`
margin:20px;
${mobile({margin:"0px 20px",display:"flex",flexDirection:"column"})}
`
const FilterText=styled.span`
fontsize:20px;
font-weight:600;
margin-right:20px;
${mobile({marginRight:"0px"})}
`
const Select=styled.select`
padding:10px;
margin-right:20px;
${mobile({margin:"10px 0px"})}
`
const Option=styled.option`

`

const ProductList = () => {
    const location=useLocation();
  const cat= location.pathname.split("/")[2]
  const [filter,setFlilters]=useState({});
  const [sort,setSort]=useState("newest")
  const handleFilters=(e)=>{
const value=e.target.value;
setFlilters({
    ...filter,
   [e.target.name]:value
});
  };
 
  return (
    <Container>
      <Navbar></Navbar>
    <Announcments></Announcments>
    <Title>{cat}</Title>
    <FilterContainer>
        <Filter>
            <FilterText>Filter products</FilterText>
            <Select name="color" onChange={handleFilters}>
                <Option disabled >
                    Color
                </Option>
                <Option>white</Option>
                <Option>black</Option>
                <Option>red</Option>
                <Option>blue</Option>
                <Option>yellow</Option>
                <Option>green</Option>
            </Select>
            <Select name="size" onChange={handleFilters}>
                <Option disabled >
                    Size
                </Option>
                <Option>XS</Option>
                <Option>S</Option>
                <Option>M</Option>
                <Option>L</Option>
                <Option>XL</Option>
            </Select>
        </Filter>
        <Filter>
            <FilterText>Sort products</FilterText>
            <Select onChange={e=>setSort(e.target.value)}>
                <Option value="newest">Newest</Option>
                <Option value="asc">Price (asc)</Option>
                <Option value="desc">Price (desc)</Option>
            </Select>
        </Filter>
    </FilterContainer>
    <Products cat={cat} filter={filter} sort={sort}/>
    <NewsLetter/>
    <Footer/>
    </Container>
  )
}

export default ProductList