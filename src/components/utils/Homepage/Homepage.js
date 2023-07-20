import React, { Component } from "react";
import img from "./text.png";
import playButtonImage from "../../../assets/images/playButton.png";

import { useHistory } from "react-router-dom";
import { ReactSVG } from "react-svg";
import initLoader from "../../../assets/images/initLoader.svg";

function Homepage({ startVideoStreaming, loading }) {
  const style = {
    margin: "0 auto",
    marginTop: "20%",
    width: "50%",
    fontFamily: "Montserrat",
    fontSize: "16px",
    zIndex: "10000000000",
  };

  const history = useHistory();

  function startUnrealVideo() {
    startVideoStreaming();

    history.push("/app/customization");
  }

  // if (loading) {
  //   return (
  //     <div
  //       style={{
  //         display: "flex",
  //         height: "100%",
  //         alignItems: "center",
  //         justifyContent: "center",
  //       }}
  //     >
  //       <ReactSVG src={initLoader} />
  //     </div>
  //   );
  // }

  return (
    <div
      className="center"
      style={{
        zIndex: 999999,
        pointerEvents: "auto",
        display: "flex",
        alignItems: "center",
        paddingRight: "90px",
      }}
      id="mobile-fix"
    >
      <div
        className="mainText"
        onClick={() => startUnrealVideo()}
        style={style}
      >
        <p style={{ paddingLeft: "25px" }}>
          <img
            src={playButtonImage}
            alt="no image found"
            style={{ width: 200, display: "block", margin: "0 auto" }}
          ></img>
        </p>
        <div
          className="welcome"
          style={{
            color: "#FFFFFF",
            margin: "0 auto",
            textAlign: "center",
            marginLeft: "-40px",
            opacity: "0.8",
          }}
        >
          Welcome to
        </div>
        <p>
          <img
            src={img}
            alt="no image found"
            style={{ display: "block", margin: "0 auto" }}
          ></img>
        </p>
      </div>
    </div>
  );
}
export default Homepage;
