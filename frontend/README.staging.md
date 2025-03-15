

### 1. Build Production Image
```
docker build . -f Dockerfile -t frontend-production
```

### 2. Run an container
```
docker run -it -v ${PWD}\.env.local:/root/workspace/ -p 3000:3000 frontend-production
```