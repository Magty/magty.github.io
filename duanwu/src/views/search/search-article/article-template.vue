<template>
  <List item-layout="vertical" size="large">
    <ListItem v-for="(article,index) in articleList" :key="index">
      <ListItemMeta>
        <i-link slot="title" :to="article.link" target="_blank">{{article.title}}</i-link>
        <div slot="description">
          <Tag v-for="item in article.tag" :key="item">{{item}}</Tag>
        </div>
      </ListItemMeta>
      <div style="max-width:700px">{{article.desc}}</div>
      <div class="ivu-mt">
        <Avatar :src="article.auth.avatar" size="small"></Avatar>
        {{article.auth.name}}
        发表于
        {{new Date(article.time) | date_format('YYYY-MM-DD HH:mm:ss')}}
      </div>
      <template slot="action">
        <li>
          <Icon type="ios-star-outline"></Icon>
          {{article.collect}}
        </li>
        <li>
          <Icon type="ios-thumbs-up-outline"></Icon>
          {{article.like}}
        </li>
        <li>
          <Icon type="ios-chatbubbles-outline"></Icon>
          {{article.comment}}
        </li>
      </template>
      <template v-if="!hideCover" slot="extra">
        <img :src="article.cover+'/small'" v-width="280" />
      </template>
    </ListItem>
  </List>
</template>

<script>
export default {
  props: {
    articleList: Array,
    hideCover: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style>
</style>
