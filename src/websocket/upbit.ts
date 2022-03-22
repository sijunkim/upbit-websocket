import { v4 as ticket } from "uuid";
import WebSocket = require("ws");

export interface UpbitSocketPayload {
  type: "ticker" | "trade" | "orderbook";
  codes: string[];
  isOnlySnapshot?: boolean;
  isOnlyRealtime?: boolean;
}

export interface UpbitWebSocketSimpleResponse {
  ty: string;
  cd: string;
  op: number;
  hp: number;
  lp: number;
  tp: number;
  pcp: number;
  atp: number;
  c: string;
  cp: number;
  scp: number;
  cr: number;
  scr: number;
  ab: string;
  tv: number;
  atv: number;
  tdt: string;
  ttm: string;
  ttms: number;
  aav: number;
  abv: number;
  h52wp: number;
  h52wdt: string;
  l52wp: number;
  l52wdt: string;
  ts: null;
  ms: string;
  msfi: null;
  its: false;
  dd: null;
  mw: string;
  tms: number;
  atp24h: number;
  atv24h: number;
  st: string;
}

export class UpbitWebSocket {
  public webSocket: WebSocket;

  constructor() {
    this.webSocket = new WebSocket("wss://api.upbit.com/websocket/v1");
  }

  public Open(type: UpbitSocketPayload, callback?: Function) {
    this.webSocket.onopen = () => {
      //const formatString = `${JSON.stringify([{ "ticket": ticket() }, { "type": type }, { "format": "SIMPLE" }])}`;
      const formatString = JSON.stringify([{"ticket":"test"},{"type":"trade","codes":["KRW-BTC","BTC-BCH"]},{"format":"SIMPLE"}]);
      this.webSocket.send(formatString);

      if (callback) {
        callback();
      }
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

  public OnMessage(callback: (data: UpbitWebSocketSimpleResponse) => void) {
    this.webSocket.onmessage = async (response) => {
      const data = JSON.parse(response.data.toString("utf-8"));
      callback(data);
    };
  }
}
