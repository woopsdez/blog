---
layout: post
title: Floaty Color Clock開発で得られたこと
categories: private-works
banner_image: "/content/images/2016/05/undefinde-variables/fcc-screenshot.png"
featured: true
comments: true
---

「クリックでふわっと動くアレやコレ」を作ってみたい。そんな思いから着手したFloaty Color Clockですが、ついでで開発しはじめた天気予報機能が難しく思わぬ方向に…。この記事は開発中の思い出話を書いていきます。

## Undefindの嵐

[7年前のPHPコード](https://github.com/woopsdez/omikujigohan)、[おみくじゴハン](http://omikujigohan.woopsdez.jp/)のリファクタリング、そして[Floaty Color Clock](http://woopsdez.github.io/floaty-color-clock/)の開発。

どちらもNotice, undefindの嵐でした。わたしが良く怒られたケースはこちら。

{% highlight javascript linenos %}
	if(fuga === true){
		var hoge = fuga; // fugaがtrueじゃないとif文の中を通らない
	}
	var hage = hoge * 2; //するとhogeはここで初出になる
{% endhighlight %}

if文の中で使ったあと、後に続く処理でしれっと変数を呼び出していると怒られるのですね。

じゃあ、ちゃんとif文を経由させたり、if文を経由しなくても値が入ってるようにすれば良いのでは？と、グローバルで変数に初期値を入れておいたり、isset()やundefindチェックをしたりしています。

HTML内で呼び出すこともあるので、長ったらしい文になるのは避けたいところ。

{% highlight php linenos %}
<!-- これが -->
<img src="<?php echo $hoge ?>">
<!-- こうなってしまう -->
<img src="<?php if(isset($hoge)){echo $hoge} ?>">
{% endhighlight %}

## 関数内で完結させる
プログラミングの師匠([@tai2](http://blog.tai2.net/))に、アドバイスを求めたところ下記の返答をいただきました。

>「グローバルで変数を定義し、関数内でもやりとりさせてしまっているのをやめ、関数で完結させる。値は引数として受け渡しするといい。」

なるほどなるほど。

マインクラフト内でのLuaプログラミングでは、それができていたのに今回の開発ではしっちゃかめっちゃかになってしまっていました。

自分のスキルより難しい実装が入ると、コード全体の把握がおろそかになってしまうのがわたしの悪いクセ。

{% include image_caption.html imageurl="http://ecx.images-amazon.com/images/I/51wBC4deA4L._M500_.jpg" title="右京さんの口癖" href="http://www.amazon.co.jp/gp/product/4569792189/ref=as_li_ss_il?ie=UTF8&camp=247&creative=7399&creativeASIN=4569792189&linkCode=as2&tag=fastfargroove-22" %}

## ユーザー設定がある場合の初期値のやりくりが苦手
「二回目に処理するとき、一回目に保存しておいた値があるならそちらを利用する。」というのがうまく書けません。

{% highlight js linenos %}
var color = 'white'; // 初期値
if(user.setColor !== undefind){ //ユーザーが設定した値があるかどうか
	color = user.setColor; //あれば、初期値として扱う
}
{% endhighlight %}

こんな感じで書けばいいのですよね。いまもですが、分岐の流れ、今はどこの処理に辿りついたかを理解するのに時間がかかります。

{% include image_caption.html imageurl="/content/images/2016/05/undefinde-variables/702167001386764518.gif" title="映画のようにはなかなかいかない" href="" %}

![]()

## 時刻に合わせて回転する画像
他の方から見れば簡単なことですが、算数が苦手なわたしは「よくこの実装を思いつけたな」と有頂天になっています。

小学校で習った「割合の公式」の出番です!

>
* 「割合」＝「比べる値」÷「もとの値」
* 「比べる値」＝「もとの値」×「割合」
* 「もとの値」＝「比べる値」÷「割合」

まず、24時間を円とみなして、現在時刻ではどの角度にいるのかを割り出す必要があります。

必要な値として

* 24時間の秒数(86400s)
* 0時から現在時刻までの秒数
* 24時間を100%とした時の現在時刻の割合
* 円の角度 360°

が分かればあとは

{% highlight javascript linenos %}
var per = _nowsec / 86400 //割合を求める
var nowdeg = _per * 360 // 360°中 per%は何°になるかが分かる
{% endhighlight %}

という式で求められるのですね。

あとはこの値を、jQueryにてcssのプロパティにセットしていけばOKです。

{% highlight javascript linenos %}
$('.bg image').css('transform','rotate('+ nowdeg +'deg)')
{% endhighlight%}

上記がhtml内で毎秒実行される訳です。

cssの値を変更するのだから、cssファイルの書き換えを行うのでは？それにはどうしたら？と疑問に思ってましたが、jsでhtml内にインラインで書いちゃえばいいのですよね。

すでに知っている知識でも、いっぱいいっぱいになるとこぼれ落ちちゃう。

## Qiitaに投稿しています。

![http://qiita.com/woopsdez](/content/images/2016/05/undefinde-variables/qiita-woopsdez.png)

* [Chromeエクステンションで、どうしてもJSONPでやりとりしないといけない場合の対処 - Qiita](http://qiita.com/woopsdez/items/bc6108460de13d668e78)
* [gulpでのgit操作 commit messageをコマンドライン引数で渡そう - Qiita](http://qiita.com/woopsdez/items/cb0e59245d4ee13e8ae5)
* [jekyllで構築したサイト、本番へアップしたらcssが適用されない場合に試しておきたいbaseurlの便利な変更の仕方。 - Qiita](http://qiita.com/woopsdez/items/cc2b64800a6de3112920)

ぜひチェックしてくださいな。