<!--
 * @Author: your name
 * @Date: 2021-01-09 14:28:38
 * @LastEditTime: 2021-01-09 16:05:13
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \FossStore\src\views\modifyAccount\reset-password.vue
-->

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
        <h3 class="title">密 码 重 置</h3>
      </div>
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
            :disabled="isDisabled"
            >{{ sendText }}</el-button
          >
        </el-col>
      </el-row>
      <el-form-item label="新密码:" prop="password">
        <el-input type="password" v-model="registerForm.password"></el-input>
      </el-form-item>
      <el-form-item label="确认新密码:" prop="rePassword">
        <el-input type="password" v-model="registerForm.rePassword"></el-input>
      </el-form-item>
      <el-form-item>
        <div class="btnWrap clearfix">
          <p class="tipText">
            <span @click="handleToLogin">返回登录</span>
          </p>
          <el-button type="primary" @click="submitRegister('ruleForm')"
            >确 认</el-button
          >
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { validatorUsernameExist, validatorEmailExist } from "@/api/chartData";
import { senEmailCode, resetPassword } from "@/api/postApi";
import { encryption, decrypt } from "@/utils/crypt";
export default {
  name: "reset-password",
  data() {
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
            if (res.data.status == 200) {
              callback("该邮箱不存在");
            } else {
              this.passValidatorEmail = true;
              this.isDisabled = false;
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
        password: "",
        rePassword: "",
        email: "",
        code: "",
      },
      registerRules: {
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
      isDisabled: true,
      timer: null,
    };
  },
  methods: {
    // 发送邮箱验证码
    sendCode() {
      if (!this.registerForm.email) {
        this.$message.warning("请先输入邮箱");
      } else if (this.passValidatorEmail) {
        let params = {
          email: this.registerForm.email,
        };
        senEmailCode(params).then((res) => {
          if (res.data.status === 200) {
            this.$message.success("验证码发送成功");
            this.isDisabled = true;
            let that = this;
            that.timer = setInterval(() => {
              this.msgTime--;
              this.sendText = this.msgTime + "秒后重试";
              if (this.msgTime === 0) {
                this.msgTime = 60;
                this.sendText = "发送验证码";
                this.isDisabled = false;
                clearInterval(that.timer);
              }
            }, 1000);
          }
        });
      }
    },
    // 跳转登录页
    handleToLogin() {
      this.$router.push({ path: "/login" });
    },
    // 注册
    submitRegister() {
      this.$refs.registerForm.validate((valid) => {
        if (valid) {
          let params = {
            username: this.registerForm.username,
            password: this.registerForm.password,
            postCode: this.registerForm.code,
            email: this.registerForm.email,
          };
          let para = {
            data: encryption(params),
          };
          resetPassword(para).then((res) => {
            if (res.data.status === 202) {
              // 邮箱验证码不正确
              this.$message.error(res.data.msg);
            } else {
              if (res.data.status === 201) {
                // 密码重置失败
                this.$message.error(res.data.msg);
              } else {
                // 密码重置失败
                this.$message.success(res.data.msg);
                this.$refs.registerForm.resetFields();
                this.$router.push({ path: "/login" });
              }
            }
          });
        }
      });
    },
  },
  beforeDestroy() {
    clearInterval(this.timer);
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
  

  ::v-deep .el-form-item__error {
    color: red;
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
      color: #332d2d;
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

