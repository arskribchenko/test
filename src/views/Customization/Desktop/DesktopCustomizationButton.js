import { auto } from "async";
import { ReactSVG } from "react-svg";
import React, { Component, useEffect } from "react";
import { useState } from "react";

function DesktopCustomizationButton(props) {
  const circle = {
    background: props.isToogled
      ? props.isColor
        ? "#17F7CD"
        : "#451CFF"
      : "#232323",
    display: "inline-flex",
    alignItems: "center",
    borderRadius: "60%",
    height: " 63px",
    width: "63px",
    paddingRight: props.type === "lefthand" ? "5px" : "0px",
    paddingLeft: props.type === "righthand" ? "5px" : "0px",
  };

  const img = {
    margin: "0 auto",
    marginTop: "23px",
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
  };

  return (
    <div className="circle" style={circle}>
      <div className="img" style={img}>
        <ReactSVG
          afterInjection={(error, svg) => {
            if (error) {
              console.error(error);
              return;
            }

            if (props.style?.borderRadius !== undefined) {
              svg.style.borderRadius = props.style.borderRadius;
            }
          }}
          src={props.img}
        ></ReactSVG>
      </div>
    </div>
  );
}

export default DesktopCustomizationButton;
