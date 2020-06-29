package com.murtoza.socialmedia_backend.controller;

import com.murtoza.socialmedia_backend.exception.ResourceNotFoundException;
import com.murtoza.socialmedia_backend.model.Post;
import com.murtoza.socialmedia_backend.model.User;
import com.murtoza.socialmedia_backend.repository.PostRepository;
import com.murtoza.socialmedia_backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/post")
public class PostController {

    @Autowired
    private PostRepository postRepository;

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/addPost/{userId}")
    public String savePost(@PathVariable (value = "userId") Long userId,
                           @Valid @RequestBody Post post) {
        userRepository.findById(userId).map(user -> {
            post.setUser(user);
            return postRepository.save(post);
        }).orElseThrow(() -> new ResourceNotFoundException("User", "id", userId));
        return post.getStatus() + " is successfully stored";
    }

    @GetMapping("/getAll")
    public List<Post> findAllPosts() {
        return postRepository.findAll();
    }

    @GetMapping("/getAllByUser/{userId}")
    public List<Post> findAllPostsByUserOrPrivacy(@PathVariable (value = "userId") Long userId) {

        User user=userRepository.findById(userId).
        orElseThrow(() -> new ResourceNotFoundException("User", "id", userId));
        return postRepository.findByUserOrPrivacy(user,"public");
    }

    @GetMapping("/getFilteredPostByUser/{userId}")
    public List<Post> findAllPostsByUserOrPrivacyFilteredByPostId(@PathVariable (value = "userId") Long userId) {

        User user=userRepository.findById(userId).
                orElseThrow(() -> new ResourceNotFoundException("User", "id", userId));
        return postRepository.findByPostIdNotAndUserOrPrivacy(user.getPinned(), user,"public");
    }

    @GetMapping("/getPostByPostid/{postId}")
    public Post findPostByPostId(@PathVariable (value = "postId") Long postId) {

        return postRepository.findByPostId(postId).
                orElseThrow(() -> new ResourceNotFoundException("Post", "id", postId));
    }


    }
