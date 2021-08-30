package com.project.whiteboard.model;

public class Coordinates {
    private String actionType;
    private String startX;
    private String startY;
    private String finishX;
    private String finishY;

    public Coordinates(String actionType, String startX, String startY, String finishX, String finishY) {
        this.actionType = actionType;
        this.startX = startX;
        this.startY = startY;
        this.finishX = finishX;
        this.finishY = finishY;
    }

    public String getActionType() {
        return actionType;
    }

    public void setActionType(String actionType) {
        this.actionType = actionType;
    }

    public String getStartX() {
        return startX;
    }

    public void setStartX(String startX) {
        this.startX = startX;
    }

    public String getStartY() {
        return startY;
    }

    public void setStartY(String startY) {
        this.startY = startY;
    }

    public String getFinishX() {
        return finishX;
    }

    public void setFinishX(String finishX) {
        this.finishX = finishX;
    }

    public String getFinishY() {
        return finishY;
    }

    public void setFinishY(String finishY) {
        this.finishY = finishY;
    }
}
