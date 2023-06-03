package com.kj.backend.SimpleText;

import com.kj.backend.messagingstompwebsocket.Message;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import java.util.List;
@Service
public class SimpleTextService {

    private boolean isRedo;
    private boolean isUndo;

    @Autowired
    SimpleTextRepository simpleTextRepository;
    @Autowired
    SimpMessagingTemplate template;
    @Autowired
    HttpServletRequest request;


    public List<SimpleText> getSimpleTexts(String roomId) {
        return simpleTextRepository.findByRoomId(roomId);
    }

    public SimpleText getSimpleText(String id) {
        return simpleTextRepository.findById(id).orElse(null);
    }

    public SimpleText createSimpleText(SimpleText simpleText) {
        SimpleText newSimpleText =  simpleTextRepository.save(simpleText);
        Message message = new Message("simpleText", "create", null, newSimpleText, isRedo, isUndo);
        template.convertAndSendToUser(newSimpleText.getRoomId(), "/simpleTexts", message);
        return newSimpleText;
    }

    public SimpleText updateSimpleText(String id, SimpleText simpleText) {
        simpleText.setId(id);
        SimpleText oldSimpleText = simpleTextRepository.findById(id).orElse(null);
        SimpleText newSimpleText = simpleTextRepository.save(simpleText);
        Message message = new Message("simpleText", "update", oldSimpleText,newSimpleText, isRedo, isUndo);
        template.convertAndSendToUser(newSimpleText.getRoomId(), "/simpleTexts", message);
        return newSimpleText;
    }

    public void deleteSimpleText(String id) {
        SimpleText simpleText = simpleTextRepository.findById(id).orElse(null);
        if (simpleText != null) {
            Message message = new Message("simpleText", "delete", simpleText, null, isRedo, isUndo);
            System.out.println(simpleText.getRoomId());
            template.convertAndSendToUser(simpleText.getRoomId(), "/simpleTexts", message);
        }
        simpleTextRepository.deleteById(id);
    }




}
