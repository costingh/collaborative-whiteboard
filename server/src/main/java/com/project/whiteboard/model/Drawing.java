package com.project.whiteboard.model;

import lombok.Data;

import java.util.List;

@Data
public class Drawing {
    private List<Coordinates> line;
}
