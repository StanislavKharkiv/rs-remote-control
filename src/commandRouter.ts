import { mouse, up, down, right, left, Point } from "@nut-tree/nut-js";
import { getRectanglePoints } from "./helper";

export async function commandRouter(command: string): Promise<string> {
  const parsedData = command.split(" ");
  const commandName = parsedData[0];
  const value1 = +parsedData[1];
  const value2 = +parsedData[2];

  mouse.config.mouseSpeed = 30;
  const { x, y } = await mouse.getPosition();

  switch (commandName) {
    case "mouse_up": {
      await mouse.move(up(value1));
      return `${commandName} ${value1}`;
    }
    case "mouse_down": {
      await mouse.move(down(value1));
      return `${commandName} ${value1}`;
    }
    case "mouse_left": {
      await mouse.move(left(value1));
      return `command ${value1}`;
    }
    case "mouse_right": {
      await mouse.move(right(value1));
      return `${commandName}  ${value1}`;
    }
    case "mouse_position": {
      return `${commandName} ${x} ${y}`;
    }
    case "draw_rectangle": {
      mouse.drag(await getRectanglePoints(value1, value2));
      return `${commandName} ${value1} ${value2}`;
    }
    case "draw_square": {
      mouse.drag(await getRectanglePoints(value1));
      return `${commandName} ${value1} ${value2}`;
    }
    case "draw_circle": {
      mouse.config.mouseSpeed = 300;
      const points: Point[] = [];
      const radius = value1;
      const crop = 300;
      for (let i = 0; i <= crop; i++) {
        const point = {
          x: x + radius * Math.sin(i * 2 * (Math.PI / crop)) + 0.5,
          y: y + radius * Math.cos(i * 2 * (Math.PI / crop)) + 0.5,
        };
        points.push(point);
      }
      await mouse.setPosition({ x: points[0].x, y: points[0].y });
      points.shift();
      mouse.drag(points);
      return `${commandName} ${value1}`;
    }
    default:
      return "unknown command";
  }
}
