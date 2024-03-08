const fs = require('fs');
const semver = require('semver');
const process = require('process');
const {exec} = require('child_process');

// 获取命令行参数（major, minor, 或 patch）
const releaseType = process.argv[2] || 'patch';

// 检查命令行参数是否有效
if (!['major', 'minor', 'patch'].includes(releaseType)) {
    console.error('错误：版本类型必须是 major、minor 或 patch');
    process.exit(1);
}

// 读取 package.json 文件
const packageJsonPath = './package.json';
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

// 递增版本号
const newVersion = semver.inc(packageJson.version, releaseType);
packageJson.version = newVersion;

// 保存新的 package.json
fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));

// 创建 Git 标签
exec(`git tag -a v${newVersion} -m "Release v${newVersion}"`, (error, stdout, stderr) => {
    if (error) {
        console.error(`创建 Git 标签出错: ${error}`);
        return;
    }
    console.log(`Git 标签 v${newVersion} 已创建`);

    // 生成针对本次版本的 changelog
    exec('conventional-changelog -p angular -i CHANGELOG.md -s -r 0', (changelogError, changelogStdout) => {
        if (changelogError) {
            console.error(`执行出错: ${changelogError}`);
            return;
        }
        console.log(`Changelog 已更新: ${changelogStdout}`);
    });
});
