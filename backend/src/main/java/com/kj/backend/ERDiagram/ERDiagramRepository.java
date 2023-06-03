package com.kj.backend.ERDiagram;


import com.kj.backend.Connection.Connection;
import com.kj.backend.Room.Room;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.querydsl.QuerydslPredicateExecutor;

import java.util.List;

public interface ERDiagramRepository extends MongoRepository<ERDiagram, String>,
        QuerydslPredicateExecutor<ERDiagram> {

    @Query("{ 'roomId' : ?0 }")
    List<ERDiagram> findByRoomId(String id);
}
