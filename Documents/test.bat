@echo off

SET v_classpath=SET classpath=

cd ../WEB-INF/lib
for %%A in (dir /b *.jar) do (
   echo %%~fA
   SET !v_classpath!=%%~fA
   echo %v_classpath%
)

cd ../../documents
