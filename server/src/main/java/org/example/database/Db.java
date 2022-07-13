package org.example.database;

import org.example.utils.Config;
import org.sqlite.SQLiteConfig;

import java.sql.*;

public class Db {

   private final Connection connection;

   public Db(String dbName) {
      try {
         Class.forName("org.sqlite.JDBC");
         SQLiteConfig config = new SQLiteConfig();
         config.enforceForeignKeys(true);
         this.connection = DriverManager.getConnection("jdbc:sqlite:" + dbName, config.toProperties());
      } catch (ClassNotFoundException | SQLException e) {
         throw new RuntimeException(e);
      }
   }

   private static Db INSTANCE;

   public static Db getInstance() {
      if (INSTANCE == null) {
         INSTANCE = new Db(Config.DB_NAME);
      }
      return INSTANCE;
   }

   public Connection getConnection() {
      return connection;
   }
}
