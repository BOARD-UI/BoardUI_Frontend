package edu.escuelaing.arsw.boardUI.controllers;

import java.security.Principal;
import java.util.LinkedList;
import java.util.List;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.ui.Model;

import org.springframework.beans.factory.annotation.Autowired;
import edu.escuelaing.arsw.boardUI.services.impl.*;
import edu.escuelaing.arsw.boardUI.model.File;
import edu.escuelaing.arsw.boardUI.model.Room;
import edu.escuelaing.arsw.boardUI.model.User;

@Controller
public class RoomController {

    @Autowired
    RoomServices rs;

    @Autowired
    UserServices us;

    @GetMapping("/rooms")
    @ResponseBody
    public List<Room> getRooms(Principal principal, Model model) {
        String username = principal.getName();
        List<Room> rooms = new LinkedList<Room>();
        try {
            User currentUser = us.getUserByUsername(username);
            rooms = rs.loadRoomsByUser(currentUser.getId());
        } catch (Exception e) {
        }
        return rooms;
    }

    @GetMapping("/room/{room}")
    @ResponseBody
    public List<File> getRoomFiles(@PathVariable int room, Principal principal, Model model) {
        String username = principal.getName();
        List<File> files = new LinkedList<File>();
        try {
            User currentUser = us.getUserByUsername(username);
            files = rs.loadRoomFiles(room, currentUser.getId());
        } catch (Exception e) {
        }
        return files;
    }

    @PostMapping("/room")
    public void createNewRoom(Principal principal, Model model, String title, int numMembers) {
        Room room = new Room();
        room.setTitle(title);
        room.setNumMembers(numMembers);
        room.setURL("/room/" + title);
        rs.saveRoom(room);
    }
}
