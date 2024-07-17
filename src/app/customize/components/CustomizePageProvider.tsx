import { ModelViewerElement } from "@google/model-viewer";
import { useDisclosure, useElementSize } from "@mantine/hooks";
import React, {
  createContext,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";
import { ALPHA_MODE, COLOR_TYPE, MaterialData } from "../../../types";
import { Material } from "@google/model-viewer/lib/features/scene-graph/material";
import { hexToRgba, rgbaToHex } from "../helpers";
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
  currentColorTab: COLOR_TYPE;
  setCurrentColorTab: React.Dispatch<React.SetStateAction<COLOR_TYPE>>;
  isClear: boolean;
  setIsClear: React.Dispatch<React.SetStateAction<boolean>>;
  materialsMap: Record<string, MaterialData>;
  setMaterialsMap: React.Dispatch<
    React.SetStateAction<Record<string, MaterialData>>
  >;
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
  const [materials, setMaterials] = useState<Record<string, Material>>({});
  const [materialsMap, setMaterialsMap] = useState<
    Record<string, MaterialData>
  >({});
  const [selectedMaterialSlug, setSelectedMaterialSlug] = useState<
    string | null
  >(null);
  const [bgColor, setBgColor] = useState<string>("#ffffff");
  const [clearPartsAlpha, setClearPartsAlpha] = useState<number>(0.2);
  const [colorToAdd, setColorToAdd] = useState<string>("#ffffff");
  const [palette, setPalette] = useState<string[]>(["#ffffff", "#000000"]);
  const [isClear, setIsClear] = useState<boolean>(false);

  const [
    controlsDrawerOpened,
    { open: openControlsDrawer, close: closeControlsDrawer },
  ] = useDisclosure(false);
  const [
    settingsDrawerOpened,
    { open: openSettingsDrawer, close: closeSettingsDrawer },
  ] = useDisclosure(false);

  const { ref: sidebarRef, height: sidebarHeight } = useElementSize();

  const [currentColorTab, setCurrentColorTab] = useState<COLOR_TYPE>(
    COLOR_TYPE.OWN
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
            hexToRgba(initialMaterialsMap[material.name].color as string)
          );

          paletteSet.add(initialMaterialsMap[material.name].color);

          // Alpha Mode
          material.setAlphaMode(
            initialMaterialsMap[material.name].alphaMode || ALPHA_MODE.OPAQUE
          );

          // TODO: Clear, Metallic, Roughness
        });

        setPalette([...(paletteSet as any)]);

        // Materials Map -> save data that aren't in the Material Class
        // const materialsMap = modelViewer.model.materials.reduce(
        //   (acc: { [key: string]: MaterialData }, material) => {
        //     acc[material.name] = {
        //       color: rgbaToHex(material.pbrMetallicRoughness.baseColorFactor),
        //       isClear: false,
        //       isMetallic: false,
        //       roughness: 0,
        //       alphaMode: ALPHA_MODE.OPAQUE,
        //     };
        //     return acc;
        //   },
        //   {}
        // );

        setMaterialsMap(initialMaterialsMap);
      }
    };

    modelViewerRef?.current?.addEventListener("load", handleLoad);

    return () => {
      modelViewerRef?.current?.removeEventListener("load", handleLoad);
    };
  }, []);
  console.log({ materials });
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
      }}>
      {children}
    </CustomizePageProviderContext.Provider>
  );
}
