import useBreakpoint from "antd/lib/grid/hooks/useBreakpoint";
import { React, useEffect, useState } from "react";
import { Switch, Route, useHistory, useRouteMatch } from "react-router-dom";
import MobilePage from "../utils/Page/MobilePage";

import DesktopPageLayout from "./DesktopPageLayout";
import MobilePageLayout from "./MobilePageLayout";
import loader from "../../assets/images/spin-transparent.svg";
import { ReactSVG } from "react-svg";

import {
  BrowserView,
  MobileView,
  isBrowser,
  isMobile,
} from "react-device-detect";

export default function AppUIContainer() {
  const [scaleCount, setCount] = useState(0);
  const [isDesktop, setIsDesktop] = useState(false);

  const screens = useBreakpoint();
  const history = useHistory();
  let { path, url } = useRouteMatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  useEffect(() => {
    console.debug(screens);
    if (screens.md) {
      setIsDesktop(true);
    } else {
      setIsDesktop(false);
    }
    if (isMobile) {
      setIsDesktop(false);
    }
  }, [screens]);

  return (
    <div style={{ position: "relative" }} id="mobile-fix">
      {loading ? (
        <div className="center" style={{ zIndex: "9999" }}>
          <ReactSVG src={loader}></ReactSVG>
        </div>
      ) : (
        <Switch>
          <Route path={`${path}`}>
            {isDesktop ? (
              <DesktopPageLayout
                onFriendsClick={() => {
                  history.push("/app/index/friends");
                }}
                onExitFriendsClick={() => {
                  history.push("/app/index");
                }}
                onMassagesClick={() => {
                  history.push("/app/index/messages");
                }}
                onExitMassagesClick={() => {
                  history.push("/app/index");
                }}
                onCustomizationClick={() => {
                  history.push("/app/customization");
                }}
                onExitCustomizationClick={() => {
                  history.push("/app/index");
                }}
                onExitChat={() => {
                  history.push("/app/index");
                }}
                setLoading={setLoading}
                backToMessages={() => {
                  history.push("/app/index/messages");
                }}
              ></DesktopPageLayout>
            ) : (
              <MobilePageLayout
                onFriendsClick={() => {
                  history.push("/app/index/friends");
                }}
                onExitFriendsClick={() => {
                  history.push("/app/index");
                }}
                onMassagesClick={() => {
                  history.push("/app/index/messages");
                }}
                onExitMassagesClick={() => {
                  history.push("/app/index");
                }}
                onCustomizationClick={() => {
                  history.push("/app/customization");
                }}
                onExitCustomizationClick={() => {
                  history.push("/app/index");
                }}
                onExitChat={() => {
                  history.push("/app/index");
                }}
                backToMessages={() => {
                  history.push("/app/index/messages");
                }}
              ></MobilePageLayout>
            )}
          </Route>
        </Switch>
      )}
      ;
    </div>
  );
}
