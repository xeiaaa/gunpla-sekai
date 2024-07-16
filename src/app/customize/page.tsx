"use client";

import { Box, Button, Flex, Stack } from "@mantine/core";
import "@google/model-viewer";
import { handleSaveImage, invertColor } from "./helpers";
import useCustomizePageContext from "./hooks/useCustomizePageContext";
import Drawers from "./components/Drawers";
import Sidebar from "./components/Sidebar/Sidebar";

export default function CustomizePage() {
  const {
    modelViewerRef,

    bgColor,

    openControlsDrawer,
    openSettingsDrawer,
  } = useCustomizePageContext();

  return (
    <>
      <Drawers />
      <Flex style={{ flex: 1 }}>
        <Sidebar />
        <Box
          style={{
            height: "100%",
            width: "100%",
            position: "relative",
          }}>
          <Stack
            style={{ position: "absolute", top: 8, right: 8, zIndex: 100 }}>
            <Button
              variant="outline"
              color={invertColor(bgColor)}
              onClick={() => {
                openControlsDrawer();
              }}>
              Controls
            </Button>
            <Button
              variant="outline"
              color={invertColor(bgColor)}
              onClick={() => {
                openSettingsDrawer();
              }}>
              Settings
            </Button>
            <Button
              variant="outline"
              color={invertColor(bgColor)}
              onClick={() => {
                handleSaveImage(modelViewerRef);
              }}>
              Download
            </Button>
          </Stack>
          <model-viewer
            src={"/models/sazabi.glb"}
            ref={modelViewerRef}
            camera-controls
            shadow-intensity="1"
            disable-tap={true}
            interaction-prompt="none"
            style={{
              height: "100%",
              width: "100%",
              backgroundColor: bgColor,
            }}>
            <div className="progress-bar hide" slot="progress-bar">
              <div className="update-bar"></div>
            </div>
          </model-viewer>
        </Box>
      </Flex>
    </>
  );
}
