package edu.escuelaing.arsw.boardUI.controllers;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;
import java.security.Principal;
import java.util.LinkedList;
import java.util.List;

import javax.annotation.Generated;

import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.ui.Model;
import org.apache.tomcat.util.http.fileupload.IOUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;

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

    @Autowired
    FileServices fs;

    @Autowired
    private Environment env;

    @GetMapping("/prop/{key}")
    @ResponseBody
    public String getProp(@PathVariable String key){
        return ""+key.replaceAll("_", ".")+": "+env.getProperty(key.replaceAll("_", "."));
    }

    @GetMapping("/rooms")
    @ResponseBody
    public List<Room> getRooms(Principal principal, Model model) {
        String username = principal.getName();
        List<Room> rooms = new LinkedList<Room>();
        try{
            User currentUser = us.getUserByUsername(username);
            rooms = rs.loadRoomsByUser(currentUser.getId());
        }
        catch (Exception e){}
        return rooms;
    }

    @GetMapping("/room/{room}")
    @ResponseBody
    public List<File> getRoomFiles(@PathVariable int room, Principal principal, Model model) {
        String username = principal.getName();
        List<File> files = new LinkedList<File>();
        try{
            User currentUser = us.getUserByUsername(username);
            files = rs.loadRoomFiles(room, currentUser.getId());
        }
        catch (Exception e){}
        return files;
    }

    @PostMapping("/room")
    @ResponseBody
    public String createNewRoom(Principal principal, Model model, @RequestBody Room room){
        room.setURL(principal.getName()+"/"+room.gettitle());
        rs.saveRoom(room);
        return principal.getName()+"/"+room.gettitle();
    }

    @RequestMapping(path = "/room/{roomId}/file", method = RequestMethod.POST, consumes = MediaType.ALL_VALUE)
    @ResponseBody
	public String createNewFile(@RequestParam("file") MultipartFile file, @RequestParam("extension") String extension, @PathVariable int roomId) {
        
        if(!file.isEmpty()){
            File newFile = new File();
            try {
                String line, content ="";
                BufferedReader bufferedReader = new BufferedReader(new InputStreamReader(file.getInputStream()));
                while( (line = bufferedReader.readLine()) != null )
                { 
                    content += line+"\n";
                }
                newFile.setName(file.getOriginalFilename());
                newFile.setExtension(extension);
                newFile.setContent(content);
                newFile.setRoomId(roomId);
                newFile.setRequestId(1);
            } catch (Exception e) {}
            fs.addFile(newFile);
        }
        return "Loaded!";
	}
}
