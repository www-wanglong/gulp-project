# gulp 学习

### 环境配置
    node use 8.11.1
    npm 5.6.0
    npx 9.7.1
### 创建任务（task） 
#### 导出任务
 任务可以是public（公开）或（私有）类型的
 * 公开任务 从gulpfile中被导出（export）,可以通过 ``gulp``命令直接调用
 * 私有任务 被设计为在内部使用，通常作为 `series()` 或 `parallel()`组合的组成部分
#### 组合任务
 * `series()` 任务按顺序执行
 * `parallel()` 最大并发来运行项目  

 `series()`和`parallel()`可以被嵌套到任意深度
### 异步执行
#### 任务（task）完成通知
#### gulp不再支持同步任务
#### 使用asycnc/await
### 处理文件
