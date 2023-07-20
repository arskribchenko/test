import { React, useState } from "react";
import { HexColorPicker } from "react-colorful";
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

export default function DesktopColorRectangle(props) {
  const [color, setColor] = useState("#aabbcc");
  const style = {
    display: "inline-block",
    width: "160px",
    height: "160px",
    boxShadow: "0px 4px 0px #040206",
    border: "4px solid #232323",
    borderRadius: "16px",
    textAlign: "center",
    margin: "0 auto",
    backgroundColor: props.color,
  };
  return (
    <Row>
      <Col span={24} style={{ textAlign: "center" }}>
        <div className="color-rectangle" style={{backgroundColor: props.color}}></div>
      </Col>
      <Col
        className="customization-header-text"
        span={24}
        style={{ marginTop: "21px", textTransform: "uppercase" }}
      >
          {props.type} COLOR
      </Col>
    </Row>
  );
}
