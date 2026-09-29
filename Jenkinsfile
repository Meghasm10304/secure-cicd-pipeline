pipeline {
    agent any

    environment {
        IMAGE_NAME = 'meghasm10304/secure-cicd-pipeline'
        // Ensure you have 'docker-hub-creds' saved in Jenkins Credentials
        DOCKER_CREDS = credentials('docker-hub-creds')
        TRIVY_CACHE_DIR = '/opt/trivy-cache'
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
                sh "docker run -d --name zenflow-app -p 3000:80 ${IMAGE_NAME}:${BUILD_NUMBER}"
                echo '🚀 Deployed at http://localhost:3000'
            }
        }
    }

    post {
        always {
            cleanWs()
        }
        success {
            echo '✅ Pipeline Success - Check http://<your-EC2-IP>:3000'
        }
        failure {
            echo '❌ Pipeline Failed'
        }
    }
}
