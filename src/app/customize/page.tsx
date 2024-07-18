"use client";

import {
  Box,
  Button,
  Flex,
  Loader,
  Stack,
  Text,
  UnstyledButton,
} from "@mantine/core";

import { handleSaveImage, invertColor } from "./helpers";
import useCustomizePageContext from "./hooks/useCustomizePageContext";
import Drawers from "./components/Drawers";
import Sidebar from "./components/Sidebar/Sidebar";
import { useEffect } from "react";
import Fun from "./components/Sidebar/Fun";
import { color } from "three/examples/jsm/nodes/Nodes";
import classes from "./components/Sidebar/Sidebar.module.css";
import {
  IconAdjustments,
  IconSettings,
  IconDownload,
} from "@tabler/icons-react";

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
        <Flex direction="column" w="100%" h="100%">
          <Box
            style={{
              height: "100%",
              width: "100%",
              position: "relative",
              // minWidth: "420px",
            }}
          >
            <Stack
              style={{ position: "absolute", top: 8, right: 8, zIndex: 100 }}
            >
              <Button
                variant="outline"
                color={invertColor(bgColor)}
                onClick={() => {
                  openControlsDrawer();
                }}
                className={classes.modelNavMobile}
              >
                Controls
              </Button>
              <Flex
                color={invertColor(bgColor)}
                className={classes.modelIconMobile}
                w={24}
                h={24}
                style={{ borderRadius: "50%", border: "1px solid black" }}
                align="center"
                justify="center"
                onClick={() => {
                  openControlsDrawer();
                }}
              >
                <IconAdjustments size={14} />
              </Flex>
              <Button
                variant="outline"
                color={invertColor(bgColor)}
                onClick={() => {
                  openSettingsDrawer();
                }}
                className={classes.modelNavMobile}
              >
                Settings
              </Button>
              <Flex
                color={invertColor(bgColor)}
                className={classes.modelIconMobile}
                w={24}
                h={24}
                style={{ borderRadius: "50%", border: "rgba(80,80,80,0.6)" }}
                align="center"
                justify="center"
                onClick={() => {
                  openSettingsDrawer();
                }}
                bg="#505050"
              >
                <IconSettings size={14} color="white" />
              </Flex>
              <Button
                variant="outline"
                color={invertColor(bgColor)}
                onClick={() => {
                  handleSaveImage(modelViewerRef);
                }}
                className={classes.modelNavMobile}
              >
                Download
              </Button>
              <Flex
                color={invertColor(bgColor)}
                className={classes.modelIconMobile}
                w={24}
                h={24}
                style={{ borderRadius: "50%", border: "1px solid black" }}
                align="center"
                justify="center"
                onClick={() => {
                  openSettingsDrawer();
                }}
              >
                <IconDownload size={14} />
              </Flex>
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
              }}
            >
              {isLoadingModel && (
                <Flex
                  flex={1}
                  direction="column"
                  gap={16}
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100%",
                  }}
                >
                  <Loader />
                  <Text>Loading 3d model...</Text>
                </Flex>
              )}
            </model-viewer>
          </Box>
          <Box mt={20} className={classes.funMobile}>
            <Fun />
          </Box>
        </Flex>
      </Flex>
    </>
  );
}
