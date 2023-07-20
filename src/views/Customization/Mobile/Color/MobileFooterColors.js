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

import MobileColorChange from "./MobileColorChange";
import MobileColorRectangle from "./MobileColorRectangle";
import { OmitProps } from "antd/lib/transfer/ListBody";

import commands from "../../../../services/commands";

export default function MobileFooterColors(props) {
  const customization = useSelector((state) => state.customization);
  const [isPrimary, setPrimary] = useState(null);
  const [isSecondary, setSecondary] = useState(null);
  const [isRing, setRing] = useState(null);
  const [color, setColor] = useState("#aabbcc");
  const [ringColor, setRingColor] = useState(props.ringColor);
  const [primaryColor, setPrimaryColor] = useState(props.primaryColor);
  const [secondaryColor, setSecondaryColor] = useState(props.secondaryColor);
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
          <Col span={16} style={{ marginBottom: "13px" }}>
            <Row>
              <Col span={24}>
                <Row justify="space-between">
                  <Col span={6}>
                    <Row>
                      <div onClick={handleRingClick}>
                        <MobileColorRectangle
                          type="ring"
                          color={customization.ringColor}
                        ></MobileColorRectangle>
                      </div>
                    </Row>
                  </Col>
                  <Col span={6}>
                    <Row>
                      <div onClick={handlePrimaryClick}>
                        <MobileColorRectangle
                          type="primary"
                          color={customization.primaryColor}
                        ></MobileColorRectangle>
                      </div>
                    </Row>
                  </Col>
                  <Col span={6}>
                    <Row>
                      <div onClick={handleSecondaryClick}>
                        <MobileColorRectangle
                          type="secondary"
                          color={customization.secondaryColor}
                        ></MobileColorRectangle>
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
        <MobileColorChange
          pickerColor={props.pickerColor}
          color={props.ringColor}
          setColor={props.setRing}
          setColorInFooter={setRingColor}
          type="ring"
          gen={props.gen}
          hide={props.hide}
          cancel={cancelColorChange}
          socket={commands.addonsColors.ring}
        ></MobileColorChange>
      ) : null}
      {isSecondary ? (
        <MobileColorChange
          pickerColor={props.pickerColor}
          color={props.secondaryColor}
          setColor={props.setSecondary}
          setColorInFooter={setSecondaryColor}
          type="secondary"
          gen={props.gen}
          hide={props.hide}
          cancel={cancelColorChange}
          socket={commands.addonsColors.secondary}
        ></MobileColorChange>
      ) : null}
      {isPrimary ? (
        <MobileColorChange
          pickerColor={props.pickerColor}
          color={props.primaryColor}
          setColor={props.setPrimary}
          setColorInFooter={setPrimaryColor}
          type="primary"
          gen={props.gen}
          hide={props.hide}
          cancel={cancelColorChange}
          socket={commands.addonsColors.primary}
        ></MobileColorChange>
      ) : null}
    </div>
  );
}
