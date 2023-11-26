import React, { useEffect, useState } from "react";
import { push, ref, set } from "firebase/database";
import {  getDownloadURL, ref as storageRef, uploadBytes, } from "firebase/storage";
import {Auth, DATABASE, STORAGE} from "../config/firebase/FirebaseConfig"
import { TextField, Stack, Typography } from '@mui/material';
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const UploadProducts = () => {
const [productData, setProductData] = useState({})
const [isUser, setIsUser] = useState({})
const [previewImg, setPreviewImg] = useState("")
const [imgDest, setImgDest] = useState("")
const [errorMessage, setErrorMessage] = useState("")
const [uploadSuccess, setUploadSuccess] = useState("")
const navigate = useNavigate()

const checkUser = ()=>{
  onAuthStateChanged(Auth, (user) => {
    if (user) {
      setIsUser(user)
    } else {
      navigate("/")
    }
  });
}

useEffect(()=>{
  checkUser()
},[])

const dataHandler = e => setProductData((prev) => ({ ...prev, [e.target.id]: e.target.value }))
const addProductData=()=> {
 setErrorMessage("")
  if(productData.title && productData.desc && productData.price && productData.category && productData.rating){
  // create object
      const obj = {
        title: productData.title,
          desc: productData.desc,
          price : productData.price,
          category: productData.category,
          rating: productData.rating,
    }

// generate random key
    const keyRef = ref(DATABASE);
    const key = push(keyRef).key;
    obj.id = key
// upload image to database
    const imageRef = storageRef(STORAGE, `images/${obj.id}`)
    uploadBytes(imageRef, imgDest).then((success)=>{
    // get image link
      getDownloadURL(success.ref).then(function(imageURL){
          obj.productImg = imageURL
          obj.uid = isUser.uid
          const refrenceDB = ref(DATABASE, `products/${obj.id}`)
          set(refrenceDB,obj)
        setUploadSuccess("successfully added")
      }).catch(function(error){
          console.log(error);
      })
  }).catch(function(error){
      console.log(error);
  })
}else{
  setErrorMessage("please fill all field")
}
      }

    const showImg = (e)=>{      
      setImgDest(e.target.files[0])
      const localImgURL = URL.createObjectURL(e.target.files[0]);
      e && setPreviewImg(localImgURL)
      }

      // const inputFields = [
      //   {placeholder: "Product title", id: "title", type: "text" ,onChange:{dataHandler}},
      //   {placeholder: "Product desc", id: "desc", type: "text" ,onChange:{dataHandler}},
      //   {placeholder: "Product price", id: "price", type: "text" ,onChange:{dataHandler}},
      //   {placeholder: "Product image", id: "image", type: "file", onChange:{showImg}}
      // ]
  return (
    
    <Stack>
      {/* {
        inputFields.map((e,i)=><TextField placeholder={e.placeholder} id={e.id} type={e.type} onChange={onchange} />)
      } */}
        <TextField placeholder='Product title' onChange={dataHandler} id='title' />
        <TextField placeholder='Product desc' onChange={dataHandler} id='desc' />
        <TextField placeholder='Product price' onChange={dataHandler} id='price' />
        <TextField placeholder='Product category' onChange={dataHandler} id='category' />
        <TextField placeholder='Product rating' onChange={dataHandler} id='rating' />
        <TextField placeholder='image' type="file" onChange={showImg} id='image' />
        <Typography sx={{color: 'red'}}>{errorMessage && errorMessage}</Typography>
        <Typography sx={{color: 'green'}}>{uploadSuccess && uploadSuccess}</Typography>
      <button onClick={addProductData}>add</button>
      {previewImg && <img src={previewImg} alt="kh" width={300}/>}
    </Stack>
  )
}

export default UploadProducts




// userType = 'seller' (pic) || buyer ==> by radio button

// seller can add and view their products
// diff screens for buyer and seller

// set user data in database