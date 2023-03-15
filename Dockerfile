FROM openjdk:19

ENV ENVIROMENT=prod

MAINTAINER Ana Velasquez <ana.maria.velasquez91@gmail.com>

EXPOSE 8080

ADD ./backend/target/app.jar app.jar

CMD ["sh", "-c", "java -jar /app.jar"]