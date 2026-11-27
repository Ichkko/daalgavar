package com.feedback.dto;

import java.time.Instant;

public record FeedbackResponse(Long id, String status, Instant createdAt) {}
