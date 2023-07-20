import { React, useState, useRef } from "react";

import commands from "../../../../services/commands";
import ue4appInstance from "../../../../ue4appInstanse";

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

export default function MobileName(props) {
  const inputName = useRef(null);
  const inputCompanion = useRef(null);
  const [inputNameState, setInputNameState] = useState(false);
  const [inputCompanionState, setInputCompanionState] = useState(false);
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
      <Col span={16} style={{ marginBottom: "4vh" }}>
        <Row justify="space-between">
          <Col span={11}>
            <div style={{ position: "relative" }}>
              <div
                style={{
                  paddingTop: "2px",
                  border: "2px solid #232323",
                  borderRadius: "6px",
                  color: "#232323",
                  fontSize: "10px",
                  display: "inline-block",
                  background: "#FFFFFF",
                  height: "53px",
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
                ref={inputCompanion}
                disabled={!inputCompanionState}
                onChange={(event) => {
                  setUserName(event.target.value);
                }}
                style={{
                  border: "2px solid #232323",
                  borderRadius: "6px",
                  display: "inline-block",
                  background: "#232323",
                  color: "white",
                  fontSize: "12px",
                  textAlign: "center",
                  fontFamily: "Niveau Grotesk Bold",
                  width: "100%",
                  position: "absolute",
                  top: "25px",
                  left: "0",
                  padding: "2.5% 0",
                }}
              ></input>
            </div>
          </Col>
          <Col span={11}>
            <div style={{ position: "relative" }}>
              <div
                style={{
                  paddingTop: "2px",
                  border: "2px solid #232323",
                  borderRadius: "6px",
                  color: "#232323",
                  fontSize: "10px",
                  display: "inline-block",
                  background: "#FFFFFF",
                  height: "53px",
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
                ref={inputName}
                disabled={!inputNameState}
                onChange={(event) => {
                  setCompanionName(event.target.value);
                }}
                style={{
                  border: "2px solid #232323",
                  borderRadius: "6px",
                  display: "inline-block",
                  background: "#232323",
                  color: "white",
                  fontSize: "12px",
                  textAlign: "center",
                  fontFamily: "Niveau Grotesk Bold",
                  width: "100%",
                  position: "absolute",
                  top: "25px",
                  left: "0",
                  padding: "2.5% 0",
                }}
              ></input>
            </div>
          </Col>
        </Row>
      </Col>
    </Row>
  );
}
