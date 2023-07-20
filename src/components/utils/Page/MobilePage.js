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
  Tag,
} from "antd";
import { useHistory } from "react-router-dom";

import CircleButton from "../../shared/CircleButton/CircleButton";
import less from "../../../assets/images/less.svg";
import audio from "../../../assets/images/audio.svg";
import mic from "../../../assets/images/mic_btn.svg";
import Question from "../../../assets/images/help_btn.svg";
import QuestionHover from "../../../assets/images/help_btn (Hover State).svg";
import MenuButton from "../../shared/MenuButton/MenuButton";
import Menu from "../../../assets/images/menu.svg";
import NavigationCircleButton from "../../shared/NavigationCircleButton/NavigationCircleButton";
import message from "../../../assets/images/message.svg";
import VideoCircle from "../../shared/VideoCircle/VideoCircle";
import cam from "../../../assets/images/cam_btn.svg";
import camDis from "../../../assets/images/cam-disabled (Toggle State).svg";
import audioDis from "../../../assets/images/audio-disabled.svg";
import micDis from "../../../assets/images/mic_btn (Toggle State).svg";
import { useState, useEffect } from "react";

import agora from "../../../services/agora";
import { setIsVideoDisabled } from "../../../redux/appSlice";
import { useDispatch, useSelector } from "react-redux";

const { Header, Footer, Sider, Content } = Layout;

function MobilePage() {
  const history = useHistory();

  const Mic = mic;
  const Cam = cam;
  const CamDis = camDis;
  const Audio = audio;
  const MicDis = micDis;
  const AudioDis = audioDis;

  const clickMenu = {
    float: "left",
    display: "flex",
  };
  const [isOpen, setOpen] = useState(false);
  const [micState, setMicState] = useState(true);
  const [sound, setSound] = useState(true);
  const [recorder, setRecorder] = useState(null);
  const [webCamState, setWebCamState] = useState(true);
  const [showFriends, setShowFriends] = useState(false);

  const app = useSelector((state) => state.app);
  const dispatch = useDispatch();

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

  function displayMessages() {
    history.push("/app/index/messages");
  }

  function handleClick() {
    //console.log("click");
    if (!isOpen) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  }

  function changeMicState() {
    if (micState) {
      setMicState(false);
      disableMic();
    } else {
      setMicState(true);
      enableMic();
    }
  }
  function changeSoundState() {
    let elem = document.getElementById("streamingVideo");
    if (sound) {
      setSound(false);
      if (elem) elem.muted = true;
    } else {
      setSound(true);
      if (elem) elem.muted = false;
    }
  }
  return (

      <Layout
        style={{
          
          padding: 0,
          backgroundColor: "rgba(0,0,0,0)",
        }}
        id="mobile-fix"
      >
        <Header style={{ padding: 0, backgroundColor: "rgba(0,0,0,0)" }}>
          <Row>
            <Col
              xs={7}
              sm={5}
              md={4}
              lg={4}
              style={{ marginLeft: 10, marginTop: 10 }}
            >
              <VideoCircle state={webCamState}></VideoCircle>
            </Col>
            <Col xs={14} sm={16} md={18} lg={18} style={{ marginTop: 10 }}>
              <div className="clickMenu" style={clickMenu}>
                <div onClick={handleClick}>
                  <MenuButton img={isOpen ? less : Menu}></MenuButton>
                </div>
                {isOpen ? (
                  <NavigationCircleButton></NavigationCircleButton>
                ) : null}
              </div>
            </Col>
            <Col style={{ marginTop: 10 }} onClick={displayMessages}>
              <MenuButton img={message}></MenuButton>
            </Col>
          </Row>
        </Header>
        <Content>
          <Row>
            <Col span={24}></Col>
          </Row>
        </Content>
        <Footer style={{ padding: 0, backgroundColor: "rgba(0,0,0,0)" }}>
          <Row justify={"center"} style={{ marginBottom: 10, marginLeft: 10 }}>
            <Col xs={4} sm={3} md={2} lg={3}>
              <div onClick={changeMicState}>
                <CircleButton img={Mic} imgDisabled={MicDis}></CircleButton>
              </div>
            </Col>

            <Col xs={4} sm={3} md={2} lg={3}>
              <div onClick={changeSoundState}>
                <CircleButton img={Audio} imgDisabled={AudioDis}></CircleButton>
              </div>
            </Col>

            <Col xs={4} sm={3} md={2} lg={3}>
              <div onClick={changeWebCamState}>
                <CircleButton img={Cam} imgDisabled={CamDis}></CircleButton>
              </div>
            </Col>
          </Row>
        </Footer>
      </Layout>

  );
}

export default MobilePage;
