

## 1. Create Configmap

### 1.1 create frontend configmap
- NEXT_PUBLIC_API_URL=http://er-backend-service:8080
```
kubectl create configmap er-frontend-config --from-file=.env.local
```

### 1.2 create backend configmap
```
kubectl create configmap er-backend-config --from-file=application.properties
```

