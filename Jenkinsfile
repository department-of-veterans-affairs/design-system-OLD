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
        sh 'git config --global user.email va-bot@vetsgov'
        sh 'git config --global user.name VA Bot'
        sh 'git config credential.helper "/bin/bash ' + env.WORKSPACE + '/scripts/credential-helper.sh"'
        withCredentials([[
          $class: 'UsernamePasswordMultiBinding',
          credentialsId: 'va-bot',
          usernameVariable: 'GIT_USERNAME',
          passwordVariable: 'GIT_PASSWORD'
        ]]) {
          sh 'npm run site'
        }
      }
    }
  }
}
