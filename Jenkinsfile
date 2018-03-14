pipeline {
  agent {
    docker {
      image 'node:6'
      args '-v ${WORKSPACE}:/app'
      // label 'vetsgov-general-purpose'
    }
  }

  stages {
    stage('setup') {
      steps {
        sh 'cd /app && yarn install'
        sh 'sleep 600'
      }
    }

    stage('test') {
      steps {
        sh 'uname -a'
      }
    }

    stage('build and publish') {
      steps {
        sh 'uname -a'
      }
    }
  }
}