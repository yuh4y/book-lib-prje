package com.example.library_pr.repositories;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.library_pr.models.Rating;


public interface RatingRepository extends JpaRepository<Rating, Long> {
  List<Rating> findByBookId(Long bookId);
  
  @Transactional
  void deleteByBookId(long bookId);
}