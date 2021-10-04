# docker_compose_hot_container_update_sample
Docker outside of Docker(DooD)の仕組みを利用して、一部コンテナを動的に更新・ビルドするサンプルプロジェクト

## 前提
以下の通りDockerコンテナ環境を構築することを想定しています。

- api: APIサーバ用コンテナです。外部ネットワークとのインターフェースになります。
- core_controll: apiコンテナおよび内部コンテナとの折衝を行うコンテナです。
- service\_\*: 個別処理用のサービスコンテナです。サンプルプロジェクトのため、"Hello World!"のみ返します。service_\*コンテナのアップデート状況を見たい場合、応答メッセージを適宜書き換えて `http://localhost:8000/example` にアクセスしてください。

```
<network>     api             internal
        |--------------|  |---------------|

                                 <=> [service_1]
     [api] <=>  [core_controll]  <=> [service_2]
                                 <=> [service_3]
```

## 使い方
1. build_run.shを実行してください。Docker-Composeにより、コンテナがビルドされます。

```bash
./build_run.sh
```

2. `http://localhost:8000/example` にブラウザからアクセスするか、cURLを使ってGETします。アクセス直後、service_\*のイメージがリビルドされ、service\_\*のコンテナが最新のimageに合わせ更新されます。

## Author
Pirika, Inc.
