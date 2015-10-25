@echo off

cd C:\public\H26\gakusai2015\GakusaiGame\WEB-INF\src

set classpath=.;C:\public\H26\gakusai2015\GakusaiGame\WEB-INF\lib\aopalliance-1.0.jar;C:\public\H26\gakusai2015\GakusaiGame\WEB-INF\lib\commons-logging-1.2.jar;C:\public\H26\gakusai2015\GakusaiGame\WEB-INF\lib\servlet-api.jar;C:\public\H26\gakusai2015\GakusaiGame\WEB-INF\lib\spring-aop-4.1.6.RELEASE.jar;C:\public\H26\gakusai2015\GakusaiGame\WEB-INF\lib\spring-beans-4.1.6.RELEASE.jar;C:\public\H26\gakusai2015\GakusaiGame\WEB-INF\lib\spring-context-4.1.6.RELEASE.jar;C:\public\H26\gakusai2015\GakusaiGame\WEB-INF\lib\spring-core-4.1.6.RELEASE.jar;C:\public\H26\gakusai2015\GakusaiGame\WEB-INF\lib\spring-expression-4.1.6.RELEASE.jar

@echo on
start /b javac -encoding utf-8 *.java -d ../classes
start /b javac -encoding utf-8 logic/*.java -d ../classes
start /b javac -encoding utf-8 dao/*.java -d ../classes
start /b javac -encoding utf-8 di/*.java -d ../classes

@echo off
cd C:\public\H26\gakusai2015\GakusaiGame\Documents

rd /s /q \\172.19.253.32\public\H26\gakusai2015\GakusaiGame

ROBOCOPY C:\GitHub\GakusaiGame \\172.19.253.32\public\H26\gakusai2015\GakusaiGame /E
