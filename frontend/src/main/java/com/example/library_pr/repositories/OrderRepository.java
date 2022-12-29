package com.example.library_pr.repositories;


import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.library_pr.models.Order;


@Repository
public interface OrderRepository extends JpaRepository<Order,Long> {
	
}