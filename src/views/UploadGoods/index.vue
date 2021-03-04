<template>
  <div>
    <div class="wrap">
      <div class="uploadWrap">
        <div class="el-upload-dragger">
          <div class="labelUplaod">
            <i class="el-icon-upload fileUpload"></i>
            <div class="el-upload__text">
              将文件拖到此处，或
              <em>点击上传</em>
            </div>
            <input type="file" ref="upload" class="upload" @change="beforeUpload" />
          </div>
        </div>
        <div class="tip_text">仅支持小于2GB的 zip包</div>
        <p class="uploadName">{{ uploadName }}</p>
        <el-button type="success" size="default" class="uploadBtn" @click="startUpload">开始上传</el-button>
      </div>
    </div>
    <div class="upload_info">
      <el-table :data="uploadInfoData" border stripe empty-text="暂无数据">
        <el-table-column label="上传文件名" prop="filename" align="center"></el-table-column>
        <el-table-column label="上传用户" prop="upload_user_name" align="center"></el-table-column>
        <el-table-column label="上传时间" align="center">
          <template slot-scope="scope">
            <span>{{ formatTime(scope.row.create_time) }}</span>
          </template>
        </el-table-column>
        <el-table-column label="上传状态" align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.upload_status == 5" class="el-icon-check lastsuccess"></span>
            <span v-else class="el-icon-close lasterror"></span>
          </template>
        </el-table-column>
        <el-table-column label="状态信息" prop="msg" align="center"></el-table-column>
        <el-table-column label="入库表" prop="upload_table" align="center"></el-table-column>
      </el-table>
    </div>

    <el-dialog title="提交信息" :visible.sync="dialogVisible" width="50%" @close="dialogClose">
      <span>
        <el-form :model="form" ref="form" :rules="rules" label-width="120px" size="normal">
          <el-form-item label="通知用户id" prop="notice_user_id">
            <el-input v-model="form.notice_user_id"></el-input>
          </el-form-item>
          <el-form-item label="一级分类" prop="category">
            <el-input v-model="form.category" placeholder="例：数码"></el-input>
          </el-form-item>
          <el-form-item label="二级分类" prop="brand">
            <el-input v-model="form.brand" placeholder="例：手机"></el-input>
          </el-form-item>
          <el-form-item label="产品" prop="product">
            <el-input v-model="form.product" placeholder="例：iphonex"></el-input>
          </el-form-item>
        </el-form>
      </span>
      <span slot="footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="uploadFile">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { uploadFile } from "@/api/postApi"
import { getTables, getUploadInfo } from "@/api/chartData"
import { decrypt } from "@/utils/crypt"
import { parseTime, rTime } from "@/utils/index"
export default {
  name: "upload-goods",
  data() {
    var validatorProduct = (rule, value, callback) => {
      if (!value) {
        callback("请填写监控产品，例：iphone X")
      } else {
        getTables(this.user.user_id).then((res) => {
          let tables = decrypt(res.data, false)
          if (tables.includes(value.toLowerCase())) {
            callback("当前产品已入库,请重新填写你要入库的产品信息")
          } else {
            callback()
          }
        })
      }
    }
    return {
      fileType: "",
      uploadName: "",
      file: "",
      dialogVisible: false,
      form: {
        notice_user_id: "",
        category: "", // 分类
        brand: "", // 品牌
        product: "", // 产品
      },
      rules: {
        notice_user_id: [{ required: true, message: "请输入通知用户的id", trigger: "blur" }],
        category: [{ required: true, message: "请填写监控的一级分类，例：数码", trigger: "blur" }],
        brand: [{ required: true, message: "请填写监控二级分类，例：手机", trigger: "blur" }],
        product: [{ required: true, validator: validatorProduct, trigger: "blur" }],
      },
      user: "",
      uploadInfoData: [],
    }
  },
  created() {
    this.user = this.$store.state.user.userInfo
    this.getUploadMessage()
  },
  methods: {
    formatTime(date) {
      return rTime(date)
    },
    getUploadMessage() {
      getUploadInfo().then((res) => {
        this.uploadInfoData = res.data
        console.log(res)
      })
    },
    startUpload() {
      if (!this.file) {
        this.$message.error("请先上传文件")
      } else {
        this.dialogVisible = true
      }
    },
    uploadFile() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          let data = new FormData()
          data.append("file", this.file)
          data.append("note_user_id", this.form.notice_user_id)
          data.append("category", this.form.category)
          data.append("brand", this.form.brand)
          data.append("product", this.form.product)
          data.append("upload_user_name", this.user.username)
          uploadFile(data).then((res) => {
            this.dialogVisible = false
            this.$message.info("文件信息正在上传入库中，请耐心等待~")
            this.file = ""
            this.uploadName = ""
            this.getUploadMessage()
          })
        }
      })
    },
    beforeUpload(file) {
      this.fileType = file.target.files[0].name.slice(file.target.files[0].name.lastIndexOf(".") + 1)
      const extension = this.fileType === "zip"
      if (!extension) {
        this.$message({
          message: "上传文件只能是zip包格式！",
          type: "error",
        })
        return
      } else if (file.target.files[0].size > 2 * 1024 * 1024 * 1024) {
        this.$message({
          message: "文件大小不得超过2GB！",
          type: "error",
        })
        this.$refs.upload.value = ""
        this.file = ""
        this.uploadName = ""
      } else {
        this.uploadName = file.target.files[0].name
        this.file = file.target.files[0]
      }
      this.$refs.upload.value = ""
    },
    dialogClose() {},
  },
}
</script>
<style lang='scss' scoped>
.wrap {
  display: flex;
  justify-content: center;
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
    font-size: 14px;
    color: #606266;
  }
  .uploadBtn {
    width: 100%;
    margin-top: 10px;
  }
}
.upload_info {
  padding: 20px;
  margin-top: 20px;
}
.lastsuccess {
  color: #67c23a;
  font-size: 18px;
  font-weight: 600;
}
.lasterror {
  color: red;
  font-size: 18px;
  font-weight: 600;
}
</style>
