package com.project.whiteboard.controller;

import com.project.whiteboard.model.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class WebSocketTextController {

    @Autowired
    private MongoTemplate mongoTemplate;

    @Autowired
    SimpMessagingTemplate template;

    @MessageMapping("/send/{roomId}")
    @SendTo("/topic/{roomId}")
    public Coordinates sendMessage(@Payload Coordinates coordinates) {
        return coordinates;
    }

    @MessageMapping("/send/{roomId}/user")
    @SendTo("/topic/{roomId}/user")
    public ActionResponseDTO joinUser(@Payload RoomActionsDTO roomActions) {
        String username = roomActions.getUsername();
        String action = roomActions.getPayload();
        String roomId = roomActions.getRoomId();

        Query query = new Query();
        query.addCriteria(Criteria.where("id").is(roomId));
        Update updateQuery = new Update();

        if(action.equals("CONNECT_USER")) {
            updateQuery.push("participants", username);
            mongoTemplate.updateFirst(query, updateQuery, Room.class);

            String message = "User " + username + " has successfully connected!";
            return new ActionResponseDTO(message, mongoTemplate.findById(roomId, Room.class).getParticipants());
        } else if(action.equals("DISCONNECT_USER")) {
            updateQuery.pull("participants", username);
            mongoTemplate.updateFirst(query, updateQuery, Room.class);

            String message = "User " + username + " has disconnected!";
            return new ActionResponseDTO(message, mongoTemplate.findById(roomId, Room.class).getParticipants());
        } else {
            return new ActionResponseDTO("Not supported", new ArrayList<String>());
        }
    }
}
