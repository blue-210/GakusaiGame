-- 数字タッチゲームランク用のテーブル作成
CREATE TABLE touchranking (
   rank number(5,2),
   score number(5,2)
);

-- 間違い探しゲームのランク用のテーブル作成
CREATE TABLE diffranking(
   rank number(5,2),
   score number(5,2)
)

-- テストデータの挿入
INSERT INTO touchranking vALUES(1,3.00);
INSERT INTO touchranking vALUES(2,4.00);
INSERT INTO touchranking vALUES(3,5.00);
INSERT INTO diffranking vALUES(1,3.00);
INSERT INTO diffranking vALUES(2,4.00);
INSERT INTO diffranking vALUES(3,5.00);
