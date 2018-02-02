def trigger_branch = 'master'
def target_branch = 'gh-pages'

if (env.BRANCH_NAME != trigger_branch) {
  currentBuild.result = 'SUCCESS'
  return
}

node('vetsgov-general-purpose') {
  try {
    stage('Setup'){
      checkout scm
      // Install project dependencies - Node, Ruby
      // Execute yarn install
    }
    stage('Build'){
      // Execute npm run site --> Outputs to build directory
      // Switch to target_branch
      // Delete everything except build directory
      // Move the contents of the build directory to the project root
      // Create a commit to target_branch and push to origin/target_branch
    }
  }

  catch(err) {

  }
}
