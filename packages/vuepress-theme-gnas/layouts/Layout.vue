<template>
  <CommonLayout :sidebarItems="sidebarItems" :isMobileSize="isMobileSize" :shouldShowNavbar="shouldShowNavbar"
    v-if="isRouterAlive" :shouldShowSidebar="shouldShowSidebar" :bannerImg="bannerImg" @toggleSidebar="toggleSidebar">
    <ClientOnly>
      <component is="Pages" :bannerImg="bannerImg" :sidebarItems="sidebarItems" />
    </ClientOnly>

    <FirstLoading :bannerImg="bannerImg" v-if="$site.themeConfig.firstLoading != false && !isRouterAliveCount" />
  </CommonLayout>
</template>
<script>
import { resolveSidebarItems } from "../util";

import CommonLayout from "@theme/layouts/CommonLayout.vue";
import Pages from "@theme/layouts/Pages.vue";
import FirstLoading from "@theme/components/FirstLoading.vue";

export default {
  components: {
    CommonLayout,
    Pages,
    FirstLoading,
  },
  data() {
    return {
      isRouterAlive: true,
      isRouterAliveCount: false,
      isMobileSize: false,
      isSidebarOpen: false,
    };
  },
  computed: {
    shouldShowNavbar() {
      const { themeConfig } = this.$site;
      const { frontmatter } = this.$page;
      if (frontmatter.navbar === false || themeConfig.navbar === false) {
        return false;
      }
      return (
        this.$title ||
        themeConfig.logo ||
        themeConfig.repo ||
        themeConfig.nav ||
        this.$themeLocaleConfig.nav
      );
    },
    shouldShowSidebar() {
      const { frontmatter } = this.$page;
      return ["home", "vitae", "tag", "archives"].includes(frontmatter.mode)
        ? this.isMobileSize && this.isSidebarOpen
        : frontmatter.sidebar !== false &&
        this.sidebarItems.length &&
        !this.$page.regularPath.includes(this.$site.themeConfig.blogBase);
    },
    sidebarItems() {
      return resolveSidebarItems(
        this.$page,
        this.$page.regularPath,
        this.$site,
        this.$localePath
      );
    },
    bannerImg() {
      let index = Math.floor(
        Math.random() * this.$site.themeConfig.home.bannerList.length
      );
      return this.$site.themeConfig.home.bannerList[index];
    },
  },
  mounted() {
    const MOBILE_DESKTOP_BREAKPOINT = 719; // refer to config.styl
    const handleLinksWrapWidth = () => {
      if (document.documentElement.clientWidth < MOBILE_DESKTOP_BREAKPOINT) {
        this.isMobileSize = true;
      } else {
        this.isMobileSize = false;
      }
    };
    handleLinksWrapWidth();
    window.addEventListener("resize", handleLinksWrapWidth, false);
  },
  methods: {
    reload() {
      this.isRouterAliveCount = true;
      this.isRouterAlive = false;
      this.$nextTick(() => {
        this.isRouterAlive = true;
      });
    },
    toggleSidebar(isSidebarOpen) {
      // this.$emit("toggle-sidebar", isSidebarOpen);
      this.isSidebarOpen = isSidebarOpen
    },
  },
  provide() {
    return {
      reload: this.reload,
    };
  },
};
</script>
<style lang="stylus"></style>
