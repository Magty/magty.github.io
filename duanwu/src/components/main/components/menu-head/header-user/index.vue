<template>
  <span class="i-layout-header-trigger i-layout-header-trigger-min">
    <Dropdown
      @click="handleClick"
      :trigger="isMobile? 'click' : 'hover'"
      class="i-layout-header-user"
      :class="{'i-layout-header-user-mobile':isMobile}"
    >
      <Avatar v-if="info.avatar" size="small" :src="info.avatar"></Avatar>
      <span v-if="!isMobile" class="i-layout-header-user-name">{{ info.name }}</span>
      <DropdownMenu slot="list">
        <i-link to="/setting/user">
          <DropdownItem>
            <Icon type="ios-contact-outline"></Icon>
            <span>{{ $t('basicLayout.user.center') }}</span>
          </DropdownItem>
        </i-link>
        <i-link to="/setting/account">
          <DropdownItem>
            <Icon type="ios-settings-outline"></Icon>
            <span>{{ $t('basicLayout.user.setting') }}</span>
          </DropdownItem>
        </i-link>
        <i-link to="/setting/account">
          <DropdownItem divided name="logout">
            <Icon type="ios-log-out"></Icon>
            <span>{{ $t('basicLayout.user.logOut') }}</span>
          </DropdownItem>
        </i-link>
      </DropdownMenu>
    </Dropdown>
  </span>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  name: 'headerUser',
  computed: {
    ...mapState('admin/user', ['info']),
    ...mapState('admin/layout', ['isMobile', 'logoutConfirm'])
  },
  methods: {
    ...mapActions('admin/account', ['logout']),
    handleClick: function(opName) {
      opName === 'logout' &&
        this.logout({
          confirm: this.logoutConfirm,
          vm: this
        })
    }
  }
}
</script>

<style lang="scss">
.i-layout-header-user {
  &-name {
    margin-left: 12px;
  }
  .ivu-dropdown-item {
    font-size: 14px !important;
    text-align: left;
  }
  i,
  span {
    vertical-align: middle;
  }
  i {
    margin-right: 6px;
  }
  &-mobile {
    width: 100%;
    .ivu-select-dropdown {
      left: 0 !important;
      right: 0;
      border-radius: 0;
      margin: 0;
    }
  }
}
</style>
