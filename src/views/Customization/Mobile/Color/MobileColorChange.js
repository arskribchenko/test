import { React, useEffect, useState } from "react";
import { HexColorPicker } from "react-colorful";

import ue4appInstance from "../../../../ue4appInstanse";

import { useDispatch, useSelector } from "react-redux";
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

import {
  setRingColor as setReduxRingColor,
  setPrimaryColor as setReduxPrimaryColor,
  setSecondaryColor as setReduxSecondaryColor,
} from "../../../../redux/customizationSlice";

import commandsService from "../../../../services/commands";

export default function MobileColorChange(props) {
  const dispatch = useDispatch();
  const customization = useSelector((state) => state.customization);
  //default colors (before user's changes)
  const [defaultRingColor, setDefaultRingColor] = useState(null);
  const [defaultPrimaryColor, setDefaultPrimaryColor] = useState(null);
  const [defaultSecondaryColor, setDefaultSecondaryColor] = useState(null);
  useEffect(() => {
    props.gen(props.type);
    if (props.type === "ring") {
      props.gen(props.type, customization.ringColor);
    }
    if (props.type === "primary") {
      props.gen(props.type, customization.primaryColor);
    }
    if (props.type === "secondary") {
      props.gen(props.type, customization.secondaryColor);
    }
  });
  useEffect(() => {
    setDefaultRingColor(customization.ringColor);
    setDefaultPrimaryColor(customization.primaryColor);
    setDefaultSecondaryColor(customization.secondaryColor);
  }, []);
  const [color, setColor] = useState("#aabbcc");

  function handleConfirm() {
    props.setColor(props.pickerColor);
    props.setColorInFooter(props.pickerColor);

    dispatch(setReduxRingColor(customization.ringColor));
    dispatch(setReduxPrimaryColor(customization.primaryColor));
    dispatch(setReduxSecondaryColor(customization.secondaryColor));

    const setColorCommand = commandsService.createSetColorCommand(
      props.socket,
      props.pickerColor
    );

    ue4appInstance.getInstance().emitUICommand(setColorCommand);

    props.cancel();
  }

  function handleCancel() {
    dispatch(setReduxRingColor(defaultRingColor));
    dispatch(setReduxPrimaryColor(defaultPrimaryColor));
    dispatch(setReduxSecondaryColor(defaultSecondaryColor));

    props.cancel();
  }

  return (
    <Row justify="center" align="middle">
      <Col span={18} style={{ marginBottom: "25px" }}>
        <Row justify="center" align="middle">
          <Col span={6} style={{ textAlign: "center", margin: "0 18.5px" }}>
            <button
              className="text-button"
              onClick={handleConfirm}
              style={{
                fontSize: "21px",
                backgroundColor: "#4f4f4f",
                width: "100%",
              }}
            >
              CONFIRM
            </button>
          </Col>
          <Col span={5} style={{ margin: "0 18.5px" }}>
            <Row>
              <Col span={24} style={{ textAlign: "center" }}>
                <div
                  className="color-rectangle-mobile"
                  style={{
                    backgroundColor:
                      props.type === "ring"
                        ? customization.ringColor
                        : props.type === "primary"
                        ? customization.primaryColor
                        : customization.secondaryColor,
                  }}
                ></div>
              </Col>
              <Col
                className="customization-header-text"
                span={24}
                style={{
                  marginTop: "12px",
                  fontSize: "12px",
                  textTransform: "uppercase",
                }}
              >
                {props.type} COLOR
              </Col>
            </Row>
          </Col>
          <Col span={6} style={{ textAlign: "center", margin: "0 18.5px" }}>
            <button
              className="text-button"
              onClick={handleCancel}
              style={{
                fontSize: "21px",
                backgroundColor: "#909090",
                width: "100%",
              }}
            >
              CANCEL
            </button>
          </Col>
        </Row>
      </Col>
    </Row>
  );
}
