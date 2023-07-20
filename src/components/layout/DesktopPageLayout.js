import { React, useEffect } from "react";
import { Switch, Route, useHistory, useRouteMatch } from "react-router-dom";

import DesktopPage from "../utils/Page/DesktopPage";
import DesktopFriendsPanel from "../shared/FriendsPanel/DesktopFriendsPanel";
import DesktopSettingPanel from "../shared/SettingPanel/DesktopSettingPanel";

import DesktopCustomization from "../../views/Customization/Desktop/DesktopCustomization";
import DesktopMessages from "../../views/DesktopMessages/DesktopMessages";
import DesktopChat from "../shared/Chat/DesktopChat";
import { OmitProps } from "antd/lib/transfer/ListBody";
import { ReactSVG } from "react-svg";
import GlobalChat from "../shared/GlobalChat/GlobalChat";
import loader from "../../assets/images/spin-transparent.svg";

export default function DesktopPageLayout({
  onFriendsClick,
  onExitFriendsClick,
  onCustomizationClick,
  onExitCustomizationClick,
  onMassagesClick,
  onExitMassagesClick,
  onExitChat,
  backToMessages,
  isLoading,
  setLoading,
}) {
  useEffect(() => {

  })
  return (
    <div>
      <DesktopPage />
      <Switch>
        <Route exact path={`/app/index/friends`}>
          <div
            style={{
              position: "fixed",
              top: 0,
              bottom: 0,
              left: 0,
              right: 0,
              background: "gray",
              opacity: "0.5",
            }}
          ></div>
          <div
            style={{ position: "fixed", top: 0, bottom: 0, left: 0, right: 0 }}
          >
            <DesktopFriendsPanel
              isLoading={isLoading}
              onExitFriendsClick={onExitFriendsClick}
              onFriendsClick={onFriendsClick}
              setLoading={setLoading}
            />
          </div>
        </Route>
        <Route exact path={`/app/index/settings`}>
          <div
            style={{
              position: "fixed",
              top: 0,
              bottom: 0,
              left: 0,
              right: 0,
              background: "gray",
              opacity: "0.5",
            }}
          ></div>
          <div
            style={{ position: "fixed", top: 0, bottom: 0, left: 0, right: 0 }}
          >
            <DesktopSettingPanel />
          </div>
        </Route>
        <Route exact path={`/app/index/messages`}>
          <div
            style={{
              position: "fixed",
              top: 0,
              bottom: 0,
              left: 0,
              right: 0,
              padding: 5,
              minWidth: "50%",
            }}
          >
            <DesktopMessages
              onMassagesClick={onMassagesClick}
              onExitMassagesClick={onExitMassagesClick}
            />
          </div>
        </Route>
        <Route exact path={`/app/customization`}>
          <div>
            <DesktopCustomization
              onExitCustomizationClick={onExitCustomizationClick}
              onCustomizationClick={onCustomizationClick}
            />
          </div>
        </Route>
        <Route exact path={`/app/index/chat`}>
          <div
            style={{
              position: "fixed",
              top: 0,
              bottom: 0,
              left: 0,
              right: 0,
              background: "gray",
              opacity: "0.5",
            }}
          ></div>
          <div
            style={{
              position: "fixed",
              top: 0,
              bottom: 0,
              left: 0,
              right: 0,
              padding: 5,
            }}
          >
            <DesktopChat
              onExitChat={onExitChat}
              backToMessages={backToMessages}
            />
          </div>
        </Route>
        {/* <Route exact path={`/app/index/global-chat`}>
          <div
            style={{
              position: "fixed",
              top: 0,
              bottom: 0,
              left: 0,
              right: 0,
              background: "gray",
              opacity: "0.5",
            }}
          ></div>
          <div
            style={{
              position: "fixed",
              top: 0,
              bottom: 0,
              left: 0,
              right: 0,
              padding: 5,
            }}
          >
            <GlobalChat
              backToMessages={backToMessages}
              onExitChat={onExitChat}
            />
          </div>
        </Route> */}
      </Switch>
    </div>
  );
}
