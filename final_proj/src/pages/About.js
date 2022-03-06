import { useEffect } from "react";
import { setTitle } from "../myUtils/generalDocumentFuncs";
// import { setTitle } from "./utilityFuncs";

const About = () => {
  // let i = 0;
  useEffect(() => {
    setTitle("Guide");
  }, []);
  return (
    <div>
      <h2 style={{ textAlign: "center" }}>Hello there!</h2>
      <div style={{ paddingLeft: "3%", width: "80%" }}>
        <p>This app is about visualizing Graph data (as in Graph theory)</p>
        <br></br>
        <p>
          It's a small scale project that allows for simple {"&"} easy to use
          interface to interact with said graph just by writing text, i created
          this project inorder to help me properly visualize graph problems and
          understand them better, there are alot of similar tools such as{" "}
          <a href="https://csacademy.com/app/graph_editor/" target="_blank">
            CS Academy Graph editor
          </a>
        </p>
        <br></br>
        <p>
          There is no backend for this project, the app won't remember data you
          typed, so, once you press refresh/close tab it will all be gone
        </p>
        <br></br>
        <p>
          It has 2 basic animations, Breadth First Search (BFS) {"&"} Depth
          First Search, But later down the road i plan on adding more complex
          algorithms such as Dijkstra's algorithm for weightened graphs, more
          crisp animations {"&"} ways to better control those animations
          (reverse, pause {"&"} play and more), i also plan on making it more
          mobile friendly as currently its not supported for smaller screens
        </p>
        <br></br>
        <p>
          It's built with React js {"&"} Konva js, Konva is 2d canvas js library
          for desktop and mobile applications which also supports React, you can
          check the entire project out on Github repository link<br></br> Sorry
          if i dont display best of React or javascript practises, im new to
          React {"&"} web development, this is the first project i have created,
          i hope it doesn't disappoint
        </p>
      </div>
    </div>
  );
};
export default About;
