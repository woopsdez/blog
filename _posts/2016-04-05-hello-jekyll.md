---
layout: post
title: ghostからjekyllに移行しました。
categories: diary
banner_image: "/content/images/2016/04/Jekyll_and_Hyde.jpg"
featured: true
---

ghostはシンプルで使いやすかった。でも月1000円は高い。管理の手間はあるけれど触ってて楽しいjekyllによるセルフホスティングに移行しました。

{% include image_caption.html imageurl="/content/images/2016/04/ghost-logos.png" title="node.jsで動くちょう今っぽいおしゃれブログプラットホーム" %}

自分でホスティングするのが嫌。

今っぽいシンプルなブログプラットホームがいい。

そういう理由でghost(pro)を利用していました。しかし、<strong>月1000円前後でブログ1個。無料の場合はブログすら持てない。</strong>というのは、ちょっとワタシには高すぎたかな。

## ブログ難民の流れ

* 2005年〜 Movable Type
* 2007年〜 WordPress
* 2014年〜 ghost
* 2016年〜 jekyll

シンプルでおしゃれで今っぽい技術。それでいて、ほぼ無料に近いサービスというのは無いのでしょうか。

いまのところはtumblrが一番良さそうですが、本腰入れて使ったことがないからなんとも言えないですね。記事のimport/exportやURLがどうなってるのかも気になるところ。

それでも、いろんな可能性を考えるのが面倒になって、触ってて楽しかったjekyllでの運用となりました。

## メンテナンスを考えないですむブログ環境

![](/content/images/2016/04/spanner.jpg)

書くだけに集中したいと言いつつ、おしゃれっぽさや「スゴそう感」で環境選んじゃうのでいつも苦労します。ミーハーですね。

今回は「10年ほぼメンテナンスフリー」を目標に考えてみましたが、そうしたら国内の老舗サービスしか候補に残りませんでした。

個人ブログくらい無責任におもしろそうな技術使いたいのでそれは断念。

## 良いお勉強になった

構築にあたって、gulpとgit-hookについて勉強できました。

{% include image_caption.html imageurl="/content/images/2016/04/gulp_logo.jpg" title="サイト制作中によくやるアレやコレを自動化できるヤーツ" %}

gulpではjekyllのビルド、scssのコンパイル、ブラウザの自動リロードをしてくれる便利なnpmパッケージを使ってます。github-pageならデプロイまで簡単。

[jekyll-gulp-sass-browser-sync
](https://github.com/shakyShane/jekyll-gulp-sass-browser-sync)

あとは、ビルド時に画像をリサイズ、最適化できるようにしたいです。

画像の保存場所を記事と同じディレクトリにしたいのだけど、それはどの技術でできるのかがさっぱり検討つかないのでまた今度。

デプロイはgit-hookを使ってます。push時にはワークツリーのファイルを配置することができないらしく、

1. 受けとる場所(rep/ファイルなし、情報のみ)
2. ソースファイルを展開する場所(rep/ワークツリーあり)
3. 公開用ディレクトリ(_site以下にある静的ファイル)

と3つのディレクトリが必要になっています。

![](/content/images/2016/04/hook-memo.jpg)

2でローカルと同じソースファイルがサーバーに配置されるので、そこから_siteだけをcpで```public_html/blog```にコピーしてきています。

hookはpost-updateを使っています。中身はこんな感じ。

```code
# ソースファイル リポジトリへ移動してファイルを取得
cd /yourdomain.com/blog-source;
git --git-dir=.git pull origin master;

# 公開用ディレクトリのファイルを全消去して新にコピー
rm -rf /yourdomain.com/blog/*;
cp -r youdomain.com/blog-source/_site/* /yourdomain.com/blog/;

# htaccess.txtを正式な名前リネーム
mv /yourdomain.com/blog/htaccess.txt yourdomain.com/blog/.htaccess; 
```

最後のhtaccessは別に不要ですが、os xのfinderでリネームしようとすると「.(ドット)から始まるファイル名はシステムのみ」と怒られるのでこっちでやってます。

ブログのメンテを行ったあとって無闇に記事を書きたくなりますよね。

来年にはtumblrに移行してるかもしれませんが、ひとまずこれでよろしくお願いします。