package com.kj.backend.Connection;


import lombok.*;

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
@Table
public class ConnectionPoint {

    @Id
    private String id;
    private String anchorLocation;
    private String connectionOption;
    private Float x;
    private Float y;
}
