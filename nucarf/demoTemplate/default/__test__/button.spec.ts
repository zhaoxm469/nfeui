import { mount } from '@vue/test-utils'
import <%= name %> from '../src/index.vue'


describe('<%= name %>.vue', () => {
    it('<%= firstLowercaseName %> type ', () => {
        const <%= firstLowercaseName %>Types = ['primary', 'success', 'info', 'default']

        const typeNone = mount(<%= name %>)
        expect(typeNone.classes()).toContain('<%= humpName %>-default')

        <%= firstLowercaseName %>Types.forEach(type => {
            const wrapper = mount(<%= name %>, {
                props: {
                    type
                }
            })
            expect(wrapper.classes()).toContain(`<%= humpName %>-${type}`)
        })
    })
})
