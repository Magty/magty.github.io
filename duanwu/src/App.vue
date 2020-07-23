<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script>
import { mapMutations } from 'vuex'
import { on, off } from '@/utils/dom'
export default {
  name: 'app',
  methods: {
    ...mapMutations('admin/layout', ['setDevice']),
    handleWindowResize: function() {
      this.handleMatchMedia()
    },
    handleMatchMedia() {
      const media = window.matchMedia
      media('(max-width: 600px)').matches
        ? this.setDevice('Mobile')
        : media('(max-width: 992px)').matches
        ? this.setDevice('Tablet')
        : this.setDevice('Desktop')
    }
  },
  mounted: function() {
    on(window, 'resize', this.handleWindowResize)
    this.handleMatchMedia()
    setTimeout(() => {
      this.$Notice.open({
        duration: 0,
        render: h => {
          return (
            <div>
              <div class="ivu-mb" style="line-height:normal">
                您当前正在浏览 iView Admin Pro 的示例，可能需要以下服务：
              </div>
              <Button
                {...{
                  props: {
                    type: 'primary',
                    icon: 'md-cart',
                    to: 'https://pro.iviewui.com/price',
                    target: '_blank',
                    size: 'small'
                  }
                }}
                class="ivu-mr-8"
              >
                购买授权
              </Button>
              <Button
                {...{
                  props: {
                    icon: 'md-bookmarks',
                    to: 'https://pro.iviewui.com/admin-pro',
                    target: '_blank',
                    size: 'small'
                  }
                }}
                class="ivu-mr-8"
              >
                查看文档
              </Button>
              <Button
                {...{
                  props: {
                    icon: 'md-chatboxes',
                    to: 'https://pro.iviewui.com/consult',
                    target: '_blank',
                    size: 'small'
                  }
                }}
                class="ivu-mr-8"
              >
                咨询
              </Button>
            </div>
          )
        }
      })
    }, 15 * 1000)
  },
  beforeDestroy: function() {
    off(window, 'resize', this.handleWindowResize)
  }
}
</script>

<style lang="scss">
@import url('./styles/base.scss');
// @import url('./styles/app.scss');
#app,
body,
html {
  height: 100%;
}

body {
  background-color: #f7f7f7;
  font-size: 14px;
}
.i-scrollbar-hide::-webkit-scrollbar {
  width: 0;
}

.i-scrollbar-hide::-webkit-scrollbar-track {
  background-color: transparent;
}

.i-scrollbar-hide::-webkit-scrollbar-thumb {
  background: #e8eaec;
}

.i-scrollbar::-webkit-scrollbar {
  width: 6px;
}

.i-scrollbar::-webkit-scrollbar-track {
  background-color: transparent;
}

.i-scrollbar::-webkit-scrollbar-thumb {
  background: #808695;
  border-radius: 4px;
}
.ivu-menu-dark {
  background: #191a23;
}
.ivu-block {
  display: block;
}

.ivu-inline {
  display: inline;
}

.ivu-inline-block {
  display: inline-block;
}

.ivu-text-center {
  text-align: center;
}

.ivu-text-left {
  text-align: left;
}

.ivu-text-right {
  text-align: right;
}

.ivu-fl {
  float: left;
}

.ivu-fr {
  float: right;
}

.ivu-clearfix:after,
.ivu-clearfix:before {
  display: table;
  content: '';
}

.ivu-clearfix:after {
  clear: both;
}

.ivu-line-clamp {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.ivu-b {
  border: 1px solid #e8eaec;
}

.ivu-bt {
  border-top: 1px solid #e8eaec;
}

.ivu-br {
  border-right: 1px solid #e8eaec;
}

.ivu-bb {
  border-bottom: 1px solid #e8eaec;
}

.ivu-bl {
  border-left: 1px solid #e8eaec;
}

.ivu-m-0 {
  margin: 0 !important;
}

.ivu-mt-0 {
  margin-top: 0 !important;
}

.ivu-mr-0 {
  margin-right: 0 !important;
}

.ivu-mb-0 {
  margin-bottom: 0 !important;
}

.ivu-ml-0 {
  margin-left: 0 !important;
}

.ivu-m-8 {
  margin: 8px !important;
}

.ivu-mt-8 {
  margin-top: 8px !important;
}

.ivu-mr-8 {
  margin-right: 8px !important;
}

.ivu-mb-8 {
  margin-bottom: 8px !important;
}

.ivu-ml-8 {
  margin-left: 8px !important;
}

.ivu-p-0 {
  padding: 0 !important;
}

.ivu-pt-0 {
  padding-top: 0 !important;
}

.ivu-pr-0 {
  padding-right: 0 !important;
}

.ivu-pb-0 {
  padding-bottom: 0 !important;
}

.ivu-pl-0 {
  padding-left: 0 !important;
}

.ivu-p-8 {
  padding: 8px !important;
}

.ivu-pt-8 {
  padding-top: 8px !important;
}

.ivu-pr-8 {
  padding-right: 8px !important;
}

.ivu-pb-8 {
  padding-bottom: 8px !important;
}

.ivu-pl-8 {
  padding-left: 8px !important;
}

.ivu-m,
.ivu-m-16 {
  margin: 16px !important;
}

.ivu-mt,
.ivu-mt-16 {
  margin-top: 16px !important;
}

.ivu-mr,
.ivu-mr-16 {
  margin-right: 16px !important;
}

.ivu-mb,
.ivu-mb-16 {
  margin-bottom: 16px !important;
}

.ivu-ml,
.ivu-ml-16 {
  margin-left: 16px !important;
}

.ivu-p,
.ivu-p-16 {
  padding: 16px !important;
}

.ivu-pt,
.ivu-pt-16 {
  padding-top: 16px !important;
}

.ivu-pr,
.ivu-pr-16 {
  padding-right: 16px !important;
}

.ivu-pb,
.ivu-pb-16 {
  padding-bottom: 16px !important;
}

.ivu-pl,
.ivu-pl-16 {
  padding-left: 16px !important;
}

.ivu-anim-fade-appear,
.ivu-anim-fade-enter-active,
.ivu-anim-fade-leave-active {
  -webkit-animation-duration: 0.2s;
  animation-duration: 0.2s;
  -webkit-animation-fill-mode: both;
  animation-fill-mode: both;
  -webkit-animation-play-state: paused;
  animation-play-state: paused;
}

.ivu-anim-fade-appear,
.ivu-anim-fade-enter-active {
  -webkit-animation-name: ivuFadeIn;
  animation-name: ivuFadeIn;
  -webkit-animation-play-state: running;
  animation-play-state: running;
}

.ivu-anim-fade-leave-active {
  -webkit-animation-name: ivuFadeOut;
  animation-name: ivuFadeOut;
  -webkit-animation-play-state: running;
  animation-play-state: running;
}

.ivu-anim-fade-appear,
.ivu-anim-fade-enter-active {
  opacity: 0;
}

.ivu-anim-fade-appear,
.ivu-anim-fade-enter-active,
.ivu-anim-fade-leave-active {
  -webkit-animation-timing-function: linear;
  animation-timing-function: linear;
}

.ivu-anim-move-up-appear,
.ivu-anim-move-up-enter-active,
.ivu-anim-move-up-leave-active {
  -webkit-animation-duration: 0.2s;
  animation-duration: 0.2s;
  -webkit-animation-fill-mode: both;
  animation-fill-mode: both;
  -webkit-animation-play-state: paused;
  animation-play-state: paused;
}

.ivu-anim-move-up-appear,
.ivu-anim-move-up-enter-active {
  -webkit-animation-name: ivuMoveUpIn;
  animation-name: ivuMoveUpIn;
  -webkit-animation-play-state: running;
  animation-play-state: running;
}

.ivu-anim-move-up-leave-active {
  -webkit-animation-name: ivuMoveUpOut;
  animation-name: ivuMoveUpOut;
  -webkit-animation-play-state: running;
  animation-play-state: running;
}

.ivu-anim-move-up-appear,
.ivu-anim-move-up-enter-active {
  opacity: 0;
}

.ivu-anim-move-up-appear,
.ivu-anim-move-up-enter-active,
.ivu-anim-move-up-leave-active {
  -webkit-animation-timing-function: ease-in-out;
  animation-timing-function: ease-in-out;
}

.ivu-anim-move-down-appear,
.ivu-anim-move-down-enter-active,
.ivu-anim-move-down-leave-active {
  -webkit-animation-duration: 0.2s;
  animation-duration: 0.2s;
  -webkit-animation-fill-mode: both;
  animation-fill-mode: both;
  -webkit-animation-play-state: paused;
  animation-play-state: paused;
}

.ivu-anim-move-down-appear,
.ivu-anim-move-down-enter-active {
  -webkit-animation-name: ivuMoveDownIn;
  animation-name: ivuMoveDownIn;
  -webkit-animation-play-state: running;
  animation-play-state: running;
}

.ivu-anim-move-down-leave-active {
  -webkit-animation-name: ivuMoveDownOut;
  animation-name: ivuMoveDownOut;
  -webkit-animation-play-state: running;
  animation-play-state: running;
}

.ivu-anim-move-down-appear,
.ivu-anim-move-down-enter-active {
  opacity: 0;
}

.ivu-anim-move-down-appear,
.ivu-anim-move-down-enter-active,
.ivu-anim-move-down-leave-active {
  -webkit-animation-timing-function: ease-in-out;
  animation-timing-function: ease-in-out;
}

.ivu-anim-move-left-appear,
.ivu-anim-move-left-enter-active,
.ivu-anim-move-left-leave-active {
  -webkit-animation-duration: 0.2s;
  animation-duration: 0.2s;
  -webkit-animation-fill-mode: both;
  animation-fill-mode: both;
  -webkit-animation-play-state: paused;
  animation-play-state: paused;
}

.ivu-anim-move-left-appear,
.ivu-anim-move-left-enter-active {
  -webkit-animation-name: ivuMoveLeftIn;
  animation-name: ivuMoveLeftIn;
  -webkit-animation-play-state: running;
  animation-play-state: running;
}

.ivu-anim-move-left-leave-active {
  -webkit-animation-name: ivuMoveLeftOut;
  animation-name: ivuMoveLeftOut;
  -webkit-animation-play-state: running;
  animation-play-state: running;
}

.ivu-anim-move-left-appear,
.ivu-anim-move-left-enter-active {
  opacity: 0;
}

.ivu-anim-move-left-appear,
.ivu-anim-move-left-enter-active,
.ivu-anim-move-left-leave-active {
  -webkit-animation-timing-function: ease-in-out;
  animation-timing-function: ease-in-out;
}

.ivu-anim-move-right-appear,
.ivu-anim-move-right-enter-active,
.ivu-anim-move-right-leave-active {
  -webkit-animation-duration: 0.2s;
  animation-duration: 0.2s;
  -webkit-animation-fill-mode: both;
  animation-fill-mode: both;
  -webkit-animation-play-state: paused;
  animation-play-state: paused;
}

.ivu-anim-move-right-appear,
.ivu-anim-move-right-enter-active {
  -webkit-animation-name: ivuMoveRightIn;
  animation-name: ivuMoveRightIn;
  -webkit-animation-play-state: running;
  animation-play-state: running;
}

.ivu-anim-move-right-leave-active {
  -webkit-animation-name: ivuMoveRightOut;
  animation-name: ivuMoveRightOut;
  -webkit-animation-play-state: running;
  animation-play-state: running;
}

.ivu-anim-move-right-appear,
.ivu-anim-move-right-enter-active {
  opacity: 0;
}

.ivu-anim-move-right-appear,
.ivu-anim-move-right-enter-active,
.ivu-anim-move-right-leave-active {
  -webkit-animation-timing-function: ease-in-out;
  animation-timing-function: ease-in-out;
}

.ivu-anim-ease-appear,
.ivu-anim-ease-enter-active,
.ivu-anim-ease-leave-active {
  -webkit-animation-fill-mode: both;
  animation-fill-mode: both;
  -webkit-animation-play-state: paused;
  animation-play-state: paused;
}

.ivu-anim-ease-appear,
.ivu-anim-ease-enter-active {
  -webkit-animation-name: ivuEaseIn;
  animation-name: ivuEaseIn;
  -webkit-animation-play-state: running;
  animation-play-state: running;
}

.ivu-anim-ease-leave-active {
  -webkit-animation-name: ivuEaseOut;
  animation-name: ivuEaseOut;
  -webkit-animation-play-state: running;
  animation-play-state: running;
}

.ivu-anim-ease-appear,
.ivu-anim-ease-enter-active {
  opacity: 0;
}

.ivu-anim-ease-appear,
.ivu-anim-ease-enter-active,
.ivu-anim-ease-leave-active {
  -webkit-animation-timing-function: linear;
  animation-timing-function: linear;
  -webkit-animation-duration: 0.2s;
  animation-duration: 0.2s;
}

.ivu-anim-transition-drop-appear,
.ivu-anim-transition-drop-enter-active,
.ivu-anim-transition-drop-leave-active {
  -webkit-animation-duration: 0.2s;
  animation-duration: 0.2s;
  -webkit-animation-fill-mode: both;
  animation-fill-mode: both;
  -webkit-animation-play-state: paused;
  animation-play-state: paused;
}

.ivu-anim-transition-drop-appear,
.ivu-anim-transition-drop-enter-active {
  -webkit-animation-name: ivuTransitionDropIn;
  animation-name: ivuTransitionDropIn;
  -webkit-animation-play-state: running;
  animation-play-state: running;
}

.ivu-anim-transition-drop-leave-active {
  -webkit-animation-name: ivuTransitionDropOut;
  animation-name: ivuTransitionDropOut;
  -webkit-animation-play-state: running;
  animation-play-state: running;
}

.ivu-anim-transition-drop-appear,
.ivu-anim-transition-drop-enter-active {
  opacity: 0;
}

.ivu-anim-transition-drop-appear,
.ivu-anim-transition-drop-enter-active,
.ivu-anim-transition-drop-leave-active {
  -webkit-animation-timing-function: ease-in-out;
  animation-timing-function: ease-in-out;
}

.ivu-anim-slide-up-appear,
.ivu-anim-slide-up-enter-active,
.ivu-anim-slide-up-leave-active {
  -webkit-animation-duration: 0.2s;
  animation-duration: 0.2s;
  -webkit-animation-fill-mode: both;
  animation-fill-mode: both;
  -webkit-animation-play-state: paused;
  animation-play-state: paused;
}

.ivu-anim-slide-up-appear,
.ivu-anim-slide-up-enter-active {
  -webkit-animation-name: ivuSlideUpIn;
  animation-name: ivuSlideUpIn;
  -webkit-animation-play-state: running;
  animation-play-state: running;
}

.ivu-anim-slide-up-leave-active {
  -webkit-animation-name: ivuSlideUpOut;
  animation-name: ivuSlideUpOut;
  -webkit-animation-play-state: running;
  animation-play-state: running;
}

.ivu-anim-slide-up-appear,
.ivu-anim-slide-up-enter-active {
  opacity: 0;
}

.ivu-anim-slide-up-appear,
.ivu-anim-slide-up-enter-active,
.ivu-anim-slide-up-leave-active {
  -webkit-animation-timing-function: ease-in-out;
  animation-timing-function: ease-in-out;
}

.ivu-anim-slide-down-appear,
.ivu-anim-slide-down-enter-active,
.ivu-anim-slide-down-leave-active {
  -webkit-animation-duration: 0.2s;
  animation-duration: 0.2s;
  -webkit-animation-fill-mode: both;
  animation-fill-mode: both;
  -webkit-animation-play-state: paused;
  animation-play-state: paused;
}

.ivu-anim-slide-down-appear,
.ivu-anim-slide-down-enter-active {
  -webkit-animation-name: ivuSlideDownIn;
  animation-name: ivuSlideDownIn;
  -webkit-animation-play-state: running;
  animation-play-state: running;
}

.ivu-anim-slide-down-leave-active {
  -webkit-animation-name: ivuSlideDownOut;
  animation-name: ivuSlideDownOut;
  -webkit-animation-play-state: running;
  animation-play-state: running;
}

.ivu-anim-slide-down-appear,
.ivu-anim-slide-down-enter-active {
  opacity: 0;
}

.ivu-anim-slide-down-appear,
.ivu-anim-slide-down-enter-active,
.ivu-anim-slide-down-leave-active {
  -webkit-animation-timing-function: ease-in-out;
  animation-timing-function: ease-in-out;
}

.ivu-anim-slide-left-appear,
.ivu-anim-slide-left-enter-active,
.ivu-anim-slide-left-leave-active {
  -webkit-animation-duration: 0.2s;
  animation-duration: 0.2s;
  -webkit-animation-fill-mode: both;
  animation-fill-mode: both;
  -webkit-animation-play-state: paused;
  animation-play-state: paused;
}

.ivu-anim-slide-left-appear,
.ivu-anim-slide-left-enter-active {
  -webkit-animation-name: ivuSlideLeftIn;
  animation-name: ivuSlideLeftIn;
  -webkit-animation-play-state: running;
  animation-play-state: running;
}

.ivu-anim-slide-left-leave-active {
  -webkit-animation-name: ivuSlideLeftOut;
  animation-name: ivuSlideLeftOut;
  -webkit-animation-play-state: running;
  animation-play-state: running;
}

.ivu-anim-slide-left-appear,
.ivu-anim-slide-left-enter-active {
  opacity: 0;
}

.ivu-anim-slide-left-appear,
.ivu-anim-slide-left-enter-active,
.ivu-anim-slide-left-leave-active {
  -webkit-animation-timing-function: ease-in-out;
  animation-timing-function: ease-in-out;
}

.ivu-anim-slide-right-appear,
.ivu-anim-slide-right-enter-active,
.ivu-anim-slide-right-leave-active {
  -webkit-animation-duration: 0.2s;
  animation-duration: 0.2s;
  -webkit-animation-fill-mode: both;
  animation-fill-mode: both;
  -webkit-animation-play-state: paused;
  animation-play-state: paused;
}

.ivu-anim-slide-right-appear,
.ivu-anim-slide-right-enter-active {
  -webkit-animation-name: ivuSlideRightIn;
  animation-name: ivuSlideRightIn;
  -webkit-animation-play-state: running;
  animation-play-state: running;
}

.ivu-anim-slide-right-leave-active {
  -webkit-animation-name: ivuSlideRightOut;
  animation-name: ivuSlideRightOut;
  -webkit-animation-play-state: running;
  animation-play-state: running;
}

.ivu-anim-slide-right-appear,
.ivu-anim-slide-right-enter-active {
  opacity: 0;
}

.ivu-anim-slide-right-appear,
.ivu-anim-slide-right-enter-active,
.ivu-anim-slide-right-leave-active {
  -webkit-animation-timing-function: ease-in-out;
  animation-timing-function: ease-in-out;
}

.ivu-anim-loop {
  -webkit-animation: ani-load-loop 1s linear infinite;
  animation: ani-load-loop 1s linear infinite;
}

.ivu-auth-prevent {
  display: inline-block;
  cursor: pointer;

  &-no-mathc {
    pointer-events: none;
  }
}

.ivu-avatar-list {
  display: inline-block;

  &-item {
    display: inline-block;
    margin-left: -8px;
    cursor: pointer;

    &:first-child {
      margin-left: 0;
    }

    .ivu-avatar {
      border: 1px solid #fff;
    }

    &-excess {
      cursor: auto;
    }
  }
}

.ivu-avatar-list-large .ivu-avatar-list-item {
  margin-left: -16px;

  &:first-child {
    margin-left: 0;
  }

  &-excess {
    font-size: 16px;
  }
}

.ivu-avatar-list-default .ivu-avatar-list-item {
  margin-left: -12px;

  &:first-child {
    margin-left: 0;
  }
}

.ivu-calendar-header {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;
  padding: 12px;
  border-bottom: 1px solid #e8eaec;

  &-title {
    color: #17233d;
    font-size: 18px;
  }
}

.ivu-calendar-table {
  table-layout: fixed;

  width: 100%;

  thead th {
    padding: 24px 0 6px 6px;
    text-align: left;
    font-size: 14px;
  }

  td {
    font-size: 14px;
    border-bottom: 1px solid #e8eaec;
    border-right: 1px solid #e8eaec;
    vertical-align: top;
  }

  tr:first-child td {
    border-top: 1px solid #e8eaec;
  }

  tr td:first-child {
    border-left: 1px solid #e8eaec;
  }
}

.ivu-calendar-table-day {
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  height: 100px;
  padding: 6px;
  -webkit-transition: background-color 0.2s ease-in-out;
  transition: background-color 0.2s ease-in-out;
  cursor: pointer;
}

.ivu-calendar-table-day:hover {
  background-color: #f0faff;
}

.ivu-calendar-table-day-other .ivu-calendar-table-day-title {
  color: #c5c8ce;
}

.ivu-calendar-table-day-current {
  background-color: #f0faff;

  .ivu-calendar-table-day-title {
    color: #2d8cf0;
  }
}

.ivu-calendar-table-year {
  padding-top: 24px;
}

.ivu-city {
  display: inline-block;
  position: relative;
}

.ivu-city,
.ivu-city .ivu-dropdown {
  width: 100%;
}

.ivu-city-rel {
  display: inline-block;
  width: 100%;
  position: relative;
  cursor: pointer;
}

.ivu-city-arrow {
  -webkit-transition: all 0.2s ease-in-out;
  transition: all 0.2s ease-in-out;
}

.ivu-city-visible .ivu-city-arrow:nth-of-type(2) {
  -webkit-transform: rotate(180deg);
  -ms-transform: rotate(180deg);
  transform: rotate(180deg);
}

.ivu-city .ivu-select-dropdown {
  width: 400px;
}

.ivu-city-drop {
  width: 400px;
  padding: 2px 8px;
}

.ivu-city-drop-cities {
  margin-bottom: 8px;
}

.ivu-city-drop-cities span {
  display: inline-block;
  margin-right: 4px;
  cursor: pointer;
}

.ivu-city-drop-cities span:hover {
  color: #57a3f3;
}

.ivu-city-drop-menu {
  margin-bottom: 8px;
}

.ivu-city-drop-type {
  display: inline-block;
}

.ivu-city-drop-search {
  display: inline-block;
  margin-left: 8px;
}

.ivu-city-drop-list-letter {
  margin-bottom: 8px;
}

.ivu-city-drop-list-letter .ivu-tag {
  cursor: pointer;
}

.ivu-city-drop-list-letter .ivu-tag:hover .ivu-tag-text {
  color: #57a3f3;
}

.ivu-city-drop-list-main {
  max-height: 200px;
  overflow: auto;
}

.ivu-city-drop-list-main dt {
  float: left;
  font-weight: 700;
}

.ivu-city-drop-list-main dd {
  white-space: normal;
  -webkit-margin-start: 40px;
  margin-inline-start: 40px;
  margin-bottom: 8px;
}

.ivu-city-drop-list-main dd li {
  display: inline-block;
  margin-right: 9px;
  cursor: pointer;
}

.ivu-city-drop-list-main dd li:hover {
  color: #57a3f3;
}

.ivu-city-drop-list-main-city dd {
  -webkit-margin-start: 24px;
  margin-inline-start: 24px;
}

.ivu-city-transfer.ivu-select-dropdown {
  max-height: none;
  overflow: visible;
}

.ivu-description-list-title {
  margin-bottom: 16px;
  color: #17233d;
  font-weight: 500;
  font-size: 14px;
}

.ivu-description-term {
  color: #17233d;
  white-space: nowrap;
}

.ivu-description-detail,
.ivu-description-term {
  display: table-cell;
  padding-bottom: 16px;
  line-height: 20px;
}

.ivu-description-detail {
  width: 100%;
  color: #515a6e;
}

.ivu-description-list-vertical .ivu-description-term {
  display: block;
  padding-bottom: 8px;
}

.ivu-description-list-vertical .ivu-description-detail {
  display: block;
}

.ivu-ellipsis-hidden {
  visibility: hidden;
}

.ivu-exception {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  height: 80%;
  min-height: 500px;
}

.ivu-exception-img {
  -webkit-box-flex: 0;
  -ms-flex: 0 0 62.5%;
  flex: 0 0 62.5%;
  width: 62.5%;
  padding-right: 152px;
  zoom: 1;
}

.ivu-exception-img:after,
.ivu-exception-img:before {
  content: ' ';
  display: table;
}

.ivu-exception-img:after {
  clear: both;
  height: 0;
  font-size: 0;
  visibility: hidden;
}

.ivu-exception-img-element {
  float: right;
  width: 100%;
  max-width: 430px;
  height: 360px;
  background-repeat: no-repeat;
  background-position: 50% 50%;
  background-size: contain;
}

.ivu-exception-content {
  -webkit-box-flex: 1;
  -ms-flex: auto;
  flex: auto;
}

.ivu-exception-content h1 {
  margin-bottom: 24px;
  color: #515a6e;
  font-weight: 600;
  font-size: 72px;
  line-height: 72px;
}

.ivu-exception-content-desc {
  margin-bottom: 16px;
  color: #808695;
  font-size: 20px;
  line-height: 28px;
}

.ivu-exception-content-actions button:not(:last-child) {
  margin-right: 8px;
}

@media screen and (max-width: 768px) {
  .ivu-exception-img {
    padding-right: 88px;
  }
}

@media screen and (max-width: 576px) {
  .ivu-exception {
    display: block;
    text-align: center;
  }

  .ivu-exception-img {
    margin: 0 auto 24px;
    padding-right: 0;
  }
}

@media screen and (max-width: 480px) {
  .ivu-exception-img {
    margin-bottom: -24px;
    overflow: hidden;
  }
}

.ivu-footer-toolbar {
  position: fixed;
  right: 0;
  bottom: 0;
  z-index: 9;
  width: 100%;
  height: 56px;
  padding: 0 24px;
  line-height: 56px;
  background: #fff;
  border-top: 1px solid #e8eaec;
  -webkit-box-shadow: 0 -1px 2px rgba(0, 0, 0, 0.03);
  box-shadow: 0 -1px 2px rgba(0, 0, 0, 0.03);

  &:after {
    display: block;
    clear: both;
    content: '';
  }

  &-left {
    float: left;
  }

  &-right {
    float: right;
  }

  button + button {
    margin-left: 8px;
  }
}

.ivu-global-footer {
  margin: 48px 0 24px 0;
  padding: 0 16px;
  text-align: center;

  &-links {
    margin-bottom: 8px;

    a {
      font-size: 14px;
      color: #808695;
      -webkit-transition: all 0.2s ease-in-out;
      transition: all 0.2s;

      &:not(:last-child) {
        margin-right: 40px;
      }

      &:hover {
        color: #515a6e;
      }
    }
  }

  &-copyright {
    color: #808695;
    font-size: 14px;
  }
}

.ivu-grid:after {
  content: '';
  display: block;
  clear: both;
}

.ivu-grid-item {
  position: relative;
  float: left;
  width: 33.33%;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  border: 0;
  border-radius: 0;
  -webkit-transition: -webkit-box-shadow 0.2s ease-in-out;
  transition: -webkit-box-shadow 0.2s ease-in-out;
  transition: box-shadow 0.2s ease-in-out;
  transition: box-shadow 0.2s ease-in-out, -webkit-box-shadow 0.2s ease-in-out;

  &-main {
    padding: 24px;
  }
}

.ivu-grid-border .ivu-grid-item {
  -webkit-box-shadow: 1px 0 0 0 #e8eaec, 0 1px 0 0 #e8eaec, 1px 1px 0 0 #e8eaec,
    1px 0 0 0 #e8eaec inset, 0 1px 0 0 #e8eaec inset;
  box-shadow: 1px 0 0 0 #e8eaec, 0 1px 0 0 #e8eaec, 1px 1px 0 0 #e8eaec,
    inset 1px 0 0 0 #e8eaec, inset 0 1px 0 0 #e8eaec;
}

.ivu-grid-hover .ivu-grid-item:hover {
  z-index: 1;
  -webkit-box-shadow: 0 1px 6px rgba(0, 0, 0, 0.2);
  box-shadow: 0 1px 6px rgba(0, 0, 0, 0.2);
}

.ivu-grid-center .ivu-grid-item-main {
  width: 100%;
  position: absolute;
  top: 50%;
  -webkit-transform: translateY(-50%);
  -ms-transform: translateY(-50%);
  transform: translateY(-50%);
  text-align: center;
}
</style>
