pipeline {
    agent none

    environment {
        IMAGE_NAME = 'meghasm10304/secure-cicd-pipeline'
    }

    stages {
        stage('Checkout') {
            agent any
            steps {
                checkout scm
                echo '✅ Source code retrieved'
            }
        }

        stage('Unit Test') {
            agent any
            steps {
                sh 'npm install'
                sh 'npm test'
                echo '🧪 Unit tests passed'
            }
        }

        stage('Build Image') {
            agent any
            steps {
                sh "docker build -t ${IMAGE_NAME}:${BUILD_NUMBER} ."
                sh "docker tag ${IMAGE_NAME}:${BUILD_NUMBER} ${IMAGE_NAME}:latest"
                echo '🐳 Docker image built'
            }
        }

        stage('Security Scan') {
            agent any
            steps {
                sh "trivy image --severity HIGH,CRITICAL --exit-code 1 ${IMAGE_NAME}:${BUILD_NUMBER}"
                echo '🛡️ Security scan passed'
            }
        }

        stage('Push to Registry') {
            agent any
            steps {
                withCredentials([usernamePassword(credentialsId: 'docker-hub-creds', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
                    sh "echo \$DOCKER_PASS | docker login -u \$DOCKER_USER --password-stdin"
                    sh "docker push ${IMAGE_NAME}:${BUILD_NUMBER}"
                    sh "docker push ${IMAGE_NAME}:latest"
                }
                echo '📦 Image pushed to Docker Hub'
            }
        }

        stage('Deploy') {
            agent any
            steps {
                sh "docker stop zenflow-app || true"
                sh "docker rm zenflow-app || true"
                sh "docker run -d --name zenflow-app -p 8081:80 ${IMAGE_NAME}:${BUILD_NUMBER}"
                echo '🚀 Deployed at http://localhost:8081'
            }
        }
    }

    post {
        always {
            cleanWs()
        }
        success {
            echo '✅ Pipeline Success - Check http://<your-EC2-IP>:8081'
        }
        failure {
            echo '❌ Pipeline Failed'
        }
    }
}
