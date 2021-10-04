class Config {
  bridgeUrl = process.env.URL_CORE_CONTROLL ? process.env.URL_CORE_CONTROLL : "http://0.0.0.0:8001";
}
export const config = new Config();
