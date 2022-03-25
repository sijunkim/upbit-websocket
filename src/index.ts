import { UpbitWebSocket, UpbitWebSocketSimpleResponse } from "./websocket/upbit";
import { Obu, Order, Orderbook } from "./entities/order";

const map = new Map<String, Orderbook>();

const getRefindData = async (data: UpbitWebSocketSimpleResponse) => {
  let orderbook: Orderbook = { 
    asks: new Array<Order>(), 
    bids : new Array<Order>() 
  };
  
  data.obu.forEach(item => {
    const obu: Obu = <Obu><unknown>item;
    const askOrder: { price: number, quantity: number } = { price: obu.ap, quantity: obu.as };
    const bidOrder: { price: number, quantity: number } = { price: obu.bp, quantity: obu.bs };
    orderbook.asks.push(askOrder);
    orderbook.bids.push(bidOrder);
  });

  return orderbook;
};

const setData = (coinType: String, orderbook: Orderbook) => {
  const order = map.get(coinType);
  if (order == null) {
    map.set(coinType, orderbook);
  } else {
    order.asks.push(...orderbook.asks);
    order.bids.push(...orderbook.bids);
    order.asks.sort(function (a, b) { return a.price - b.price; });
    order.bids.sort(function (a, b) { return a.price - b.price; }).reverse();
  }
};

const printData = (data: any) => {
  //프린트 하는 로직 추가
};

const InsertData = () => {
  //Redis 연동부분 추가
};

const connecting = async () => {
  try {
    const upbit_ws = new UpbitWebSocket();

    upbit_ws.Open({ type: "orderbook", codes: ["KRW-BTC","KRW-ETH","BTC-ETC","BTC-XRP","BTC-DOGE"] }, () => {
      console.log("Wow upbit websocket connected.");
    });

    upbit_ws.OnMessage(async (data) => {
      const refinedData = await getRefindData(data);
      setData(data.cd, await refinedData);
      //printData();
      //InsertData();
    });

    upbit_ws.OnClose(() => {
      console.log("Oops upbit websocket closed.");
    });
  } catch (err) {
    console.log(`Error : ${err}`);
  }
};

connecting();
