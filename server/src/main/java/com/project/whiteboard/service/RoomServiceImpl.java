package com.project.whiteboard.service;

import com.project.whiteboard.Dao.RoomDao;
import com.project.whiteboard.model.Room;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class RoomServiceImpl implements RoomService {

    @Autowired
    private RoomDao roomDao;

    @Override
    public Room save(Room room) {
        return roomDao.save(room);
    }

    @Override
    public Room update(Room room) {
        return roomDao.save(room);
    }

    @Override
    public void deleteRoom(String roomId) {
        roomDao.deleteById(roomId);
    }

    @Override
    public Optional<Room> getRoom(String roomId) {
        return roomDao.findById(roomId);
    }

    @Override
    public List<Room> getAllRooms() {
        return roomDao.findAll();
    }
}
