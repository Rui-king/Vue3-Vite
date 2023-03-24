import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useTestStore = defineStore('test', () => {
  const text = ref('我是 Stores 上的数据'),
    changeText = () => text.value = '我是修改后 Stores 上的数据';


  return { text, changeText }
})
