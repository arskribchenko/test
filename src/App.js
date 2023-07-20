import "./styles/index.css";

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

import "./App.css";
import { useEffect, useState } from "react";

import LogIn from "./views/Log In/LogIn";

import { Switch, Route, useLocation, useHistory } from "react-router-dom";

import Registration from "./views/Registration/Registration";
import UE4Engine from "./components/layout/UE4Engine";
import UIContainer from "./components/layout/UIContainer";
import InitialSetup from "./views/InitialSetup/InitialSetup";
import ResetPassword from "./views/ResetPassword/ResetPassword";
import GuardedRoute from "./components/utils/GuardedRoute";

import devices from "./services/devices";
import accountService from "./services/account";
import useBreakpoint from "antd/lib/grid/hooks/useBreakpoint";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { useDispatch, useSelector } from "react-redux";

import useWhoami from "./hooks/useWhoami";

import ue4appInstance from "./ue4appInstanse";
import useAgora from "./hooks/useAgora";
import useNeonItems from "./hooks/useNeonItems";
//import useFriendsChats from "./hooks/useFriendsChats";
import { setAgoraId } from "./redux/accountSlice";

function App() {
  let location = useLocation();
  const history = useHistory();

  function handleResize() {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
  }

  useWhoami();
  useAgora();
  useNeonItems();
  //useFriendsChats();
  const screens = useBreakpoint();
  const [dataChannelInited, setDataChannelInited] = useState(false);
  handleResize();
  const account = useSelector((state) => state.account);

  useEffect(() => {
    console.debug("dataChannelInited:", dataChannelInited);
  }, [dataChannelInited]);
  
  useEffect(() => {
    if (!screens.md) window.addEventListener("resize", handleResize);
    return () => {
      if (!screens.md) window.removeEventListener("resize", handleResize);
    };
  });
  return (
    <div id="app" className="App">
      <Switch location={location}>
        {/* Registration */}
        <Route path="/" exact>
          <Row
            align="middle"
            justify="center"
            style={{ backgroundColor: "#7d7d7d", height: "100vh" }}
          >
            <Col style={{ backgroundColor: "#7d7d7d" }} span={24}>
              <LogIn></LogIn>
            </Col>
          </Row>
        </Route>

        {/* App */}
        <GuardedRoute path="/app" auth={account.token !== null}>
          <div>
            <UE4Engine
              init={() => {
                if (!account.token) {
                  return;
                }
                var ue4app = ue4appInstance.getInstance().getUe4app();

                function localGetIntance() {
                  accountService.getGiveMyServer().then((response) => {
                    if (response.data.instanceAddress !== null) {
                      ue4app.load(response.data.instanceAddress);
                      return;
                    }

                    setTimeout(() => {
                      localGetIntance();
                    }, 2500);
                  });
                }

                localGetIntance();
              }}
              onInited={() => {
                console.debug("Set inited");
                setDataChannelInited(true);
              }}
            />

            <UIContainer
              dataChannelInited={dataChannelInited}
              startVideoStreaming={() => {
                var ue4app = ue4appInstance.getInstance().getUe4app();
                ue4app.handleHomepageClick();
                ue4appInstance.getInstance().initUE4Callback();
              }}
            />
          </div>
        </GuardedRoute>

        <Route path="/registration">
          <Row
            align="middle"
            justify="center"
            style={{ height: "100vh", backgroundColor: "#7d7d7d" }}
          >
            <Col>
              <Registration></Registration>
            </Col>
          </Row>
        </Route>
        <Route path="/initial-setup">
          <Row
            align="middle"
            justify="center"
            style={{ height: "100vh", backgroundColor: "#7F7F7F" }}
          >
            <Col span={5}>
              <InitialSetup />
            </Col>
          </Row>
        </Route>
        <Route path="/reset-password">
          <Row
            align="middle"
            justify="center"
            style={{ height: "100vh", backgroundColor: "#7F7F7F" }}
          >
            <Col span={5}>
              <ResetPassword />
            </Col>
          </Row>
        </Route>
      </Switch>
    </div>
  );
}

export default App;
