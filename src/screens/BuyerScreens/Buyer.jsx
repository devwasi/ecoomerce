import { onAuthStateChanged } from 'firebase/auth';
import { onChildAdded, ref } from 'firebase/database';
import React, { useEffect, useState } from 'react'
import { Auth, DATABASE } from '../../config/firebase/FirebaseConfig';
import { useNavigate } from 'react-router-dom';
import Card from '../../component/Cards/Card';
import { Box } from '@mui/material';

const Buyer = () => {
const [products, setProducts] = useState([])

console.log(products)
const navigate = useNavigate()
const [data, setdata] = useState([])

const getData = ()=>{
    const dbRef = ref(DATABASE, `products/`)
            onChildAdded(dbRef,data=>{
                // setdata(prev=>[data.val()])
                console.log(data.val())
            })
}
getData()
    // useEffect(()=>{
    //     onAuthStateChanged(Auth, (user) => {
    //       if (user) {
    //         // get data from database by user uid
    //         const dbRef = ref(DATABASE, `user/`)
    //         onChildAdded(dbRef,data=>setProducts(prev=>[...prev,data.val()]))
    //         // ...
    //       } else {
    //         navigate("/login")
    //       }
    //     });
    //   },[])
//   return (
//     <Box display={"flex"} justifyContent={"space-between"} flexDirection={"row"} flexWrap={"wrap"} gap={2}>
//         {
//             products.map((e,i)=>{
//                 // const [title,desc,price, productImg ] = e
//                 console.log(e.productImg)
//                 return <Card title={e.title} image={e.productImg} price={e.price} description={e.desc} key={i} /> 
//             })
            
//         }
//     </Box>
//   )
}

export default Buyer