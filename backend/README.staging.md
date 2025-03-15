## Backend
meant to be a document to test production image locally.

### 1. Build Production Image
```
docker build . -f Dockerfile -t backend-production
```


### 2. Run an container
```
docker run -it -v ${PWD}\src\main\resources:/root/deployment/ -p 8080:8080 backend-production
```

