package dao;

import java.sql.Connection;

public interface Connector{
   public abstract Connection getConnection();
   public abstract void close();
}
