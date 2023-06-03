package com.kj.backend.ERDiagram;


import com.kj.backend.User.User;
import com.kj.backend.User.UserRepository;
import com.kj.backend.messagingstompwebsocket.Message;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("api/v1/erDiagram")
public class ERDiagramController {

    private final ERDiagramService ERDiagramService;
    private final UserRepository userRepository;


    @Autowired
    public ERDiagramController(ERDiagramService ERDiagramService, UserRepository userRepository) {

        this.ERDiagramService = ERDiagramService;
        this.userRepository = userRepository;
    }

    @GetMapping(path="list/{roomId}")
    public List<ERDiagram> getERDiagramsByRoomId(@PathVariable String roomId) {
        return ERDiagramService.getERDiagramsByRoomId(roomId);
    }

    @GetMapping(path="{id}")
    public Optional<ERDiagram> getERDiagram(@PathVariable String id) { return ERDiagramService.getERDiagram(id);}

    @PostMapping(consumes= {"application/json"})
    public ERDiagram createERDiagram(@RequestBody ERDiagram erDiagram) {
        ERDiagram newErDiagram = ERDiagramService.createERDiagram(erDiagram);
        return newErDiagram;
    }

    @PutMapping(path="{id}")
    public ERDiagram updateERDiagram(@PathVariable String id, @RequestBody ERDiagram erDiagram) {
        ERDiagram updatedErDiagram = ERDiagramService.updateERDiagram(id, erDiagram);
        return updatedErDiagram;
    }

    @DeleteMapping(path="{id}")
    public void deleteERDiagram(@PathVariable String id) {
        ERDiagramService.deleteERDiagram(id);
    }



}
