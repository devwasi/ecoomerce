import { Route, Routes, useNavigate } from "react-router-dom";
import DashboardDrawer from "../component/DashboardDrawer";
import { DashboardRouteList } from "../utils/DashboardRouteList";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { Auth } from "../config/firebase/FirebaseConfig";
import { useEffect, useState } from "react";
import { Button } from "@mui/material";

const DashboardScreen = () => {
  const [user, setUser] = useState(true)
  const navigate = useNavigate()

  const checkUser = ()=>{
    onAuthStateChanged(Auth, (user) => {
      if (user) {
        const uid = user;
        console.log(user)
        // ...
      } else {
        setUser(false)
      }
    });
  }
 

  useEffect(()=>{
checkUser()  },[])

  return <div>
    {
      user ? <DashboardDrawer>
      <Routes>
{DashboardRouteList.map((e, i) => {
 return <Route path={e.path} element={e.element} key={i} />;
})}
</Routes>
<Button onClick={()=>signOut(Auth)}>SignOut</Button>
 </DashboardDrawer> : navigate('/login')
    }
  </div>
};

export default DashboardScreen;
