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
  Group,
  Menu,
  Radio,
  rem,
  ScrollArea,
  SegmentedControl,
  Space,
  Text,
  UnstyledButton,
  Tooltip,
} from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { parts } from "../../parts";
import useCustomizePageContext from "../../hooks/useCustomizePageContext";
import { IconPlus } from "@tabler/icons-react";
import { ALPHA_MODE, PAINT_TYPE, FINISH_TYPE } from "../../../../types";
import { getRandomColor, hexToRgba, invertColor } from "../../helpers";
import { commercialPaints } from "../../paints";
import { absoluteFill } from "../../helpers/style";
import { relative } from "path";
import classes from "./Sidebar.module.css";

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
    selectedFinish,
    setSelectedFinish,
    currentMaterial,
    currentMaterialData,
    applyFinishToMaterial,
    selectedPaint,
    setSelectedPaint,
    reset,
  } = useCustomizePageContext();

  const handleSelectedBrand = (e: string) => {
    setSelectedBrand(e);
    setPaint(commercialPaints[e].paints);
  };
  console.log({ selectedPaint });
  return (
    <>
      <Flex
        style={{
          width: 180,
          backgroundColor: "#f0f0f0",
          padding: 8,
        }}
        ref={sidebarRef}>
        <ScrollArea h={sidebarHeight} w={260} type="never" scrollbarSize={2}>
          <Accordion
            // variant="filled"
            defaultValue="head"
            style={{ width: "100%" }}>
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
                          }}>
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
      <Flex
        direction="column"
        style={{
          minWidth: 296,
          maxWidth: 296,
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
            onChange={(e) => setCurrentColorTab(e as PAINT_TYPE)}
            data={[
              { label: "My Palette", value: PAINT_TYPE.OWN },
              { label: "Paints", value: PAINT_TYPE.COMMERCIAL },
            ]}
          />
        </Flex>
        {/* {!selectedMaterialSlug && (
          <>
            <Space h={16} />
            <Text size="sm" color="pink">
              Note: No part is selected
            </Text>
          </>
        )} */}
        <Space h={16} />
        {currentColorTab === "OWN" && (
          <>
            <Text size="sm">Type</Text>
            <SegmentedControl
              value={isClear.toString()}
              onChange={(e) => {
                const _isClear = JSON.parse(e);
                setIsClear(_isClear);

                if (currentMaterial) {
                  if (_isClear) {
                    currentMaterial.setAlphaMode("BLEND");
                    currentMaterial.setAlphaCutoff(0.9);
                  } else {
                    currentMaterial.setAlphaMode("OPAQUE");
                    currentMaterial.setAlphaCutoff(0);
                  }

                  const alpha = _isClear ? clearPartsAlpha : 1;

                  const baseColorFactor =
                    currentMaterial.pbrMetallicRoughness.baseColorFactor;
                  baseColorFactor[3] = alpha;
                  currentMaterial.pbrMetallicRoughness.setBaseColorFactor(
                    baseColorFactor
                  );

                  // Update Materials Map (material data)
                  setMaterialsMap((prev) => {
                    prev[currentMaterial.name].alphaMode = _isClear
                      ? ALPHA_MODE.BLEND
                      : ALPHA_MODE.OPAQUE;

                    prev[currentMaterial.name].isClear = _isClear;
                    return { ...prev };
                  });
                } else {
                  notifications.show({
                    title: "Error!",
                    message: "Please select a part to edit",
                    color: "red",
                  });
                }
              }}
              data={[
                {
                  value: "false",
                  label: "Solid",
                },
                {
                  value: "true",
                  label: "Clear",
                },
              ]}
            />
            <Space h={16} />

            <Text size="sm"> Finish</Text>
            <SegmentedControl
              value={selectedFinish}
              onChange={(e) => {
                setSelectedFinish(e as FINISH_TYPE);

                if (currentMaterial) {
                  applyFinishToMaterial(currentMaterial, e as FINISH_TYPE);

                  setMaterialsMap((prev) => {
                    prev[currentMaterial.name].paint = {
                      ...prev[currentMaterial.name].paint,
                      finish: e as FINISH_TYPE,
                    };
                    return { ...prev };
                  });
                }
              }}
              data={[
                {
                  value: FINISH_TYPE.MATTE,
                  label: (
                    <Tooltip label="Flat / Matte">
                      <span>F</span>
                    </Tooltip>
                  ),
                },
                {
                  value: FINISH_TYPE.GLOSS,
                  label: (
                    <Tooltip label="Gloss">
                      <span>G</span>
                    </Tooltip>
                  ),
                },
                {
                  value: FINISH_TYPE.SEMIGLOSS,
                  label: (
                    <Tooltip label="SemiGloss">
                      <span>SG</span>
                    </Tooltip>
                  ),
                },
                {
                  value: FINISH_TYPE.METALLIC,
                  label: (
                    <Tooltip label="Metallic">
                      <span>M</span>
                    </Tooltip>
                  ),
                },
                {
                  value: FINISH_TYPE.CANDY,
                  label: (
                    <Tooltip label="Candy">
                      <span>C</span>
                    </Tooltip>
                  ),
                },
                {
                  value: FINISH_TYPE.PEARL,
                  label: (
                    <Tooltip label="Pearl">
                      <span>P</span>
                    </Tooltip>
                  ),
                },
                {
                  value: FINISH_TYPE.DEFAULT,
                  label: (
                    <Tooltip label="Default">
                      <span>X</span>
                    </Tooltip>
                  ),
                },
              ]}
            />
            <Space h={16} />

            <Text size="sm">Add Color to Palette</Text>
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
                }}>
                <IconPlus />
              </Button>
            </Flex>
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

                        if (currentMaterialData) {
                          setSelectedPaint({
                            ...currentMaterialData.paint,
                            name: color,
                            color,
                            type: PAINT_TYPE.OWN,
                          });
                        }
                      } else {
                        notifications.show({
                          title: "Error!",
                          message: "Please select a part to edit",
                          color: "red",
                        });
                      }
                    }}>
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
                    onClick={() => handleSelectedBrand(paints.value)}>
                    <Text size="sm">{paints.name}</Text>
                  </Menu.Item>
                ))}
              </Menu.Dropdown>
            </Menu>

            <Space h={16} />
            <Text size="sm"> Paints</Text>
            {selectedBrand ? (
              <Flex flex={1} style={{ position: "relative" }}>
                <Flex
                  gap={8}
                  wrap="wrap"
                  align="flex-start"
                  className={classes.noScrollbar}
                  style={{
                    ...absoluteFill,
                    overflow: "scroll",
                  }}>
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
                            paint.color,
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
                              paint.color,
                              alpha
                            );

                            currentMaterial.pbrMetallicRoughness.setBaseColorFactor(
                              baseColorFactor
                            );

                            applyFinishToMaterial(
                              currentMaterial,
                              paint.finish
                            );

                            (window as any).currentMaterial = currentMaterial;

                            // Update Materials Map (material data)
                            setMaterialsMap((prev) => {
                              prev[currentMaterial.name].color = paint.color;
                              // TODO: Remove alphaMode (will rely on isClear)
                              prev[currentMaterial.name].alphaMode = isClear
                                ? ALPHA_MODE.BLEND
                                : ALPHA_MODE.OPAQUE;

                              prev[currentMaterial.name].isClear = isClear;
                              return { ...prev };
                            });

                            setSelectedPaint(paint);
                          }
                        }}>
                        <Tooltip label={`${paint.code} ${paint.name}`.trim()}>
                          <ColorSwatch color={paint.color} withShadow={true}>
                            {paint.color === selectedPaint?.color &&
                              selectedPaint.type === PAINT_TYPE.COMMERCIAL &&
                              paint.code === selectedPaint.code && (
                                <CheckIcon
                                  color={invertColor(paint.color)}
                                  style={{ width: rem(12), height: rem(12) }}
                                />
                              )}
                          </ColorSwatch>
                        </Tooltip>
                      </UnstyledButton>
                    );
                  })}
                </Flex>
              </Flex>
            ) : (
              <Text size="sm" color="pink">
                Note: Please select a brand of paint above
              </Text>
            )}
          </>
        )}
        <Space h={16} />

        <Flex
          style={{
            marginTop: "auto",
            gap: 8,
            flexDirection: "column",
          }}>
          <Text size="sm">Fun</Text>
          <Flex
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              rowGap: 0,
              columnGap: 16,
            }}>
            <Button
              variant="transparent"
              size="xs"
              style={{ padding: 0 }}
              onClick={() => {
                Object.values(materials).forEach((material) => {
                  material.pbrMetallicRoughness.setBaseColorFactor([
                    Math.random(),
                    Math.random(),
                    Math.random(),
                    material.pbrMetallicRoughness.baseColorFactor[3],
                  ]);
                });
              }}>
              Randomize Color
            </Button>
            <Button
              variant="transparent"
              size="xs"
              style={{ padding: 0 }}
              onClick={() => {
                Object.values(materials).forEach((material) => {
                  material.setAlphaMode(ALPHA_MODE.OPAQUE);
                  applyFinishToMaterial(material, FINISH_TYPE.MATTE);
                });
              }}>
              Matte
            </Button>
            <Button
              variant="transparent"
              size="xs"
              style={{ padding: 0 }}
              onClick={() => {
                Object.values(materials).forEach((material) => {
                  material.setAlphaMode(ALPHA_MODE.OPAQUE);
                  applyFinishToMaterial(material, FINISH_TYPE.GLOSS);
                });
              }}>
              Gloss
            </Button>
            <Button
              variant="transparent"
              size="xs"
              style={{ padding: 0 }}
              onClick={() => {
                Object.values(materials).forEach((material) => {
                  material.setAlphaMode(ALPHA_MODE.OPAQUE);
                  applyFinishToMaterial(material, FINISH_TYPE.SEMIGLOSS);
                });
              }}>
              Semi Gloss
            </Button>
            <Button
              variant="transparent"
              size="xs"
              style={{ padding: 0 }}
              onClick={() => {
                Object.values(materials).forEach((material) => {
                  material.setAlphaMode(ALPHA_MODE.OPAQUE);
                  applyFinishToMaterial(material, FINISH_TYPE.METALLIC);
                });
              }}>
              Metallic
            </Button>
            <Button
              variant="transparent"
              size="xs"
              style={{ padding: 0 }}
              onClick={() => {
                Object.values(materials).forEach((material) => {
                  material.setAlphaMode(ALPHA_MODE.OPAQUE);
                  applyFinishToMaterial(material, FINISH_TYPE.CANDY);
                });
              }}>
              Candy
            </Button>
            <Button
              variant="transparent"
              size="xs"
              style={{ padding: 0 }}
              onClick={() => {
                Object.values(materials).forEach((material) => {
                  material.setAlphaMode(ALPHA_MODE.OPAQUE);
                  applyFinishToMaterial(material, FINISH_TYPE.PEARL);
                });
              }}>
              Pearl
            </Button>
            <Button
              variant="transparent"
              size="xs"
              style={{ padding: 0 }}
              onClick={() => {
                Object.values(materials).forEach((material) => {
                  // material
                  if (material.name.includes("armor")) {
                    material.setAlphaMode(ALPHA_MODE.BLEND);
                    material.setAlphaCutoff(0.9);
                    material.pbrMetallicRoughness.setBaseColorFactor([
                      material.pbrMetallicRoughness.baseColorFactor[0],
                      material.pbrMetallicRoughness.baseColorFactor[1],
                      material.pbrMetallicRoughness.baseColorFactor[2],
                      clearPartsAlpha,
                    ]);
                  }
                });
              }}>
              Clear Outer Armors
            </Button>
            <Button
              variant="transparent"
              size="xs"
              style={{ padding: 0 }}
              onClick={() => {
                Object.values(materials).forEach((material) => {
                  // material
                  material.setAlphaMode(ALPHA_MODE.BLEND);
                  material.setAlphaCutoff(0.9);
                  material.pbrMetallicRoughness.setBaseColorFactor([
                    material.pbrMetallicRoughness.baseColorFactor[0],
                    material.pbrMetallicRoughness.baseColorFactor[1],
                    material.pbrMetallicRoughness.baseColorFactor[2],
                    clearPartsAlpha,
                  ]);
                });
              }}>
              Everything Clear
            </Button>

            <Button
              variant="transparent"
              size="xs"
              color="pink"
              style={{ padding: 0 }}
              onClick={() => {
                reset();
              }}>
              <strong>Reset</strong>
            </Button>
          </Flex>
        </Flex>
      </Flex>
    </>
  );
}
