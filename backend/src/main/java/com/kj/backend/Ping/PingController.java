package com.kj.backend.Ping;


import com.kj.backend.ERDiagram.ERDiagram;
import com.kj.backend.Room.RoomRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("api/v1/ping")
public class PingController {

    @Autowired
    RoomRepository roomRepository;

    @GetMapping()
    public String getPing() {
        return "Hello World";
    }

    @GetMapping(path="db")
    public String getPingWithDB() {
        roomRepository.existsRoomByTitle("DUMMY");
        return "Hello World";
    }
}
