/*
 * @Author: your name
 * @Date: 2021-01-08 16:51:22
 * @LastEditTime: 2021-01-09 11:45:14
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \FossStore\src\utils\crypt.js
 */
import JSEncrypt from 'jsencrypt'

function encryption(data) {
  // 加密信息
  var encryptEn = new JSEncrypt()
  // let publicKeyEn =
  //   'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDBhU96rEIwrZH2tAA+YfpzJSZwONtHESXy4cuUI02X4IKw9k4wXFD33tYF0Lx9maysDqhNs0FUgsQ+cf3ebWrLU0tNFnIjI9C0pUFynAXYIDgzYtZ66J6yX3ulzjZMT2M+YLG99NhP4vf+0JbPnmXonXYyCnN5R682UL2OFj+IxwIDAQAB'
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
  // 获取加密信息
  var encrypt = new JSEncrypt()
  var publicKey =
    'MIICeAIBADANBgkqhkiG9w0BAQEFAASCAmIwggJeAgEAAoGBALXP1KHPIsTp2QBydt9F3Efub5VVcMOkY5NMG34/OrimNqBquBKVSTI4GhNjSe7ohc6VMB6ujqcZhD8Yv2JtPigNQgxb133if6FjA4UJRlTus0GmMknxQepxcb3bbjppJb62IST38WadpyyQcavcBqkFWXiP88TxvwNTfJ3Hvm/BAgMBAAECgYEAhJkH1d8Q15ZJancQ1TPJPTjbbok6zaT17naCUqfgtsyaaJKMnxj7okGiWuN+B1zUQd8ykh3y8lG8zpvI8QsFWceQR0Z9ytKP8PL7m8N+QDqyZUEB1N5xg7uz/NFyj+tIdM76ZCNjw4Ycj0dPciZ4iQOkLui5GH09dXyUlNyp2VUCQQD+tD5ft+jKwsWutUEBpNKyWhDrEz+C5dx3wTaX1BqsFWVg2KAAKdrN+eF7a1VuQ15pyVmFdxNoyzQSLJHpwaFvAkEAtrykwXbZ43Fy1aTMYySmyQZ9JeGzBnpsDVN7Pi9jUNl7VKJWsX+vc1xYoMvHNc4ifCulODdppodFo2QfooAJzwJAL6u4iN24+koeCabu9cnNjYgB5p2Bo5Q2AUvuVdhi7ZZLlSa2O5GZ3DdKlnjuUmbVguMmmC5DObfelRA2dxPAjQJBAJ/q3OA1657ApLdU/kzxQUiBdjoVl39e2XqcCSm1fNu/R9AcNXQmgtuZADLPwqlSmRlDdNaKn9nNXeMMdybVmD8CQQD8HcAqFKkXd4hwOF/XV+RqBk2/PmLxdvj1J2Wy/TYB6XGNEsy7vuCzgltHPO381/JS+JJ3fA7dosNBXXfGoio4'
  encrypt.setPrivateKey(publicKey) //私钥
  let userStr = window.atob(data) //加密字符串base64
  let strArr = userStr.split(':') //分段解码
  let BaseStr = '' //base64
  strArr.forEach(item => {
    BaseStr += encrypt.decrypt(item)
  })
  let userDetail = JSON.parse(window.atob(BaseStr)) //解析成js对象
  return userDetail
}

export {
  encryption,
  decrypt
}
