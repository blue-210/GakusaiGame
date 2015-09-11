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
         double rank1 = ranking.get(0);
         double rank2 = ranking.get(1);
         double rank3 = ranking.get(2);
         double rank4 = ranking.get(3);
         double rank5 = ranking.get(4);
         double rank6 = ranking.get(5);
         double rank7 = ranking.get(6);
         double rank8 = ranking.get(7);
         double rank9 = ranking.get(8);
         double rank10 = ranking.get(9);

         // 直近のスコアの順位を確かめる
         int currentRank = ranking.indexOf(Double.parseDouble(currentScore));

         String resJson = "{\"rank1\":"+rank1+",\"rank2\":"+rank2+",\"rank3\":"+rank3+",\"rank4\":"+rank4+",\"rank5\":"+rank5+",\"rank6\":"+rank6+",\"rank7\":"+rank7+",\"rank8\":"+rank8+",\"rank9\":"+rank9+",\"rank10\":"
         +rank10+",\"currentRank\":"+currentRank+"}";
         System.out.println(resJson);
         res.setContentType("application/json; charset=utf-8");
         PrintWriter out = res.getWriter();
         out.print(resJson);
   }
}
