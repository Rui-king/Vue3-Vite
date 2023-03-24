import { defineComponent, reactive, withModifiers } from 'vue'
import style from './m1.module.less'; // 局部样式


// 注意：Vue 模板中 ref 变量是可以直接解构的，但是在 jsx/tsx 中不行，需要添加 .value
let data = reactive({
    html: '我是文本',
    className: 'className',
    isShowClass: true,
    color: 'red',
    if: true,
    listData: [
        { name: 'Tom', age: 18 },
        { name: 'Jim', age: 20 },
        { name: 'Lucy', age: 16 }
    ],
    href: 'https://cn.vuejs.org/',
    modelValue: '测试',
})



setTimeout(() => {
    data.html = '999999';
    data.listData = [
        { name: '张三', age: 18 }
    ]
    console.log('---------', data);
}, 1000);

const element = (name: any) => {
    if (name) {
        return <h1>Hello, {name}</h1>
    } else {
        return <h1>Hello, Stranger</h1>
    }
}

const click = (...m: any) => {
    console.log(m);
}




export default defineComponent({
    props: ['msg'],
    setup(props, { attrs, slots, emit, expose }) {
        console.log('setup', slots);
        return () => (
            <ul class={style.jsxBox}>
                <li>
                    <h4> 1，模板语法：</h4>
                    <div>{data.html}</div>
                </li>
                <li>
                    <h4>2，class 类名绑定 --- 有两种方式，使用 模板字符串 或者使用 数组 :</h4>
                    <div class={`class1 ${data.isShowClass ? 'class2' : ''}`}>使用模板字符串绑定</div>
                    <div class={[data.isShowClass && 'class2', data.className]}>使用数组绑定</div>
                </li>
                <li>
                    <h4>3，style 样式绑定 --- 需要使用双大括号：</h4>
                    <div style={{ fontSize: '20px', color: data.color }}>使用双大括号</div>
                </li>
                <li>
                    <h4>4，条件渲染。由于 jsx/tsx 本身具有 js 语法，所以不再需要使用 v-if 指令，使用 if/else 和三元表达式都可以实现,但是支持 v-show 指令:</h4>
                    <div>{data.if ? <div>yes</div> : <span>no</span>}</div>
                    <div>{element('if/else')}</div>
                    <div v-show={data.if}>v-show</div>
                </li>
                <li>
                    <h4>5，列表渲染。同样，由于 jsx 本身具有 js 语法，所以不再需要使用 v-for 指令，使用 JS 数组的 map 方法即可:</h4>
                    <div>
                        <div>
                            <div class={'box'}>
                                <span>姓名</span>
                                <span>年龄</span>
                            </div>
                            {
                                data.listData.map(item =>
                                    <div class={'box'}>
                                        <span>{item.name}</span>
                                        <span>{item.age}</span>
                                    </div>
                                )
                            }
                        </div>
                    </div>
                </li>
                <li>
                    <h4>6，标签属性绑定。也是使用大括号包裹，不能使用 v-bind 指令。而 vue 组件中通过<div vbind="properties"></div>  批量绑定标签属性，在 JSX 中需要使用 ... 解构的形式:</h4>
                    <div><a href={data.href} target='_blank'>属性绑定</a></div>
                </li>
                <li>
                    <h4>7，事件绑定。使用的也是 单大括号 { }，不过事件绑定不是以 @为前缀了，而是改成了 on，与原生相同。例如：click 事件是 onClick 或 onclick。如果要带参数，需要使用箭头函数进行包裹：</h4>
                    <div onClick={click}>click me</div>
                    <div onClick={(e) => click(e, 111)}>click me-带参数</div>
                </li>
                <li>
                    <h4>8，事件修饰符。需要使用 withModifiers 方法，接收两个参数，第一个参数是绑定的事件，第二个参数是需要使用的事件修饰符：</h4>
                    <div onClick={withModifiers(click, ['self'])}>click-带修饰符</div>
                </li>
                <li>
                    <h4>9，v-model 双向绑定。需要使用单大括号 { }。如果绑定属性则需要一个数组，第一个元素为绑定的值，第二个元素为绑定的属性：</h4>
                    <div><input v-model={data.modelValue} />   绑定值:{data.modelValue}</div>
                    {/* <div><input v-model={[data.modelValue, 'prop']} />   绑定值:{data.modelValue}</div>
                    <div><input v-model={[data.modelValue, 'prop', ['trim']]} />    绑定值(修饰符写法):{data.modelValue}</div> */}
                </li>
                <li>
                    <h4>10，slot 插槽。jsx/tsx 中无法使用 slot 标签，定义插槽方式一：通过 setup 函数的第一个参数 ctx 上下文对象的 slots 的属性，setup 函数默认接收两个参数：</h4>
                    <p>① props - 组件传入的参数对象。 <br />
                        ② ctx - 上下文对象，上下文对象暴露了其他一些在 setup 中可能会用到的值，包括： <br />
                        &emsp;&emsp;attrs - 透传的 Attributes（非响应式的对象，等价于 $attrs）。 <br />
                        &emsp;&emsp;slots - 插槽（非响应式的对象，等价于 $slots）。 <br />
                        &emsp;&emsp;emit - 触发事件的函数（等价于 $emit）。 <br />
                        &emsp;&emsp;expose - 暴露公共属性的函数。</p> <br />
                    <p>如果解构了 props 对象，解构出的变量将会丢失响应性，因此推荐通过 props.xxx 的形式来使用其中的 props。如果确实需要解构 props 对象，或者需要将某个 prop 传到一个外部函数中并保持响应性，可以使用 toRefs() 和 toRef() 这两个工具函数：</p> <br />
                    <div>{props.msg}</div>
                    <p>ctx 上下文对象是非响应式的，可以安全地解构：</p> <br />
                    <p>attrs 和 slots 都是响应式（有状态）的对象，它们总是会随着组件自身的更新而更新。这意味着你应当避免解构它们，并始终通过 attrs.x 或 slots.x 的形式使用其中的属性。此外，和 props 不同，attrs 和 slots 的属性都不是响应式的。如果想要基于 attrs 或 slots 的改变来执行副作用，那么应该在 onBeforeUpdate 生命周期钩子中编写相关逻辑。</p> <br />
                    <p>expose 函数用于显式地限制该组件暴露出的属性，当父组件通过模板引用访问该组件的实例时，将仅能访问 expose 函数暴露出的内容：</p> <br />
                    <p>通过 ctx 上下文对象的 slots 的属性获取插槽对象后，就可以定义插槽了。</p>
                    <div>{slots.default?.()}</div>
                    <div>{slots.test?.()}</div>
                    <div>{slots.test2?.() ?? '我是设置插槽但没有传值而显示的默认内容'}</div>
                    <div>{slots.test3?.({ test3Data: '插槽子传父' })}</div>
                </li>
                <li>
                    <h4>11，CSS Modules。引入局部样式，相当于 vue 组件中<code>&lt;style&gt;</code>标签的 Modules 属性：</h4>
                </li>
            </ul>
        );
    }
})