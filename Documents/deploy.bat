@echo off

rem いったんアプリを削除
rd /s /q \\172.19.253.32\public\H26\gakusai2015\GakusaiGame

rem 学祭ゲームをサーバーにデプロイ
ROBOCOPY C:\GitHub\GakusaiGame \\172.19.253.32\public\H26\gakusai2015\GakusaiGame /E
