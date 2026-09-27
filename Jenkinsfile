pipeline {
    agent any

    environment {
        DOCKERHUB_CREDENTIALS = credentials('dockerhub-creds')
    }

    stages {
        stage('Build API Image') {
            steps {
                sh 'docker build -t vanireddy2025/mern-blog-api:latest -f api/Dockerfile api'
            }
        }

        stage('Build Client Image') {
            steps {
                sh 'docker build -t vanireddy2025/mern-blog-client:latest -f client/Dockerfile client'
            }
        }

        stage('Push Images to Docker Hub') {
            steps {
                sh 'echo $DOCKERHUB_CREDENTIALS_PSW | docker login -u $DOCKERHUB_CREDENTIALS_USR --password-stdin'
                sh 'docker push vanireddy2025/mern-blog-api:latest'
                sh 'docker push vanireddy2025/mern-blog-client:latest'
            }
        }
    }

    post {
        always {
            sh 'docker logout'
        }
    }
}
