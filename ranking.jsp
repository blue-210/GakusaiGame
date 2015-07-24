<%@ page
   contentType="text/html ; charset=utf-8"
   pageEncoding="utf-8"
%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html lang="ja">
<head>
   <meta charset="UTF-8">
   <title>ランキング</title>
</head>
<body>
   <P>テスト</p>
   <table>
      <c:forEach var="rank" items="${ranking}" varStatus="no">
         <tr><td>${no.count}位${rank}</td></tr>
      </c:forEach>
   </table>
</body>
</html>
