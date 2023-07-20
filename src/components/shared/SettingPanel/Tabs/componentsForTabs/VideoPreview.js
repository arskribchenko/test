import { React, useRef, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
export default function VideoPreview(params) {
  const app = useSelector((state) => state.app);
  const videoPreview = {
    width: "50vh",
    height: "30vh",
    background: "#393939",
  };
  const videoRef = useRef(null);
  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: {deviceId: app.selectedVideoDevice} })
      .then((stream) => {
        let video = videoRef.current;
        if (video) {
          video.srcObject = stream;
          video.onloadedmetadata = function (e) {
            video.play();
          };
        }
      })
      .catch((err) => {
        console.error("error:", err);
      });
  });
  return (
    <div style={videoPreview}>
      <video style={videoPreview} ref={videoRef}></video>
    </div>
  );
}
