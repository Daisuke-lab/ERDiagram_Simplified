package com.kj.backend.ERDiagram;


import com.kj.backend.Room.Room;
import com.kj.backend.Row.Row;
import com.kj.backend.Text.Text;
import lombok.*;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.persistence.*;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Set;

@ToString
@Getter
@Setter
@EqualsAndHashCode
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table
@Document(collection = "eRDiagram")
public class ERDiagram {
    @Id
    private String id;
    private Text title;
    private Float x;
    private Float y;
    private HashMap<String, Float> scale;
    private Float rotation;
    private Set<Row> rows;
    private String roomId;
    private String updatedBy;


    public ERDiagram(String id) {
    }
    public ERDiagram clone() {
        HashMap<String, Float> newScale = new HashMap<>();
        newScale.putAll(this.getScale());
        Set<Row> newRows = new HashSet<>();
        newRows.addAll(this.getRows());

        ERDiagram erDiagram = new ERDiagram();
        erDiagram.setId(this.getId());
        erDiagram.setTitle(this.getTitle());
        erDiagram.setX(this.getX());
        erDiagram.setY(this.getY());
        erDiagram.setScale(newScale);
        erDiagram.setRotation(this.getRotation());
        erDiagram.setRows(newRows);
        erDiagram.setRoomId(this.getRoomId());
        erDiagram.setUpdatedBy(this.getUpdatedBy());
        System.out.println(erDiagram.getRows());
        return erDiagram;
    }

    public ERDiagram(ERDiagram originalErDiagram) {
        this.id = originalErDiagram.getId();
        this.title = originalErDiagram.getTitle();
        this.x = originalErDiagram.getX();
        this.y = originalErDiagram.getY();
        this.scale = originalErDiagram.getScale();
        this.rotation = originalErDiagram.getRotation();
        this.rows = originalErDiagram.getRows();
        this.roomId = originalErDiagram.getRoomId();
        this.updatedBy = originalErDiagram.getUpdatedBy();
    }
}
