package com.example.library_pr.models;

import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
@Table(name = "tbl_orders")
public class Order {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	private int quantity;
	private String status;

	@ManyToOne(targetEntity = Book.class,cascade = CascadeType.ALL)
	@JoinColumn(name = "book_id",referencedColumnName = "id")
	private Book book;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public int getQuantity() {
		return quantity;
	}

	public void setQuantity(int quantity) {
		this.quantity = quantity;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public Book getBook() {
		return book;
	}

	public void setBook(Book book) {
		this.book = book;
	}

	public Order(int quantity, String status, Book book) {
		super();
		this.quantity = quantity;
		this.status = status;
		this.book = book;
	}
	

	public Order() {
		super();
	}
	
}
