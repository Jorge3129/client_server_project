package org.example.controllers;

import com.sun.net.httpserver.HttpExchange;
import org.example.database.Db;
import org.example.database.GroupRepo;
import org.example.models.Group;
import org.example.models.Product;
import org.example.utils.BodyParser;
import org.example.utils.Processor;

import java.util.Arrays;
import java.util.List;

public class GroupController {
   private static final GroupRepo groupRepo = new GroupRepo(Db.getInstance());
   private static final BodyParser<Group> bodyParser = new BodyParser<>(Group.class);

   public static void getAllGroups(HttpExchange exchange) {
      List<Group> groups = groupRepo.getAllGroups();
      Processor.process(exchange, groups, 200);
   }

   public static void getOneGroup(HttpExchange exchange) {
      int id = getId(exchange);
      Group group = groupRepo.getOneGroup(id);
      if (group == null) {
         Processor.process(exchange, "Group " + id + " does not exist", 404);
         return;
      }
      Processor.process(exchange, group, 200);
   }

   public static void createGroup(HttpExchange exchange) {
      Group group = bodyParser.getRequestBody(exchange);
      if (isNotUniqueGroup(exchange, group)) return;
      if (isInvalidBody(exchange, group)) return;
      Group createdGroup = groupRepo.createGroup(group);
      Processor.process(exchange, createdGroup, 201);
   }

   public static void updateGroup(HttpExchange exchange) {
      Group group = bodyParser.getRequestBody(exchange);
      int id = getId(exchange);
      if (isInvalidBody(exchange, group)) return;
      if (isNullGroup(exchange, id)) return;
      groupRepo.updateGroup(id, group);
      Processor.process(exchange, "", 204);
   }

   public static void deleteGroup(HttpExchange exchange) {
      try {
         int id = getId(exchange);
         if (isNullGroup(exchange, id)) return;
         groupRepo.deleteGroup(id);
         Processor.process(exchange, "", 204);
      } catch (Exception e) {
         e.printStackTrace();
      }
   }

   public static void getGroupProducts(HttpExchange exchange) {
      int id = getId(exchange);
      if (isNullGroup(exchange, id)) return;
      List<Product> products = groupRepo.getGroupProducts(id);
      Processor.process(exchange, products, 200);
   }

   private static boolean isNotUniqueGroup(HttpExchange exchange, Group group) {
      boolean exists = groupRepo.checkIfNameExists(group.getName());
      if (exists)
         Processor.process(exchange, "Group " + group.getName() + " already exists", 409);
      return exists;
   }

   private static boolean isNullGroup(HttpExchange exchange, int id) {
      Group group = groupRepo.getOneGroup(id);
      if (group == null) Processor.process(exchange, "Group " + id + " does not exist", 404);
      return group == null;
   }

   private static boolean isInvalidBody(HttpExchange exchange, Group group) {
      boolean isInvalid = group.getName().isBlank() || group.getDescription().isBlank();
      if (isInvalid) Processor.process(exchange, "Invalid request body", 409);
      return isInvalid;
   }

   private static int getId(HttpExchange exchange) {
      String[] splitUrl = exchange.getRequestURI().getPath().split("/");
      System.out.println(Arrays.toString(splitUrl));
      return Integer.parseInt(splitUrl[3]);
   }
}
