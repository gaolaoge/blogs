<template>
    <div>
        <PageLock v-if="isLock" />
        <PageHome v-else-if="$page.frontmatter.home" :bannerImg="bannerImg" />
        <PageTag v-else-if="$page.frontmatter.mode == 'tag'" />
        <PageAlbum v-else-if="$page.frontmatter.mode == 'album'" />
        <Page :sidebar-items="sidebarItems" v-else />
    </div>
</template>
<script>
import PageHome from '@theme/layouts/PageHome.vue'
import PageTag from '@theme/layouts/PageTag.vue'
import PageAlbum from '@theme/layouts/PageAlbum.vue'
import PageLock from '@theme/layouts/PageLock.vue'
import Page from '@theme/layouts/Page.vue'

export default {
    components: {
        PageHome,
        PageTag,
        PageAlbum,
        Page,
        PageLock,
    },
    props: {
        sidebarItems: {
            type: Array,
            default: () => []
        },
        bannerImg: {
            type: String,
        }
    },
    data() {
        return {

        }
    },
    mounted:() => {
      
    },
    computed: {
        // 当前页面是否被加密
        isLock() {
            // 确保vue监听到数据使isLock变化
            if (this.isRouterAlive) void (0)

            // main
            if (this.$page.frontmatter.password) {
                if (this.isCommonPw) {
                    return sessionStorage.getItem('gnasCommonLock') != 'unlock'
                } else {
                    return sessionStorage.getItem(`gnasPageLock-${this.$page.regularPath}`) != 'unlock'
                }
            }
            return false
        },
        // 如果是加密页面，页面密码是否为通用密码
        isCommonPw() {
            let pagePw = this.$page.frontmatter.password
            let commonPw = this.$site.themeConfig.password
            return pagePw == true || pagePw == commonPw
        },
    }
}
</script>
<style lang="stylus">

</style>
