"use client";
import dynamic from "next/dynamic";

const SpaceRickshaw = dynamic(() => import("./SpaceRickshaw"), { ssr: false });

export function SpaceRickshawEmbed() {
  return <SpaceRickshaw />;
}
