package com.kj.backend.SimpleText;

import com.kj.backend.Row.Row;
import com.kj.backend.Text.Text;
import lombok.*;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.util.HashMap;
import java.util.Set;

@ToString
@Getter
@Setter
@EqualsAndHashCode
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table
@Document(collection = "simpleText")
public class SimpleText {
    @Id
    private String id;
    private String content;
    private Float x;
    private Float y;
    private Float width;
    private Float height;
    private HashMap<String, Float> scale;
    private Float rotation;
    private HashMap<String, String> style;
    private String roomId;
}
