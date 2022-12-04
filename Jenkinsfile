import java.text.SimpleDateFormat


def project_name = 'eorder-pc'
def image_repo_credentialsId = 'keyrus-harbor'
def image_repo_url = 'http://www.keyrus.tech:5000'
def image_name = 'www.keyrus.tech:5000/eorder/eorder-web'
def sdf = new SimpleDateFormat("yyyyMMddHHmm")
def image_version = sdf.format(new Date())
def container_name = 'eorder-web'
def container_port = '7081'

pipeline {
    agent any
    stages {
      //step1:拉取代码
        stage('Pull Code') {
            steps {
                git branch: "${params.BRANCH_TAG}",
        	      credentialsId: '8600bd9e-b5ba-44cf-b67c-b48e59ae0e58',
        	      url: 'http://www.keyrus.tech:8800/keyrus-2b/eOrder-pc-admin.git'
            }
        }
        stage('Build') {
           steps {
               // Get branch lastest code from a GitHub repository
                echo 'build start......'
                nodejs('nodeJS') {
                    sh "node -v"
                    sh 'npm install'
                    sh 'npm run build'
                }
                echo "build success..."

           }

       }
      
       stage('Docker build') {
            steps {
                withDockerRegistry(credentialsId: "${image_repo_credentialsId}", url: "${image_repo_url}") {
                    sh "ls"
                    sh "pwd"
                    
                    // sh "docker build -t Dockerfile ."
                    sh "cd ${workspace}"
                    sh "docker build -t ${project_name}:${image_version} -f Dockerfile-TEST ."
                    sh "docker tag ${project_name}:${image_version} ${image_name}:${image_version}"
                    sh "docker push ${image_name}:${image_version}"
                    //sh "docker rmi ${image_name}:${image_version}"
                    sh "docker stop ${container_name}"
                    sh "docker rm ${container_name}"
                    sh "docker run -d -p ${container_port}:${container_port} --name=${container_name} ${image_name}:${image_version}"
                }
            }
            
       }
    }
}