package com.example.library_pr.models;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;


@Entity
@Table(name = "tbl_rating")
public class Rating {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	@Column(nullable = false)
	private String comment;
	@Column(nullable = false)
	private float star;
	@Column(nullable = false)
	private String datetime;
	@ManyToOne(targetEntity = User.class,cascade = CascadeType.ALL)
	@JoinColumn(name = "user_id",referencedColumnName = "id")
	private User user;
	@ManyToOne(targetEntity = Book.class,cascade = CascadeType.ALL)
	@JoinColumn(name = "book_id",referencedColumnName = "id")
	private Book book;
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getComment() {
		return comment;
	}
	public void setComment(String comment) {
		this.comment = comment;
	}
	public float getStar() {
		return star;
	}
	public void setStar(float star) {
		this.star = star;
	}
	public String getDatetime() {
		return datetime;
	}
	public void setDatetime(String datetime) {
		this.datetime = datetime;
	}
	public User getUser() {
		return user;
	}
	public void setUser(User user) {
		this.user = user;
	}
	public Book getBook() {
		return book;
	}
	public void setBook(Book book) {
		this.book = book;
	}
	public Rating(String comment, float star, String datetime, User user, Book book) {
		super();
		this.comment = comment;
		this.star = star;
		this.datetime = datetime;
		this.user = user;
		this.book = book;
	}
	public Rating() {
		super();
	}
	
	
	
	
}
