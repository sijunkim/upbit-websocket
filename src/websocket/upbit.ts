import { v4 as ticket } from "uuid";
import WebSocket = require("ws");

export interface UpbitSocketPayload {
  type: "ticker" | "trade" | "orderbook";
  codes: string[];
}

export interface UpbitWebSocketSimpleResponse {
  ty: string;
  cd: string;
  tms: number;
  st: string;
  obu: string[];
}

export class UpbitWebSocket {
  public webSocket: WebSocket;

  constructor() {
    this.webSocket = new WebSocket("wss://api.upbit.com/websocket/v1");
  }

  public Open(payload: UpbitSocketPayload, callback?: Function) {
    this.webSocket.onopen = () => {
      const formatString = JSON.stringify([{ ticket: ticket() }, payload, { format: "SIMPLE" } ]);
      this.webSocket.send(formatString);
      if (callback) {
        callback();
      }
    };
  }

  public OnMessage(callback: (data: UpbitWebSocketSimpleResponse) => void) {
    this.webSocket.onmessage = async (response) => {
      const data = JSON.parse(response.data.toString("utf-8"));
      callback(data);
    };
  }

  public Close() {
    this.webSocket.close();
  }

  public OnClose(callback: Function) {
    this.webSocket.onclose = () => {
      callback();
    };
  }
}
