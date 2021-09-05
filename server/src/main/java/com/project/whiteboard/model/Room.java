package com.project.whiteboard.model;


import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import java.util.List;

@Data
@Document
public class Room {
    @Id
    private String id;

    @Field
    private String name;

    @Field
    private String description;

    @Field
    private String address;

    List<String> participants;
    List<Drawing> drawings;
}
