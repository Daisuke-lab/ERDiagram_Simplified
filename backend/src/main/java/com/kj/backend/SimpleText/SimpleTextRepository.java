package com.kj.backend.SimpleText;

import com.kj.backend.ERDiagram.ERDiagram;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.querydsl.QuerydslPredicateExecutor;

import java.util.List;

public interface SimpleTextRepository  extends MongoRepository<SimpleText, String>,
        QuerydslPredicateExecutor<SimpleText> {

    @Query("{ 'roomId' : ?0 }")
    List<SimpleText> findByRoomId(String id);
}
