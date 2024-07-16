"use client";

import "@mantine/core/styles.css";
import React from "react";
import { CustomizePageProvider } from "./components/CustomizePageProvider";

export default function CustomizePageLayout({ children }: { children: any }) {
  return <CustomizePageProvider>{children}</CustomizePageProvider>;
}
