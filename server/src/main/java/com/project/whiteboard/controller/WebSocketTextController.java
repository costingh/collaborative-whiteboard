package com.project.whiteboard.controller;

import com.project.whiteboard.model.ActionResponseDTO;
import com.project.whiteboard.model.Coordinates;
import com.project.whiteboard.model.RoomActionsDTO;
import com.project.whiteboard.model.TextMessageDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class WebSocketTextController {
    List<String> userNames = new ArrayList<String>();

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
        String username = roomActions.getMessage();
        String action = roomActions.getPayload();

        if(action.equals("CONNECT_USER")) {
            userNames.add(username);
            String message = "User " + username + " has joined the room!";
            return new ActionResponseDTO(message, userNames);
        } else if(action.equals("DISCONNECT_USER")) {
            if(userNames.indexOf(username) != -1) {
                userNames.remove(userNames.indexOf(username));
            }
            String message = "User " + username + " has left the room!";
            return new ActionResponseDTO(message, userNames);
        } else {
            String message = "Action not supported";
            return new ActionResponseDTO(message, userNames);
        }
    }
}
