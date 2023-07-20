import { auto } from "async";
import { ReactSVG } from "react-svg";
import React, { Component, useEffect } from "react";
import { useState } from "react";

function MobileCustomizationButton(props) {
  const image = props.img;
  const imageDisable = props.imgDisabled;

  const circle = {
    height: "44px",
    width: "42px",
  };

  return (
    <div className="circle" style={circle}>
      <ReactSVG
        id="bigSvg"
        src={props.isToogled ? imageDisable : image}
        afterInjection={(error, svg) => {
          if (error) {
            console.error(error);
            return;
          }

          if (props.style?.borderRadius !== undefined) {
            svg.style.borderRadius = props.style.borderRadius;
          }
        }}
      ></ReactSVG>
    </div>
  );
}

export default MobileCustomizationButton;
