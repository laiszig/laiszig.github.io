---
title: "Kubernetes Foundations"
layout: post
date: 2026-01-24 14:07
headerImage: false
hidden: true
tag:
    - kubernetes
    - kcna
    - foundations
    - concepts
category: blog
author: laiszig
description: Kafka commands for setting up brokers, managing topics, and handling data through producers and consumers.
---

KCNA Domains (New Version)

44% Kubernetes Fundamentals
kubernetes core concepts 
administration 
scheduling 
containerization
28% Container Orchestration
networkiing
security 
troubleshooting 
storage
16% Cloud Native Application Delivery
application delivery 
debugging
12% Cloud Native Architecture
observalibility
cloud native ecosystem and principles
cloud native community and collaboration

Containers

docker - most popular

completely isolated environments
own processes, netwrk and mounts
repeatable - included dependencies = same behavior wherever you run

decouple applications from the underlying host infrastructure

Container images
ready-to-run software package containing everything needed to run an application, code, libs, runtime, default values.


Containers are intended to be stateless and immutable: you should not change the code of a container that is already running

Container runtimes 
empowers Kubernetes to run containers effectively
managing the execution and lifecycle of containers within the Kubernetes environment

kubernetes architecture

cluster - set of nodes (if one fail - another takes over - also helps with sharing load)
A Kubernetes cluster consists of a control plane and one or more worker nodes. 

Control Plane Components
Manage the overall state of the cluster:

kube-apiserver
The core component server that exposes the Kubernetes HTTP API.
etcd
Consistent and highly-available key value store for all API server data.
kube-scheduler
Looks for Pods not yet bound to a node, and assigns each Pod to a suitable node.
kube-controller-manager
Runs controllers to implement Kubernetes API behavior - notice and respond when nodes go down.
cloud-controller-manager (optional)
Integrates with underlying cloud providers

Node Components 
node - machine where k8s is installed (where containers will be lauched)
kubelet: Ensures that Pods are running, including their containers.
kube-proxy (optional): Maintains network rules on nodes to implement Services.
Container runtime: Software responsible for running containers. Read Container Runtimes to learn more.

runs workload
places containers into pods
virtual or physical machine
managed by control plane
contains services to run pods

management: 2 ways, 1. kubelet on a node self-register to the control plane, 2. user manually adds a node

control plane 
kube-apiserver is how it interacts with other nodes

kubelet is used by the worker node to interact with the control plane (carry out instructions)

scale to zero when no demand. Cost efficiency.

Knative and OpenFaas - open-source frameworks that enable serverless functionality in k8s.

Provisioned concurrency - number of instances of a serverless function that are kept warm and ready to handle reqs simultaneouslyy. Pre-initialized, serve requests with minimal latency.

Disadvantage:  may incur latency during periods where the app is less active. Cold start issue. After period of inactivity, infra may need to initialize a new instance.

CloudEvents specs - hosted by CNCF
consistent way of describing event data across different services, platforms and systems.
Agnostic.

Serverless arch typically manages concurrency as part of the offering (scaling the number of instances based on incoming requests)

Budget thresholds - helps monitor and control spending - user may set limits and receive alerts when costs approach/exceed predefined budgets.



