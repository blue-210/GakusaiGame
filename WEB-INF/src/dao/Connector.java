package dao;

import java.sql.Connection;
import java.sql.ResultSet;
import java.util.ArrayList;

public abstract class Connector{
   private void Connect(){}
   private void close(){}
   public abstract ArrayList<Double> select(String tableName);
   public abstract void update(String tableName, double score, int rank);
}
