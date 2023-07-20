import React, { Component } from "react";
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
import { useState, useEffect } from "react";
import DesktopPage from "./DesktopPage";
import MobilePage from "./MobilePage";

function Page() {
  const { useBreakpoint } = Grid;
  const screens = useBreakpoint();
  const [isDesktop, setIsDesktop] = useState(false);
  useEffect(() => {
    //console.log(screens)
    if (screens.md) {
      setIsDesktop(true);
    } else {
      setIsDesktop(false);
    }
  }, [screens]);

  return (
    <Row>
      {isDesktop ? <DesktopPage></DesktopPage> : <MobilePage></MobilePage>}
    </Row>
  );
}
export default Page;
