<template>
    <span class="gnas-tag" :class="`gnas-tag-${type} gnas-tag--${effect}`" @click="$emit('click',type,effect)">
        <i :class="icon" v-if="icon" />
        <slot>
        </slot>
    </span>
</template>
<script>
export default {
    props: {
        type: {
            type: [Number, String],
            default: ''
        },
        effect: {
            type: String,
            default: 'default'
            // default plain
        },
        icon: {
            type: String,
            default: ''
        }
    },
}
</script>
<style lang="stylus" scoped>
.gnas-tag {
    --color: #3eaf7c;
    &.gnas-tag-top,&.gnas-tag-git{
        --color : #171D20;
    }
    &.gnas-tag-life{
        --color : #e47e2a;
    }
    &.gnas-tag-travel{
        --color : #b0202c;
    }
    &.gnas-tag-test{
        --color : #20B041;
    }
    &.gnas-tag-vue{
        --color : #8E44AD;
    }
    &.gnas-tag-react{
        --color : #E6A23C;
    }
    &.gnas-tag-css{
        --color : #185a9d;
    }
      &.gnas-tag-go{
        --color : tomato;
    }
      &.gnas-tag-js{
        --color : #999933;
    }

    display: inline-block;
    height: 20px;
    line-height:17px;
    padding: 0 5px;
    margin-right: 4px;

    font-size: 12px;
    border: 1px solid #000;
    border-radius: 4px;
    box-sizing: border-box;
    white-space: nowrap;
    vertical-align:middle

    color:#fff;
    background-color: var(--color);
    border-color: var(--color);

    &.gnas-tag--plain {
        background-color: white;
        border-color:var(--color);
        color: var(--color);
    }

    i{
        margin-right 0px
        font-size 12px
    }

    &:last-child {
        margin-right: 0;
    }
   
}
</style>
