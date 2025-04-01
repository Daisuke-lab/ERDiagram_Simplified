# Set up Development Environment

## Backend
### 1. Create an image
```
docker build . -f backend/Dockerfile.dev -t backend
```

### 2. Run an container
```
mkdir backend\.m2
docker run -it -v ${PWD}:/root/workspace/ -v ${PWD}\.m2:/root/.m2/ -p 8080:8080 backend /bin/bash
```

### 3. Define application.properties

- backend\src\main\resources\application.properties
```
spring.datasource.url=XXXXXXXXXXXx
```

### 3.start appliction
```
root/workspace> mvn spring-boot:run
```

### If you can't connect to MongoDB
It is possible that MongoDB has been paused due to non-access for a while.<br>
Enable it in the following page.
https://cloud.mongodb.com/v2/60da479703000343d7fbee7b#/clusters
