import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { RouteList } from "../../utils/RouteList";

const AppRouter = () => {

  return (
    
      <Router>
        <Routes>
          {RouteList.map((e, i) => (
            <Route path={e.path} element={e.element} key={i} />
          ))}
        </Routes>
      </Router>

  );
};

export default AppRouter;
