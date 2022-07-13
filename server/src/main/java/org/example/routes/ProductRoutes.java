package org.example.routes;

import org.example.EndpointHandler;
import org.example.controllers.ProductController;

import java.util.List;

public class ProductRoutes {
   public static final List<EndpointHandler> handlers = List.of(
       new EndpointHandler("/api/products/?", "GET", ProductController::getAllProducts),
       new EndpointHandler("/api/products/(\\d+)", "GET", ProductController::getOneProduct),
       new EndpointHandler("/api/products/?", "POST", ProductController::createProduct),
       new EndpointHandler("/api/products/(\\d+)", "PUT", ProductController::updateProduct),
       new EndpointHandler("/api/products/(\\d+)", "DELETE", ProductController::deleteProduct)
   );
}