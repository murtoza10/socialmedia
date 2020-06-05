package com.murtoza.socialmedia_backend.model;

import javax.persistence.*;

@Entity
@Table(name = "location", uniqueConstraints = {
        @UniqueConstraint(columnNames = "location_id")
})
public class Location {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long location_id;

    public Long getLocation_id() {
        return location_id;
    }

    public void setLocation_id(Long location_id) {
        this.location_id = location_id;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    @Column(nullable = false)
    private String location;
}
