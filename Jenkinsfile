pipeline {
  agent any

  environment {
    NODE_HOME = tool name: 'nodejs', type: 'jenkins.plugins.nodejs.tools.NodeJSInstallation'
    PATH = "${NODE_HOME}/bin:${env.PATH}"
  }

  options {
    timeout(time: 30, unit: 'MINUTES') // prevent infinite hang
  }

  stages {
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
          echo "Node version: $(node -v)"
          echo "NPM version: $(npm -v)"
          npm cache clean --force
          npm ci || npm install
        '''
      }
    }

    stage('Build Project') {
      steps {
        echo "🏗️ Building Nuxt.js project..."
        sh 'npm run build'
      }
    }

    stage('Deploy Application') {
      steps {
        echo "🚀 Deploying using PM2..."
        sh '''
          pm2 delete nuxt-app || true
          pm2 start npm --name "nuxt-app" -- run start
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
