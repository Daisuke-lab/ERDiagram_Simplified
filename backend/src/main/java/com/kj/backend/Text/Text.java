package com.kj.backend.Text;


import lombok.*;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.util.HashMap;

@ToString
@Getter
@Setter
@EqualsAndHashCode
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table
public class Text {
    @Id
    private String id;
    private String content;
    private HashMap<String, String> style;
    private String updatedBy;
}
