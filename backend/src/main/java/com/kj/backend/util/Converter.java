package com.kj.backend.util;
import java.util.ArrayList;
import java.util.Map;


public class Converter {
    public static String convertParamsToString(Map<String, String> map) {
        String text = "";
        for (Map.Entry<String, String> entry : map.entrySet()) {
            text += entry.getKey().toString();
            if (!entry.getKey().toString().contains(">") & !entry.getKey().toString().contains("<")) {
                text += "=";
            }
            text += entry.getValue().toString();
            text += "&";
        }
        return text;
    }

    public static String[] convertStringToArray(String text) {
        String[] items = text.split(",");
        return items;
    }



}
