import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.RequestDispatcher;

import di.InstanceCreator;
import logic.*;

public class JudgeServlet extends HttpServlet{
   public void doGet(HttpServletRequest req, HttpServletResponse res)
      throws IOException, ServletException{
         req.setCharacterEncoding("utf-8");
         // ajaxで送ったデータを取得する
         String score = req.getParameter("score");
         String table = req.getParameter("table");
         System.out.println(score);
         System.out.println(table);

         // 受け取ったスコアを判定
         RankJudge judge = (RankJudge)InstanceCreator.create("judge");
         System.out.println("インスタンス化できてる？");
         judge.judge(Double.parseDouble(score),table);

         // 順位に変動があれば、DBを更新して、データを取得

         // 無ければ、DBからデータを取得

         // 取得したデータをrequestscopeに登録
         req.setAttribute("score",score);

         res.setContentType("text/html; charset=utf-8");
         // 結果をレスポンスする
         RequestDispatcher dispatcher = req.getRequestDispatcher("ranking");
         dispatcher.forward(req,res);
   }
}
