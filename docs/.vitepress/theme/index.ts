// https://vitepress.dev/guide/custom-theme
import Theme from 'vitepress/theme';
import '@kviewui/css/dist/index.css';

import './css/md.css';

// 引入时间轴样式
import "vitepress-markdown-timeline/dist/theme/index.css";

export default {
  ...Theme
}