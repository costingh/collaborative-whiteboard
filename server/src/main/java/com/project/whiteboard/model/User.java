package com.project.whiteboard.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document
public class User {
    @Id
    private String id;

    @Indexed(unique = true)
    private String username;

    public User(String id, String username) {
        this.id = id;
        this.username = username;
    }
}
