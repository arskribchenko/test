import { React, useEffect, useState } from "react";
import { HexColorPicker } from "react-colorful";
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

import ue4appInstance from "../../../../ue4appInstanse";
import commandsService from "../../../../services/commands";

export default function DesktopColorChange(props) {
  const dispatch = useDispatch();
  const customization = useSelector((state) => state.customization);
  //default colors (before user's changes)
  const [defaultRingColor, setDefaultRingColor] = useState(null);
  const [defaultPrimaryColor, setDefaultPrimaryColor] = useState(null);
  const [defaultSecondaryColor, setDefaultSecondaryColor] = useState(null);

  useEffect(() => {
    console.log(props.type);
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
      <Col span={14} style={{ marginBottom: "25px" }}>
        <Row justify="space-around" align="middle">
          <Col span={6} style={{ textAlign: "center" }}>
            <button
              className="text-button"
              onClick={handleConfirm}
              style={{
                backgroundColor: "#4f4f4f",
                width: "80%",
                padding: "5% 0 5% 0",
              }}
            >
              CONFIRM
            </button>
          </Col>
          <Col span={5}>
            <Row>
              <Col span={24} style={{ textAlign: "center" }}>
                <div
                  className="color-rectangle"
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
                  marginTop: "21px",
                  textTransform: "uppercase",
                }}
              >
                {props.type} COLOR
              </Col>
            </Row>
          </Col>
          <Col span={6} style={{ textAlign: "center" }}>
            <button
              className="text-button"
              onClick={handleCancel}
              style={{
                backgroundColor: "#909090",
                width: "80%",
                padding: "5% 0 5% 0",
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
