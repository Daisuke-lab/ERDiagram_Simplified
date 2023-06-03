package com.kj.backend.Account;


import lombok.*;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@ToString
@Getter
@Setter
@EqualsAndHashCode
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Document(collection = "accounts")
@Table(name = "accounts")
public class Account {
    @Id
    private String id;
    private String provider;
    private String type;
    private String providerAccountId;
    private String access_token;
    private Integer expires_at;
    private String scope;
    private String token_type;
    private String id_token;
    private String userId;
}
