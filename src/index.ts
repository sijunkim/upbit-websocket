import { UpbitWebSocket, UpbitWebSocketSimpleResponse } from "./websocket/upbit";
import { Obu, Order, Orderbook } from "./entities/order";

const map = new Map<string, Orderbook>();

const obuIterate = (obu: Obu) => {
  
}

const getRefindOrder = (data: UpbitWebSocketSimpleResponse) => {
  console.log(data);
  const orderbook = new Orderbook();
  /*
  Object loop 통해 orderbook 만들어서 반환해야 함
  */

  return orderbook;
};

const getRefindData = (data: UpbitWebSocketSimpleResponse) => {
  
  //안에 있는 데이터 정렬
  /*
  1. data.tms 날짜로 변경
  2. orderbook: { asks : [{ap, as}], bids : [{bp, bs}] } 형식으로 데이터 구조 변경
  3. krw-btc -> krw-eth 등 5개의 페어가 나오도록 처리
  */
  const order = map.get(data.cd);
  if (order == null) {
    const ordebook = getRefindOrder(data);
    map.set(data.cd, ordebook);
  }

  return null;
};

const printOrderbooks = (data: any) => {
  //프린트 하는 로직 추가
};

async function Init() {
  try {
    const upbit_ws = new UpbitWebSocket();

    upbit_ws.Open({ type: "orderbook", codes: ["KRW-BTC","KRW-ETH","BTC-ETC","BTC-XRP","BTC-DOGE"] }, () => {
      console.log("Wow upbit websocket connected.");
    });

    upbit_ws.OnMessage((data) => {
      //console.log(data);
      const refinedData = getRefindData(data);
      // printOrderbooks(refinedData);
    });

    upbit_ws.OnClose(() => {
      console.log("Oops upbit websocket closed.");
    });
  } catch (err) {
    console.log(`[ERROR]`, err);
  }
};

Init();
