<?php

/**
 * 转换Thulite格式的Markdown文件为VitePress格式
 * 用法: php thulite-to-vitepress.php <目录路径>
 */

if ($argc < 2) {
    echo "用法: php thulite-to-vitepress.php <目录路径>\n";
    exit(1);
}

$dirPath = $argv[1];

if (!is_dir($dirPath)) {
    echo "错误: '{$dirPath}' 不是一个有效的目录\n";
    exit(1);
}

echo "开始处理目录: {$dirPath}\n";

processDirectory($dirPath);

echo "处理完成\n";

/**
 * 递归处理目录中的所有.md文件
 */
function processDirectory($dir) {
    $files = new RecursiveIteratorIterator(
        new RecursiveDirectoryIterator(
            $dir,
            RecursiveDirectoryIterator::SKIP_DOTS
        )
    );

    $mdCount = 0;

    foreach ($files as $file) {
        if ($file->getExtension() === 'md') {
            $filePath = $file->getPathname();
            processMarkdownFile($filePath);
            $mdCount++;
        }
    }

    echo "共处理了 {$mdCount} 个 Markdown 文件\n";
}

/**
 * 处理单个Markdown文件
 */
function processMarkdownFile($filePath) {
    echo "处理文件: {$filePath}\n";
    
    $content = file_get_contents($filePath);
    
    // 1. 删除frontmatter
    $content = removeFrontmatter($content);
    
    // 2. 替换 {frame="none"} 为空字符串
    $content = str_replace(' {frame="none"}', '', $content);
    
    // 3. 替换 {frame="none" text-wrap="wrap"} 为空字符串
    $content = str_replace(' {frame="none" text-wrap="wrap"}', '', $content);
    
    // 3. 将 ```bash {title="xxx"} 转换为 ```bash [xxx]
    $content = preg_replace('/```(\w+)\s+\{title="([^"]+)"\}/', '```$1 [$2]', $content);
    
    // 4. 转换链接卡片
    $content = convertLinkCards($content);
    
    // 5. 转换 callout 短代码为 VitePress 容器
    $content = convertCallouts($content);
    
    // 保存修改后的文件
    file_put_contents($filePath, $content);
}

/**
 * 删除Markdown文件的frontmatter
 */
function removeFrontmatter($content) {
    // 查找文件开头的frontmatter (--- 之间的内容)
    if (preg_match('/^---\s*\n(.*?)\n---\s*\n/s', $content, $matches)) {
        // 删除整个frontmatter部分
        $content = preg_replace('/^---\s*\n(.*?)\n---\s*\n/s', '', $content);
    }
    
    return $content;
}

/**
 * 转换链接卡片
 */
function convertLinkCards($content) {
    // 匹配链接卡片标签及其属性
    $pattern = '/\{\{<\s*link-card\s+(.*?)>\}\}/s';
    
    return preg_replace_callback($pattern, function($matches) {
        $attributes = $matches[1];
        
        // 提取title和href属性
        $title = '';
        if (preg_match('/title="([^"]+)"/', $attributes, $titleMatch)) {
            $title = $titleMatch[1];
        }
        
        $href = '';
        if (preg_match('/href="([^"]+)"/', $attributes, $hrefMatch)) {
            $href = $hrefMatch[1];
        } else {
            return $matches[0]; // 如果没有找到href属性，返回原始内容
        }
        
        // 构建TIP容器和链接
        return "::: info $title\n$href\n:::";
    }, $content);
}

/**
 * 转换Hugo callout短代码为VitePress容器
 */
function convertCallouts($content) {
    // 匹配callout短代码及其内容，使title属性可选
    $pattern = '/\{\{<\s*callout\s+context="([^"]+)"(?:\s+title="([^"]+)")?\s*>\}\}(.*?)\{\{<\s*\/callout\s*>\}\}/s';
    
    return preg_replace_callback($pattern, function($matches) {
        $context = $matches[1];
        $content = trim($matches[3]);
        
        // 根据context映射到VitePress容器类型
        $containerType = 'info';
        switch ($context) {
            case 'danger':
                $containerType = 'danger';
                break;
            default:
                $containerType = 'warning';
                break;
        }
        
        // 构建VitePress容器，不特殊处理title
        return "::: $containerType\n$content\n:::";
    }, $content);
}
