package com.kj.backend.util;

import org.springframework.web.bind.annotation.RequestBody;

import javax.servlet.http.HttpServletRequest;

// parameterにして渡そう。

public class RequestHelper {
    public static boolean isRedo(HttpServletRequest request) {
        String redo = request.getParameter("redo");
        if (redo != null) {
            return redo.equals("true");
        }
        return false;

    }

    public static boolean isUndo(HttpServletRequest request) {
        String undo = request.getParameter("undo");
        if (undo != null) {
            return undo.equals("true");
        }
        return false;

    }

    public static boolean isRedoOrUndo(HttpServletRequest request) {
        return RequestHelper.isUndo(request) | RequestHelper.isRedo(request);
    }
}
