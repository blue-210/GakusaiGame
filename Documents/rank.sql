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
INSERT INTO touchranking VALUES(4,5.79);
INSERT INTO touchranking VALUES(5,5.79);
INSERT INTO touchranking VALUES(6,5.79);
INSERT INTO diffranking VALUES(1,3.04);
INSERT INTO diffranking VALUES(2,4.21);
INSERT INTO diffranking VALUES(3,5.66);
INSERT INTO diffranking VALUES(4,5.66);
INSERT INTO diffranking VALUES(5,5.66);
INSERT INTO diffranking VALUES(6,5.66);
commit;

-- テストデータの修正
UPDATE touchranking SET rank=1, score=3.13 WHERE rank = 1;
UPDATE touchranking SET rank=2,score=4.34 WHERE rank = 2;
UPDATE touchranking SET rank=3,score=5.79 WHERE rank = 3;
UPDATE touchranking SET rank=4,score=6.79 WHERE rank = 4;
UPDATE touchranking SET rank=5,score=7.79 WHERE rank = 5;
UPDATE touchranking SET rank=6,score=8.79 WHERE rank = 6;

UPDATE diffranking SET rank=1,score=3.04 WHERE rank = 1;
UPDATE diffranking SET rank=2,score=4.22 WHERE rank = 2;
UPDATE diffranking SET rank=3,score=5.66 WHERE rank = 3;
UPDATE diffranking SET rank=4,score=6.66 WHERE rank = 4;
UPDATE diffranking SET rank=5,score=7.66 WHERE rank = 5;
UPDATE diffranking SET rank=6,score=8.66 WHERE rank = 6;
commit;
