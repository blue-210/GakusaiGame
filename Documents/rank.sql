conn system/orcl

-- 学園祭ゲーム管理者ユーザー作成
create user gakusai
   identified by game
   default TABLESPACE users
   temporary tablespace TEMP
   quota UNLIMITED on users;

-- ユーザーへの権限付与
GRANT
   CONNECT,
   RESOURCE
TO gakusai;

-- 表削除
DROP TABLE touchranking;
DROP TABLE diffranking;

-- 数字タッチゲームランク用のテーブル作成
CREATE TABLE touchranking (
   rank number(1),
   score number(5,2)
);

-- 間違い探しゲームのランク用のテーブル作成
CREATE TABLE diffranking(
   rank number(1),
   score number(5,2)
);

TRUNCATE TABLE touchranking;
TRUNCATE TABLE diffranking;

-- テストデータの挿入
INSERT INTO touchranking VALUES(1,3.13);
INSERT INTO touchranking VALUES(2,4.34);
INSERT INTO touchranking VALUES(3,5.79);
INSERT INTO diffranking VALUES(1,3.04);
INSERT INTO diffranking VALUES(2,4.20);
INSERT INTO diffranking VALUES(3,5.66);
commit;

-- テストデータの修正
UPDATE touchranking SET rank=1, score=3.13 WHERE rank = 1;
UPDATE touchranking SET rank=2,score=4.34 WHERE rank = 2;
UPDATE touchranking SET rank=3,score=5.79 WHERE rank = 3;
UPDATE diffranking SET rank=1,score=3.04 WHERE rank = 1;
UPDATE diffranking SET rank=2,score=4.20 WHERE rank = 2;
UPDATE diffranking SET rank=3,score=5.66 WHERE rank = 3;
commit;
