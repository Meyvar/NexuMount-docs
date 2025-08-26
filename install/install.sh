#!/usr/bin/env bash

# =========================================
# 交互式安装脚本：
# 1. 询问安装路径
# 2. 下载并解压 JDK 21 (tar.gz)
# 3. 下载并解压程序主体 (zip)
# =========================================

# 设置 JDK 基础下载地址
JDK_BASE_URL="https://download.oracle.com/java/21/latest"
APP_URL="https://meyvar.github.io/NexuMount-docs/install/app.zip"  # <-- 修改成你的程序下载地址

# 检测系统架构
ARCH=$(uname -m)
case "$ARCH" in
    x86_64)
        JDK_ARCH="x64"
        ;;
    aarch64)
        JDK_ARCH="aarch64"
        ;;
    *)
        echo "不支持的架构: $ARCH"
        exit 1
        ;;
esac

# 拼接 JDK 下载地址
JDK_TAR="jdk-21_linux-${JDK_ARCH}_bin.tar.gz"
JDK_URL="${JDK_BASE_URL}/${JDK_TAR}"

# 询问安装路径
read -p "请输入安装路径（例如 /opt/myapp）: " INSTALL_DIR
if [ -z "$INSTALL_DIR" ]; then
    echo "安装路径不能为空！"
    exit 1
fi

# 创建安装目录
mkdir -p "$INSTALL_DIR" || { echo "无法创建目录 $INSTALL_DIR"; exit 1; }

# 检查 unzip 是否安装
if ! command -v unzip &> /dev/null; then
    echo "未检测到 unzip，正在安装..."
    if command -v apt &> /dev/null; then
        sudo apt update && sudo apt install -y unzip
    elif command -v yum &> /dev/null; then
        sudo yum install -y unzip
    else
        echo "无法自动安装 unzip，请手动安装后重试"
        exit 1
    fi
fi

# 安装 JDK 21
echo "正在下载 JDK 21..."
curl -L -o "/tmp/$JDK_TAR" "$JDK_URL" || { echo "JDK 下载失败"; exit 1; }

echo "正在解压 JDK 到 $INSTALL_DIR/java ..."
mkdir -p "$INSTALL_DIR/java"
tar -xzf "/tmp/$JDK_TAR" -C "$INSTALL_DIR/java" --strip-components=1 || { echo "JDK 解压失败"; exit 1; }

# 安装程序主体 (zip)
APP_ZIP=$(basename "$APP_URL")
echo "正在下载程序主体..."
curl -L -o "/tmp/$APP_ZIP" "$APP_URL" || { echo "程序主体下载失败"; exit 1; }

echo "正在解压程序主体到 $INSTALL_DIR ..."
unzip -o "/tmp/$APP_ZIP" -d "$INSTALL_DIR" || { echo "程序主体解压失败"; exit 1; }

# 生成启动脚本 run.sh
RUN_SCRIPT="$INSTALL_DIR/run.sh"
cat > "$RUN_SCRIPT" <<EOF
#!/bin/sh

# 使用安装脚本时用户输入的路径
INSTALL_DIR="$INSTALL_DIR"

JAVA_HOME="\$INSTALL_DIR/java"
PATH="\$JAVA_HOME/bin:\$PATH"

JAR_NAME="\$INSTALL_DIR/NexuMount.jar"

tips(){
    echo "-------------------------------------"
    echo ""
    echo "项目地址：\${JAR_NAME}"
    echo ""
    echo "你可以使用如下参数进行操作"
    echo "-status   - 查看当前项目运行状态"
    echo "-start    - 启动当前项目"
    echo "-stop     - 停止当前项目"
    echo "-restart  - 重启当前项目"
    echo ""
    echo "-------------------------------------"
}

status(){
    pid=\$(pgrep -f "\$JAR_NAME")
    if [ -z "\$pid" ]; then
        echo "没有项目在运行"
    else
        echo "项目正在运行中，PID: \$pid"
    fi
}

start(){
    pid=`ps -ef|grep $JAR_NAME|grep -v grep|grep -v kill|awk '{print $2}'`
    if [ -z "${pid}" ];then
        echo "正在启动......"
        nohup java -jar -XX:MetaspaceSize=6144m -XX:MaxMetaspaceSize=12288m "$JAR_NAME" >/dev/null 2>&1 &
    else
        echo "项目运行中或端口已被占用"
    fi

}


stop(){
    pid=\$(pgrep -f "\$JAR_NAME")
    if [ -z "\$pid" ]; then
        echo "没有项目在运行，请先启动"
    else
        kill -9 \$pid
        echo "已停止应用，PID: \$pid"
    fi
}

restart(){
    pid=\$(pgrep -f "\$JAR_NAME")
    if [ -n "\$pid" ]; then
        echo "正在停止应用，PID: \$pid ..."
        kill -9 \$pid
        sleep 2
    fi
    start
    echo "项目重启完成！"
}

case "\$1" in
    "status") status ;;
    "start") start ;;
    "stop") stop ;;
    "restart") restart ;;
    *) tips ;;
esac
EOF

chmod +x "$RUN_SCRIPT"
echo "启动脚本已生成：$RUN_SCRIPT"

echo "安装完成！"
echo "JDK 路径：$INSTALL_DIR/java/"
echo "程序安装路径：$INSTALL_DIR"
