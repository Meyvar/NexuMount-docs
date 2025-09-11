#!/bin/sh
INSTALL_DIR=$INSTALL_DIR

export JAVA_HOME=$INSTALL_DIR/java
export PATH=$JAVA_HOME/bin:$JRE_HOME/bin:$PATH

JAR_NAME=$INSTALL_DIR/NexuMount.jar

#运行脚本提示信息
tips(){
    echo "-------------------------------------"
    echo ""
    echo "项目地址： ${JAR_NAME}"
    echo ""
    echo "你可以使用如下参数进行操作"
    echo "-status -查看当前项目运行状态"
    echo "-start  -启动当前项目"
    echo "-stop  -停止当前项目"
    echo "-restart -重启当前项目"
    echo ""
    echo "-------------------------------------"
}

#查看状态
status(){
    #查询端口的PID {print $7}-取出打印的第七个值
    pid=`ps -ef|grep $JAR_NAME|grep -v grep|grep -v kill|awk '{print $2}'`
    #判断端口是否被占用
    if [ -z "${pid}" ];then
        echo "没有项目在运行"
    else
        echo "项目正在运行中"
    fi
}

#启动项目
start(){
    pid=`ps -ef|grep $JAR_NAME|grep -v grep|grep -v kill|awk '{print $2}'`
    if [ -z "${pid}" ];then
        echo "正在启动......"
        nohup java -jar -XX:MetaspaceSize=6144m -XX:MaxMetaspaceSize=12288m "$JAR_NAME" >/dev/null 2>&1 &
    else
        echo "项目运行中或端口已被占用"
    fi

}

#停止项目
stop(){
    pid=`ps -ef|grep $JAR_NAME|grep -v grep|grep -v kill|awk '{print $2}'`
    if [ -z "${pid}" ];then
        echo "没有项目在运行，请先启动"
    else
        kill -9 $pid
        echo "已杀死端口为 ${JAR_NAME} 的应用"
    fi
}

#重启项目
restart(){
    pid=`ps -ef|grep $JAR_NAME|grep -v grep|grep -v kill|awk '{print $2}'`
    echo "正在杀死端口 ${JAR_NAME} 的pid ${pid} 中..."
    if [ -z "${pid}" ];then
        echo "项目未启动"
    else
        kill -9 $pid
    fi
    sleep 5 #睡眠五秒
    start  #调用启动方法
    echo "项目重启成功！"
}

#参数选项
case "$1" in
    "status")
     status
     ;;
    "start")
     start
     ;;
    "stop")
     stop
     ;;
    "restart")
     restart
     ;;
    *)
     tips
     ;;
esac
