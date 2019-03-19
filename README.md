# blog.mikiishijima.com

## TODO
* サブドメイン時とディレクトリURLの場合の階層の違いをどう対処したら良いか
* githubのアラートが消えない
* リンク切れ
  * ブログ記事のコンテンツ
  * 投稿者写真

## 開発環境の準備
1. Jekyll - ```$ gem install jekyll```
1. jekyll plugin - ```gem install jekyll-paginate```
2. NodeJS - use the installer.
3. GulpJS - ```$ npm install -g gulp``` (mac users may need sudo)
4. homebrew - ```/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"```
5. imagemagick - ```$brew install imagemagick```
6. graphicmagick - ```$brew install graphicsmagick```

全てのインストールが完了したら
```$ npm install```

## ディレクトリ・ファイルについて
* README.md

### gulp

* package.json
* gulpfile.js
* node_modules
* hogehoge

### jekyll

* _config.yml
* _config_dev.yml - 開発環境用URL
* _glynn.yml      - FTPアップロード用 .gitignore対象
* _site
* _posts
* _plugins
* _drafts
* _includes
* _layouts

### html

* index.html
* feed.xml
* favicon.ico
* about.md
* contact.md
* content        - ブログ記事のassets
* assets         - サイト自体に使用するassets
* htaccess.txt

## 自動で行われること
* scssのコンパイル
* ブラウザのオートリロード
* 画像のリサイズ(w:1000)
* 画像の軽量化
* <del>本番環境へのデプロイ</del>

## TODO
* 画像を記事をひとつのフォルダにまとめて管理
* pluginを使って画像をレスポンシブ対応 [robwierzbowski/jekyll-picture-tag: Easy responsive images for Jekyll.](https://github.com/robwierzbowski/jekyll-picture-tag)
* **done!** <del>github-pagesへもbaseurlを対応させたい</del>

---

## 一部古いURLを維持するための作業。
反響のあった記事URLを移行後も保持しておくため、本番環境にのみ残したい記事ファイルが存在します。

* 2016年5月 下記条件だと、残したい記事ファイルも消えてしまうので、glynnでFTPアップロードに変更。
* 2016年4月 hookを使ってgit pushした時に同期するように。

## 過去につまづいた事

* 2017年1月 記事がbuildされない事件
	* 原因は日付を文字列にしていなかったせい。
