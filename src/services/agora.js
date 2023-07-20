import AgoraRTC from "agora-rtc-sdk-ng";
import agoraConfig from "../agora.config";
import makeChannelId from "../utils/generateChannelId";

var channelMuteState = {
  audio: false,
  video: false,
};

var localMuteState = {
  audio: false,
  video: false,
};

var client;

var localTracks = {
  videoTrack: null,
  audioTrack: null,
};

// function getDevices() {
//   AgoraRTC.getDevices().then((devices) => {
//     //console.log(devices);
//   });
// }

function setVideoDevice(newDevice) {
  console.log(newDevice);
  // let videoDevice = null;
  // AgoraRTC.getDevices().then((devices) => {
  //   devices.map((elem) => {
  //     console.log(elem.label);
  //     if (elem.label === newDevice) {
  //       videoDevice = elem.deviceId;
  //     }
  //   });
  // });
  // console.log(videoDevice);
  // if (videoDevice) {
  //   localTracks.videoTrack.setDevice(videoDevice);
  // }
  if (localTracks.videoTrack) localTracks.videoTrack.setDevice(newDevice);
}

function setAudioDevice(newDevice) {
  if (localTracks.audioTrack) localTracks.audio.setDevice(newDevice);
}

function updateStateAudioTrack(isMute) {
  localMuteState.audio = isMute;

  console.debug("isMute: ", isMute);
  console.debug("localTracks.audioTrack: ", localTracks.audioTrack);

  if (channelMuteState.audio || localMuteState.audio) {
    client.unpublish(localTracks.audioTrack);
  } else {
    client.publish(localTracks.audioTrack);
  }
}

function updateStateVideoTrack(isMute) {
  localMuteState.video = isMute;

  if (channelMuteState.video || localMuteState.video) {
    client.unpublish(localTracks.videoTrack);
  } else {
    client.publish(localTracks.videoTrack);
  }
}

async function createClient(
  channelId,
  agoraUid,
  isAudioEnableStr,
  isVideoEnableStr,
  success
) {
  client = AgoraRTC.createClient({ mode: "rtc", codec: "vp8" });

  localTracks.audioTrack = null;
  localTracks.videoTrack = null;

  console.log("AgoraRTC client initialized");

  client.on("connection-state-change", (event) => {
    console.debug(event);
  });

  client.on("error", (event) => {
    console.debug(event);
  });

  client.on("exception", (event) => {
    console.debug(event);
  });

  var options = {
    uid: null,
  };

  channelMuteState.audio = isAudioEnableStr !== "true";
  channelMuteState.video = isVideoEnableStr !== "true";

  if (isAudioEnableStr === "true") {
    localTracks.audioTrack = await AgoraRTC.createMicrophoneAudioTrack();
  }

  if (isVideoEnableStr === "true") {
    localTracks.videoTrack = await AgoraRTC.createCameraVideoTrack();
  }

  options.uid = await client.join(
    agoraConfig.AGORA_APP_ID,
    channelId,
    null,
    parseInt(agoraUid)
  );

  updateStateAudioTrack(localMuteState.audio);
  updateStateVideoTrack(localMuteState.video);

  client.on("user-published", handleUserPublished);
  client.on("user-unpublished", handleUserUnpublished);

  console.debug(client.remoteUsers);

  client.remoteUsers.forEach(async (user) => {
    console.debug(options.uid);
    if (user.uid === options.uid) {
      return;
    }

    console.debug(`subscribe ${user.uid} audio`);
    var track = await client.subscribe(user, "audio");

    track.play();
  });

  console.debug("User " + options.uid + " join channel successfully");

  success();
}

async function attenuateAudio(data) {
  if (!client) {
    return;
  }

  var remoteClients = client.remoteUsers;

  remoteClients.forEach((user) => {
    if (user.audioTrack) {
      user.audioTrack.setVolume(0);
    } else {
      console.debug(`User ${user.uid} hasnt audio`);
    }
  });

  data.distances.forEach((distanceUser) => {
    var user = client.remoteUsers.find(
      (item) => item.uid === parseInt(distanceUser.uid)
    );

    if (!user) {
      return;
    }

    var volume = (2000 - Math.floor(distanceUser.distance)) / 20;

    if (user.audioTrack) {
      user.audioTrack.setVolume(volume < 0 ? 0 : volume);
    } else {
      console.debug(`User ${user.uid} hasnt audio`);
    }
  });
}

async function handleUserPublished(user, mediaType) {
  console.debug(`subscribe ${user.uid} audio`);
  var track = await client.subscribe(user, "audio");

  track.play();
}

async function handleUserUnpublished(user) {
  console.debug(`unsubscribe ${user.uid} audio`);
  await client.unsubscribe(user, "audio");
}

async function deleteClient() {
  if (!client) {
    return;
  }

  client.localTracks.forEach((track) => {
    track.close();
  });

  await client.leave();
}

export default {
  createClient,
  deleteClient,
  attenuateAudio,
  localTracks,
  updateStateAudioTrack,
  updateStateVideoTrack,
  //getDevices,
  setVideoDevice,
  setAudioDevice
};
