import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.RequestDispatcher;

import di.InstanceCreator;
import test.OracleConnectionTest;

public class JudgeServlet extends HttpServlet{
   public void doGet(HttpServletRequest req, HttpServletResponse res)
      throws IOException, ServletException{
         req.setCharacterEncoding("utf-8");
         // ajaxで送ったデータを取得する
         String score = req.getParameter("score");
         System.out.println(score);

         String resJson = "{\"score\":"+score+"}";
         res.setContentType("application/json; charset=utf-8");
         PrintWriter out = res.getWriter();
         out.print(resJson);

         OracleConnectionTest.testDb();
         // RequestDispatcher dispatcher = req.getRequestDispatcher("ranking");
         // 受け取ったスコアを判定する
         //RankJudge judge = (RankJudge)InstanceCreator.create("judge");
   }
}
