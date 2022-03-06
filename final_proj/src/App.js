import React, { Fragment, useEffect, useState } from "react";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
// import { NavBar } from "./navBarBlueprint/NavBar";
import Navbar from "./navbar/Navbar";
// import Guide from "./Guide";
import Guide from "./pages/Guide";
// new, MainComponent is inside Home
import Home from "./pages/Home";
// import About from "./pages/About";
// import About from "./About";
// import { MainComponent } from "./container/MainComponent";
// import { minWindowHeight, minWindowWidth } from "./limits";
import { minWindowHeight, minWindowWidth } from "./myData/limits";
import "./App.css";
const url = "https://hnoona-0.github.io/React_Graph_Project/";
function App() {
  // dimensions of body div
  const [bodyDimension, setBodyDimension] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  // observe root div with resize observer
  // we could use resize event but this works well
  const [resizeObserver, setResizeObserver] = useState(
    new ResizeObserver((entries) => {
      const width = entries[0].target.offsetWidth;
      const height = entries[0].target.offsetHeight;
      setBodyDimension({ width, height });
    })
  );

  const [savedText, updateSavedText] = useState("");
  useEffect(() => {
    resizeObserver.observe(document.getElementById("root"));
    return () => {
      // do we ever see this message?
      console.log("App disconnected");
      resizeObserver.disconnect();
    };
  }, []);

  const { width, height } = bodyDimension;
  return (
    <Router
    // basename={url}
    >
      <Fragment>
        <Navbar></Navbar>
        <Routes>
          <Route exact path="/Guide" element={<Guide />}></Route>
          <Route
            exact
            path="/"
            element={
              width < minWindowWidth || height < minWindowHeight ? (
                <h1 style={{ textAlign: "center" }}>
                  {" "}
                  this App needs more space to run{" "}
                </h1>
              ) : (
                <Home
                  savedText={savedText}
                  updateSavedText={updateSavedText}
                ></Home>
              )
            }
          ></Route>
          {/* <Route exact path="/About" element={<About />}></Route> */}
        </Routes>
      </Fragment>
    </Router>
  );
}

export default App;
