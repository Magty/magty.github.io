<template>
  <List item-layout="vertical" size="large">
    <ListItem v-for="(item,index) in articleList" :key="index">
      <ListItemMeta>
        <i-link slot="title" :to="item.link" target="_blank">{{item.title}}</i-link>
        <div slot="description">
          <Tag v-for="tag in item.tag" :key="tag">{{tag}}</Tag>
        </div>
      </ListItemMeta>
      <div style="max-width:700px">{{item.desc}}</div>
      <div class="ivu-mt">
        <Avatar :src="item.auth.avatar" size="small"></Avatar>
        {{item.auth.name}} 发表于 {{new Date(item.time) | date_format('YYYY-MM-DD HH:mm:ss')}}
      </div>
      <template #action>
        <li>
          <Icon type="ios-star-outline"></Icon>
          {{item.collect}}
        </li>
        <li>
          <Icon type="ios-thumbs-up-outline"></Icon>
          {{item.like}}
        </li>
        <li>
          <Icon type="ios-chatbubbles-outline"></Icon>
          {{item.comment}}
        </li>
      </template>
      <template v-if="!hideCover" #extra>
        <img v-width="280" :src="`${item.cover}/small`" />
      </template>
    </ListItem>
  </List>
</template>

<script>
export default {
  props: {
    articleList: {
      type: Array
    },
    hideCover: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style>
</style>
