package com.kj.backend.ERDiagram;

import com.kj.backend.Connection.Connection;
import com.kj.backend.Connection.ConnectionRepository;
import com.kj.backend.Room.Room;
import com.kj.backend.SimpleText.SimpleText;
import com.kj.backend.Text.Text;
import com.kj.backend.Text.TextRepository;
import com.kj.backend.messagingstompwebsocket.Message;
import com.kj.backend.util.PredicatesBuilder;
import com.kj.backend.util.RequestHelper;
import com.querydsl.core.types.dsl.BooleanExpression;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import java.util.List;
import java.util.Optional;

@Service
public class ERDiagramService {
    private ERDiagramRepository erDiagramRepository;
    private TextRepository textRepository;
    private boolean isRedo;
    private boolean isUndo;

    @Autowired
    SimpMessagingTemplate template;

    @Autowired
    ConnectionRepository connectionRepository;

    @Autowired
    HttpServletRequest request;

    public ERDiagramService(ERDiagramRepository erDiagramRepository, TextRepository textRepository) {

        this.erDiagramRepository = erDiagramRepository;
        this.textRepository = textRepository;

    }

    public void init() {
        isRedo = RequestHelper.isRedo(request);
        isUndo =RequestHelper.isUndo(request);
    }

    public List<ERDiagram> getERDiagramsByRoomId(String roomId) {
        return erDiagramRepository.findByRoomId(roomId);
    }

    public Optional<ERDiagram> getERDiagram(String id) {
        return erDiagramRepository.findById(id);
    }

    public ERDiagram createERDiagram(ERDiagram erDiagram) {
        init();
        ERDiagram newErDiagram = erDiagramRepository.save(erDiagram);
        Message erDiagramMessage = new Message("erDiagram", "create", null, newErDiagram, isRedo, isUndo);
        template.convertAndSendToUser(newErDiagram.getRoomId(), "/erDiagrams", erDiagramMessage);
        return newErDiagram;
    }

    public ERDiagram updateERDiagram(String id, ERDiagram erDiagram) {
        init();
        erDiagram.setId(id);
        ERDiagram oldErDiagram = erDiagramRepository.findById(id).orElse(null);
        ERDiagram updatedErDiagram = erDiagramRepository.save(erDiagram);
        Message erDiagramMessage = new Message("erDiagram", "update", oldErDiagram,updatedErDiagram, isRedo, isUndo);
        template.convertAndSendToUser(updatedErDiagram.getRoomId(), "/erDiagrams", erDiagramMessage);
        return updatedErDiagram;
    }

    public void deleteERDiagram(String id) {
        init();
        ERDiagram erDiagram = erDiagramRepository.findById(id).orElse(null);
        PredicatesBuilder builder = new PredicatesBuilder(Connection.class, "connection");
        builder.addParam("roomId", "=", id);
        BooleanExpression exp = builder.build();
        List<Connection> connections = (List<Connection>) connectionRepository.findAll(exp);
        connectionRepository.deleteAll(connections);


        if (erDiagram != null) {
            Message erDiagramMessage = new Message("erDiagram", "delete", erDiagram, null, isRedo, isUndo);
            template.convertAndSendToUser(erDiagram.getRoomId(), "/erDiagrams", erDiagramMessage);
        };
        erDiagramRepository.deleteById(id);
    }
}
