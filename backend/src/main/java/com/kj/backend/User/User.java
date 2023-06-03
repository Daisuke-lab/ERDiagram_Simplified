package com.kj.backend.User;

import com.kj.backend.Room.Room;
import com.kj.backend.Row.Row;
import lombok.*;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Set;

@ToString
@Getter
@Setter
@EqualsAndHashCode
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Document(collection = "users")
@Table(name = "users")
public class User {
    @Id
    private String id;
    private String name;
    private String email;
    private String image;
    private boolean emailVerified;
    private ArrayList<String> starredRoomIds;

    @Override
    public String toString() {
        return "User{" +
                "id='" + id + '\'' +
                ", name='" + name + '\'' +
                ", email='" + email + '\'' +
                ", image='" + image + '\'' +
                ", emailVerified=" + emailVerified +
                '}';
    }
}
