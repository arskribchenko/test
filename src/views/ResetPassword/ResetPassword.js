import React, { Component } from "react";
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
  notification,
  Tag,
} from "antd";
import { useHistory } from "react-router-dom";
import { useState, useEffect } from "react";
import logo from "../../assets/images/PassageLogo.svg";
import { ReactSVG } from "react-svg";
import "../../styles/style.css";

export default function ResetPassword() {
  const history = useHistory();
  const [inputValue, setInputValue] = useState("");

  function cancelPressed() {
    history.goBack();
  }
  function inputChange(e) {
    setInputValue(e.target.value);
  }

  return (
    <Row justify="center" align="middle">
      <Col
        span={24}
        style={{ textAlign: "center", marginBottom: "-120px", zIndex: "1000" }}
      >
        <ReactSVG src={logo}></ReactSVG>
      </Col>
      <Col
        xs={18}
        sm={11}
        md={8}
        lg={8}
        xl={5}
        style={{
          backgroundColor: "#242424",
          textAlign: "center",
          borderRadius: "24px",
          pointerEvents: "auto",
          paddingTop: "105px",
          maxWidth: "390px",
          minWidth: "390px",
        }}
      >
        <Row justify="center">
          <Col
            span={24}
            className="login-col"
            style={{
              color: "white",
              textAlign: "center",
              marginBottom: "7px",
              fontWeight: "normal",
              marginTop: "15px",
            }}
          >
            RESET PASSWORD
          </Col>
          <Col span={22} style={{ marginBottom: "8px" }}>
            <input
              className="auth-input"
              placeholder="Your email adress"
              value={inputValue}
              onChange={(e) => inputChange(e)}
            ></input>
          </Col>
          <Col style={{ marginBottom: "10px" }} span={22}>
            <button className="auth-button">SEND </button>
          </Col>
          <Col span={22}>
            <button
              onClick={() => {
                cancelPressed();
              }}
              className="auth-button"
              style={{
                backgroundColor: "#5b5b5b",
                boxShadow: "0px 4px 0px #4f4f4f",
                marginBottom: 30,
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
