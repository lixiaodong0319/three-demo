<template>
  <div ref="threeDom" class="container"></div>
</template>

<script lang="ts" setup>
import * as THREE from "three";
import { ref, onMounted } from "vue";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import gsap from "gsap";
import * as dat from "dat.gui";

// 顶点着色器
import basicVertexShader from "@/assets/shader/raw/vertex.glsl";
// 片元着色器
import basicFragmentShader from "@/assets/shader/raw/fragment.glsl";

import caImg from "@/assets/img/ca.jpeg";

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

  // 加入辅助轴，帮助我们查看3维坐标轴
  const axesHelper = new THREE.AxesHelper(5);
  scene.add(axesHelper);

  // 创建纹理加载器对象
  const textureLoader = new THREE.TextureLoader();
  const texture = textureLoader.load(caImg);
  // 创建原始着色器材质
  const rawShaderMaterial = new THREE.RawShaderMaterial({
    vertexShader: basicVertexShader,
    fragmentShader: basicFragmentShader,
    //   wireframe: true,
    side: THREE.DoubleSide,
    uniforms: {
      uTime: {
        value: 0,
      },
      uTexture: {
        value: texture,
      },
    },
  });

  // 创建平面
  const floor = new THREE.Mesh(
    new THREE.PlaneBufferGeometry(1, 1, 64, 64),
    rawShaderMaterial
  );

  console.log(floor);
  scene.add(floor);

  // 初始化渲染器
  const renderer = new THREE.WebGLRenderer();
  // 设置渲染的尺寸大小
  renderer.setSize(threeDom.value.offsetWidth, threeDom.value.offsetHeight);
  // 将webgl渲染的canvas内容添加到body
  threeDom.value.appendChild(renderer.domElement);

  // 初始化控制器
  const controls = new OrbitControls(camera, renderer.domElement);
  // 设置控制器阻尼
  controls.enableDamping = true;
  // 设置自动旋转
  // controls.autoRotate = true;

  const clock = new THREE.Clock();

  function animate() {
    const elapsedTime = clock.getElapsedTime();
    rawShaderMaterial.uniforms.uTime.value = elapsedTime;
    requestAnimationFrame(animate);
    // 使用渲染器渲染相机看这个场景的内容渲染出来
    renderer.render(scene, camera);
  }

  animate();
});
</script>

<style lang="scss">
.container {
  height: 100%;
}
</style>
