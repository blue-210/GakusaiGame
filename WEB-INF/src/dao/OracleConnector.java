package dao;

import java.sql.Connection;
import java.sql.SQLException;
import javax.sql.DataSource;
import javax.naming.NamingException;
import javax.naming.InitialContext;

public class OracleConnector implements Connector{
   private Connection conn = null;

   public Connection getConnection(){
      try{
         InitialContext inic = new InitialContext();
         DataSource source = (DataSource)inic.lookup("java:comp/env/jdbc/gakusai");
         conn = source.getConnection();
      }catch(NamingException e){
         e.printStackTrace();
      }catch(SQLException e){
         e.printStackTrace();
      }
      return conn;
   }

   public void close(){
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
}
