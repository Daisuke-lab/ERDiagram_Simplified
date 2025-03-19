

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



## 1. Create Configmap

### 1.1 create frontend configmap
- NEXT_PUBLIC_API_URL=https://erdiagram-simplified.daisukekikuchi.net
```
kubectl create configmap er-frontend-config --from-file=.env.local
```

### 1.2 create backend configmap
```
kubectl create configmap er-backend-config --from-file=application.properties
```

### 2. Clone Repository (to fetch kubernetes yaml file)
```
sudo yum update
sudo yum install -y git
git clone https://github.com/Daisuke-lab/ERDiagram_Simplified.git
```

### 3. Apply templates
```
kubectl apply -f backend_deployment.yaml
kubectl apply -f frontend_deployment.yaml
kubectl apply -f backend_service.yaml
kubectl apply -f frontend_service.yaml
```

### 4. DNS
- https://navi.onamae.com/domain/setting/dsrecord/select
ネームサーバー/DNS>ドメインDNS設定>DNSレコード設定を利用する


### 4. Set up Nginx

```
sudo yum -y install nginx
sudo systemctl enable nginx
sudo systemctl start nginx
```

```
cd /etc/nginx
sudo vim nginx-er-diagram.conf
```

- make sure domain is linked properly
- erdiagram-simplified.daisukekikuchi.net
```
sudo yum install epel-release
sudo yum install certbot-nginx
sudo certbot --nginx
```
- certbot
- https://medium.com/@eikachiu/install-certbot-with-nginx-on-amazon-linux-2023-0a908f73ceb1


try wihout k3s