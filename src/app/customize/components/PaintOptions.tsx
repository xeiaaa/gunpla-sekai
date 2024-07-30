import {
  Box,
  Button,
  CheckIcon,
  ColorInput,
  ColorSwatch,
  Flex,
  Menu,
  rem,
  SegmentedControl,
  Space,
  Text,
  Tooltip,
  UnstyledButton,
} from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import { ALPHA_MODE, FINISH_TYPE, PAINT_TYPE } from "../../../types";
import classes from "../components/Sidebar/Sidebar.module.css";
import useCustomizePageContext from "../hooks/useCustomizePageContext";
import Fun from "./Sidebar/Fun";
import { notifications } from "@mantine/notifications";
import { hexToRgba, invertColor } from "../helpers";
import { commercialPaints } from "../paints";
import { absoluteFill } from "../helpers/style";

export default function PaintOptions() {
  const {
    selectedMaterialSlug,
    colorToAdd,
    setColorToAdd,
    palette,
    setPalette,
    currentColorTab,
    setCurrentColorTab,
    isClear,
    setIsClear,
    clearPartsAlpha,
    setMaterialsMap,
    paint,
    selectedBrand,
    selectedFinish,
    setSelectedFinish,
    currentMaterial,
    currentMaterialData,
    applyFinishToMaterial,
    selectedPaint,
    setSelectedPaint,
    setSelectedBrand,
    setPaint,
  } = useCustomizePageContext();

  const handleSelectedBrand = (e: string) => {
    setSelectedBrand(e);
    setPaint(commercialPaints[e].paints);
  };

  return (
    <Box
      style={{
        position: "relative",
      }}
    >
      <Box>
        <Flex
          style={{
            width: "100%",
            justifyContent: "center",
          }}
        >
          <SegmentedControl
            value={currentColorTab}
            onChange={(e) => setCurrentColorTab(e as PAINT_TYPE)}
            data={[
              { label: "My Palette", value: PAINT_TYPE.OWN },
              { label: "Paints", value: PAINT_TYPE.COMMERCIAL },
            ]}
          />
        </Flex>

        {/* <Space h={8} /> */}
      </Box>
      <Box flex={1}>
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
            <Space h={8} />

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
            <Space h={8} />

            <Text size="sm">Add Color to Palette</Text>
            <Flex gap={8}>
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
            <Space h={8} />
            <Text size="sm"> Palette</Text>

            <Flex gap={8} wrap="wrap">
              {palette.map((color) => {
                return (
                  <UnstyledButton
                    key={color}
                    variant="transparent"
                    style={{ border: "red", borderWidth: 2 }}
                    onClick={() => {
                      if (currentMaterial) {
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

                        setMaterialsMap((prev) => {
                          prev[currentMaterial.name].color = color;
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
            <Space h={8} />
            <Text size="sm" mb={4}>
              {" "}
              Paints
            </Text>
            {selectedBrand ? (
              <Flex style={{ position: "relative" }} mah={300}>
                <Flex
                  gap={8}
                  wrap="wrap"
                  align="flex-start"
                  className={classes.noScrollbar}
                  style={
                    {
                      // ...absoluteFill,
                      // overflow: "scroll",
                      // maxHeight: 200,
                    }
                  }
                  p={4}
                  // h="100%"
                >
                  {paint.map((paint) => {
                    return (
                      <UnstyledButton
                        data-tooltip-id={paint.name}
                        key={paint.name}
                        variant="transparent"
                        style={{ border: "red", borderWidth: 2 }}
                        onClick={() => {
                          if (currentMaterial) {
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

                            setMaterialsMap((prev) => {
                              prev[currentMaterial.name].color = paint.color;
                              prev[currentMaterial.name].alphaMode = isClear
                                ? ALPHA_MODE.BLEND
                                : ALPHA_MODE.OPAQUE;

                              prev[currentMaterial.name].isClear = isClear;
                              return { ...prev };
                            });

                            setSelectedPaint(paint);
                          }
                        }}
                      >
                        <Tooltip label={`${paint.code} ${paint.name}`.trim()}>
                          <ColorSwatch color={paint.color} withShadow={true}>
                            {paint.color === selectedPaint?.color &&
                              selectedPaint.type === PAINT_TYPE.COMMERCIAL &&
                              paint.code === selectedPaint.code && (
                                <CheckIcon
                                  color={invertColor(paint.color)}
                                  style={{
                                    width: rem(12),
                                    height: rem(12),
                                  }}
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
              <Text size="sm" c="pink">
                Note: Please select a brand of paint above
              </Text>
            )}
          </>
        )}
      </Box>

      <Space h={8} />
    </Box>
  );
}
