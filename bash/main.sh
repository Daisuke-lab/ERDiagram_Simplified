#! /bin/bash

## Install K3s
EC2_USER_HOME="/home/ec2-user"
cd $EC2_USER_HOME
export INSTALL_K3S_VERSION="v1.32.3+k3s1"
curl -sfL https://get.k3s.io | sh -
# root
echo 'alias kubectl="sudo k3s kubectl"' >> $HOME/.bashrc
echo 'alias k="sudo k3s kubectl"' >> $HOME/.bashrc
# ec2-user
echo 'alias kubectl="sudo k3s kubectl"' >> $EC2_USER_HOME/.bashrc
echo 'alias k="sudo k3s kubectl"' >> $EC2_USER_HOME/.bashrc
source $HOME/.bashrc

# check command
if ! command -v kubectl &> /dev/null; then
    echo "kubectl is not installed. Please install it before continuing." >> error.log
    exit 1
fi

## Pull config files
aws s3 cp s3://er-diagram-config/application.properties .
aws s3 cp s3://er-diagram-config/.env.local .
kubectl create configmap er-backend-config --from-file=application.properties
kubectl create configmap er-frontend-config --from-file=.env.local

## Apply templates
export KS_DIR="$EC2_USER_HOME/ERDiagram_Simplified/kubernetes"
kubectl apply -f $KS_DIR --force


## Allocate IP
INSTANCE_ID=$(ec2-metadata -i | awk '{print $2}')
ELASTIC_IP_ALLOCATION_ID=$(aws ec2 describe-addresses --query "Addresses[*].AllocationId" --output text)
aws ec2 associate-address --instance-id $INSTANCE_ID --allocation-id $ELASTIC_IP_ALLOCATION_ID --allow-reassociation