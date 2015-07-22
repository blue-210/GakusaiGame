package dao;

import java.sql.Connection;
import java.sql.ResultSet;

public abstract class Connector{
   private abstract void Connect();
   private abstract void close();
   public abstract ResultSet select(String sql);
   public abstract void update(String sql);
}
