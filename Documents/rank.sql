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
   rank number(2),
   score number(5,2)
);

-- 間違い探しゲームのランク用のテーブル作成
CREATE TABLE diffranking(
   rank number(2),
   score number(5,2)
);

TRUNCATE TABLE touchranking;
TRUNCATE TABLE diffranking;

-- テストデータの挿入
-- 数字タッチゲーム
INSERT INTO touchranking VALUES(1,3.04);
INSERT INTO touchranking VALUES(2,4.21);
INSERT INTO touchranking VALUES(3,5.66);
INSERT INTO touchranking VALUES(4,5.67);
INSERT INTO touchranking VALUES(5,6.12);
INSERT INTO touchranking VALUES(6,6.14);
INSERT INTO touchranking VALUES(7,6.20);
INSERT INTO touchranking VALUES(8,6.30);
INSERT INTO touchranking VALUES(9,7.12);
INSERT INTO touchranking VALUES(10,8.21);
-- 間違い探しのデータ
INSERT INTO diffranking VALUES(1,3.04);
INSERT INTO diffranking VALUES(2,4.21);
INSERT INTO diffranking VALUES(3,5.66);
INSERT INTO diffranking VALUES(4,5.67);
INSERT INTO diffranking VALUES(5,6.12);
INSERT INTO diffranking VALUES(6,6.14);
INSERT INTO diffranking VALUES(7,6.20);
INSERT INTO diffranking VALUES(8,6.30);
INSERT INTO diffranking VALUES(9,7.12);
INSERT INTO diffranking VALUES(10,8.21);
commit;

-- テストデータの修正
UPDATE touchranking SET rank=1, score=3.13 WHERE rank = 1;
UPDATE touchranking SET rank=2,score=4.34 WHERE rank = 2;
UPDATE touchranking SET rank=3,score=5.60 WHERE rank = 3;
UPDATE touchranking SET rank=4,score=6.22 WHERE rank = 4;
UPDATE touchranking SET rank=5,score=7.33 WHERE rank = 5;
UPDATE touchranking SET rank=6,score=8.44 WHERE rank = 6;

UPDATE diffranking SET rank=1,score=3.04 WHERE rank = 1;
UPDATE diffranking SET rank=2,score=4.22 WHERE rank = 2;
UPDATE diffranking SET rank=3,score=4.66 WHERE rank = 3;
UPDATE diffranking SET rank=4,score=4.68 WHERE rank = 4;
UPDATE diffranking SET rank=5,score=5.66 WHERE rank = 5;
UPDATE diffranking SET rank=6,score=5.58 WHERE rank = 6;
UPDATE diffranking SET rank=7,score=6.12 WHERE rank = 7;
UPDATE diffranking SET rank=8,score=7.23 WHERE rank = 8;
UPDATE diffranking SET rank=9,score=8.54 WHERE rank = 9;
UPDATE diffranking SET rank=10,score=9.32 WHERE rank = 10;
commit;
