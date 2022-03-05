import React, { Fragment, useEffect, useState } from "react";
import "./App.css";
// import { Div1 } from "./container/Div1";
// import { TextBox } from "./textBoxBlueprint/TextBox";
// import { TextBox1 } from "./textBoxBlueprint/textBox1";
// import {NavBar2} from './navBarBlueprint/NavBar2'
// import { NavBar3 } from "./navBarBlueprint/NavBar3";
// import { TextBox1 } from './textBoxBlueprint/textBox1';
import { NavBar } from "./navBarBlueprint/NavBar";
import { MainComponent } from "./container/MainComponent";
import { minWindowHeight, minWindowWidth } from "./limits";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Guide from "./Guide";
import About from "./About";
// import handWrittenDemos from "./handWrittenDemos.txt";
// let savedText = "";

function App() {
  // fetch("handWrittenDemos.txt")
  //   .then((response) => {
  //     return response.text();
  //   })
  //   .then((text) => {
  //     console.log(text);
  //   });

  const [bodyDimension, setBodyDimension] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  const [resizeObserver, setResizeObserver] = useState(
    new ResizeObserver((entries) => {
      const width = entries[0].target.offsetWidth;
      const height = entries[0].target.offsetHeight;
      setBodyDimension({ width, height });
    })
  );
  const [savedText, updateSavedText] = useState("");
  // const updateSavedText = (s) => {
  //   savedText = s;
  // };
  useEffect(() => {
    resizeObserver.observe(document.getElementById("root"));
    return () => {
      console.log("disconnected");
      resizeObserver.disconnect();
    };
  }, []);

  const { width, height } = bodyDimension;
  return (
    <Router>
      <Fragment>
        <NavBar></NavBar>
        <Routes>
          <Route path="/Guide" element={<Guide />}></Route>
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
                <MainComponent
                  updateSavedText={updateSavedText}
                  savedText={savedText}
                />
              )
            }
          ></Route>
          {/* <Route path="/About" element={<About />}></Route> */}
        </Routes>
      </Fragment>
    </Router>
  );
}

export default App;
// <NavBar1></NavBar1>
// <div>hello</div>
// <NavBar2></NavBar2>
// <React.Fragment>
//   <NavBar3></NavBar3>
//   {/* <TextBox1></TextBox1> */}
//   <Div1></Div1>
// </React.Fragment>
// <TextBox></TextBox>
{
  /* <NavBar></NavBar>
      <TextBox></TextBox> */
}
