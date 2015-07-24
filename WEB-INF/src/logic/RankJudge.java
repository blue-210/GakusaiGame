package logic;

import dao.*;
import di.InstanceCreator;
import java.util.ArrayList;


public class RankJudge{
   private Connector cn;

   public void setConnector(Connector cn){
      this.cn = cn;
   }

   public ArrayList<Double> judge(double score, String tableName){
      // 表からデータを取得
      ArrayList<Double> ranking = cn.select(tableName);

      double rank1 = ranking.get(0);
      double rank2 = ranking.get(1);
      double rank3 = ranking.get(2);

      if(rank3 < score){
         // 3位より時間がかかっていた場合
         // 更新なし
         return ranking;
      }else if(rank2 < score){
         // 3位よりも速いが、2位よりは遅かった場合
         // score→3位で更新
         cn.update(tableName,score,3);

         ranking = cn.select(tableName);
         for(Double i : ranking){
            System.out.println("In RankJudge rank2 < score "+i);
         }

         return ranking;
      }else if(rank1 < score){
         // 2位よりも速いが、1位よりは遅かった場合
         // score→2位、2位を3位で更新
         cn.update(tableName,score,2);
         cn.update(tableName,rank2,3);

         ranking = cn.select(tableName);
         for(Double i : ranking){
            System.out.println("In RankJudge rank1 < score "+i);
         }

         return ranking;
      }else if(rank1 > score){
         // 1位よりも速かった場合
         // 順位を更新 socre→1位、1位→2位、2位→3位で更新
         cn.update(tableName,score,1);
         cn.update(tableName,rank1,2);
         cn.update(tableName,rank2,3);

         ranking = cn.select(tableName);
         for(Double i : ranking){
            System.out.println("In RankJudge rank1 < score "+i);
         }
         return ranking;
      }
      return ranking;
   }
}
