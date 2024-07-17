"use client";

import { Box, Button, Flex, Loader, Stack, Text } from "@mantine/core";

import { handleSaveImage, invertColor } from "./helpers";
import useCustomizePageContext from "./hooks/useCustomizePageContext";
import Drawers from "./components/Drawers";
import Sidebar from "./components/Sidebar/Sidebar";
import { useEffect } from "react";

export default function CustomizePage() {
  const {
    modelViewerRef,

    bgColor,

    openControlsDrawer,
    openSettingsDrawer,

    isLoadingModel,
  } = useCustomizePageContext();

  useEffect(() => {
    import("@google/model-viewer").catch(console.error);
  }, []);

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
            {isLoadingModel && (
              <Flex
                flex={1}
                direction="column"
                gap={16}
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  height: "100%",
                }}>
                <Loader />
                <Text>Loading 3d model...</Text>
              </Flex>
            )}
          </model-viewer>
        </Box>
      </Flex>
    </>
  );
}
