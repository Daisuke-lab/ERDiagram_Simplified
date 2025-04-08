#! /bin/bash
export KS_DIR="$HOME/ERDiagram_Simplified/kubernetes"
echo 'alias kubectl="sudo k3s kubectl"' >> $HOME/.bashrc

INSTANCE_ID=$(ec2-metadata -i | awk '{print $2}')

aws s3 cp s3://er-diagram-config/application.properties .
aws s3 cp s3://er-diagram-config/.env.local .
kubectl create configmap er-backend-config --from-file=application.properties
kubectl create configmap er-frontend-config --from-file=.env.local


kubectl apply -f $KS_DIR