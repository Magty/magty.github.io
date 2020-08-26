<template>
  <div ref="city" :class="['ivu-city',classes]">
    <Dropdown
      trigger="custom"
      :visible="visible"
      :transfer="transfer"
      :placement="bottom-start"
      transfer-class-name="ivu-city-transfer"
      @on-visible-change="handleVisibleChange"
      @on-clickoutside="handleClickOutside"
    >
      <div class="ivu-city-rel" @click="handleToggleOpen">
        <input type="hidden" :name="name" :value="currentValue" />
        <slot>
          <span>{{codeToName}}</span>
          <Icon
            v-show="showCloseIcon"
            @click.native.stop="clearSelect"
            class="ivu-city-arrow"
            type="ios-close-circle"
          ></Icon>
          <Icon class="ivu-city-arrow" type="ios-arrow-down"></Icon>
        </slot>
      </div>
      <DropdownMenu slot="list">
        <div class="ivu-city-drop">
          <div v-if="cities.length" class="ivu-city-drop-cities">
            <span v-for="item in cities" :key="item" @click="handleChangeValue(item.c)"></span>
          </div>
          <div class="ivu-city-drop-menu">
            <div class="ivu-city-drop-type">
              <RadioGroup type="button" size="small" v-model="listType">
                <Radio label="province">按省份</Radio>
                <Radio label="city">按城市</Radio>
              </RadioGroup>
            </div>
            <div class="ivu-city-drop-search">
              <i-select
                v-model="queryCity"
                @on-change="handleSelect"
                filterable
                size="small"
                transfer
                :placeholder="searchPlaceholder"
              >
                <i-option v-for="city in allCities" :key="city.c" :value="city.c">{{city.n}}</i-option>
              </i-select>
            </div>
          </div>
          <div v-if="'province' === listType" class="ivu-city-drop-list">
            <div class="ivu-city-drop-list-letter">
              <Tag
                v-for="provice in provinceList"
                :key="provice.n"
                type="border"
                :fade="false"
                @click.native="handleClickLetter(provice.n)"
              >{{provice.n}}</Tag>
            </div>
            <div ref="list" class="ivu-city-drop-list-main">
              <dl>
                <dt
                  v-for="cityList in cityListByProvince"
                  :key="`dt${cityList.p.l}`"
                  :class="`ivu-city-${cityList.p.l}`"
                >{{ cityList.p.n + ':' }}</dt>
                <slot name="dd">
                  <li
                    @click="handleChangeValue(city.c)"
                    v-for="city in cityList.c"
                    :key="`city_${city.c}`"
                  >{{city.n}}</li>
                </slot>
              </dl>
            </div>
          </div>
          <div v-if="'city' === listType" class="ivu-city-drop-list">
            <div class="ivu-city-drop-list-letter">
              <Tag
                v-for="(cityList,index) in cityListByLetter"
                :key="index"
                type="border"
                :fade="false"
                @click.native="handleClickLetter(cityList)"
              ></Tag>
            </div>
            <div ref="list" class="ivu-city-drop-list-main ivu-city-drop-list-main-city">
              <dl>
                <dt
                  v-for="(city,index) in cityListByLetter"
                  :key="`list_${index}`"
                  :class="`ivu-city-${index}`"
                >{{ index + ':'}}</dt>
                <slot name="dd">
                  <li @click="handleChangeValue(city.c)">{{ city.n }}</li>
                </slot>
              </dl>
            </div>
          </div>
        </div>
      </DropdownMenu>
    </Dropdown>
  </div>
</template>

<script>
import { oneOf, deepCopy } from '@/utils/tool'
function replaceCity(city) {
  return city
    .replace('市', '')
    .replace('地区', '')
    .replace('特别行政区', '')
}
function getCityByName(cityList, name) {
  if (!name) {
    return ''
  }
  const city = cityList.find(item => item.n === name)
  return city ? city.c : ''
}
export default {
  name: 'city',
  mixins: [],
  props: {
    value: {
      type: String
    },
    useName: {
      type: Boolean,
      default: false
    },
    cities: {
      type: Array,
      default: () => []
    },
    disabled: {
      type: Boolean,
      default: false
    },
    clearable: {
      type: Boolean,
      default: false
    },
    showSuffix: {
      type: Boolean,
      default: false
    },
    size: {
      validator: value => oneOf(value, ['small', 'large', 'default']),
      default: () =>
        this.$IVIEWPRO && this.$IVIEWPRO.size !== ''
          ? this.$IVIEWPRO.size
          : 'default'
    },
    transfer: {
      type: Boolean,
      default: () =>
        !(!this.$IVIEWPRO || this.$IVIEWPRO.transfer === '') &&
        this.$IVIEWPRO.transfer
    },
    name: {
      type: String
    },
    elementId: {
      type: String
    },
    placeholder: {
      type: String,
      default: '请选择'
    },
    searchPlaceholder: {
      type: String,
      default: '输入城市名称搜索'
    }
  },
  data() {
    function getAllCities() {
      const all = deepCopy()
      const cities = []
      for (const key in all) {
        cities.push({
          n: replaceCity(all[key])
        })
      }
      return cities
    }
    const allCities = getAllCities()
    return {
      currentValue: this.useName
        ? getCityByName(allCities, this.value)
        : this.value,
      visible: false,
      provinceList: [],
      cityListByProvince: [],
      cityListByLetter: {},
      allCities,
      listType: 'province',
      queryCity: ''
    }
  },
  watch: {
    value: newValue => {
      this.currentValue = this.useName
        ? getCityByName(this.allCities, newValue)
        : newValue
    }
  },
  computed: {
    showCloseIcon: function() {
      return this.currentValue && this.clearable && !this.disabled
    },
    classes: function() {
      const classes = {
        'ivu-city-show-clear': this.showCloseIcon,
        'ivu-city-visible': this.visible,
        'ivu-city-disabled': this.disabled
      }
      classes[`ivu-city-size-${this.size}`] = !!this.size
      return classes
    },
    relCities: function() {
      const cities = []
      if (this.cities) {
        this.cities.forEach(item => {
          cities.push({
            n: item.n
          })
        })
      }
      return cities
    },
    codeToName: function() {
      if (!this.currentValue) {
        return this.placeholder
      }
      return this.showSuffix
        ? this.currentValue.n
        : replaceCity(this.currentValue.n)
    }
  },
  methods: {
    handleSelect: function(select) {
      this.handleChangeValue(select)
      this.$nextTick(() => {
        this.queryCity = ''
      })
    },
    handleChangeValue: function(select) {
      this.currentValue = select
      this.visible = false
      const change = this.useName
        ? ((all, name) => {
            const find = all.find(item => item.c === name)
            return find.n
          })(this.allCities, select)
        : select
      this.$emit('input', change)
      this.$emit('on-change', change)
      this.dispatch('FormItem', 'on-form-change', change)
    },
    handleClickLetter: function(letter) {
      if (letter === '直辖市') {
        letter = 'Z1'
      } else if (letter === '港澳') {
        letter = 'Z2'
      }
      const className = '.ivu-city-' + letter
      const list = this.$refs.list
      const top = list.querySelectorAll(className)[0].offsetTop
      const listTop = list.offsetTop
      list.scrollTop = top - listTop
    },
    clearSelect: function() {
      if (this.disabled) {
        return false
      }
    },
    handleToggleOpen: function() {
      if (this.disabled) {
        return false
      }
      this.visible = !this.visible
    },
    handleVisibleChange: function(visable) {
      this.visible = visable
    },
    handleClickOutside: function(elem) {
      if (!this.$refs.city.contains(elem.target)) {
        this.visible = false
      }
    },
    handleGetProvinceByLetter: function() {
      const cityMap = {
        A: {
          n: 'A',
          p: [],
          c: []
        },
        F: {
          n: 'F',
          p: [],
          c: []
        },
        G: {
          n: 'G',
          p: [],
          c: []
        },
        H: {
          n: 'H',
          p: [],
          c: []
        },
        J: {
          n: 'J',
          p: [],
          c: []
        },
        L: {
          n: 'L',
          p: [],
          c: []
        },
        N: {
          n: 'N',
          p: [],
          c: []
        },
        Q: {
          n: 'Q',
          p: [],
          c: []
        },
        S: {
          n: 'S',
          p: [],
          c: []
        },
        T: {
          n: 'T',
          p: [],
          c: []
        },
        X: {
          n: 'X',
          p: [],
          c: []
        },
        Y: {
          n: 'Y',
          p: [],
          c: []
        },
        Z: {
          n: 'Z',
          p: [],
          c: []
        },
        Z1: {
          n: '直辖市',
          p: [],
          c: []
        },
        Z2: {
          n: '港澳',
          p: [],
          c: []
        }
      }
      this.provinceList = cityMap
    },
    handleGetCityByProvince: function() {},
    handleGetCityByLetter: function() {}
  },
  created: function() {
    this.handleGetProvinceByLetter()
    this.handleGetCityByProvince()
    this.handleGetCityByLetter()
  }
}
</script>

<style>
</style>
