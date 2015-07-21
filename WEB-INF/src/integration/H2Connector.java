package integration;

import java.sql.Connection;
import java.sql.SQLException;
import javax.sql.DataSource;
import javax.naming.NamingException;
import javax.naming.InitialContext;

public class H2Connector extends Connector{
   public Connection getConnection(){
      Connection conn = null;
      try{
         InitialContext inic = new InitialContext();
         DataSource source = (DataSource)inic.lookup("java:comp/env/jdbc/h2");
         conn = source.getConnection();
      }catch(NamingException e){
         e.printStackTrace();
      }catch(SQLException e){
         e.printStackTrace();
      }finally{
         try{
            if(conn != null){
               conn.close();
            }
         }catch(SQLException ex){
            ex.printStackTrace();
         }
      }
      return conn;
   }
}
