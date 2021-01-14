<template>
  <el-row>
    <el-col :span="8" :offset="1">
      <el-card shadow="hover" >
        <template #header>
          <span>文章板块</span>
          <router-link
            class="enter"
            :to="{ name: 'community', params: { communityId: 'note' } }"
            >进入</router-link
          >
        </template>
        <ul class="community-card-content">
          <li
            class="community-card-content-item"
            v-for="(item, index) in note"
            :key="index"
          >
            <router-link
              :to="{ name: 'viewNote', params: { articalId: item._id } }"
            >
              {{ item.title }}</router-link
            >
          </li>
        </ul>
      </el-card>
    </el-col>
    <el-col :span="8" :offset="1">
      <el-card shadow="hover">
        <template #header class="community-card-header-title">
          <span>提问板块</span>
          <router-link
            class="enter"
            :to="{ name: 'community', params: { communityId: 'problem' } }"
            >进入</router-link
          >
        </template>
        <ul class="community-card-content">
          <li
            class="community-card-content-item"
            v-for="(item, index) in problem"
            :key="index"
          >
            <router-link
              :to="{ name: 'viewProblem', params: { articalId: item._id } }"
            >
              {{ item.title }}</router-link
            >
          </li>
        </ul>
      </el-card>
    </el-col>
    <el-col :span="4" :offset="1">
      <el-card shadow="hover">
        <template #header class="community-card-header-title">公告</template>
        <div>公告内容</div>
      </el-card>
    </el-col>
  </el-row>
</template>
<script>
import { getToken } from "@/utils/auth";

// import { getLatestNote } from "@/api/note";
// import { getLatestProblem } from "@/api/problem";
import { getArticalLatest } from "@/api/artical";
import Header from "@/views/layout/header.vue";

export default {
  name: "home",
  data() {
    return {
      note: [],
      problem: [],
    };
  },
  created() {
    // this.$http.get('http://localhost:5200/api/v1/artical/latest').then((res) => {
    getArticalLatest().then((res) => {
      console.log(res);
      this.note = res.data.noteList;
      this.problem = res.data.problemList;
      // console.log(this.note);
    });
  },
  mounted() {
    // console.log(getToken());
  },
};
</script>
>

<style lang="scss">
.el-card{
  a.enter {
    float: right;
  }
}
.community-card-content {
  padding-left: 5px;
  .community-card-content-item {
    padding: 5px;
    border-bottom: 1px solid #f0f0f0;
    a {
      color: #000;
      &:hover {
        color: #409eff;
      }
    }
  }
}
</style>
