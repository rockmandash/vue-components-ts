這是一款專門開發 Components 的開發環境，適合放類似 [Vuetify](https://vuetifyjs.com/en/introduction/why-vuetify/) 之類的 Components

### 環境介紹

1. 開發環境：[Storybook](https://storybook.js.org/), [TypeScript](https://www.typescriptlang.org/)
2. 打包環境：[Vue-cli 3](https://cli.vuejs.org/guide/build-targets.html#library)
3. Documentation：[Storybook Docs](https://github.com/storybookjs/storybook/blob/next/addons/docs/docs/mdx.md)

### 開發流程

每次新增一個 Component 需要建立

- 1 個資料夾
- 2 個檔案

假設我今天要新增一個 `SayHello` Component，則可以使用以下方式

`index.vue` 完整程式碼

```vue
<template>
  <p>👋 Hello {{ to }}</p>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  props: {
    to: String
  }
});
</script>

<style lang="scss" scoped>
p {
  font-size: 30px;
  color: royalblue;
}
</style>
```

Stories 可以有兩種方式 `js` 或是 `MDX`，推薦使用 [MDX](https://github.com/storybookjs/storybook/blob/next/addons/docs/docs/mdx.md)，原因是因為寫出來的 Documentation 更語易化

### 第一種

`index.stories.js` 測試程式碼

```js
import SayHello from './';

export default {
  title: 'REGULAR|UI/Gretting/SayHello' // 這邊可以加類別，比如說 "UI/HelloWorld"
};

// 一個 function 回傳一個 Vue Component
export const toJoseph = () => ({
  components: { SayHello },
  template: '<SayHello to="Joseph"/>'
});

// 一個 function 回傳一個 Vue Component
export const toAmy = () => ({
  components: { SayHello },
  template: '<SayHello to="Amy"/>'
});
```

### 第二種

`index.stories.mdx` 測試程式碼

```js
import { Meta, Props, Story, Preview } from '@storybook/addon-docs/blocks';
import SayHello from './';

<Meta title="MDX|UI/Gretting" component={SayHello} />

# SayHello

<Props of={SayHello} />

You can say hello to Joseph

<Preview>
  <Story name="Joseph">
    {{
      components: { SayHello },
      template: '<SayHello to="Joseph"/>'
    }}
  </Story>
</Preview>

You can also say hello to Amy

<Preview>
  <Story name="Amy">
    {{
      components: { SayHello },
      template: '<SayHello to="Amy"/>'
    }}
  </Story>
</Preview>
```

必須要在 `src/` 資料夾底下的任何一個地方建立如以下的目錄結構

```bash
src
  UI # <- 第一層類別一定要有
    SayHello # <- 跟 component 名稱一樣的資料夾
      index.vue # <- 主要的 Component
      index.stories.js # Storybook，就是上面的程式碼，如果不用 MDX 就使用這一個
      index.stories.mdx # <- 推薦 — Storybook MDX，就是上面的程式碼
```

這樣就完成了新增 Component 的過程

### NPM scripts

接下來介紹可以用的 `NPM scripts`

- `npm run storybook:serve`

開啟 Storybook 編譯的 watch 模式，會另開新網頁，就能在 Storybook 上進行開發

- `npm run build`

Vue-cli 3 會編譯出 `dist/` 資料夾，包含打包好的 bundle js

- `npm run format`

會根據專案的 `.prettierrc` 來 format 整個 codebase

- `npm run release`

會自動升 `package.json` 的版號並 commit 和加上對應的 `git tag`，然後會將 tag push 到遠端 `git push --follow-tags origin master`

執行這個 script 的時候，需要確保沒有任何檔案在 git stage

- `npm run storybook:build`

Build 出 Storybook 靜態網站

### 備註

如果有一些 `inner Componet` 沒有要 `export` 成 `API`，可以寫在 `index.vue` 的旁邊，比如說

```bash
src
  UI
    SayHello
      index.vue
      index.stories.mdx
      OtherComponent.vue # <- 這邊可以自由加上任何檔案
```
