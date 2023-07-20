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
import { useState, useEffect } from "react";
import logo from "../../assets/images/PassageLogo.svg";
import { ReactSVG } from "react-svg";
import "../../styles/style.css";

import accountHttpService from "../../services/account";
import { useHistory } from "react-router-dom";
import { setLogin as setReduxLogin, setToken } from "../../redux/accountSlice";

import { useDispatch, useSelector } from "react-redux";

export default function Registration() {
  const [login, setLogin] = useState("");
  const [publicUserName, setPublicUserName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [accessCode, setAccessCode] = useState("");

  const history = useHistory();
  const dispatch = useDispatch();

  function registerPressed() {
    if (!login || !password) {
      notification.open({
        message: "Invalid fields",
        description: "Please fill all fields!",
      });
      return;
    }

    accountHttpService
      .register(login, password, publicUserName, accessCode)
      .then((response) => {
        console.debug(response);

        if (response.status === 200 && response.data.token) {
          dispatch(setReduxLogin(login));
          dispatch(setToken(response.data.token));

          history.push("/initial-setup");
        }
      })
      .catch((error) => {
        notification.error({
          message: "Invalid fields",
          description: error.response.data.message,
        });
      });
  }

  function cancelPressed() {
    history.goBack();
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
            REGISTRATION
          </Col>
          <Col span={22}>
            <input
              onChange={(event) => {
                setLogin(event.currentTarget.value);
              }}
              className="auth-input"
              placeholder="Email"
            ></input>
          </Col>
          <Col span={22}>
            <input
              onChange={(event) => {
                setPublicUserName(event.currentTarget.value);
              }}
              className="auth-input"
              placeholder="Public Username"
            ></input>
          </Col>
          <Col span={22}>
            <input
              onChange={(event) => {
                setPassword(event.currentTarget.value);
              }}
              type="password"
              className="auth-input"
              placeholder="Password"
            ></input>
          </Col>
          <Col span={22}>
            <input
              onChange={(event) => {
                setConfirmPassword(event.currentTarget.value);
              }}
              type="password"
              className="auth-input"
              placeholder="Confirm Password"
            ></input>
          </Col>
          <Col span={22} style={{ marginBottom: "8px" }}>
            <input
              onChange={(event) => {
                setAccessCode(event.currentTarget.value);
              }}
              className="auth-input"
              placeholder="Access Code"
            ></input>
          </Col>
          <Col style={{ marginBottom: "10px" }} span={22}>
            <button
              onClick={() => {
                registerPressed();
              }}
              className="auth-button"
            >
              SIGN UP
            </button>
          </Col>
          <Col span={22}>
            <button
              className="auth-button"
              onClick={() => {
                cancelPressed();
              }}
              style={{
                backgroundColor: "#5b5b5b",
                boxShadow: "0px 4px 0px #4f4f4f",
                marginBottom: "18px",
              }}
            >
              CANCEL
            </button>
          </Col>
          <Col
            span={22}
            className="auth-text"
            style={{
              marginBottom: "18px",
            }}
          >
            Don't have an access code?
          </Col>
          {/* <Col span={22}>
            <button className="auth-button" style={{ marginBottom: "40px" }}>
              BUY A TICKET(S)
            </button>
          </Col> */}
        </Row>
      </Col>
    </Row>
  );
}
