package com.example.library_pr.payload.request;

import javax.validation.constraints.NotBlank;

public class AddCartRequest {
	@NotBlank
	private String id;
	@NotBlank
	private String quantity;
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getQuantity() {
		return quantity;
	}
	public void setQuantity(String quantity) {
		this.quantity = quantity;
	}
	
}
