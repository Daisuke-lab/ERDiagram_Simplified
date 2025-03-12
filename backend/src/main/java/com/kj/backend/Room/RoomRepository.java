package com.kj.backend.Room;


import com.querydsl.core.types.dsl.StringExpression;
import com.querydsl.core.types.dsl.StringPath;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.querydsl.QuerydslPredicateExecutor;
import org.springframework.data.querydsl.binding.QuerydslBindings;
import org.springframework.data.querydsl.binding.SingleValueBinding;
import java.util.List;

public interface RoomRepository  extends MongoRepository<Room, String>,
        QuerydslPredicateExecutor<Room>{


    boolean existsRoomByTitle(String title);




}
