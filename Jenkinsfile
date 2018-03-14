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
      sh 'cd /app && yarn install'
    }

    stage('test') {
      sh 'uname -a'
    }

    stage('build and publish') {
      sh 'uname -a'
    }
  }
}