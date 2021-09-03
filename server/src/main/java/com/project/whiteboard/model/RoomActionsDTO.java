package com.project.whiteboard.model;

public class RoomActionsDTO {
    private String message;
    private String payload;

    public RoomActionsDTO(String message, String payload) {
        this.message = message;
        this.payload = payload;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getPayload() {
        return payload;
    }

    public void setPayload(String payload) {
        this.payload = payload;
    }
}
