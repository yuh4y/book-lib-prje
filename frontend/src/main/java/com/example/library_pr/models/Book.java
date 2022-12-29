package com.example.library_pr.models;

import java.util.Collection;
import lombok.*;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import javax.persistence.CascadeType;


@Entity
@Table(name = "tbl_book")
public class Book {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	@Column(nullable = false, unique = true)
	private String title;
	@Column(nullable = false)
	private String author;
	@Column(nullable = false)
	private String description;
	@Column(nullable = false)
	private String dateRelease;
	private int totalPage;
	private String typeBook;	
	@OneToMany(targetEntity = ImageFeatureBook.class, cascade = CascadeType.ALL)
	@JoinColumn(name="bookId", referencedColumnName = "id")
	private Collection<ImageFeatureBook> imageFeatureBooks;
	
	public Book(String title, String author, String description, String dateRelease, int totalPage, String typeBook,
			Collection<ImageFeatureBook> imageFeatureBooks) {
		super();
		this.title = title;
		this.author = author;
		this.description = description;
		this.dateRelease = dateRelease;
		this.totalPage = totalPage;
		this.typeBook = typeBook;
		this.imageFeatureBooks = imageFeatureBooks;
	}
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public String getAuthor() {
		return author;
	}
	public void setAuthor(String author) {
		this.author = author;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public String getDateRelease() {
		return dateRelease;
	}
	public void setDateRelease(String dateRelease) {
		this.dateRelease = dateRelease;
	}
	public int getTotalPage() {
		return totalPage;
	}
	public void setTotalPage(int totalPage) {
		this.totalPage = totalPage;
	}
	public String getTypeBook() {
		return typeBook;
	}
	public void setTypeBook(String typeBook) {
		this.typeBook = typeBook;
	}
	public Collection<ImageFeatureBook> getImageFeatureBooks() {
		return imageFeatureBooks;
	}
	public void setImageFeatureBooks(Collection<ImageFeatureBook> imageFeatureBooks) {
		this.imageFeatureBooks = imageFeatureBooks;
	}
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public Book() {
		super();
	}
	
	
}
