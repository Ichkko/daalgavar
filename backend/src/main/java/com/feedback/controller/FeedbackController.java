package com.feedback.controller;

import com.feedback.dto.*;
import com.feedback.service.FeedbackService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController @RequestMapping("/api/feedback")
public class FeedbackController {
    private final FeedbackService service; public FeedbackController(FeedbackService service){this.service=service;}
    @PostMapping(consumes=MediaType.MULTIPART_FORM_DATA_VALUE) @ResponseStatus(HttpStatus.CREATED)
    public FeedbackResponse submit(@Valid @RequestPart("feedback") FeedbackRequest request,@RequestPart(value="file",required=false) MultipartFile file){var saved=service.submit(request,file);return new FeedbackResponse(saved.getId(),"received",saved.getCreatedAt());}
}
