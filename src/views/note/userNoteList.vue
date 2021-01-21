<template>
  <el-row>
    <el-col :span="4" :offset="1">
      <el-card>
        <div class="user-note-info">
          <img :src="imgSrc" alt="" />
          <el-divider></el-divider>
          <div>
            <i class="el-icon-s-operation"></i>
            <span>文章：{{ noteCount }}</span>
          </div>
        </div>
      </el-card>
    </el-col>
    <el-col :span="17" :offset="1">
      <el-table stripe :data="tableData" style="width: 100%">
        <el-table-column prop="date"></el-table-column>
        <el-table-column prop="name"></el-table-column>
        <el-table-column align="right">
          <template #default="scope">
            <el-button size="mini" @click="handlView(scope.$index, scope.row)"
              >查看</el-button
            >
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
              >修改</el-button
            >
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        style="float: right"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="20"
        layout="sizes, prev, pager, next, jumper"
        :total="400"
      ></el-pagination>
    </el-col>
  </el-row>
</template>

<script>
import { reactive, toRefs, onMounted } from "vue";
import { useStore } from "vuex";
import { useRouter, useRoute } from "vue-router";
import { getUserNote } from "@/api/artical";
export default {
  setup(props) {
    let store = useStore();
    let router = useRouter();
    let route = useRoute();
    router.beforeEach((to, from, next) => {
      if (store.state.user.isLogin) {
        router.push("/login");
      } else {
        next();
      }
    });

    const data = reactive({
      tableData: [],
      noteCount: 1,
      imgSrc: "",
      currentPage: 0,
    });

    onMounted(() => {
      console.log(route.params);
      getUserNote({
        id: route.params.userName,
      })
        .then((res) => {
          // console.log(res);
          data.tableData=res.data.data

        })
        .catch((err) => {
          console.log(err);
        });
    });

    const handleEdit = (index, row) => {
      router.push({
        name: "editNote",
        params: {
          articalId: "12",
        },
      });
    };
    const handleDelete = (index, row) => {
      console.log(index, row);
    };
    const handlView = (index, row) => {
      router.push({
        name: "viewNote",
        params: {
          articalId: "223",
        },
      });
      // console.log(index, row);
    };
    const cerateNote = () => {
      router.push({
        name: "createNote",
      });
    };
    const cerateProblem = () => {
      router.push({
        name: "createProblem",
      });
    };
    const handleSizeChange = (val) => {
      console.log(`每页 ${val} 条`);
    };
    const handleCurrentChange = (val) => {
      console.log(`当前页: ${val}`);
    };
    return {
      ...toRefs(data),
      handleEdit,
      handleDelete,
      handlView,
      cerateNote,
      cerateProblem,
      handleSizeChange,
      handleCurrentChange,
    };
  },
};
</script>
<style lang="scss">
.user-note-info {
  img {
    width: 100%;
  }
}
</style>
