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

      if(score > score10){
         // 10位より遅かった場合、そのまま返す。
         return ranking;
      }else if(score > score9){
         // 10位よりも速いが、9位よりは遅かった場合
         // scoreを10位
         cn.update(tableName,score,10);
         return cn.select(tableName);
      }else if(score > score8){
         // 9位よりも速いが、8位よりは遅かった場合
         // score→9位、9位を10位
         cn.update(tableName,score,9);
         cn.update(tableName,score9,10);
         return cn.select(tableName);
      }else if(score > score7){
         // 8位よりも速いが、7位よりは遅かった場合
         // score→8、8→9, 9→10
         cn.update(tableName,score,8);
         cn.update(tableName,score8,9);
         cn.update(tableName,score9,10);
         return cn.select(tableName);
      }else if(score > score6){
         // 7位よりも速いが、6位よりは遅かった場合
         // score→7、7→8, 8→9
         cn.update(tableName,score,7);
         cn.update(tableName,score7,8);
         cn.update(tableName,score8,9);
         cn.update(tableName,score9,10);
         return cn.select(tableName);
      }else if(score > score5){
         // 6位よりも速いが、5位よりは遅かった場合
         cn.update(tableName,score,6);
         cn.update(tableName,score6,7);
         cn.update(tableName,score7,8);
         cn.update(tableName,score8,9);
         cn.update(tableName,score9,10);
         return cn.select(tableName);
      }else if(score > score4){
         // 5位よりも速いが、4位よりは遅かった場合
         cn.update(tableName,score,5);
         cn.update(tableName,score5,6);
         cn.update(tableName,score6,7);
         cn.update(tableName,score7,8);
         cn.update(tableName,score8,9);
         cn.update(tableName,score9,10);
         return cn.select(tableName);
      }else if(score > score3){
         // 4位よりも速いが、3位よりは遅かった場合
         cn.update(tableName,score,4);
         cn.update(tableName,score4,5);
         cn.update(tableName,score5,6);
         cn.update(tableName,score6,7);
         cn.update(tableName,score7,8);
         cn.update(tableName,score8,9);
         cn.update(tableName,score9,10);
         return cn.select(tableName);
      }else if(score > score2){
         // 3位よりも速いが、2位よりは遅かった場合
         cn.update(tableName,score,3);
         cn.update(tableName,score3,4);
         cn.update(tableName,score4,5);
         cn.update(tableName,score5,6);
         cn.update(tableName,score6,7);
         cn.update(tableName,score7,8);
         cn.update(tableName,score8,9);
         cn.update(tableName,score9,10);
         return cn.select(tableName);
      }else if(score > score1){
         // 2位よりも速いが、1位よりは遅かった場合
         cn.update(tableName,score,2);
         cn.update(tableName,score2,3);
         cn.update(tableName,score3,4);
         cn.update(tableName,score4,5);
         cn.update(tableName,score5,6);
         cn.update(tableName,score6,7);
         cn.update(tableName,score7,8);
         cn.update(tableName,score8,9);
         cn.update(tableName,score9,10);
         return cn.select(tableName);
      }else{
         // 1位よりも速い場合
         cn.update(tableName,score,1);
         cn.update(tableName,score1,2);
         cn.update(tableName,score2,3);
         cn.update(tableName,score3,4);
         cn.update(tableName,score4,5);
         cn.update(tableName,score5,6);
         cn.update(tableName,score6,7);
         cn.update(tableName,score7,8);
         cn.update(tableName,score8,9);
         cn.update(tableName,score9,10);
         return cn.select(tableName);
      }
   }
}
