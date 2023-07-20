import { React, useEffect, useState } from "react";
import useBreakpoint from "antd/lib/grid/hooks/useBreakpoint";
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

export default function DesktopCustomizationSlider(props) {
  const screens = useBreakpoint();
  useEffect(() => {
    if (screens.xl) {
      setSliderItemWidth(94);
    }
    if (screens.xxl) {
      setSliderItemWidth(120);
    }
  }, [screens]);

  const customizationStore = useSelector((state) => state.customization);
  const items = customizationStore.items.filter(
    (item) => item.type === props.socket
  );
  const [sliderItemWidth, setSliderItemWidth] = useState(75);
  const [arrowMargin, setArrowMargin] = useState(14);
  const [currIndex, setCurrIndex] = useState(0);
  console.log(items);
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

  const maxRendered =
    Math.floor(window.innerWidth / (sliderItemWidth + 24)) - 2;
  return (
    <Row justify="center">
      <Col span={24} style={{ marginBottom: "21px" }}>
        <div
          className="customization-header-text"
          style={{
            fontSize: "32px",
            color: "white",
            fontFamily: "Niveau Grotesk Bold",
            textAlign: "center",
            textTransform: "uppercase",
            marginBottom: "36px",
          }}
        >
          {props.type === "left" || props.type === "right"
            ? props.type + " hand"
            : props.type}
        </div>
        <Row>
          <Col span={24}>
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
                className="slider-item"
                style={{ background: "transparent", border: "none" }}
              >
                <div style={{ postion: "fixed" }} onClick={slideToLeft}>
                  <ReactSVG src={sliderArrowLeft}></ReactSVG>
                </div>
              </div>
              <div
                className="slider-item slider-item-none"
                style={{ marginLeft: "24px" }}
                onClick={() => {
                  pressAddonItem("none");
                }}
              ></div>
              <div>
                {items.map((elem, index) => {
                  if (
                    index >= currIndex &&
                    index <= currIndex + maxRendered - 1
                  ) {
                    if (index !== currIndex + maxRendered - 1)
                      return (
                        <div
                          className="slider-item"
                          style={{ marginLeft: "24px", color: "white" }}
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
              </div>

              <div
                className="slider-item"
                style={{
                  marginLeft: "24px",
                  background: "transparent",
                  border: "none",
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
