<template>
  <el-header>
    <el-row>
      <el-col :span="8">
        <el-menu
          :default-active="$route.path"
          class="el-menu-header"
          mode="horizontal"
          router
        >
          <el-menu-item index="1">
            <div class="logo"></div>
          </el-menu-item>
          <el-menu-item index="/home">社区</el-menu-item>
          <el-menu-item @click="goUserNoteList">管理</el-menu-item>
          <el-menu-item index="/about">关于</el-menu-item>
        </el-menu>
      </el-col>
      <el-col :span="8">
        <div class="search">
          <!-- <el-select v-model="searchType" placeholder="请选择">
            <el-option label="随笔" value="note"></el-option>
            <el-option label="问答" value="problem"></el-option>
          </el-select> -->
          <el-autocomplete
            :debounce="500"
            v-model="searchText"
            :fetch-suggestions="searchArtical"
            placeholder="请输入内容"
            @select="goArtical"
          >
          </el-autocomplete>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="user">
          <el-dropdown @command="userRegist" trigger="click">
            <el-avatar :src="avatarImgSrc"></el-avatar>
            <template #dropdown>
              <el-dropdown-menu v-if="!$store.state.user.isLogin">
                <el-dropdown-item command="login">登陆</el-dropdown-item>
                <el-dropdown-item command="regist">注册</el-dropdown-item>
              </el-dropdown-menu>
              <el-dropdown-menu v-if="$store.state.user.isLogin">
                <el-dropdown-item command="user">个人中心</el-dropdown-item>
                <el-dropdown-item command="logout">退出登陆</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>

        <div class="createBlog">
          <span @click="createBlog"
            ><i class="el-icon-plus header-icon"></i
          ></span>
        </div>
        <div class="siteMsg">
          <el-badge :value="msgNum" :max="99" class="msgNum">
            <span><i class="el-icon-chat-square header-icon"></i></span>
          </el-badge>
        </div>
      </el-col>
    </el-row>
  </el-header>
</template>

<script>
import { searchNote } from "@/api/note";
import { searchProblem } from "@/api/problem";
import { ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useStore } from "vuex";
export default {
  name: "theHeader",

  setup(props) {
    let router = useRouter();
    let route = useRoute();
    let store = useStore();
    let isLogin = ref(false);
    let avatarImgSrc = ref("");
    let user = ref(`/user/232/noteList`);
    isLogin.value = store.state.user.isLogin;

    if (isLogin) {
      avatarImgSrc.value =
        "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png";
    } else {
      avatarImgSrc = "";
    }

    const goUserNoteList = () => {
      // console.log(1212);

      if (isLogin.value) {
        const userToken = store.getters["user/DECODE_TOKEN"];
        router.push({
          name:'userNoteList',
          params:{
            userName:userToken.name
          }
        })
        console.log("用户信息",userToken)
        // console.log("进入");
      } else {
        router.push("/login");
      }
    };
    let searchText = ref("");
    let searchType = ref("note");
    const searchArtical = (value, callback) => {
      if (value) {
        // const searchArtical =
        //   searchType.value == "note" ? searchNote : searchProblem;
        searchNote({
          value,
        })
          .then((res) => {
            // let cb = [];
            let results = res.data.data;
            // console.log(results);
            let cb = results.map((item) => {
              return {
                value: item.title,
                _id: item._id,
              };
            });
            callback(cb);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    };
    const goArtical = (artical) => {
      const routerName =
        searchType.value == "note" ? "viewNote" : "viewProblem";
      router.push({
        name: routerName,
        params: {
          articalId: artical._id,
        },
      });
    };
    let msgNum = ref(0);
    const createBlog = (command) => {
      // console.log(121121);
      router.push({
        name: "createNote",
      });
    };
    const userRegist = (command) => {
      switch (command) {
        case "login":
          {
            // console.log('login');
            router.push({
              name: "login",
            });
          }
          break;
        case "regist":
          {
            router.push({
              name: "regist",
            });
          }
          break;
        case "logout":
          {
            store.commit("user/CLEAR_TOKEN");
            // this.$store.commit("SET_TOKEN", "");
            router.push({
              name: "login",
            });
            // console.log('logout');
          }
          break;
        case "user":
          {
            router.push({
              name: "user",
            });
          }
          break;
        case "noteList":
          {
            router.push({
              name: "userNoteList",
              params: {
                userID: "12",
              },
            });
            // console.log('noteList');
          }
          break;
      }
    };
    // onMounted(() => {
    //     // this.restaurants = this.loadAll();
    // })
    return {
      isLogin,
      avatarImgSrc,
      searchText,
      searchType,
      msgNum,
      user,

      searchArtical,
      goArtical,
      goUserNoteList,
      createBlog,
      userRegist,
    };
  },
};
</script>

<style lang="scss">
@mixin head-navigation-icon {
  float: right;
  margin-right: 20px;
}

.createBlog .header-icon,
.siteMsg .header-icon {
  height: 60px;
  line-height: 60px;
  font-size: 26px;
  font-weight: 800;

  &:hover {
    color: #409eff;
  }
}

.el-menu-header a {
  text-decoration: none;
}

.el-header {
  padding: 0 !important;

  .el-menu.el-menu--horizontal {
    border: none;
  }

  .el-row {
    border-bottom: solid 1px #e6e6e6;

    .search {
      padding-top: 10px;
      margin: 0 auto;

      .el-select {
        width: 21%;

        input {
          // border: 0;
          // border-right: 0;
          border-top-right-radius: 0;
          border-bottom-right-radius: 0;
        }
      }

      .el-autocomplete {
        width: 79%;

        input {
          // // border: 0;
          // // border-left: 0;
          // border-top-left-radius: 0;
          // border-bottom-left-radius: 0;
          border-radius: 5px;
        }
      }
    }

    .user {
      padding-top: 10px;
      margin: 0 auto;

      .el-avatar {
        outline: none;
      }

      @include head-navigation-icon();
    }

    .createBlog {
      // .el-dropdown span {
      //   outline: none;
      // }

      @include head-navigation-icon();
    }

    .siteMsg {
      @include head-navigation-icon();

      .msgNum sup {
        top: 10px;
      }
    }
  }
}

.logo {
  width: 100px;
  height: 100%;
  background-color: gray;
}
</style>
