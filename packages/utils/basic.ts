export const extend = Object.assign;

export function isDef(v: any): boolean {
	return v !== undefined && v !== null;
}

export function isPromise(val: any): boolean {
	return (
		isDef(val) &&
		typeof val.then === "function" &&
		typeof val.catch === "function"
	);
}

export function isFunction(val: Function): boolean {
	return typeof val === "function";
}

/*
 * @param x {Object} 对象1
 * @param y {Object} 对象2
 * @return  {Boolean} true 为相等，false 为不等
 */
export const deepEqual = (x: any, y: any) => {
	// 指向同一内存时
	if (x === y) {
		return true;
	} else if (
		typeof x == "object" &&
		x != null &&
		typeof y == "object" &&
		y != null
	) {
		if (Object.keys(x).length !== Object.keys(y).length) {
			return false;
		}
		for (var prop in x) {
			if (y.hasOwnProperty(prop)) {
				if (!deepEqual(x[prop], y[prop])) return false;
			} else {
				return false;
			}
		}
		return true;
	} else {
		return false;
	}
};
