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
   <script type="text/javascript" src="BootStrap/jquery-2.1.4.js"></script>
   <script type="text/javascript" src="BootStrap/js/bootstrap.min.js"></script>
   <script type="text/javascript" src="BootStrap/ranking.js"></script>
   <!--BootStrap-->
   <link href="BootStrap/css/bootstrap.min.css" rel="stylesheet">
</head>
<body>
   <div class="modal fade" id="ranking" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
     <div class="modal-dialog">
       <div class="modal-content">
         <div class="modal-header">
           <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">閉じる</span></button>
           <h4 class="modal-title text-center text-primary" id="myModalLabel">ランキング</h4>
         </div>
         <div class="modal-body text-center" id="record">
            <table class="table">
             <tr><th>RANK</th><th>SCORE</th></th>
              <c:choose>
               　　<c:when test="${}"></c:when>
               　　<c:otherwise></c:otherwise>
               </c:choose>
                 <tr><td>${no.count}</td><td>${rank}</td></tr>
              </c:forEach>
            </table>
         </div>
       </div><!-- /.modal-content -->
     </div><!-- /.modal-dialog -->
   </div><!-- /.modal -->

</body>
</html>
