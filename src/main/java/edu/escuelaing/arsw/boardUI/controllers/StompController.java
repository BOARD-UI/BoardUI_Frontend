package edu.escuelaing.arsw.boardUI.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.messaging.simp.annotation.SubscribeMapping;
import org.springframework.stereotype.Controller;

@Controller
public class StompController {
	
	@Autowired
	SimpMessagingTemplate msgt;

	@MessageMapping("/room/{roomId}") 
	public void handleRoomEvent(@DestinationVariable String roomId) throws Exception {
		
	}

	@SubscribeMapping("/room/{roomId}")
	public String initialReply(@DestinationVariable String roomId) throws Exception {
		return "Hello There!";
	}

}