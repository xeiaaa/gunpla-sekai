import { useContext } from "react";
import { CustomizePageProviderContext } from "../components/CustomizePageProvider";

export default function useCustomizePageContext() {
  const context = useContext(CustomizePageProviderContext);
  if (!context) {
    throw new Error(
      "useCustomizePageContext must be used within a CustomizePageContext"
    );
  }
  return context;
}
