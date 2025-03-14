# Set up Development Environment

## Backend

### 1. Create an image
```
docker build . -f backend/Dockerfile.dev -t backend
```

### 2. Run an container
```
mkdir backend\.m2
docker run -it -v ${PWD}\backend:/root/workspace/ -v ${PWD}\backend\.m2:/root/.m2/ -p 8080:8080 backend /bin/bash
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


### 3. Define env

- .env.local
```
NEXT_PUBLIC_API_URL=http://host.docker.internal:8080
GOOGLE_CLIENT_ID=3391403677-3f0jtddiok448gcv1m1uc0tul1trq8ig.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=
FACEBOOK_CLIENT_ID=
FACEBOOK_CLIENT_SECRET=
GITHUB_CLIENT_ID=Iv1.084be9e6b8301a69
GITHUB_CLIENT_SECRET=
JWT_SECRET=
MONGODB_URI=
NODE_ENV=development
```

### 4. Start appliction
```
root/workspace> npm run dev 
```
