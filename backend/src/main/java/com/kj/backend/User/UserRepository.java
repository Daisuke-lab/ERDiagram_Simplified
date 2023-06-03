package com.kj.backend.User;

import com.kj.backend.ERDiagram.ERDiagram;
import com.kj.backend.Room.Room;
import com.kj.backend.Text.Text;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.querydsl.QuerydslPredicateExecutor;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends MongoRepository<User, String>,
        QuerydslPredicateExecutor<User>  {

    @Query("{ 'providerAccountId' : ?0 }")
    Optional<User> findByProviderAccountId(String id);

    @Query("{'email': ?0}")
    Optional<User> findByEmail(String email);

}
