package org.example.routes;

import org.example.EndpointHandler;

import java.util.List;
import java.util.stream.Stream;

public class ApiRoutes {
   public static final List<EndpointHandler> handlers = Stream.concat(
       GroupRoutes.handlers.stream(),
       ProductRoutes.handlers.stream()
   ).toList();
}
