import { Button, Divider, Stack, TextField, Typography } from "@mui/material";
import { signInWithEmailAndPassword } from "firebase/auth";
import React, {  useState } from "react";
import { Auth, DATABASE } from "../config/firebase/FirebaseConfig";
import { useNavigate } from "react-router-dom";
import {  onValue, ref } from "firebase/database";

const Login = () => {
  const [authData, setAuthData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [signupError, setSignupError] = useState("");
  const navigate = useNavigate()

  const SetInputHandler = (e) => {
    setAuthData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const submitDataHandler = async () => {
    setIsLoading(true);
    console.log("submit", authData);
    try {
      const userData = await signInWithEmailAndPassword(
        Auth,
        authData.email,
        authData.password
      );
      // get data from database by uid
      const dbRef = ref(DATABASE, `user/${userData.user.uid}/userData`)
      onValue(dbRef,(data)=>{
        data.val().userType === "Seller" ? navigate("/seller") : navigate("/buyer")
      });

      setIsLoading(false);
    } catch (err) {
      setSignupError(err.code.slice(5));
      setIsLoading(false);
    }
  };

  return (
    <Stack justifyContent={"center"} alignItems={"center"} height={"100vh"}>
      <Stack
        gap={2}
        sx={{
          boxShadow: "0 0 10px black",
          p: 2,
          borderRadius: 2,
        }}
      >
        <Stack>
          <Typography fontSize={48}>Login</Typography>
        </Stack>
        <Stack>
          <TextField
            label={"Email"}
            placeholder="Email..."
            id="email"
            onChange={SetInputHandler}
          />
        </Stack>
        <Stack>
          <TextField
            label={"Password"}
            placeholder="Password..."
            id="password"
            type="password"
            onChange={SetInputHandler}
          />
        </Stack>
        <Stack>
          <Button
            variant="contained"
            onClick={submitDataHandler}
            disabled={isLoading && true}
          >
            {isLoading ? "loading" : "submit"}
          </Button>
          <Button sx={{ color: "red" }}>{signupError && signupError}</Button>
        </Stack>
        <Divider />
        <Stack>
          <Typography>
            Don't have an account
          </Typography>
          <Button variant="contained" onClick={()=>navigate("/signup")}>
            Sign up
          </Button>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default Login;

// @mui/lab
// react toast ===> to show error message
// formik.org ==> handle forms
// advance Hooks ===> useCallback, useMemo
// protected routes and public routes
// useEffect(()=>{
// navigate('/) ===> navigate to home
// },[])
// authrequired

// search bar
