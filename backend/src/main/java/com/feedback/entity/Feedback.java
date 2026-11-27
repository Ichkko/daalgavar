package com.feedback.entity;

import jakarta.persistence.*;
import java.time.Instant;
import java.util.ArrayList;
import java.util.List;

@Entity @Table(name="feedback")
public class Feedback {
    @Id @GeneratedValue(strategy=GenerationType.IDENTITY) private Long id;
    @Column(nullable=false,length=120) private String name;
    @Column(nullable=false,length=254) private String email;
    @Column(nullable=false,length=10000) private String message;
    @Column(nullable=false) private Instant createdAt=Instant.now();
    @OneToMany(mappedBy="feedback",cascade=CascadeType.ALL,orphanRemoval=true) private List<Attachment> attachments=new ArrayList<>();
    protected Feedback() {}
    public Feedback(String name,String email,String message){this.name=name;this.email=email;this.message=message;}
    public Long getId(){return id;} public String getName(){return name;} public String getEmail(){return email;} public String getMessage(){return message;} public Instant getCreatedAt(){return createdAt;}
    public List<Attachment> getAttachments(){return attachments;}
    public void addAttachment(Attachment a){attachments.add(a);a.setFeedback(this);}
}
