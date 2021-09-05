package com.project.whiteboard.Dao;

import com.project.whiteboard.model.Room;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RoomDao extends MongoRepository<Room, String> {
}
