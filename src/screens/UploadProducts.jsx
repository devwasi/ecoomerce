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

const checkUser = ()=>{
  onAuthStateChanged(Auth, (user) => {
    if (user) {
      setIsUser(user)
    } else {
      navigate("/login")
    }
  });
}

useEffect(()=>{
  checkUser()
},[])

const dataHandler = (e) => {
  setProductData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
};
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
          obj.uid = isUser.uid
          const refrenceDB = ref(DATABASE, `products/${obj.id}`)
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