import Card from '../component/Cards/Card';
import axios from 'axios';
import star from "../images/star.png"
import { useState, useEffect } from 'react';
import { Skeleton, Stack, TextField } from "@mui/material";
import { useNavigate } from 'react-router-dom';
import { Option, Select } from '@mui/joy';



function Products() {
  const [productData,setProductData] = useState([]);
  const [isData, setIsData] = useState(false);
  const [filter, setFilter] = useState("");

  const navigate = useNavigate()
// get data from fakestore aapi
  const getData = async ()=>{

   const fetchData = await axios.get("https://fakestoreapi.com/products")
   try{
    setProductData(fetchData.data)
    setIsData(true)
  }catch(err){
    console.log(err);
    setIsData(true)
   }
}

// call getdata on every reload
  useEffect(()=>{
  getData();
  },[])

  // render data as per filter
  const filterHandler = (e, newValue) => {
    newValue === "clear" ? setFilter("") : setFilter(newValue);
  };

  const addToCart = (e)=>{
    console.log("running",e)
    // const cart =
     localStorage.setItem("user",JSON.stringify(e))
     const a = localStorage.getItem("user")
     console.log(JSON.parse(a))
  }
  
  return (
    <div className="main">
    <Select defaultValue="clear" onChange={filterHandler}>
      <Option value="clear">filter</Option>
      <Option value="men's clothing">men's clothing</Option>
      <Option value="jewelery">jewelery</Option>
      <Option value="electronics">electronics</Option>
      <Option value="women's clothing">women's clothing</Option>
    </Select>

    {isData ? ( // if data fetched from api
      filter ? ( // if user add filter show this
        productData
          .filter((e, i) => e.category.includes(filter))
          .map((e, i) => {
            const { title, image, description, rating, price, category } = e;
            return (
              <Card
                title={title}
                catagory={category}
                image={image}
                description={description}
                price={price}
                rating={rating.rate}
                key={i}
                star={star}
                onClick={() => navigate("/product-details/" + (i + 1))}
                addToCart={()=>addToCart(e)}
              />
            );
          })
      ) : (
        // if user remove filter show this
        productData.map((e, i) => {
          const { title, image, description, rating, price, category } = e;
          return (
            <Card
              title={title}
              catagory={category}
              image={image}
              description={description}
              price={price}
              rating={rating.rate}
              key={i}
              star={star}
              onClick={() => navigate("/product-details/" + (i + 1))}
              addToCart={()=>addToCart(e)}

            />
          );
        })
      )
    ) : (
      // if data not fetched
      <Stack spacing={1}>
        {/* For other variants, adjust the size with `width` and `height` */}
        <Skeleton variant="rounded" width={350} height={250} />
        <Skeleton variant="rounded" width={350} height={40} />
        <Skeleton variant="rounded" width={350} height={100} />
        <Skeleton variant="rounded" width={350} height={50} />
      </Stack>
    )}
  </div>
  );
}

export default Products;
