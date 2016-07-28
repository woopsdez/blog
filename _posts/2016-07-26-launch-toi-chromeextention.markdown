---
layout: post
title: "Twitterの画像を原寸表示するChrome拡張をリリースしました。"
categories: works
banner_image: "/content/images/2016/07/launch-toi-chromeextention/banner.png"
featured: true
comments: true
published: true
---

Twitterをブラウザで見ていると、画像が小さく、文字が書いてあると見辛くて仕方がないのでChrome拡張を自作しました。

<!--more-->

似たような拡張はいくつかあったのですが、わたしがインストールしたものはうまく動かなかったので、習作を兼ねて。と、いうことにしています。

<small>例にもれず、後から高機能でちゃんと動作するものが見つかるというお決まりのパターンでした。</small>

![](/content/images/2016/07/launch-toi-chromeextention/02.png)
[TOI Twitter元画像ビューアー - Chrome ウェブストア](https://chrome.google.com/webstore/detail/twitter-original-images-m/gngemdehcfeffjiifgpjedncfppnmcko)

下手くそながら、二ヶ国語対応した自分、褒めたい! ぜひダウンロードしてやってくださいね。

## 動作概要
* Gallery(画像表示用モーダル)表示時にボタンを追加
* ボタン or キーボード操作時、画像に付与されているstyleを除去
* 除去前にstyleを変数に格納し、原寸から表示用サイズに戻ることもできる(ボタン、キーボードでのトグル操作)

こんな風に動きます。

<style>.embed-container { position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; max-width: 100%; } .embed-container iframe, .embed-container object, .embed-container embed { position: absolute; top: 0; left: 0; width: 100%; height: 100%; }</style><div class='embed-container'><iframe src='https://www.youtube.com/embed/dhz06Hh_Yno' frameborder='0' allowfullscreen></iframe></div>

## 苦労したこと

Chromeのデベロッパーツールで、画像を原寸表示にするのは非常に簡単です。適用されているスタイルをはずして、真ん中寄せにしてあげるだけで意図した表示にできました。「お、こりゃスグにできるな。」なんて思ったり。

しかし、それをChrome拡張で実装するのには、いくつかの工夫と学習が必要でした。

## 自動で原寸表示に失敗

![](/content/images/2016/07/launch-toi-chromeextention/03.png)
この表示がGallery。

最初は、画像をGalleryで表示する時点で、勝手に原寸表示にしようとしていました。

しかし、クリックするまではGallery内に画像はロードされていないので、jsロード時に見当らない要素をいくら操作してもなんにも動かないのです。

```js
$('.Gallery-content').removeAttr('Style');
$('.Gallery-media img').removeAttr('Style');
```

.Gallery-content、.Gallery-media img、どちらも画像クリックするまでは追加されない要素なので、こう書いても実行されない。

## ボタンクリックで発火

と、言うことは画像が表示されてから、上記コードを実行する必要があります。

想定していた動作イメージと違いクリックが必要になってしまったので、ちょっと苦しいなと思いつつ自分の技量で実装できる事を優先。

```js
$('.Gallery-content').append(
	'<button type="button" id="toi-btn" class="toi-btn"><img src="' + imgURL + '" alt="View original size" /><span>Open!</span></button>'
);
$('#toi-btn').on('click', function(e){
	$('.Gallery-content').removeAttr('Style');
	$('.Gallery-media img').removeAttr('Style');
});
```

画像を表示されているdiv.Gallery-content内にボタンを追加。そのボタンがクリックされたら、スタイルを除去するコードが実行されるように。

![](/content/images/2016/07/launch-toi-chromeextention/04.png)

左上の丸いのがボタン。

## 用済みのボタンの処理

無事、画像は原寸表示できるようになりました。しかしコード実行後、クリックしても動かないボタンが表示されたままになってしまう。

せっかくだから、原寸表示ができるようになったらボタンを非表示にしたい。そして、表示用のサイズに戻ったらまたボタンを表示させたくなります。

削除するのは簡単。クリックされた時に自分自身をremove()すれば良い。しかし、また画像が表示用サイズに戻ったときに再度ボタンを追加するのが出来なかった。

拡張開発時は、Gallery自体がhtmlとしてloadされているような挙動だったので、unloadを検知してボタンの追加ができないか模索してみたのですが、ダメでした。

### ページを閉じる、更新時などに特定の動作ができる.unload()

facebookなどでよくある、投稿フォームに文字が残っていたら「リロード本当にするの？」みたいに質問してくるヤツとかがコレで真似できます。

![](/content/images/2016/07/launch-toi-chromeextention/01.png)

## Nodeの変化を監視できる？
そのような事を旦那さんに話したら、MutationObserverというのがある、それで監視ができるらしいと教えてもらいました。

[MutationObserver - Web APIs MDN](https://developer.mozilla.org/en/docs/Web/API/MutationObserver)

htmlを読み込んだり読み込まなかったりしていたので、.unload()などのメソッドばかり調べていたけど、監視!

そうか、変化を監視してコールバックで指定した関数を実行すればいいんですねー! なるほどなるほど。

```js
var config = { attributes: true, childList: true, characterData: true };
var parent = document.getElementsByClassName('Gallery-content');
var target = document.getElementsByClassName('media-image');
var mo = new MutationObserver(function(){
	mm.observe(target[0], config);
});
var mm = new MutationObserver(function(){
	getStyles()
	setStyles()
});
mo.observe(parent[0], config);
mo.disconnect();
```

あんまりキレイなコードではないですが、動きました!

### 監視対象を入れ子にしてみた

親要素である.Gallery-contentを監視して、そこに変化があれば子要素である.media-imageを監視開始。変更があった時に処理を実行するようにしました。

監視をやめるタイミングとかがまだ良く分かってないのですが、ちまちま使っていって理解を深めたいと思ってます。

でも、これによって別の画像を開いたときも検知できるようになりました。

むしろ、これ使えばクリック不要で原寸画像表示させられるし最初からこれだけでいけたのでは…？

いやでも、ユーザーが任意に実行するという事が大切なので、自動置き換えを実装したとしてもオプションで選べるようにしようと思います。

## 動作不備報告など

[https://github.com/woopsdez/Twitter-original-image-chromeextension/issues](https://github.com/woopsdez/Twitter-original-image-chromeextension/issues)

TwitterやFacebookなどでメッセージいただいても良いのですが、自分で登録するのも面倒なのでこちらに書いてもらえた方がありがたいです。