# 実験2(発表5/9)

マウス操作で低品質ワーカーの検出を行う

## 実装の履歴

- 4/15 typescript + gulpの環境で進めすことに決める(仮完成4/18)
- 4/20 システム仮完成

## 参考urlとか

[データセット](https://github.com/arXivTimes/arXivTimes/tree/master/datasets)

[色のデータセット](https://github.com/meodai/color-names)

[ねこのデータセット](http://www.robots.ox.ac.uk/~vgg/data/pets/)

## 発火の条件

ルールが発火するのはMember(id)のように束縛しているときのみ

そのため集合変数に変更がかかっても発火の条件にならない

## Constraint Rule

通常であれば右の結果を左に代入する動作を表す

Constraint Ruleの場合、左があれば右もあるとするというルールのため一つ消せば関連する余計なデータもすべて消すことができる