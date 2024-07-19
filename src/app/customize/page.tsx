"use client";

import {
  Box,
  Button,
  Checkbox,
  ColorInput,
  Divider,
  Drawer,
  Flex,
  List,
  Loader,
  Mark,
  NumberInput,
  ScrollArea,
  SegmentedControl,
  Space,
  Stack,
  Tabs,
  Text,
  UnstyledButton,
} from "@mantine/core";

import { handleSaveImage, invertColor } from "./helpers";
import useCustomizePageContext from "./hooks/useCustomizePageContext";
import Drawers from "./components/Drawers";
import Sidebar from "./components/Sidebar/Sidebar";
import { useEffect, useState } from "react";
import Fun from "./components/Sidebar/Fun";
import { color } from "three/examples/jsm/nodes/Nodes";
import classes from "./components/Sidebar/Sidebar.module.css";
import {
  IconAdjustments,
  IconSettings,
  IconDownload,
  IconRobot,
  IconPaint,
  IconMoodCrazyHappy,
} from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";
import { parts } from "./parts";
import PaintOptions from "./components/PaintOptions";

export default function CustomizePage() {
  const {
    modelViewerRef,
    bgColor,
    openControlsDrawer,
    openSettingsDrawer,
    isLoadingModel,
    setBgColor,
    clearPartsAlpha,
    setClearPartsAlpha,
  } = useCustomizePageContext();

  const [opened, { open, close }] = useDisclosure(false);
  const [partsSelected, setPartsSelected] = useState<string>("");
  const [pieceSelected, setPieceSelected] = useState<string>("");
  const [selectedTab, setSelectedTab] = useState<string>("");

  useEffect(() => {
    import("@google/model-viewer").catch(console.error);
  }, []);

  useEffect(() => {
    if (window.innerWidth > 800) {
      close();
    }
    if (window.innerWidth <= 430) {
      tabsTextSize !== 12 ? (tabsTextSize = 12) : null;
    }
  });
  let tabsTextSize = 14;
  const part = parts.find((part) => part.label === partsSelected);

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
            <Button onClick={open}>Open</Button>
            <Drawer
              withCloseButton={false}
              opened={opened}
              onClose={() => {
                close();
                setSelectedTab("");
              }}
              position="bottom"
              title={
                <Text size="xl" fw={700}>
                  Model
                </Text>
              }
              overlayProps={{ opacity: "0" }}
              radius="lg"
              styles={{
                content: {
                  borderTop: "2px solid #fffcfc",
                  height: "auto",
                  minHeight: 200,
                  maxHeight: 400,
                  backgroundColor: "#fffcfc",
                },
                root: { height: "auto" },
                body: { padding: 0 },
                header: { paddingBottom: 8, backgroundColor: "#fffcfc" },
              }}
            >
              <Divider />

              <Tabs
                orientation="horizontal"
                variant="outline"
                color="red"
                radius="md"
              >
                <Tabs.List p="20 10 0 10">
                  <Tabs.Tab
                    value="parts"
                    onClick={() => setSelectedTab("parts")}
                  >
                    <Flex direction="column" align="center" justify="center">
                      <IconRobot
                        size={18}
                        color={selectedTab === "parts" ? "#3b82f6" : "black"}
                      />
                      <Text
                        size="sm"
                        fw={600}
                        c={selectedTab === "parts" ? "#3b82f6" : "black"}
                        className={classes.drawerTabTextMobile}
                      >
                        Parts
                      </Text>
                    </Flex>
                  </Tabs.Tab>
                  <Tabs.Tab
                    value="paints"
                    onClick={() => setSelectedTab("paints")}
                  >
                    <Flex direction="column" align="center" justify="center">
                      <IconPaint
                        size={18}
                        color={selectedTab === "paints" ? "#3b82f6" : "black"}
                      />
                      <Text
                        size="sm"
                        fw={600}
                        c={selectedTab === "paints" ? "#3b82f6" : "black"}
                        className={classes.drawerTabTextMobile}
                      >
                        Paint
                      </Text>
                    </Flex>
                  </Tabs.Tab>
                  <Tabs.Tab value="fun" onClick={() => setSelectedTab("fun")}>
                    <Flex direction="column" align="center" justify="center">
                      <IconMoodCrazyHappy
                        size={18}
                        color={selectedTab === "fun" ? "#3b82f6" : "black"}
                      />
                      <Text
                        size="sm"
                        fw={600}
                        c={selectedTab === "fun" ? "#3b82f6" : "black"}
                        className={classes.drawerTabTextMobile}
                      >
                        Fun
                      </Text>
                    </Flex>
                  </Tabs.Tab>
                  <Tabs.Tab
                    value="controls"
                    onClick={() => setSelectedTab("controls")}
                    ml="auto"
                  >
                    <Flex direction="column" align="center" justify="center">
                      <IconAdjustments
                        size={18}
                        color={selectedTab === "controls" ? "#3b82f6" : "black"}
                      />
                      <Text
                        size="sm"
                        fw={600}
                        c={selectedTab === "controls" ? "#3b82f6" : "black"}
                        className={classes.drawerTabTextMobile}
                      >
                        Controls
                      </Text>
                    </Flex>
                  </Tabs.Tab>
                  <Tabs.Tab
                    value="settings"
                    onClick={() => setSelectedTab("settings")}
                  >
                    <Flex direction="column" align="center" justify="center">
                      <IconSettings
                        size={18}
                        color={selectedTab === "settings" ? "#3b82f6" : "black"}
                      />
                      <Text
                        size="sm"
                        fw={600}
                        c={selectedTab === "settings" ? "#3b82f6" : "black"}
                        className={classes.drawerTabTextMobile}
                      >
                        Settings
                      </Text>
                    </Flex>
                  </Tabs.Tab>
                </Tabs.List>

                <Tabs.Panel
                  value="parts"
                  p="20 10"
                  style={{ minHeight: 200 }}
                  bg="white"
                >
                  <Text size="sm" fw={500}>
                    Part
                  </Text>

                  <ScrollArea scrollbarSize={0}>
                    <SegmentedControl
                      data={parts.map((part) => part.label)}
                      style={{ overflow: "auto" }}
                      fullWidth
                      onChange={(e) => {
                        setPartsSelected(e);
                        setPieceSelected("");
                      }}
                    />
                  </ScrollArea>
                  <Space h={8} />
                  <Text size="sm" fw={500}>
                    Piece
                  </Text>
                  <Space h={4} />
                  <ScrollArea scrollbarSize={0}>
                    {partsSelected && (
                      <SegmentedControl
                        value={pieceSelected}
                        data={
                          part?.materials.map((material) => material[1]) || []
                        }
                        style={{ overflow: "auto" }}
                        onChange={(e) => setPieceSelected(e)}
                      />
                    )}
                  </ScrollArea>
                </Tabs.Panel>
                <Tabs.Panel
                  value="paints"
                  p="20 10"
                  style={{ minHeight: 200 }}
                  bg="white"
                >
                  <PaintOptions />
                </Tabs.Panel>
                <Tabs.Panel
                  value="fun"
                  p="20 10"
                  style={{ minHeight: 200 }}
                  bg="white"
                >
                  <Fun showTitle={false} />
                </Tabs.Panel>
                <Tabs.Panel
                  value="controls"
                  p="0 10 20 10"
                  style={{ minHeight: 200 }}
                  bg="white"
                >
                  <h1>Navigating the 3d model</h1>
                  <Box w="100%" bg="red">
                    <List styles={{ itemWrapper: { maxWidth: "100%" } }}>
                      <List.Item>
                        Rotate: <Mark>Left click + Drag</Mark>
                      </List.Item>
                      <List.Item>
                        Zoom In / Out: <Mark>Mouse wheel</Mark>
                      </List.Item>
                      <List.Item w="100%">
                        Pan: <Mark>Shift + Left click + Drag</Mark> OR{" "}
                        <Mark>Right click + Drag</Mark>
                      </List.Item>
                    </List>
                  </Box>
                </Tabs.Panel>
                <Tabs.Panel
                  value="settings"
                  p="20 10"
                  style={{ minHeight: 200 }}
                  bg="white"
                >
                  <form>
                    <ColorInput
                      label="3D Background Color"
                      placeholder="#ffffff"
                      onChange={(color) => {
                        setBgColor(color);
                      }}
                    />
                    <Space h={16} />
                    <NumberInput
                      label="Clear Alpha Value"
                      description="Sets the opacity of clear parts"
                      placeholder="0.2"
                      value={clearPartsAlpha}
                      onChange={(number) =>
                        setClearPartsAlpha(number as number)
                      }
                      max={0.9}
                      min={0.1}
                      step={0.1}
                    />
                    <Space h={16} />
                    <Checkbox
                      // defaultChecked
                      disabled
                      label="Autofocus"
                      description="Zooms in when a part is selected"
                    />
                  </form>
                </Tabs.Panel>
              </Tabs>
            </Drawer>
          </Box>
        </Flex>
      </Flex>
    </>
  );
}
