import React, { useEffect, useState } from 'react'
import Card from '../../component/Cards/Card'

const AddToCart = () => {
    const [cartData, setCartData] = useState([])
    const getLocalStorage = ()=>{
        setCartData([])
        const a = localStorage.getItem("cartData")
     const b = JSON.parse(a)
        setCartData(prev=>[...prev, b])
    }

    useEffect(()=>{
        getLocalStorage()
    },[])
  return (
    <div>{
        cartData.length && cartData.map((e,i)=><Card key={i} title={e.title} description={e.desc} price={e.price} image={e.productImg}/>)
        }</div>
  )
}

export default AddToCart