import { ModelViewerElement } from "@google/model-viewer";
import { useDisclosure, useElementSize } from "@mantine/hooks";
import React, {
  createContext,
  ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  ALPHA_MODE,
  PAINT_TYPE,
  FINISH_TYPE,
  MaterialData,
  Paint,
} from "../../../types";
import { Material } from "@google/model-viewer/lib/features/scene-graph/material";
import { hexToRgba } from "../helpers";
import { sazabiMaterialsMap } from "../parts";

export interface ICustomizePageProviderContext {
  modelViewerRef: any;
  materials: Record<string, Material>;
  selectedMaterialSlug: string | null;
  setSelectedMaterialSlug: React.Dispatch<React.SetStateAction<string | null>>;
  bgColor: string;
  setBgColor: React.Dispatch<React.SetStateAction<string>>;
  clearPartsAlpha: number;
  setClearPartsAlpha: React.Dispatch<React.SetStateAction<number>>;
  colorToAdd: string;
  setColorToAdd: React.Dispatch<React.SetStateAction<string>>;
  palette: string[];
  setPalette: React.Dispatch<React.SetStateAction<string[]>>;
  controlsDrawerOpened: boolean;
  openControlsDrawer: () => void;
  closeControlsDrawer: () => void;
  settingsDrawerOpened: boolean;
  openSettingsDrawer: () => void;
  closeSettingsDrawer: () => void;
  sidebarRef: any;
  sidebarHeight: number;
  currentColorTab: PAINT_TYPE;
  setCurrentColorTab: React.Dispatch<React.SetStateAction<PAINT_TYPE>>;
  isClear: boolean;
  setIsClear: React.Dispatch<React.SetStateAction<boolean>>;
  materialsMap: Record<string, MaterialData>;
  setMaterialsMap: React.Dispatch<
    React.SetStateAction<Record<string, MaterialData>>
  >;
  paint: Paint[];
  setPaint: React.Dispatch<React.SetStateAction<Paint[]>>;
  selectedBrand: string;
  setSelectedBrand: React.Dispatch<React.SetStateAction<string>>;
  selectedFinish: FINISH_TYPE;
  setSelectedFinish: React.Dispatch<React.SetStateAction<FINISH_TYPE>>;

  currentMaterial: Material | undefined;
  currentMaterialData: MaterialData | undefined;

  applyFinishToMaterial: (material: Material, finish: FINISH_TYPE) => void;

  selectedPaint: Paint | null;
  setSelectedPaint: React.Dispatch<React.SetStateAction<Paint | null>>;
  isLoadingModel: boolean;
}

export const CustomizePageProviderContext =
  createContext<ICustomizePageProviderContext>(null!);

interface CustomizePageProviderProps {
  children: ReactNode;
}

export function CustomizePageProvider({
  children,
}: CustomizePageProviderProps) {
  const modelViewerRef = useRef<ModelViewerElement>(null);
  const [isLoadingModel, setIsLoadingModel] = useState(true);
  const [materials, setMaterials] = useState<Record<string, Material>>({});
  const [materialsMap, setMaterialsMap] = useState<
    Record<string, MaterialData>
  >({});
  const [selectedMaterialSlug, setSelectedMaterialSlug] = useState<
    string | null
  >("head.armor.1");
  const [bgColor, setBgColor] = useState<string>("#ffffff");
  const [clearPartsAlpha, setClearPartsAlpha] = useState<number>(0.2);
  const [colorToAdd, setColorToAdd] = useState<string>("#ffffff");
  const [selectedPaint, setSelectedPaint] = useState<Paint | null>(null);
  const [palette, setPalette] = useState<string[]>(["#ffffff", "#000000"]);
  const [isClear, setIsClear] = useState<boolean>(false);
  const [selectedFinish, setSelectedFinish] = useState<FINISH_TYPE>(
    FINISH_TYPE.DEFAULT
  );

  const [selectedBrand, setSelectedBrand] = useState<string>("");
  const [paint, setPaint] = useState<Paint[]>([]);

  const [
    controlsDrawerOpened,
    { open: openControlsDrawer, close: closeControlsDrawer },
  ] = useDisclosure(false);
  const [
    settingsDrawerOpened,
    { open: openSettingsDrawer, close: closeSettingsDrawer },
  ] = useDisclosure(false);

  const { ref: sidebarRef, height: sidebarHeight } = useElementSize();

  const [currentColorTab, setCurrentColorTab] = useState<PAINT_TYPE>(
    PAINT_TYPE.OWN
  );

  const applyFinishToMaterial = useCallback(
    (material: Material, finish: FINISH_TYPE) => {
      switch (finish) {
        case FINISH_TYPE.MATTE:
          material.pbrMetallicRoughness.setMetallicFactor(0);
          material.pbrMetallicRoughness.setRoughnessFactor(1);
          break;
        case FINISH_TYPE.CANDY:
          material.pbrMetallicRoughness.setMetallicFactor(0.9);
          material.pbrMetallicRoughness.setRoughnessFactor(0.1);
          break;
        case FINISH_TYPE.PEARL:
          material.pbrMetallicRoughness.setMetallicFactor(0.3);
          material.pbrMetallicRoughness.setRoughnessFactor(0.3);
          break;
        case FINISH_TYPE.GLOSS:
          material.pbrMetallicRoughness.setMetallicFactor(0);
          material.pbrMetallicRoughness.setRoughnessFactor(0.2);
          break;
        case FINISH_TYPE.SEMIGLOSS:
          material.pbrMetallicRoughness.setMetallicFactor(0);
          material.pbrMetallicRoughness.setRoughnessFactor(0.5);
          break;
        case FINISH_TYPE.METALLIC:
          material.pbrMetallicRoughness.setMetallicFactor(1);
          material.pbrMetallicRoughness.setRoughnessFactor(0.3);
          break;
        default:
          break;
      }
    },
    []
  );

  useEffect(() => {
    const handleLoad = () => {
      const { current: modelViewer } = modelViewerRef;
      if (!modelViewer) return;

      if (modelViewer.model) {
        // Materials -> use this to update properties directly
        const _materials = modelViewer.model.materials.reduce(
          (acc: { [key: string]: Material }, material) => {
            acc[material.name] = material;
            return acc;
          },
          {}
        );
        console.log("******", _materials);
        setMaterials(_materials);

        // This will come from the database later...
        const initialMaterialsMap = { ...sazabiMaterialsMap };

        const paletteSet = new Set();
        paletteSet.add("#ffffff");
        paletteSet.add("#000000");

        // Apply the initial material properties
        Object.values(_materials).forEach((material) => {
          // Color
          material.pbrMetallicRoughness.setBaseColorFactor(
            hexToRgba(initialMaterialsMap[material.name].paint.color as string)
          );

          paletteSet.add(initialMaterialsMap[material.name].paint.color);

          // Alpha Mode
          material.setAlphaMode(
            initialMaterialsMap[material.name].alphaMode || ALPHA_MODE.OPAQUE
          );

          // TODO: Apply Finish
          const materialData = initialMaterialsMap[material.name];

          if (materialData) {
            applyFinishToMaterial(material, materialData.paint.finish);
          }
        });

        setPalette([...(paletteSet as any)]);
        setMaterialsMap(initialMaterialsMap);
        console.log("FINISHED LOADING...");
        setIsLoadingModel(false);
      }
    };

    modelViewerRef?.current?.addEventListener("load", handleLoad);

    return () => {
      modelViewerRef?.current?.removeEventListener("load", handleLoad);
    };
  }, [applyFinishToMaterial]);

  const currentMaterial: Material | undefined =
    materials[selectedMaterialSlug || ""];
  const currentMaterialData: MaterialData | undefined =
    materialsMap[selectedMaterialSlug || ""];

  // Update Palette settings when currentMaterialData changes
  useEffect(() => {
    if (currentMaterialData) {
      setIsClear(currentMaterialData.isClear);
    }
  }, [currentMaterialData]);

  return (
    <CustomizePageProviderContext.Provider
      value={{
        modelViewerRef,
        materials,
        selectedMaterialSlug,
        setSelectedMaterialSlug,
        bgColor,
        setBgColor,
        clearPartsAlpha,
        setClearPartsAlpha,
        colorToAdd,
        setColorToAdd,
        palette,
        setPalette,
        controlsDrawerOpened,
        openControlsDrawer,
        closeControlsDrawer,
        settingsDrawerOpened,
        openSettingsDrawer,
        closeSettingsDrawer,
        sidebarRef,
        sidebarHeight,
        currentColorTab,
        setCurrentColorTab,
        isClear,
        setIsClear,
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

        isLoadingModel,
      }}>
      {children}
    </CustomizePageProviderContext.Provider>
  );
}
