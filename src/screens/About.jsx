import React from "react";
import { useNavigate } from "react-router-dom";

const About = () => {
  const navigation = useNavigate();

  const navigationHandler = () => {
    navigation("/");
  };

  return (
    <div>
      <h1> About</h1>
      <button onClick={navigationHandler}>Goto About</button>
    </div>
  );
};

export default About;
