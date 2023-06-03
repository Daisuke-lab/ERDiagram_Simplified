package com.kj.backend.Room;

import com.kj.backend.Connection.Connection;
import com.kj.backend.ERDiagram.ERDiagram;
import com.kj.backend.User.User;
import com.querydsl.core.annotations.QueryEntity;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Date;
import java.util.Set;

@ToString
@Getter
@Setter
@EqualsAndHashCode
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table
@QueryEntity
@Document(collection = "room")
public class Room {
    @Id
    private String id;
    private String title;

    @CreatedDate
    private Date createdAt;


    @UpdateTimestamp
    @LastModifiedDate
    private Date updatedAt;


    private String previewImg;
    private ArrayList<String> canRead;
    private ArrayList<String> canEdit;
    private Integer shareStatus;

    private ArrayList<String> owners;



    @PrePersist
    public void onPrePersist() {
        setCreatedAt(new Date());
        setUpdatedAt(new Date());
    }

    @PreUpdate
    public void onPreUpdate() {
        setUpdatedAt(new Date());
    }






}
