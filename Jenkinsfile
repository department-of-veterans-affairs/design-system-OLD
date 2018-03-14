pipeline {
  agent {
    docker {
      image 'node:6'
      label 'vetsgov-general-purpose'
    }
  }

  stages {
    stage('setup') {
      steps {
        sh 'yarn install'
      }
    }

    stage('lint and test') {
      steps {
        parallel (
          'lint': {
            'npm run lint:js'
          },
          'test': {
            'npm run test'
          }
        )
      }
    }

    stage('build and publish') {
      when { branch 'master' }
      steps {
        sh 'npm run site'
      }
    }
  }
}
