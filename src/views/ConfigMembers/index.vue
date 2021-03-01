<!--
* @description 
* @fileName index.vue
* @author YDKD
* @date 2021/02/26 14:04:52
!-->
<template>
  <div class="editMember">
    <div class="warpper">
      <div class="header">
        <h3 class="title">
          <span>成员配置</span>
          <div class="add">
            <el-button type="primary" @click="dialogAddFormVisible = true">添加</el-button>
            <el-button type="danger" :disabled="multipleSelection.length <= 1" @click="deleteMembers">批量删除</el-button>
          </div>
        </h3>
      </div>
      <!--列表-->
      <el-table :data="memberList" @selection-change="handleSelectionChange" v-loading="loading" highlight-current-row style="width: 100%" row-key="id">
        <el-table-column type="selection" min-width="45"></el-table-column>
        <el-table-column label="用户" width="120">
          <template slot-scope="scope">
            <span v-if="scope.row.user_status == 0">{{ scope.row.username + "  (已失效)" }} </span>
            <span v-else>{{ scope.row.username }}</span>
          </template>
        </el-table-column>
        <el-table-column label="用户类型">
          <template slot-scope="scope">
            <span v-if="scope.row.role === 3">管理员</span>
            <span v-else>普通企业用户</span>
          </template>
        </el-table-column>
        <el-table-column label="创建时间">
          <template slot-scope="scope">
            <span>{{ formatTime(scope.row.create_time) }}</span>
          </template>
        </el-table-column>
        <el-table-column label="有效期至">
          <template slot-scope="scope">
            <span v-if="scope.row">{{ formatTime(scope.row.effective_time) }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="email" label="用户邮箱"> </el-table-column>
        <el-table-column prop="user_login_place" label="用户登录地址"> </el-table-column>
        <el-table-column label="操作" width="300">
          <template slot-scope="scope">
            <el-button type="primary" plain size="small" icon="el-icon-edit" @click="modify(scope.row)">修改</el-button>
            <el-button type="warning" plain size="small" @click="passwordReset(scope.row)"><i class="fa fa-unlock-alt"></i> 密码重置</el-button>
            <el-button type="danger" plain size="small" icon="el-icon-delete" @click="handleDel(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 新增 -->
      <el-dialog title="创建新用户" :visible.sync="dialogAddFormVisible" @close="resetAddForm('addUserForm')">
        <el-form :model="form" ref="addUserForm" class="addInput" :rules="addUserRules" label-width="120px">
          <el-form-item label="用户名：" prop="account">
            <el-input v-model="form.account" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="密码：" prop="password">
            <el-input type="password" v-model="form.password" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="确认密码：" prop="confirmPassword">
            <el-input type="password" v-model="form.confirmPassword" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="邮箱：" prop="email">
            <el-input v-model="form.email" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="有效期至：" prop="effective_time">
            <el-date-picker :picker-options="pickerOptions" v-model="form.effective_time" type="date" placeholder="请选择有效日期，不填默认选择2099-01-01"> </el-date-picker>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogAddFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="handleSureAdd">确 定</el-button>
        </div>
      </el-dialog>
      <!-- 修改 -->
      <el-dialog title="修改" width="40%" class="modifyInput" :visible.sync="modifyDialogVisible" @close="resetModifyForm('modifyForm')">
        <span>
          <el-form :model="modifyForm" ref="modifyForm" :rules="modifyRules" label-width="100px" size="normal">
            <el-form-item label="用户名：" prop="username">
              <el-input v-model="modifyForm.username"></el-input>
            </el-form-item>
            <el-form-item label="有效期至：" prop="effective_time">
              <el-date-picker :picker-options="pickerOptions" v-model="modifyForm.effective_time" type="date" placeholder="请选择日期"> </el-date-picker>
            </el-form-item>
          </el-form>
        </span>
        <span slot="footer">
          <el-button @click="modifyDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="confirmModify">确定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { getUserList, validatorUsernameExist, resetPsw } from "@/api/chartData"
import { parseTime, rTime } from "@/utils/index"
import { encryption } from "@/utils/crypt"
import { modifyUserData, deleteUser } from "@/api/postApi"
export default {
  name: "config-members",
  data() {
    var validatorEmail = (rule, value, callback) => {
      if (value) {
        let regUrl = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
        if (regUrl.test(value)) {
          callback()
        } else {
          callback("邮箱格式不正确")
        }
      } else {
        callback()
      }
    }
    // 验证用户名是否已被注册
    var validatorAccount = (rule, value, callback) => {
      if (!value) {
        callback("请输入用户名")
      } else {
        let reg = /^[\u4E00-\u9FA5A-Za-z0-9]+$/
        if (!reg.test(value)) {
          callback(new Error("名字不能包含特殊字符"))
        } else {
          if (this.modifyOriginName != value) {
            validatorUsernameExist(value).then((res) => {
              if (res.data.status === 201) {
                callback("当前用户名已被注册")
              } else {
                callback()
              }
            })
          } else {
            callback()
          }
        }
      }
    }
    // 验证两次密码是否输入一致
    var validatorConfirmPassword = (rule, value, callback) => {
      if (!value) {
        callback("请输入密码")
      } else {
        if (value != this.form.password) {
          callback("两次密码输入不一致，请重新输入")
        } else {
          callback()
        }
      }
    }
    return {
      user: "",
      form: {
        username: "",
        password: "",
        confirmPassword: "",
        email: "",
        effective_time: "",
      },
      loading: false,
      memberList: [],
      dialogAddFormVisible: false,
      modifyDialogVisible: false,
      showDetail: false,
      modifyForm: {
        username: "",
        effective_time: "",
      },
      modifyRules: {
        username: [{ required: true, validator: validatorAccount, trigger: "blur" }],
        effective_time: [{ required: true, message: "请选择有效期", trigger: "blur" }],
      },
      addUserRules: {
        account: [{ required: true, validator: validatorAccount, trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
        confirmPassword: [{ required: true, validator: validatorConfirmPassword, trigger: "blur" }],
        email: [{ required: false, validator: validatorEmail, trigger: "blur" }],
        effective_time: [{ required: false, message: "请选择有效期", trigger: "blur" }],
      },
      modifyDate: "", // 修改日期
      multipleSelection: [], // 当前勾选行
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() < Date.now() - 8.64e7
        },
      },
      checkUpdateUserId: "", // 修改弹框所选择用户id
      modifyOriginName: "", // 展开弹框的初始用户名，如果用户名没有进行修改则不进行验证
    }
  },
  created() {
    this.user = this.$store.state.user.userInfo
    this.getList()
  },
  methods: {
    formatTime(date) {
      return rTime(date)
    },
    // 批量删除
    deleteMembers() {
      this.handleDel("")
    },
    // select选项
    handleSelectionChange(val) {
      this.multipleSelection = []
      val.forEach((item) => {
        this.multipleSelection.push(item.user_id)
      })
    },
    // 修改用户弹框展开
    modify(row) {
      this.modifyDialogVisible = true
      this.modifyOriginName = row.username
      this.modifyForm.username = row.username
      this.modifyForm.effective_time = this.formatTime(row.effective_time)
      this.checkUpdateUserId = row.user_id
    },
    // 确认修改用户
    confirmModify() {
      this.$refs["modifyForm"].validate((valid) => {
        if (valid) {
          const params = {
            user_id: this.checkUpdateUserId,
            username: this.modifyForm.username,
            effective_time: new Date(this.modifyForm.effective_time).getTime(),
            modify_username: this.modifyOriginName == this.modifyForm.username ? false : true,
          }
          const para = {
            data: encryption(params),
          }
          modifyUserData(para).then((res) => {
            if (res.data.code === 0) {
              this.modifyDialogVisible = false
              this.getList()
              this.$message({
                type: "success",
                message: "修改成功",
              })
            } else {
              this.$message({
                type: "error",
                message: "修改失败",
              })
            }
          })
        }
      })
    },
    // 关闭对话框，重置修改表单
    resetModifyForm(formName) {
      this.$refs[formName].resetFields()
      this.modifyDialogVisible = false
    },
    // 关闭对话框，重置添加表单
    resetAddForm(formName) {
      this.$refs[formName].resetFields()
      this.dialogAddFormVisible = false
    },
    // 密码重置
    passwordReset(row) {
      this.$confirm("确认重置密码?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          let params = {
            user_id: row.user_id,
          }
          resetPsw(params).then((res) => {
            if (res.data.code === 0) {
              this.getList()
              this.$message({
                type: "success",
                message: "密码重置成功，初始密码为000000",
              })
            } else {
              this.$message({
                type: "error",
                message: "密码重置失败!",
              })
            }
          })
        })
        .catch(() => {})
    },
    getList() {
      let params = {
        user_id: this.user.user_id,
      }
      getUserList(params).then((resp) => {
        this.memberList = resp.data
      })
    },
    tmpFormat(date) {
      return parseTime(date, "{y}-{m}-{d}")
    },
    handleAdd() {
      this.dialogAddFormVisible = true
    },
    handleSureAdd() {
      this.$refs["addUserForm"].validate((valid) => {
        if (valid) {
          const params = {
            enterpriseId: this.user.enterprise_id,
            account: this.form.account,
            psw: this.form.password,
            email: this.form.email,
            role: 0,
            createTime: new Date().getTime(),
            deadline: this.form.effective_time ? new Date(this.form.effective_time).getTime() : new Date("2099-1-1").getTime(),
          }
          postAddMember(params).then((resp) => {
            if (resp.status == "Ok") {
              this.dialogAddFormVisible = false
              this.getList()
              this.$message({
                showClose: true,
                message: "添加成功",
                type: "success",
              })
            } else {
              this.$message({
                showClose: true,
                message: "添加失败",
                type: "error",
              })
            }
          })
        }
      })
    },
    handleDel(row) {
      let tip = row === "" ? "确认删除所选用户?" : "确认删除该用户吗?"
      this.$confirm(tip, "提示", {
        type: "warning",
        confirmButtonText: "确定",
        cancelButtonText: "取消",
      })
        .then(() => {
          const para = {
            delete_id: this.multipleSelection.length > 0 ? this.multipleSelection.join(",") : row.user_id,
          }
          deleteUser(para).then((resp) => {
            if (resp.data.code == 0) {
              this.getList()
              this.$message({
                showClose: true,
                message: "删除成功",
                type: "success",
              })
            } else {
              this.$message({
                showClose: true,
                message: "删除失败",
                type: "error",
              })
            }
          })
        })
        .catch(() => {})
    },
  },
}
</script>
<style lang='scss' scoped>
.editMember {
  // padding: 20px;
  .warpper {
    padding: 0 20px;
    .header {
      margin-bottom: 20px;
      .title {
        border-bottom: 2px solid #ddd;
        padding-bottom: 10px;
        margin-bottom: 10px;
        overflow: hidden;
      }
      .title span {
        line-height: 2;
      }
      .title .add {
        float: right;
      }
      .help {
        color: #4b45a1;
        cursor: pointer;
        font-size: 15px;
        margin-bottom: 20px;
      }
      .help:hover {
        text-decoration: underline #4b45a1;
      }
    }
  }
}
.modifyInput,
.addInput {
  .el-date-editor.el-input {
    width: 60%;
  }
  .el-input {
    width: 60%;
  }
}
</style>
