FROM eclipse-temurin:17-jre
WORKDIR /app
ARG JAR_FILE=target/feedback-backend-1.0.0.jar
COPY ${JAR_FILE} app.jar
RUN mkdir -p /app/uploads /app/data
VOLUME ["/app/uploads", "/app/data"]
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "/app/app.jar"]
