import { React, useEffect, useState } from "react";

import agoraConfig from "../../agora.config";
import ue4appInstance from "../../ue4appInstanse";
import commandService from "../../services/commands";
import { useDispatch, useSelector } from "react-redux";

import agoraService from "../../services/agora";
import { useHistory } from "react-router-dom";
import { setIsSplashed } from "../../redux/appSlice";

import { isMobile } from "react-device-detect";
import commands from "../../services/commands";
import { setAgoraChannelId, setAgoraId } from "../../redux/accountSlice";

export default function UE4Engine({ init, onInited }) {
  /* Load UE4RTC */
  const account = useSelector((state) => state.account);
  const dispatch = useDispatch();

  const history = useHistory();

  var userAgoraUid;

  useEffect(() => {
    if (history.location.pathname === "/app/splash") {
      dispatch(setIsSplashed(true));
    } else {
      history.push("/app/splash");
    }
  }, [history]);

  function ue4handler(event) {
    console.debug(event);
    const object = JSON.parse(event);

    switch (object.command) {
      case "init_customization": {
        dispatch(setAgoraId(object.agora_user_id));
        userAgoraUid = object.agora_user_id;
        break;
      }
      case "attenuate_audio": {
        agoraService.attenuateAudio(object);
        break;
      }
      case "connect_to_channel": {
        agoraService.deleteClient();

        agoraService.createClient(
          object.channel_id,
          userAgoraUid,
          object.audio_enabled,
          object.video_enabled,
          () => {
            console.debug(`Connected to ${object.channel_id}`);
          }
        );

        break;
      }
    }
  }

  useEffect(() => {
    ue4appInstance
      .getInstance()
      .addUIHandler("handler", (data) => ue4handler(data));
    var ue4app = ue4appInstance.getInstance().getUe4app();

    if (!ue4app.isLoaded) {
      init();

      ue4app.isLoaded = true;
    }
  }, []);

  useEffect(() => {
    ue4appInstance.getInstance().dataChannelInitedUE4Callback = () => {
      console.debug("dataChannelInitedUE4Callback");
      onInited();
    };
  }, []);

  useEffect(() => {
    if (!account.id) {
      return;
    }

    const initCommand = commandService.createInitCustomizationCommand(
      account.id,
      account.agoraUid,
      account.isSuperUser,
      agoraConfig.AGORA_APP_ID,
      ""
    );

    const setNameCommand = commandService.createSetNameCommand(
      account.neonName
    );
    const setInputMode = commandService.createInputModeCommand(
      isMobile ? commands.inputModes.simpleTouch : commands.inputModes.simple
    );

    ue4appInstance.getInstance().initUE4Callback = () => {
      ue4appInstance.getInstance().emitUICommand(initCommand);
      ue4appInstance.getInstance().emitUICommand(setNameCommand);
      ue4appInstance.getInstance().emitUICommand(setInputMode);
    };
  }, [account.isSuperUser, account.agoraChannelId, account.agoraUid]);

  return (
    <div id="playerUI">
      <div id="player"></div>
      <div id="overlay" className="overlay"></div>
    </div>
  );
}
