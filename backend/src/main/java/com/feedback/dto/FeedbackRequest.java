package com.feedback.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class FeedbackRequest {
    @NotBlank @Size(max=120) private String name;
    @NotBlank @Email @Size(max=254) private String email;
    @NotBlank @Size(max=10000) private String message;
    @Size(max=200) private String website;
    public String getName(){return name;} public void setName(String v){name=v;}
    public String getEmail(){return email;} public void setEmail(String v){email=v;}
    public String getMessage(){return message;} public void setMessage(String v){message=v;}
    public String getWebsite(){return website;} public void setWebsite(String v){website=v;}
}
