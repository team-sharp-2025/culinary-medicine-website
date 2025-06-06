import React from "react";

export const Card = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <div className="border p-4 rounded shadow bg-white">
    <h2 className="text-lg font-bold mb-2">{title}</h2>
    <div>{children}</div>
  </div>
);
