package com.murtoza.socialmedia_backend.repository;

import com.murtoza.socialmedia_backend.model.Post;
import com.murtoza.socialmedia_backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PostRepository extends JpaRepository<Post, Long> {

    List<Post> findByUserOrPrivacy(User user, String privacy);

    List<Post> findByPostIdNot(Long postId);

    List<Post> findByPostIdNotAndUserOrPrivacy(Long postId, User user, String privacy);

    Optional<Post> findByPostId(Long post_id);

}