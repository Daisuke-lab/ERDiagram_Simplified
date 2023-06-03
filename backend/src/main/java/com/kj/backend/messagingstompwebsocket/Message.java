package com.kj.backend.messagingstompwebsocket;

public class Message<T> {

    private String dataType;
    private String method;
    private T oldData;
    private T newData;
    private boolean isRedo;
    private boolean isUndo;

    public boolean getIsRedo() {
        return isRedo;
    }

    public void setIsRedo(boolean isRedo) {
        this.isRedo = isRedo;
    }

    public boolean getIsUndo() {
        return isUndo;
    }

    public void setIsUndo(boolean isUndo) {
        this.isUndo = isUndo;
    }



    public Message() {
    }

    public Message(String dataType, String method, T oldData, T newData, boolean isRedo, boolean isUndo) {
        this.dataType = dataType;
        this.method = method;
        this.oldData = oldData;
        this.newData = newData;
        this.isRedo = isRedo;
        this.isUndo = isUndo;

    }

    public String getDataType() {
        return dataType;
    }

    public void setDataType(String dataType) {
        this.dataType = dataType;
    }

    public T getOldData() {
        return oldData;
    }

    public void setOldData(T oldData) {
        this.oldData = oldData;
    }

    public T getNewData() {
        return newData;
    }

    public void setNewData(T newData) {
        this.newData = newData;
    }

    public String getMethod() {
        return method;
    }

    public void setMethod(String method) {
        this.method = method;
    }
}
