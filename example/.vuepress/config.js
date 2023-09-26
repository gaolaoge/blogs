const path = require("path");

module.exports = {
  title: "不喜欢咖啡味道的龟",
  dest: "example/dist",
  base: "/",
  plugins: {
    "@vuepress/back-to-top": true,
  },
  head: [["link", { rel: "icon", href: "./img/favicon.ico" }]],
  theme: require.resolve("../../packages/vuepress-theme-gnas"),
  themeConfig: {
    smoothScroll: true,
    themeMode: {
      enable: true,
      default: "light",
    },
    // 锁定页面默认密码，请使用MD5，4位数MD5加密后的密码
    password: "81dc9bdb52d04dc20036dbd8313ed055",
    // 首屏加载动画
    firstLoading: true,
    firstLoadingDuration: 1000,
    // blog文章所在位置
    blogBase: "/views/blog",
    // blogItem配置
    blogItemCofig: {
      // 日期格式化
      dateFormat: "MM dd,yyyy",
    },
    // 全站访问量
    globalAccess: true,
    // 评论系统 文档：https://valine.js.org/，支持valine所有配置
    valine: {
      enable: true,
      appId: "ni92DJP02t9rMtuQiY6ISzds-gzGzoHsz",
      appKey: "9CGy91FHydunpYJAy7youFx2",
    },

    // 加入公益404计划，默认为true
    notFoundPagePublicWelfare: false,
    // 音乐播放器
    music: {
      enable: true,
      autoplay: false,
      list: [
        {
          name: "阿梨粤_秒针",
          href: "./music/阿梨粤 - 秒针.mp3",
        },
        {
          name: "姜涵_人体解冻",
          href: "./music/姜涵 - 人体解冻.mp3",
        },
      ],
    },
    logo: "/img/logo.png",
    home: {
      //   titleLogo: "/img/titleLogo.gif",
      titleLogo: false,
      title: "说说我的生活",
      description: "Think twice before you do.",

      bannerList: [
        "./img/bg1.jpeg",
        "./img/bg2.jpeg",
        "./img/bg3.jpeg",
        "./img/bg4.jpeg",
        "./img/bg5.jpeg",
        "./img/bg6.jpeg",
        "./img/bg7.jpeg",
        "./img/bg8.jpeg",
        "./img/bg9.jpeg",
        "./img/bg11.jpeg",
      ],
      authorConfig: {
        enable: true,
        avatar: "./img/avatar.jpeg",
        bookmark: true,
        github: "https://github.com/gaolaoge",
        qq: 183412808,
        wx: "gaolaogui2",
        email: "183412808@qq.com",
        // alipay: "/img/alipay_ercode.jpg",
      },
      loveConfig: false,
      carouselConfig: {
        enable: true,
        list: [
          {
            title: "日志",
            content: "愿从此不再匆匆忙忙，用心感受每一天。",
            bg: "./img/carousel1.jpeg",
          },
          {
            title: "学习",
            content: "摄取知识不是人生某个阶段的工作，是贯穿人生的快乐源泉。",
            bg: "./img/carousel2.jpeg",
          },
        ],
      },
      tagConfig: {
        enable: true,
      },
    },
    // 备案号
    // record: "浙ICP备00000000号-0",
    record: "浙ICP备xxxxxxxx号-x",
    recordLink: "/",

    // 作者
    author: "二十",

    // 项目开始时间
    startYear: "2023",

    // 导航栏
    nav: [
      {
        text: "首页",
        link: "/",
      },
      {
        text: "日志",
        link: "/views/Tag",
      },
      //   {
      //     text: "相册",
      //     link: "/views/Album",
      //   },
      {
        text: "笔记",
        link: "/views/notes/Enter",
      },
      {
        text: "简历",
        link: "/views/vitae/Enter",
      },
      {
        text: "GitHub",
        link: "https://github.com/gaolaoge/blogs",
      },
    ],
    sidebars: {
      notes: [
        "/views/notes/Enter",
        {
          title: "ECMAScript",
          path: "/views/notes/ECMAScript/Enter",
          // collapsable: false,
          groupClass: true,
          children: ["/views/notes/ECMAScript/Promise"],
        },
        {
          title: "React",
          path: "/views/notes/REACT/Enter",
          // collapsable: false,
          groupClass: true,
          children: ["/views/notes/REACT/Hooks"],
        },
        {
          title: "Webpack",
          path: "/views/notes/WEBPACK/Enter",
          // collapsable: false,
          children: [
            "/views/notes/WEBPACK/Options",
            "/views/notes/WEBPACK/Babel&TS&ESLint",
            "/views/notes/WEBPACK/Styles",
            "/views/notes/WEBPACK/VUE&REACT",
            // "/views/notes/WEBPACK/Img",
            // "/views/notes/WEBPACK/LifeCycle",
          ],
        },
      ],
    },
    sidebarDepth: 0,
    activeHeaderLinks: false,

    lastUpdated: "Last Updated", // 文档更新时间：每个文件git最后提交的时间
    tagList: [
      {
        name: "生活",
        type: "life",
      },
      {
        name: "旅行",
        type: "travel",
      },
    ],

    live2d: {
      model: "hijiki",
    },
  },
};
