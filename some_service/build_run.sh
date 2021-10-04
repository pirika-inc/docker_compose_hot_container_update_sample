#!/bin/bash

# 本来はコード内でgit等からservice系containerに必要なコードを持ってくる。
# サンプルプロジェクトのためローカルからコピーしているが、本来別のリモートリポジトリから持ってくる
rsync -ar sub_services/* core_controll/

docker compose up -d --build

rm -r core_controll/service*
