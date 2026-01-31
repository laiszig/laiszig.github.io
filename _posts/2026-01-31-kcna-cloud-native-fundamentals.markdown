---
title: "KCNA: Cloud Native Architecture Fundamentals"
layout: post
date: 2026-01-31 10:00:00
headerImage: false
hidden: false
tag:
    - KCNA
    - Kubernetes
    - Cloud Native
    - CNCF
    - DevOps
category: blog
author: laiszig
description: A comprehensive guide to the first topic of the KCNA exam, covering CNCF standards, scaling strategies, and the four pillars of cloud-native architecture.
---

# Cloud Native Architecture Fundamentals

## 📋 Table of Contents
- [Core Cloud Native Design Principles](#core-cloud-native-design-principles)
- [The Four Pillars of Cloud Native Architecture](#the-four-pillars-of-cloud-native-architecture) 
- [CNCF and Open Standards](#cncf-and-open-standards)
- [Security: Zero Trust & Least Privilege](#security-zero-trust--least-privilege)
- [Resilience and Service Discovery](#resilience-and-service-discovery)
- [Scalability: Horizontal vs. Vertical](#scalability-horizontal-vs-vertical)
- [Serverless and FaaS](#serverless-and-faas)
- [Automation, IAC, and CI/CD](#automation-iac-and-cicd)
- [Key Roles in Cloud Native](#key-roles-in-cloud-native)
- [Open Standards and Specifications](#open-standards-and-specifications)

**Cloud Native** refers to applications that are **designed for** and **built into** cloud environments from the ground up. These applications harness the power of the cloud to provide:

- **Increased resilience**
- **Enhanced agility**
- **Better operability**
- **Improved observability**

### **Key Benefits**
| Benefit | Description |
|---------|-------------|
| **Cost Savings** | Resources scaled as required, pay-as-you-use model |
| **High Availability** | Built-in redundancy and fault tolerance |
| **Automation** | Leverages Cloud Provider APIs with tools like Terraform/Ansible |

## Core Cloud Native Design Principles

To evaluate if an application is truly cloud native, ask these **four critical questions**:

1. **Is the application automated in its setup and delivery?**
   - Infrastructure as Code (IaC)
   - Automated CI/CD pipelines
   - Self-provisioning capabilities

2. **Has the application been designed with resilience to protect from failure?**
   - Self-healing mechanisms
   - Redundancy built-in
   - Graceful degradation

3. **Can the app auto-scale based on operational workload?**
   - Horizontal and vertical scaling
   - Resource optimization
   - Dynamic load adjustment

4. **Is the app secure by default?**
   - Zero trust security model
   - Least privilege access
   - Built-in security controls

## The Four Pillars of Cloud Native Architecture

Cloud-native architecture is built on four central pillars. If an application lacks one of these, it’s likely "Cloud Wash" rather than truly Cloud Native.

### **1. Microservices Architecture**
- **Loosely coupled** components
- **Independently deployable** services
- **Single responsibility** principle
- Enhanced **agility, scalability, and resilience**

### **2. Containerization**
- Applications encapsulated with dependencies
- **Uniform execution** across environments
- Provides **isolation, consistency, and efficiency**
- Easier to **build, deploy, and manage**

### **3. DevOps**
- **Collaborative approach** combining Dev + Ops
- Emphasizes **automation, monitoring, and collaboration**
- Enhances **efficiency, reliability, and speed**
- Fosters a **culture of excellence**

### **4. Continuous Delivery (CD)**
- **Automated build, test, and release** preparation
- Code changes always **tested and ready for deployment**
- **Accelerates release cycles**
- **Reduces risk, complexity, and downtime**

## CNCF and Open Standards

The **Cloud Native Computing Foundation (CNCF)** is the governing body that hosts critical projects like Kubernetes and Prometheus.

The CNCF plays a crucial role in:
- Defining cloud native standards
- Supporting open-source projects
- Promoting cloud native adoption
- Ensuring vendor neutrality

### Open Standards & The OCI

To avoid **vendor lock-in** (being stuck with one provider), the industry uses Open Standards. The **Open Container Initiative (OCI)** is key here, defining how images are built and run.

| Standard | Full Form | Purpose |
| --- | --- | --- |
| **CRI** | Container Runtime Interface | Allows Kubernetes (kubelet) to use different container runtimes. |
| **CNI** | Container Network Interface | Standardizes how network connectivity is assigned to containers. |
| **CSI** | Container Storage Interface | A common interface for K8s to talk to different storage providers. |
| **OCI** | Open Container Initiative | Standardizes container formats and runtimes (e.g., `runc`). |

## Security: Zero Trust & Least Privilege

Cloud-native security assumes the network is already compromised.

* **Zero Trust:** Never trust, always verify. Every request must be authenticated and authorized.
* **Least Privilege:** Users and services get the absolute minimum permissions needed to do their jobs.

## Resilience and Service Discovery

A cloud-native app must be **Self-Healing**. This is achieved through:

* **Replicas:** Maintaining a specific number of running instances. If one dies, the system replaces it.
* **Service Discovery:** In dynamic environments (like Kubernetes), IP addresses change constantly. Service Discovery allows services to find each other automatically via DNS or Environment Variables.

## Scalability: Horizontal vs. Vertical

One of the biggest KCNA topics is how we handle load.

* **Vertical Scaling:** Adding more CPU/RAM to an existing node (limited by hardware).
* **Horizontal Scaling:** Adding *more* nodes or pods to the cluster (virtually unlimited).

### ** Kubernetes Autoscaling Components**

#### **Cluster Autoscaler**
- Adjusts **cluster size** by adding/removing nodes
- Based on **resource requirements** of workloads

#### **HPA (Horizontal Pod Autoscaler)**
- Scales **number of replicas** based on metrics
- Controls **Deployments, ReplicaSets, and StatefulSets**

#### **VPA (Vertical Pod Autoscaler)**
- Scales **resource requests and limits**
- Based on **usage patterns**

#### **KEDA (Kubernetes Event-Driven Autoscaling)**
- **Event-driven** scaling solution
- Uses **ScaledObjects** for scaling criteria
- Allows scaling based on **external event sources**
- Supports **scaling to zero**

### ** Service Discovery**
- **Automatic detection** of services
- Essential in **dynamic environments**
- Services can be **added, removed, or relocated**
- Enables **communication without manual configuration**
- Implementation methods:
  - Environment variables
  - Built-in DNS

## Serverless and FaaS

**Serverless** doesn't mean there are no servers; it means you don't manage them.
- **Server management** handled by cloud provider
- Includes **provisioning, scaling, and patching**
- **Event-driven** execution model
- **Function as a Service (FaaS)** paradigm

* **FaaS (Function as a Service):** You upload code (e.g., AWS Lambda), and it runs in response to events.
* **CloudEvents:** A specification for describing event data in a common way to help different systems talk to each other.

### **Serverless Pricing Model**
Charges based on:
- **Number of function executions**
- **Time taken to execute**

### **Serverless Challenges**
- **Vendor lock-in** due to lack of standardized APIs
- **Migration complexity** between providers
- Each provider has **proprietary APIs, features, and integrations**

### **CloudEvents**
- **Standardized format** for event data
- **Significant impact** within Cloud Native ecosystems
- Enables **interoperability** between different service

---

## Automation, IAC, and CI/CD

In the cloud-native world, manual configuration is a failure. We use **Infrastructure as Code (IaC)** tools like Terraform or Ansible to manage infrastructure through code.

### The CI/CD Pipeline

* **Continuous Integration (CI):** Automatically building and testing code changes.
* **Continuous Delivery (CD):** Code is automated and ready to go to production at the click of a button.
* **Continuous Deployment:** Code changes are automatically deployed to production without manual intervention.

---

## Key Roles in Cloud Native

| Role | Primary Objective | Focus Areas |
|------|------------------|-------------|
| **DevOps Engineer** | Bridge gap between Dev and Ops | Automation, process optimization, smooth releases |
| **Site Reliability Engineer (SRE)** | Ensure system reliability | Uptime, availability, scalability, resilience |
| **CloudOps Engineer** | Optimize cloud workloads | Management, delivery, optimization of cloud infrastructure |
| **DevSecOps** | Integrate security in DevOps | Security throughout software lifecycle |
| **FinOps** | Manage cloud costs | Financial optimization and cost effectiveness |

### **SRE vs DevOps**
**Common Ground:**
- Understanding of **development and operational practices**
- **Scripting and automation** skills
- **Monitoring** expertise

## Open Standards and Specifications

### **Why Open Standards Matter**
- **Avoid vendor lock-in**
- Enable use of **multiple tools and technologies**
- Can be **openly adopted, implemented, and refined**

### **Key Open Standards**

#### **OCI (Open Container Initiative)**
- **Defines specifications** for open standards and API protocols
- **Content distribution** standards

#### **OCI Runtime Specification**
- **Standard for running** filesystem bundles
- Defines **configuration, execution environment, and lifecycle**
- **Reference implementation:** `runc`

#### **Container Standards**

| Standard | Full Name | Purpose |
|----------|-----------|---------|
| **CNI** | Container Network Interface | Network connectivity standards |
| **CRI** | Container Runtime Interface | Allows kubelet to use various container runtimes |
| **CSI** | Container Storage Interface | Common interface for storage solutions |

#### **📦 Image Specification**
- Outlines how **filesystem bundles** should be **packaged into images**
- Ensures **consistency** across platforms

#### **💾 CSI Benefits**
- **Common interface** for container orchestration systems
- **Consistent operation** without core modifications
- **Storage provider flexibility**

---
