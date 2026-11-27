package com.feedback.config;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@Configuration
@ConfigurationProperties(prefix="feedback.rate-limit")
public class RateLimitConfig {
    private int maxRequests=10; private long windowSeconds=60;
    public int getMaxRequests(){return maxRequests;} public void setMaxRequests(int v){maxRequests=v;}
    public long getWindowSeconds(){return windowSeconds;} public void setWindowSeconds(long v){windowSeconds=v;}
}
