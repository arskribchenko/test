import { React, useState, useEffect } from "react";
import { HexColorPicker } from "react-colorful";
import { useDispatch, useSelector } from "react-redux";
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

import DesktopColorChange from "./DesktopColorChange";
import DesktopColorRectangle from "./DesktopColorRectangle";
import { OmitProps } from "antd/lib/transfer/ListBody";

import commands from "../../../../services/commands";

export default function DesktopFooterColors(props) {
  const [isPrimary, setPrimary] = useState(null);
  const [isSecondary, setSecondary] = useState(null);
  const [isRing, setRing] = useState(null);
  const [color, setColor] = useState("#aabbcc");
  const [ringColor, setRingColor] = useState(props.ringColor);
  const [primaryColor, setPrimaryColor] = useState(props.primaryColor);
  const [secondaryColor, setSecondaryColor] = useState(props.secondaryColor);
  const customization = useSelector((state) => state.customization);
  useEffect(() => {
    // setRingColor(props.ringColor);
    // setPrimaryColor(props.primaryColor);
    // setSecondaryColor(props.secondaryColor);
  });

  function handleRingClick() {
    setRing(true);
    setPrimary(false);
    setSecondary(false);
  }
  function handlePrimaryClick() {
    setPrimary(true);
    setSecondary(false);
    setRing(false);
  }
  function handleSecondaryClick() {
    setSecondary(true);
    setRing(false);
    setPrimary(false);
  }
  function cancelColorChange() {
    setSecondary(false);
    setRing(false);
    setPrimary(false);
    props.hide();
  }

  return (
    <div>
      {!isPrimary && !isSecondary && !isRing ? (
        <Row justify="center">
          <Col xl={16} span={12} style={{ marginBottom: "25px" }}>
            <Row>
              <Col span={24}>
                <Row justify="space-between">
                  <Col xl={8} span={6}>
                    <Row>
                      <div onClick={handleRingClick}>
                        <DesktopColorRectangle
                          type="ring"
                          color={customization.ringColor}
                        ></DesktopColorRectangle>
                      </div>
                    </Row>
                  </Col>
                  <Col xl={8} span={6}>
                    <Row>
                      <div onClick={handlePrimaryClick}>
                        <DesktopColorRectangle
                          type="primary"
                          color={customization.primaryColor}
                        ></DesktopColorRectangle>
                      </div>
                    </Row>
                  </Col>
                  <Col xl={8} span={6}>
                    <Row>
                      <div onClick={handleSecondaryClick}>
                        <DesktopColorRectangle
                          type="secondary"
                          color={customization.secondaryColor}
                        ></DesktopColorRectangle>
                      </div>
                    </Row>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Col>
        </Row>
      ) : null}
      {isRing ? (
        <DesktopColorChange
          pickerColor={props.pickerColor}
          color={props.ringColor}
          setColor={props.setRing}
          setColorInFooter={setRingColor}
          type="ring"
          gen={props.gen}
          hide={props.hide}
          cancel={cancelColorChange}
          socket={commands.addonsColors.ring}
        ></DesktopColorChange>
      ) : null}
      {isSecondary ? (
        <DesktopColorChange
          pickerColor={props.pickerColor}
          color={props.secondaryColor}
          setColor={props.setSecondary}
          setColorInFooter={setSecondaryColor}
          type="secondary"
          gen={props.gen}
          hide={props.hide}
          cancel={cancelColorChange}
          socket={commands.addonsColors.secondary}
        ></DesktopColorChange>
      ) : null}
      {isPrimary ? (
        <DesktopColorChange
          pickerColor={props.pickerColor}
          color={props.primaryColor}
          setColor={props.setPrimary}
          setColorInFooter={setPrimaryColor}
          type="primary"
          gen={props.gen}
          hide={props.hide}
          cancel={cancelColorChange}
          socket={commands.addonsColors.primary}
        ></DesktopColorChange>
      ) : null}
    </div>
  );
}
