#! /bin/bash
sudo yum update
sudo yum install -y git
cd /home/ec2-user
git clone https://github.com/Daisuke-lab/ERDiagram_Simplified.git
sudo bash ERDiagram_Simplified/bash/main.sh