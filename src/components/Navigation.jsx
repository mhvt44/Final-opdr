// @ts-nocheck
import React from "react";
import { Menubar } from "primereact/menubar";
import { useCurrentUser } from "../contexts/UserContext";
import { Link } from "react-router-dom";
import logo from '../images/logo.png'

export const Navigation = () => {
  const { currentUser } = useCurrentUser();

  let userURL = "/login";
  if (currentUser) userURL = `/user/${currentUser.id}`;

  let userName = "Log in";
  if (currentUser) userName = currentUser.name;

  const items = [
    { label: "Home", icon: "pi pi-home", url: "/" },
    { label: "Events", icon: "pi pi-calendar", url: "/events" },
    { label: userName, icon: "pi pi-user", url: userURL },
  ];

  const start = (
    <Link className="no-underline" to={"/"}>
      <img src={logo} className="w-4" />
    </Link>
  );

  return (
    <nav className="flex bg-white align-items-center justify-content-start gap-3 w-full max-w-1200">
      <Menubar style={{ backgroundColor: 'var(--green-900)'}} className="w-full" model={items} start={start} />
    </nav>
  );
};
