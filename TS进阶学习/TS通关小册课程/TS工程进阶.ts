
// -------------------------TS注释指令-------------------------

// @ts-nocheck   禁用整个文件的TS检查  (需要放在文件顶部)
const name: string = 599;
const age: number = 'linbudu';

// @ts-ignore   禁用对下一行代码的类型检查(建议不使用)
const name: string = 599;

// @ts-expect-error  忽视下一行代码的类型错误
const name: string = 599;
// @ts-expect-error  如果下一行代码类型正确, 则会报错该注释错误
const age: number = 599;



// -------------------------类型声明 declare-------------------------

// 通过类型声明创建一个npm模块的类型
// 如果一个古老的npm包没有类型声明文件(.d.ts) 我们可以自己进行创建, 该文件会被TS加载,用于类型解析
declare module "pkg" {
  const foo: () => boolean
  export default foo;
}

import foo from "pkg"
foo()


// @types/ 开头的这一类 npm 包都是由TS官方维护的, 用于给无类型定义的npm包添加类型支持
// 常见的如  @types/react @types/lodash 等等


// -------------------------补充Window类型定义-------------------------
// lib.dom.d.ts    定义了window的类型, 其定义了对浏览器文档对象模型的类型声明(TS内置类型)
// lib.es2021.d.ts 用于定义各种版本ES语法的类型
declare var window: Window & typeof globalThis;

// 如果声明一个同名接口Window 则会合并其属性到Window上
interface Window {
  customMethod: () => boolean;
}

const res = window.customMethod() // boolean


// -------------------------仅类型导入-------------------------
import { Foo } from "./foo";
import type { FooType } from "./foo";

// 额外 对导入语句的整理案例
import { useEffect } from 'react'; // React

import { ChildComp } from './child'; // UI组件
import { Button, Dialog } from 'antd';

import { store } from '@/store'      // 第三方库
import { useCookie } from '@/hooks/useCookie';
import { SOME_CONSTANTS } from '@/utils/constants';

import type { FC } from 'react';    // 类型导入
import type { Bar } from '@/typings/bar';
import type { Shared } from '@/typings/shared';

import styles from './index.module.scss'; // 样式导入


// -------------------TS工程化工具推荐--------------------
// ts-node   ts-node-dev       执行ts代码工具
// suppress-ts-error           自动为项目所有的类型报错添加@ts-ignore 注释，重构项目时很有帮助
// type-fest                   目前 star 最多下载量最高的工具类型库
// tsd                         对类型进行单元测试
// typescript-coverage-report  检查项目中类型的覆盖率
