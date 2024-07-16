import { ModelViewerElement } from "@google/model-viewer";
import { useDisclosure, useElementSize } from "@mantine/hooks";
import React, {
  createContext,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";
import { COLOR_TYPE } from "../../../types";
import { Material } from "@google/model-viewer/lib/features/scene-graph/material";

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
    // TODO: remove later
    (window as any).modelViewer = modelViewerRef;

    const handleLoad = () => {
      const { current: modelViewer } = modelViewerRef;
      if (!modelViewer) return;
      (window as any).modelViewer = modelViewer;
      if (modelViewer.model) {
        setMaterials(
          modelViewer.model.materials.reduce(
            (acc: { [key: string]: Material }, material) => {
              acc[material.name] = material;
              return acc;
            },
            {}
          )
        );
      }
    };

    modelViewerRef?.current?.addEventListener("load", handleLoad);

    return () => {
      modelViewerRef?.current?.removeEventListener("load", handleLoad);
    };
  }, []);

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
      }}>
      {children}
    </CustomizePageProviderContext.Provider>
  );
}
