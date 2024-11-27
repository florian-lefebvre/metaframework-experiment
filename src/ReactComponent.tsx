/** @jsxImportSource react */

import React from "react";

export function ReactComponent({
  name,
  children,
  icon
}: {
  name: string;
  children: React.ReactNode;
  icon?: React.ReactNode
}) {
  return (
    <div className="">
      <div>{name}</div>
      <div>{children}</div>
      {icon}
    </div>
  );
}
