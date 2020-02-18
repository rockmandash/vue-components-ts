import { action } from "@storybook/addon-actions";
import HelloWorld from "./index.vue";

export default {
  title: `Cool/HelloWorld`
};

export const Text = () => ({
  components: { HelloWorld },
  template: "<HelloWorld></HelloWorld>",
  methods: { action: action("clicked") }
});
