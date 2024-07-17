import {
  Accordion,
  Box,
  Button,
  Checkbox,
  CheckIcon,
  ColorInput,
  ColorPicker,
  ColorSwatch,
  Flex,
  Menu,
  rem,
  ScrollArea,
  SegmentedControl,
  Space,
  Text,
  UnstyledButton,
} from "@mantine/core";
import { parts } from "../../parts";
import useCustomizePageContext from "../../hooks/useCustomizePageContext";
import { IconPlus } from "@tabler/icons-react";
import { ALPHA_MODE, COLOR_TYPE } from "../../../../types";
import { hexToRgba, invertColor } from "../../helpers";
import { commercialPaints } from "../../paints";
import { Tooltip } from "react-tooltip";

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
    materialsMap,
    setMaterialsMap,
    paint,
    setPaint,
    selectedBrand,
    setSelectedBrand,
  } = useCustomizePageContext();

  const currentMaterial = materials[selectedMaterialSlug || ""];
  const currentMaterialData = materialsMap[selectedMaterialSlug || ""];
  const handleSelectedBrand = (e: string) => {
    setSelectedBrand(e);
    setPaint(commercialPaints[e].paints);
  };

  return (
    <>
      <Flex style={{ width: 240, backgroundColor: "#f0f0f0" }} ref={sidebarRef}>
        <ScrollArea h={sidebarHeight} w={260} type="never" scrollbarSize={2}>
          <Accordion
            // variant="filled"
            defaultValue="Head"
            style={{ width: "100%" }}
          >
            {parts.map((part) => {
              return (
                <Accordion.Item value={part.slug} key={part.slug}>
                  <Accordion.Control>{part.label}</Accordion.Control>
                  <Accordion.Panel>
                    {part.materials.map((material) => {
                      const [slug, label] = material;
                      return (
                        <Button
                          variant="subtle"
                          color={
                            selectedMaterialSlug === slug ? "blue" : "gray"
                          }
                          key={slug}
                          style={{ width: "100%" }}
                          onClick={() => {
                            console.log(slug);
                            setSelectedMaterialSlug(slug);
                          }}
                        >
                          {label}
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
        }}
      >
        <Flex
          style={{
            width: "100%",
            justifyContent: "center",
          }}
        >
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
        {currentColorTab === "OWN" && (
          <>
            <Text size="sm">Add to Palette</Text>
            <Flex gap={16}>
              <ColorInput
                value={colorToAdd}
                onChange={(e) => setColorToAdd(e)}
              />
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
                }}
              >
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

            <Flex gap={8} wrap="wrap">
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

                        // Update Materials Map (material data)
                        setMaterialsMap((prev) => {
                          prev[currentMaterial.name].color = color;
                          // TODO: Remove alphaMode (will rely on isClear)
                          prev[currentMaterial.name].alphaMode = isClear
                            ? ALPHA_MODE.BLEND
                            : ALPHA_MODE.OPAQUE;

                          prev[currentMaterial.name].isClear = isClear;
                          return { ...prev };
                        });
                      }
                    }}
                  >
                    <ColorSwatch color={color} withShadow={true}>
                      {color === currentMaterialData?.color && (
                        <CheckIcon
                          color={invertColor(color)}
                          style={{ width: rem(12), height: rem(12) }}
                        />
                      )}
                    </ColorSwatch>
                  </UnstyledButton>
                );
              })}
            </Flex>
          </>
        )}

        {currentColorTab === "COMMERCIAL" && (
          <>
            <Text size="sm">Select a brand</Text>
            <Menu shadow="md">
              <Menu.Target>
                <Button style={{ width: "100%" }}>
                  {commercialPaints[selectedBrand]?.name || "Select a brand"}
                </Button>
              </Menu.Target>
              <Menu.Dropdown mah="60vh" style={{ overflow: "auto" }}>
                {Object.values(commercialPaints).map((paints: any) => (
                  <Menu.Item
                    key={paints.value}
                    style={{ padding: "2px, 4px" }}
                    onClick={() => handleSelectedBrand(paints.value)}
                  >
                    <Text size="sm">{paints.name}</Text>
                  </Menu.Item>
                ))}
              </Menu.Dropdown>
            </Menu>
            <Space h={16} />
            <Checkbox
              label="Clear Part"
              checked={isClear}
              onChange={(e) => setIsClear(e.currentTarget.checked)}
            />
            <Space h={16} />
            <Text size="sm"> Paints</Text>
            <Flex gap={8} wrap="wrap">
              {paint.map((paint) => {
                return (
                  <UnstyledButton
                    data-tooltip-id={paint.name}
                    key={paint.name}
                    variant="transparent"
                    style={{ border: "red", borderWidth: 2 }}
                    onClick={() => {
                      console.log("Changing material color...");
                      console.log(
                        selectedMaterialSlug,
                        paint.hex,
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

                        const baseColorFactor: any = hexToRgba(
                          paint.hex,
                          alpha
                        );

                        currentMaterial.pbrMetallicRoughness.setBaseColorFactor(
                          baseColorFactor
                        );

                        // Update Materials Map (material data)
                        setMaterialsMap((prev) => {
                          prev[currentMaterial.name].color = paint.hex;
                          // TODO: Remove alphaMode (will rely on isClear)
                          prev[currentMaterial.name].alphaMode = isClear
                            ? ALPHA_MODE.BLEND
                            : ALPHA_MODE.OPAQUE;

                          prev[currentMaterial.name].isClear = isClear;
                          return { ...prev };
                        });
                      }
                    }}
                  >
                    <ColorSwatch color={paint.hex} withShadow={true}>
                      {paint.hex === currentMaterialData?.color && (
                        <CheckIcon
                          color={invertColor(paint.hex)}
                          style={{ width: rem(12), height: rem(12) }}
                        />
                      )}
                    </ColorSwatch>
                    <Tooltip
                      place="top"
                      id={paint.name}
                      delayShow={600}
                      variant="info"
                      style={{ padding: 6 }}
                    >
                      {paint.name}
                    </Tooltip>
                  </UnstyledButton>
                );
              })}
            </Flex>
          </>
        )}
        <Space h={16} />
      </Box>
    </>
  );
}
