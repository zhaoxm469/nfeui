// 模糊所搜后台数组返回的数组 key,value 可能跟组件不兼容，这里通过这个函数 加上用户设置的 filed 转换为兼容的数据格式
export const getConversionResultKey = (field: string) => {
	if (!field) return "";
	let fields = field.split(",");
	let conversionResultKey: Recordable = {};
	fields.forEach((item) => {
		const [oldKey, newKey] = item.split("as");
		conversionResultKey[oldKey.trim()] = newKey.trim();
	});
	return conversionResultKey;
};
