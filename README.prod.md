

## 1. Create Configmap

### 1.1 create frontend configmap
```
kubectl create configmap er-frontend-config --from-file=.env.local
```

### 1.2 create backend configmap
```
kubectl create configmap er-backend-config --from-file=application.properties
```

