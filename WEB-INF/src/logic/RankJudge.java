package logic;

import dao.*;
import di.InstanceCreator;

import java.sql.SQLException;
import java.sql.ResultSet;

public class RankJudge{
   private Connector connector;
   private String sql = "SELECT score FROM";

   public void setConnector(Connector connector){
      this.connector = connector;
   }

   public boolean judge(double score, String tableName){
      ResultSet rs = connector.select(sql+tableName+" ORDER BY rank");
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
