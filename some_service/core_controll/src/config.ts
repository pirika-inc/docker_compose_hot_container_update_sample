import { ServiceName } from "./model";

class Config {
  url: Record<ServiceName, string> = {
    service1: process.env.URL_SERVICE1 ? process.env.URL_SERVICE1 : "http://0.0.0.0:8002",
    service2: process.env.URL_SERVICE2 ? process.env.URL_SERVICE2 : "http://0.0.0.0:8003",
    service3: process.env.URL_SERVICE3 ? process.env.URL_SERVICE3 : "http://0.0.0.0:8004",
  };
}

export const config = new Config();
