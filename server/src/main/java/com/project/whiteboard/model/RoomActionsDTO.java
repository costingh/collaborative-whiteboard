package com.project.whiteboard.model;

public class RoomActionsDTO {
    private String username;
    private String payload;
    private String roomId;

    public RoomActionsDTO(String username, String payload, String roomId) {
        this.username = username;
        this.payload = payload;
        this.roomId = roomId;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPayload() {
        return payload;
    }

    public void setPayload(String payload) {
        this.payload = payload;
    }

    public String getRoomId() {
        return roomId;
    }

    public void setRoomId(String roomId) {
        this.roomId = roomId;
    }
}
