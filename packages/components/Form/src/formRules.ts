import { PartialFormSchema } from "./types";

export default function getFormRules(formItems: PartialFormSchema[]) {
	let result: Recordable = {};

	formItems.forEach((item) => {
		let requireRules = {
			required: true,
			message: item.placeholder || "",
		};

		if (item.rules) {
			result[item.prop!] = item.rules;
		}

		if (item.required && item.rules) {
			result[item.prop!].push(requireRules);
		} else if (item.required) {
			result[item.prop!] = [requireRules];
		}
	});

	return result;
}
