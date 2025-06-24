import type { Point } from "./Geoloc.model";

interface MapPointProps {
  point: Point;
  onClick: (p: Point) => void;
}
export default function MapPoint(_props: MapPointProps) {
  return <div>MapPoint</div>;
}
