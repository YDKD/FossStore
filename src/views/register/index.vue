<!--
* @description 
* @fileName index.vue
* @author YDKD
* @date 2021/01/08 09:50:53
!-->
<template>
  <div class="register-container">
    <el-form
      :model="registerForm"
      ref="registerForm"
      :rules="registerRules"
      label-position="left"
      class="register-form"
      label-width="100px"
    >
      <div class="title-container">
        <h3 class="title">注 册</h3>
      </div>
      <el-form-item label="用户名:" prop="username">
        <el-input v-model="registerForm.username"></el-input>
      </el-form-item>
      <el-form-item label="密码:" prop="password">
        <el-input type="password" v-model="registerForm.password"></el-input>
      </el-form-item>
      <el-form-item label="确认密码:" prop="rePassword">
        <el-input type="password" v-model="registerForm.rePassword"></el-input>
      </el-form-item>
      <el-form-item label="邮箱:" prop="email">
        <el-input
          type="email"
          v-model="registerForm.email"
          :autofocus="false"
        ></el-input>
      </el-form-item>
      <el-row :gutter="16">
        <el-col :span="18" :offset="0">
          <el-form-item label="邮箱验证码:" prop="code">
            <el-input v-model="registerForm.code"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6" :offset="0">
          <el-button
            class="sendCodeBtn"
            type="primary"
            plain
            size="default"
            @click="sendCode"
            >{{ sendText }}</el-button
          >
        </el-col>
      </el-row>
      <el-form-item>
        <div class="btnWrap clearfix">
          <p class="tipText">
            已有账号？<span @click="handleToLogin">点击登录</span>
          </p>
          <el-button type="primary" @click="submitRegister('ruleForm')"
            >注 册</el-button
          >
        </div>
      </el-form-item>
    </el-form>
    <button @click="encrypt">加密</button>
  </div>
</template>

<script>
import { validatorUsernameExist, validatorEmailExist } from "@/api/chartData";
import { senEmailCode, createUser, encryptData } from "@/api/postApi";
import { encryption, decrypt } from "@/utils/crypt";
export default {
  name: "register",
  data() {
    var validatorUsername = (rule, value, callback) => {
      if (!value) {
        callback("请输入用户名");
      } else {
        let reg = /^[\u4E00-\u9FA5A-Za-z0-9]+$/;
        if (!reg.test(value)) {
          callback(new Error("名字不能包含特殊字符"));
        } else {
          validatorUsernameExist(value).then((res) => {
            if (res.data.status == 201) {
              callback(res.data.msg);
            } else {
              callback();
            }
          });
        }
      }
    };
    var validatorPassword = (rule, value, callback) => {
      if (!value) {
        callback(new Error("请输入密码"));
      } else {
        callback();
      }
    };
    var validatorRepassword = (rule, value, callback) => {
      if (!value) {
        callback(new Error("请输入确认密码"));
      } else {
        if (value != this.registerForm.password) {
          callback(new Error("两次输入密码不一致"));
        } else {
          callback();
        }
      }
    };
    var validatorEmail = (rule, value, callback) => {
      if (!value) {
        callback(new Error("请输入邮箱"));
      } else {
        let reg = /^[a-zA-Z0-9_-]+@([a-z0-9]+[-a-z0-9]*[a-z0-9]+\.)+(com|cn|net|org)$/;
        if (reg.test(value)) {
          validatorEmailExist(value).then((res) => {
            if (res.data.status == 201) {
              callback(res.data.msg);
            } else {
              this.passValidatorEmail = true;
              callback();
            }
          });
        } else {
          callback("邮箱格式不正确");
        }
      }
    };
    return {
      registerForm: {
        username: "",
        password: "",
        rePassword: "",
        email: "",
        code: "",
      },
      registerRules: {
        username: [
          { required: true, validator: validatorUsername, trigger: "blur" },
        ],
        password: [
          { required: true, validator: validatorPassword, trigger: "blur" },
          {
            required: true,
            min: 5,
            message: "密码长度少于5位",
            trigger: "blur",
          },
        ],
        rePassword: [
          { required: true, validator: validatorRepassword, trigger: "blur" },
        ],
        email: [{ required: true, validator: validatorEmail, trigger: "blur" }],
        code: [
          { required: true, message: "请输入邮箱验证码", trigger: "blur" },
        ],
      },
      sendText: "发送验证码",
      passValidatorEmail: false,
      msgTime: 60,
      hasSend: false,
    };
  },
  methods: {
    //   加密
    encrypt() {
      let str = {
        user: "zs",
      };
      let params = {
        data: encryption('123'),
      };
      encryptData(params).then((res) => {
        console.log(res);
      });
    },
    // 发送邮箱验证码
    sendCode() {
      if (!this.registerForm.email) {
        this.$message.warning("请先输入邮箱");
      } else if (this.passValidatorEmail && !this.hasSend) {
        let params = {
          email: this.registerForm.email,
        };
        senEmailCode(params).then((res) => {
          if (res.data.status === 200) {
            this.$message.success("验证码发送成功");
            this.hasSend = true;
            let timer = setInterval(() => {
              this.msgTime--;
              this.sendText = this.msgTime + "秒后重试";
              if (this.msgTime === 0) {
                this.msgTime = 60;
                this.sendText = "发送验证码";
                this.hasSend = false;
                clearInterval(timer);
              }
            }, 1000);
          }
        });
      } else {
        console.log(123);
      }
    },
    // 跳转登录页
    handleToLogin() {
      this.$router.push({ path: "/login" });
    },
    // 注册
    submitRegister() {},
  },
};
</script>
<style lang='scss' scoped>
@import "@/styles/index.scss";
.register-container {
  min-height: 100%;
  width: 100%;
  background: -webkit-linear-gradient(to right, #ff498a, #ffc47c);
  background: linear-gradient(to right, #ff498a, #ffc47c);
  position: relative;
  overflow: hidden;
  .register-form {
    position: absolute;
    top: 45%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 600px;
    max-width: 100%;
    padding: 20px 35px;
    border-radius: 10px;
    margin: 0 auto;
    overflow: hidden;
    background-color: rgba(202, 188, 188, 0.3);
    box-shadow: 10px 10px 5px #888;
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
  .sendCodeBtn {
    margin-left: 10px;
    color: #7da8c3;
    background-color: #fff;
    border-color: #7da8c3;
  }
  ::v-deep .is-error .el-input {
    border: 1px solid red;
    border-radius: 2px;
  }

  ::v-deep .el-form-item__error {
    color: #fff;
  }
  .btnWrap {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    ::v-deep .el-button {
      width: 130px;
      background-color: #7da8c3;
      border-color: #7da8c3;
      float: right;
    }
    .tipText {
      float: right;
      color: #999796;
      font-size: 14px;
      margin-right: 10px;
      span {
        color: #473c8b;
        cursor: pointer;
      }
    }
  }
}
</style>
