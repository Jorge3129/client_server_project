package org.example.routes;

import org.example.EndpointHandler;
import org.example.controllers.GroupController;

import java.util.List;

public class GroupRoutes {
   public static final List<EndpointHandler> handlers = List.of(
       new EndpointHandler("/api/groups/?", "GET", GroupController::getAllGroups),
       new EndpointHandler("/api/groups/(\\d+)", "GET", GroupController::getOneGroup),
       new EndpointHandler("/api/groups/?", "POST", GroupController::createGroup),
       new EndpointHandler("/api/groups/(\\d+)", "PUT", GroupController::updateGroup),
       new EndpointHandler("/api/groups/(\\d+)", "DELETE", GroupController::deleteGroup)
   );
}
