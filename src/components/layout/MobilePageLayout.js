import { React } from "react";
import { Switch, Route, useHistory, useRouteMatch } from "react-router-dom";

import MobilePage from "../utils/Page/MobilePage";
import MobileFriendsPanel from "../shared/FriendsPanel/MobileFriendsPanel";
import MobileMassages from "../../views/MobileMessages/MobileMassages";

import DesktopSettingPanel from "../shared/SettingPanel/DesktopSettingPanel";
import MobileCustomization from "../../views/Customization/Mobile/MobileCustomization";
import MobileChat from "../shared/Chat/MobileChat";
import MobileSettingsPanel from "../shared/SettingPanel/MobileSettingPanel";
import MobileGlobalChat from "../shared/GlobalChat/mobile/MobileGlobalChat";

export default function MobilePageLayout({
  onFriendsClick,
  onExitFriendsClick,
  onMassagesClick,
  onExitMassagesClick,
  onCustomizationClick,
  onExitCustomizationClick,
  onExitChat,
  backToMessages,
}) {
  return (
    <div>
      <MobilePage />
      <Switch>
        <Route exact path={`/app/index/friends`}>
          <div
            style={{ position: "fixed", top: 0, bottom: 0, left: 0, right: 0 }}
          >
            <MobileFriendsPanel
              onExitFriendsClick={onExitFriendsClick}
              onFriendsClick={onFriendsClick}
            />
          </div>
        </Route>
        <Route exact path={`/app/index/settings`}>
          <div
            style={{ position: "fixed", top: 0, bottom: 0, left: 0, right: 0 }}
          >
            <MobileSettingsPanel />
          </div>
        </Route>
        <Route exact path={`/app/index/messages`}>
          <div
            style={{ position: "fixed", top: 0, bottom: 0, left: 0, right: 0 }}
            
          >
            <MobileMassages
              onMassagesClick={onMassagesClick}
              onExitMassagesClick={onExitMassagesClick}
            />
          </div>
        </Route>
        <Route exact path={`/app/customization`}>
          <div
            style={{ position: "fixed", top: 0, bottom: 0, left: 0, right: 0 }}
          >
            <MobileCustomization
              onCustomizationClick={onCustomizationClick}
              onExitCustomizationClick={onExitCustomizationClick}
            ></MobileCustomization>
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
            }}
          >
            <MobileChat onExitChat={onExitChat} />
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
            }}
          >
            <MobileGlobalChat
              backToMessages={backToMessages}
              onExitChat={onExitChat}
            />
          </div>
        </Route> */}
      </Switch>
    </div>
  );
}
