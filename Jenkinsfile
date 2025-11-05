pipeline {
  agent any

  environment {
    NODE_HOME = tool name: 'nodejs', type: 'jenkins.plugins.nodejs.tools.NodeJSInstallation'
    PATH = "${NODE_HOME}/bin:${env.PATH}"
  }

  options {
    timeout(time: 30, unit: 'MINUTES')
    skipDefaultCheckout(true)
    disableConcurrentBuilds()
    buildDiscarder(logRotator(numToKeepStr: '5'))
  }

  stages {
    stage('Clean Workspace') {
      steps {
        cleanWs()
      }
    }

    stage('Clone Repository') {
      steps {
        echo "🔁 Cloning repository..."
        git branch: 'master', url: 'https://github.com/ambresh9400/ambzclouds.xyz.git'
      }
    }

    stage('Install Dependencies') {
      steps {
        echo "📦 Installing dependencies..."
        sh '''
          npm ci || npm install
        '''
      }
    }

    stage('Build Project') {
      steps {
        echo "🏗️ Building Nuxt.js project..."
        sh '''
          sudo rm -rf .nuxt dist node_modules
          npm install
          npm run build
        '''
      }
    }

    stage('Archive Build Artifacts') {
      steps {
        echo "📦 Archiving build artifacts..."
        archiveArtifacts artifacts: '.output/**', fingerprint: true
      }
    }

    stage('Deploy Application') {
      steps {
        echo "🚀 Deploying using PM2..."
        sh '''
          pm2 delete nuxt-app || true
          pm2 start ecosystem.config.js
          pm2 save
        '''
      }
    }
  }

  post {
    success {
      echo "✅ Deployment Successful — https://ambzclouds.xyz is live!"
    }
    failure {
      echo "❌ Deployment Failed. Check Jenkins logs for details."
    }
  }
}
