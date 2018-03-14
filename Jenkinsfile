pipeline {
  agent {
    docker {
      image 'node:6'
      // label 'vetsgov-general-purpose'
    }
  }

  stages {
    stage('setup') {
      steps {
        sh 'yarn install'
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