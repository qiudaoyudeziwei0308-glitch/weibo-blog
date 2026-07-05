 ---
 title: "React Hooks 入门实战指南"
 date: "2026-07-02"
 tags: [技术, React, 前端]
 ---
 
 React Hooks 是 React 16.8 引入的特性，让函数组件也能使用状态和副作用。
 
 ## useState
 
 最基本的状态管理 Hook：
 
 ```jsx
 const [count, setCount] = useState(0);
 ```
 
 ## useEffect
 
 处理副作用，替代生命周期方法：
 
 ```jsx
 useEffect(() => {
   document.title = \`点击了 \${count} 次\`;
 }, [count]);
 ```
 
 ## 自定义 Hook
 
 复用状态逻辑的最佳方式：
 
 ```jsx
 function useWindowSize() {
   const [size, setSize] = useState({ width: 0, height: 0 });
   useEffect(() => {
     const handler = () => setSize({ width: window.innerWidth, height: window.innerHeight });
     window.addEventListener("resize", handler);
     return () => window.removeEventListener("resize", handler);
   }, []);
   return size;
 }
 ```
 
 掌握 Hooks 能让你写出更简洁、可复用的组件！
