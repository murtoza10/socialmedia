package com.murtoza.socialmedia_backend.controller;

import com.murtoza.socialmedia_backend.model.Location;
import com.murtoza.socialmedia_backend.repository.LocationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/location")
public class LocationController {

    @Autowired
    private LocationRepository locationRepository;

    @GetMapping("/getAll")
    public List<Location> findAllLocations() {
        return locationRepository.findAll();
    }

}
