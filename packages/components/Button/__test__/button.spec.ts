import { mount } from "@vue/test-utils";
import Button from "../src/index.vue";

describe("Button.vue", () => {
	it("button type ", () => {
		const buttonTypes = ["primary", "success", "info", "default"];

		const typeNone = mount(Button);
		expect(typeNone.classes()).toContain("nfe-button-default");

		buttonTypes.forEach((type) => {
			const wrapper = mount(Button, {
				props: {
					type,
				},
			});
			expect(wrapper.classes()).toContain(`nfe-button-${type}`);
		});
	});
});
