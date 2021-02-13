/*
 * @Author: your name
 * @Date: 2021-01-08 16:51:22
 * @LastEditTime: 2021-01-11 14:15:53
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \FossStore\src\utils\crypt.js
 */
import JSEncrypt from 'jsencrypt/bin/jsencrypt'

function encryption(data) {
  // 加密信息
  var encryptEn = new JSEncrypt()
  let publicKeyEn = `-----BEGIN PUBLIC KEY-----
  MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQC3Ino3TKtMe2UfYeKmnH1Xi9Gf
  nBiYCDH7awlnMMRAKyBP+4FXTYacw7jjXWWUon1xm/JcOXIgz5PuRWmEHdQqPEMv
  IFx7B2xjH1NvMm9tKbgv3DjC+uYBqqwsDWAaUHmFTx9qE5Cl0vaNSCHQhJO6jtbv
  r6trGCOQBYpTiTG6SQIDAQAB
  -----END PUBLIC KEY-----`
  encryptEn.setPublicKey(publicKeyEn)
  // let rsaBa64 = encryptEn.encrypt(data)
  let userDetailBs64 = JSON.stringify(data)
  var strBs64Arr = []
  var n = 117
  for (var i = 0, l = userDetailBs64.length; i < l / n; i++) {
    var a = userDetailBs64.slice(n * i, n * (i + 1))
    strBs64Arr.push(a)
  }
  let rsaBs64 = []
  strBs64Arr.forEach(item => {
    rsaBs64.push(encryptEn.encrypt(item))
  })
  rsaBs64 = rsaBs64.join(':')
  return rsaBs64
}

function decrypt(data) {
  // 解密
  var encrypt = new JSEncrypt()
  var privateKey = `-----BEGIN PRIVATE KEY-----
  MIICdwIBADANBgkqhkiG9w0BAQEFAASCAmEwggJdAgEAAoGBALo1sum0rJVNMa8g
  WbsxIU3mThkRpPC9/EgYuuzRLLjTBd1j7nkzhjUluz8XvTItKGNh5727jU6YWJ0D
  4TRCgxAFtyh2bj6JRX9axXD+wYCZMB1Fj2hiblptoqtRJP3SP9LT5BQ5UMxK/G5s
  ge1jropbmxUz6diGRBSO4Ed1X3u7AgMBAAECgYA25BN8jxT84geOX1P0OXRe2VAW
  Vbwwd2DCBAA+RR8Q0Kv+6jFnKwgZ7Kh43c+Y1fT87uR4aqwqCgC9MGKXnC+z7N0e
  Mo5nJJsCeeSB+nLRdctXCKYOFyVb54Sx6ylL+5UXMAjWHBbfuIQ/mu6RcOqBg+dJ
  Pk7TS5yQKYE0VXZZCQJBAPSfdHMrykMrsHYNHbsWWP0uCZa+cr7tIwaRKyuHDAt9
  VHnCogEKAk8Gxu3iJbPc3VmiwpMRLfJcb/b6AG0ybiUCQQDC3sMOomj/N9WWKscR
  Moshjm+X51uGR6cLrhxaodagVI0m6hgPQ6amvdNJlyzQRZ49jNBVqHoZXA7JoF3D
  HWxfAkEA5GeeS4svp9g7Q36rq+wJ2xwJR/87FJpGgfM548KMtI2pOqdIrL+zuCYT
  yDnIClDHPNKD6t23kPxObsSvcUYNIQJARTc2dUY+oRhF5xa+ql8XiA29mWj121Ys
  ATwQmiiNwVkG4eGYNiPDV8po9+SYaEmyEQ6pGSPEaqmGHxu08g7LZQJBANfqdKAP
  6aIOvI9vbfh+UG4BQBanxTSGlIJ6w8Diw3NY0xkJo9ZDEq28P9dPwLnRkhOigVBA
  o7se1nvumPW8JJg=
  -----END PRIVATE KEY-----`
  encrypt.setPrivateKey(privateKey) //私钥
  // 分段
  let strArr = data.split(':')
  let userInfo = JSON.parse(encrypt.decrypt(strArr[1]))
  return {
    access_token: strArr[0],
    userInfo: userInfo
  }
}

export {
  encryption,
  decrypt
}
