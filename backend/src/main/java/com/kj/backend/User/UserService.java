package com.kj.backend.User;


import com.kj.backend.Account.AccountRepository;
import com.kj.backend.Room.Room;
import com.kj.backend.Room.RoomRepository;
import com.kj.backend.util.JWTHelper;
import com.kj.backend.util.PredicatesBuilder;
import com.querydsl.core.types.dsl.BooleanExpression;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;


@Service
public class UserService {

    @Autowired
    UserRepository userRepository;

    @Autowired
    RoomRepository roomRepository;

    @Autowired
    HttpServletRequest request;

    @Autowired
    AccountRepository accountRepository;

    public List<User> getUsersByRoomId(String roomId) {
        Room room = roomRepository.findById(roomId).orElse(null);
        if (room != null) {
            PredicatesBuilder builder = new PredicatesBuilder(User.class, "users");
            builder.addParam("id", "=", room.getCanEdit())
                    .addParam("id", "=", room.getCanRead())
                    .addParam("id", "=", room.getOwners());
            BooleanExpression exp = builder.buildWithOr();
            List<User> users = (List<User>) userRepository.findAll(exp);
            return users;
        }
        return new ArrayList<>();
    }

    public User getUserById(String id) {
        return userRepository.findById(id).orElse(null);
    }


    public User addStarToRoom(String roomId) {
        String userId = JWTHelper.getUserId(request, accountRepository);
        User user = userRepository.findById(userId).orElse(null);
        if (user != null) {
            HashSet<String> starredRoomIds = user.getStarredRoomIds() != null ?
                                                new HashSet<String>(user.getStarredRoomIds()) :
                                                new HashSet<String>();
            starredRoomIds.add(roomId);
            user.setStarredRoomIds(new ArrayList<>(starredRoomIds));
            userRepository.save(user);
        }
        return user;

    }

    public User removeStarFromRoom(String roomId){
        String userId = JWTHelper.getUserId(request, accountRepository);
        User user = userRepository.findById(userId).orElse(null);
        if (user != null) {
            ArrayList<String> starredRoomIds = new ArrayList<String>(user.getStarredRoomIds());
            if (starredRoomIds.contains(roomId)) {
                starredRoomIds.remove(roomId);
                user.setStarredRoomIds(starredRoomIds);
                userRepository.save(user);
            }
        }
        return user;
    }
}
