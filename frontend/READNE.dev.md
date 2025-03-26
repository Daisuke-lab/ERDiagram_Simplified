# Set up Development Environment

## Frontend


### 1. Create an image
```
docker build . -f Dockerfile.dev -t frontend
```

### 2. Run an container
```
docker run -it -v ${PWD}:/root/workspace/ -p 3000:3000 frontend /bin/bash
```


### 3. Define env

- .env.local
```
NEXT_PUBLIC_SSR_API_URL=http://host.docker.internal:8080
NEXT_PUBLIC_CLIENT_API_URL=http://localhost:8080
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
