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
         String currentScore = req.getParameter("score");
         String table = req.getParameter("table");
         System.out.println(table);

         // 受け取ったスコアを判定して、更新されたデータを取得。
         RankJudge judge = (RankJudge)InstanceCreator.create("judge");
         ArrayList<Double> ranking = judge.judge(Double.parseDouble(currentScore), table);

         // 順位ごとのscore用変数の初期化
         double rank1 = ranking.get(0);
         double rank2 = ranking.get(1);
         double rank3 = ranking.get(2);

         // 受け取ったランキングに現在のユーザーのスコアが含まれているか
         boolean isExisited = ranking.contains(currentScore);

         int currentRank = 0;
         if(isExisited){
            // 含まれていた場合、何位かを確認する
            currentRank = ranking.indexOf(currentScore);
            currentRank += 1;
         }

         String resJson = "{\"rank1\":"+rank1+",\"rank2\":"+rank2+",\"rank3\":"+rank3+",\"outrank\":"+currentScore+",\"currentRank\":"+currentRank+"}";
         System.out.println(resJson);
         res.setContentType("application/json; charset=utf-8");
         PrintWriter out = res.getWriter();
         out.print(resJson);
   }
}
