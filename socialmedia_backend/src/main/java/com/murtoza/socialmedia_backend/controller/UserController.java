package com.murtoza.socialmedia_backend.controller;

import com.murtoza.socialmedia_backend.exception.ResourceNotFoundException;
import com.murtoza.socialmedia_backend.model.User;
import com.murtoza.socialmedia_backend.repository.UserRepository;
import com.murtoza.socialmedia_backend.security.CurrentUser;
import com.murtoza.socialmedia_backend.security.UserPrincipal;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @GetMapping("/user/me")
    @PreAuthorize("hasRole('USER')")
    public User getCurrentUser(@CurrentUser UserPrincipal userPrincipal) {
        return userRepository.findById(userPrincipal.getId())
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", userPrincipal.getId()));
    }
}
