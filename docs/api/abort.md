---
outline: deep
---

# ABORT <Badge type="tip" text="已发布" />
中断请求方法

## 使用示例
### 中断当前请求
```ts
// 中断当前请求
request.abort();
```

### 中断指定请求
```ts
// 中断指定task_id请求
request.abort('user-info-1-1679735369814');
```