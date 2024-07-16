import {
  Accordion,
  Box,
  Button,
  Checkbox,
  ColorInput,
  ColorPicker,
  ColorSwatch,
  Flex,
  ScrollArea,
  SegmentedControl,
  Space,
  Text,
  UnstyledButton,
} from "@mantine/core";
import { parts } from "../../parts";
import useCustomizePageContext from "../../hooks/useCustomizePageContext";
import { IconPlus } from "@tabler/icons-react";
import { COLOR_TYPE } from "../../../../types";
import { hexToRgba } from "../../helpers";

export default function Sidebar() {
  const {
    materials,
    selectedMaterialSlug,
    setSelectedMaterialSlug,
    colorToAdd,
    setColorToAdd,
    palette,
    setPalette,
    sidebarRef,
    sidebarHeight,
    currentColorTab,
    setCurrentColorTab,
    isClear,
    setIsClear,
    clearPartsAlpha,
  } = useCustomizePageContext();

  const currentMaterial = materials[selectedMaterialSlug || ""];

  return (
    <>
      <Flex style={{ width: 240, backgroundColor: "#f0f0f0" }} ref={sidebarRef}>
        <ScrollArea h={sidebarHeight} w={260} type="never" scrollbarSize={2}>
          <Accordion
            // variant="filled"
            defaultValue="Head"
            style={{ width: "100%" }}>
            {parts.map((part) => {
              return (
                <Accordion.Item value={part.slug} key={part.slug}>
                  <Accordion.Control>{part.label}</Accordion.Control>
                  <Accordion.Panel>
                    {part.materials.map((material) => {
                      return (
                        <Button
                          variant="subtle"
                          color={
                            selectedMaterialSlug === material.slug
                              ? "blue"
                              : "gray"
                          }
                          key={material.slug}
                          style={{ width: "100%" }}
                          onClick={() => {
                            console.log(material.slug);
                            setSelectedMaterialSlug(material.slug);
                          }}>
                          {material.label}
                        </Button>
                      );
                    })}
                  </Accordion.Panel>
                </Accordion.Item>
              );
            })}
          </Accordion>
        </ScrollArea>
      </Flex>
      <Box
        style={{
          minWidth: 240,
          maxWidth: 240,
          backgroundColor: "#fafafa",
          padding: 8,
          position: "relative",
        }}>
        <Flex
          style={{
            width: "100%",
            justifyContent: "center",
          }}>
          <SegmentedControl
            value={currentColorTab}
            onChange={(e) => setCurrentColorTab(e as COLOR_TYPE)}
            data={[
              { label: "My Palette", value: COLOR_TYPE.OWN },
              { label: "Paints", value: COLOR_TYPE.COMMERCIAL },
            ]}
          />
        </Flex>
        {!selectedMaterialSlug && (
          <>
            <Space h={16} />
            <Text size="sm" color="pink">
              Note: No part is selected
            </Text>
          </>
        )}
        <Space h={16} />
        <Text size="sm">Add to Palette</Text>
        <Flex gap={16}>
          <ColorInput value={colorToAdd} onChange={(e) => setColorToAdd(e)} />
          <Button
            variant="transparent"
            style={{ padding: 8 }}
            onClick={() => {
              setPalette((prev) => {
                if (!prev.includes(colorToAdd)) {
                  return [...prev, colorToAdd];
                }
                return prev;
              });
            }}>
            <IconPlus />
          </Button>
        </Flex>
        <Space h={16} />
        <Checkbox
          label="Clear Part"
          checked={isClear}
          onChange={(e) => setIsClear(e.currentTarget.checked)}
        />
        <Space h={16} />
        <Text size="sm"> Palette</Text>

        <Flex gap={8}>
          {palette.map((color) => {
            return (
              <UnstyledButton
                key={color}
                variant="transparent"
                style={{ border: "red", borderWidth: 2 }}
                onClick={() => {
                  console.log("Changing material color...");
                  console.log(
                    selectedMaterialSlug,
                    color,
                    isClear ? "clear" : "opaque"
                  );
                  if (currentMaterial) {
                    console.log(currentMaterial.getAlphaCutoff());
                    if (isClear) {
                      currentMaterial.setAlphaMode("BLEND");
                      currentMaterial.setAlphaCutoff(0.9);
                    } else {
                      currentMaterial.setAlphaMode("OPAQUE");
                      currentMaterial.setAlphaCutoff(0);
                    }

                    const alpha = isClear ? clearPartsAlpha : 1;

                    const baseColorFactor: any = hexToRgba(color, alpha);

                    currentMaterial.pbrMetallicRoughness.setBaseColorFactor(
                      baseColorFactor
                    );
                  }
                }}>
                <ColorSwatch color={color} withShadow={true}></ColorSwatch>
              </UnstyledButton>
            );
          })}
        </Flex>
      </Box>
    </>
  );
}
