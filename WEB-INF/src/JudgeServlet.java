import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.RequestDispatcher;

import java.util.ArrayList;
import di.InstanceCreator;
import logic.*;

public class JudgeServlet extends HttpServlet{
   public void doGet(HttpServletRequest req, HttpServletResponse res)
      throws IOException, ServletException{
         req.setCharacterEncoding("utf-8");
         // ajaxで送ったデータを取得する
         String score = req.getParameter("score");
         String table = req.getParameter("table");

         // 受け取ったスコアを判定して、更新されたデータを返す。
         RankJudge judge = (RankJudge)InstanceCreator.create("judge");
         ArrayList<Double> ranking = judge.judge(Double.parseDouble(score), table);

         // 受け取ったランキングに現在のユーザーのスコアが含まれているか
         boolean isExisited = ranking.contains(score);

         // アプリケーションスコープにセット
         req.setAttribute("ranking",ranking);
         req.setAttribute("score", score);

         res.setContentType("text/html; charset=utf-8");
         // 結果をレスポンスする
         RequestDispatcher dispatcher = req.getRequestDispatcher("ranking");
         dispatcher.forward(req,res);
   }
}
