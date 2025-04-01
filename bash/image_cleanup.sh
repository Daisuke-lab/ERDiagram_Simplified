#! /bin/bash
sudo crictl rmi $(sudo crictl images -q)
sudo crictl rm $(sudo crictl ps --state Exited -q)