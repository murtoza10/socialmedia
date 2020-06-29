package com.murtoza.socialmedia_backend.controller;

import com.murtoza.socialmedia_backend.exception.ResourceNotFoundException;
import com.murtoza.socialmedia_backend.model.Post;
import com.murtoza.socialmedia_backend.model.User;
import com.murtoza.socialmedia_backend.repository.UserRepository;
import com.murtoza.socialmedia_backend.security.CurrentUser;
import com.murtoza.socialmedia_backend.security.UserPrincipal;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @GetMapping("/me")
    @PreAuthorize("hasRole('USER')")
    public User getCurrentUser(@CurrentUser UserPrincipal userPrincipal) {
        return userRepository.findById(userPrincipal.getId())
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", userPrincipal.getId()));
    }

    @PostMapping("/pin/{userId}")
    public String Pinned(@PathVariable(value = "userId") Long userId,
                         @Valid @RequestBody Long pinned) {
        System.out.println("pinned "+pinned);
        User user= userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", userId));
        user.setPinned(pinned);
        userRepository.save(user);
        return user.getPinned() + " post is successfully pinned";
    }

    @PostMapping("/unpin")
    public String Unpinned(@Valid @RequestBody Long userId) {
        User user= userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", userId));
        user.setPinned(null);
        userRepository.save(user);
        return user.getUserId()+ " post is successfully unpinned";
    }



}
