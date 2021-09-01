package com.project.whiteboard.model;

public class Coordinates {
    private Long x0;
    private Long y0;
    private Long x1;
    private Long y1;
    private String color;
    private String userID;

    public Coordinates(Long x0, Long y0, Long x1, Long y1, String color, String userID) {
        this.x0 = x0;
        this.y0 = y0;
        this.x1 = x1;
        this.y1 = y1;
        this.color = color;
        this.userID = userID;
    }

    public Long getX0() {
        return x0;
    }

    public void setX0(Long x0) {
        this.x0 = x0;
    }

    public Long getY0() {
        return y0;
    }

    public void setY0(Long y0) {
        this.y0 = y0;
    }

    public Long getX1() {
        return x1;
    }

    public void setX1(Long x1) {
        this.x1 = x1;
    }

    public Long getY1() {
        return y1;
    }

    public void setY1(Long y1) {
        this.y1 = y1;
    }

    public String getColor() {
        return color;
    }

    public void setColor(String color) {
        this.color = color;
    }

    public String getUserID() {
        return userID;
    }

    public void setUserID(String userID) {
        this.userID = userID;
    }
}
