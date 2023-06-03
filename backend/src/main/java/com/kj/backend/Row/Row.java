package com.kj.backend.Row;


import com.kj.backend.ERDiagram.ERDiagram;
import com.kj.backend.Text.Text;
import lombok.*;

import javax.persistence.*;

@ToString
@Getter
@Setter
@EqualsAndHashCode
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table
public class Row {
    @Id
    private String id;
    private Integer index;
    private Text key;
    private Text value;
    private String UpdatedBy;


}
