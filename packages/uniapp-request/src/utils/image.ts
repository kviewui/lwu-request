/**
 * @zh 校验链接是否为图片格式
 * @param {string} url 文件地址
 * @return {boolean}
 */
export const isImage = (url: string): boolean => {
	const imageReg = /\.(png|jpeg|jpg|webp|gif)$/i;
	
	return imageReg.test(url);
}