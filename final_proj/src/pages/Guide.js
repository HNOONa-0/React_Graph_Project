import React, { useEffect } from "react";
// import { maxNodes } from "./limits";
import { maxNodes } from "../myData/limits";
// import { setTitle } from "./utilityFuncs";
import { setTitle } from "../myUtils/generalDocumentFuncs";

const Guide = () => {
  let [i, j, k] = [0, 0, 0];
  useEffect(() => {
    setTitle("Guide");
  }, []);
  return (
    <div>
      <h2>Rules {"&"} guide on how to use the app:</h2>
      <div style={{ paddingLeft: "3%", width: "80%" }}>
        <br></br>
        <p>
          {++i}- to generate a node, just type a number from 1...{maxNodes}
        </p>
        <br></br>
        <p>
          {++i}- you can generate a maximum of 50 nodes numbered 1...{maxNodes},
          but you can decide on any number you want in that range, you dont have
          to write nodes from smallest to largest
        </p>
        <br></br>
        <p>
          {++i}- to add an edge between 2 nodes N1 {"&"} N2 type "N1 N2"
          (without double quotes), you can seperate them by more whitespace if
          you like {"&"} you dont have to worry about generating N1 or N2, they
          are automatically generated
        </p>
        <br></br>
        <p>{++i}- you can't have a node mapping to itself</p>
        <br></br>
        <p>
          {++i}- you can add weight (uni-directional) optionally as a third
          argument for any edge, but you can't have negative weights
        </p>
        <br></br>
        <p>
          {++i}- if you want a mix of Directed {"&"} Undirected edges:<br></br>
          <br></br>
        </p>
        <div style={{ paddingLeft: "2%" }}>
          <p>{++j}. press Undirected button (Undirected mode)</p>
          <p>
            {++j}. add a directed edge by typing "N1 {" > "} N2" (without double
            quotes)
          </p>
          <br></br>
        </div>
        <p>
          {++i}- you cant update the graph once you start an animation, you must
          wait untill it finishes
        </p>
        <br></br>
        <p>{++i}- you can zoom in/out by scrolling</p>
        <br></br>
        <p>
          {++i}- you can add names to nodes which will appear under it by typing
          "node number: name you want" (without double quotes), this will work
          only if the node has been generated before
        </p>
        <br></br>
        <p>
          {++i}- when "Treeing" a graph, you may expect weird results if you
          have cycles in your graph, you may get a straight line of nodes rather
          than a tree
        </p>
        <br></br>
        <p>
          {++i}- upon generating a node it will try to relocate to a previously
          allocated position if possible, else, it will appear at a random
          position
        </p>
      </div>
    </div>
  );
};
export default Guide;
