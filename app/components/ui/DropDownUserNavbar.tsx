"use client";
import { Dropdown, Avatar } from "flowbite-react";
import React from "react";
import { useSession, signOut } from "next-auth/react";

export default function DropDownUserNavbar() {
  const { data: session } = useSession();
  const handleLogout = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_URL_API_DRIVER_BENEFIT}/logout`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session?.user?.access_token}`,
          },
        }
      );

      if (!res.ok) {
        console.log(res.statusText);
      }
      signOut();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <Dropdown
        arrowIcon={false}
        inline
        label={
          <Avatar
            alt="User settings"
            img="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
            rounded
          />
        }
      >
        <Dropdown.Header>
          <span className="block text-sm">Bonnie Green</span>
          <span className="block truncate text-sm font-medium">
            name@flowbite.com
          </span>
        </Dropdown.Header>
        <Dropdown.Item onClick={() => handleLogout()}>Sign out</Dropdown.Item>
      </Dropdown>
    </div>
  );
}
