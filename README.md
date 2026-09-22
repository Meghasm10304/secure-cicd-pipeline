# 🔒 Secure CI/CD Pipeline — ZenFlow

## 🎯 Project Overview
A production-ready CI/CD pipeline for a containerized web application, featuring automated testing, security scanning, and deployment.

## 🏗️ Architecture
GitHub (Code) → Jenkins (Agent) → Node.js (Tests) → Docker Build → Trivy Scan → Docker Hub → Deploy


## 🛠️ Tech Stack
- **CI/CD:** Jenkins
- **Containerization:** Docker, Docker Compose (optional)
- **Security:** Trivy (Container Scanning)
- **Testing:** Node.js (npm test)
- **Registry:** Docker Hub (`meghasm10304/secure-cicd-pipeline`)

## 📦 Pipeline Stages
1. **Checkout:** Pulls source code from GitHub.
2. **Unit Test:** Runs `npm test` to validate application logic.
3. **Build Image:** Builds a Docker image with `BUILD_NUMBER` tag.
4. **Security Scan:** Scans for HIGH/CRITICAL vulnerabilities using Trivy.
5. **Push to Registry:** Tags and pushes image to Docker Hub.
6. **Deploy:** Runs the container on the Jenkins agent.

## ⚙️ Prerequisites
- **Jenkins Agent:** Must have Node.js, Docker, and Trivy installed.
- **Docker Hub:** Account with `meghasm10304` username.
- **Git:** GitHub repository with `Jenkinsfile` and `Dockerfile`.

## 🚀 How to Run (Locally for Validation)
While the pipeline runs on Jenkins, you can validate individual stages locally:
```bash
# 1. Install Node.js (required for tests)
# 2. Run tests
npm test

# 3. Build image
docker build -t zenflow-test .

# 4. Scan with Trivy
trivy image zenflow-test
📸 Screenshot of Successful Build
(Add screenshot here)

📄 License
MIT