package com.kj.backend.Text;


import com.kj.backend.ERDiagram.ERDiagram;
import com.kj.backend.ERDiagram.ERDiagramRepository;
import com.kj.backend.messagingstompwebsocket.Message;
import lombok.SneakyThrows;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import java.util.Optional;

@Service
public class TextService {

    private final TextRepository textRepository;
    private ERDiagramRepository erDiagramRepository;
    private boolean isRedo;
    private boolean isUndo;

    @Autowired
    SimpMessagingTemplate template;

    @Autowired
    HttpServletRequest request;

    public TextService(TextRepository textRepository, ERDiagramRepository erDiagramRepository) {
        this.textRepository = textRepository;
        this.erDiagramRepository = erDiagramRepository;
    }

    public Optional<Text> getText(String id) {
        return textRepository.findById(id);
    }

    public Text createText(Text text) {

        return textRepository.save(text);
    }

    @SneakyThrows
    public Text updateText(String erDiagramId, String textId, Text text){
        text.setId(textId);
        ERDiagram erDiagram = erDiagramRepository.findById(erDiagramId).orElse(null);
        ERDiagram oldErDiagram = (ERDiagram) erDiagram.clone();
        if (erDiagram != null) {
            if (text.getId().equals(erDiagram.getTitle().getId())) {
                erDiagram.setTitle(text);
                erDiagramRepository.save(erDiagram);
            }
            erDiagram.getRows().forEach(row -> {
                        if (text.getId().equals(row.getKey().getId())) {
                            row.setKey(text);
                            erDiagramRepository.save(erDiagram);
                        } else if (text.getId().equals(row.getValue().getId())) {
                            row.setValue(text);
                            erDiagramRepository.save(erDiagram);
                        }
        });
        Message erDiagramMessage = new Message("erDiagram", "update", oldErDiagram, erDiagram, isRedo, isUndo);
        template.convertAndSendToUser(erDiagram.getRoomId(), "/erDiagrams", erDiagramMessage);
        }


        return text;
    }

    public void deleteText(String id) {
        textRepository.deleteById(id);
    }
}
