<template>
  <div
    class="theme-container"
    :class="pageClasses"
    @touchend="onTouchEnd"
    @touchstart="onTouchStart"
  >
    <Navbar v-if="shouldShowNavbar" @toggle-sidebar="toggleSidebar" />
    <Sidebar
      v-if="shouldShowSidebar"
      :isMobileSize="isMobileSize"
      :items="sidebarItems"
      @toggle-sidebar="toggleSidebar"
    />
    <slot> </slot>
    <Footer :bannerImg="bannerImg" />
  </div>
</template>
<script>
import Navbar from "@theme/components/Navbar.vue";
import Footer from "@theme/components/Footer.vue";
import Sidebar from "@theme/components/Sidebar.vue";

export default {
  components: {
    Navbar,
    Footer,
    Sidebar,
  },
  props: {
    isMobileSize: {
      type: Boolean,
      default: false,
    },
    sidebarItems: {
      type: Array,
      default: () => [],
    },
    shouldShowNavbar: {
      type: [Boolean, String],
      default: true,
    },
    shouldShowSidebar: {
      type: [Boolean, Number],
      default: true,
    },
    bannerImg: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      isSidebarOpen: false,
      touchStart: {},
    };
  },
  computed: {
    pageClasses() {
      const userPageClass = this.$page.frontmatter.pageClass;
      return [
        {
          "no-navbar": !this.shouldShowNavbar,
          "sidebar-open": this.isSidebarOpen,
          "no-sidebar": !this.shouldShowSidebar,
          index: this.$page.frontmatter.home,
          friend: this.$page.frontmatter.mode == "friend",
          tag: this.$page.frontmatter.mode == "tag",
          album: this.$page.frontmatter.mode == "album",
          archives: this.$page.frontmatter.mode == "archives",
          blog: this.$page.regularPath.includes(
            this.$site.themeConfig.blogBase
          ),
          "directory-wrap":
            this.$page.frontmatter.config &&
            this.$page.frontmatter.config.dir &&
            this.$page.regularPath.includes(this.$site.themeConfig.blogBase),
          directory:
            this.$page.frontmatter.config &&
            this.$page.frontmatter.config.dir &&
            !this.$page.regularPath.includes(this.$site.themeConfig.blogBase),
        },
        userPageClass,
      ];
    },
  },
  watch: {},
  mounted() {
    this.$router.afterEach(() => {
      this.isSidebarOpen = false;
    });

    if (this.$site.themeConfig.globalAccess) {
      this.addGlobalAccess();
    }
  },
  methods: {
    toggleSidebar(to) {
      this.isSidebarOpen = typeof to === "boolean" ? to : !this.isSidebarOpen;
      this.$emit("toggleSidebar", this.isSidebarOpen);
    },

    // side swipe
    onTouchStart(e) {
      this.touchStart = {
        x: e.changedTouches[0].clientX,
        y: e.changedTouches[0].clientY,
      };
    },
    onTouchEnd(e) {
      const dx = e.changedTouches[0].clientX - this.touchStart.x;
      const dy = e.changedTouches[0].clientY - this.touchStart.y;

      if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 40) {
        if (dx > 0 && this.touchStart.x <= 80) {
          this.toggleSidebar(true);
        } else {
          this.toggleSidebar(false);
        }
      }
    },

    // 记录全局访问量
    addGlobalAccess() {
      const Valine = require("valine-gnas");

      new Valine({
        appId: this.$site.themeConfig.valine.appId,
        appKey: this.$site.themeConfig.valine.appKey,
        globalAccess: true,
      });
    },
  },
};
</script>
<style lang="stylus"></style>
