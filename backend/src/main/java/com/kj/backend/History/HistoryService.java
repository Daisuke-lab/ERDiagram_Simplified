package com.kj.backend.History;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.kj.backend.Account.AccountRepository;
import com.kj.backend.Room.Room;
import com.kj.backend.Room.RoomRepository;
import com.kj.backend.User.User;
import com.kj.backend.User.UserRepository;
import com.kj.backend.util.JWTHelper;
import com.kj.backend.util.PredicatesBuilder;
import com.querydsl.core.types.dsl.BooleanExpression;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.List;

@Service
public class HistoryService {

    @Autowired
    HistoryRepository historyRepository;

    @Autowired
    RoomRepository roomRepository;

    @Autowired
    AccountRepository accountRepository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    HttpServletRequest request;



    public void updateHistory(String userId, String roomId) {
        History history = historyRepository.findByUserId(userId).orElse(null);
        if (history != null) {
            ArrayList<String> roomIds = history.getRoomIds() != null ? history.getRoomIds() : new ArrayList<>();
            if (roomIds.contains(roomId)) {
                roomIds.remove(roomId);
            }
            roomIds.add(0, roomId);
            history.setRoomIds(roomIds);
            historyRepository.save(history);
        }
        User user = userRepository.findById(userId).orElse(null);
        if (user == null && userId != JWTHelper.DUMMY_USERID) {
            createHistory(userId, roomId);
        }
    }

    public void updateHistory(HttpServletRequest request, String roomId) {
        String userId = JWTHelper.getUserId(request, accountRepository);
        updateHistory(userId, roomId);
    }

    public List<Room> getRecentRooms(){
        String userId = JWTHelper.getUserId(request, accountRepository);
        History history = historyRepository.findByUserId(userId).orElse(null);
        PredicatesBuilder builder = new PredicatesBuilder(Room.class, "room");
        if (history != null) {
            builder.addParam("id","=",history.getRoomIds());
            BooleanExpression exp = builder.build();
            return (List<Room>) roomRepository.findAll(exp);
        }
        return new ArrayList<Room>();

    }

    public void createHistory(String userId, String roomId) {
        ArrayList<String> roomIds = new ArrayList<String>();
        roomIds.add(roomId);
        History history = new History();
        history.setUserId(userId);
        history.setRoomIds(roomIds);
        historyRepository.save(history);

    }
}
