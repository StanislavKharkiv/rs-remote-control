import { WebSocketServer } from "ws";
import { commandRouter } from "../commandRouter";

const PORT = 8080;

export function createWebsocketServer() {
  const wss = new WebSocketServer({ port: PORT });
  wss.on("connection", function connection(ws) {
    ws.on("message", async function message(data) {
      const command = data.toString();
      console.log("client command: ", command);
      ws.send(await commandRouter(data.toString()));
    });

    ws.send("Connected");
  });
}
