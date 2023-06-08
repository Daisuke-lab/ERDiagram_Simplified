FROM maven:3.6.3-jdk-11

RUN mkdir -p /root/workspace
RUN mkdir -p /root/deployment
COPY . /root/workspace/
COPY application.properties /root/deployment/
RUN cd /root/workspace && mvn install
RUN mv /root/workspace/target/backend-1.0.0.jar /root/deployment/backend-1.0.0.jar
RUN rm -rf /root/workspace
RUN rm -rf /root/.m2
EXPOSE 8000
CMD java -jar /root/deployment/backend-1.0.0.jar  -Dspring.config.location="file:/root/deployment/application.properties"
