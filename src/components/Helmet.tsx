import React from "react";
import { Helmet as ReactHelmet } from "react-helmet";
import favicon from "../images/header-logo.png";

const Helmet = () => {
  return (
    <ReactHelmet>
      <title>CCT TODO App Task</title>
      <meta name="CCT TODO App" content="CCT Gatsby TODO App Task" />
      <meta name="referrer" content="origin" />
      <link rel="icon" href={favicon} />
    </ReactHelmet>
  );
};

export default Helmet;
