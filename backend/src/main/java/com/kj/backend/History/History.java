package com.kj.backend.History;


import lombok.*;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.util.ArrayList;

@ToString
@Getter
@Setter
@EqualsAndHashCode
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Document(collection = "history")
@Table(name = "history")
public class History {
    @Id
    private String id;
    private String userId;
    private ArrayList<String> roomIds;

    public History(String userId, ArrayList<String> roomIds) {
    }

    @Override
    public String toString() {
        return "History{" +
                "id='" + id + '\'' +
                ", userId='" + userId + '\'' +
                ", roomIds=" + roomIds +
                '}';
    }
}
