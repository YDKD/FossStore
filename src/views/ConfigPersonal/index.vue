<!--
* @description 
* @fileName index.vue
* @author YDKD
* @date 2021/02/04 16:09:35
!-->
<template>
  <div class="config-monitor">
    <div class="cm-content">
      <el-card shadow="always">
        <div class="cm-head">用户名修改</div>
        <div class="cm-wrap">
          <el-form :model="userNameForm" ref="userNameForm" :rules="userNameRules" label-width="100px" size="normal">
            <el-form-item label="新用户名" prop="newname">
              <el-input v-model="userNameForm.newname" clearable></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
              <el-input v-model="userNameForm.password" type="password"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" plain @click="saveUsername('userNameForm')">保存</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-card>
    </div>
    <div class="cm-content">
      <el-card shadow="always">
        <div class="cm-head">密码修改</div>
        <div class="cm-wrap">
          <el-form :model="passwordForm" ref="passwordForm" :rules="passwordRules" label-width="100px" size="normal">
            <el-form-item label="旧密码" prop="oldPassword">
              <el-input v-model="passwordForm.oldPassword" type="password"></el-input>
            </el-form-item>
            <el-form-item label="新密码" prop="newPassword">
              <el-input v-model="passwordForm.newPassword" type="password"></el-input>
            </el-form-item>
            <el-form-item label="确定新密码" prop="confirmPassword">
              <el-input v-model="passwordForm.confirmPassword" type="password"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" plain @click="savePassword('passwordForm')">保存</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-card>
    </div>
    <div class="cm-content">
      <el-card shadow="always">
        <div class="cm-head">邮箱修改</div>
        <div class="cm-wrap cm-email" v-show="!isValidate">
          <el-form :model="emailForm" ref="emailForm" label-position="top" :rules="emailFormRules" label-width="110px" size="normal">
            <el-form-item label="密码" prop="password" key="id1">
              <el-input v-model="emailForm.password" type="password"></el-input>
            </el-form-item>
            <el-row :gutter="16">
              <el-col :span="20">
                <el-form-item :label="emailLabel" prop="emailCode" key="id2">
                  <el-input v-model="emailForm.emailCode" class="emailInput"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="4">
                <el-button class="sendCodeBtn" type="primary" plain size="default" :disabled="isDisabled" @click="sendCode">{{ btnText }}</el-button>
              </el-col>
            </el-row>
            <el-form-item key="id3">
              <el-button type="primary" plain @click="handleNext('emailForm')">下一步</el-button>
            </el-form-item>
          </el-form>
        </div>
        <div class="cm-wrap cm-email" v-show="isValidate">
          <el-form :model="newEmailForm" ref="newEmailForm" label-position="top" :rules="newEmailFormRules" label-width="110px" size="normal">
            <el-form-item label="新邮箱：" prop="newEmail" key="id4">
              <el-input v-model="newEmailForm.newEmail"></el-input>
            </el-form-item>
            <el-row :gutter="16">
              <el-col :span="20">
                <el-form-item label="新邮箱验证码" prop="newEmailCode" key="id5">
                  <el-input v-model="newEmailForm.newEmailCode" class="emailInput"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="4">
                <el-button class="sendCodeBtn" type="primary" plain size="default" :disabled="isDisabled" @click="sendCode">{{ btnText }}</el-button>
              </el-col>
            </el-row>
            <el-form-item key="id6">
              <el-button type="primary" plain @click="saveNewEmail('newEmailForm')">保 存</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
import { validatorUsernameExist } from "@/api/chartData"
import { resetUsername, resetPassword, validateEmail, senEmailCode, resetEmail } from "@/api/postApi"
export default {
  name: "config-personal",
  data() {
    var validatorUsername = (rule, value, callback) => {
      if (!value) {
        callback("请填写您的新用户名")
      } else {
        let reg = /^[\u4E00-\u9FA5A-Za-z0-9]+$/
        if (!reg.test(value)) {
          callback(new Error("名字不能包含特殊字符"))
        } else {
          validatorUsernameExist(value).then((res) => {
            if (res.data.status == 201) {
              callback(res.data.msg)
            } else {
              callback()
            }
          })
        }
      }
    }

    var validatorPassword = (rule, value, callback) => {
      if (!value) {
        callback(new Error("请输入密码"))
      } else {
        callback()
      }
    }

    var validatorOldPassword = (rule, value, callback) => {
      if (!value) {
        callback(new Error("请输入旧密码"))
      } else {
        callback()
      }
    }

    var validatorNewPassword = (rule, value, callback) => {
      if (!value) {
        callback(new Error("请输入新密码"))
      } else {
        if (value.length < 5 || value.length > 63) {
          callback("密码长度在5-63位")
        } else {
          callback()
        }
      }
    }

    var validatorConfimNewPassword = (rule, value, callback) => {
      if (!value) {
        callback(new Error("请再次输入新密码"))
      } else {
        if (value != this.passwordForm.newPassword) {
          callback("两次密码不一致，请重新输入")
        } else {
          callback()
        }
      }
    }

    var validatorEmail = (rule, value, callback) => {
      if (!value) {
        callback(new Error("请输入您的邮箱"))
      } else {
        let reg = /^[0-9a-zA-Z_.-]+[@][0-9a-zA-Z_.-]+([.][a-zA-Z]+){1,2}$/
        if (reg.test(value)) {
          callback()
        } else {
          callback("邮箱格式不正确")
        }
      }
    }

    return {
      user: "",
      userNameForm: {
        newname: "",
        password: "",
      },
      userNameRules: {
        newname: [{ required: true, validator: validatorUsername, trigger: "blur" }],
        password: [{ required: true, validator: validatorPassword, trigger: "blur" }],
      },
      passwordForm: {
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
      },
      passwordRules: {
        oldPassword: [{ required: true, validator: validatorOldPassword, trigger: "blur" }],
        newPassword: [{ required: true, validator: validatorNewPassword, trigger: "blur" }],
        confirmPassword: [{ required: true, validator: validatorConfimNewPassword, trigger: "blur" }],
      },
      emailForm: {
        emailCode: "",
        password: "",
        newEmail: "",
        newEmailCode: "",
      },
      // emailLabel: "",
      emailFormRules: {
        password: [{ required: true, validator: validatorPassword }],
        emailCode: [{ required: true, message: "请输入邮箱验证码", trigger: "blur" }],
      },
      btnText: "发送邮箱验证码",
      isDisabled: false,
      msgTime: 60,
      isValidate: false,
      timer: null,
      newEmailForm: {
        newEmail: "",
        newEmailCode: "",
      },
      newEmailFormRules: {
        newEmailCode: [{ required: true, message: "请输入邮箱验证码", trigger: "blur" }],
        newEmail: [{ required: true, validator: validatorEmail, trigger: "blur" }],
      },
    }
  },
  created() {
    this.user = this.$store.state.user.userInfo
    // this.emailLabel = 
  },
  computed: {
    emailLabel: function(){
      return "旧邮箱：" + this.user.email
    }
  },
  methods: {
    saveUsername(rulename) {
      this.$refs[rulename].validate((valid) => {
        if (valid) {
          let data = {
            user_id: this.user.user_id,
            newname: this.userNameForm.newname,
            password: this.userNameForm.password,
          }
          resetUsername(data).then((res) => {
            let { code, msg } = res.data
            if (code != 200) {
              this.$message.error(msg)
            } else {
              this.$message.success(msg)
              this.user.username = this.userNameForm.newname
              this.$store.commit("user/USER_INFO", this.user)
              this.$refs[rulename].resetFields()
            }
          })
        }
      })
    },
    savePassword(rulename) {
      this.$refs[rulename].validate((valid) => {
        if (valid) {
          let data = {
            user_id: this.user.user_id,
            newPassword: this.passwordForm.newPassword,
            oldPassword: this.passwordForm.oldPassword,
          }
          resetPassword(data).then((res) => {
            let { code, msg } = res.data
            if (code != 200) {
              this.$message.error(msg)
            } else {
              this.$message.success(msg)
              this.$refs[rulename].resetFields()
              this.$store.dispatch("user/logout")
              this.$router.push({ path: "/login" })
            }
          })
        }
      })
    },
    sendCode() {
      let params
      if (this.isValidate) {
        params = {
          email: this.newEmailForm.newEmail,
        }
        if (this.newEmailForm.newEmail == "") {
          return this.$message.error("请先填写您的邮箱")
        }
      } else {
        params = {
          email: this.user.email,
        }
      }
      senEmailCode(params).then((res) => {
        if (res.data.status === 200) {
          this.$message.success("验证码发送成功")
          this.isDisabled = true
          let that = this
          that.timer = setInterval(() => {
            that.msgTime--
            that.btnText = that.msgTime + "秒后重试"
            if (that.msgTime === 0) {
              that.msgTime = 60
              that.btnText = "发送验证码"
              that.isDisabled = false
              clearInterval(that.timer)
            }
          }, 1000)
        }
      })
    },
    handleNext(rulename) {
      this.$refs[rulename].validate((valid) => {
        if (valid) {
          let data = {
            user_password: this.emailForm.password,
            user_id: this.user.user_id,
            send_code: this.emailForm.emailCode,
          }
          validateEmail(data).then((res) => {
            console.log(res)
            let { code, msg } = res.data
            if (code != 200) {
              this.$message.error(msg)
            } else {
              this.$message.success(msg)
              clearInterval(this.timer)
              this.isValidate = true
              this.msgTime = 60
              this.btnText = "发送验证码"
              this.isDisabled = false
              this.$refs[rulename].resetFields()
            }
          })
        }
      })
    },
    saveNewEmail(rulename) {
      this.$refs[rulename].validate((valid) => {
        if (valid) {
          let data = {
            send_code: this.newEmailForm.newEmailCode,
            user_id: this.user.user_id,
            new_email: this.newEmailForm.newEmail,
          }
          resetEmail(data).then((res) => {
            let {code, msg} = res.data
            if(code != 200) {
              this.$message.error(msg)
            } else {
              this.$message.success(msg)
              clearInterval(this.timer)
              this.isValidate = false
              this.msgTime = 60
              this.btnText = "发送验证码"
              this.isDisabled = false
              this.user.email = this.newEmailForm.newEmail
              this.$store.commit("user/USER_INFO", this.user)
              this.$refs[rulename].resetFields()
            }
          })
        }
      })
    },
  },
}
</script>
<style lang='scss' scoped>
@import "@/styles/index.scss";
.config-monitor {
  padding: 20px;
  .cm-content {
    padding: 10px;
    border-radius: 5px;
    .cm-head {
      padding: 10px 0;
      border-bottom: 1px solid #ccc;
    }
    .cm-wrap {
      width: 60%;
      margin-top: 30px;
    }
    .cm-email {
      padding: 10px;
      .sendCodeBtn {
        margin-top: 35%;
      }
    }
  }
}
</style>
