<template>
    <div class="album-wrap">
        <div class="bg-wrap"></div>
        <div class="main">
            album
        </div>
    </div>
</template>   

<script>
export default {
    name: 'Album'
}
</script>

<style lang="stylus" scoped>
.album-wrap {
    min-height: 100vh;
    margin-top:$navbarHeight;
    .bg-wrap{
        width 100vw;
        height 100vh;
        position fixed;
        top:0;
        left:0;

        background: transparent center center / cover no-repeat;
    }
    main{
        width 740px;
        position:relative;
        margin: 0 auto;
        padding: 30px 24px;
       
    }
}

@media (max-width: $MQMobile) {
        .tag-wrap {
            main{
                width: 100%;
            }
        }
    }
</style>