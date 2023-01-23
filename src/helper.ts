import { mouse, Point } from "@nut-tree/nut-js";

export async function getRectanglePoints(
  width: number,
  length?: number
): Promise<Point[]> {
  const { x, y } = await mouse.getPosition();

  return [
    { x: x + width, y },
    { x: x + width, y: y + (length ?? width) },
    { x, y: y + (length ?? width) },
    { x, y },
  ] as Point[];
}
