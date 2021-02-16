<!--
* @description 
* @fileName index.vue
* @author YDKD
* @date 2021/02/04 16:09:35
!-->
<template>
  <div class="config-monitor">
    <div class="cm-content">
      <div class="cm-head">商品监控</div>
      <div class="cm-wrap">
        <el-form :model="form" ref="form" :rules="rules" label-width="80px" label-position="left">
          <el-form-item label="一级分类" prop="category">
            <el-select v-model="form.category" placeholder="例：数码" @change="level1Change">
              <el-option v-for="item in level1Options" :key="item.id" :label="item.label" :value="item.value"> </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="二级分类" prop="brand">
            <el-select v-model="form.brand" placeholder="例：手机" @change="level2Change">
              <el-option v-for="item in level2Options" :key="item.id" :label="item.label" :value="item.value"> </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="产品" prop="product">
            <el-select v-model="form.product" placeholder="例：iPhone X">
              <el-option v-for="item in level3Options" :key="item.id" :label="item.label" :value="item.value"> </el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">立即监控</el-button>
            <span class="resolve" @click="dialogVisible = true">未找到自己想选的分类? 点此解决!</span>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <el-dialog title="提交信息" :visible.sync="dialogVisible" width="50%" @close="dialogClose">
      <el-form :model="confrmForm" ref="configForm" :rules="confirmRules" label-width="100px" :inline="false" size="normal">
        <el-form-item label="筛选信息：" prop="userCheck">
          <el-input v-model="confrmForm.userCheck" placeholder="例：数码、手机、iPhone11" clearable></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirmResolve">确 认</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getSystemCategoryData } from "@/api/chartData"
import { saveConfigCategoryData, sendUserConfigureData } from "@/api/postApi"
export default {
  name: "config-monitor",
  data() {
    var validatorUserCheck = (rule, value, callback) => {
      if (!value) {
        callback("请填写您要筛选的信息")
      } else {
        let arr = value.split("、")
        if (arr.length != 3) {
          callback("填写的数据格式不对，请重新填写")
        }
      }
    }
    return {
      form: {
        category: "", // 分类
        brand: "", // 品牌
        product: "", // 产品
      },
      level1Options: [{ label: "数码", value: "数码" }], // 一级分类
      level2Options: [], // 二级分类
      level3Options: [], // 具体类型
      rules: {
        category: [{ required: true, message: "请填写您监控的一级分类，例：数码", trigger: "change" }],
        brand: [{ required: true, message: "请填写您监控二级分类，例：手机", trigger: "change" }],
        product: [{ required: true, message: "请填写您监控产品，例：iphone X", trigger: "change" }],
      },
      defaultData: "", // 系统中已有的数据
      user: "",
      dialogVisible: false,
      confrmForm: {
        userCheck: "",
      },
      confirmRules: {
        userCheck: [{ required: true, validator: validatorUserCheck, trigger: "blur" }],
      },
    }
  },
  created() {
    this.user = this.$store.state.user.userInfo
    if (this.user.choose_type) {
      let arr = this.user.choose_type.split(",")
      this.form.category = arr[0]
      this.form.brand = arr[1]
      this.form.product = arr[2]
    }
    this.getData()
  },
  methods: {
    getData() {
      this.level2Options = []
      this.level3Options = []
      let para = {
        category: this.form.category,
      }
      getSystemCategoryData(para).then(async (res) => {
        this.defaultData = await res.data
        res.data.forEach((item, index) => {
          let obj = {
            id: index,
            label: item.type,
            value: item.type,
          }
          this.level2Options.push(obj)
        })
        this.productData()
      })
    },
    // 分类切换
    level1Change() {
      this.form.brand = ""
      this.form.product = ""
      this.getData()
    },
    productData() {
      this.level3Options = []
      let filterArr = this.defaultData.filter((item) => {
        return item.type == this.form.brand
      })
      if (filterArr.length == 0) {
        return
      }
      let newArr = filterArr[0].includes ? filterArr[0].includes.split(",") : []
      newArr.forEach((item, index) => {
        let obj = {
          id: index,
          label: item,
          value: item,
        }
        this.level3Options.push(obj)
      })
    },
    // 二级分类切换
    level2Change() {
      this.form.product = ""
      this.productData()
    },
    // 提交筛选条件
    onSubmit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          // 第一步、更新本地的 store中的数据
          let choose_type = this.form.category + "," + this.form.brand + "," + this.form.product
          this.user.choose_type = choose_type
          this.$store.commit("user/USER_INFO", this.user)
          // 第二步，同步数据到数据库
          let data = {
            data: this.form,
            user_id: this.$store.state.user.userInfo.user_id,
          }
          saveConfigCategoryData(data).then((res) => {
            if (res.data.code == 200) {
              this.$message.success(res.data.msg)
            } else {
              this.$message.error(res.data.msg)
            }
          })
        }
      })
    },
    // 对话框关闭
    dialogClose() {
      this.$refs.configForm.resetFields()
    },
    // 提交用户自己选择的数据
    confirmResolve() {
      let para = {
        data: this.confrmForm.userCheck,
        user_id: this.user.user_id,
      }
      sendUserConfigureData(para).then((res) => {
        if (res.data == 200) {
          this.dialogVisible = false
          this.$message.success("已将您的信息发送至系统，待数据同步后会以邮件的形式告知您")
          this.$refs.configForm.resetFields()
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
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
    .cm-head {
      padding: 10px 0;
      border-bottom: 1px solid #ccc;
    }
    .cm-wrap {
      width: 40%;
      margin-top: 30px;
      ::v-deep .el-input__inner {
        width: 600px;
      }
    }
  }
}
.resolve {
  margin-left: 30px;
  color: $jump;
  cursor: pointer;
}
::v-deep .el-dialog__body .el-input {
  width: 75%;
}
</style>
