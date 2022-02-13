import { ColProps } from "element-plus";
import { PartialFormSchema } from "./types";
export const formItemProps = {
	schema: {
		type: Object as PropType<PartialFormSchema>,
		default: () => {},
	},
	slots: {
		type: Object,
		default: () => {},
	},
	colProps: {
		type: Object as PropType<Partial<ColProps>>,
		default: () => {},
	},
	formModel: {
		type: Object as PropType<Partial<Recordable>>,
		default: () => {},
	},
};
