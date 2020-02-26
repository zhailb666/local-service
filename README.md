## 本包功能说明 local-service
- 获取oss上传凭证，完成前端oss直传功能

## 安装
```
npm install locser -g
```

## 添加locser.config.js配置， 配置说明如下
```
module.exports = {
  port: 3602,
  oss: { // 填你自己阿里云OSS的相关账号
    OSSAccessKeyId: 'xxx',
    secret: 'xxx',
    host: 'xxx' 
  }
}
```

## 在locser.config.js目录下运行

```
locser start
```

## 接口上传凭证接口
http://localhost:3602/getUploadPolicy

## QA
https://www.jianshu.com/p/beafd9ac9656