package com.kj.backend.Account;

import com.kj.backend.User.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.querydsl.QuerydslPredicateExecutor;

public interface AccountRepository  extends MongoRepository<Account, String>,
        QuerydslPredicateExecutor<Account> {

}
