import { React, useEffect, useState } from "react";
import { HexColorPicker } from "react-colorful";
import useBreakpoint from "antd/lib/grid/hooks/useBreakpoint";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Layout } from "antd";
import { useHistory } from "react-router-dom";

import DesktopFooterColors from "./Color/DesktopFooterColors";

import close from "../../../assets/images/close_btn_customization.svg";
import face from "../../../assets/images/face_big.svg";
import back from "../../../assets/images/backpack_btn.svg";
import leftHand from "../../../assets/images/left_hand_big.svg";

import rightHand from "../../../assets/images/right_hand_big.svg";

import companion from "../../../assets/images/companion_big.svg";
import colorPicker from "../../../assets/images/color_btn_big.svg";

import CustomizationSlider from "./Slider/DesktopCustomizationSlider";
import DesktopCustomizationButton from "./DesktopCustomizationButton";

import DesktopName from "./Name/DesktopName";
import { ReactSVG } from "react-svg";

import commands from "../../../services/commands";

import {
  setRingColor as setReduxRingColor,
  setPrimaryColor as setReduxPrimaryColor,
  setSecondaryColor as setReduxSecondaryColor,
} from "../../../redux/customizationSlice";
import ue4appInstance from "../../../ue4appInstanse";

const { Header, Footer, Sider, Content } = Layout;
export default function DesktopCustomization({
  onCustomization,
  onExitCustomizationClick,
}) {
  const dispatch = useDispatch();
  const customization = useSelector((state) => state.customization);
  const screens = useBreakpoint();
  useEffect(() => {
    console.debug(screens);
  }, [screens]);
  //default colors (before user's changes)
  const [defaultRingColor, setDefaultRingColor] = useState(null);
  const [defaultPrimaryColor, setDefaultPrimaryColor] = useState(null);
  const [defaultSecondaryColor, setDefaultSecondaryColor] = useState(null);

  const [color, setColor] = useState("#aabbcc");
  const [colorToRectangles, setColorToRectangles] = useState(null);
  const history = useHistory();
  const [sliderType, setSliderType] = useState("face");
  const [colorsSelect, setColorsSelect] = useState(null);
  const [colorPickerState, setColorPickerState] = useState(false);
  const [isPrimary, setPrimary] = useState(null);
  const [primaryColor, setPrimaryColor] = useState("red");
  const [isSecondary, setSecondary] = useState(null);
  const [secondaryColor, setSecondaryColor] = useState("yellow");
  const [isRing, setRing] = useState(null);
  const [ringColor, setRingColor] = useState("green");
  const [nameChange, setNameChange] = useState(false);
  const [style, setStyle] = useState({ zIndex: "1000" });
  const [colorPickerType, setColorPickerType] = useState();

  function handleLeftHandClick() {
    setSliderType("left");
    setColorsSelect(false);
    setColorPickerState(false);
    setNameChange(false);
  }
  function handleRightHandClick() {
    setSliderType("right");
    setColorsSelect(false);
    setNameChange(false);
    setColorPickerState(false);
  }
  function handleColorSelectClick() {
    setSliderType(null);
    setColorsSelect(true);
    setNameChange(false);
  }

  function getColorChange(type) {
    if (type === "ring") {
      setRing(true);
      setPrimary(false);
      setSecondary(false);
    }
    if (type === "primary") {
      setPrimary(true);
      setSecondary(false);
      setRing(false);
    }
    if (type === "secondary") {
      setSecondary(true);
      setPrimary(false);
      setRing(false);
    }
  }

  function generateColorPicker(type, color) {
    setColorPickerType(type);
    setColorPickerState(true);
    setColor(color);
  }
  function hideColorPicker() {
    setColorPickerState(false);
  }

  function handleNameClick() {
    setNameChange(true);
    setSliderType(null);
    setColorsSelect(null);
  }

  function handleFaceClick() {
    setSliderType("face");
    setNameChange(false);
    setColorsSelect(false);
  }

  function handleCompanionClick() {
    setSliderType("companion");
    setNameChange(false);
    setColorsSelect(false);
  }

  function handleBackClick() {
    setSliderType("back");
    setNameChange(false);
    setColorsSelect(false);
  }

  function exitCustomization() {
    const command = commands.createConnectToGameServerCommand();

    ue4appInstance.getInstance().emitUICommand(command);

    history.push("/app/index");
  }

  function cancelCustomization() {
    dispatch(setReduxRingColor(defaultRingColor));
    dispatch(setReduxPrimaryColor(defaultPrimaryColor));
    dispatch(setReduxSecondaryColor(defaultSecondaryColor));
    history.push("/app/index");
  }

  function handleColorChange(someColor) {
    setColor(someColor);
    if (colorPickerType === "ring") {
      dispatch(setReduxRingColor(someColor));
      setRingColor(someColor);
    }
    if (colorPickerType === "primary") {
      dispatch(setReduxPrimaryColor(someColor));
      setPrimaryColor(someColor);
    }
    if (colorPickerType === "secondary") {
      dispatch(setReduxSecondaryColor(someColor));
      setSecondaryColor(someColor);
    }
  }

  useEffect(() => {
    setColorToRectangles(color);
  }, [color]);

  useEffect(() => {
    setDefaultRingColor(customization.ringColor);
    setDefaultPrimaryColor(customization.primaryColor);
    setDefaultSecondaryColor(customization.secondaryColor);
  }, []);

  return (
    <Layout
      style={{
        height: "100vh",
        padding: 0,
        backgroundColor: "rgba(0,0,0,0)",
        pointerEvents: "auto",
      }}
    >
      <Header style={{ padding: 0, backgroundColor: "rgba(0,0,0,0)" }}>
        <Row>
          <Col span={24} style={{ marginTop: "16px" }}>
            <Row
              justify="center"
              align="middle"
              style={{ position: "relative" }}
            >
              <Col style={{ margin: "0 6px" }}>
                <div onClick={handleFaceClick}>
                  <DesktopCustomizationButton
                    isToogled={sliderType === "face"}
                    img={face}
                    color={"#451CFF"}
                  ></DesktopCustomizationButton>
                </div>
              </Col>
              <Col style={{ margin: "0 6px" }}>
                <div onClick={handleBackClick}>
                  <DesktopCustomizationButton
                    isToogled={sliderType === "back"}
                    img={back}
                    color={"#451CFF"}
                  ></DesktopCustomizationButton>
                </div>
              </Col>
              <Col style={{ margin: "0 6px" }}>
                <div onClick={handleLeftHandClick}>
                  <DesktopCustomizationButton
                    isToogled={sliderType === "left"}
                    type="lefthand"
                    img={leftHand}
                    color={"#451CFF"}
                  ></DesktopCustomizationButton>
                </div>
              </Col>
              <Col style={{ margin: "0 6px" }}>
                <div onClick={handleRightHandClick}>
                  <DesktopCustomizationButton
                    isToogled={sliderType === "right"}
                    type="righthand"
                    img={rightHand}
                    color={"#451CFF"}
                  ></DesktopCustomizationButton>
                </div>
              </Col>
              {/* <Col style={{ margin: "0 6px" }}>
                <div onClick={handleCompanionClick}>
                  <DesktopCustomizationButton
                    isToogled={sliderType === "companion"}
                    img={companion}
                    color={"#451CFF"}
                  ></DesktopCustomizationButton>
                </div>
              </Col> */}
              <Col style={{ margin: "0 6px" }}>
                <div onClick={handleColorSelectClick}>
                  <DesktopCustomizationButton
                    isToogled={colorsSelect}
                    isColor={true}
                    img={colorPicker}
                    color={"#17F7CD"}
                    style={{ borderRadius: "25px" }}
                  ></DesktopCustomizationButton>
                </div>
              </Col>
              <Col xl={2} lg={2} span={1} style={{ margin: "0 4px" }}>
                <div
                  className="text-button"
                  id="name-button"
                  onClick={handleNameClick}
                  style={{
                    padding: "5px",
                    lineHeight: "2.9",
                    background: nameChange ? "#451CFF" : "#232323",
                    boxShadow: "none",
                    fontSize: "18px",
                    width: "80%",
                    textAlign: "center",
                    marginBottom: "10px",
                  }}
                >
                  NAME
                </div>
              </Col>
              <Col
                style={{
                  position: "absolute",
                  top: "0",
                  right: "16px",
                  textAlign: "end",
                }}
              >
                <div onClick={exitCustomization}>
                  <ReactSVG src={close}></ReactSVG>
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
      </Header>
      <Content>
        <Row justify="center" align="middle" style={{ height: "100vh" }}>
          <Col xl={18} span={13} style={{ marginBottom: "50px" }}>
            <Row>
              {colorPickerState ? (
                <Col className="center" style={style}>
                  <div
                    className="center"
                    style={{
                      margin: "0 auto",
                      paddingBottom: "-50%",
                    }}
                  >
                    <HexColorPicker
                      color={color}
                      onChange={handleColorChange}
                    />
                    ;
                  </div>
                </Col>
              ) : null}
            </Row>
            <Row justify="end">
              <Col span={6} style={{ color: "white", marginBottom: "25px" }}>
                {!colorPickerState ? (
                  <Row>
                    <Col span={24}>
                      <Row justify={"center"} align={"center"}>
                        <div
                          onClick={exitCustomization}
                          className="text-buttonFinish"
                          id="main-button"
                          style={{
                            backgroundColor: "#232323",
                            height: "86px",
                            width: "234px",
                            textAlign: "center",
                            lineHeight: "72px",
                            fontSize: "40px",
                          }}
                        >
                          FINISH
                        </div>
                      </Row>
                    </Col>
                    <Col span={24}>
                      <Row justify={"center"} align={"center"}>
                        <div
                          onClick={cancelCustomization}
                          className="text-button"
                          id="main-button"
                          style={{
                            backgroundColor: "#909090",
                            height: "86px",
                            marginTop: "24px",
                            width: "234px",
                            textAlign: "center",
                            lineHeight: "72px",
                            fontSize: "40px",
                          }}
                        >
                          CANCEL
                        </div>
                      </Row>
                    </Col>
                  </Row>
                ) : null}
              </Col>
            </Row>
          </Col>
        </Row>
      </Content>
      <Footer style={{ padding: 0, backgroundColor: "rgba(0,0,0,0)" }}>
        <Row justify="center">
          <Col span={24}>
            {/* SLIDER (HANDS OR FACE) CUSTOMIZATION */}

            {sliderType === "left" ? (
              <CustomizationSlider
                socket={commands.addonsSockets.leftHand}
                type="left"
              ></CustomizationSlider>
            ) : null}
            {sliderType === "back" ? (
              <CustomizationSlider
                socket={commands.addonsSockets.back}
                type="back"
              ></CustomizationSlider>
            ) : null}
            {sliderType === "right" ? (
              <CustomizationSlider
                socket={commands.addonsSockets.rightHand}
                type="right"
              ></CustomizationSlider>
            ) : null}
            {sliderType === "face" ? (
              <CustomizationSlider
                socket={commands.addonsSockets.head}
                type="face"
              ></CustomizationSlider>
            ) : null}
            {sliderType === "companion" ? (
              <CustomizationSlider
                socket={commands.addonsSockets.companion}
                type="companion"
              ></CustomizationSlider>
            ) : null}

            {/* COLORS CUSTOMIZATION */}

            {colorsSelect ? (
              <DesktopFooterColors
                pickerColor={colorToRectangles}
                ringColor={ringColor}
                setRing={setRingColor}
                primaryColor={primaryColor}
                setPrimary={setPrimaryColor}
                secondaryColor={secondaryColor}
                setSecondary={setSecondaryColor}
                gen={generateColorPicker}
                hide={hideColorPicker}
                getColorChange={getColorChange}
              ></DesktopFooterColors>
            ) : null}

            {/* NAME CUSTOMIZATION */}

            {nameChange ? <DesktopName></DesktopName> : null}
          </Col>
        </Row>
      </Footer>
    </Layout>
  );
}
