package com.murtoza.socialmedia_backend.controller;

import com.murtoza.socialmedia_backend.model.Location;
import com.murtoza.socialmedia_backend.model.Post;
import com.murtoza.socialmedia_backend.repository.PostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/post")
public class PostController {

    @Autowired
    private PostRepository postRepository;

    @PostMapping("/Addpost")
    public String savePost(@RequestBody Post post) {
        postRepository.save(post);
        return post.getStatus() + " is successfully stored";
    }

    @GetMapping("/getAll")
    public List<Post> findAllPosts() {
        return postRepository.findAll();
    }

    @RequestMapping(value = "/Updatepost/{post_id}",
            method = RequestMethod.PUT,consumes = {"text/plain;charset=UTF-8", org.springframework.http.MediaType.APPLICATION_JSON_VALUE})
    public String updatePost(@RequestBody Post post,@PathVariable Long post_id) {

        if(postRepository.findById(post_id).isPresent()){
            Post postById = postRepository.findById(post_id).get();
            postById.setStatus(post.getStatus());
            postById.setLocation(post.getLocation());
            postById.setPinned(post.getPinned());
            postById.setPrivacy(post.getPrivacy());
            postRepository.save(postById);
        }

            return post.getPost_id()+ " is successfully updated";
    }
    }
