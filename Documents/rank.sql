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

-- テストデータの挿入
INSERT INTO touchranking vALUES(1,3.00);
INSERT INTO touchranking vALUES(2,4.00);
INSERT INTO touchranking vALUES(3,5.00);
INSERT INTO diffranking vALUES(1,3.00);
INSERT INTO diffranking vALUES(2,4.00);
INSERT INTO diffranking vALUES(3,5.00);

commit;
