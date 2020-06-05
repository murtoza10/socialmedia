package com.murtoza.socialmedia_backend.model;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "post", uniqueConstraints = {
        @UniqueConstraint(columnNames = "post_id")
})
public class Post {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long post_id;

    @Column(nullable = false)
    private String status;

    @Column(nullable = false)
    private String privacy;

    @Column(nullable = false)
    private String location;

    @Column(nullable = false)
    private Boolean pinned;

    @Column(nullable = false)
    private Date timestamp;

    @Column(nullable = false)
    private Long user_id;

    public Long getPost_id() {
        return post_id;
    }

    public void setPost_id(Long post_id) {
        this.post_id = post_id;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getPrivacy() {
        return privacy;
    }

    public void setPrivacy(String privacy) {
        this.privacy = privacy;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public Boolean getPinned() {
        return pinned;
    }

    public void setPinned(Boolean pinned) {
        this.pinned = pinned;
    }

    public Date getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(Date timestamp) {
        this.timestamp = timestamp;
    }

    public Long getUser_id() {
        return user_id;
    }

    public void setUser_id(Long user_id) {
        this.user_id = user_id;
    }




}
