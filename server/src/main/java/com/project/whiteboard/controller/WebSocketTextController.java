package com.project.whiteboard.controller;

import com.project.whiteboard.model.TextMessageDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class WebSocketTextController {

    @Autowired
    SimpMessagingTemplate template;

    @MessageMapping("/send/{roomId}")
//    @SendTo("/topic/message")
    public ResponseEntity<Void> sendMessage(@RequestBody TextMessageDTO textMessageDTO, @DestinationVariable String roomId) {
        template.convertAndSend("/topic/roomId", textMessageDTO);
        return new ResponseEntity<>(HttpStatus.OK);
    }

//    @MessageMapping("/send")
//    public void receiveMessage(@Payload TextMessageDTO textMessageDTO) {
//        // receive message from client
//        System.out.println(textMessageDTO.getMessage());
//    }
//
//
//    @SendTo("/topic/message")
//    public TextMessageDTO broadcastMessage(@Payload TextMessageDTO textMessageDTO) {
//        return textMessageDTO;
//    }
}
