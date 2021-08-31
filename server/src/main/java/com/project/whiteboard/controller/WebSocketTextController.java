package com.project.whiteboard.controller;

import com.project.whiteboard.model.Coordinates;
import com.project.whiteboard.model.TextMessageDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class WebSocketTextController {

    @Autowired
    SimpMessagingTemplate template;

    @MessageMapping("/send/{roomId}")
    @SendTo("/topic/{roomId}")
    public Coordinates[] sendMessage(@Payload Coordinates[] coordinates) {
        return coordinates;
    }
}
