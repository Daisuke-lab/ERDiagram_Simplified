# Set up Development Environment

## Backend


## Frontend


```
# run on git bash
docker run -f frontend/Dockerfile.dev -t frontend
```

```
# run on git bash
docker run -it -v ${PWD}/frontend:/root/workspace/ -p -p 3000:3000 frontend /bin/bash
```