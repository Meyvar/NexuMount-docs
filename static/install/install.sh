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


# 替换文件中的 INSTALL_DIR
if [ -f "$RUN_SCRIPT" ]; then
    # 替换 JAVA_HOME
    sed -i "s|^export JAVA_HOME=.*|export JAVA_HOME=\"$INSTALL_DIR/java\"|" "$RUN_SCRIPT"

    # 替换 JAR_NAME
    sed -i "s|^JAR_NAME=.*|JAR_NAME=\"$INSTALL_DIR/NexuMount.jar\"|" "$RUN_SCRIPT"
else
    echo "run.sh 文件不存在。"
fi

chmod +x "$RUN_SCRIPT"
echo "启动脚本已生成：$RUN_SCRIPT"

echo "安装完成！"
echo "JDK 路径：$INSTALL_DIR/java/"
echo "程序安装路径：$INSTALL_DIR"
