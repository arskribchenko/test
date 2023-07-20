import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setAudioDevices,
  setVideoDevices,
  setSelectedVideoDevice,
  setSelectedAudioDevice,
} from "../redux/appSlice";

import devices from "../services/devices";

export default function useDevices(props) {
  const app = useSelector((state) => state.app);

  const dispatch = useDispatch();

  useEffect(() => {
    var params = {};

    if (app.selectedVideoDevice) {
      params["video"] = {};
      params.video["deviceId"] = app.selectedVideoDevice;
    } else {
      params["video"] = true;
    }

    if (app.selectedAudioDevice) {
      params["audio"] = {};
      params.audio["deviceId"] = app.selectedAudioDevice;
    } else {
      params["audio"] = true;
    }

    devices
      .getDevicePermission(params)
      .then((value) => {
        const selectedVideoSetting = value
          .getTracks()
          .find((item) => item.kind === "video")
          .getSettings();

        const selectedAudioSetting = value
          .getTracks()
          .find((item) => item.kind === "audio")
          .getSettings();

        dispatch(setSelectedVideoDevice(selectedVideoSetting.deviceId));
        dispatch(setSelectedAudioDevice(selectedAudioSetting.deviceId));

        devices
          .getAllDevices()
          .then((devices) => {
            console.log(devices);
            dispatch(setVideoDevices(devices.videoDevices));
            dispatch(setAudioDevices(devices.audioInputDevices));
          })
          .catch((error) => console.error(error));
      })
      .catch((error) => console.error(error));
  }, []);

  return true;
}
