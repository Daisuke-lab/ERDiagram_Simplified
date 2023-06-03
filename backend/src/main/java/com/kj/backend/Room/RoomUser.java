package com.kj.backend.Room;

public class RoomUser {
    private String email;
    private Role role;

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }

    public RoomUser(String email, Role role) {
        this.email = email;
        this.role = role;
    }
}
