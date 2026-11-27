package com.feedback.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import java.nio.file.Path;
import java.nio.file.Paths;

@Configuration
public class FileStorageConfig {
    @Bean Path uploadPath(@Value("${feedback.upload-dir:uploads}") String dir){return Paths.get(dir).toAbsolutePath().normalize();}
}
