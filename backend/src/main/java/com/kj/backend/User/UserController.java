package com.kj.backend.User;


import com.kj.backend.Room.Room;
import com.kj.backend.Room.RoomService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;
import java.util.List;
@RestController
@RequestMapping("api/v1/user")
public class UserController {

    @Autowired
    UserService userService;

    @GetMapping(path = "/room/{id}")
    public List<User> getUsersByRoomId(@PathVariable String id) {
        return userService.getUsersByRoomId(id);
    }

    @GetMapping(path = "/{id}")
    public User getUserById(@PathVariable String id) { return userService.getUserById(id);}

    @PutMapping(path = "/add_star/{roomId}")
    public User addStarToRoom(@PathVariable String roomId) {

        return userService.addStarToRoom(roomId);
    }

    @PutMapping(path = "/remove_star/{roomId}")
    public User removeStarToRoom(@PathVariable String roomId) {

        return userService.removeStarFromRoom(roomId);
    }




}