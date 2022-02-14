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
