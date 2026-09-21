pipeline {
    agent any

    environment {
        // Update with YOUR Docker Hub username
        IMAGE_NAME = 'meghasm10304/secure-cicd-pipeline'
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
                echo '✅ Source code retrieved from GitHub'
            }
        }

        stage('Build Image') {
            steps {
                sh "docker build -t ${IMAGE_NAME}:${BUILD_NUMBER} ."
                echo '🐳 Docker image built successfully'
            }
        }

        stage('Security Scan') {
            steps {
                // Fails pipeline on HIGH/CRITICAL vulnerabilities
                sh "trivy image --severity HIGH,CRITICAL --exit-code 1 ${IMAGE_NAME}:${BUILD_NUMBER}"
                echo '🛡️ Security scan passed - No critical vulnerabilities'
            }
        }

        stage('Deploy') {
            steps {
                script {
                    // Stop previous container if exists
                    sh "docker stop zenflow-app || true"
                    sh "docker rm zenflow-app || true"
                    
                    // Deploy new version
                    sh "docker run -d --name zenflow-app -p 8080:80 ${IMAGE_NAME}:${BUILD_NUMBER}"
                    echo '🚀 Application deployed at http://localhost:8080'
                }
            }
        }
    }

    post {
        success {
            echo '✅ Secure CI/CD Pipeline completed successfully!'
        }
        failure {
            echo '❌ Pipeline failed. Check security scan or build logs.'
        }
    }
}