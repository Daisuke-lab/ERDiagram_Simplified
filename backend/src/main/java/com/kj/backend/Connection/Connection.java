package com.kj.backend.Connection;
import com.kj.backend.ERDiagram.ERDiagram;
import com.kj.backend.ERDiagram.ERDiagramRepository;
import com.kj.backend.Room.Room;
import lombok.*;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.Period;


@ToString
@Getter
@Setter
@EqualsAndHashCode
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table
@Document(collection = "connection")
public class Connection {

    @Id
    private String id;
    private ConnectionPoint source;
    private ConnectionPoint destination;

    private String roomId;
    private String updatedBy;




}
