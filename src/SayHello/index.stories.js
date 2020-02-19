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
