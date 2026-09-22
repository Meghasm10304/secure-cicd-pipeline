pipeline {
    agent any

    environment {
        IMAGE_NAME = 'meghasm10304/secure-cicd-pipeline'
        // Ensure you have 'docker-hub-creds' saved in Jenkins Credentials
        DOCKER_CREDS = credentials('docker-hub-creds') 
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
                echo '✅ Source code retrieved'
            }
        }

        stage('Unit Test') {
            steps {
                sh 'npm install'
                sh 'npm test'
                echo '🧪 Unit tests passed'
            }
        }

        stage('Build Image') {
            steps {
                sh "docker build -t ${IMAGE_NAME}:${BUILD_NUMBER} ."
                sh "docker tag ${IMAGE_NAME}:${BUILD_NUMBER} ${IMAGE_NAME}:latest"
                echo '🐳 Docker image built'
            }
        }

        stage('Security Scan') {
            steps {
                sh "trivy image --severity HIGH,CRITICAL --exit-code 1 ${IMAGE_NAME}:${BUILD_NUMBER}"
                echo '🛡️ Security scan passed'
            }
        }

        stage('Push to Registry') {
            steps {
                sh 'echo $DOCKER_CREDS_PSW | docker login -u $DOCKER_CREDS_USR --password-stdin'
                sh "docker push ${IMAGE_NAME}:${BUILD_NUMBER}"
                sh "docker push ${IMAGE_NAME}:latest"
                echo '📦 Image pushed to Docker Hub'
            }
        }

        stage('Deploy') {
            steps {
                sh "docker stop zenflow-app || true"
                sh "docker rm zenflow-app || true"
                sh "docker run -d --name zenflow-app -p 8080:80 ${IMAGE_NAME}:${BUILD_NUMBER}"
                echo '🚀 Deployed at http://localhost:8080'
            }
        }
    }

    post {
        success { echo '✅ Pipeline Success' }
        failure { echo '❌ Pipeline Failed' }
    }
}