# traffic-source

> 记录会话级流量来源

## 安装

```bash
npm install @xxx/traffic-source
```

## 使用

```js
import trafficSource from "@xxx/traffic-source";
trafficSource();
```

## 记录规则

1. utm 相关字段

   - utm_source：如果用户访问网站带了 utm_source 参数，则记录保存参数值（注意如果为中文编码，转为中文）
   - utm_medium：如果用户访问网站带了 utm_medium 参数，则记录保存参数值（注意如果为中文编码，转为中文）
   - utm_campaign：如果用户访问网站带了 utm_campaign 参数，则记录保存参数值（注意如果为中文编码，转为中文）
   - utm_content：如果用户访问网站带了 utm_content 参数，则记录保存参数值（注意如果为中文编码，转为中文）
   - utm_term：如果用户访问网站带了 utm_term 参数，则记录保存参数值（注意如果为中文编码，转为中文）

2. traffic_source 字段，字段值为：

   - SEM：如果用户访问网站带了 utm 参数，且 utm_medium 为“cpc”或“feeds”
   - Other：如果用户访问网站带了 utm 参数，且 utm_medium 不是“cpc”或“feeds”
   - SEO：如果用户访问网站不带 utm 参数，且 HTTP referer 包含以下搜索引擎域名

3. referer 字段，字段值为：
   - 如果 HTTP referer 不为空，则记录保存
