/** @jsxImportSource react */

import React from "react";

export function ReactComponent({
  name,
  children,
}: {
  name: string;
  children: React.ReactNode;
}) {
  return (
    <div className="">
      <div>{name}</div>
      <div>{children}</div>
    </div>
  );
}
