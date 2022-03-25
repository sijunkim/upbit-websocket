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

  async open(payload: UpbitSocketPayload, callback?: Function) {
    this.webSocket.onopen = async () => {
      const formatString = JSON.stringify([{ ticket: ticket() }, payload, { format: "SIMPLE" } ]);
      this.webSocket.send(formatString);
      if (callback) {
        await callback();
      }
    };
  }

  async onMessage(callback: (data: UpbitWebSocketSimpleResponse) => void) {
    this.webSocket.onmessage = async (response) => {
      const data = JSON.parse(response.data.toString("utf-8"));
      callback(data);
    };
  }

  async close(): Promise<void> {
    this.webSocket.close();
  }

  async onClose(callback: Function) {
    this.webSocket.onclose = async () => {
      await callback();
    };
  }
}
