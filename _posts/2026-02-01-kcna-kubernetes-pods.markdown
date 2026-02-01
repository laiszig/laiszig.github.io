---
title: "KCNA: Understanding Pods in Kubernetes"
layout: post
date: 2026-02-01 14:07
headerImage: false
hidden: false
tag:
    - kubernetes
    - kcna
    - pods
    - containers
    - kubectl
category: blog
author: laiszig
description: Pods in Kubernetes. Creation, multi-container patterns, init containers, and networking
---

# Kubernetes Pods: The Building Blocks of Container Orchestration

## 📋 Table of Contents
- [What is a Pod?](#what-is-a-pod)
- [Creating Pods: CLI vs YAML](#creating-pods-cli-vs-yaml)
- [Pod Documentation and Introspection](#pod-documentation-and-introspection)
- [Pod Networking and Communication](#pod-networking-and-communication)
- [Executing Commands in Pods](#executing-commands-in-pods)
- [Multi-Container Pods](#multi-container-pods)
- [Log Management](#log-management)
- [Sidecar Containers](#sidecar-containers)
- [Init Containers](#init-containers)
- [Testing with Temporary Pods](#testing-with-temporary-pods)
- [Port Forwarding](#port-forwarding)
- [Pod Restart Policies](#pod-restart-policies)
- [Key Takeaways for KCNA](#key-takeaways-for-kcna)

## What is a Pod?

A **Pod** is the **smallest and simplest unit** in the Kubernetes object model. Think of it as a "wrapper" that can contain one or more containers that work together as a cohesive unit.

### Core Pod Characteristics

| Feature | Description | Benefit |
|---------|:-------------:|:---------:|
| **Container Grouping** | One or more containers | Logical application unit |
| **Shared Networking** | Single IP address per pod | Localhost communication |
| **Shared Storage** | Common volumes | Data sharing between containers |
| **Atomic Scheduling** | Scheduled as single entity | Co-location guarantee |
| **Unique Identity** | Assigned unique ID | Cluster-wide identification |

### What Pods Enable

- **Inter-Process Communication (IPC)** between containers
- **Encapsulation** of application, dependencies, shared storage, and networking
- **Single deployable unit** for related components
- **Tight coupling** of containers that need to work together

## Creating Pods: CLI vs YAML

### Imperative CLI Approach

```bash
# Create a simple nginx pod
kubectl run nginx --image=nginx

# Check running pods
kubectl get pods

# Get detailed pod information including IP
kubectl get pods -o wide

# View pod logs
kubectl logs pod/nginx
```

### Declarative YAML Approach

#### 1. Generate YAML Template
```bash
# Generate YAML without creating the pod
kubectl run nginx --image=nginx --dry-run=client -o yaml | tee nginx.yaml
```

#### 2. Sample Pod YAML
```yaml
apiVersion: v1
kind: Pod
metadata:
  name: nginx
  labels:
    run: nginx
spec:
  containers:
  - name: nginx
    image: nginx
    resources: {}
  restartPolicy: Always
```

#### 3. Apply the YAML
```bash
# Create the pod from YAML
kubectl apply -f nginx.yaml
```

### Declarative vs Imperative Approaches

#### Imperative Approach
**Philosophy**: "Do this specific action"

```bash
# Imperative commands
kubectl create -f nginx.yaml     # Creates (fails if exists)
kubectl replace -f nginx.yaml    # Replaces existing
kubectl delete -f nginx.yaml     # Deletes resource
```

**Characteristics**:
- **Direct instructions** for specific operations
- **Fails if resource exists** (with create)
- **Focus on operations** rather than state
- **Must be careful** with existing resources

### Declarative Approach (Preferred)
**Philosophy**: "Make it look like this"

```bash
# Declarative command
kubectl apply -f nginx.yaml      # Creates or updates as needed
```

**Characteristics**:
- **Define desired state** using configuration files
- **Kubernetes compares** current vs desired state
- **Auto-performs** necessary operations to reconcile
- **Succeeds on subsequent** applications
- **Preferred for production** cluster management

### Multiple Resources in One File

```bash
# Combine multiple YAML documents
{ cat nginx.yaml; echo "---"; cat ubuntu.yaml; } | tee combined.yaml

# Apply multiple resources at once
kubectl apply -f combined.yaml

# Delete multiple resources at once
kubectl delete -f combined.yaml --now
```

## Pod Documentation and Introspection

### kubectl explain Command

```bash
# Get documentation for pod specification
kubectl explain pod

# Get specific field documentation
kubectl explain pod.spec.restartPolicy

# Get details about containers specification
kubectl explain pod.spec.containers

# Explore nested fields
kubectl explain pod.spec.containers.ports
```

### Pod Information Commands

```bash
# Describe pod for detailed information
kubectl describe pod/nginx

# Get pod YAML configuration
kubectl get pod/nginx -o yaml

# Get pod JSON configuration
kubectl get pod/nginx -o json

# Watch pod status changes
kubectl get pods --watch
```

## Pod Networking and Communication

### Shared Network Namespace

Each pod gets:
- 📍 **Single unique IP address** assigned by Kubernetes
- 🌐 **Shared networking stack** for all containers in the pod
- 🚪 **Localhost communication** between containers

### Network Communication Model

```bash
# Get pod IP address
kubectl get pods -o wide

# Capture nginx pod IP
NGINX_IP=$(kubectl get pods -o wide | awk '/nginx/ { print $6 }')
echo $NGINX_IP

# Test connectivity from control plane
ping -c 3 $NGINX_IP

# Test from other nodes
ssh worker-1 ping -c 3 $NGINX_IP
ssh worker-2 ping -c 3 $NGINX_IP
```

### No NAT Required
- **Direct pod-to-pod communication** across nodes
- **Flat network structure** - every pod can reach every other pod
- **No complex network setups** or NAT translations needed
- **CNI (Container Network Interface)** handles the networking magic

## Executing Commands in Pods

### Interactive Shell Access

```bash
# Execute bash in running pod
kubectl exec -it ubuntu -- bash

# Run single command
kubectl exec ubuntu -- ps -ef

# Execute command in specific container (multi-container pods)
kubectl exec -it mypod -c sidecar -- bash
```

### Common Use Cases

```bash
# Install packages for testing
kubectl exec -it ubuntu -- bash
apt update && apt install -y curl

# Check processes running in container
kubectl exec ubuntu -- ps -ef

# Test network connectivity
kubectl exec ubuntu -- curl http://nginx-service

# Create files for testing
kubectl exec -it mypod -c sidecar -- touch /tmp/crash
```

### Execution Context
- Commands run **inside the container's namespace**
- **Process ID 1** is typically the main container process
- **Environment variables** from container are available
- **Filesystem** is the container's filesystem view

## Multi-Container Pods

### Multi-Container Pod Example

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: mypod
  labels:
    run: mypod
spec:
  containers:
  - name: webserver
    image: nginx
  - name: sidecar
    image: ubuntu
    args:
    - /bin/sh
    - -c
    - while true; do echo "$(date +'%T') - Hello from the sidecar"; sleep 5; if [ -f /tmp/crash ]; then exit 1; fi; done
  restartPolicy: Always
```

### Managing Multi-Container Pods

```bash
# Check pod status (shows 2/2 containers)
kubectl get pods

# Describe pod to see all containers
kubectl describe pod/mypod

# Execute command in specific container
kubectl exec -it mypod -c webserver -- nginx -v
kubectl exec -it mypod -c sidecar -- ps -ef
```

### Container Relationships
- **Share network namespace** (same IP, localhost communication)
- **Share storage volumes** (when configured)
- **Share compute resources** (CPU, memory limits)
- **Scheduled together** on the same node
- **Lifecycle tied together** (start/stop as unit)

## Log Management

### Single Container Logs

```bash
# View current logs
kubectl logs pod/nginx

# Follow logs in real-time
kubectl logs pod/nginx --follow

# View last N lines
kubectl logs pod/nginx --tail=50

# View logs with timestamps
kubectl logs pod/nginx --timestamps
```

### Multi-Container Log Access

```bash
# View logs from specific container
kubectl logs pod/mypod -c sidecar

# Follow specific container logs
kubectl logs pod/mypod -c sidecar --follow

# View logs from previous container instance (after restart)
kubectl logs pod/mypod -c sidecar --previous

# View logs from all containers (requires recent kubectl)
kubectl logs pod/mypod --all-containers
```

### Terminated Container Logs

```bash
# Access logs from crashed/restarted container
kubectl logs pod/mypod -p -c sidecar

# View previous instance logs with timestamps
kubectl logs pod/mypod -p -c sidecar --timestamps

# Useful after container crashes and restarts
kubectl get pods  # Check restart count
kubectl logs pod/mypod -p -c sidecar  # Previous instance logs
```

## Sidecar Containers

### What is a Sidecar?

A **sidecar container** is a **helper container** that runs alongside the main application container in the same pod, providing supporting functionality.

### Common Sidecar Use Cases

| Use Case | Example | Purpose |
|----------|---------|---------|
| **Logging** | Filebeat, Fluentd | Log collection and forwarding |
| **Monitoring** | Prometheus exporter | Metrics collection |
| **Security** | OAuth proxy | Authentication/authorization |
| **Networking** | Service mesh proxy | Traffic management |
| **Data Sync** | Git sync | Configuration updates |

### Sidecar Implementation Pattern

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: app-with-sidecar
spec:
  containers:
  # Main application container
  - name: main-app
    image: nginx
    ports:
    - containerPort: 80
  
  # Sidecar container
  - name: log-sidecar
    image: busybox
    command: 
    - /bin/sh
    - -c
    - while true; do echo "$(date): Monitoring logs..."; sleep 30; done
    volumeMounts:
    - name: shared-logs
      mountPath: /var/log
  
  volumes:
  - name: shared-logs
    emptyDir: {}
```

### Sidecar Benefits

- **Continuous operation** alongside main container
- **Shared resources** (volumes, network)
- **Separation of concerns** - focused functionality
- **Independent updates** from main application
- **Reusable patterns** across applications

## Init Containers

### What are Init Containers?

**Init containers** are **specialized containers** that run **before** app containers in a pod. They run to **completion** and must **succeed** before the main application starts.

### Init Container vs Sidecar Comparison

| Aspect | Init Containers | Sidecar Containers |
|--------|-----------------|-------------------|
| **Timing** | Run before main container | Run alongside main container |
| **Lifecycle** | Run to completion | Continuous operation |
| **Execution** | Sequential (one after another) | Parallel with main container |
| **Probes** | No probes supported | Support all probes |
| **Purpose** | Setup and initialization | Ongoing support functions |

### Init Container Use Cases

- **Wait for services** to become available
- **Setup configuration** files
- **Download dependencies** or data
- **Database migrations**
- **Security setup** and key generation
- **Delays and timing** control

### Init Container Example

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: myapp-pod
spec:
  initContainers:
  - name: init-myservice
    image: busybox:1.28
    command: ['sh', '-c', "until nslookup myservice; do echo waiting for myservice; sleep 2; done"]
  
  - name: init-mydb  
    image: busybox:1.28
    command: ['sh', '-c', "until nslookup mydb; do echo waiting for mydb; sleep 2; done"]
    
  containers:
  - name: myapp-container
    image: busybox:1.28
    command: ['sh', '-c', 'echo The app is running! && sleep 3600']
```

### Init Container Countdown Example

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: countdown-pod
spec:
  initContainers:
  - name: init-countdown
    image: busybox
    command: ['sh', '-c', 'for i in $(seq 120 -1 0); do echo init-countdown: $i; sleep 1; done']

  containers:
  - name: main-container
    image: busybox
    command: ['sh', '-c', 'while true; do count=$((count + 1)); echo main-container: sleeping for 30 seconds - iteration $count; sleep 30; done']
```

### Monitoring Init Containers

```bash
# Check pod status during init phase
kubectl get pods -o wide
# Status shows: Init:0/1 or Init:1/2

# Watch init container logs
kubectl logs pod/countdown-pod -c init-countdown --follow

# After init completes, watch main container
kubectl logs pod/countdown-pod -c main-container --follow

# Describe pod for detailed init container status
kubectl describe pod/countdown-pod
```

### Init Container Behavior

- **Sequential execution** - each must complete before next starts
- **Must succeed** - failure blocks pod startup
- **Restart on failure** (according to restart policy)
- **Separate images** from app containers
- **Different filesystem view** possible
- **Idempotent design** recommended (may run multiple times)

## Testing with Temporary Pods

### Quick Testing Patterns

```bash
# Temporary curl pod for testing
kubectl run -it --rm curl --image=curlimages/curl:8.4.0 --restart=Never -- http://$NGINX_IP

# Interactive temporary pod for debugging
kubectl run -it --rm debug --image=ubuntu --restart=Never -- bash

# One-time command execution
kubectl run -it --rm test --image=busybox --restart=Never -- nslookup kubernetes.default

# Temporary pod with environment variables
kubectl run --image=ubuntu ubuntu --env="TARGET_IP=$NGINX_IP" -- sleep infinity
```

### Testing Pod Options

| Flag | Purpose | Example |
|------|---------|---------|
| **`-it`** | Interactive terminal | Interactive debugging |
| **`--rm`** | Auto-delete after exit | Temporary testing |
| **`--restart=Never`** | Don't restart on failure | One-time execution |
| **`--env`** | Set environment variables | Pass configuration |

### Common Testing Scenarios

```bash
# Network connectivity testing
kubectl run -it --rm nettest --image=busybox --restart=Never -- ping google.com

# DNS resolution testing  
kubectl run -it --rm dnstest --image=busybox --restart=Never -- nslookup kubernetes.default

# Service endpoint testing
kubectl run -it --rm svctest --image=curlimages/curl --restart=Never -- http://my-service.default.svc.cluster.local

# Container image testing
kubectl run -it --rm imgtest --image=my-custom-image --restart=Never -- /bin/sh
```

## Port Forwarding

### kubectl port-forward

**Purpose**: Provides a **connection from localhost** via the API server to the target component

### Port Forward Architecture

```
User's Localhost:8080 
       ↓ 
kubectl (local machine)
       ↓
Kubernetes API Server
       ↓  
Target Pod:80
```

### Port Forward Examples

```bash
# Forward pod port to localhost
kubectl port-forward pod/nginx 8080:80

# Forward service port to localhost  
kubectl port-forward service/my-service 8080:80

# Forward deployment port to localhost
kubectl port-forward deployment/my-app 8080:8080

# Bind to specific address (not just localhost)
kubectl port-forward --address 0.0.0.0 pod/nginx 8080:80
```

### Environmental Differences

| Scenario | Description | Access Method |
|----------|-------------|---------------|
| **🏠 Local Cluster** | User connected to K8s cluster network | Direct pod IP access |
| **🌐 Remote Cluster** | User on local network, K8s remote | Port forward tunnel required |

### Port Forward Use Cases

- **Debugging applications** without exposing services
- **Local development** against cluster resources
- **Accessing dashboards** and admin interfaces
- **Database connections** for troubleshooting
- **Quick testing** without creating services

### Port Forward Limitations

- **Single connection** per port forward
- **Ctrl+C to terminate** the tunnel
- **API server dependency** - requires cluster connectivity
- **Temporary solution** - not for production traffic

## Pod Restart Policies

### Available Restart Policies

| Policy | Behavior | Use Case |
|--------|----------|----------|
| **`Always`** | ✅ **Default** - Always restart containers | Long-running applications |
| **`OnFailure`** | Restart only on failure (non-zero exit) | Batch jobs, finite tasks |
| **`Never`** | Never restart containers | One-time tasks, debugging |

### Restart Policy Documentation

```bash
# Get restart policy documentation
kubectl explain pod.spec.restartPolicy
```

### Restart Policy Examples

```yaml
# Always restart (default)
apiVersion: v1
kind: Pod
metadata:
  name: always-restart
spec:
  restartPolicy: Always  # Default value
  containers:
  - name: nginx
    image: nginx

---
# Restart only on failure  
apiVersion: v1
kind: Pod
metadata:
  name: restart-on-failure
spec:
  restartPolicy: OnFailure
  containers:
  - name: job-container
    image: busybox
    command: ["sh", "-c", "exit 1"]  # Will restart due to failure

---
# Never restart
apiVersion: v1
kind: Pod
metadata:
  name: never-restart
spec:
  restartPolicy: Never
  containers:
  - name: one-shot
    image: busybox  
    command: ["sh", "-c", "echo 'Done' && exit 0"]  # Won't restart
```

### Restart Behavior with Init Containers

- **Init containers** use `OnFailure` restart policy even if pod uses `Always`
- **Failed init containers** prevent pod from starting
- **Pod restart** causes all init containers to run again