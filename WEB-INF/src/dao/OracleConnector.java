package dao;

import java.sql.Connection;
import java.sql.SQLException;
import java.sql.ResultSet;
import java.sql.PreparedStatement;
import javax.sql.DataSource;

import javax.naming.NamingException;
import javax.naming.InitialContext;

import java.util.ArrayList;

public class OracleConnector extends Connector{
   private Connection conn = null;
   private ResultSet rs = null;
   private ArrayList<Double> ranking = new ArrayList<>();

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

   public ArrayList<Double> select(String tableName){
      String sql = "SELECT score FROM ";
      sql = sql.concat(tableName+" ORDER BY rank");

      try{
         this.connect();

         PreparedStatement pstm = conn.prepareStatement(sql);
         rs = pstm.executeQuery();

         while(rs.next()){
            ranking.add(rs.getDouble("score"));
         }

         pstm.close();
         rs.close();
         this.close();
      }catch(SQLException e){
         e.printStackTrace();
      }
      return ranking;
   }

   public void update(String tableName, double score, int rank){
      String sql = "UPDATE ";
      sql = sql.concat(tableName+" SET score=?, rank=? WHERE rank=?");
      try{
         this.connect();

         PreparedStatement pstm = conn.prepareStatement(sql);
         pstm.setDouble(1,score);
         pstm.setInt(2,rank);
         pstm.setInt(3,rank);

         pstm.executeUpdate();
         conn.commit();

         pstm.close();
         rs.close();
         this.close();
      }catch(SQLException e){
         e.printStackTrace();
         try{
            conn.rollback();
         }catch(SQLException ex){
            ex.printStackTrace();
         }
      }
   }
}
