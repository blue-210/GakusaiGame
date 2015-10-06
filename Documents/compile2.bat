cd C:\public\H26\gakusai2015\GakusaiGame\WEB-INF\src
set classpath=.;C:\public\H26\gakusai2015\GakusaiGame\WEB-INF\lib\aopalliance-1.0.jar;C:\public\H26\gakusai2015\GakusaiGame\WEB-INF\lib\commons-logging-1.2.jar;C:\public\H26\gakusai2015\GakusaiGame\WEB-INF\lib\servlet-api.jar;C:\public\H26\gakusai2015\GakusaiGame\WEB-INF\lib\spring-aop-4.1.6.RELEASE.jar;C:\public\H26\gakusai2015\GakusaiGame\WEB-INF\lib\spring-beans-4.1.6.RELEASE.jar;C:\public\H26\gakusai2015\GakusaiGame\WEB-INF\lib\spring-context-4.1.6.RELEASE.jar;C:\public\H26\gakusai2015\GakusaiGame\WEB-INF\lib\spring-core-4.1.6.RELEASE.jar;C:\public\H26\gakusai2015\GakusaiGame\WEB-INF\lib\spring-expression-4.1.6.RELEASE.jar

javac -encoding utf-8 *.java -d ../classes
javac -encoding utf-8 logic/*.java -d ../classes
javac -encoding utf-8 dao/*.java -d ../classes
javac -encoding utf-8 di/*.java -d ../classes

cd C:\public\H26\gakusai2015\GakusaiGame\Documents
