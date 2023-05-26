<template>
  <div class="login-wrap">
    <el-form class="login-container">
      <h1 class="title">用户登录</h1>
      <el-form-item label="账号">
        <el-input
          class="inp"
          type="password"
          v-model="uname"
          placeholder="登录账号"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item label="登录密码">
        <el-input
          class="inp"
          type="password"
          v-model="password"
          placeholder="登录密码"
          autocomplete="off"
        ></el-input>
      </el-form-item>

      <el-form-item>
        <el-button
          class="login-btn"
          type="primary"
          style="width: 100%"
          @click="dosubmit()"
          >登录</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  export default {
    name: "LoginPage",
    data: function () {
      return {
        uname: "",
        password: "",
      };
    },
    methods: {
      dosubmit: function () {
        let params = {
          uname: this.uname,
          password: this.password,
        };
        alert("登录成功！")
        this.$router.push({path:'/'})
        this.$store.commit("UPDATE_FOOTER_STATE",true)
        this.$store.commit("UPDATE_LOGIN_STATE",true)
        // this.$store.dispatch("user_login",params)
      },
    },
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  .login-wrap {
    padding-top: 25%;
    .login-container {
      border-radius: 12px;
      margin: 0px auto;
      width: 350px;
      padding: 30px 35px 15px 35px;
      background: #fff;
      text-align: left;
      box-shadow: 0 0 4px 2px rgba(0, 0, 0, 0.2);
      .title {
        margin: 0px auto 40px auto;
        text-align: center;
        color: #505458;
      }
      ::v-deep .inp {
        color: #333;
        .el-input__inner:focus{
            border: 1px solid #c20c0c;
        }
      }
      .login-btn {
        background-color: #c20c0c;
        border: #c20c0c;
      }
    }
  }
</style>
