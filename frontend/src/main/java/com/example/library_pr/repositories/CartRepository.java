package com.example.library_pr.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.library_pr.models.Book;
import com.example.library_pr.models.Cart;


@Repository
public interface CartRepository extends JpaRepository<Cart,Long> {
	List<Cart> findByUserId(Long id);
}