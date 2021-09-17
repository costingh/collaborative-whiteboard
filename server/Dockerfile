FROM adoptopenjdk/openjdk16:alpine-jre
ADD target/whiteboard-0.0.1-SNAPSHOT.jar app.jar
ENTRYPOINT ["java","-jar","app.jar"]