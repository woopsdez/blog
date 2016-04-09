# blog.mikiishijima.com


## 開発環境の準備
1. Jekyll - ```$ gem install jekyll```
2. NodeJS - use the installer.
3. GulpJS - ```$ npm install -g gulp``` (mac users may need sudo)
4. homebrew - ```/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"```
5. imagemagick - ```$brew install imagemagick```
6. graphicmagick - ```$brew install graphicsmagick```

全てのインストールが完了したら
```$ npm install```

## ディレクトリ・ファイルについて
* README.md

gulp

* package.json
* gulpfile.js
* node_modules

jekyll

* _config.yml
* _config_dev.yml - 開発環境用URL
* _glynn.yml      - FTPアップロード用
* _site
* _posts
* _plugins
* _drafts
* _includes
* _layouts

html

* index.html
* feed.xml
* favicon.ico
* about.md
* contact.md
* content        - ブログ記事のassets
* assets         - サイト自体に使用するassets
* htaccess.txt

## 一部古いURLを維持するための作業。
サイト全体に及ぶ変更をした場合、ghost運用時に反響のあった記事はURLを維持するために_config.yml上で/:title/で一度buildしデプロイする必要がある。

そのあとにprettyに戻して再度デプロイすることで、古い記事にも新しいサイトの設定を適用させられる。

## 自動で行われること
* scssのコンパイル
* ブラウザのオートリロード
* 画像のリサイズ(w:1000)
* 画像の軽量化
* 本番環境へのデプロイ