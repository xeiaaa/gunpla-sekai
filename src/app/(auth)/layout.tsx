import { Flex } from "@mantine/core";
import React from "react";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Flex align="center" justify="center" flex={1}>
      {children}
    </Flex>
  );
};

export default AuthLayout;
