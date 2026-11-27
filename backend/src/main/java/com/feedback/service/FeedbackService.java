package com.feedback.service;

import com.feedback.dto.FeedbackRequest;
import com.feedback.entity.Attachment;
import com.feedback.entity.Feedback;
import com.feedback.exception.FileValidationException;
import com.feedback.repository.FeedbackRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

@Service public class FeedbackService {
    private final FeedbackRepository repository; private final FileStorageService storage; private final SpamProtectionService spam;
    public FeedbackService(FeedbackRepository repository,FileStorageService storage,SpamProtectionService spam){this.repository=repository;this.storage=storage;this.spam=spam;}
    @Transactional public Feedback submit(FeedbackRequest request,MultipartFile file){
        if(spam.isSpam(request)) throw new FileValidationException("Хүсэлт хүлээн авах боломжгүй.");
        Feedback feedback=new Feedback(request.getName().trim(),request.getEmail().trim(),request.getMessage().trim());
        if(file!=null&&!file.isEmpty()){var f=storage.store(file);feedback.addAttachment(new Attachment(f.originalFilename(),f.storedFilename(),f.contentType(),f.size()));}
        return repository.save(feedback);
    }
}
