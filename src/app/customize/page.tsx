"use client";

import {
  Box,
  Flex,
  ScrollArea,
  Title,
  Text,
  Group,
  UnstyledButton,
} from "@mantine/core";
import LinksGroup from "../../components/Pages/Customize/CustomizeLinksGroup";
import style from "./customizeStyle.module.css";
import { useEffect, useState } from "react";
import data from "../../data.json";
import colorData from "../../colorData.json";
import ColorGroups from "../../components/Pages/Customize/ColorList";
import * as Icons from "@tabler/icons-react";

interface MockDataProps {
  label: string;
  initiallyOpened?: boolean;
  links: { label: string }[];
}

const mockdata: MockDataProps[] = [
  {
    label: "Part 1",
    initiallyOpened: true,
    links: [
      { label: "Part 1 - 1" },
      { label: "Part 1 - 2" },
      { label: "Part 1 - 3" },
      { label: "Part 1 - 4" },
    ],
  },
  {
    label: "Part 2",
    links: [
      { label: "Part 1 - 1" },
      { label: "Part 1 - 2" },
      { label: "Part 1 - 3" },
      { label: "Part 1 - 4" },
    ],
  },
  {
    label: "Part 3",
    links: [
      { label: "Part 1 - 1" },
      { label: "Part 1 - 2" },
      { label: "Part 1 - 3" },
      { label: "Part 1 - 4" },
    ],
  },
  {
    label: "Part 4",
    links: [
      { label: "Part 1 - 1" },
      { label: "Part 1 - 2" },
      { label: "Part 1 - 3" },
      { label: "Part 1 - 4" },
    ],
  },
  {
    label: "Part 5",
    links: [
      { label: "Part 1 - 1" },
      { label: "Part 1 - 2" },
      { label: "Part 1 - 3" },
      { label: "Part 1 - 4" },
    ],
  },
];

export default function CustomizePage() {
  const [isSecondAreaOpen, setIsSecondAreaOpen] = useState<boolean>(false);
  const showSecond = () => setIsSecondAreaOpen(true);
  const [selectedPart, setSelectedPart] = useState<string>("");
  const [selectedItem, setSelectedItem] = useState<string>("");
  const [selectedBrand, setSelectedBrand] = useState<string>("");
  const [groupShowing, setGroupShowing] = useState<string>("parts");

  const setPart = (e: string) => {
    setSelectedPart(e);
    setGroupShowing("items");
  };
  const setItem = (e: string) => {
    setSelectedItem(e);
    setGroupShowing("brands");
  };
  const setBrand = (e: string) => setSelectedBrand(e);

  // const links = mockdata.map((item) => (
  //   <LinksGroup {...item} key={item.label} setter={showSecond} />
  // ));

  return (
    <Flex w="100%">
      <nav
        className={style.navbar}
        style={{
          maxHeight: window.innerHeight - 92 + "px",
        }}
      >
        <div className={style.header}>
          <Flex justify="center" direction="column" gap={10}>
            <Title>Customize</Title>
            <Flex
              direction="row"
              gap={4}
              align="center"
              style={{ minHeight: "24px" }}
            >
              <Text
                size="md"
                fw={
                  groupShowing === "parts" || !groupShowing ? "bold" : "normal"
                }
                onClick={() => setGroupShowing("parts")}
                style={{ cursor: "pointer" }}
              >
                {selectedPart || "Parts"}
              </Text>

              {(groupShowing === "items" || groupShowing === "brands") && (
                <>
                  <Icons.IconChevronRight
                    style={{ width: "14px", height: "14px", fontWeight: 700 }}
                  />
                  <Text
                    size="md"
                    fw={groupShowing === "items" ? "bold" : "normal"}
                    onClick={() => setGroupShowing("items")}
                    style={{ cursor: "pointer" }}
                  >
                    {selectedItem || "Items"}
                  </Text>
                </>
              )}
              {groupShowing === "brands" && (
                <>
                  <Icons.IconChevronRight
                    style={{ width: "14px", height: "14px", fontWeight: 700 }}
                  />
                  <Text
                    size="md"
                    fw={groupShowing === "brands" ? "bold" : "normal"}
                    onClick={() => setGroupShowing("brands")}
                    style={{ cursor: "pointer" }}
                  >
                    {selectedBrand || "Brands"}
                  </Text>
                </>
              )}
            </Flex>
          </Flex>
        </div>
        {/* 
        {!isSecondAreaOpen ? (
          <ScrollArea className={style.links}>
            <div className={style.linksInner}>{links}</div>
          </ScrollArea>
        ) : (
          <ColorSelection data={colorData} setter={setColor} />
        )} */}

        <ScrollArea className={style.links}>
          <div className={style.linksInner}>
            {groupShowing === "parts" && (
              <PartsSelection
                data={mockdata}
                setter={setPart}
                selected={selectedPart}
              />
            )}
            {groupShowing === "items" && (
              <ItemsSelection
                data={mockdata}
                setter={setItem}
                selectedPart={selectedPart}
                selected={selectedItem}
              />
            )}
            {groupShowing === "brands" && (
              <BrandSelection data={mockdata} setter={setBrand} />
            )}
          </div>
        </ScrollArea>
      </nav>
      <div style={{ flex: "1", padding: "1rem" }}>TEST</div>
    </Flex>
  );
}
function PartsSelection({
  data,
  setter,
  selected,
}: {
  data: MockDataProps[];
  setter: (e: string) => void;
  selected: string;
}) {
  return (
    <Flex gap={8} direction="column">
      {Array.isArray(data) &&
        data.map((part, index) => (
          <div
            style={{ padding: "0.6rem 1rem", cursor: "pointer" }}
            key={part.label + index}
          >
            <Text
              size="md"
              fw={500}
              c={selected === part.label ? "blue" : "black"}
              onClick={() => setter(part.label)}
            >
              {part.label}
            </Text>
          </div>
        ))}
    </Flex>
  );
}

function ItemsSelection({
  data,
  selectedPart,
  setter,
  selected,
}: {
  data: MockDataProps[];
  selectedPart: string;
  setter: (e: string) => void;
  selected: string;
}) {
  const selectedData: MockDataProps | undefined = data.find(
    (item) => selectedPart === item.label
  );

  return (
    <Flex direction="column" gap={8}>
      {selectedData?.links &&
        Array.isArray(selectedData.links) &&
        selectedData?.links?.map((part) => (
          <div
            style={{ padding: "0.6rem 1rem", cursor: "pointer" }}
            key={part.label}
          >
            <Text
              size="md"
              fw={500}
              c={selected === part.label ? "blue" : "black"}
              onClick={() => setter(part.label)}
            >
              {part.label}
            </Text>
          </div>
        ))}
    </Flex>
  );
}

function BrandSelection({
  data,
  setter,
}: {
  data: any;
  setter: (e: string) => void;
}) {
  const brandGroup = colorData.map((item, index) => (
    <ColorGroups key={item.name + index} data={item} />
  ));
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        overflow: "auto",
      }}
    >
      <ScrollArea>{brandGroup}</ScrollArea>
    </div>
  );
}
