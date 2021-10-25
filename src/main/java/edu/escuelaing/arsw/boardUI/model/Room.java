package edu.escuelaing.arsw.boardUI.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import java.util.Objects;
/**
 * Class that corresponds to the Rooms table in the database
 * @author Luis Amaya
 * @author Angie Medina
 * @author Sebastian Mina
 * @author Jose Perez
 * @version 1.0
 */

@Entity
@Table(name = "rooms")
public class Room { 

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "room_id")
    private int roomId;

    private String title;

    @Column(name = "num_members")
    private Integer numMembers;

    private String URL;

    public Room() {
    }

    public Room(int roomId, String title, Integer numMembers, String URL) {
        this.roomId = roomId;
        this.title = title;
        this.numMembers = numMembers;
        this.URL = URL;

    }

    public int getRoomId() {
        return roomId;
    }

    public void setRoomId(int roomId) {
        this.roomId = roomId;
    }

    public String gettitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getURL() {
        return URL;
    }

    public void setURL(String uRL) {
        URL = uRL;
    }

    public void setNumMembers(Integer numMembers) {
        this.numMembers = numMembers;
    }

    public void addMember(Integer members) {
        this.numMembers += members;
    }

    public void subsMember() {
        this.numMembers -= 1;
    }

    public void subsMember(Integer members) {
        this.numMembers -= members;
    }

    @Override
    public String toString() {
        return "Room{ roomId= " + roomId + ", title= " + title + ", Number of members= " + numMembers + ", URL= " + URL + "}";
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
        if (!Objects.equals(this.numMembers, other.numMembers)) {
            return false;
        }
        if (!Objects.equals(this.roomId, other.roomId)) {
            return false;
        }
        if (!Objects.equals(this.URL, other.URL)) {
            return false;
        }

        return true;
    }
}
