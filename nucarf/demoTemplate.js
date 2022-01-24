const prefix = 'nf';
const cmtName = name => prefix + name


// 转换为中线命名
const upperCaseTohump = (value)=>{
    let result = '';
    for (let i = 0; i < value.length ; i ++ ) {
        let s = value[i].toLocaleLowerCase();
        if (/[A-Z]/.test(value[i]) && i !== 0) {
            result += '-'+s.toLocaleLowerCase()
        }else{
            result+=s;
        }
    }
    return result;
}

// 首字母小写
const toFirstLowercase = value => value.replace(value[0], value[0].toLocaleLowerCase());


// 创建index.ts,最外部的导出模块TS文件
function createIndexTs ({name}) {
    return `
import { withInstall } from './../../utils/with-install';
import ${name} from './src/index.vue';
export default withInstall(${name});
    `
}


// 创建doc.md文件内容
function createDoc ({ name, desc, cName}) {
    return `---
map:
  # 映射到docs的路径
  path: /components/${name.toLocaleLowerCase()}
---

# ${name} ${cName}

${ desc }。

### 基本用法

<demo src="./demo/demo.vue"
  language="vue"
  title="基本用法"
  desc="点击切换。">
</demo>

### Props

| 参数     | 说明                   | 类型     | 可选值    | 默认值    |
| -------- | --------------------- | ------- | --------- | ------- |
| type     | 类型，可选值为          | String  | \`default \` |\`default \` |
| block    | 是否为块级元素          | Boolean | \`false\`   | \`true\`   |

### Events

| 参数     | 说明                   | 类型     | 可选值    | 默认值    |
| -------- | --------------------- | ------- | --------- | ------- |
| type     | 类型，可选值为          | String  | \`default \` |\`default \` |
| block    | 是否为块级元素          | Boolean | \`false\`   | \`true\`   |

    `

}


// 创建 index.vue文件内容
function createVue ({name}){
    const exportPropsName = toFirstLowercase(name);

    return `
    
<template>
    <div class="nf-${upperCaseTohump(name)}">
        <button class="button">
            {{ msg }}
            <slot></slot>
        </button>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { ${exportPropsName}Props } from '.';

export default defineComponent({
    name: '${cmtName(name)}',
    props: ${exportPropsName}Props,
    setup() {
        return {
            msg: '张三'
        };
    }
});
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>

    
    `
}

// 生成src下的index.ts文件
const createSrcIndexTs = ({name})=>{
    const exportPropsName = toFirstLowercase(name);
    
    return `
import { extend } from './../../../utils/basic';
import { makeStringProp } from './../../../utils/props';

type ${name}Size = 'large' | 'normal' | 'small' | 'mini';

export const ${exportPropsName}Props = extend({}, {
    text: String,
    icon: String,
    size: makeStringProp<${name}Size>('normal'),
});
    `
}

// 生成src下的scss文件
const createSrcIndexScss = ({name}) => {
    return `
.nf-${upperCaseTohump(name)}{
}
    `
}

// 生成demo.vue模板页面
const createDemo  = ({name})=>{
    return `
    
<template>
    <div>
        <p>
            <span style="padding: 0 16px 0 4px; font-size: 14px; color: #777"
                >点击次数:</span
            >
            <span>{{ count }}</span>
        </p>
        <${cmtName(name)} @click="onClick">按钮</${cmtName(name)}>
    </div>
</template>

<script lang="ts">
import { ${cmtName(name)} } from 'nfeui';
import { ref, defineComponent } from 'vue';

export default defineComponent({
    components: {
        ${cmtName(name)}
    },
    setup() {
        const count = ref(0);
        function onClick() {
            count.value++;
        }

        return {
            count,
            onClick
        };
    }
});
</script>


    `
}

// 生成测试页面
const createTest = (nameLc)=>{
    return `
    
    
    `
}

const demoTemplate = (options)=>{
    return {
        demo: createDemo(options),
        indexVue: createVue(options),
        doc: createDoc(options),
        indexTs: createIndexTs(options),
        srcIndexVue: createVue(options),
        srcIndexTs: createSrcIndexTs(options),
        srcIndexScss: createSrcIndexScss(options),
        test:createTest(options),
    }
}


module.exports = demoTemplate;
