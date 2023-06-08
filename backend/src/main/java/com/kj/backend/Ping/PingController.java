package com.kj.backend.Ping;


import com.kj.backend.ERDiagram.ERDiagram;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("api/v1/ping")
public class PingController {

    @GetMapping()
    public String getPing() {
        return "Hello World";
    }
}
