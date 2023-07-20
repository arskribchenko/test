import React, { Component } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setIsMicMuted,
  setIsAudioDisabled,
  setIsVideoDisabled,
} from "../../../redux/appSlice";
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

import DesktopToogleButton from "../../shared/DesktopToogleButton/DesktopToogleButton";
import audio from "../../../assets/images/audio_big.svg";
import mic from "../../../assets/images/mic_big.svg";
import question from "../../../assets/images/help_btn.svg";
import MenuButton from "../../shared/MenuButton/MenuButton";
import VideoCircle from "../../shared/VideoCircle/VideoCircle";
import cam from "../../../assets/images/camera_big.svg";
import questionHover from "../../../assets/images/help_btn (Hover State).svg";
import camDis from "../../../assets/images/camera_big (Toggle State).svg";
import audioDis from "../../../assets/images/audio_big (Toggle State).svg";
import micDis from "../../../assets/images/mic_big (Toggle State).svg";
import { useState, useEffect } from "react";
import settings from "../../../assets/images/settings_btn_big.svg";
import friends from "../../../assets/images/friends_btn (1)_big.svg";
import useBreakpoint from "antd/lib/grid/hooks/useBreakpoint";
import message from "../../../assets/images/messages_btn_big.svg"
import agora from "../../../services/agora";

const { Header, Footer, Sider, Content } = Layout;

function DesktopPage() {
  const screens = useBreakpoint();
  console.log(screens)
  const clickMenu = {
    float: "left",
    display: "flex",
  };
  const Mic = mic;
  const Cam = cam;
  const CamDis = camDis;
  const Audio = audio;
  const MicDis = micDis;
  const AudioDis = audioDis;


  const history = useHistory();
  const dispatch = useDispatch();
  const app = useSelector((state) => state.app);

  function enableMic() {
    agora.updateStateAudioTrack(false);
  }

  function disableMic() {
    agora.updateStateAudioTrack(true);
  }

  function changeWebCamState() {
    if (!app.isVideoDisabled) {
      dispatch(setIsVideoDisabled(true));
      agora.updateStateVideoTrack(true);
    } else {
      dispatch(setIsVideoDisabled(false));
      agora.updateStateVideoTrack(false);
    }
  }

  function changeMicState() {
    if (!app.isMicMuted) {
      dispatch(setIsMicMuted(true));
      disableMic();
    } else {
      dispatch(setIsMicMuted(false));
      enableMic();
    }
  }

  function changeSoundState() {
    let elem = document.getElementById("streamingVideo");
    if (!app.isAudioDisabled) {
      dispatch(setIsAudioDisabled(true));
      if (elem) elem.muted = true;
    } else {
      dispatch(setIsAudioDisabled(false));
      if (elem) elem.muted = false;
    }
  }

  const buttonNav = {
    float: "left",
    marginLeft: "40px",
    display: "inline-block",
  };

  function goToCustomization() {
    history.push("/app/customization");
  }
  function displayMessages() {
    history.push("/app/index/messages");
  }

  function displayFriendsPanel() {
    history.push("/app/index/friends");
  }

  function displaySettingPanel() {
    history.push("/app/index/settings");
  }
  //useEffect(() => {agora.getDevices()})
  return (
    <Layout
      style={{ height: "100vh", padding: 0, backgroundColor: "rgba(0,0,0,0)" }}
    >
      <Header style={{ padding: 0, backgroundColor: "rgba(0,0,0,0)" }}>
        <Row>
          <Col md={5} lg={4} xl={3} style={{ marginLeft: 10, marginTop: 10 }}>
            <VideoCircle
              isDesktop={true}
              state={!app.isVideoDisabled}
            ></VideoCircle>
          </Col>
          <Col md={16} lg={18} xl={19} style={screens.xl?{ marginTop: 10, marginRight:35 }:{marginTop:10} }>
            <div className="clickMenu" style={clickMenu}>
              <div>
                {/*<div
                  className="buttonNav"
                  style={buttonNav}
                  onClick={goToCustomization}
                >
                  <MenuButton img={customization}></MenuButton>
                </div>*/}
                <div
                  className="buttonNav"
                  style={buttonNav}
                  onClick={displayFriendsPanel}
                >
                  <MenuButton img={friends}></MenuButton>
                </div>
                <div
                  className="buttonNav"
                  onClick={displaySettingPanel}
                  style={buttonNav}
                >
                  <MenuButton img={settings}></MenuButton>
                </div>
              </div>
            </div>
          </Col>
          <Col style={{ marginTop: 10 }} onClick={displayMessages}>
            <MenuButton img={message}></MenuButton>
          </Col>
        </Row>
      </Header>
      <Content></Content>
      <Footer style={{ padding: 0, backgroundColor: "rgba(0,0,0,0)" }}>
        <Row justify={"center"} style={{ marginBottom: 30, marginLeft: 10 }}>
          <Col span={12}>
            <Row justify={"center"}>
              <Col span={24}>
                <Row justify="center">
                  <Col md={3} xl={2}>
                    <div onClick={changeMicState}>
                      <DesktopToogleButton
                        isToogled={app.isMicMuted}
                        img={Mic}
                        imgDisabled={MicDis}
                      ></DesktopToogleButton>
                    </div>
                  </Col>
                  <Col md={3} xl={2} style={{ marginLeft: "25px" }}>
                    <div onClick={changeSoundState}>
                      <DesktopToogleButton
                        isToogled={app.isAudioDisabled}
                        img={Audio}
                        imgDisabled={AudioDis}
                      ></DesktopToogleButton>
                    </div>
                  </Col>
                  <Col md={3} xl={1} style={{ marginLeft: "25px" }}>
                    <div onClick={changeWebCamState}>
                      <DesktopToogleButton
                        isToogled={app.isVideoDisabled}
                        img={Cam}
                        imgDisabled={CamDis}
                      ></DesktopToogleButton>
                    </div>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Col>
        </Row>
      </Footer>
    </Layout>
  );
}

export default DesktopPage;
