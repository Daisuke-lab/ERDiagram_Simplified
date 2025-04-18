package com.kj.backend.Room;


import java.util.*;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.kj.backend.Account.AccountRepository;
import com.kj.backend.Connection.Connection;
import com.kj.backend.Connection.ConnectionPoint;
import com.kj.backend.Connection.ConnectionRepository;
import com.kj.backend.ERDiagram.ERDiagram;
import com.kj.backend.ERDiagram.ERDiagramRepository;
import com.kj.backend.History.HistoryService;
import com.kj.backend.SimpleText.SimpleText;
import com.kj.backend.SimpleText.SimpleTextRepository;
import com.kj.backend.User.User;
import com.kj.backend.User.UserRepository;
import com.kj.backend.util.Converter;
import com.kj.backend.util.JWTHelper;
import com.kj.backend.util.PredicatesBuilder;
import com.querydsl.core.types.dsl.BooleanExpression;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import javax.servlet.http.HttpServletRequest;

import static com.kj.backend.Room.ShareStatus.*;

@Service
public class RoomService {

    private UserRepository userRepository;
    private RoomRepository roomRepository;
    private AccountRepository accountRepository;
    @Autowired
    HttpServletRequest request;

    @Autowired
    HistoryService historyService;

    @Autowired
    ERDiagramRepository erDiagramRepository;
    @Autowired
    ConnectionRepository connectionRepository;

    @Autowired
    SimpleTextRepository simpleTextRepository;

    public RoomService(UserRepository userRepository, RoomRepository roomRepository, AccountRepository accountRepository) {
        this.userRepository = userRepository;
        this.roomRepository = roomRepository;
        this.accountRepository = accountRepository;
    }

    public List<Room> getRooms(Map<String, String> allRequestParams) throws JsonProcessingException {
        String searchField = Converter.convertParamsToString(allRequestParams);
        PredicatesBuilder builder = new PredicatesBuilder(Room.class, "room");
        String userId = JWTHelper.getUserId(request, accountRepository);

        BooleanExpression exp = builder.build(searchField);
        builder.addParam("shareStatus","=",ANYONE_CAN_READ)
        .addParam("shareStatus", "=", ANYONE_CAN_EDIT)
        .addParam("canEdit", "__contains__", userId)
        .addParam("canRead", "__contains__", userId)
        .addParam("owners", "__contains__", userId);
        BooleanExpression filterExp = builder.buildWithOr();
        exp = exp.and(filterExp);
        List<Room> rooms = (List<Room>) roomRepository.findAll(exp);
        return rooms;
    }

    public Room getRoom(String id) {
        historyService.updateHistory(request, id);
        PredicatesBuilder builder = new PredicatesBuilder(Room.class, "room");
        String userId = JWTHelper.getUserId(request, accountRepository);
        builder.addParam("shareStatus","=",ANYONE_CAN_READ.ordinal())
                .addParam("shareStatus", "=", ANYONE_CAN_EDIT.ordinal())
                .addParam("canEdit", "__contains__", userId)
                .addParam("canRead", "__contains__", userId)
                .addParam("owners", "__contains__", userId);
        BooleanExpression orExp = builder.buildWithOr();
        builder.addParam("id", "=", id);
        BooleanExpression exp = builder.build();
        exp = exp.and(orExp);

        List<Room> rooms = (List<Room>) roomRepository.findAll(exp);
        if (rooms.isEmpty()) {
            return null;
        } else {
            return rooms.get(0);
        }

    }

    public Room duplicateRoom(String id) {
        Room room = getRoom(id);
        if (room != null) {
            PredicatesBuilder builder = new PredicatesBuilder(Room.class, "room");
            builder.addParam("roomId","=",room.getId());
            BooleanExpression exp = builder.build();
            List<ERDiagram> erDiagrams = (List<ERDiagram>) erDiagramRepository.findAll(exp);
            List<Connection> connections = (List<Connection>) connectionRepository.findAll(exp);
            room.setId(null);
            Room newRoom = roomRepository.save(room);
            HashMap<String, String> erDiagramIdMap = new HashMap<String, String>();
            for (int i = 0; i < erDiagrams.size(); i++) {
                ERDiagram erDiagram = erDiagrams.get(i);
                erDiagram.setRoomId(newRoom.getId());
                String originalId = erDiagram.getId();
                erDiagram.setId(null);
                ERDiagram newErDiagram = erDiagramRepository.save(erDiagram);
                erDiagramIdMap.put(originalId, newErDiagram.getId());
            }
            for (int i = 0; i < connections.size(); i++) {
                Connection connection = connections.get(i);
                connection.setRoomId(newRoom.getId());
                ConnectionPoint newSource = connection.getSource();
                ConnectionPoint newDestination = connection.getDestination();
                String newSourceId = erDiagramIdMap.get(newSource.getId());
                newSource.setId(newSourceId);
                if (newDestination != null) {
                    String newDestinationId = erDiagramIdMap.get(newDestination.getId());
                    newDestination.setId(newDestinationId);
                }
                connection.setSource(newSource);
                connection.setDestination(newDestination);
                connection.setId(null);
                connectionRepository.save(connection);
            }
            return newRoom;
        }
        return null;
    }

    public Room createRoom(Room room) {
        Room newRoom = roomRepository.save(room);
        historyService.updateHistory(request, newRoom.getId());
        return newRoom;
    }

    public Room updateRoom(String id, Room room) {
        if (room.getOwners().size() == 0) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST, "You can't remove the last owner of the room. Please authorize someone else as a new owner", null);
        }
        room.setId(id);
        return roomRepository.save(room);
    }

    public void askAI(String id, AIPrompt aiPrompt) {

    }

    public Room addUserToRoom(String id, RoomUser roomUser) {
        Room room = roomRepository.findById(id).orElse(null);
        String email = roomUser.getEmail();
        User user  = userRepository.findByEmail(email).orElse(null);
        if (user != null && room != null) {
            HashSet<String> canEdit = new HashSet<String>(room.getCanEdit());
            HashSet<String> canRead = new HashSet<String>(room.getCanRead());
            HashSet<String> owners = new HashSet<String>(room.getOwners());


            switch (roomUser.getRole()) {
                case EDITOR:
                    canEdit.add(user.getId());
                    break;
                case READER:
                    canRead.add(user.getId());
                    break;
                case OWNER:
                    owners.add(user.getId());
                    break;
                default:
                    break;
            }
            room.setCanEdit(new ArrayList<>(canEdit));
            room.setCanRead(new ArrayList<>(canRead));
            room.setOwners(new ArrayList<>(owners));
            roomRepository.save(room);
        }   else if (room == null) {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND, "Room Not Found", null);
        } else if (user == null) {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND, "User Not Found", null);
        }
        return room;
    }

    public void deleteRoom(String id) {

        roomRepository.deleteById(id);
        PredicatesBuilder builder = new PredicatesBuilder(SimpleText.class, "simpleText");
        builder.addParam("roomId", "=", id);
        BooleanExpression exp = builder.build();
        List<SimpleText> simpleTexts = (List<SimpleText>) simpleTextRepository.findAll(exp);
        simpleTextRepository.deleteAll(simpleTexts);

        builder = new PredicatesBuilder(Connection.class, "connection");
        builder.addParam("roomId", "=", id);
        exp = builder.build();
        List<Connection> connections = (List<Connection>) connectionRepository.findAll(exp);
        connectionRepository.deleteAll(connections);

        builder = new PredicatesBuilder(ERDiagram.class, "erDiagram");
        builder.addParam("roomId", "=", id);
        exp = builder.build();
        List<ERDiagram> erDiagrams = (List<ERDiagram>) erDiagramRepository.findAll(exp);
        erDiagramRepository.deleteAll(erDiagrams);

    }
}
