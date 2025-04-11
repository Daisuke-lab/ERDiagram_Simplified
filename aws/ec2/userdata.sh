#! /bin/bash
yum update
yum install -y git
cd /home/ec2-user
git clone https://github.com/Daisuke-lab/ERDiagram_Simplified.git
bash ERDiagram_Simplified/bash/main.sh