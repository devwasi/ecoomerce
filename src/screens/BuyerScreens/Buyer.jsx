import { onChildAdded, ref } from 'firebase/database';
import React, {  useEffect, useState } from 'react'
import { Auth, DATABASE } from '../../config/firebase/FirebaseConfig';
import Card from '../../component/Cards/Card';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { onAuthStateChanged, signOut } from 'firebase/auth';

const Buyer = () => {
const [products, setProducts] = useState([])
const [count, setCount] = useState(0)
const navigate = useNavigate()

const getData = ()=>{

    onAuthStateChanged(Auth, (user) => {
        if (user) {
          // get data from database by user uid
          const dbRefUser = ref(DATABASE,`user/${user.uid}`)
          onChildAdded(dbRefUser,data=>{
            // if user is seller then show their data else navigate to buyerpage
           if(data.val().userType === "Buyer"){
            const dbRef = ref(DATABASE, `products/`)
            setProducts([])
            onChildAdded(dbRef,data=>setProducts(prev=>[...prev,data.val()]))
          }else{
            navigate("/seller")
          }
          })
        } else {
          navigate("/login")
        }
      });
}

useEffect(()=>{
    getData()
},[])

// add to cart
const addToCart = (e)=>{
     localStorage.setItem("cartData",JSON.stringify(e))
     setCount(prev=>prev+1)
     const a = localStorage.getItem("cartData")
     console.log(JSON.parse(a))
  }

return <div>
    <Button onClick={()=>signOut(Auth)}>Sign Out</Button>
    <Button endIcon={count && count} onClick={()=>navigate("/addtocart")}>cart</Button>
        {
          products.length ?  products.map((e,i)=>{
                // const [title, desc, price, productImg] = e
              return <> 
              <Card key={i} title={e.title} description={e.desc} price={e.price} image={e.productImg} addToCart={()=>addToCart(e)}/>
              </>
            })
            :
            "no products to show"
            
        
        }
</div>
}

export default Buyer