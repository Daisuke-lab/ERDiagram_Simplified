package com.kj.backend.Connection;

import java.util.List;

import com.kj.backend.ERDiagram.ERDiagram;
import com.kj.backend.Room.Room;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.querydsl.QuerydslPredicateExecutor;


public interface ConnectionRepository extends MongoRepository<Connection, String>,
        QuerydslPredicateExecutor<Connection> {

    @Query("{ 'roomId' : ?0 }")
    List<Connection> findByRoomId(String id);

}
