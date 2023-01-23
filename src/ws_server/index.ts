import { WebSocketServer } from "ws";
const PORT = 8080;

export function createWebsocketServer() {
  const wss = new WebSocketServer({ port: PORT });
  wss.on("connection", function connection(ws) {
    ws.on("message", function message(data) {
      const command = data.toString().split(" ");
      console.log("client: ", command);
      ws.send(command.join(" "));
    });

    ws.send("Connected");
  });
}
