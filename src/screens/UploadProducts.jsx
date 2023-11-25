import React, { useEffect, useState } from "react";
import { push, ref, set } from "firebase/database";
import {  getDownloadURL, ref as storageRef, uploadBytes, } from "firebase/storage";
import {Auth, DATABASE, STORAGE} from "../config/firebase/FirebaseConfig"
import { TextField, Stack } from '@mui/material';
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const UploadProducts = () => {
const [productData, setProductData] = useState({})
const [isUser, setIsUser] = useState({})
const [previewImg, setPreviewImg] = useState("")
const navigate = useNavigate()

const chechUser = ()=>{
  onAuthStateChanged(Auth, (user) => {
    if (user) {
      const isUser = user;
      setIsUser(user)
      console.log(user)
      // ...
    } else {
      // setUser(false)
      navigate("/login")
    }
  });
}

useEffect(()=>{
  chechUser()
},[])

const dataHandler = (e) => {
  setProductData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
};
console.log(isUser)
function writeUserData() {
 
      const obj = {
        title: productData.title,
          desc: productData.desc,
          price : productData.price,
    }

    const keyRef = ref(DATABASE);
    const key = push(keyRef).key;
    obj.id = key

    const imageRef = storageRef(STORAGE, `images/${obj.id}.jpg`)

    uploadBytes(imageRef, previewImg).then((success)=>{
    
      getDownloadURL(success.ref).then(function(imageURL){

          // console.log("image ur =>", imageURL);
          obj.productImg = imageURL
          
          const refrenceDB = ref(DATABASE, `products/${isUser.uid}/${obj.id}`)
          set(refrenceDB,obj)
        console.log("products added")


      }).catch(function(error){
          console.log(error);
      })
  }).catch(function(error){
      console.log(error);
  })
      }

    

    const showImg = (e)=>{      
      const localImgURL = URL.createObjectURL(e.target.files[0]);
      e && setPreviewImg(localImgURL)
      }

  return (
    
    <Stack>
      
        <TextField placeholder='Product title' onChange={dataHandler} id='title' />
        <TextField placeholder='Product desc' onChange={dataHandler} id='desc' />
        <TextField placeholder='Product price' onChange={dataHandler} id='price' />
        <TextField placeholder='image' type="file" onChange={showImg} id='image' />
      <button onClick={writeUserData}>add</button>
      <img src={previewImg} alt="kh" width={300}/>
    </Stack>
  )
}

export default UploadProducts




// userType = 'seller' (pic) || buyer ==> by radio button

// seller can add and view their products
// diff screens for buyer and seller

// set user data in database