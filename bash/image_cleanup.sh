#! /bin/bash
sudo crictl rmi $(sudo crictl images -q)