# 基本代码规范——命名规范

## 目录命名
**【导航】**  
- [前端项目](###前端项目) 
  - [前后端分离](####前后端分离)  
  - [前后端不分离](####前后端不分离)  
- [后端项目](###后端项目)  
- [服务器](###服务器)  
- [cdn](###cdn)  

### 前端项目
【通用规范】  
1. 确保目录命名总是以字母开头而不是数字，且字母一律小写，以下划线连接且不带其他标点符号  
#### 前后端分离
>前后端分离的项目，前端需要根据环境进行不同的打包配置，以下内容主要对开发环境（development）和生产环境（production）进行规范说明。  

【开发环境】  
- 项目文件夹：**项目类型（必选）+ 平台名（可选）+ 功能（可选）+ 业务名（可选）+ 模块名（可选）**  
  项目类型包括：p=>公共、基础、库；a=>核心；b=>企业（主业务操作）c=>市场（主引流、信息展示）；  
  平台名：项目类型不为 `p` 时需要填写，主要包括：pc、m、app（android和ios集成）、android、ios...（未来ar等平台待扩充）； 
  功能：仅项目类型为 `p` 时需要填写；  
  业务名：项目类型不为 `p` 时为必填，根据业务需求，合理命名。  
  模块名：根据模块需求，合理命名。
  ```text
  1. p_utils    // 公共、基础方法
  2. p_m_ui       // 移动端通用组件库

  3. c_pc_blog  // pc端博客（面向用户的博客内容展示）
  4. b_pc_blog  // pc端博客（博客后台管理）  
  5. a_pc_sims_mian  // sims pc端核心 
  6. a_pc_sims_personal  // sims pc端用户个人中心
  7. c_m_sims_main // sims m端宣传主体
  8. c_m_sims_activity // sims m端活动
  ```
- 资源文件夹：assets
- 视图文件夹：views
- 布局文件夹：layout
- 组件文件夹：components
- 路由文件夹：routes
- 脚本文件夹：utils
- 样式文件夹：styles
- 类型声明文件夹：types
- 枚举声明文件夹：enums
- 三方库配置文件夹：plugins
- 状态管理文件夹：store
- 测试单元文件夹：test
- 接口文件夹： apis 
- 自动化处理文件夹：shell
- 配置文件夹：setting 

【生产环境】 
- 项目文件夹：参考开发环境
- 运行脚本文件夹：vendor
- 资源文件夹：public

#### 前后端不分离
>前后端不分离的项目，需要具体情况具体分析。目前工作中主要是需要基于tp框架进行开发，未来也有可能会在nodejs等服务下开发。  
相似的模块都可以参考【前后端分离】中的规范。
### 后端项目
<!-- TODO 后端项目目录命名规范 -->
### 服务器
<!-- TODO 服务器资源目录命名规范 -->
### cdn
目录顺序：**public/类型/资源名/具体资源**
```text
public/utils/useApp/index.js
public/utils/useApp/index.min.js
public/utils/useFile/index.js
public/utils/useFile/index.css
public/font/youshe/youshe-normal.eot
public/icon/richtext/index.eot
```

## 文件命名
【通用规范】  
1. 确保文件命名总是以字母开头而不是数字，且字母一律小写，以下划线连接且不带其他标点符号  
2. 每一层目录的根文件名都为index
3. 文件划分层级 <= 3层时，无需通过文件夹进行分离，反之需要进行文件目录优化，文件名需要视情况增加父级缩写
```
<!-- 3层及以下 -->
  layout.vue
  layout_navbar.vue
  layout_navbar_default.vue

<!-- 3层以上 -->
优化前=>
  layout_navbar_search.vue
  layout_navbar_slot.vue
  layout_navbar_slot_left.vue
  layout_navbar_slot_mid.vue
  layout_navbar_slot_right.vue
  layout_navbar_slot_top.vue
  layout_navbar_slot_center.vue
  layout_navbar_slot_bottom.vue
  layout_navbar_search_default.vue
  layout_navbar_search_activity.vue
优化后=>
  - layout
  -- navbar
  --- layout_navbar_slot.vue
  --- ln_slot
  ---- lns_left.vue
  ---- lns_mid.vue
  ---- lns_right.vue
  ---- lns_top.vue
  ---- lns_center.vue
  ---- lns_bottom.vue
  --- layout_navbar_search.vue
  --- ln_search
  ---- lns_default.vue
  ---- lns_activity.vue
```
### 布局类文件
布局元素名参考：  
【按功能分类】  
1. navbar
2. footer
3. loading
4. toast
5. drawer
6. overlay 
7. routebar
8. menu
9. setting  
 
【按位置分类】 
1. top
2. center
3. bottom
4. left
5. right

### 脚本文件
1. 通用文件需加上前缀 `mod_`
2. 通过后缀区分不同环境运行的同类脚本文件，主要后缀包括：
   - env (开发环境)
   - prod（生产环境，此环境可省略后缀）
   - test（测试环境）
   - sandbox（沙箱环境）

### 各类文件命名细节
>各类文件命名的细节部分，参考规范中相关文件的具体章节。  

【导航】  
- [HTML](../html/index.md/##书写风格)

## 资源命名

### 图片
【命名顺序】：**（mod_）图片业务（可选）+ 图片功能类别（必选）+ 图片模块名称（可选）+ 图片索引（可选）+ 图片精度（可选）**  
【业务分类】  
- sims  
- blog  
- ...  

【功能分类】
- icon  图标
- logo  LOGO类
- btn  按钮
- bg  背景
- badge  标徽
- spr  普通元素
- dec  页面装饰元素
- ...

【模块分类】  
- infolist
- univdetail
- adviserlevel
- ...

【精度分类】  
- @1x 普清
- @2x | @3x Retina
- ...
