import { UpbitWebSocket } from "./websocket/upbit";

async function Init() {
  try {
    const upbit_ws = new UpbitWebSocket();

    upbit_ws.Open({ type: "orderbook", codes: ["KRW-BTC"] }, () => {
      console.log("upbit socket connected.");
    });

    upbit_ws.OnMessage((data) => {
      console.log(data);
    });

    upbit_ws.OnClose(() => {
      console.log("closed.");
    });
  } catch (err) {
    console.log(`[ERROR]`, err);
  }
}

Init();
