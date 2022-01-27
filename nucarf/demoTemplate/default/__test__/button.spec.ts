import { mount } from '@vue/test-utils'
import <%= name %> from '../src/index.vue'


describe('<%= name %>.vue', () => {
    it('<%= firstLowercaseName %> type ', () => {
        const <%= firstLowercaseName %>Types = ['primary', 'success', 'info', 'default']

        const typeNoneEl = mount(<%= name %>).element.querySelector('button');
        expect(typeNoneEl?.classList).toContain('<%= humpName %>-default')

        <%= firstLowercaseName %>Types.forEach(type => {
            const el = mount(<%= name %>, {
                props: {
                    type
                }
            }).element.querySelector('button');

            expect(el?.classList).toContain(`<%= humpName %>-${type}`)
        })
    })
})
