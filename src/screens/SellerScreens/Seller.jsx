import { onAuthStateChanged, signOut } from 'firebase/auth';
import { onChildAdded, ref } from 'firebase/database';
import React, { useEffect, useState } from 'react'
import { Auth, DATABASE } from '../../config/firebase/FirebaseConfig';
import { useNavigate } from 'react-router-dom';
import Card from '../../component/Cards/Card';
import { Box, Button, Stack } from '@mui/material';

const Seller = () => {
const [products, setProducts] = useState([]);
const [isUser, setIsUser] = useState({})
const navigate = useNavigate()
// console.log(products)
// console.log(isUser.uid)
    useEffect(()=>{
        onAuthStateChanged(Auth, (user) => {
          if (user) {
            setIsUser(user)
            // get data from database by user uid
            const dbRefUser = ref(DATABASE,`user/${user.uid}`)
            onChildAdded(dbRefUser,data=>{
              // if user is seller then show their data else navigate to buyerpage
             if(data.val().userType === "Seller"){
               setProducts([])
              const dbRef = ref(DATABASE, `products/`)
              onChildAdded(dbRef,data=>setProducts(prev=>[...prev,data.val()]))
            }else{
              navigate("/buyer")
            }
            })
           
            // ...
          } else {
            navigate("/")
          }
        });
      },[])
      return (<>
          <Button onClick={()=>navigate("/addProducts")}>add Product</Button>
          <Button onClick={()=>signOut(Auth)}>Sign Out</Button>
    <Box display={"flex"} justifyContent={"space-between"} flexDirection={"row"} flexWrap={"wrap"} gap={2}>
        {
          products.length ? 
          products.filter((e,i)=>e.uid === isUser.uid ).map((e,i)=><Card key={i} title={e.title} description={e.desc} price={e.price} image={e.productImg}/>)
          :"no data"
            
        }
    </Box>
    </>
  )
}

export default Seller