package com.feedback.exception;

import org.springframework.http.*;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

@RestControllerAdvice public class GlobalExceptionHandler {
    @ExceptionHandler(FileValidationException.class) ResponseEntity<?> fileError(FileValidationException e){return ResponseEntity.badRequest().body(Map.of("error",e.getMessage()));}
    @ExceptionHandler(MethodArgumentNotValidException.class) ResponseEntity<?> validation(MethodArgumentNotValidException e){return ResponseEntity.badRequest().body(Map.of("error","Илгээсэн мэдээллээ шалгана уу."));}
    @ExceptionHandler(Exception.class) ResponseEntity<?> unexpected(Exception e){return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of("error","Серверийн алдаа гарлаа."));}
}
