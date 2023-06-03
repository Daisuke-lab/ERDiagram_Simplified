package com.kj.backend.Row;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;


import java.util.List;
import java.util.Optional;


@RestController
@RequestMapping("api/v1/row")
public class RowController {

    private final RowService rowService;

    @Autowired
    public RowController(RowService rowService){
        this.rowService = rowService;
    }

    @GetMapping
    public List<Row> getRows() {
        return rowService.getRows();
    }

    @GetMapping(path="{id}")
    public Optional<Row> getRow(@PathVariable String id) {
        return rowService.getRow(id);
    }

    @PostMapping(path="{erDiagramId}")
    public Row createRow(@PathVariable String erDiagramId, @RequestBody Row row) {

        return rowService.createRow(erDiagramId, row);
    }

    @PutMapping(path="{id}")
    public Row updateRow(@PathVariable String id, @RequestBody Row row) {
        return rowService.updateRow(id, row);
    }

    @DeleteMapping(path = "{erDiagramId}/{rowId}")
    public void deleteRow(@PathVariable String erDiagramId, @PathVariable String rowId) {
        rowService.deleteRow(erDiagramId, rowId);
    }
}
