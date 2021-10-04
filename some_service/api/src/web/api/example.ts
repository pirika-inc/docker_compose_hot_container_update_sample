// noinspection JSUnusedGlobalSymbols

import * as express from "express";
import { Operation } from "express-openapi";
import fetch from "node-fetch";
import { config } from "../../config";

export default function (): { [key: string]: Operation } {
  const requestProcess = async (): Promise<{ status: number; json: Record<string, string> }> => {
    const response = await fetch(`${config.bridgeUrl}/example`).catch(() => {
      return null;
    });
    if (!response) {
      return { status: 404, json: { message: "core_controll not booted." } };
    }
    if (response.status != 200) {
      const { message } = await response.json().catch((err) => {
        return { message: err.toString() };
      });
      return { status: response.status, json: { message } };
    }
    const { message } = await response.json();
    return { status: 200, json: { message } };
  };

  const GET: Operation = async (req: express.Request, res: express.Response) => {
    const result = await requestProcess();
    res.status(result.status);
    res.json(result.json);
    return res;
  };

  GET.apiDoc = {
    summary: "example API",
    tags: ["example"],
    responses: {
      "200": {
        description: "OK",
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                message: {
                  type: "string",
                  title: "message",
                  example: "test string from services",
                },
              },
            },
          },
        },
      },
    },
  };
  return { GET };
}
