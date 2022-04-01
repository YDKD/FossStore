pipeline {
    agent any                            // agent节点，any告诉jenkins 任何可用的agent都能执行

    environment {
        Name = 'YDKD'
        sshHostName = "server"
        docker = "/usr"
        cacheDir = 'stage' //定义缓存的目录名字
        SERVICENAME = 'nestjs'
            cachePackage = "${cacheDir}/package.json" //定义缓存的package.json
            cacheCommitIDFile = "${cacheDir}/.commitIDCache.txt" //把成功打包的commitID缓存到这里
                artifactsDir = "${cacheDir}/artifacts" //制品缓存的目录，构建成功的制品我们放这里
                resetFlagFile = "${cacheDir}/.resetFile" //回滚标志的文件
            cacheCommitIDMax = 5         //缓存版本的最大值               // 这个是自定义的顶级pipeline全局变量
    }

    options {
        disableConcurrentBuilds()       // 在多分支的流水线中限制并发
    }

    stages {
        stage('init') {

            when {
                anyOf {               //   多分支才有的判断，一个真就通过过
                    branch 'dev'
                    branch 'master'
                }
            }

            steps {
                script{
                  def dockerPath = tool 'docker' //全局配置里的docker
                  env.PATH = "${dockerPath}/bin:${env.PATH}" //添加了系统环境变量上
                }
            }
        }
        stage('pre-build') {           //  自定义步骤 pre-build

            when {
                anyOf {               //   多分支才有的判断，一个真就通过过
                    branch 'dev'
                    branch 'master'
                }
            }

            agent {                  //    代表阶段运行在一个代理的docker nodejs容器中
                docker {
                    image 'node:14.18.0'
                    // 想在 docker 容器中运行代码，但是也想使用流水线所定义的相同节点或和工作空间，必须设置这个
                    reuseNode true
                }
            }

            steps {
                sh 'printenv' //打印jenkins全局环境变量
                sh './jenkins/script/pre-build.sh' //我们把主要的功能写在pre-build.sh脚本里面
            }
        }

        stage('build-env') {
            when {
                anyOf {
                    branch 'dev'
                    branch 'master'
                }
                expression{
                    return !(fileExists("${resetFlagFile}"))
                }
            }
            // 如果设置了true 那么我们有任何一个并发步骤失败那就全都都失败，
            // 因为我们是用来做不同分支任务触发时候的构建选择，所以这个不需要
            failFast false
            parallel {
                stage('build-dev') {
                    when {
                        // beforeAgent 是指在进入agent ，如果when的条件对，才进入，错则不进入
                        // 就是可以加快流水线的运行啦
                        branch 'dev'
                    }
                    agent {
                        docker {
                            image 'node:14.18.0'
                            reuseNode true
                        }
                    }

                    steps {
                        echo 'build-dev'
                        sh './jenkins/script/build-images.sh'
                    }
                }

                // stage('build-master') {
                //     when {
                //         branch 'master'
                //     }

                //     agent {
                //         docker {
                //             image 'node:14.18.0'
                //             reuseNode true
                //         }
                //     }

                //     steps {
                //         echo 'build-master'
                //         sh './jenkins/script/build-master.sh'
                //     }
                // }
            }
        }

        stage("artifacts-manage"){
            when {
                expression{
                    return !(fileExists("${resetFlagFile}"))
                }
            }
            steps {
                echo "artifacts"
                sh './jenkins/script/artifacts-manage.sh'
                archiveArtifacts artifacts:"${artifactsDir}/${GIT_COMMIT}_dist.tar.gz" // 把我们本次构建的压缩文件归档
            }
        }

        stage("reset"){
            when {
                expression{
                    return fileExists("${resetFlagFile}")
                }
                anyOf {
                    branch 'dev'
                    branch 'master'
                    }
                }

            steps {
                echo "是回滚啊啊啊啊"
                //当然我们这里为了方便下载
                archiveArtifacts artifacts:"${artifactsDir}/${GIT_COMMIT}_dist.tar.gz"
            }
        }



        stage('deliver') {
            when {
                anyOf {
                    branch 'dev'
                }
            }

            steps {
                echo "start deliver"
                sh "./jenkins/script/deliver.sh"
            }
        }

        stage('deploy') {
            when {
                branch 'master'
            }

            steps {
                // 这个就是生成一个按钮，我们用来手动发布的
                input message: 'Should you deploy?'
                echo 'start deloy'
            }
        }
    }

    //post 就是流水线的运行结果状态啦，我们慢点会在这里设置邮件通
    post {
        changed{
            echo 'I changed!'
        }

        failure{
            echo 'I failed!'
            configFileProvider([configFile(fileId: 'email-tmp-fail', targetLocation: 'email-fail.html', variable: 'content')]) {
               script {
                   template = readFile encoding: 'UTF-8', file: "${content}"
                   emailext(
                    subject: "Job [${env.JOB_NAME}] - Status: fail",
                    body: """${template}""",
                    recipientProviders: [culprits(),requestor(),developers()],
                    to: "ydkd0606@163.com",
                   )
               }
           }

        }

        success{
            echo 'I success'
            configFileProvider([configFile(fileId: 'email-tmp-success', targetLocation: 'email-success.html', variable: 'content')]) {
               script {
                   template = readFile encoding: 'UTF-8', file: "${content}"
                   emailext(
                    subject: "Job [${env.JOB_NAME}] - Status: Success",
                    body: """${template}""",
                    recipientProviders: [requestor(),developers()],
                    to: "ydkd0606@163.com",
                   )
               }
           }
        }

        always{
            echo 'I always'
            script{
                if(fileExists("${resetFlagFile}")){
                    sh "rm -r ${resetFlagFile}"  //回滚标志文件记得删
                }
            }
        }
        unstable{
            echo "unstable"
        }
        aborted{
            echo "aborted"
        }
    }

}
