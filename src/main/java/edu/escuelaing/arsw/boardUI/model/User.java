package edu.escuelaing.arsw.boardUI.model;


import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "users")
public class User{

    @Id
    private String username;
    private String email;
    private String password;
    private String name;

    public User() {}

    public User(String username, String password, String email, String name) {
        this.username = username;
        this.password = password;
        this.name = name;
        this.email = email;
    }

    public void setPassword(String password) {
        this.password = password;
    }
    
    public String getPassword() {
        return password;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getUsername() {
        return username;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getEmail() {
        return email;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }
}
