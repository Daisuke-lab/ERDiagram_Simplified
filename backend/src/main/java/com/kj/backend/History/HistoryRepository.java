package com.kj.backend.History;

import com.kj.backend.Room.Room;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.querydsl.QuerydslPredicateExecutor;

import java.util.List;
import java.util.Optional;

public interface HistoryRepository   extends MongoRepository<History, String>,
        QuerydslPredicateExecutor<History> {

    @Query("{ 'userId' : ?0 }")
    Optional<History> findByUserId(String id);

}
