import { Button, Flex, Text } from "@mantine/core";
import { ALPHA_MODE, FINISH_TYPE } from "../../../../types";
import useCustomizePageContext from "../../hooks/useCustomizePageContext";
import classes from "./Sidebar.module.css";

export default function Fun() {
  const { reset, materials, applyFinishToMaterial, clearPartsAlpha } =
    useCustomizePageContext();
  return (
    <Flex
      style={{
        marginTop: "auto",
        gap: 8,
        flexDirection: "column",
      }}
      className={classes.demo}
    >
      <Text size="sm">Fun</Text>
      <Flex
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
          rowGap: 0,
          columnGap: 16,
        }}
      >
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
          }}
        >
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
          }}
        >
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
          }}
        >
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
          }}
        >
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
          }}
        >
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
          }}
        >
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
          }}
        >
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
          }}
        >
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
          }}
        >
          Everything Clear
        </Button>

        <Button
          variant="transparent"
          size="xs"
          color="pink"
          style={{ padding: 0 }}
          onClick={() => {
            reset();
          }}
        >
          <strong>Reset</strong>
        </Button>
      </Flex>
    </Flex>
  );
}
