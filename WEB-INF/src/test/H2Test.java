package test;

import integration.*;
import java.sql.SQLException;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

public class H2Test{
   public static void main(String[] args) {
      Connector cn = new H2Connector();
      Connection conn = cn.getConnection();
      String sql = "SELECT * FROM touchranking";

      try{
         PreparedStatement stm = conn.prepareStatement(sql);

         ResultSet rs = stm.executeQuery();

         while(rs.next()){
            System.out.println(rs.next());
         }
      }catch(SQLException e){
         e.printStackTrace();
      }

   }
}
