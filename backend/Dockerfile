FROM maven:3.6.3-jdk-11

RUN mkdir -p /root/workspace/src
RUN mkdir -p /root/deployment
COPY src/ /root/workspace/src/
COPY ./pom.xml /root/workspace/pom.xml
#COPY application.properties /root/deployment/
RUN cd /root/workspace && mvn clean install
RUN mv /root/workspace/target/backend*.jar /root/deployment/backend-1.0.0.jar
RUN ls /root/deployment/backend-1.0.0.jar
#RUN rm -rf /root/workspace
#RUN rm -rf /root/.m2
RUN 
EXPOSE 8000
CMD cd /root/deployment && java -jar backend-1.0.0.jar
