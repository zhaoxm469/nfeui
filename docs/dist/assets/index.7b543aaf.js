var H=Object.defineProperty,N=Object.defineProperties;var x=Object.getOwnPropertyDescriptors;var P=Object.getOwnPropertySymbols;var oo=Object.prototype.hasOwnProperty,eo=Object.prototype.propertyIsEnumerable;var j=(o,t,e)=>t in o?H(o,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):o[t]=e,f=(o,t)=>{for(var e in t||(t={}))oo.call(t,e)&&j(o,e,t[e]);if(P)for(var e of P(t))eo.call(t,e)&&j(o,e,t[e]);return o},R=(o,t)=>N(o,x(t));import{d as w,e as E,E as A,t as M,o as m,c as B,k as O,v as D,b as to,j as no,q as ro,O as lo,p as i,F,f as d,P as so,Q as k,R as $,S as I,T as uo,U as ao,V as co,W as po,X as fo,Y as io,Z as mo,s as T,h as bo,_ as yo,$ as ho,a0 as ko,x as go,r as _o,y as Eo,w as h,a1 as vo,G as Co,g,A as v,B as C}from"./vendor.02671a40.js";import{_ as L}from"./plugin-vue_export-helper.21dcd24c.js";const V=(o,t)=>{if(o.install=e=>{for(const n of[o,...Object.values(t!=null?t:{})])e.component(n.name,n)},t)for(const[e,n]of Object.entries(t))o[e]=n;return o},q=Object.assign,z=o=>({type:String,default:o}),Ro=["click","loadingChange"],wo=q({},{type:z("default"),loading:Boolean});const Bo=w({name:"nfeButton",props:wo,emits:Ro,setup(o,{emit:t}){const e=E(()=>`nfe-button-${o.type}`),n=p=>{o.loading||t("click",p)},u=E(()=>{if(o.loading)return"cursor-not-allowed"});return A(()=>o.loading,()=>{t("loadingChange",o.loading)}),R(f({buttonLoading:u,handleClick:n},M(o)),{buttonType:e})}}),Fo={class:"nfe-button-loading"};function So(o,t,e,n,u,p){return m(),B("button",{class:ro(["nfe-button",[o.buttonType,o.buttonLoading]]),onClick:t[0]||(t[0]=lo(r=>o.handleClick(r),["stop"]))},[O(to("div",Fo,"loading",512),[[D,o.loading]]),no(o.$slots,"default",{},void 0,!0)],2)}var Po=L(Bo,[["render",So],["__scopeId","data-v-fd3103ea"]]),ne=V(Po);const jo=["register","reset","submit","cancel","reset"],Ao=q({},{type:z("default"),showSubmitButton:Boolean,showResetButton:Boolean,showCancelButton:Boolean});var _;(function(o){o.top="top",o.bottom="bottom",o.componentBottom="componentBottom",o.componentTop="componentTop",o.labelLeft="labelLeft",o.labelRight="labelRight",o.append="append",o.before="before"})(_||(_={}));const Mo=(o={},t)=>{const e={Select(){o.default=()=>{var n;return(n=t.options)==null?void 0:n.map(u=>{if(t.fieldObj)for(let p in t.fieldObj)u[p]&&(u[t.fieldObj[p]]=u[p]);return i(d("el-option"),{key:u.key,label:u.label,value:u.value},null)})}}};return e[t.component]&&e[t.component](),o},W=(o,t)=>{if(!o)return{};o=k(o);for(let e in o){const n=o[e];if(n&&typeof n!="function"){if(!t[n]){console.error(`\u8BF7\u68C0\u67E5\u60A8\u662F\u5426\u5728\u6A21\u677F\u4E2D\u5B9A\u4E49${n}\u63D2\u69FD\u4E86`);break}o[e]=()=>t[n]()}}return o},Oo=(o,t)=>Mo(W(o.componentSlot,t),o),Do=(o,t)=>W(o.customSlot,t),$o=(o,t,e)=>{const n=(r,{slots:c})=>Object.keys(_).map(s=>{var l;return(l=c[_[s]])==null?void 0:l.call(c,e)}),u=Do(o,t);let p={};return Object.keys(_).forEach(r=>{let c=_[r];p[c]=()=>{const s={[c]:u[c]};return u[c]?i(n,null,s):""}}),p},Io=(o,t,e)=>({label:()=>{const n="margin-left:4px;margin-top:4px;cursor: pointer;position: relative;top:2px;",u=()=>o.tip?i(d("el-tooltip"),{content:o.tip,placement:"top"},{default:()=>[i(d("el-icon"),{size:16,style:n},{default:()=>[i(so,null,null)]})]}):"";return i(F,null,[t(),i("span",null,[o.label]),u(),e()])}}),To={ElFormItem:$,ElInput:I,ElAutocomplete:uo,ElCol:ao,ElTooltip:co,ElIcon:po,ElInputNumber:fo,ElSelect:io,ElOption:mo},J={Autocomplete(o){const t=o.api;o.fetchSuggestions=async(e,n)=>{const u=await t(e);if(o.field){const p=o.fieldObj;u.forEach(r=>{for(let c in r)p[c]&&(r[p[c]]=r[c])})}n(u)}}},Lo=o=>{const t="api,styleProps,field,colProps,componentSlot".split(","),e=f({},o);return Object.keys(o).forEach(n=>{t.includes(n)&&delete e[n]}),e};var Vo=w({components:To,props:{schema:{type:Object,default:()=>{}},slots:{type:Object,default:()=>{}},colProps:{type:Object,default:()=>{}},formModel:{type:Object,default:()=>{}}},setup(o,{emit:t}){var S;let{schema:e,slots:n,formModel:u}=o;e.component&&J[e.component]&&J[e.component](e);const p=()=>{const Y=d("El"+e.component);return bo(Y,R(f({modelValue:e.value,"onUpdate:modelValue":Z=>e.value=Z},Lo(e)),{style:e.styleProps}),f({},Oo(e,n)))},{componentBottom:r,top:c,bottom:s,labelLeft:l,labelRight:a,append:y,before:U,componentTop:G}=$o(e,n,u),K=((S=e.colProps)==null?void 0:S.row)?"display:flex":"",Q=f(f({},o.colProps),e.colProps),X=E(()=>e.ifShow?e.ifShow(u):!0);return()=>i(F,null,[U(),O(i(d("el-col"),T(Q,{style:K}),{default:()=>[c(),i(d("el-form-item"),{labelWidth:e.labelWidth,prop:e.prop},f({default:()=>[G(),p(),r()]},Io(e,l,a))),s()]}),[[D,X.value]]),y()])}});const qo="https://cdn.nucarf.cn/common/v1.0/js/mock-min.js";let b=null;function zo(){var t;(t=Wo())==null||t.then(()=>{b=window.Mock,Uo()});const o={getTyperData(e){return b.mock(e)},getRulesData(e){return b.mock(e)}};return Object.keys(o).forEach(e=>{const n=o[e];o[e]=function(...u){if(!b.mock)throw"\u6CA1\u6709\u52A0\u8F7D\u6210\u529Fcdn\u7684mockjs \u5C31\u5F00\u59CB\u8C03\u7528\u65B9\u6CD5\uFF01";return n.apply(null,u)}}),f({},o)}function Wo(){if(b)return;const o=document.createElement("script");return o.src=qo,document.body.appendChild(o),new Promise((t,e)=>{o.onload=()=>{t("\u52A0\u8F7D\u5B8C\u6210")},o.onerror=n=>{e(n)}})}const Jo={constellation:function(){let o=["\u767D\u7F8A\u5EA7","\u91D1\u725B\u5EA7","\u53CC\u5B50\u5EA7","\u5DE8\u87F9\u5EA7","\u72EE\u5B50\u5EA7","\u5904\u5973\u5EA7","\u5929\u79E4\u5EA7","\u5929\u874E\u5EA7","\u5C04\u624B\u5EA7","\u6469\u7FAF\u5EA7","\u6C34\u74F6\u5EA7","\u53CC\u9C7C\u5EA7"];return b.Random.pick(o)},mobile:function(){var o=["132","135","189"];return b.Random.pick(o)+b.mock(/\d{8}/)}};function Uo(){b.Random.extend(f({},Jo))}function Go(o){let t={};return o.forEach(e=>{let n={required:!0,message:e.placeholder||""};e.rules&&(t[e.prop]=e.rules),e.required&&e.rules?t[e.prop].push(n):e.required&&(t[e.prop]=[n])}),t}const Ko=w({name:"nfeForm",props:Ao,emits:jo,components:{FormItems:Vo,ElForm:yo,ElFormItem:$,ElRow:ho,ElInput:I,ElButton:ko},setup(o,{emit:t,slots:e}){const n=go(),{getRulesData:u,getTyperData:p}=zo(),r=_o({formPropsRef:{},formModel:{},formItemSchema:E(()=>r.formPropsRef.formItems),showFootBtn:E(()=>{const{showCancelButton:s,showMockButton:l,showResetButton:a,showSubmitButton:y}=r.formPropsRef;return s||l||a||y}),isSubmitLoading:!1,formRules:{}});A(()=>r.formItemSchema,s=>{var a;console.count("formItemSchema watch"),(a=k(s))==null||a.forEach(y=>{r.formModel[y.prop]!=y.value&&(r.formModel[y.prop]=y.value)});let l=Go(k(r.formItemSchema));vo(l,k(r.formRules))||(r.formRules=l)},{deep:!0});const c={async setProps(s){Object.assign(r.formPropsRef,s)},async onSubmit(){var l;const s=(a=!0)=>{r.isSubmitLoading=a};(l=n.value)==null||l.validate(a=>{if(a)t("submit",{formData:k(r.formModel),loading:s});else return console.log("error submit!"),!1})},getFormData(){return f({},k(r.formModel))},async onCancel(){t("cancel")},async onResetFields(){var s,l;(s=r.formItemSchema)==null||s.forEach(a=>{a.value=a.defaultValue}),(l=n.value)==null||l.resetFields(),t("reset")},async onMock(){var s;(s=r.formItemSchema)==null||s.forEach(l=>{if(l.mock&&(l.mock.type||l.mock.rules)){const a=l.mock.type?p(l.mock.type):u(l.mock.rules);l.value=a}})},async setValue(s){var l;(l=r.formItemSchema)==null||l.forEach(a=>{s[a.prop]&&(a.value=s[a.prop])})}};return Eo(()=>{t("register",c)}),f(f({slots:e,ruleFormRef:n},M(r)),c)}}),Qo={class:"nfe-form"},Xo=C("\u786E\u5B9A"),Yo=C("\u91CD\u7F6E"),Zo=C("\u6A21\u62DF\u6570\u636E"),Ho=C("\u53D6\u6D88");function No(o,t,e,n,u,p){const r=d("FormItems"),c=d("el-row"),s=d("el-button"),l=d("el-form");return m(),B("div",Qo,[i(l,T({ref:"ruleFormRef"},o.formPropsRef,{model:o.formModel,rules:o.formRules}),{default:h(()=>[i(c,null,{default:h(()=>[(m(!0),B(F,null,Co(o.formItemSchema,a=>(m(),g(r,{key:a.prop,schema:a,slots:o.$slots,colProps:o.formPropsRef.colProps,formModel:o.formModel},null,8,["schema","slots","colProps","formModel"]))),128))]),_:1}),o.showFootBtn?(m(),g(c,{key:0,span:24,align:"middle",justify:"center"},{default:h(()=>[o.formPropsRef.showSubmitButton?(m(),g(s,{key:0,type:"primary",loading:o.isSubmitLoading,onClick:o.onSubmit},{default:h(()=>[Xo]),_:1},8,["loading","onClick"])):v("",!0),o.formPropsRef.showResetButton?(m(),g(s,{key:1,onClick:o.onResetFields},{default:h(()=>[Yo]),_:1},8,["onClick"])):v("",!0),o.formPropsRef.showMockButton?(m(),g(s,{key:2,type:"primary",onClick:o.onMock},{default:h(()=>[Zo]),_:1},8,["onClick"])):v("",!0),o.formPropsRef.showCancelButton?(m(),g(s,{key:3,onClick:o.onCancel},{default:h(()=>[Ho]),_:1},8,["onClick"])):v("",!0)]),_:1})):v("",!0)]),_:1},16,["model","rules"])])}var xo=L(Ko,[["render",No],["__scopeId","data-v-7a894a22"]]),re=V(xo);export{ne as a,re as n};