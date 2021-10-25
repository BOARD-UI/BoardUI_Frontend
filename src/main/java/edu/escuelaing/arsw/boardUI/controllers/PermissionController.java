package edu.escuelaing.arsw.boardUI.controllers;

import java.security.Principal;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import edu.escuelaing.arsw.boardUI.model.Permission;
import edu.escuelaing.arsw.boardUI.model.Room;
import edu.escuelaing.arsw.boardUI.model.User;
import edu.escuelaing.arsw.boardUI.services.BoardUIServicesException;
import edu.escuelaing.arsw.boardUI.services.impl.PermissionServices;
import edu.escuelaing.arsw.boardUI.services.impl.RoomServices;
import edu.escuelaing.arsw.boardUI.services.impl.UserServices;

@Controller
public class PermissionController {

    @Autowired
    PermissionServices ps;

    @Autowired
    UserServices us;

    @Autowired
    RoomServices rs;

    @PostMapping("/permission/{roomUrl}")
    @ResponseBody
    public String createNewRoom(Principal principal, @PathVariable("roomUrl") String roomUrl) throws BoardUIServicesException{
        User currentUser = us.getUserByUsername(principal.getName());
        Room currentRoom = rs.getRoomByURL(roomUrl);
        Permission permission = new Permission();
        permission.setRoomId(currentRoom.getRoomId());
        permission.setUserId(currentUser.getId());
        permission.setType("Access");
        System.out.println(currentRoom.getRoomId()+" "+currentUser.getId());
        ps.savePermission(permission);
        return "Created!";
    }

}
