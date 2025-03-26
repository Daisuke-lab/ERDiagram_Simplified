

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
kubectl apply -f traefik_ingress_route.yaml
kubectl apply -f traefik_ingress_route_tls.yaml
```

### 4. DNS
- https://navi.onamae.com/domain/setting/dsrecord/select
ネームサーバー/DNS>ドメインDNS設定>DNSレコード設定を利用する

### 5. Create PV/PVC for TLS
```
sudo mkdir -p /mnt/pv/er-tls
sudo chown -R 1000:1000 /mnt/pv/er-tls
sudo chmod -R 750 /mnt/pv/er-tls
kubectl apply -f traefik_tls_pv.yaml
kubectl apply -f traefik_tls_pvc.yaml
```

### 5. Traefik

- https://www.reddit.com/r/Traefik/comments/yu159c/cant_connect_websocket_on_k3s/
- https://traefik.io/blog/secure-web-applications-with-traefik-proxy-cert-manager-and-lets-encrypt/
- https://doc.traefik.io/traefik/https/acme/#certificatesduration
- https://traefik.io/blog/https-on-kubernetes-using-traefik-proxy/

you need to define what is called "certification resolver", which is passed as args in deployment of traefik
in certification resolver, you need to pass domain, email, storage

cert manager is doing the same as args in traefik controller
- https://levelup.gitconnected.com/easy-steps-to-install-k3s-with-ssl-certificate-by-traefik-cert-manager-and-lets-encrypt-d74947fe7a8


when I shut down traefik deployment, it stops showing "not found page"
This is accessible. https://erdiagram-simplified.daisukekikuchi.net:30371/

If I comment out the following, the port 80 is listening
  #tls:
    #certResolver: myresolver
    #domains:
    #- main: erdiagram-simplified.daisukekikuchi.net

Assumption
- you need to save acme.json in volume (/data)
- the log says something useful
- you need to up in port 80 first

```
mkdir -p /etc/traefik/
vim /etc/traefik/traefik.yaml
```









### OLD

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