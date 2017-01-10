---
layout: post
title: プロトタイピングにまつわる低レベルな問題
categories: works
date: '2016-12-18 20:25:14'
banner_image: "/content/images/2016/12/low-level-problems-related-to-prototyping/banner.jpg"
featured: true
comments: true
published: true
---

まわりではすでにプロトタイプからの開発が当たり前のようで、議論に入る前でつまづいている事があるのは少し恥ずかしいです。しかし、同じような誤ちをした事がある人、これからする人は絶対いると思うので、備忘録としてまとめておきます。

<!--more-->

* 作り込みすぎ問題
* 精度が低すぎて役に立たない問題
* 議論に適切なプロトタイピングの粒度が分からない問題

自分がやってるとざっとこんな感じのトコロで躓いちゃうことがありました。

## そんなに作る必要ある？問題

利用するソフトがグラフィックデザイン向けソフトではなく、Sketchなどの画面設計用のソフトに移行したのですが、肝心の本人の**脳味噌が設計脳に移行できていない**事があります。

たとえば、何か新しいアプリを作りはじめるとしましょう。

まだアナタの頭の中にしかイメージがないので、他のメンバーにどういうアプリなのかを伝える必要があります。この時に必要な情報は「何ができるアプリなのか」だけでなく「どういう操作でそれが達成できるのか」だとしましょう。

どこをタップして、フリックして選ぶと、こうなる。というストーリーが伝わればいいという段階です。

それなのに、色はどうしよう。フォント、これがいいかな？など**本質ではない事柄に注力してしまう**事が問題なのです。

{% include image_caption.html imageurl="/content/images/2016/12/low-level-problems-related-to-prototyping/02.png" title="画像：Adobe XDで作った、名付けアプリの低精度プロトタイプ" %}

低精度プロトタイプなのにちょっとキレイに作っちゃってますね。

* 最初に入力させる情報は何か
* 名付けのどういった問題を解決しているのか

上記を知るのには、画面の要素が分かればいいのに、書体とかヘッダーの色とかデザイナーが故に調整できてしまって変に時間かけてしまう。

こうなるくらいなら**いっそUIパーツだけで構築するなどの縛りを入れた方がいいのかもしれない**と考えています。

グラフィックソフトに慣れてしまっているだけに、似たようなインターフェイスのソフトを開くと条件反射的にグラフィックデザイナーモードになってしまう時があるので、意識的に動かないと時間をムダにしちゃう時がありました。

グラフィックデザインできる人が低精度プロトタイプ作らないように役割分担するのもアリかも。

## 精度が低すぎて役に立たない問題

{% include image_caption.html imageurl="/content/images/2016/12/low-level-problems-related-to-prototyping/uianimation.gif" title="画像：こんなに動くの簡単に作れて、スゴいねー。" %}

インターフェイス実装・機能開発に必要な工数見積をするのに、UIを決定しないといけない事がありました。

開発途中の画面を見ながらおのおのがジェスチャーで議論をするのですが、いまいち伝えきれないもどかしさをメンバーが感じていたので、プロトタイプを作ることにしました。

各自がそれぞれ絵コンテを用意し、自分がPrincipleを使って実装してみたのですが、結論から言うと議論に役立てられませんでした。

UIパーツ群を利用して作ったプロトタイピングは、四角が並んでいるだけなのです。

* 実際にどのようなコンテンツが入るのか
* 操作パネルを上に重ねた場合にみづらくならないか
* ホバーエリアは十分に確保できているか

という点を確認できないプロトタイピングだったので、議論の冒頭で動きだけみて「すごいねー」で終わってしまったのです。とほほ。

**議論に間に合わせることにフォーカスしすぎて、精度をおろそかにしてしまいました。**もう少し時間をかけて高精度なプロトタイプを作ってみてからの議論でも良かったなと思います。

サービスをアジャイルで開発しているので、定例のたびになるべく見える成果を出したくなってしまいます。そうすると、自分の場合は精度が犠牲になりがちだなと感じました。

高精度プロトタイピングを作る過程で、サービスの理解を深められることもあるので、そこは焦らずしっかり工数をとるべきだったなと思います。

## 議論に適切なプロトタイピングの精度が分からない問題

上記に関連するのですが、サービス開発やプロトタイピングに慣れていない場合、今どのフェーズで議論しているのかを見誤りやすく、議論してみるまで適切な精度が分からない事がありました。

デザイナーである自分がしっかりハンドリングすべき！できればそうしたい！ってのがあるんですが、これはエゴですね。サービスの軸となるメンバーにしっかり頼り、MTGでどういう部分をクリアにするのか事前に握っておけば良かったのかもしれません。

あとは、サービス開発フローチャートとか作ってみてクライアントやチームに共有し、自分がプロジェクトをちゃんと俯瞰で見れているのか認識するとかでしょうか。

サービス開発のフェーズとかフローを一般化している企業さんとか多いと思うので、なんかそういう資料良いのがあったら教えてください。

## まとめ

記事に書くことで振り替えってみると、なんとか試みが見えてきますね。

自分の中の頭で起こっていることは普通のことで、それ以外の事はちょっと変わったこと。

UIデザイン実装で議論をしていると「えー、普通こうじゃない？」と思ってしまう事があり、**何故それが普通だと思うのが、その方が良いのかを自問自答してみると思い込みでしかない。**決定的な説得力には欠けるという事に気付かされます。

個人差はありますが、プロトタイピングは**それらの差を少しずつ縮めていく作業だと思えるようになってきました。**

UIデザインは、チームみんなが議論ができるエモい部分がすごくあります。コードレビューやデザインレビューとは違い、いろんな立場の人がいり乱れて話ができるのが良いですね。

ネガティブな意見もポジティブな意見も億さず言える環境作りが、すごく大切です。

この問題を振り替えることで、手法以前の問題も浮き彫りになりました。さまざまなカタチでwebに関っていますが、もう少しここの部分をさまざまな企業さんと一緒にやってみたいです。