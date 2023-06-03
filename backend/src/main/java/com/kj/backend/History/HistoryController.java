package com.kj.backend.History;


import com.fasterxml.jackson.core.JsonProcessingException;
import com.kj.backend.Room.Room;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("api/v1/history")
public class HistoryController {


    @Autowired
    HistoryService historyService;

    @GetMapping(path="")
    public List<Room> getRecentRooms() throws JsonProcessingException {
        return historyService.getRecentRooms();
    }


}
