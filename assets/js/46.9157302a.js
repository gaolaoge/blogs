(window.webpackJsonp=window.webpackJsonp||[]).push([[46],{492:function(s,t,a){"use strict";a.r(t);var n=a(12),e=Object(n.a)({},(function(){var s=this,t=s._self._c;return t("ContentSlotsDistributor",{attrs:{"slot-key":s.$parent.slotKey}},[t("p",[s._v("nginx 默认会创建一个欢迎页到 "),t("code",[s._v("/usr/var/www")]),s._v(" 中，然后配置一个反向代理到这个路径中，以实现启动 nginx 后访问 localhost 就可以转到登录页。")]),s._v(" "),t("p",[s._v("这个文件路径不是固定存放静态项目的（"),t("code",[s._v("/var")]),s._v(" 在 Unix 中的定义是用来存放会改变的数据），理论上系统的任意位置都可以。")]),s._v(" "),t("h2",{attrs:{id:"简单的示例"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#简单的示例"}},[s._v("#")]),s._v(" 简单的示例")]),s._v(" "),t("div",{staticClass:"language-bash extra-class"},[t("pre",{pre:!0,attrs:{class:"language-bash"}},[t("code",[t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 创建一个项目并打包")]),s._v("\n$ "),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("yarn")]),s._v(" create vite\n\n$ "),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("yarn")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("install")]),s._v("\n\n$ "),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("yarn")]),s._v(" build "),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 得到一个 /dist ")]),s._v("\n")])])]),t("p",[s._v("在 nginx 中配置这个项目，如在 "),t("code",[s._v("/servers")]),s._v(" 下创建 1 个新配置项："),t("code",[s._v("vite_demo.conf")]),s._v("：")]),s._v(" "),t("div",{staticClass:"language-nginx extra-class"},[t("pre",{pre:!0,attrs:{class:"language-nginx"}},[t("code",[t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# vite_demo.conf")]),s._v("\n\n"),t("span",{pre:!0,attrs:{class:"token directive"}},[t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("server")])]),s._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n    "),t("span",{pre:!0,attrs:{class:"token directive"}},[t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("listen")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("80")])]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n    "),t("span",{pre:!0,attrs:{class:"token directive"}},[t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("server_name")]),s._v(" vite_demo")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n\n    "),t("span",{pre:!0,attrs:{class:"token directive"}},[t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("location")]),s._v(" /vite_demo/")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n        "),t("span",{pre:!0,attrs:{class:"token directive"}},[t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("root")]),s._v("  /Users/goaoge/Documents/vite_demo/dist")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n        "),t("span",{pre:!0,attrs:{class:"token directive"}},[t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("index")]),s._v(" index.html")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n    "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n")])])]),t("p",[s._v("确保 Nginx 配置文件中添加这个新的配置文件：")]),s._v(" "),t("div",{staticClass:"language-nginx extra-class"},[t("pre",{pre:!0,attrs:{class:"language-nginx"}},[t("code",[t("span",{pre:!0,attrs:{class:"token directive"}},[t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("include")]),s._v(" servers/*")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n")])])]),t("div",{staticClass:"language-bash extra-class"},[t("pre",{pre:!0,attrs:{class:"language-bash"}},[t("code",[t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 查看当前配置是否正确")]),s._v("\n$ nginx "),t("span",{pre:!0,attrs:{class:"token parameter variable"}},[s._v("-t")]),s._v(" \n\n"),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 重新加载 Nginx 配置文件")]),s._v("\n$ nginx "),t("span",{pre:!0,attrs:{class:"token parameter variable"}},[s._v("-s")]),s._v(" reload\n")])])]),t("p",[s._v("然后访问 "),t("code",[s._v("localhost/vite_demo/")]),s._v(" 就可以看到上面的 Vite 应用了。")])])}),[],!1,null,null,null);t.default=e.exports}}]);