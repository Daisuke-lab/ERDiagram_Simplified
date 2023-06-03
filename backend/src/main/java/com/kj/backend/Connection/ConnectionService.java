package com.kj.backend.Connection;
import com.kj.backend.messagingstompwebsocket.Message;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import java.util.List;
import java.util.Optional;

@Service
public class ConnectionService {
    private final ConnectionRepository connectionRepository;
    private boolean isRedo;
    private boolean isUndo;

    @Autowired
    SimpMessagingTemplate template;
    @Autowired
    HttpServletRequest request;


    @Autowired
    public ConnectionService(ConnectionRepository connectionRepository) {
        this.connectionRepository = connectionRepository;
    }

    public List<Connection> getConnectionsByRoomId(String roomId) {
        return connectionRepository.findByRoomId(roomId);
    }

    public Optional<Connection> getConnection(String id) {
        return connectionRepository.findById(id);
    }

    public Connection createConnection(Connection connection) {

        Connection newConnection =  connectionRepository.save(connection);
        Message connectionMessage = new Message("connection", "create", null, newConnection, isRedo, isUndo);
        template.convertAndSendToUser(newConnection.getRoomId(), "/connections", connectionMessage);

        return newConnection;
    }

    public Connection updateConnection(String id, Connection connection) {
        connection.setId(id);
        Connection oldConnection = connectionRepository.findById(id).orElse(null);
        Connection updatedConnection = connectionRepository.save(connection);
        Message connectionMessage = new Message("connection", "update", oldConnection,updatedConnection, isRedo, isUndo);
        template.convertAndSendToUser(updatedConnection.getRoomId(), "/connections", connectionMessage);
        return connection;
    }

    public void deleteConnection(String id) {
        Connection connection = connectionRepository.findById(id).orElse(null);
        if (connection != null) {
            Message connectionMessage = new Message("connection", "delete", connection, null, isRedo, isUndo);
            template.convertAndSendToUser(connection.getRoomId(), "/connections", connectionMessage);
        }

        connectionRepository.deleteById(id);
    }
}
