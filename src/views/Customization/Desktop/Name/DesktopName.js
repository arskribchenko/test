import { React, useState, useRef, useEffect } from "react";

import commands from "../../../../services/commands";

import useBreakpoint from "antd/lib/grid/hooks/useBreakpoint";
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
import ue4appInstance from "../../../../ue4appInstanse";

export default function DesktopName(props) {
  const screens = useBreakpoint();
  const [inputHeight, setInputHeight] = useState(0);
  const [tapTextHeight, setTapTextHeight] = useState(0);
  useEffect(() => {
    console.log(inputName.current.clientHeight);
    setInputHeight(inputName.current.clientHeight);
    setTapTextHeight(tapText.current.clientHeight);
  });
  useEffect(() => {
    console.log(screens);
  }, [screens]);
  const inputName = useRef(null);
  const inputCompanion = useRef(null);
  const tapText = useRef(null);
  const [inputNameState, setInputNameState] = useState(false);
  const [inputCompanionState, setInputCompanionState] = useState(false);
  let inputStyle = {
    border: "4px solid #232323",
    borderRadius: "48px",
    background: "#232323",
    color: "white",
    fontSize: "32px",
    textAlign: "center",
    fontFamily: "Niveau Grotesk Bold",
    width: "100%",
    position: "absolute",
    top: tapTextHeight - inputHeight + "px",
    left: "0",
    paddingTop: "25px",
    paddingBottom: "15px",
  };

  function handleChangeCompanionNameClick() {
    setInputCompanionState(true);
    inputCompanion.current.focus();
  }

  function handleChangeNameClick() {
    setInputNameState(true);
    inputName.current.focus();
  }

  function setUserName(value) {
    var command = commands.createSetNameCommand(value);
    ue4appInstance.getInstance().emitUICommand(command);
  }

  function setCompanionName(value) {
    var command = commands.createSetCompanionNameCommand(value);
    ue4appInstance.getInstance().emitUICommand(command);
  }

  return (
    <Row justify="center">
      <Col span={16} style={{ marginBottom: "40px" }}>
        <Row justify="space-between">
          <Col span={11}>
            <div style={{ position: "relative" }}>
              <div
                className="name-input-container"
                ref={tapText}
                style={{
                  paddingTop: "6px",
                  border: "4px solid #232323",
                  borderRadius: "48px",
                  color: "#232323",
                  fontSize: "24px",
                  display: "inline-block",
                  background: "#FFFFFF",
                  height: "161px",
                  opacity: "0.7",
                  textAlign: "center",
                  fontFamily: "Niveau Grotesk",
                  width: "100%",
                }}
              >
                <span
                  style={
                    inputCompanionState ? { textDecoration: "underline" } : null
                  }
                  onClick={handleChangeCompanionNameClick}
                >
                  Tap to edit companion name.
                </span>
              </div>
              <input
                className="name-input"
                ref={inputCompanion}
                disabled={!inputCompanionState}
                style={inputStyle}
                onChange={(event) => {
                  setCompanionName(event.target.value);
                }}
              ></input>
            </div>
          </Col>
          <Col span={11}>
            <div style={{ position: "relative" }}>
              <div
                className="name-input-container"
                ref={tapText}
                style={{
                  paddingTop: "6px",
                  border: "4px solid #232323",
                  borderRadius: "48px",
                  color: "#232323",
                  fontSize: "24px",
                  display: "inline-block",
                  background: "#FFFFFF",
                  height: "161px",
                  opacity: "0.7",
                  textAlign: "center",
                  fontFamily: "Niveau Grotesk",
                  width: "100%",
                }}
              >
                <span
                  style={
                    inputNameState ? { textDecoration: "underline" } : null
                  }
                  onClick={handleChangeNameClick}
                >
                  Tap to edit name.
                </span>
              </div>
              <input
                className="name-input"
                ref={inputName}
                disabled={!inputNameState}
                style={inputStyle}
                onChange={(event) => {
                  setUserName(event.target.value);
                }}
              ></input>
            </div>
          </Col>
        </Row>
      </Col>
    </Row>
  );
}
