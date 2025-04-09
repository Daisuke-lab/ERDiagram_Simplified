#! /bin/bash

## Install K3s
export INSTALL_K3S_VERSION="v1.32.3+k3s1"
curl -sfL https://get.k3s.io | sh -
echo 'alias kubectl="sudo k3s kubectl"' >> $HOME/.bashrc
source $HOME/.bashrc


## Pull config files
aws s3 cp s3://er-diagram-config/application.properties .
aws s3 cp s3://er-diagram-config/.env.local .
kubectl create configmap er-backend-config --from-file=application.properties
kubectl create configmap er-frontend-config --from-file=.env.local

## Apply templates
export KS_DIR="$HOME/ERDiagram_Simplified/kubernetes"
kubectl apply -f $KS_DIR --force


## Allocate IP
INSTANCE_ID=$(ec2-metadata -i | awk '{print $2}')
ELASTIC_IP_ALLOCATION_ID=$(aws ec2 describe-addresses --query "Addresses[*].AllocationId" --output text)
aws ec2 associate-address --instance-id $INSTANCE_ID --allocation-id $ELASTIC_IP_ALLOCATION_ID --allow-reassociation