package edu.escuelaing.arsw.boardUI.model;

import java.util.Objects;

public class Room {

    private String idRoom;
    private String title;
    private Integer num_Members;
    private String URL;

    public Room() {
    }

    public Room(String idRoom, String title, Integer num_Members, String URL) {
        this.idRoom = idRoom;
        this.title = title;
        this.num_Members = num_Members;
        this.URL = URL;

    }

    public String getId() {
        return idRoom;
    }

    public String gettitle() {
        return title;
    }

    public String getURL() {
        return URL;
    }

    public void addMember(Integer members) {
        this.num_Members += members;
    }

    public void subsMember() {
        this.num_Members -= 1;
    }

    public void subsMember(Integer members) {
        this.num_Members -= members;
    }

    @Override
    public String toString() {
        return "Sala{ idRoom= " + idRoom + ", title= " + title + "Numero de members= " + num_Members + " URL= " + URL
                + "}";
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj) {
            return true;
        }
        if (obj == null) {
            return false;
        }
        if (getClass() != obj.getClass()) {
            return false;
        }
        final Room other = (Room) obj;
        if (!Objects.equals(this.title, other.title)) {
            return false;
        }
        if (!Objects.equals(this.num_Members, other.num_Members)) {
            return false;
        }
        if (!Objects.equals(this.idRoom, other.idRoom)) {
            return false;
        }
        if (!Objects.equals(this.URL, other.URL)) {
            return false;
        }

        return true;
    }
}
