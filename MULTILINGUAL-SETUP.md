# DevContinuum 多语言支持设置指南 🌍

## 📋 概述

DevContinuum 现在支持多语言文档，让全球开发者都能轻松使用这个强大的开发流程优化工具。本指南将帮助您设置和使用多语言功能。

## 🌐 支持的语言

| 语言 | 代码 | 文件 | 维护状态 |
|------|------|------|----------|
| English | `en` | `README.md` | ✅ 完整 |
| 简体中文 | `zh-CN` | `README.zh-CN.md` | ✅ 完整 |
| 日本語 | `ja-JP` | `README.ja-JP.md` | ✅ 完整 |
| Español | `es-ES` | `README.es-ES.md` | ✅ 完整 |

## 🚀 快速开始

### 方法1: 手动切换语言

1. **查看可用的语言文件**
   ```bash
   ls README*
   # 输出:
   # README.md          (默认英文版)
   # README.zh-CN.md    (简体中文版)
   # README.ja-JP.md    (日本語版)
   # README.es-ES.md    (Español版)
   ```

2. **切换到目标语言**
   ```bash
   # 切换到简体中文
   cp README.zh-CN.md README.md
   
   # 切换到日本語
   cp README.ja-JP.md README.md
   
   # 切换到 Español
   cp README.es-ES.md README.md
   
   # 切换回 English
   cp README.md README.backup.md  # 先备份当前版本
   # 然后复制原始的英文版（如果存在）
   ```

### 方法2: 使用语言切换脚本

1. **确保已安装 Node.js**
   ```bash
   node --version
   # 需要 Node.js 12.0 或更高版本
   ```

2. **使用语言切换器**
   ```bash
   # 列出所有可用语言
   node scripts/language-switcher.js list
   
   # 查看当前语言
   node scripts/language-switcher.js current
   
   # 切换到简体中文
   node scripts/language-switcher.js switch zh-CN
   
   # 切换到日本語
   node scripts/language-switcher.js switch ja-JP
   
   # 切换到 Español
   node scripts/language-switcher.js switch es-ES
   
   # 切换回 English
   node scripts/language-switcher.js switch en
   
   # 检查文件完整性
   node scripts/language-switcher.js check
   ```

## 🛠️ 安装语言切换器

### 全局安装（推荐）

1. **创建全局脚本**
   ```bash
   # 将语言切换器复制到全局位置
   sudo cp scripts/language-switcher.js /usr/local/bin/devcontinuum-lang
   sudo chmod +x /usr/local/bin/devcontinuum-lang
   
   # 现在可以在任何位置使用
   devcontinuum-lang list
   devcontinuum-lang switch zh-CN
   ```

2. **创建别名**
   ```bash
   # 在 ~/.bashrc 或 ~/.zshrc 中添加
   alias dclang='node /path/to/DevContinuum/scripts/language-switcher.js'
   
   # 然后可以使用
   dclang list
   dclang switch zh-CN
   ```

### 项目本地安装

```bash
# 在项目根目录创建软链接
ln -s scripts/language-switcher.js ./lang
chmod +x ./lang

# 使用
./lang list
./lang switch zh-CN
```

## 📖 语言切换器命令详解

### `list` - 列出所有语言
```bash
node scripts/language-switcher.js list
```
**输出示例**:
```
🌍 DevContinuum 多语言文档切换器
==================================================
可用的语言版本:

1. 🇺🇸 English
   Complete documentation in English
   文件: README.md

2. 🇨🇳 简体中文
   完整的中文文档
   文件: README.zh-CN.md

3. 🇯🇵 日本語
   完全な日本語ドキュメント
   文件: README.ja-JP.md

4. 🇪🇸 Español
   Documentación completa en español
   文件: README.es-ES.md
```

### `current` - 显示当前语言
```bash
node scripts/language-switcher.js current
```
**输出示例**:
```
🌍 DevContinuum 多语言文档切换器
==================================================
当前 README.md 显示语言: 简体中文 🇨🇳
```

### `switch` - 切换语言
```bash
# 切换到简体中文
node scripts/language-switcher.js switch zh-CN

# 切换到日本語
node scripts/language-switcher.js switch ja-JP
```
**输出示例**:
```
🌍 DevContinuum 多语言文档切换器
==================================================
✅ 所有语言文件都存在
✅ 已成功切换到 🇨🇳 简体中文
📄 源文件: README.zh-CN.md
```

### `check` - 检查文件完整性
```bash
node scripts/language-switcher.js check
```
**输出示例**:
```
🌍 DevContinuum 多语言文档切换器
==================================================
✅ 所有语言文件都存在
```

## 🔧 高级用法

### 批量操作

```bash
# 创建所有语言的备份
for lang in en zh-CN ja-JP es-ES; do
  file="README${lang != 'en' ? '.' + lang : ''}.md"
  if [ -f "$file" ]; then
    cp "$file" "${file}.backup"
    echo "已备份: $file"
  fi
done
```

### 自动化脚本

创建 `switch-lang.sh`:
```bash
#!/bin/bash

# 自动检测系统语言并切换
system_lang=$(echo $LANG | cut -d'_' -f1)

case $system_lang in
  "zh")
    echo "检测到中文系统，切换到简体中文..."
    node scripts/language-switcher.js switch zh-CN
    ;;
  "ja")
    echo "检测到日文系统，切换到日本語..."
    node scripts/language-switcher.js switch ja-JP
    ;;
  "es")
    echo "检测到西班牙文系统，切换到 Español..."
    node scripts/language-switcher.js switch es-ES
    ;;
  *)
    echo "使用默认英文..."
    node scripts/language-switcher.js switch en
    ;;
esac
```

### Git Hook 集成

在 `.git/hooks/post-checkout` 中添加:
```bash
#!/bin/bash
# 切换后自动检测并提示语言切换
echo "🌍 检测到分支切换，是否需要切换文档语言？"
echo "运行: node scripts/language-switcher.js list"
```

## 🎯 最佳实践

### 1. 版本控制

```bash
# 忽略自动生成的 README.md
echo "README.md" >> .gitignore

# 但跟踪特定语言的 README
echo "!README.en.md" >> .gitignore
echo "!README.zh-CN.md" >> .gitignore
```

### 2. 团队协作

```bash
# 在项目文档中说明多语言支持
echo "# 多语言支持
本项目支持多语言文档，使用以下命令切换语言:

\`\`\`bash
node scripts/language-switcher.js switch [语言代码]
\`\`\`

可用语言: en, zh-CN, ja-JP, es-ES
" > docs/multilingual.md
```

### 3. CI/CD 集成

在 GitHub Actions 中添加语言检查:
```yaml
name: Language Check
on: [push, pull_request]
jobs:
  check-languages:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Check language files
        run: |
          node scripts/language-switcher.js check
          echo "✅ 所有语言文件检查通过"
```

## 🔍 故障排除

### 常见问题

#### 1. 文件不存在错误
```bash
❌ 目标文件不存在: README.zh-CN.md
```
**解决方案**:
```bash
# 检查文件是否存在于正确位置
ls -la README*

# 如果文件丢失，从备份恢复
cp README.zh-CN.md.backup README.zh-CN.md
```

#### 2. 权限错误
```bash
Error: EACCES: permission denied
```
**解决方案**:
```bash
# 确保脚本有执行权限
chmod +x scripts/language-switcher.js

# 确保有写入权限
chmod 644 README*.md
```

#### 3. Node.js 版本问题
```bash
SyntaxError: Unexpected token
```
**解决方案**:
```bash
# 检查 Node.js 版本
node --version

# 升级 Node.js 到 12.0 或更高版本
# 使用 nvm: nvm install 16 && nvm use 16
```

## 🌱 贡献新语言

### 添加新语言版本的步骤

1. **复制现有文档**
   ```bash
   cp README.md README.[新语言代码].md
   ```

2. **翻译文档内容**
   - 保持原有的 Markdown 格式
   - 保留代码块和命令不变
   - 翻译说明文字和注释

3. **更新语言配置**
   编辑 `scripts/language-switcher.js`，在 `languages` 对象中添加:
   ```javascript
   'new-lang': {
     name: 'New Language',
     file: 'README.new-lang.md',
     flag: '🇬🇧',
     description: 'Description in English'
   }
   ```

4. **测试新语言**
   ```bash
   node scripts/language-switcher.js list
   node scripts/language-switcher.js switch new-lang
   ```

5. **提交贡献**
   ```bash
   git add README.new-lang.md
   git commit -m "docs(i18n): add New Language translation"
   git push origin feature/new-language
   ```

## 📊 语言统计

```bash
# 统计各语言文档的字数
grep -v '^$' README*.md | wc -l

# 比较文档完整性
diff README.md README.zh-CN.md
```

## 🎪 示例项目结构

```
DevContinuum/
├── README.md                    # 当前活动语言
├── README.zh-CN.md             # 简体中文版本
├── README.ja-JP.md             # 日本語版本
├── README.es-ES.md             # Español版本
├── scripts/
│   └── language-switcher.js    # 语言切换器
├── docs/
│   └── multilingual.md         # 本指南
└── .gitignore                  # 忽略自动生成的 README.md
```

## 📞 获取帮助

如果遇到问题，请：

1. **检查常见问题** 上面的故障排除部分
2. **查看脚本帮助** `node scripts/language-switcher.js help`
3. **提交 Issue** 到 GitHub 仓库
4. **联系维护者** 通过项目联系方式

## 🎉 总结

DevContinuum 的多语言支持让全球开发者都能轻松使用这个强大的工具。通过简单的命令，您可以:

- ✅ 在 4 种语言之间快速切换
- ✅ 自动检测系统语言
- ✅ 集成到 CI/CD 流程
- ✅ 贡献新的语言版本

让 DevContinuum 成为您团队的多语言开发伙伴！ 🌍🚀

---

*最后更新: 2026-05-12*
*版本: v1.0*
*支持语言: 4 种*