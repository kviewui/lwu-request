---
outline: deep
---

# Git提交内容协议

> 这是根据[Angular的提交约定](https://github.com/conventional-changelog/conventional-changelog/tree/master/packages/conventional-changelog-angular)改编的。

## 内容匹配规则

内容必须由以下正则表达式匹配：

```js
/^(revert: )?(feat|fix|docs|dx|style|refactor|perf|test|workflow|build|ci|chore|types|wip)(\(.+\))?: .{1,50}/
```

## 示例

新增上传API

```bash
feat(api): 新增上传API
```

修复上传API，并带有`github issues`具体的链接

```bash
fix(api): 修复上传API一些问题。[详情](https://github.com/kviewui/lwu-request/issues/28)
```

### 提交类型

如果前缀是“feat”、“fix”或“perf”，它将出现在更新日志中。 然而其他任何 [BREAKING CHANGE](#footer 的变更, 都始终出现在变更日志中。

其他前缀由您决定。对于非变更日志相关的任务，建议使用“docs”、“chore”、“style”、“refract”和“test”前缀。

### 更改范围

提交范围可以是指定提交更改位置的任何内容。 例如 `api`, `config`, `guide`等等

### 更改描述

提交描述包含对变更的简洁描述：

- 使用祈使句，现在时：“change”不是“changed”也不是“changes”
- 不要把首字母大写
- 不要用"."结尾

### 更改内容

更改内容应该包括修改的原因，并将其与之前的内容进行对比。

### 页脚

页脚应包含有关 **Breaking Changes** 的任何信息， 也是引用GitHub问题，此提交 **Closes**.

**Breaking Changes** 应以单词 `BREAKING CHANGE:` 开头， 并加一个空格或两行换行符。 提交内容的其余部分将用于此操作。