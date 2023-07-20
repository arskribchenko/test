import React, { Component } from "react";
import {
  Card,
  Checkbox,
  Row,
  Col,
  Typography,
  Select,
  Button,
  Divider,
  Modal,
  message,
  Layout,
  notification,
  Grid,
  Tag,
} from "antd";
import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams,
  useHistory,
} from "react-router-dom";
import FacebookLogin from "react-facebook-login";

import logo from "../../assets/images/PassageLogo.svg";
import facebookLogo from "../../assets/images/facebook_icon.svg"
import { ReactSVG } from "react-svg";
import "../../styles/style.css";

import accountHttpService from "../../services/account";
import { setLogin as setReduxLogin, setToken } from "../../redux/accountSlice";

import { useDispatch, useSelector } from "react-redux";

export default function LogIn() {
  const { useBreakpoint } = Grid;

  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  const account = useSelector((state) => state.account);

  const dispatch = useDispatch();

  const history = useHistory();

  function loginPressed() {
    if (!login || !password) {
      notification.error({
        message: "Invalid fields",
        description: "Please fill all fields!",
      });
      return;
    }

    accountHttpService
      .login(login, password)
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
  function responseFacebook(res) {
    accountHttpService
      .facebookAuth(res.accessToken)
      .then((response) => {
        if (response.token) {
          dispatch(setToken(response.token));
        }
        history.push("/initial-setup");
      })
      .catch((error) => console.error(error));
  }
  return (
    <Row justify="center">
      <Col
        span={24}
        style={{ textAlign: "center", marginBottom: "-120px", zIndex: "1000" }}
      >
        <ReactSVG src={logo}></ReactSVG>
      </Col>
      <Col
        className="login-col"
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
          minWidth: "350px",
        }}
      >
        <Row justify="center">
          <Col
            span={24}
            style={{
              fontFamily: "Niveau Grotesk Bold",
              color: "white",
              textAlign: "center",
              marginBottom: "7px",
              fontWeight: "normal",
              marginTop: "15px",
            }}
          >
            LOG IN
          </Col>
          <Col span={22}>
            <input
              className="auth-input"
              onChange={(event) => {
                setLogin(event.currentTarget.value);
              }}
              placeholder="Email or Username"
              type="text"
            ></input>
          </Col>
          <Col span={22} style={{ marginBottom: "8px" }}>
            <input
              onChange={(event) => {
                setPassword(event.currentTarget.value);
              }}
              type="password"
              className="auth-input"
              placeholder="Password"
            ></input>
          </Col>
          <Col
            span={20}
            className="remember-row"
            style={{ marginBottom: "16px", fontFamily: "Montserrat" }}
          >
            <Row justify="space-between">
              <Col span={12}>
                <Checkbox style={{ color: "grey" }}>Remember me</Checkbox>
              </Col>
              <Col
                className="forgot-password"
                span={12}
                style={{
                  color: "grey",
                  textDecoration: "underline",
                }}
              >
                <Link
                  to="/reset-password"
                  style={{
                    textDecoration: "none",
                    color: "grey",
                  }}
                >
                  Forgot password?
                </Link>
              </Col>
            </Row>
          </Col>
          <Col span={22}>
            <button onClick={(event) => loginPressed()} className="auth-button">
              LOG IN
            </button>
          </Col>
          {/* <Col style={{ marginTop: 10 }} span={22}>
            <FacebookLogin
              appId="1088597931155576"
              autoLoad={false}
              fields="name,email,picture"
              callback={responseFacebook}
              cssClass="facebook-auth-button"
              
              textButton="LOG IN WITH FACEBOOK"
            />
          </Col> */}
          <Col
            span={22}
            style={{
              textAlign: "center",
              color: "grey",
              fontFamily: "Montserrat",
              fontSize: "14px",
              marginBottom: "16px",
            }}
          >
            Not signed up?
          </Col>
          <Col style={{ marginBottom: 12 }} span={22}>
            <Link to="/registration">
              <button
                className="auth-button"
                style={{
                  backgroundColor: "#5b5b5b",
                  boxShadow: "0px 4px 0px #4f4f4f",
                  marginBottom: "20px",
                }}
              >
                REGISTER
              </button>
            </Link>
          </Col>
        </Row>
      </Col>
    </Row>
  );
}
