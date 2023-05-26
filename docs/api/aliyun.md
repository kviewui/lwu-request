# ALIYUN

这里是直传阿里云OSS的方法介绍，分为 [`uploadAliyunOSS`](/api/aliyun#uploadaliyunoss) 异步上传方式和
[`uploadAliyunOSSSync`](/api/aliyun#uploadaliyunosssync)
同步上传方式。两个方法都需要获取后端或者前端返回的阿里OSS的
`STS临时授权凭证信息`。[使用STS临时访问凭证访问OSS](https://help.aliyun.com/document_detail/100624.html?spm=a2c4g.375246.0.0.29494f77gjhPg6)

## uploadAliyunOSS

直传阿里OSS，这是一个异步接口。

### 请求参数

| 参数名             | 类型                                                                   | 必填 | 说明                                                                                                                                                                                                                     |
| --------------- | -------------------------------------------------------------------- | -- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| filePath        | `String`                                                             | 是  | 要上传文件资源的路径                                                                                                                                                                                                             |
| uploadDir       | `String`                                                             | 是  | 文件上传至OSS的存储目录                                                                                                                                                                                                          |
| maxSize         | `Number`                                                             | 否  | 限制上传文件的大小，单位为MB，默认值为 `5`                                                                                                                                                                                               |
| timeout         | `Number`                                                             | 否  | 限制参数的生效时间，单位小时，默认值为 `1`                                                                                                                                                                                                |
| uploadImageUrl  | `String`                                                             | 是  | 上传的阿里云OSS地址，示例：`https://demo-static.oss-cn-hangzhou.aliyuncs.com`                                                                                                                                                      |
| formData        | `Object`                                                             | 否  | HTTP 请求中其他额外的 form data                                                                                                                                                                                                |
| getOSSBySTS     | `() => Promise<GetOSSBySTSSuccessCallback>` [GetOSSBySTSSuccessCallback](/ts/aliyun#getossbystssuccesscallback)  | 是  | 获取OSS临时授权访问凭证信息，[使用STS临时访问凭证访问OSS](https://help.aliyun.com/document_detail/100624.html?spm=a2c4g.375246.0.0.29494f77gjhPg6)                                                                                            |
| getPolicyBase64 | `string`                                                             | 是  | 获取签名的base64字符串，见下方说明                                                                                                                                                                                                   |
| getSignature    | `(policyBase64: string, accessKeySecret: string) => Promise<string>` | 是  | 获取OSS签名，参考[JavaScript客户端签名直传](https://help.aliyun.com/document_detail/31925.html?spm=a2c4g.31926.0.0.3a735458ATBOW8)、[服务端签名后直传](https://help.aliyun.com/document_detail/31926.html?spm=a2c4g.31925.0.0.74505d3fr63lMY) |

### 返回值
| 参数名 | 类型 | 说明
| --- | --- | ---
| code | `number` | 状态码，`0`为成功、`1`为失败
| msg | `string` | 状态描述
| data | `object` \| `undefined` | 返回内容，见下方说明

### Data 说明
`filePath`、`uploadDir` 和 `uploadImageUrl` 字段校验失败时为 `undefined`；图片上传失败时结果为 [uni.uploadFile](https://uniapp.dcloud.net.cn/api/request/network-file.html#uploadfile)的失败结果，图片上传成功时返回内容见[上传成功的Data 结构说明](/api/aliyun#上传成功的data-结构说明)

### 上传成功的Data 结构说明
| 参数名 | 类型 | 说明
| --- | --- | ---
| uploadTask | `UniApp.UploadTask` | 上传任务实例，见[uploadTask对象的方法列表](/api/upload#uploadtask-对象的方法列表)
| url | `string` | 上传成功后阿里云OSS的完整地址
| path | `string` | 上传成功后文件存储的路径，即去除阿里云OSS域名后的地址，示例：`/static/uploads/2023-05-25/1685006606290_241520.png`

## uploadAliyunOSSSync

直传阿里OSS，这是一个同步接口。

### 请求参数

同 [uploadAlioss 请求参数](/api/aliyun#请求参数)

### 返回值
同 [uploadAlioss 返回值](/api/aliyun#返回值)

## 示例
::: danger 提示
示例代码中演示了同步接口的调用，异步接口的调用请看下面的注释代码，演示数据仅供参考，非真实数据
:::
```ts
import { type GetOSSBySTSSuccessCallback, Http } from "lwu-request";
// 初始化请求库
const http = new Http({
  baseUrl: {
    pro: "",
    dev: "",
  },
});

// 获取policyBase64字符串
const getPolicyBase64 = () => {
  let date = new Date();
  // 设置过期时间
  date.setHours(date.getHours() + 1);
  let srcT = date.toISOString();
  const policyText = {
    expiration: srcT,
    conditions: [
      // 限制上传文件大小
      ["content-length-range", 0, 15 * 1024 * 1024],
    ],
  };

  return Buffer.from(JSON.stringify(policyText)).toString("base64");
};

// 获取签名
const getSignature = (
  policyBase64: string,
  accessKeySecret: string,
): Promise<string> => {
  return new Promise(async (resolve, reject) => {
    resolve(
      await uni.$api.apply.getSignature({
        policyBase64: policyBase64,
        accessKeySecret: accessKeySecret,
      }),
    );
  });
};

// 获取oss临时授权凭证信息
const getOSSBySTSInfo = (): Promise<GetOSSBySTSSuccessCallback> => {
  return new Promise(async (resolve, reject) => {
    const result: GetOSSBySTSSuccessCallback = await uni.$api.apply
      .getOSSBySTS();
    if (result.code !== 1) {
      uni.$tools.modal({
        title: "提示",
        content: "获取上传配置信息失败，请稍后再试",
        showCancel: false,
        confirmText: "确定",
      });
      return;
    }

    resolve(result.data as GetOSSBySTSSuccessCallback);
  });
};

uni.chooseImage({
  count: 9,
  sizeType: ["compressed"],
  success: async (res: UniApp.ChooseImageSuccessCallbackResult) => {
    // 同步接口调用示例
    const { code, data } = await http.uploadAliossSync({
      filePath: res.tempFilePaths[0].url || "",
      uploadDir: `static/uploads/apply/20230525/112`,
      uploadImageUrl: "https://demo-static.oss-cn-hangzhou.aliyuncs.com",
      getOSSBySTS: getOSSBySTSInfo,
      getPolicyBase64: getPolicyBase64,
      getSignature: getSignature,
    }) as {
      code: number;
      data: {
        uploadTask: UniApp.UploadTask;
        url: string;
        path: string;
      };
    };

    if (code !== 0) {
      console.log("图片上传失败");
      return;
    }

    // 上传进度监听
    data.uploadTask.onProgressUpdate((res: UniApp.OnProgressUpdateResult) => {
      console.log(res);
    });

    // 异步接口调用示例
    // http.uploadAlioss({
    //   filePath: res.tempFilePaths[0].url || "",
    //   uploadDir: `static/uploads/apply/20230525/112`,
    //   uploadImageUrl: "https://demo-static.oss-cn-hangzhou.aliyuncs.com",
    //   getOSSBySTS: getOSSBySTSInfo,
    //   getPolicyBase64: getPolicyBase64,
    //   getSignature: getSignature,
    // }).then((uploadRes: {
    //   code: number;
    //   data: {
    //     uploadTask: UniApp.UploadTask;
    //     url: string;
    //     path: string;
    //   };
    // }) => {
    //   if (code !== 0) {
    //     console.log("图片上传失败");
    //     return;
    //   }

    //   // 上传进度监听
    //   data.uploadTask.onProgressUpdate((res: UniApp.OnProgressUpdateResult) => {
    //     console.log(res);
    //   });
    // });
  },
});
```
