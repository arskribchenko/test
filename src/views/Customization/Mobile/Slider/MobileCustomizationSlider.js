import { React, useEffect, useState } from "react";
import sliderArrowLeft from "../../../../assets/images/slider_arrow_left.svg";
import sliderArrowRight from "../../../../assets/images/slider_arrow_right.svg";
import {
  Card,
  Row,
  Col,
  Typography,
  Select,
  Button,
  Divider,
  Modal,
  Layout,
  Grid,
  Tag,
} from "antd";
import { ReactSVG } from "react-svg";
import { useSelector } from "react-redux";
import commands from "../../../../services/commands";
import ue4appInstance from "../../../../ue4appInstanse";

export default function MobileCustomizationSlider(props) {
  const customizationStore = useSelector((state) => state.customization);
  const items = customizationStore.items.filter(
    (item) => item.type === props.socket
  );

  const [currIndex, setCurrIndex] = useState(0);

  function slideToLeft() {
    if (currIndex > 0) {
      setCurrIndex(currIndex - 1);
    }
  }
  function slideToRight() {
    if (currIndex < items.length - maxRendered) {
      setCurrIndex(currIndex + 1);
    }
  }

  function pressAddonItem(addonId) {
    const setAddonCommand = commands.createSetAddonCommand(
      props.socket,
      addonId
    );

    ue4appInstance.getInstance().emitUICommand(setAddonCommand);
  }
  useEffect(() => {
    console.log(items);
  }, [items]);

  const maxRendered = Math.floor(window.innerWidth / 72) - 2;
  return (
    <Row>
      <Col span={24} style={{ marginBottom: "18px" }}>
        <Row justify="center">
          <Col span={24}>
            <div
              className="customization-header-text"
              style={{
                fontSize: "18px",
                color: "white",
                fontFamily: "Niveau Grotesk Bold",
                textAlign: "center",
                textTransform: "uppercase",
              }}
            >
              {props.type === "left" || props.type === "right"
                ? props.type + " hand"
                : props.type}
            </div>
          </Col>
          <Col span={24} style={{ marginTop: "12px" }}>
            <div
              className="slider"
              style={{
                display: "flex",
                justifyContent: "center",
                textAlign: "center",
                pointerEvents: "auto",
              }}
            >
              <div
                className="slider-item-mobile"
                style={{ background: "transparent", border: "none" }}
              >
                <div style={{ postion: "fixed" }} onClick={slideToLeft}>
                  <ReactSVG src={sliderArrowLeft}></ReactSVG>
                </div>
              </div>
              <div
                className="slider-item-mobile slider-item-none"
                style={{ marginLeft: "24px" }}
                onClick={() => {
                  pressAddonItem("none");
                }}
              ></div>
              {items.map((elem, index) => {
                console.log(maxRendered);
                if (
                  index >= currIndex &&
                  index <= currIndex + maxRendered - 1
                ) {
                  console.log(currIndex);
                  return (
                    <div
                      className="slider-item-mobile"
                      style={{ marginLeft: "12px", color: "white" }}
                      onClick={() => {
                        pressAddonItem(elem.addonId);
                      }}
                    >
                      <img
                        style={{ width: "100%", height: "100%" }}
                        src={elem.imagePath}
                      ></img>
                    </div>
                  );
                }
              })}
              <div
                className="slider-item-mobile"
                style={{
                  background: "transparent",
                  border: "none",
                  marginLeft: "12px",
                }}
              >
                <div style={{ postion: "fixed" }} onClick={slideToRight}>
                  <ReactSVG src={sliderArrowRight}></ReactSVG>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Col>
    </Row>
  );
}
