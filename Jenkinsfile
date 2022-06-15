#!groovy

pipeline {
    agent { label "docker && linux" }
    options {
      gitLabConnection('git-lgc')
      gitlabCommitStatus(name: 'jenkins')
      disableConcurrentBuilds()
    }    
    triggers {
        gitlab(triggerOnPush: true, branchFilterType: "All")
    }
    environment {
        CI = credentials('')        
        REGISTRY =''
        ARTIFACTORY_NPM = ''      
        IMAGE = 'iot-connector'
        IMAGE_BRANCH_NAME = getImageBranchName()
        NPM_REGISTRY_NAME= ''
        NPM_REGISTRY = "${ARTIFACTORY_NPM}/${NPM_REGISTRY_NAME}"
        NODE_ENV = "production"
	}
    stages {     
        stage('Run Unit tests, Build and Publish IoT Connector Microservice') {
            steps {
                sh '''
                    docker build -t ${IMAGE} --build-arg NPM_USER=${CI_USR} --build-arg NPM_PASS=${CI_PSW} --build-arg ARTIFACTORY_NPM=${ARTIFACTORY_NPM} --build-arg NPM_REGISTRY_NAME=${NPM_REGISTRY_NAME} ./
                '''

                sh '''
                    echo "publish docker images"
                '''

                sh '''
                    docker login -u ${CI_USR} -p ${CI_PSW} ${REGISTRY}
                    imageTag=${REGISTRY}/${IMAGE}:${IMAGE_BRANCH_NAME}
                    docker tag ${IMAGE} $imageTag
                    docker push $imageTag
                '''

                script { 
                    if (env.BRANCH_NAME.equals("master")) {
                       sh '''
                            imageTag=${REGISTRY}/${IMAGE}:latest
                            docker tag ${IMAGE} $imageTag
                            docker push $imageTag
                       '''
                    }
                }
            }
            
        }  
    }
}


def getImageBranchName() {
    return env.BRANCH_NAME.toLowerCase();
}
