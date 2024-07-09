<template>
  <div ref="threeDom" class="container"></div>
</template>

<script lang="ts" setup>
import * as THREE from "three";
import { ref, onMounted } from "vue";
// 导入轨道控制器
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const threeDom: any = ref(null);

onMounted(() => {
  // 1.创建场景
  const scene = new THREE.Scene();

  // 2.创建相机
  const camera = new THREE.PerspectiveCamera(
    75,
    threeDom.value.offsetWidth / threeDom.value.offsetHeight,
    0.1,
    1000
  );

  // 设置相机位置
  camera.position.set(0, 0, 10);

  // 添加物体
  // 创建几何体
  // const cubeGeometry = new THREE.BoxGeometry();
  // const cubeMaterial = new THREE.MeshBasicMaterial({ color: 0xffff00 });

  // // 根据几何体和材质创建物体
  // const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
  // cube.rotation.set(Math.PI / 4, 0, 0);

  // // 将几何体添加到场景当中
  // scene.add(cube);

  // 初始化渲染器
  const renderer = new THREE.WebGLRenderer();
  // 设置渲染的尺寸大小
  renderer.setSize(threeDom.value.offsetWidth, threeDom.value.offsetHeight);
  // 将webgl渲染的canvas内容添加到body
  threeDom.value.appendChild(renderer.domElement);

  // 创建轨道控制器
  new OrbitControls(camera, renderer.domElement);

  // 添加坐标轴辅助器
  const axesHelper = new THREE.AxesHelper(5);
  scene.add(axesHelper);

  function render() {
    // cube.position.x += 0.01;
    // cube.rotation.x += 0.01;
    // if (cube.position.x > 5) {
    //   cube.position.x = 0;
    // }
    renderer.render(scene, camera);
    requestAnimationFrame(render);
  }
  render();
});
</script>

<style lang="scss">
.container {
  height: 100%;
}
</style>
