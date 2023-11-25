// import "../Home/home.css"
import Card from '../component/Cards/Card';
import axios from 'axios';
import star from "../images/star.png"
import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { Skeleton, Stack } from "@mui/material";



function ProductDetail() {
  const [productData,setProductData] = useState([]);
  const [isData, setIsData] = useState(false);
  // get id with useParams 
  let { productId } = useParams() 
// get data from fakestore aapi
const getData = async ()=>{
   const fetchData = await axios.get("https://fakestoreapi.com/products/"+productId)
   try{
    setProductData(fetchData.data)
    setIsData(true)
  }catch(err){
    console.log(err);
    setIsData(true)
   }
}


  useEffect(()=>{
  getData();
  },[])

  return (
    <div className='main'>
  
      {
       isData ? <Card title={productData.title} image={productData.image} description={productData.description} price={productData.price}  star={star} rating={productData.rating.rate} height={400} />:  <Stack spacing={1}>
        {/* For other variants, adjust the size with `width` and `height` */}
        <Skeleton variant="rectangular" width={350} height={250} />
        <Skeleton variant="rounded" width={350} height={40} />
        <Skeleton variant="rounded" width={350} height={100} />
        <Skeleton variant="rounded" width={350} height={50} />
      </Stack>
      }
      
    </div>
  );
}

export default ProductDetail;
