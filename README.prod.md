

## 0. SSH to EC2

```
ssh ec2-user@X.XX.XX.XX -i "C:\Users\daisu\.ssh\ER-Kubernetes.pem"
```

## 1. Set Up K3s

- https://docs.k3s.io/quick-start

```
vim ~/.bashrc
###
alias k="sudo k3s kubectl"
alias kubectl="sudo k3s kubectl"
###

source ~/.bashrc
```


## 1. Copy config files.

Run on EC2
```
mkdir -p /home/ec2-user/config
```

Run on your host
```
scp -i "C:\Users\daisu\.ssh\ER-Kubernetes.pem" backend\src\main\resources\application.properties ec2-user@X.XX.XX.XX:/home/ec2-user/config/
```

```
scp -i "C:\Users\daisu\.ssh\ER-Kubernetes.pem" C:\workspace\webs\ERDiagram_Simplified\frontend\.env.local ec2-user@X.XX.XX.XX:/home/ec2-user/config/
```



## 2. Create Configmap

### 2.1 create frontend configmap
- NEXT_PUBLIC_API_URL=https://erdiagram-simplified.daisukekikuchi.net
```
kubectl create configmap er-frontend-config --from-file=.env.local
```

### 2.2 create backend configmap
```
kubectl create configmap er-backend-config --from-file=application.properties
```



## 3. Apply other templates

### 3.1 Clone Repository (to fetch kubernetes yaml file)
```
sudo yum update
sudo yum install -y git
git clone https://github.com/Daisuke-lab/ERDiagram_Simplified.git
```


### 3.2 Apply templates
```
kubectl apply -f backend_deployment.yaml
kubectl apply -f frontend_deployment.yaml
kubectl apply -f backend_service.yaml
kubectl apply -f frontend_service.yaml
kubectl apply -f traefik_ingress_route.yaml
kubectl apply -f traefik_ingress_route_tls.yaml
```

## 4. DNS
- https://navi.onamae.com/domain/setting/dsrecord/select
ネームサーバー/DNS>ドメインDNS設定>DNSレコード設定を利用する

## 5. Create PV/PVC for TLS
```
sudo mkdir -p /mnt/pv/er-tls
sudo chown -R 1000:1000 /mnt/pv/er-tls
sudo chmod -R 750 /mnt/pv/er-tls
kubectl apply -f traefik_tls_pv.yaml
kubectl apply -f traefik_tls_pvc.yaml
```

### 5. Traefik
update controller