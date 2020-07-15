這是一款專門開發 Components 的開發環境，適合放類似 [Vuetify](https://vuetifyjs.com/en/introduction/why-vuetify/) 之類的 Components

### 環境介紹

1. 開發環境：[Storybook](https://storybook.js.org/), [TypeScript](https://www.typescriptlang.org/)
2. 打包環境：[Vue-cli 3](https://cli.vuejs.org/guide/build-targets.html#library)
3. Documentation：[Storybook Docs](https://github.com/storybookjs/storybook/blob/next/addons/docs/docs/mdx.md)
4. prettier template 使用 great-prettier-config
5. 盡量使用 css module 或是 css-in-js，避免未來跟其他人 class name 衝突
6. commit message 使用 standard-version，便能自動產出 changelog，規範 https://wadehuanglearning.blogspot.com/2019/05/commit-commit-commit-why-what-commit.html


### addons

除了 vue-cli-plugin-storybook 安裝的 addons 還額外安裝了

1. @storybook/addon-viewport
2. @storybook/addon-backgrounds

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

- `npm run release`

執行這個 script 的時候，需要確保沒有任何檔案在 git stage

1. 會自動升 `package.json` 的版號並 commit 和加上對應的 `git tag`
2. 產生 changelog
3. build
4. npm publish

結束後可以手動下 `git push --follow-tags origin master` push commit

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

### Addons Example

可以使用一些 Addons

#### JS

```js
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import MyButton from '../components/MyButton.vue';

export default {
  component: MyButton,
  title: 'Button'
};

export const withText = () => ({
  components: { MyButton },
  template: '<my-button @click="action">Hello Button</my-button>',
  methods: { action: action('clicked') }
});

export const withJSX = () => ({
  render() {
    return (
      <MyButton onClick={linkTo('Button', 'With Some Emoji')}>
        With JSX
      </MyButton>
    );
  }
});

export const withSomeEmoji = () => ({
  components: { MyButton },
  template: '<my-button>😀 😎 👍 💯</my-button>'
});
```

#### MDX

```js

import { Meta, Props, Story, Preview } from '@storybook/addon-docs/blocks';
import { action } from "@storybook/addon-actions";
import { linkTo } from '@storybook/addon-links'
import MyButton from '../components/MyButton.vue';

<Meta title="MDX|Button" component={MyButton} />

# Button

<Props of={MyButton} />

This is a simple button with some text in it.

<Preview>
  <Story name="With Text">
    {{
        components: { MyButton },
        template: '<my-button @click="action">Hello Button</my-button>',
        methods: { action: action("clicked") }
    }}
  </Story>
</Preview>

You can perform some action when the button is clicked.

<Preview>
  <RMyButton onClick={linkTo('Button', 'With Some Emoji')}>With JSX</RMyButton>
</Preview>

You can even have Emoji in the button.

<Preview>
  <Story name="With Some Emoji">
    {{
        components: { MyButton },
        template: '<my-button>😀 😎 👍 💯</my-button>'
    }}
  </Story>
</Preview>

```
