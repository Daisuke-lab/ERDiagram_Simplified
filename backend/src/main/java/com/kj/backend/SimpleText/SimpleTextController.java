package com.kj.backend.SimpleText;


import com.kj.backend.Text.Text;
import com.kj.backend.Text.TextService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;
import java.util.List;
@RestController
@RequestMapping("api/v1/simpleText")
public class SimpleTextController {

    @Autowired
    SimpleTextService simpleTextService;

    @GetMapping(path="list/{roomId}")
    public List<SimpleText> getSimpleTexts(@PathVariable String roomId) {
        return simpleTextService.getSimpleTexts(roomId);
    }
    @GetMapping(path="{id}")
    public SimpleText getSimpleText(@PathVariable String id) {
        return simpleTextService.getSimpleText(id);
    }

    @PostMapping
    public SimpleText createSimpleText(@RequestBody SimpleText simpleText) {
        return simpleTextService.createSimpleText(simpleText);
    }

    @PutMapping(path="{id}")
    public SimpleText updateSimpleText(@PathVariable String id, @RequestBody SimpleText simpleText) {
        return simpleTextService.updateSimpleText(id, simpleText);
    }

    @DeleteMapping(path="{id}")
    public void deleteSimpleText(@PathVariable String id) {
        simpleTextService.deleteSimpleText(id);
    }
}
