package logic;

import dao.*;
import di.InstanceCreator;

import java.sql.SQLException;
import java.sql.ResultSet;
import java.sql.PreparedStatement;

public class RankJudge{
   private Connector cn;
   private String sql = "SELECT score FROM ";

   public void setConnector(Connector cn){
      this.cn = cn;
   }

   public boolean judge(double score, String tableName){
      sql.concat(tableName);
      System.out.println(sql);
      ResultSet rs = cn.select(sql);
      System.out.println(rs);
      try{
         while(rs.next()){
             double no = rs.getDouble(1);
             System.out.println(no);
         }
      }catch(SQLException e){
         e.printStackTrace();
      }
      return true;
   }
}
