package com.feedback.service;

import com.feedback.exception.FileValidationException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.nio.file.*;
import java.util.Set;
import java.util.UUID;

@Service public class FileStorageService {
    private static final Set<String> ALLOWED=Set.of("image/jpeg","image/png","application/pdf","text/plain");
    private final Path root; private final long maxBytes;
    public FileStorageService(Path uploadPath,@Value("${feedback.max-file-size:5242880}") long maxBytes){this.root=uploadPath;this.maxBytes=maxBytes;}
    public StoredFile store(MultipartFile file){
        if(file==null||file.isEmpty()) throw new FileValidationException("Хавсралтын файл хоосон байна.");
        if(file.getSize()>maxBytes) throw new FileValidationException("Файлын хэмжээ зөвшөөрөгдсөн хязгаараас их байна.");
        String type=file.getContentType()==null?"":file.getContentType().toLowerCase();
        if(!ALLOWED.contains(type)) throw new FileValidationException("Энэ төрлийн файл зөвшөөрөгдөхгүй.");
        String original=Paths.get(file.getOriginalFilename()==null?"file":file.getOriginalFilename()).getFileName().toString();
        String stored= UUID.randomUUID().toString();
        try {Files.createDirectories(root); Path target=root.resolve(stored).normalize(); if(!target.startsWith(root)) throw new FileValidationException("Файлын зам буруу байна."); file.transferTo(target);}
        catch(IOException e){throw new FileValidationException("Файлыг хадгалж чадсангүй.");}
        return new StoredFile(original,stored,type,file.getSize());
    }
    public record StoredFile(String originalFilename,String storedFilename,String contentType,long size){}
}
