"use client";

import { Menu, Button, rem, Avatar, UnstyledButton } from "@mantine/core";
import { IconSettings, IconLogout, IconBell } from "@tabler/icons-react";

export function HeaderAuthMenu() {
  return (
    <Menu shadow="md" width={200}>
      <Menu.Target>
        <UnstyledButton>
          {/* <Avatar name="Bret Axl Sebastian" color="blue" /> */}
          <Avatar
            src="https://scontent.fmnl25-5.fna.fbcdn.net/v/t1.6435-1/186474697_418918029457970_3745597802414599331_n.jpg?stp=dst-jpg_p200x200&_nc_cat=108&ccb=1-7&_nc_sid=e4545e&_nc_ohc=wT2G22OpY0sQ7kNvgFSQ93o&_nc_ht=scontent.fmnl25-5.fna&oh=00_AYBb0qLyDxzH5w_-Pu26IdbhsrRnzobR3aLiC6T38hqAYg&oe=66AF3C8E"
            alt="Account Profile"
          />
        </UnstyledButton>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Label>Application</Menu.Label>
        <Menu.Item
          leftSection={
            <IconSettings style={{ width: rem(14), height: rem(14) }} />
          }>
          Settings
        </Menu.Item>
        <Menu.Item
          leftSection={
            <IconBell style={{ width: rem(14), height: rem(14) }} />
          }>
          Notifications
        </Menu.Item>

        <Menu.Divider />

        <Menu.Item
          color="red"
          leftSection={
            <IconLogout style={{ width: rem(14), height: rem(14) }} />
          }>
          Log out
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}
