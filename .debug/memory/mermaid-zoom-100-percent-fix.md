---
title: 流程图放大超过100%失效
description: CSS优先级导致max-width未正确覆盖，SVG被限制在原始尺寸
time: 2026-05-18 14:45
---

**调用堆栈**：handleWheel → setScale → React重渲染 → 容器width计算 → CSS应用 → SVG渲染
**样式链**：.mermaid svg { max-width: 100%; } (0-1-0) 与 .mermaid-preview-diagram svg { max-width: none; } (0-2-0) 冲突
**BUG 症状**：流程图放大查看时，放大到100%后继续放大，百分比数值继续变化但SVG画面大小不变，SVG被限制在原始尺寸1800px
**错误源头**：CSS规则优先级，.mermaid-preview-diagram svg的max-width: none未正确覆盖.mermaid svg的max-width: 100%
**正确性假设**：当容器宽度 > SVG原始宽度时，SVG应继承容器宽度放大，而非被max-width限制在原始尺寸
**修复方式**：
```diff
--- a/apps/browse/src/index.css
+++ b/apps/browse/src/index.css
@@ 355-360 @@
 .mermaid-preview-diagram svg {
   display: block;
   width: 100%;
   height: auto;
-  max-width: none;
+  max-width: none !important;
 }
```
**关键教训**：CSS选择器优先级计算在复杂嵌套结构中可能产生意外行为，当两个规则作用于同一元素且有重叠属性时，即使权重更高也可能因其他因素（如SVG元素的特殊渲染行为）未正确覆盖。使用!important是确保覆盖的最后手段。
**修复结果**：添加!important强制覆盖后，SVG可正常放大超过100%，修复已验证生效。