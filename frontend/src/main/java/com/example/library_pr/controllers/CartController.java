package com.example.library_pr.controllers;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Collection;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.library_pr.models.Book;
import com.example.library_pr.models.Cart;
import com.example.library_pr.models.Order;
import com.example.library_pr.models.ResponseObject;
import com.example.library_pr.models.User;
import com.example.library_pr.payload.request.AddCartRequest;
import com.example.library_pr.repositories.BookRepository;
import com.example.library_pr.repositories.CartRepository;
import com.example.library_pr.repositories.OrderRepository;
import com.example.library_pr.repositories.UserRepository;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api")
public class CartController {
	@Autowired
	private BookRepository bookRepository;
	@Autowired
	private OrderRepository orderRepository;
	@Autowired
	private CartRepository cartRepository;
	@Autowired
	private UserRepository userRepository;
	@GetMapping("/orders")
	ResponseEntity<ResponseObject> getOrderHistory(){
		try {
			Authentication auth = SecurityContextHolder.getContext().getAuthentication();
			Optional<User> optionUser = userRepository.findByUsername(auth.getName());
			User user = optionUser.get();
			List<Cart> carts = cartRepository.findByUserId(user.getId());
			return ResponseEntity.status(HttpStatus.OK).body(
		  	           new ResponseObject("ok", "Get carts successfully",carts)
		  	        );
			
		}
		catch(Exception e) {
			return ResponseEntity.status(HttpStatus.OK).body(
		  	           new ResponseObject("ok", "Get carts faild",e.getMessage())
		  	        );
		}
		
	}
	@PostMapping("cart/add")
	ResponseEntity<ResponseObject> addCart(@Valid @RequestBody AddCartRequest addCartRequest){
		String[] ids = addCartRequest.getId().split(" ");
		String[] quantities = addCartRequest.getQuantity().split(" ");
		Collection<Order> orders = new ArrayList<>();
		try {
			for(int i=0;i<ids.length;i++) {
				Book book= bookRepository.findById(Long.parseLong(ids[i])).get();
				Order order = new Order(Integer.parseInt(quantities[i]),"INIT",book);
				orders.add(order);
				
			}
			Date date = Calendar.getInstance().getTime();  
			DateFormat dateFormat = new SimpleDateFormat("yyyy-mm-dd hh:mm:ss");  
			String strDate = dateFormat.format(date);  
			Authentication auth = SecurityContextHolder.getContext().getAuthentication();
			Optional<User> optionUser = userRepository.findByUsername(auth.getName());
			User user = optionUser.get();
			Cart cart = new Cart(strDate,orders,user);
			
			
			return ResponseEntity.status(HttpStatus.OK).body(
     	           new ResponseObject("ok", "Insert cart successfully",cartRepository.save(cart))
     	        );
		}
		catch(Exception e){
			return ResponseEntity.status(HttpStatus.OK).body(
	     	           new ResponseObject("ok", "Insert cart faild","")
	     	        );
		}
	}
}
