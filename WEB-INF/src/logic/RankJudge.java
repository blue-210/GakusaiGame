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

      if(score > ranking.get(2)){
         // 3位より時間がかかっていた場合
         // 更新なし
         return ranking;
      }else if(score > ranking.get(1)){
         // 3位よりも速いが、2位よりは遅かった場合
         // score→3位で更新
         cn.update(tableName,score,3);
         return ranking = cn.select(tableName);
      }else if(score > ranking.get(0)){
         // 2位よりも速いが、1位よりは遅かった場合
         // score→2位、2位を3位で更新
         cn.update(tableName,score,2);
         cn.update(tableName,ranking.get(1),3);
         return ranking = cn.select(tableName);
      }else if(score < ranking.get(0)){
         // 1位よりも速かった場合
         // 順位を更新 socre→1位、1位→2位、2位→3位で更新
         cn.update(tableName,score,1);
         cn.update(tableName,ranking.get(0),2);
         cn.update(tableName,ranking.get(1),3);
         return ranking = cn.select(tableName);
      }
      return ranking;
   }
}
