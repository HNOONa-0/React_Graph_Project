// new
// now main component is in "Home" so it makes sense
import React from "react";
import { MainComponent } from "../mainComponent/MainComponent";
const Home = (props) => {
  const { savedText, updateSavedText } = props;
  return (
    <MainComponent updateSavedText={updateSavedText} savedText={savedText} />
  );
};
export default Home;
