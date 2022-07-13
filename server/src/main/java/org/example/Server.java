package org.example;

import com.sun.net.httpserver.*;
import org.example.routes.ApiRoutes;
import org.example.utils.Config;
import org.example.utils.Processor;

import java.net.InetSocketAddress;
import java.util.Optional;

public class Server {

   public static void main(String[] args) throws Exception {
      HttpServer server = HttpServer.create();
      server.bind(new InetSocketAddress(Config.PORT), 0);

      HttpContext context = server.createContext("/", new EchoHandler());
      context.setAuthenticator(new Auth());

      server.setExecutor(null);
      server.start();
      System.out.println("Running");
   }

   static class EchoHandler implements HttpHandler {

      @Override
      public void handle(HttpExchange exchange) {
         System.out.println(exchange.getRequestMethod() + " " + exchange.getRequestURI().getPath());

         // CORS
         try {
            exchange.getResponseHeaders().add("Access-Control-Allow-Origin", "*");

            if (exchange.getRequestMethod().equalsIgnoreCase("OPTIONS")) {
               exchange.getResponseHeaders().add("Access-Control-Allow-Methods", "GET, OPTIONS");
               exchange.getResponseHeaders().add("Access-Control-Allow-Headers", "Content-Type,Authorization");
               exchange.sendResponseHeaders(204, -1);
               return;
            }
         } catch (Exception e) {
            throw new RuntimeException(e);
         }

         Optional<EndpointHandler> handler = ApiRoutes.handlers.stream()
             .filter(endpointHandler -> endpointHandler.isMatch(exchange))
             .findFirst();

         if (handler.isPresent()) handler.get().handle(exchange);
         else Processor.process(exchange, "", 404);
      }
   }

   static class Auth extends Authenticator {
      @Override
      public Result authenticate(HttpExchange httpExchange) {
         if ("/forbidden".equals(httpExchange.getRequestURI().toString()))
            return new Failure(403);
         else
            return new Success(new HttpPrincipal("c0nst", "realm"));
      }
   }
}
