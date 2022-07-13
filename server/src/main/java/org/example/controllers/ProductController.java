package org.example.controllers;

import com.sun.net.httpserver.HttpExchange;
import org.example.database.Db;
import org.example.database.ProductRepo;
import org.example.models.Product;
import org.example.utils.BodyParser;
import org.example.utils.Processor;

import java.util.List;

public class ProductController {

   private static final ProductRepo productRepo = new ProductRepo(Db.getInstance());
   private static final BodyParser<Product> bodyParser = new BodyParser<>(Product.class);

   public static void getAllProducts(HttpExchange exchange) {
      List<Product> products = productRepo.getAllProducts();
      Processor.process(exchange, products, 200);
   }

   public static void getOneProduct(HttpExchange exchange) {
      int id = getId(exchange);
      Product product = productRepo.getOneProduct(id);
      if (product == null) {
         Processor.process(exchange, "Product " + id + " does not exist", 404);
         return;
      }
      Processor.process(exchange, product, 200);
   }

   public static void createProduct(HttpExchange exchange) {
      Product product = bodyParser.getRequestBody(exchange);
      if (isNotUniqueProduct(exchange, product)) return;
      if (isInvalidBody(exchange, product)) return;
      Product createdProduct = productRepo.createProduct(product);
      Processor.process(exchange, createdProduct, 201);
   }

   public static void updateProduct(HttpExchange exchange) {
      Product product = bodyParser.getRequestBody(exchange);
      int id = getId(exchange);
      if (isInvalidBody(exchange, product)) return;
      if (isNullProduct(exchange, id)) return;
      productRepo.updateProduct(id, product);
      Processor.process(exchange, "", 204);
   }

   public static void deleteProduct(HttpExchange exchange) {
      try {
         int id = getId(exchange);
         if (isNullProduct(exchange, id)) return;
         productRepo.deleteProduct(id);
         Processor.process(exchange, "", 204);
      } catch (Exception e) {
         e.printStackTrace();
      }
   }

   private static boolean isNotUniqueProduct(HttpExchange exchange, Product product) {
      boolean exists = productRepo.checkIfNameExists(product.getName());
      if (exists)
         Processor.process(exchange, "Product " + product.getName() + " already exists", 409);
      return exists;
   }

   private static boolean isNullProduct(HttpExchange exchange, int id) {
      Product product = productRepo.getOneProduct(id);
      if (product == null) Processor.process(exchange, "Product " + id + " does not exist", 404);
      return product == null;
   }

   private static boolean isInvalidBody(HttpExchange exchange, Product product) {
      boolean isValid = product.getAmount() >= 0 && product.getPrice() >= 0;
      if (!isValid) Processor.process(exchange, "Invalid request body", 409);
      return !isValid;
   }

   private static int getId(HttpExchange exchange) {
      return Integer.parseInt(exchange.getRequestURI().getPath().replace("/api/products/", ""));
   }
}
