<template>
  <div class="login-container">
    <div class="backHome" @click="backHome"><svg-icon icon-class="icon-zuojiantou-copy" class="func-svg" />返回首页</div>
    <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" label-position="left">
      <div class="title-container">
        <h3 class="title">登 录</h3>
      </div>

      <el-form-item prop="username">
        <span class="svg-icon">
          <svg-icon icon-class="icon-yonghuming" class="func-svg" />
        </span>
        <el-input ref="username" v-model="loginForm.username" placeholder="请输入用户名" name="username" type="text" tabindex="1" auto-complete="off" />
      </el-form-item>

      <el-form-item prop="password">
        <span class="svg-icon">
          <svg-icon icon-class="icon-tubiaozhizuomobanyihuifu-" class="func-svg" />
        </span>
        <el-input
          :key="passwordType"
          ref="password"
          v-model="loginForm.password"
          :type="passwordType"
          placeholder="请输入密码"
          name="Password"
          tabindex="1"
          auto-complete="off"
          @keyup.enter.native="handleLogin"
        />
      </el-form-item>

      <button class="btn">
        <label @click.prevent="handleLogin">login</label>
      </button>
      <!-- <el-button :loading="loading" type="primary" style="width: 100%; margin-bottom: 30px" @click.native.prevent="handleLogin">Login</el-button> -->

      <div class="tips">
        <span style="margin-right: 20px" @click="jumpResetPassword">忘记密码？</span>
        <span @click="jumpRegister">点击注册</span>
      </div>
    </el-form>
    <!-- <div class="uploadWrap">
      <div class="el-upload-dragger">
        <div class="labelUplaod">
          <i class="el-icon-upload fileUpload"></i>
          <div class="el-upload__text">
            将文件拖到此处，或
            <em>点击上传</em>
          </div>
          <input
            type="file"
            ref="upload"
            class="upload"
            @change="beforeUpload"
          />
        </div>
      </div>
      <div class="tip_text">只能上传小于2GB的jar包、war包、zip包。</div>
      <p class="uploadName">{{ uploadName }}</p>
    </div> -->
  </div>
</template>

<script>
import { validUsername } from "@/utils/validate"
import { login, encrypt, uploadFile } from "@/api/postApi"
import { decrypt, encryption } from "@/utils/crypt"
export default {
  name: "Login",
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!value) {
        callback(new Error("请输入用户名"))
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (!value) {
        callback(new Error("请输入密码"))
      } else {
        callback()
      }
    }
    return {
      uploadName: "",
      file: "",
      loginForm: {
        username: "ydkd",
        password: "123456",
      },
      loginRules: {
        username: [{ required: true, trigger: "blur", validator: validateUsername }],
        password: [{ required: true, trigger: "blur", validator: validatePassword }],
      },
      loading: false,
      passwordType: "password",
    }
  },
  watch: {},
  methods: {
    // 上传文件
    beforeUpload(file) {
      // 后缀
      let testmsg = file.target.files[0].name.slice(file.target.files[0].name.lastIndexOf(".") + 1)
      // 文件信息
      this.uploadName = file.target.files[0].name
      this.file = file.target.files[0]
      let data = new FormData()
      data.append("file", this.file)
      uploadFile(data).then((res) => {
        console.log(res)
      })
    },
    // 解密
    decrypt() {
      // let data =  {
      //   data: '112323'
      // }
      // encrypt(data).then(res => {
      //   let code = res.data
      //   let result =  decrypt(code)
      //   console.log(result)
      // })
    },
    jumpRegister() {
      this.$router.push({ path: "/register" })
    },
    jumpResetPassword() {
      this.$router.push({ path: "/password-reset" })
    },
    backHome(){
      this.$router.push({path: '/'})
    },
    handleLogin() {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.loading = true
          // this.$router.push({ path: "/404" });
          this.$store
            .dispatch("user/loginUsername", this.loginForm)
            .then(() => {
              let { role } = this.$store.state.user.userInfo
              let path = role === 3 ? "/dashboard_person" : "/hot_goods"
              this.$router.push({ path: path })
              this.loading = false
              // console.log(this.$store.state.user.userInfo);
            })
            .catch(() => {
              this.loading = false
            })
        } else {
          console.log("error submit!!")
          return false
        }
      })
    },
  },
}
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg: #283443;
$light_gray: #fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;

      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: #fff;
      height: 47px;
      caret-color: $cursor;
      border: 0;
      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
  .el-form-item__error {
    color: #ef2929;
  }
}
</style>

<style lang="scss" scoped>
.uploadWrap {
  width: 400px;
  margin: 0 auto;
  margin-top: 20px;
}
.el-upload-dragger {
  width: 380px;
  height: 200px;
  margin: 0 auto;
  background-color: #fff;
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  box-sizing: border-box;
  text-align: center;
  cursor: pointer;
  position: relative;
}
.uploadWrap:hover {
  border-color: #409eff;
}
.el-upload__text {
  color: #606266;
  font-size: 14px;
  text-align: center;
  em {
    color: #409eff;
    font-style: normal;
  }
}
.tip_text {
  font-size: 12px;
  color: #606266;
  margin-top: 7px;
  padding-left: 15px;
}
.upload {
  position: absolute;
  left: 0px;
  top: 2px;
  width: 49px;
  cursor: pointer;
  opacity: 0;
  padding: 85px 190px;
}
.fileUpload {
  cursor: pointer;
  font-size: 67px;
  color: #c0c4cc;
  margin: 40px 0 16px;
  line-height: 50px;
}
.upload:hover {
  cursor: pointer;
}
.labelUplaod {
  line-height: 20px;
}
.uploadName {
  line-height: 20px;
  margin: 10px;
}

$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #0d0c22;
$jump: #4b45a1;
.login-container {
  min-height: 100%;
  width: 100%;

  background: -webkit-linear-gradient(to right, #ff498a, #ffc47c);
  background: linear-gradient(to right, #ff498a, #ffc47c);
  position: relative;
  overflow: hidden;
  .login-form {
    position: absolute;
    top: 45%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 520px;
    max-width: 100%;
    padding: 20px 35px;
    border-radius: 10px;
    margin: 0 auto;
    overflow: hidden;
    background-color: rgba(202, 188, 188, 0.3);
    box-shadow: 10px 10px 5px #888;
  }

  .tips {
    font-size: 14px;
    color: $jump;
    margin-bottom: 10px;
    display: flex;
    justify-content: space-between;
    text-decoration: underline;

    span {
      cursor: pointer;
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: #fff;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}
.svg-icon {
  padding-left: 2px;
  width: 2em;
}
.btn {
  background: none;
  border: 0;
  outline: 0;
  color: aquamarine;
  font-family: 'JetBrains Mono';
  font-size: 14px;
  cursor: pointer;
  border: 2px solid aquamarine;
  width: 100%;
  height: 40px;
  position: relative;
  margin-bottom: 10px;

}

.btn label {
  position: absolute;
  left: 0;
  top: 0;
  line-height: 34px;
  width: 100%;
  height: 100%;
  z-index: 1;
  background-color: rgb(239, 155, 148);
  cursor: pointer;
}

.btn::before {
  content: '';
  position: absolute;
  left: -2px;
  top: -2px;
  width: 0px;
  height: 0;
  z-index: 0;
  background-color: #ff4e8a;
  transition: width .5s,height .5s;
}

.btn::after {
  content: '';
  position: absolute;
  right: -2px;
  bottom: -2px;
  width: 0;
  height: 0;
  z-index: 0;
  background-color: #ff4e8a;
  transition: width .5s,height .5s;

  /* width: calc(100% + 4px);
  height: calc(100% + 4px); */
}

.btn:hover {
  color: #ff4e8a;
}

.btn:hover::before {
  width: calc(100% + 4px);
  height: calc(100% + 4px);
}

.btn:hover::after {
  width: calc(100% + 4px);
  height: calc(100% + 4px);
}
.backHome {
  margin: 30px;
  cursor: pointer;
  color: #dcc1c1;
}
</style>
