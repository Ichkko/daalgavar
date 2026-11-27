package com.feedback.service;

import com.feedback.dto.FeedbackRequest;
import org.springframework.stereotype.Service;

@Service public class SpamProtectionService {
    public boolean isSpam(FeedbackRequest request){return request.getWebsite()!=null&&!request.getWebsite().isBlank();}
}
