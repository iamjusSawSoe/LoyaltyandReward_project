import type { HTMLProps } from "react";

type PointsProps = {
  label: string;
  points: number | undefined;
  isLoading: boolean;
} & HTMLProps<HTMLDivElement>;

export default function Points({ label, points, isLoading, ...properties }: PointsProps) {
  return (
    <div className="points" {...properties}>
      <label className="custom-label">{label}</label>

      {isLoading ? (
        <div className="points__loader shimmer" />
      ) : points !== 0 ? (
        <h2>
          {points?.toLocaleString()} <span>pts</span>
        </h2>
      ) : (
        <h2>
          0<span>pts</span>
        </h2>
      )}
    </div>
  );
}
