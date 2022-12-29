package com.example.library_pr.controllers;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collection;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.example.library_pr.models.Book;
import com.example.library_pr.models.ImageFeatureBook;
import com.example.library_pr.models.ResponseObject;
import com.example.library_pr.repositories.BookRepository;
import com.example.library_pr.services.IStorageService;
import com.example.library_pr.services.ImageStorageService;


@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api")
public class BookController {
	@Autowired
	private BookRepository bookRepository;
	private IStorageService storageService = new ImageStorageService();
	@GetMapping("/books")
	List<Book> getAllBooks(){
		return bookRepository.findAll();
	}
	@GetMapping("book/{id}")
	ResponseEntity<ResponseObject> getDetail(@PathVariable Long id){
		Optional<Book> foundBook = bookRepository.findById(id);
        return foundBook.isPresent() ?
                ResponseEntity.status(HttpStatus.OK).body(
                        new ResponseObject("ok", "Query book successfully", foundBook)
                ):
                ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                        new ResponseObject("failed", "Cannot find book with id = "+id, "")
                );
	}
	 @GetMapping("/files/{fileName:.+}")
	   public ResponseEntity<byte[]> readDetailFile(@PathVariable String fileName) {
	       try {
	           byte[] bytes = storageService.readFileContent(fileName);
	           return ResponseEntity
	                   .ok()
	                   .contentType(MediaType.IMAGE_JPEG)
	                   .body(bytes);
	       }catch (Exception exception) {
	           return ResponseEntity.noContent().build();
	       }
	   }
	@CrossOrigin
	@PostMapping("/book/insert")
	@ResponseBody
	@PreAuthorize("hasRole('MODERATOR') or hasRole('ADMIN')")
	ResponseEntity<ResponseObject> insertBook(
			@RequestParam("title") String title, 
			@RequestParam("author") String author, 
			@RequestParam("description") String description,
			@RequestParam("dateRelease") String dateRelease, 
			@RequestParam("totalPage") String totalPage, 
			@RequestParam("typeBook") String typeBook, 
			@RequestParam("files") MultipartFile[] files){
		Collection<ImageFeatureBook> imgs = new ArrayList(); 
		Book book = new Book();
		book.setAuthor(author);
		book.setDateRelease(dateRelease);
		book.setTitle(title);
		book.setDescription(description);
		book.setTotalPage(Integer.valueOf(totalPage));
		book.setTypeBook(typeBook);
        try {
        	Arrays.asList(files).stream().forEach(file -> {
        		String generatedFileName = storageService.storeFile(file);
                ImageFeatureBook img = new ImageFeatureBook(generatedFileName);
                imgs.add(img);
                
              });
        	book.setImageFeatureBooks(imgs);
        	 return ResponseEntity.status(HttpStatus.OK).body(
        	           new ResponseObject("ok", "Insert book successfully", bookRepository.save(book))
        	        );
        }
        catch(Exception e) {
        	e.printStackTrace();
        	return ResponseEntity.status(HttpStatus.NOT_IMPLEMENTED).body(
     	           new ResponseObject("Failed",e.getMessage(), "")
     	        );
        }
        
       
	}
	@PutMapping("book/{id}")
	@PreAuthorize("hasRole('MODERATOR') or hasRole('ADMIN')")
	ResponseEntity<ResponseObject> updateBook(
			@PathVariable Long id,
			@RequestParam String title, 
			@RequestParam String author, 
			@RequestParam String description,
			@RequestParam String dateRelease, 
			@RequestParam String totalPage, 
			@RequestParam String typeBook, 
			@RequestParam("files") MultipartFile[] files){
		
		Book book = bookRepository.findById(id)
				.map(
				bookUpdate -> {
					
					bookUpdate.setAuthor(author);
					bookUpdate.setDateRelease(dateRelease);
					bookUpdate.setTitle(title);
					bookUpdate.setDescription(description);
					bookUpdate.setTotalPage(Integer.valueOf(totalPage));
					bookUpdate.setTypeBook(typeBook);
					Collection<ImageFeatureBook> imgs = new ArrayList();
					try {
			        	Arrays.asList(files).stream().forEach(file -> {
			        		String generatedFileName = storageService.storeFile(file);
			                ImageFeatureBook img = new ImageFeatureBook(generatedFileName);
			                imgs.add(img);
			                
			              });
			        	bookUpdate.setImageFeatureBooks(imgs);
			        }
					catch(Exception e) {
						e.printStackTrace();
					}
					return bookRepository.save(bookUpdate);
				}
				)
				.orElseGet(
						()-> {
							Book newBook = new Book();
							newBook.setAuthor(author);
							newBook.setDateRelease(dateRelease);
							newBook.setTitle(title);
							newBook.setDescription(description);
							newBook.setTotalPage(Integer.valueOf(totalPage));
							newBook.setTypeBook(typeBook);
							Collection<ImageFeatureBook> imgs = new ArrayList();
							try {
					        	Arrays.asList(files).stream().forEach(file -> {
					        		String generatedFileName = storageService.storeFile(file);
					                ImageFeatureBook img = new ImageFeatureBook(generatedFileName);
					                imgs.add(img);
					                
					              });
					        	newBook.setImageFeatureBooks(imgs);
					        }
							catch(Exception e) {
								e.printStackTrace();
							}
		                    return bookRepository.save(newBook);
						}
				);
		return ResponseEntity.status(HttpStatus.OK).body(
                new ResponseObject("ok", "Update book successfully",book)
        );
	}
	@DeleteMapping("/book/{id}")
	@PreAuthorize("hasRole('MODERATOR') or hasRole('ADMIN')")
    ResponseEntity<ResponseObject> deleteBook(@PathVariable Long id) {
        boolean exists = bookRepository.existsById(id);
        if(exists) {
        	bookRepository.deleteById(id);
            return ResponseEntity.status(HttpStatus.OK).body(
                new ResponseObject("ok", "Delete book successfully", "")
            );
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
            new ResponseObject("failed", "Cannot find book to delete", "")
        );
    }
	@GetMapping("/user")
	@PreAuthorize("hasRole('USER') or hasRole('MODERATOR') or hasRole('ADMIN')")
	public String userAccess() {
		return "User Content.";
	}

	@GetMapping("/mod")
	@PreAuthorize("hasRole('MODERATOR')")
	public String moderatorAccess() {
		return "Moderator Board.";
	}

	@GetMapping("/admin")
	@PreAuthorize("hasRole('ADMIN')")
	public String adminAccess() {
		return "Admin Board.";
	}

}
