import { React, useEffect, useState } from "react";
import useBreakpoint from "antd/lib/grid/hooks/useBreakpoint";
import { useDispatch, useSelector } from "react-redux";
import { HexColorPicker } from "react-colorful";
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
import { Switch, Route, useHistory, useRouteMatch } from "react-router-dom";
import accountHttpService from "../../../services/account";
import CircleButton from "../../../components/shared/CircleButton/CircleButton";
import ExitButton from "../../../components/shared/ExitButton/ExitButton";
import MobileFooterColors from "../Mobile/Color/MobileFooterColors";

import back from "../../../assets/images/backpack_btn.svg";
import close from "../../../assets/images/close_btn_customization.svg";
import face from "../../../assets/images/face.svg";
import faceSelected from "../../../assets/images/face_btn-selected.svg";
import backpack from "../../../assets/images/backpack_btn.svg";
import backpackSelected from "../../../assets/images/backpack_btn-selected.svg";
import leftHand from "../../../assets/images/lefthand_btn.svg";
import leftHandSelected from "../../../assets/images/lefthand_btn (Selected State).svg";
import rightHand from "../../../assets/images/righthand_btn.svg";
import rightHandSelected from "../../../assets/images/righthand_btn (Selected).svg";
import companionSelected from "../../../assets/images/companion_btn-selected.svg";
import companion from "../../../assets/images/companion_btn.svg";
import colorPicker from "../../../assets/images/colorpicker_btn.svg";
import colorPickerSelected from "../../../assets/images/colorpicker_btn-selected.svg";
import MobileCustomizationSlider from "./Slider/MobileCustomizationSlider";
import MobileCustomizationButton from "./MobileCustomizationButton";

import {
  setRingColor as setReduxRingColor,
  setPrimaryColor as setReduxPrimaryColor,
  setSecondaryColor as setReduxSecondaryColor,
} from "../../../redux/customizationSlice";

import MobileName from "./Name/MobileName";
import { OmitProps } from "antd/lib/transfer/ListBody";
import { ReactSVG } from "react-svg";

import commands from "../../../services/commands";
import ue4appInstance from "../../../ue4appInstanse";

const { Header, Footer, Sider, Content } = Layout;
export default function MobileCustomization(props) {
  const account = useSelector((state) => state.account);

  const dispatch = useDispatch();
  const customization = useSelector((state) => state.customization);
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
  const [colorPickerType, setColorPickerType] = useState();
  const [verticalAlign, setVerticalAlign] = useState(false);
  const [style, setStyle] = useState({ zIndex: "1000" });
  const screens = useBreakpoint();
  useEffect(() => {
    console.log(screens);
    if (screens.xs) {
      setVerticalAlign(true);
    }
    if (screens.sm) {
      setVerticalAlign(false);
    }
  }, [screens]);

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
  useEffect(() => {
    setColorToRectangles(color);
  }, [color]);

  useEffect(() => {
    setDefaultRingColor(customization.ringColor);
    setDefaultPrimaryColor(customization.primaryColor);
    setDefaultSecondaryColor(customization.secondaryColor);
  }, []);

  useEffect(() => {
    
  })

  return (
    <Layout
      style={{
        padding: 0,
        backgroundColor: "rgba(0,0,0,0)",
        pointerEvents: "auto",
      }}
      id="mobile-fix"
    >
      <Header style={{ padding: 0, backgroundColor: "rgba(0,0,0,0)" }}>
        <Row>
          <Col span={24} style={{ marginTop: "16px" }}>
            <Row
              justify="center"
              align="middle"
              style={{ position: "relative" }}
            >
              <Col style={{ margin: "0 4px" }}>
                <div onClick={handleFaceClick}>
                  <MobileCustomizationButton
                    isToogled={sliderType === "face"}
                    img={face}
                    imgDisabled={faceSelected}
                  ></MobileCustomizationButton>
                </div>
              </Col>
              <Col style={{ margin: "0 4px" }}>
                <div onClick={handleBackClick}>
                  <MobileCustomizationButton
                    isToogled={sliderType === "back"}
                    img={backpack}
                    imgDisabled={backpackSelected}
                  ></MobileCustomizationButton>
                </div>
              </Col>
              <Col style={{ margin: "0 4px" }}>
                <div onClick={handleLeftHandClick}>
                  <MobileCustomizationButton
                    isToogled={sliderType === "left"}
                    img={leftHand}
                    imgDisabled={leftHandSelected}
                  ></MobileCustomizationButton>
                </div>
              </Col>
              <Col style={{ margin: "0 4px" }}>
                <div onClick={handleRightHandClick}>
                  <MobileCustomizationButton
                    isToogled={sliderType === "right"}
                    img={rightHand}
                    imgDisabled={rightHandSelected}
                  ></MobileCustomizationButton>
                </div>
              </Col>
              {/* <Col style={{ margin: "0 4px" }}>
                <div onClick={handleCompanionClick}>
                  <MobileCustomizationButton
                    isToogled={sliderType === "companion"}
                    img={companion}
                    imgDisabled={companionSelected}
                  ></MobileCustomizationButton>
                </div>
              </Col> */}
              <Col style={{ margin: "0 4px" }}>
                <div onClick={handleColorSelectClick}>
                  <MobileCustomizationButton
                    type="color"
                    isToogled={colorsSelect}
                    img={colorPicker}
                    imgDisabled={colorPickerSelected}
                    style={{ borderRadius: "26px" }}
                  ></MobileCustomizationButton>
                </div>
              </Col>
              <Col lg={2} md={2} span={3} style={{ margin: "0 4px" }}>
                <div
                  className="text-button"
                  onClick={handleNameClick}
                  style={{
                    padding: "5px",
                    lineHeight: "2.8",
                    background: nameChange ? "#451CFF" : "#232323",
                    boxShadow: "none",
                    fontSize: "12px",
                    width: "80%",
                    textAlign: "center",
                  }}
                >
                  NAME
                </div>
              </Col>
              <Col
                style={
                  verticalAlign
                    ? {
                        textAlign: "end",
                        alignContent: "center",
                        top: "13px",
                      }
                    : {
                        position: "absolute",
                        top: "0",
                        right: "16px",
                        textAlign: "end",
                      }
                }
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
          <Col
            className="mobile-colorpicker"
            span={20}
            style={{ marginBottom: "70px" }}
          >
            <Row>
              {colorPickerState ? (
                <Col className="center" style={style}>
                  <div
                    className="center"
                    style={{
                      margin: "0 auto",
                      marginBottom: "32px",
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
              <Col
                xs={7}
                span={5}
                style={{ color: "white", marginBottom: "25vh" }}
              >
                <Row>
                  <Col span={24}>
                    <div
                      onClick={exitCustomization}
                      className="text-buttonFinish"
                      id="main-button"
                      style={{
                        fontSize: "21px",
                        backgroundColor: "#232323",
                        width: "90%",
                        padding: "5px",
                      }}
                    >
                      FINISH
                    </div>
                  </Col>
                  <Col span={24}>
                    <div
                      onClick={cancelCustomization}
                      className="text-button"
                      id="main-button"
                      style={{
                        fontSize: "21px",
                        backgroundColor: "#909090",
                        width: "90%",
                        marginTop: "12px",
                        padding: "5px",
                      }}
                    >
                      CANCEL
                    </div>
                  </Col>
                </Row>
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
              <MobileCustomizationSlider
                socket={commands.addonsSockets.leftHand}
                type="left"
              ></MobileCustomizationSlider>
            ) : null}
            {sliderType === "back" ? (
              <MobileCustomizationSlider
                socket={commands.addonsSockets.back}
                type="back"
              ></MobileCustomizationSlider>
            ) : null}
            {sliderType === "right" ? (
              <MobileCustomizationSlider
                socket={commands.addonsSockets.rightHand}
                type="right"
              ></MobileCustomizationSlider>
            ) : null}

            {sliderType === "face" ? (
              <MobileCustomizationSlider
                socket={commands.addonsSockets.head}
                type="face"
              ></MobileCustomizationSlider>
            ) : null}
            {sliderType === "companion" ? (
              <MobileCustomizationSlider
                socket={commands.addonsSockets.companion}
                type="companion"
              ></MobileCustomizationSlider>
            ) : null}
            {/* COLORS CUSTOMIZATION */}

            {colorsSelect ? (
              <MobileFooterColors
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
              ></MobileFooterColors>
            ) : null}

            {/* NAME CUSTOMIZATION */}
            {nameChange ? <MobileName></MobileName> : null}
          </Col>
        </Row>
      </Footer>
    </Layout>
  );
}
