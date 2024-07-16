import {
  Checkbox,
  ColorInput,
  Drawer,
  List,
  Mark,
  NumberInput,
  Space,
} from "@mantine/core";
import useCustomizePageContext from "../hooks/useCustomizePageContext";

export default function Drawers() {
  const {
    setBgColor,
    clearPartsAlpha,
    setClearPartsAlpha,
    controlsDrawerOpened,
    closeControlsDrawer,
    settingsDrawerOpened,
    closeSettingsDrawer,
  } = useCustomizePageContext();

  return (
    <>
      <Drawer
        size={360}
        opened={settingsDrawerOpened}
        position="right"
        onClose={closeSettingsDrawer}
        title="Settings">
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
            onChange={(number) => setClearPartsAlpha(number as number)}
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
      </Drawer>
      <Drawer
        size={360}
        opened={controlsDrawerOpened}
        position="right"
        onClose={closeControlsDrawer}
        title="Customization Controls">
        <h1>Navigating the 3d model</h1>
        <List>
          <List.Item>
            Rotate: <Mark>Left click + Drag</Mark>
          </List.Item>
          <List.Item>
            Zoom In / Out: <Mark>Mouse wheel</Mark>
          </List.Item>
          <List.Item>
            Pan: <Mark>Shift + Left click + Drag</Mark> OR{" "}
            <Mark>Right click + Drag</Mark>
          </List.Item>
        </List>
      </Drawer>
    </>
  );
}
