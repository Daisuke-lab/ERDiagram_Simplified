package com.kj.backend.util;

import com.kj.backend.Room.Room;
import com.querydsl.core.types.dsl.*;

import javax.persistence.Entity;


import java.util.ArrayList;
import java.util.Arrays;

import static org.hibernate.query.criteria.internal.ValueHandlerFactory.isBoolean;
import static org.hibernate.query.criteria.internal.ValueHandlerFactory.isNumeric;

public class Predicate {

    private SearchCriteria criteria;
    public Predicate (SearchCriteria criteria) {
        this.criteria = criteria;
    }

    public BooleanExpression getPredicate(Class<? extends Object> entity, String variable) {
        PathBuilder<Class<? extends Object>> entityPath = new PathBuilder(entity, variable);
        if (isArray(criteria.getValue().toString())) {
            String[] items = criteria.getValue().toString()
                    .replace("[", "")
                    .replace("]", "")
                    .replaceAll(" ", "")
                    .split(",");
            ArrayPath arrayPath;
            if (isNumeric(items[0])) {
                ArrayList<Integer> nums = new ArrayList<>();
                for(String s : items) nums.add(Integer.valueOf(s));
                arrayPath = entityPath.getArray(criteria.getKey(), Integer.class);
                return arrayPath.in(nums);
            } else {
                arrayPath = entityPath.getArray(criteria.getKey(), String.class);
                return arrayPath.in(items);
            }
        } else if (isNumeric(criteria.getValue().toString()) || criteria.getValue() instanceof Number) {
            NumberPath<Integer> path = entityPath.getNumber(criteria.getKey(), Integer.class);
            int value = Integer.parseInt(criteria.getValue().toString());
            switch (criteria.getOperation()) {
                case "=":
                    return path.eq(value);
                case ">":
                    return path.goe(value);
                case "<":
                    return path.loe(value);
            }

        } else if (isBoolean(criteria.getValue().toString())) {
            BooleanPath path = entityPath.getBoolean(criteria.getKey());
            boolean value = Boolean.parseBoolean(criteria.getValue().toString());
            if (criteria.getOperation().equalsIgnoreCase("=")) {
                return path.eq(value);
            }
        }
        else {
            StringPath path = entityPath.getString(criteria.getKey());
            String value = criteria.getValue().toString();
            switch(criteria.getOperation()) {
                case "=":
                    return path.eq(value);
                case "__contains__":
                    return path.stringValue().contains(value);

            }
        }
        return null;
    }

    public Boolean isBoolean(String value) {
        return "true".equals(value) || "false".equals(value);
    }

    public Boolean isArray(String value) {
        return value.contains(",") || (value.contains("[") && value.contains("]"));}
}
