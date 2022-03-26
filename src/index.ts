import { UpbitWebSocket, UpbitWebSocketSimpleResponse } from "./websocket/upbit";
import { ObuVO, OrderVO, OrderbookVO } from "./vo/order";
//import * as dotenv from 'dotenv';
import { DataSource } from "typeorm"
import { Orderbook } from "./entity/orderbook";

const map = new Map<String, OrderbookVO>();

const getRefindData = async (data: UpbitWebSocketSimpleResponse) => {
  let orderbook: OrderbookVO = { 
    asks: new Array<OrderVO>(), 
    bids : new Array<OrderVO>() 
  };
  
  data.obu.forEach(item => {
    const obu: ObuVO = <ObuVO><unknown>item;
    const askOrder: { price: number, quantity: number } = { price: obu.ap, quantity: obu.as };
    const bidOrder: { price: number, quantity: number } = { price: obu.bp, quantity: obu.bs };
    orderbook.asks.push(askOrder);
    orderbook.bids.push(bidOrder);
  });

  return orderbook;
};

const setData = (coinType: String, orderbookVO: OrderbookVO) => {
  const order = map.get(coinType);
  if (order == null) {
    map.set(coinType, orderbookVO);
  } else {
    order.asks.push(...orderbookVO.asks);
    order.bids.push(...orderbookVO.bids);
    order.asks.sort(function (a, b) { return a.price - b.price; });
    order.bids.sort(function (a, b) { return a.price - b.price; }).reverse();
  }
};

const InsertData = async (type: string, refinedData: OrderbookVO) => {
  const orderbook = new Orderbook();
  orderbook.code = type;
  orderbook.data = JSON.stringify(refinedData);

  AppDataSource.getRepository(Orderbook).save(orderbook);
};

const connecting = async () => {
  try {
    const upbit_ws = new UpbitWebSocket();

    upbit_ws.open({ type: "orderbook", codes: ["KRW-BTC","KRW-ETH","BTC-ETC","BTC-XRP","BTC-DOGE"] }, () => {
      console.log("Wow upbit websocket connected.");
    });

    upbit_ws.onMessage(async (data) => {
      const refinedData = await getRefindData(data);
      await setData(data.cd, refinedData);
      await InsertData(data.cd, refinedData);
    });

    upbit_ws.onClose(() => {
      console.log("Oops upbit websocket closed.");
    });
  } catch (err) {
    console.log(`Error : ${err}`);
  }
};

// dotenv.config({
//   path: path.resolve(
//     process.env.NODE_ENV === 'production'
//       ? '.production.env'
//       : process.env.NODE_ENV === 'stage'
//       ? '.stage.env'
//       : '.development.env',
//   ),
// });

const AppDataSource = new DataSource({
  type: "mysql",
  host: "127.0.0.1",
  port: 3306,
  username: "root",
  password: "knf345n@@",
  database: "kimsijun-upbit-websocket",
  entities: [Orderbook],
  synchronize: true,
  logging: true,
}); 

AppDataSource.initialize().then(() => {
    // here you can start to work with your database
})
.catch((error) => console.log(error));

connecting();
