---
title: 静态站点部署
mode: "notes"
---

nginx 默认会创建一个欢迎页到 `/usr/var/www` 中，然后配置一个反向代理到这个路径中，以实现启动 nginx 后访问 localhost 就可以转到登录页。

这个文件路径不是固定存放静态项目的（`/var` 在 Unix 中的定义是用来存放会改变的数据），理论上系统的任意位置都可以。

## 简单的示例

```bash
# 创建一个项目并打包
$ yarn create vite

$ yarn install

$ yarn build # 得到一个 /dist 
```

在 nginx 中配置这个项目，如在 `/servers` 下创建 1 个新配置项：`vite_demo.conf`：

```nginx
# vite_demo.conf

server {
    listen 80;
    server_name vite_demo;

    location /vite_demo/ {
        root  /Users/goaoge/Documents/vite_demo/dist;
        index index.html;
    }
}
```

确保 Nginx 配置文件中添加这个新的配置文件：

```nginx
include servers/*;
```

```bash
# 查看当前配置是否正确
$ nginx -t 

# 重新加载 Nginx 配置文件
$ nginx -s reload
```

然后访问 `localhost/vite_demo/` 就可以看到上面的 Vite 应用了。


    