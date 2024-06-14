# xxx_npm

## 介绍

本仓库用于存储公司内部的 npm 包，方便开发和管理

## 开发前准备

打开[仓库指南]()，按照步骤设置 npm 源并登录

## 开发

1. 在 packages 下创建 npm 项目，name 以@xxx/ 开头
2. 项目下的 README 写好此 npm 包的功能和使用方法

## 发布

到需要发布的 npm 项目下执行 `npm publish`

## 使用

在已经设置好 npm 源的情况下直接安装依赖 `npm install @xxx/xxx`
