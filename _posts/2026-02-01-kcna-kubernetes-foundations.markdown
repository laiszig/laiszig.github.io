---
title: "KCNA: Kubernetes Architecture & Fundamentals"
layout: post
date: 2026-02-01 14:07
headerImage: false
hidden: false
tag:
    - kubernetes
    - kcna
    - foundations
    - concepts
    - orchestration
category: blog
author: laiszig
description: Architecture of Kubernetes for the KCNA exam. The Control Plane, Worker Nodes, and how components like etcd and Kubelet work together
---

# Kubernetes Architecture & Fundamentals

Kubernetes (K8s) is the industry-standard container orchestrator. It automates the operational needs of running containers, including provisioning, deployment, scaling, and networking. For the KCNA, you must understand not just what it does, but how the internal "gears" turn.

<img src="/assets/images/post/k8s-architecture.jpg">

## Orchestration

Kubernetes provides the framework to run distributed systems resiliently.

| Function | Description | Why It Matters |
|----------|:-----------:|:--------------:|
|Provisioning & Deployment| Automated container lifecycle management | Faster, consistent deployments |
|Scaling| Automatic scaling based on demand | Cost efficiency and performance |
|Self-Healing| Automatically fix/replace failed containers | High availability |
|Scheduling| Efficient use of compute resources | Resource optimization |
|Service Exposure| Making container services accessible | Network connectivity |
|Security & Authorization| Access control and security policies | Protection and compliance |
|Storage Management| Shared/persistent workload storage | Data persistence |
|Extended Functionality| Custom Resource Definitions (CRDs) | Platform extensibility |

### Self-Healing Capabilities
- **Automatically detects** failed containers
- **Replaces unhealthy instances** with new ones
- **Maintains desired state** without human intervention
- **Ensures high availability** of applications

### Custom Resource Definitions (CRDs)
- **Expand Kubernetes** beyond core functionalities
- Allow creation of **custom API objects**
- Enable **platform-specific extensions**
- Support **operator patterns** for complex applications

## The Hierarchy of Components

A Kubernetes environment is organized in a specific nesting doll structure:
**Cluster** > **Node** > **Pod** > **Container**

* **Cluster:** A set of nodes grouped together. If one node fails, others take over.
* **Node:** A physical or virtual machine managed by the control plane.
* **Pod:** The smallest unit in K8s. One or more containers that share storage, network, and execution context.
* **Container:** The isolated application process.

### The Big Picture
```
🏢 Kubernetes Cluster
│
├── 🧠 Control Plane
│   ├── 🌐 kube-apiserver (API Gateway)
│   ├── 📅 kube-scheduler (Pod Placement)
│   ├── 🎛️ kube-controller-manager (State Management)
│   ├── ☁️ cloud-controller-manager (Cloud Integration - Optional)
│   ├── 🗄️ etcd (Key-Value Store)
│   ├── 🏷️ CoreDNS (DNS Resolution)
│   └── 🤖 kubelet (Node Agent)
│
└── 💼 Worker Nodes
    ├── 🤖 kubelet (Node Agent)
    ├── 🌐 kube-proxy (Network Proxy - Optional)
    ├── 🏷️ CoreDNS (DNS Resolution)
    ├── 🔧 Container Runtime
    │   ├── 📦 containerd/CRI-O (High-level Runtime)
    │   └── 🏃 runc (Low-level Runtime)
    ├── 📦 Pods
    │   ├── 🏃 Application Containers
    │   └── 🔧 Sidecar Containers (Optional)
    └── 📁 Static Pods (in /etc/kubernetes/manifests)
        ├── 🗄️ etcd (Control Plane)
        ├── 🌐 kube-apiserver (Control Plane)
        ├── 🎛️ kube-controller-manager (Control Plane)
        └── 📅 kube-scheduler (Control Plane)
```

## The Control Plane

The control plane manages the overall state of the cluster, coordinates activities, and ensures the "Desired State" matches the "Actual State."

### kube-apiserver
**Role**: The **core component server** that exposes the Kubernetes HTTP API

It is the "front door" for all internal and external requests. 

**Key Functions**:
- **Handles requests** and authenticates them
- **Authorizes** incoming requests
- **Routes requests** to appropriate components
- **Primary interface** for all cluster interactions

In High Availability setups, nodes connect to the API server via a **Load Balancer** to distribute traffic across multiple replicas.

### etcd
**Role**: **Consistent and highly-available key-value store** for all API server data

* **Mechanism:** Uses the **RAFT Consensus Protocol** to ensure all nodes agree on the state, even during failures.
* **Best Practice:** Use an odd number of instances (ideally 5) for production to handle leader elections and network partitions.

### kube-scheduler
**Role**: **Assigns Pods to suitable nodes** based on constraints and resources:

**Decision Factors**:
- **Node labels** and selectors
- **Taints and tolerations**
- **Affinity and anti-affinity** rules
- **Available resources** (CPU, memory)
- **Node capacity** and utilization

**Process**:
1. **Looks for unbound Pods** in etcd
2. **Evaluates valid nodes** based on constraints
3. **Makes placement decision**
4. **Updates etcd** with the decision

### kube-controller-manager (c-m)
**Role**: **Runs controllers** to implement Kubernetes API behavior

Runs control loops that monitor the cluster. For example, if a node goes down, the controller-manager notices and responds to maintain availability and desired state.

### cloud-controller-manager (c-c-m)
**Role**: **Integrates with underlying cloud providers**

The `c-c-m` is an optional component that acts as an interface between K8s and cloud providers. It manages:

**Responsibilities**:
- **Node management**: Creating and deleting cloud instances
- **Persistent volume management**
- **Load balancing**: Creating and managing load balancers for services
- **Cloud-specific networking** integration

**Deployment**: Resides on the **control plane** alongside other control plane components

```
Control Plane Components:
├── 🌐 kube-apiserver
│   └── 🔐 Authentication & Authorization
├── 🗄️ etcd
│   ├── 📚 Cluster State Storage
│   ├── ⚖️ RAFT Consensus Protocol
│   └── 🗳️ Leader Election
├── 📅 kube-scheduler
│   ├── 🏷️ Node Selection Logic
│   ├── 💻 Resource Awareness
│   └── 🎯 Placement Decisions
├── 🎛️ kube-controller-manager
│   ├── 🔄 Control Loops
│   ├── 👀 State Monitoring
│   └── 🛠️ Remediation Actions
├── ☁️ cloud-controller-manager (Optional)
│   ├── 🖥️ Node Management
│   ├── ⚖️ Load Balancer Integration
│   └── 💾 Storage Integration
└── 🏷️ CoreDNS
    ├── 🔍 Service Discovery
    ├── 🌐 DNS Resolution
    └── 📡 Dynamic Updates
```

## Node Components
Each worker node contains the services necessary to run application pods. **Worker nodes** are responsible for **executing application pods** and containers.

### kubelet
**Role**: **Ensures Pods are running**, including their containers

**Key Features**:
- **Maintains desired state** of pods (from pod specs)
- **Uses YAML/JSON** pod specifications
- **Receives requests** via API or directory monitoring
- **Monitors `/etc/kubernetes/manifests`** for static pods
- **Runs on every node** (including control plane)

```
kubelet → Container Runtime (containerd) → Low-level Runtime (runc) → Containers
```

### kube-proxy (Optional)
**Role**: **Maintains network rules** to implement Services

**Functions**:
- **Runs on each node** in the cluster
- **Handles communication** between pods and services
- **Routes traffic** and handles requests
- **Implements service networking**

### Container Runtime
**Role**: **Software responsible for running containers**

**Critical Importance**:
- **If it crashes**, it can no longer manage containers
- **All running pods stop abruptly** when runtime fails
- **Empowers Kubernetes** to run containers effectively

```
Worker Node Components:
├── 🤖 kubelet
│   ├── 📦 Pod Lifecycle Management
│   ├── 🔄 Container Runtime Interface (CRI)
│   ├── 📁 Static Pod Monitoring (/etc/kubernetes/manifests)
│   └── 🌐 API Server Communication
├── 🌐 kube-proxy (Optional)
│   ├── 🔀 Traffic Routing
│   ├── ⚖️ Load Balancing
│   └── 🌉 Service Implementation
├── 🔧 Container Runtime Stack
│   ├── 📦 High-level Runtime
│   │   ├── containerd (CNCF Graduated)
│   │   ├── CRI-O (Kubernetes-native)
│   │   └── Docker (Legacy support)
│   └── 🏃 Low-level Runtime
│       ├── runc (OCI Reference)
│       └── crun (Alternative)
├── 🏷️ CoreDNS (Pod-based)
│   ├── 🔍 Cluster DNS
│   └── 📡 Service Resolution
└── 📦 Pod Workloads
    ├── 🏃 Application Containers
    ├── 🔧 Init Containers
    ├── 🛡️ Sidecar Containers
    └── 📁 Static Pods
```

## Container Runtimes: High Level vs. Low Level

Kubernetes uses the **CRI (Container Runtime Interface)** to interact with runtimes. This architecture is layered:

1. **High-Level Runtime (e.g., Containerd):** Manages the entire lifecycle. It pulls images, stores them, and manages network/storage. `containerd` was donated to the CNCF and is a "Graduated" project.
2. **Low-Level Runtime (e.g., runc):** The reference implementation of the OCI spec. It interacts directly with Linux **Namespaces** and **cgroups** to spawn the container.

### containerd
- **Created by and used within Docker**
- **Donated to CNCF** (Graduated project)
- **Manages entire container lifecycle**
- **Pulls and stores container images**
- **Interacts with low-level runtimes** like runc
- **Installation**: `apt/yum install containerd` automatically includes runc

### runc - The Foundation
- **Reference implementation** of OCI runtime spec
- **Donated by Docker Inc**
- **OCI-compatible** container runtime
- **Interacts with Linux components** (namespaces, cgroups)
- **Low-level container execution**

### Container Runtime Interface (CRI)
- **Standardized interface** between kubelet and container runtimes
- **Enables kubelet** to use various container runtimes
- **Promotes interoperability** and choice
- **Abstracts runtime details** from Kubernetes

## Networking & Service Discovery

* **CNI (Container Network Interface):** A plugin that enables pod-to-pod communication across different nodes, ensuring every pod gets its own unique IP address.
* **CoreDNS:** Enhances service discovery by dynamically resolving DNS queries for cluster-internal Services and Pods.

### Container Network Interface (CNI)
- **Enables pod-to-pod communication** across different nodes
- **Each pod gets an IP address**
- **Standardized networking** interface
- **Plugin-based architecture**

### CoreDNS
**Role**: **Enhances service discovery** between applications

**Functions**:
- **Dynamically resolves DNS queries**
- **Cluster-internal Services and Pods**
- **Automatic service registration**
- **Real-time DNS updates**

### Load Balancer Integration
In **highly available configurations**:
- **Nodes connect to API server via load balancer**
- **Distributes traffic** across multiple API server replicas
- **Nodes don't need specific IP addresses** of API server instances
- **High availability** and fault tolerance

##  Pod Worloads
The **smallest and simplest unit** in the Kubernetes object model

**Key Characteristics**:
- **Represents one or more containers** that share resources
- **Shared storage and networking**
- **Scheduled together** as a single entity
- **Co-located and co-managed** containers

### Immutability Principle
**Containers are intended to be stateless and immutable**

**Never change the code** of a container that is already running
- **Rebuild and redeploy** instead of modifying
- **Version control** through image tags
- **Consistent behavior** across environments

### Communication Flow (kubectl)
```
👤 User Request
    ↓
🌐 kube-apiserver (Authentication/Authorization)
    ↓
🗄️ etcd (Store Desired State)
    ↓
📅 kube-scheduler (Pod Assignment)
    ↓
🎛️ kube-controller-manager (State Management)
    ↓
🤖 kubelet (Node Agent)
    ↓
📦 containerd (High-level Runtime)
    ↓
🏃 runc (Low-level Runtime)
    ↓
🐧 Linux Kernel (Namespaces/cgroups)
    ↓
🏃 Running Container

```