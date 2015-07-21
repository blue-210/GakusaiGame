package test;

import integration.*;
import java.sql.SQLException;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.DriverManager;

public class H2Test{
   public static void main(String[] args) {
      Connector cn = new H2Connector();
      Connection conn = cn.getConnection();

      try{
         String sql = "SELECT * FROM diffranking";

         PreparedStatement stm = conn.prepareStatement(sql);

         ResultSet rs = stm.executeQuery();

         while(rs.next()){
            System.out.println(rs.getString("rank")+" "+rs.getString("score"));
         }
      }catch(SQLException e){
         e.printStackTrace();
      }

   }
}
