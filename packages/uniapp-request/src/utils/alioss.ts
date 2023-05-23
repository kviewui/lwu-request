import type { UploadAliossOptions, GetOSSBySTSSuccessCallback } from '../types';
import { isImage } from '../utils';

class UploadAlioss {
    /**
     * 限制参数的生效时间，单位小时
     */
    private timeout: number;
    /**
     * 限制上传文件的大小，单位为MB
     */
    private maxSize: number;
    /**
     * 阿里云OSS临时授权token
     */
    private securityToken: string;
    /**
     * 阿里云OSS临时授权access_key_id
     */
    private accessKeyId: string;
    /**
     * 阿里云OSS临时授权access_key_secret
     */
    private accessKeySecret: string;
    /**
     * 上传的阿里云OSS地址
     * + 小程序后台需要同步添加上传合法域名
     */
    private uploadImageUrl: string;
    /**
     * 文件上传存储目录
     */
    private uploadDir: string;
    private formData: object;
    private getOSSBySTS: () => Promise<GetOSSBySTSSuccessCallback>;
    private getPolicyBase64: () => Promise<string>;
    private getSign: (policy: string) => Promise<string>;

    /**
     * 构造函数
     * @param options 上传配置项
     */
    constructor(options?: UploadAliossOptions) {
        this.timeout = options?.timeout || 1;
        this.maxSize = options?.maxSize || 5 * 1024 * 1024;
        this.securityToken = '';
        this.accessKeyId = '';
        this.accessKeySecret = '';
        this.uploadDir = options?.uploadDir || '';
        this.uploadImageUrl = options?.uploadImageUrl || '';
        this.formData = options?.formData || {};
        this.getOSSBySTS = () => options?.getOSSBySTS() as Promise<GetOSSBySTSSuccessCallback>;
        this.getPolicyBase64 = () => options?.getPolicyBase64() as Promise<string>;
        this.getSign = (policy: string) => {
            return options?.getSignature(policy) as Promise<string>;
        }
    }

    /**
     * 接口获取OSS临时授权
     */
    async getOSSBySTSInfo(): Promise<void> {
        const { access_key_id, access_key_secret, security_token } = await this.getOSSBySTS();

        this.accessKeyId = access_key_id;
        this.accessKeySecret = access_key_secret;
        this.securityToken = security_token;
    }

    /**
     * 获取上传参数
     */
    async getUploadParams() {
        const policy: string = await this.getPolicyBase64();
        const signature = await this.getSign(policy);

        return {
            // OSSAccessKeySecret: this.accessKeySecret,
            OSSAccessKeyId: this.accessKeyId,
            policy: policy,
            signature: signature,
            'x-oss-security-token': this.securityToken
        };
    }

    uploadFile(filePath: string, dir?: string): Promise<{
        code: number;
        data?: {
            uploadTask: any;
            url: string;
            path: string;
        };
        msg: string;
    }> {
        return new Promise(async (resolve, reject) => {
            if (!filePath) {
                reject({
                    code: 1,
                    msg: '文件路径不能为空'
                });
                return;
            }

            const dirPath = dir || this.uploadDir;
            if (!dirPath) {
                reject({
                    code: 1,
                    msg: '上传目录不能为空'
                });
            }

            const suffix = isImage(filePath) ? filePath.split('.').pop() : 'png';

            // 设置文件存放的地址以及为文件命名 随机数防止文件重名被覆盖
            const fileName = `${Date.now()}_${Math.floor(Math.random() * 1000000)}.${suffix}`;
            const fileUrl = `${this.uploadImageUrl}/${dirPath}/${fileName}`;
            const formData = {
                'key': `${dirPath}/${fileName}`,
                'success_action_status': 200,
                ...await this.getUploadParams(),
                ...this.formData
            };

            const getUploadTask = async () => {
                return uni.uploadFile({
                    url: this.uploadImageUrl,
                    filePath: filePath,
                    name: 'file',
                    formData: {
                        ...formData
                    },
                    fail: (res: any) => {
                        if (res.statusCode !== 200) {
                            reject({
                                code: 1,
                                msg: '上传失败，请稍后再试',
                                data: res.data
                            });
                            return;
                        }
                    }
                })
            };

            resolve({
                code: 0,
                msg: 'success',
                data: {
                    uploadTask: await getUploadTask(),
                    url: fileUrl,
                    path: `/${dirPath}/${fileName}`
                }
            });
        });
    }
};

export default UploadAlioss;