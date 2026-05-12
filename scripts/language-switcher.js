#!/usr/bin/env node

/**
 * DevContinuum 语言切换器
 * 帮助用户在不同的语言版本之间快速切换
 */

const fs = require('fs');
const path = require('path');

// 语言配置
const languages = {
  'en': {
    name: 'English',
    file: 'README.md',
    flag: '🇺🇸',
    description: 'Complete documentation in English'
  },
  'zh-CN': {
    name: '简体中文',
    file: 'README.zh-CN.md',
    flag: '🇨🇳',
    description: '完整的中文文档'
  },
  'ja-JP': {
    name: '日本語',
    file: 'README.ja-JP.md',
    flag: '🇯🇵',
    description: '完全な日本語ドキュメント'
  },
  'es-ES': {
    name: 'Español',
    file: 'README.es-ES.md',
    flag: '🇪🇸',
    description: 'Documentación completa en español'
  }
};

// 颜色配置
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  dim: '\x1b[2m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
  white: '\x1b[37m'
};

// 工具函数
function printColor(color, text) {
  console.log(color + text + colors.reset);
}

function printHeader() {
  printColor(colors.cyan, '🌍 DevContinuum 多语言文档切换器');
  printColor(colors.dim, '='.repeat(50));
}

function printLanguages() {
  printColor(colors.bright, '可用的语言版本:');
  console.log('');

  Object.entries(languages).forEach(([code, lang], index) => {
    printColor(colors.green, `${index + 1}. ${lang.flag} ${lang.name}`);
    printColor(colors.dim, `   ${lang.description}`);
    printColor(colors.blue, `   文件: ${lang.file}`);
    console.log('');
  });
}

function checkFiles() {
  const missingFiles = [];

  Object.values(languages).forEach(lang => {
    if (!fs.existsSync(lang.file)) {
      missingFiles.push(lang.file);
    }
  });

  if (missingFiles.length > 0) {
    printColor(colors.red, '❌ 缺少以下文件:');
    missingFiles.forEach(file => {
      printColor(colors.red, `  - ${file}`);
    });
    console.log('');
    return false;
  }

  printColor(colors.green, '✅ 所有语言文件都存在');
  console.log('');
  return true;
}

function showCurrentLanguage() {
  // 检查当前目录下的 README.md 是否是链接或副本
  if (fs.existsSync('README.md')) {
    const content = fs.readFileSync('README.md', 'utf8');
    const lines = content.split('\n');

    // 尝试从内容判断当前语言
    const hasChinese = content.includes('背景故事') || content.includes('开发流程');
    const hasJapanese = content.includes('背景ストーリー') || content.includes('開発プロセス');
    const hasSpanish = content.includes('Historia de Fondo') || content.includes('Proceso de Desarrollo');

    if (hasChinese) {
      printColor(colors.yellow, '当前 README.md 显示语言: 简体中文 🇨🇳');
    } else if (hasJapanese) {
      printColor(colors.yellow, '当前 README.md 显示语言: 日本語 🇯🇵');
    } else if (hasSpanish) {
      printColor(colors.yellow, '当前 README.md 显示语言: Español 🇪🇸');
    } else {
      printColor(colors.yellow, '当前 README.md 显示语言: English 🇺🇸');
    }
  } else {
    printColor(colors.red, '❌ 未找到 README.md 文件');
  }
  console.log('');
}

function switchLanguage(targetLang) {
  const lang = languages[targetLang];
  if (!lang) {
    printColor(colors.red, `❌ 不支持的语言: ${targetLang}`);
    return false;
  }

  if (!fs.existsSync(lang.file)) {
    printColor(colors.red, `❌ 目标文件不存在: ${lang.file}`);
    return false;
  }

  try {
    // 备份当前的 README.md（如果存在且不是链接）
    if (fs.existsSync('README.md') && !fs.lstatSync('README.md').isSymbolicLink()) {
      const backupName = `README.backup.${Date.now()}.md`;
      fs.copyFileSync('README.md', backupName);
      printColor(colors.dim, `📦 已备份当前 README.md 为 ${backupName}`);
    }

    // 复制目标语言文件到 README.md
    fs.copyFileSync(lang.file, 'README.md');

    printColor(colors.green, `✅ 已成功切换到 ${lang.flag} ${lang.name}`);
    printColor(colors.blue, `📄 源文件: ${lang.file}`);

    return true;
  } catch (error) {
    printColor(colors.red, `❌ 切换语言失败: ${error.message}`);
    return false;
  }
}

function showUsage() {
  printColor(colors.cyan, '📖 使用方法:');
  console.log('');
  printColor(colors.bright, '  node scripts/language-switcher.js [命令] [参数]');
  console.log('');
  printColor(colors.yellow, '命令:');
  printColor(colors.white, '  list     - 列出所有可用的语言');
  printColor(colors.white, '  current  - 显示当前语言');
  printColor(colors.white, '  switch   - 切换语言 (需要指定语言代码)');
  printColor(colors.white, '  check    - 检查文件完整性');
  printColor(colors.white, '  help     - 显示此帮助信息');
  console.log('');
  printColor(colors.yellow, '语言代码:');
  Object.entries(languages).forEach(([code, lang]) => {
    printColor(colors.white, `  ${code.padEnd(8)} - ${lang.flag} ${lang.name}`);
  });
  console.log('');
  printColor(colors.yellow, '示例:');
  printColor(colors.white, '  node scripts/language-switcher.js list');
  printColor(colors.white, '  node scripts/language-switcher.js current');
  printColor(colors.white, '  node scripts/language-switcher.js switch zh-CN');
  printColor(colors.white, '  node scripts/language-switcher.js switch en');
  console.log('');
}

function main() {
  const args = process.argv.slice(2);
  const command = args[0];
  const param = args[1];

  printHeader();

  switch (command) {
    case 'list':
      printLanguages();
      break;

    case 'current':
      showCurrentLanguage();
      break;

    case 'check':
      checkFiles();
      break;

    case 'switch':
      if (!param) {
        printColor(colors.red, '❌ 请指定要切换的语言代码');
        console.log('');
        showUsage();
        return;
      }

      if (checkFiles()) {
        switchLanguage(param);
      }
      break;

    case 'help':
    case undefined:
      showUsage();
      break;

    default:
      printColor(colors.red, `❌ 未知命令: ${command}`);
      console.log('');
      showUsage();
      break;
  }

  printColor(colors.dim, '='.repeat(50));
  printColor(colors.cyan, '💡 提示: 使用 "help" 命令查看更多选项');
}

// 运行主程序
if (require.main === module) {
  main();
}

module.exports = {
  languages,
  switchLanguage,
  checkFiles,
  showCurrentLanguage
};