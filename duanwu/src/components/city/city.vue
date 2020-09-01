<template>
  <div ref="city" :class="['ivu-city',classes]">
    <Dropdown
      trigger="custom"
      :visible="visible"
      :transfer="transfer"
      placement="bottom-start"
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
            <span
              v-for="item in relCities"
              :key="item"
              @click="handleChangeValue(item.c)"
            >{{item.n}}</span>
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
                <template v-for="(cityList,index) in cityListByProvince">
                  <dt
                    :class="`ivu-city-${cityList.p.l}`"
                    :key="`dt_${index}_${cityList.p.l}`"
                  >{{ cityList.p.n + '： ' }}</dt>
                  <dd :key="`dd_${index}_${cityList.p.l}`">
                    <li
                      @click="handleChangeValue(city.c)"
                      v-for="city in cityList.c"
                      :key="`city_${city.c}`"
                    >{{city.n}}</li>
                  </dd>
                </template>
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
                @click.native="handleClickLetter(index)"
              >{{index}}</Tag>
            </div>
            <div ref="list" class="ivu-city-drop-list-main ivu-city-drop-list-main-city">
              <dl>
                <template v-for="(cityList,index) in cityListByLetter">
                  <dt :key="`dtlist_${index}`" :class="`ivu-city-${index} `">{{ index + ': '}}</dt>
                  <dd :key="`ddlist_${index}`">
                    <li
                      @click="handleChangeValue(city.c)"
                      v-for="city in cityList"
                      :key="`city_${city.c}`"
                    >{{ city.n }}</li>
                  </dd>
                </template>
              </dl>
            </div>
          </div>
        </div>
      </DropdownMenu>
    </Dropdown>
  </div>
</template>

<script>
import { oneOf, deepCopy } from '@/utils/assist'
import mixin from './emitter'
import letterCities from './cities'
import provinces from './provinces'
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
  if (city) {
    return city.c
  } else {
    console.error('[iView Pro warn]: City name error.')
    return ''
  }
}
export default {
  name: 'City',
  mixins: [mixin],
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
      default: function() {
        return (this.$IVIEWPRO && this.$IVIEWPRO.size !== '') ? this.$IVIEWPRO.size : 'default'
      }
    },
    transfer: {
      type: Boolean,
      default: function() {
        return !(!this.$IVIEWPRO || this.$IVIEWPRO.transfer === '') && this.$IVIEWPRO.transfer
      }
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
      const all = deepCopy(letterCities)
      const cities = []
      for (const key in all) {
        const city = all[key]
        city.n = replaceCity(city.n)
        cities.push(city)
      }
      return cities
    }
    const allCities = getAllCities()
    return {
      currentValue: this.useName ? getCityByName(allCities, this.value) : this.value,
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
    value(newValue) {
      this.currentValue = this.useName ? getCityByName(this.allCities, newValue) : newValue
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
          const city = letterCities[item]
          city.n = replaceCity(city.n)
          cities.push(city)
        })
      }
      return cities
    },
    codeToName: function() {
      if (!this.currentValue) {
        return this.placeholder
      }
      const n = letterCities[this.currentValue].n
      return this.showSuffix ? n : replaceCity(n)
    }
  },
  methods: {
    handleSelect: function(select) {
      if (select) {
        this.handleChangeValue(select)
        this.$nextTick(() => {
          this.queryCity = ''
        })
      }
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
      this.$emit('on-change', letterCities[select])
      this.dispatch('FormItem', 'on-form-change', select)
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
      for (const key in provinces) {
        const province = provinces[key]
        cityMap[province.l].p.push(province)
      }
      this.provinceList = cityMap
    },
    handleGetCityByProvince: function() {
      const provinceList = deepCopy(this.provinceList)
      const citys = []
      const cities = deepCopy(letterCities)
      const special = [
        {
          p: {
            n: '直辖市',
            p: '86',
            l: 'Z1'
          },
          c: []
        }, {
          p: {
            n: '港澳',
            p: '86',
            l: 'Z2'
          },
          c: []
        }
      ]
      for (const key in provinceList) {
        for (let province = provinceList[key], index = 0; index < province.p.length; index++) {
          const city = province.p[index]
          const name = city.c
          const cityInfo = {
            p: city,
            c: []
          }
          for (var k in cities) {
            const value = cities[k]
            value.n = replaceCity(value.n)
            if (name === value.p) {
              cityInfo.c.push(value)
            }
          }
          if (key === 'Z1') {
            special[0].c.push(cities[name])
          } else if (key === 'Z2') {
            special[1].c.push(cities[name])
          } else {
            citys.push(cityInfo)
          }
        }
      }
      this.cityListByProvince = citys.concat(special)
    },
    handleGetCityByLetter: function() {
      const cities = deepCopy(letterCities)
      const letters = {
        A: [],
        B: [],
        C: [],
        D: [],
        E: [],
        F: [],
        G: [],
        H: [],
        J: [],
        K: [],
        L: [],
        M: [],
        N: [],
        P: [],
        Q: [],
        R: [],
        S: [],
        T: [],
        W: [],
        X: [],
        Y: [],
        Z: []
      }
      for (const key in cities) {
        const city = cities[key]
        city.n = replaceCity(city.n)
        letters[city.l].push(city)
      }
      this.cityListByLetter = letters
    }
  },
  created: function() {
    this.handleGetProvinceByLetter()
    this.handleGetCityByProvince()
    this.handleGetCityByLetter()
  }
}
</script>

<style lang="scss">
.ivu-city {
  display: inline-block;
  position: relative;
  width: 100%;
  .ivu-dropdown {
    width: 100%;
  }
  &-rel {
    display: inline-block;
    width: 100%;
    position: relative;
    cursor: pointer;
  }
  &-arrow {
    -webkit-transition: all 0.2s ease-in-out;
    transition: all 0.2s ease-in-out;
  }
  &-visible {
    .ivu-city-arrow:nth-of-type(2) {
      -webkit-transform: rotate(180deg);
      -ms-transform: rotate(180deg);
      transform: rotate(180deg);
    }
  }
  .ivu-select-dropdown {
    width: 400px;
  }
  &-drop {
    width: 400px;
    padding: 2px 8px;
    &-cities {
      margin-bottom: 8px;
      span {
        display: inline-block;
        margin-right: 4px;
        cursor: pointer;
        &:hover {
          color: #57a3f3;
        }
      }
    }
    &-menu {
      margin-bottom: 8px;
    }
    &-type {
      display: inline-block;
    }
    &-search {
      display: inline-block;
      margin-left: 8px;
    }
    &-list {
      &-letter {
        margin-bottom: 8px;
        .ivu-tag {
          cursor: pointer;
          &:hover .ivu-tag-text {
            color: #57a3f3;
          }
        }
      }
      &-main {
        max-height: 200px;
        overflow: auto;
        dt {
          float: left;
          font-weight: 700;
        }
        dd {
          white-space: normal;
          -webkit-margin-start: 40px;
          margin-inline-start: 40px;
          margin-bottom: 8px;
          li {
            display: inline-block;
            margin-right: 9px;
            cursor: pointer;
            &:hover {
              color: #57a3f3;
            }
          }
        }
        &-city {
          dd {
            -webkit-margin-start: 24px;
            margin-inline-start: 24px;
          }
        }
      }
    }
  }
  &-transfer.ivu-select-dropdown {
    max-height: none;
    overflow: visible;
  }
}
</style>
