import * as express from "express";
import { exec, ExecException } from "child_process";
import fse = require("fs-extra");
import fetch from "node-fetch";
import { config } from "../../config";
import { ServiceName } from "../../model";

// NOTE: 本来はgit等から逐次コードを取得するが、exampleのためファイルコピーに留めている
// また、必要でなくなったら破棄 or キャッシュしておく必要あり
const copyServices = (): void => {
  const options = { recursive: true, errorOnExist: false };
  fse.copySync("../service1", "./service1", options);
  fse.copySync("../service2", "./service2", options);
  fse.copySync("../service3", "./service3", options);
};

// 子プロセスにてdocker-compose実行、service1~3コンテナをリビルド
const buildAsync = async (): Promise<void> => {
  return new Promise((resolve, reject) => {
    exec("docker-compose up -d --build", (error) => {
      if (error) {
        reject(error);
      } else {
        resolve();
      }
    });
  });
};

// GET API呼び出しラッパー
const api = async <T>(url: string): Promise<T> => {
  const response = await fetch(url).catch(() => {
    return 500;
  });
  if (typeof response === "number") {
    return Promise.reject(500);
  }
  if (response.status >= 400 || !response.ok) {
    return Promise.reject(response.status);
  }
  return (await response.json()) as Promise<T>;
};

// service1/2/3にリクエスト送信
const requestToService = async (target: ServiceName): Promise<{ status: number; message?: string }> => {
  const url = config.url[target];
  return new Promise((resolve) => {
    api<{ message: string }>(`${url}/example`)
      .then((response) => {
        resolve({ status: 200, message: response.message });
      })
      .catch((status: number) => {
        resolve({ status });
      });
  });
};

// GET /example API定義
export default async (req: express.Request, res: express.Response): Promise<express.Response> => {
  copyServices();
  const err = await buildAsync().catch((err: ExecException) => err);
  if (err) {
    res.status(500);
    res.json({ message: "Build failed!" });
    return res;
  }

  // 本来は各serviceの疎通確認が取れてから、通信する方が望ましい
  const service1Response = await requestToService("service1");
  const service2Response = await requestToService("service2");
  const service3Response = await requestToService("service3");
  if (service1Response.status >= 400 || service2Response.status >= 400 || service3Response.status >= 400) {
    res.status(500);
  } else {
    res.status(200);
  }

  res.json({
    message: {
      service1: service1Response,
      service2: service2Response,
      service3: service3Response,
    },
  });
  return res;
};
