<template >
  <span
    v-if="isDesktop"
    class="i-layout-header-trigger i-layout-header-trigger-min i-layout-header-trigger-in i-layout-header-trigger-nohover"
  >
    <input
      class="i-layout-header-search"
      type="text"
      :placeholder="$t('basicLayout.search.placeholder')"
    />
  </span>
  <span v-else class="i-layout-header-trigger i-layout-header-trigger-min">
    <Dropdown ref="dropdown" class="i-layout-header-search-drop" triggle="click">
      <Icon type="ios-search"></Icon>
      <DropdownMenu slot="list">
        <div class="i-layout-header-search-drop-main">
          <Input
            size="large"
            prefix="ios-search"
            type="text"
            :placeholder="$t('basicLayout.search.placeholder')"
          />
          <span
            @click="handleCloseSearch"
            class="i-layout-header-search-drop-main-cancel"
          >{{ $t('basicLayout.search.cancel') }}</span>
        </div>
      </DropdownMenu>
    </Dropdown>
  </span>
</template>
<script>
import { mapState } from 'vuex'
export default {
  name: 'headerSearch',
  computed: {
    ...mapState('admin/layout', ['isDesktop', 'headerMenu'])
  },
  methods: {
    handleCloseSearch: function() {
      this.$refs.dropdown.handleClick()
    }
  }
}
</script>

<style lang="scss">
.i-layout-header-search {
  outline: none;
  border: none;
  background: transparent;
  color: inherit;
  &::-moz-placeholder {
    color: #c5c8ce;
    opacity: 1;
  }
  &:-ms-input-placeholder,
  &::-webkit-input-placeholder {
    color: #c5c8ce;
  }
  &-drop {
    width: 100%;
    .ivu-select-dropdown {
      left: 0 !important;
      right: 0;
      border-radius: 0;
      margin: 0;
      line-height: normal;
    }
    &-main {
      display: flex;
      align-items: center;
      margin: 0 5px;
      .ivu-input-wrapper {
        flex: auto;
      }
      &-cancel {
        flex: auto;
        width: 80px;
        color: #515a6e;
      }
    }
  }
}
</style>
