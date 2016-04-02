---
layout: post
title: ニコ動 超チューニング祭で最優秀賞もらいました
date: '2014-04-27 21:10:43'
---

ニコニコ超会議で開催された「超チューニング祭り」に恋人である武藤スナイパーカスタムからお誘いされて参加しました。

投票してくださった方々のおかげで最優秀賞！
ありがとうございます！

<a href="https://www.flickr.com/photos/woops_/15528479205" title="2014-09-15 23.10.15 by Miki Ishijima, on Flickr"><img src="https://farm6.staticflickr.com/5613/15528479205_7b3c0f3807.jpg" width="375" height="500" alt="2014-09-15 23.10.15"></a>

ニコ動モバイル版のトップページのhtml,css,jsを軽量化するお祭りでして、にぎやかな会場、狭いブースの中で詰め込まれておもしろかったです。

## チーム：ウルフギャングの紹介
エンジニア、デザイナーのバランスチーム。
武藤さんが狼が好きなのでそれっぽい名前にしました。ギャングらしくふたりとも革ジャン装備。

### 武藤スナイパーカスタム
Twitter : [tai2](https://twitter.com/__tai2__)
![武藤スナイパーカスタム](http://tai2.net/img/tai2.jpg)
コンピューターグラフィックスとPythonをこよなく愛すマッチ棒エンジニア。

### イシジマミキ
Twitter : [woopsdez](http://twitter.com/woopsdez)
![イシジマ ミキ](/content/images/2015/03/10258642_834983943197370_4862118391458179078_o.png)
写真をアップするたびにおおつねさんに「太った？」と言われる番付上昇中のデザイナー

他はエンジニアふたり、個人での参加などがあり学生さんやエンジニアさんが非常に多かったです。非常に高名なドワンゴスターエンジニアも参加していたのですが、HTML,CSS,JS等の専門外のチューニングを行う。というのがなんかおもしろかったです。

## コード
[https://github.com/tai2/nicohaya](https://github.com/tai2/nicohaya)

## チーム：ウルフギャングのやったこと
エンジニア

* html5 APIを利用した画像やスクリプトのローカルキャッシュ
* jsの整理
* jsCacheの改造
* css,jsのminify

エンジニアがやったことがGistにまとめられました。
https://gist.github.com/tai2/11366229

デザイナー

* 意味のない装飾はしない
* CSS Sprite
* PNGのフィルタを利用した画像ごとの書き出し
* ImgOptimでPNG軽量化
* JPGの軽量化

### 意味のない装飾はしない
以前参加したフロントエンドのイベントで[あほむさん](http://havelog.ayumusato.com/)が出していたCSS3プロパティ レンダリングの速度が印象に残っていたので意識してみました。

引用：[http://havelog.ayumusato.com/develop/performance/e561-wcan_2013_summer.html](http://havelog.ayumusato.com/develop/performance/e561-wcan_2013_summer.html)

つい角丸やシャドウは使ってしまいがちですけど、重要なものってそうないんですよね。

### CSS Sprite

アイコンなど、背景だけで使う小さな画像をまとめておきリクエスト回数を削減する方法です。小さいアイコンで何度もリクエストが発生するとサーバーを圧迫しちゃうんですね。同じ画像サイズならリクエストが少ない方がお得。

[CSS Sprite Generator](http://ja.spritegen.website-performance.org/)
画像群をzipで圧縮したものを添付するだけで自動で作成してくれます。

スプライトした方がいい画像はChrome拡張機能の[PageSpeed Insights (by Google)](https://chrome.google.com/webstore/detail/pagespeed-insights-by-goo/gplegfbjlmmehdoakndmohflojccocli)で教えてもらえます。

### PNGフィルタを利用した画像ごとの書き出し

GIF BOOKの作例にてGIFは横方向に同じ色が続くと軽量化できるという記述があったのでPNGでもあるかなと探したらビンゴでした。

引用：[わかりやすい PNG の話 for Web](http://mikeneko.creator.club.ne.jp/~lab/grp/png/p3.html#h3-4-1)

ですので画像形式に合わせてこのフィルタを活用しています。

### ImgOptimでPNG軽量化

![ImgOptimのアプリ画面](http://imageoptim.com/ImageOptim-screenshot@2x.png)
画像の軽量化、圧縮ではかなりと言っていいほど紹介されるアプリですね。[ImageOptim](http://imageoptim.com/)

使い方も非常に簡単で、ドラッグ&ドロップするだけで圧縮して置き換えてくれます。

### JPEGの圧縮はJPEG mini Lite
いろんなの使ってみたかったんでこちらも試しました。

[JPEG mini LITE](http://www.jpegmini.com/app)は1日使える回数に制限がありますが、無償で使えます。とりあえず試したいならブラウザ版を使うと良いでしょう。

[JPEG mini](http://www.jpegmini.com/)

### JPEGの圧縮アルゴリズムを利用した一石二鳥の圧縮
それだけではつまらないので特徴のあるアプローチをしました。

PNGは色数で軽量化でき、色の範囲が多くても関係ないですが、JPGも色情報が多いほど重くなるのは一緒。

と、言うことは近似色をまとめておけば軽くなる？と思ったので絵柄によってぼかしをかけても問題ない場合は演出に見せかけてぼかしています。

僅かだけど確かに変わったので何かしら影響あったんだろうと思いますが、詳しくは良く分かりません。時間があればここら辺を理解して検証してみたいです。

[JPEG画像形式の概要(圧縮アルゴリズム)。](http://www.marguerite.jp/Nihongo/Labo/Image/JPEG.html#CMPRESS)


### 正直、画像の軽量化とかあんまり興味なかった。

スマフォで使う画像なんて、ほとんどユーザー投稿系じゃないですか。細かいアイコンはWebフォント化するなりしているだろうし、メイン画像はデザイナー作ってくるから軽量化アプリとかちょっとかますくらい。

そんなの誰でもできそうなので、「何しようかなー」と軽部さんのガッチャマン聞きながらボーっとしてました。

でも、やってみたらけっこう面白くて新しい知識を得られておもしろかったです。

絵柄と画像形式ごとに最適な圧縮方法を見つけたり、演出っぽいエフェクトをかけて軽量化の実験するのは簡単でスグ効果も分かるし、普段身近に扱っている「画像」たちの新な一面を知ることができました。

## LTのスライド

<iframe src="http://www.slideshare.net/slideshow/embed_code/34004982" width="427" height="356" frameborder="0" marginwidth="0" marginheight="0" scrolling="no" style="border:1px solid #CCC; border-width:1px 1px 0; margin-bottom:5px; max-width: 100%;" allowfullscreen> </iframe> <div style="margin-bottom:5px"> <strong> <a href="https://www.slideshare.net/woopsdez/nicohaya" title="ニコニコ動画 超チューニング祭" target="_blank">ニコニコ動画 超チューニング祭</a> </strong> from <strong><a href="http://www.slideshare.net/woopsdez" target="_blank">イシジマミキ</a></strong> </div>

## 同じものをみんなで作るのやりたい

同じものでのいろんなアプローチは非常におもしろかったです。今度、わたしの運営しているコワーキングスペース[こけむさズ](https://www.facebook.com/kokemusazu)で何かやってみたいですね。

Webサービス系の企業さま! トップいじらせてくれませんか！ グッズとかくれませんか! 

<a href="http://www.amazon.co.jp/gp/product/4774155101/ref=as_li_ss_il?ie=UTF8&camp=247&creative=7399&creativeASIN=4774155101&linkCode=as2&tag=fastfargroove-22"><img border="0" src="http://ws-fe.amazon-adsystem.com/widgets/q?_encoding=UTF8&ASIN=4774155101&Format=_SL250_&ID=AsinImage&MarketPlace=JP&ServiceVersion=20070822&WS=1&tag=fastfargroove-22" ></a><img src="http://ir-jp.amazon-adsystem.com/e/ir?t=fastfargroove-22&l=as2&o=9&a=4774155101" width="1" height="1" border="0" alt="" style="border:none !important; margin:0px !important;" />
