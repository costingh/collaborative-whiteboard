package com.project.whiteboard.service;

import com.project.whiteboard.model.Room;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;

import java.util.List;
import java.util.Optional;

public interface RoomService {

    Room save(Room room);

    Room update(Room room);

    void deleteRoom(String roomId);

    Optional<Room> getRoom(String roomId);

    List<Room> getAllRooms();
}