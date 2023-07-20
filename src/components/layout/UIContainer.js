import { React, useEffect, useState } from "react";
import { Switch, Route, useHistory } from "react-router-dom";

import Homepage from "../utils/Homepage/Homepage";
import useBreakpoint from "antd/lib/grid/hooks/useBreakpoint";
import AppUIContainer from "./AppUIContainer";
import DesktopCustomization from "../../views/Customization/Desktop/DesktopCustomization";
import MobileCustomization from "../../views/Customization/Mobile/MobileCustomization";

import GuardedRoute from "../utils/GuardedRoute";
import { useSelector } from "react-redux";

import devices from "../../services/devices";
import { ReactSVG } from "react-svg";

export default function UIContainer({
  startVideoStreaming,
  dataChannelInited,
}) {
  const screens = useBreakpoint();
  const history = useHistory();

  const [isDesktop, setIsDesktop] = useState(false);

  const account = useSelector((state) => state.account);

  useEffect(() => {
    if (screens.xl) {
      setIsDesktop(true);
    } else {
      setIsDesktop(false);
    }
  }, [screens]);

  const baseStyle = {
    position: "fixed",
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
    zIndex: 50,
    pointerEvents: "none",
  };

  return (
    <div className="ui-container" style={baseStyle}>
      <Switch>
        {/* Splash */}
        <GuardedRoute
          exact
          path={"/app/splash"}
          component={() => (
            <Homepage
              loading={!dataChannelInited}
              startVideoStreaming={startVideoStreaming}
            ></Homepage>
          )}
          auth={account.token !== null}
        />

        {/* Index */}
        <GuardedRoute
          path={"/app/index"}
          component={() => <AppUIContainer />}
          auth={account.token !== null}
        />

        {/* Customization*/}
        <GuardedRoute
          exact
          path={"/app/customization"}
          component={() =>
            isDesktop ? <DesktopCustomization /> : <MobileCustomization />
          }
          auth={account.token !== null}
        />
      </Switch>
    </div>
  );
}

{
  /*{isPage ? (
       
      ) : null}
      {isCustomization ? <Customization></Customization> : null}*/
}
