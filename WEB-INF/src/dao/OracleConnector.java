package dao;

import java.sql.Connection;
import java.sql.SQLException;
import java.sql.ResultSet;
import java.sql.PreparedStatement;
import javax.sql.DataSource;
import javax.naming.NamingException;
import javax.naming.InitialContext;

public abstract class OracleConnector implements Connector{
   private Connection conn = null;

   private void connect(){
      try{
         InitialContext inic = new InitialContext();
         DataSource source = (DataSource)inic.lookup("java:comp/env/jdbc/gakusai");
         conn = source.getConnection();
         conn.setAutoCommit(false);
      }catch(NamingException e){
         e.printStackTrace();
      }catch(SQLException e){
         e.printStackTrace();
      }
   }

   private void close(){
      try{
         conn.close();
      }catch(SQLException e){
         e.printStackTrace();
      }finally{
         if(conn != null){
            try{
               conn.close();
            }catch(SQLException ex){
               ex.printStackTrace();
            }
         }
      }
   }

   public ResultSet select(String sql){
      try{
         this.connect();
         PreparedStatement pstm = conn.prepareStatement(sql);
         pstm.executeQuery();
         conn.close();
      }catch(SQLException e){
         e.printStackTrace();
      }
   }

   public void update(String sql){
      try{
         this.connect();
         PreparedStatement pstm = conn.prepareStatement(sql);
         pstm.executeUpdate();
         conn.close();
      }catch(SQLException e){
         e.printStackTrace();
         conn.rollback();
      }
   }
}
