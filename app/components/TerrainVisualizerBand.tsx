"use client";
import dynamic from "next/dynamic";

const TerrainVisualizer = dynamic(
  () => import("./TerrainVisualizer").then((m) => m.TerrainVisualizer),
  { ssr: false }
);

export function TerrainVisualizerBand() {
  return <TerrainVisualizer />;
}
