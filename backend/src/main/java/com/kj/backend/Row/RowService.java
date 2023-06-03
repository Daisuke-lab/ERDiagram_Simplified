package com.kj.backend.Row;


import com.kj.backend.ERDiagram.ERDiagram;
import com.kj.backend.ERDiagram.ERDiagramRepository;
import com.kj.backend.messagingstompwebsocket.Message;
import lombok.SneakyThrows;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;


@Service
public class RowService {

    private final RowRepository rowRepository;
    private final ERDiagramRepository erDiagramRepository;
    private boolean isRedo;
    private boolean isUndo;

    @Autowired
    SimpMessagingTemplate template;

    @Autowired
    HttpServletRequest request;




    @Autowired
    public RowService(RowRepository rowRepository, ERDiagramRepository erDiagramRepository) {
        this.erDiagramRepository = erDiagramRepository;
        this.rowRepository = rowRepository;
    }

    public List<Row> getRows() {
        return rowRepository.findAll();
    }

    public Optional<Row> getRow(String id) {
        return rowRepository.findById(id);
    }

    @SneakyThrows
    public Row createRow(String erDiagramId, Row row) {
        ERDiagram erDiagram = erDiagramRepository.findById(erDiagramId).orElse(null);
        ERDiagram oldErDiagram = erDiagram.clone();
        if (erDiagram != null) {
            Set<Row> rows = erDiagram.getRows();
            rows.add(row);
            erDiagram.setRows(rows);
            erDiagramRepository.save(erDiagram);
            Message erDiagramMessage = new Message("erDiagram", "update", oldErDiagram, erDiagram, isRedo, isUndo);
            template.convertAndSendToUser(erDiagram.getRoomId(), "/erDiagrams", erDiagramMessage);
        }

        return row;


    }

    public Row updateRow(String id, Row row) {
        row.setId(id);
        return rowRepository.save(row);
    }

    @SneakyThrows
    public void deleteRow(String erDiagramId, String rowId) {
        ERDiagram erDiagram = erDiagramRepository.findById(erDiagramId).orElse(null);
        ERDiagram oldErDiagram = erDiagram.clone();
        if (erDiagram != null) {
            Set<Row> rows = erDiagram.getRows();
            Set<Row> newRows = new HashSet<Row>();
            rows.forEach(row-> {
                if (!row.getId().equals(rowId)) {
                    newRows.add(row);
                }
            });
            erDiagram.setRows(newRows);
            erDiagramRepository.save(erDiagram);
            Message erDiagramMessage = new Message("erDiagram", "update", oldErDiagram,erDiagram, isRedo, isUndo);
            template.convertAndSendToUser(erDiagram.getRoomId(), "/erDiagrams", erDiagramMessage);
        }

    }


}
