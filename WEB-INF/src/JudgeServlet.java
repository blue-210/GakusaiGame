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
   ArrayList<Double> ranking = null;

   public void doGet(HttpServletRequest req, HttpServletResponse res)
      throws IOException, ServletException{
         req.setCharacterEncoding("utf-8");
         // ajaxで送ったデータを取得する
         String currentScore = req.getParameter("score");
         System.out.println(currentScore);
         String table = req.getParameter("table");
         System.out.println(table);

         // 受け取ったスコアを判定して、更新されたデータを取得。
         RankJudge judge = (RankJudge)InstanceCreator.create("judge");
         ranking = judge.judge(Double.parseDouble(currentScore), table);

         // 順位ごとのscore用変数
         double score1 = ranking.get(0);
         double score2 = ranking.get(1);
         double score3 = ranking.get(2);
         double score4 = ranking.get(3);
         double score5 = ranking.get(4);
         double score6 = ranking.get(5);
         double score7 = ranking.get(6);
         double score8 = ranking.get(7);
         double score9 = ranking.get(8);
         double score10 = ranking.get(9);
         System.out.println(score1);

         // 直近のスコアの順位を確かめる
         int currentRank = ranking.indexOf(Double.parseDouble(currentScore));

         String resJson = "[{\"score\":"+score1+"},{\"score\":"+score2+"},{\"score\":"+score3+"},{\"score\":"+score4+"},{\"score\":"+score5+"},{\"score\":"+score6+"},{\"score\":"+score7+"},{\"score\":"+score8+"},{\"score\":"+score9+"},{\"score\":"+score10+"},{\"currentRank\":"+currentRank+"},{\"currentScore\":"+currentScore+"}]";

         System.out.println(resJson);
         res.setContentType("application/json; charset=utf-8");
         PrintWriter out = res.getWriter();
         out.print(resJson);
   }
}
