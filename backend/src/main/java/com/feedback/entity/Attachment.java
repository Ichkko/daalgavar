package com.feedback.entity;

import jakarta.persistence.*;

@Entity @Table(name="attachments")
public class Attachment {
    @Id @GeneratedValue(strategy=GenerationType.IDENTITY) private Long id;
    @Column(nullable=false) private String originalFilename;
    @Column(nullable=false) private String storedFilename;
    @Column(nullable=false) private String contentType;
    private long size;
    @ManyToOne(fetch=FetchType.LAZY,optional=false) @JoinColumn(name="feedback_id") private Feedback feedback;
    protected Attachment() {}
    public Attachment(String originalFilename,String storedFilename,String contentType,long size){this.originalFilename=originalFilename;this.storedFilename=storedFilename;this.contentType=contentType;this.size=size;}
    public void setFeedback(Feedback feedback){this.feedback=feedback;}
}
