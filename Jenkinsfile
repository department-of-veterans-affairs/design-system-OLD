pipeline {
  agent {
    dockerfile {
      label 'vetsgov-general-purpose'
    }
  }
  environment {
    BABEL_CACHE_PATH = '${env.WORKSPACE}'
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
            sh 'npm run lint:js'
          },
          'test': {
            sh 'npm run test'
          }
        )
      }
    }

    stage('build and publish') {
      when { branch 'ww-jenkinsfile-publish-fix' }
      steps {
        sh 'npm run site'
      }
    }
  }
}
