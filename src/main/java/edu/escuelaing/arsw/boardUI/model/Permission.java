package edu.escuelaing.arsw.boardUI.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.util.Objects;
/**
 * Class that corresponds to the Permissions table in the database
 * @author Luis Amaya
 * @author Angie Medina
 * @author Sebastian Mina
 * @author Jose Perez
 * @version 1.0
 */

@Entity
@Table(name="permissions")
public class Permission {
    
    @Id
    @Column(name = "room_id")
    private int roomId;

    @Id
    @Column(name = "user_id")
    private int userId;

    private String type;

    public Permission() {
    }

    public Permission(int roomId, int userId, String type) {
        this.roomId = roomId;
        this.userId = userId;
        this.type = type;
    }

    public void setRoomId(int roomId) {
        this.roomId = roomId;
    }

    public int getRoomId() {
        return roomId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public int getUserId() {
        return userId;
    }

    public void setType(String type){
        this.type = type;
    }

    public String getType() {
        return type;
    }

    @Override
    public String toString() {
        return "Permission{ roomId= " + roomId + ", userId= " + userId + ", type= " + type + "}";
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
        final Permission other = (Permission) obj;
        if (!Objects.equals(this.roomId, other.roomId)) {
            return false;
        }
        if (!Objects.equals(this.userId, other.userId)) {
            return false;
        }
        if (!Objects.equals(this.type, other.type)) {
            return false;
        }
        return true;
    }
}
