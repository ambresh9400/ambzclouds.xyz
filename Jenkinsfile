pipeline {
  agent any

  environment {
    NODE_HOME = tool name: 'nodejs20', type: 'jenkins.plugins.nodejs.tools.NodeJSInstallation'
    PATH = "${NODE_HOME}/bin:/usr/local/bin:/usr/bin:${env.PATH}"
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
          # Clean up old builds and node_modules
          sudo rm -rf node_modules package-lock.json .nuxt dist .output
          npm cache clean --force
          npm install
        '''
      }
    }

    stage('Build Project') {
      steps {
        echo "🏗️ Building Nuxt.js project..."
        sh '''
          npm run build
        '''
      }
    }

    stage('Deploy Application') {
      steps {
        echo "🚀 Deploying using PM2..."
        sh '''
          # Stop any existing instance
          sudo pm2 stop nuxt-app || true
          sudo pm2 delete nuxt-app || true

          # Start new build
          sudo pm2 start .output/server/index.mjs --name "nuxt-app" --interpreter node

          # Save PM2 config
          sudo pm2 save
          sudo systemctl restart nginx || true
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
