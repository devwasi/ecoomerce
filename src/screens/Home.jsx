import { List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { RouteList } from "../utils/RouteList";

const Home = () => {
  const navigationHandler = useNavigate();
  // const navigationHandler = () => {
  //   navigation("/about");
  // };

  const navigationDashboard = useNavigate();
  const navigationDashboardHandler = () => {
    navigationDashboard("/dashboard");
  };

  return (
    <div>
        <List>
        {RouteList.map((e, i) => (
          <ListItem key={i} disablePadding>
            <ListItemButton onClick={() => navigationHandler(e.path)}>
              {/* <ListItemIcon>
                {i % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon> */}
              <ListItemText primary={e.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <h1>Home</h1>
      <button onClick={navigationHandler}>Goto About</button>
      <button onClick={navigationHandler}>read more</button>
      <button onClick={navigationDashboardHandler}>Dashboard</button>
    </div>
  );
};

export default Home;
