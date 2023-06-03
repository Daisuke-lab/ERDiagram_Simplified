package com.kj.backend.Room;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.kj.backend.User.User;
import com.kj.backend.User.UserRepository;
import com.kj.backend.util.JWTHelper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.Map;


@RestController
@RequestMapping("api/v1/room")
public class RoomController {

    private final RoomService roomService;
    private final UserRepository userRepository;

    @Autowired
    public RoomController(RoomService roomService, UserRepository userRepository) {
        this.roomService = roomService;
        this.userRepository = userRepository;
    }

    @GetMapping(path="/list")
    public List<Room> getRooms(@RequestHeader Map<String, String> headers,
                               @RequestParam(required = false) Map<String,String> allRequestParams) throws JsonProcessingException {
        return roomService.getRooms(allRequestParams);
    }


    @GetMapping(path="{id}")
    public Room getRoom(@PathVariable String id) {
        return roomService.getRoom(id);
    }

    @PostMapping
    public Room createRoom(@RequestBody Room room) {
        return roomService.createRoom(room);
    }

    @PostMapping(path="/duplicate/{id}")
    public Room duplicateRoom(@PathVariable String id) {
        return roomService.duplicateRoom(id);
    }

    @PutMapping(path="{id}")
    public Room updateRoom(@PathVariable String id, @RequestBody Room room) throws JsonProcessingException {
        return roomService.updateRoom(id, room);
    }

    @PostMapping(path="add_user/{id}")
    public Room addUserToRoom(@PathVariable String id, @RequestBody RoomUser roomUser) {return roomService.addUserToRoom(id, roomUser);}

    @DeleteMapping(path="{id}")
    public void deleteRoom(@PathVariable String id) {
        roomService.deleteRoom(id);
    }



}
