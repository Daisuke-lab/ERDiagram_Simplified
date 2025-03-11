# Set up Development Environment

## Backend

### 1. Create an image
```
docker build . -f backend/Dockerfile.dev -t backend
```

### 2. Run an container
```
mkdir backend\.m2
docker run -it -v ${PWD}\backend:/root/workspace/ -v ${PWD}\backend\.m2:/root/.m2/ --network=host backend /bin/bash
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

## Frontend


### 1. Create an image
```
docker build . -f frontend/Dockerfile.dev -t frontend
```

### 2. Run an container
```
docker run -it -v ${PWD}\frontend:/root/workspace/ -p 3000:3000 frontend /bin/bash
```

### 3.start appliction
```
root/workspace> npm run dev 
```
