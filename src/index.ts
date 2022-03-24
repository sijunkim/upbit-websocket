import { UpbitWebSocket, UpbitWebSocketSimpleResponse } from "./websocket/upbit";

const getRefindData = (data: UpbitWebSocketSimpleResponse) => {
  
  //안에 있는 데이터 정렬
  /*
  1. data.tms 날짜로 변경
  2. orderbook: { asks : [{ap, as}], bids : [{bp, bs}] } 형식으로 데이터 구조 변경
  3. krw-btc -> krw-eth 등 5개의 페어가 나오도록 처리
  */

  

  return null;
}

const printOrderbooks = (data: any) => {
  //프린트 하는 로직 추가
}

async function Init() {
  try {
    const upbit_ws = new UpbitWebSocket();

    upbit_ws.Open({ type: "orderbook", codes: ["KRW-BTC","KRW-ETH","BTC-ETC","BTC-XRP","BTC-DOGE"] }, () => {
      console.log("Wow upbit websocket connected.");
    });

    upbit_ws.OnMessage((data) => {
      console.log(data);
      // const refinedData = getRefindData(data);
      // printOrderbooks(refinedData);
    });

    upbit_ws.OnClose(() => {
      console.log("Oops upbit websocket closed.");
    });
  } catch (err) {
    console.log(`[ERROR]`, err);
  }
}

Init();
