package com.example.library_pr.models;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import lombok.*;

@Entity
@Table(name = "tbl_feature_image")
public class ImageFeatureBook {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	private String url;
	public ImageFeatureBook(String url) {
		super();
		this.url = url;
	}
	public ImageFeatureBook() {
		super();
	}
	public String getUrl() {
		return url;
	}
	public void setUrl(String url) {
		this.url = url;
	}
	
	
}
