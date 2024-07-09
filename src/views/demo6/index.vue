<template>
  <div ref="threeDom" class="container"></div>
</template>

<script lang="ts" setup>
import * as THREE from "three";
import { ref, onMounted } from "vue";
// 导入轨道控制器
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
// 导入动画库
import gsap from "gsap";
// 导入dat.gui
import * as dat from "dat.gui";
import colorImg from "@/assets/textures/door/color.jpg";
import alphaImg from "@/assets/textures/door/alpha.jpg";
import ambientOcclusionImg from "@/assets/textures/door/ambientOcclusion.jpg";
import heightImg from "@/assets/textures/door/height.jpg";
import roughnessImg from "@/assets/textures/door/roughness.jpg";
import metalnessImg from "@/assets/textures/door/metalness.jpg";
import normalImg from "@/assets/textures/door/normal.jpg";

const threeDom: any = ref(null);

onMounted(() => {
  // 目标：纹理的进度
  // 1、创建场景
  const scene = new THREE.Scene();

  // 2、创建相机
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );

  // 设置相机位置
  camera.position.set(0, 0, 10);
  scene.add(camera);

  // 导入纹理
  const textureLoader = new THREE.TextureLoader();
  const doorColorTexture = textureLoader.load(
    colorImg
    //   event.onLoad,
    //   event.onProgress,
    //   event.onError
  );

  const doorAplhaTexture = textureLoader.load(alphaImg);
  const doorAoTexture = textureLoader.load(ambientOcclusionImg);
  //导入置换贴图
  const doorHeightTexture = textureLoader.load(heightImg);
  // 导入粗糙度贴图
  const roughnessTexture = textureLoader.load(roughnessImg);
  // 导入金属贴图
  const metalnessTexture = textureLoader.load(metalnessImg);
  // 导入法线贴图
  const normalTexture = textureLoader.load(normalImg);

  // 添加物体
  const cubeGeometry = new THREE.BoxBufferGeometry(1, 1, 1, 100, 100, 100);
  // 材质
  const material = new THREE.MeshStandardMaterial({
    color: "#ffff00",
    map: doorColorTexture,
    alphaMap: doorAplhaTexture, // 不透明度 白色完全不透明，黑色透明
    transparent: true,
    aoMap: doorAoTexture, // 遮挡效果 需要配合uv2
    aoMapIntensity: 1,
    displacementMap: doorHeightTexture, // 位移纹理 白色最高
    displacementScale: 0.1,
    roughnessMap: roughnessTexture, // 粗糙度 0镜面反射，1漫反射
    roughness: 1,
    metalnessMap: metalnessTexture, // 金属度
    metalness: 1,
    normalMap: normalTexture, // 法线贴图纹理，RGB值会影响每个像素片段的曲面法线，并更改颜色照亮的方式
  });
  const cube = new THREE.Mesh(cubeGeometry, material);
  scene.add(cube);
  // 给cube添加第二组uv
  cubeGeometry.setAttribute(
    "uv2",
    new THREE.BufferAttribute(cubeGeometry.attributes.uv.array, 2)
  );

  // 灯光
  // 环境光
  const light = new THREE.AmbientLight(0xffffff, 0.5); // soft white light
  scene.add(light);
  //直线光源
  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
  directionalLight.position.set(10, 10, 10);
  scene.add(directionalLight);

  // 初始化渲染器
  const renderer = new THREE.WebGLRenderer();
  // 设置渲染的尺寸大小
  renderer.setSize(window.innerWidth, window.innerHeight);
  // console.log(renderer);
  // 将webgl渲染的canvas内容添加到body
  threeDom.value.appendChild(renderer.domElement);

  // 创建轨道控制器
  const controls = new OrbitControls(camera, renderer.domElement);
  // 设置控制器阻尼，让控制器更有真实效果,必须在动画循环里调用.update()。
  controls.enableDamping = true;

  // 添加坐标轴辅助器
  const axesHelper = new THREE.AxesHelper(5);
  scene.add(axesHelper);
  // 设置时钟
  const clock = new THREE.Clock();

  function render() {
    controls.update();
    renderer.render(scene, camera);
    //   渲染下一帧的时候就会调用render函数
    requestAnimationFrame(render);
  }

  render();

  // 监听画面变化，更新渲染画面
  window.addEventListener("resize", () => {
    // 更新摄像头
    camera.aspect = window.innerWidth / window.innerHeight;
    //   更新摄像机的投影矩阵
    camera.updateProjectionMatrix();

    //   更新渲染器
    renderer.setSize(window.innerWidth, window.innerHeight);
    //   设置渲染器的像素比
    renderer.setPixelRatio(window.devicePixelRatio);
  });
});
</script>

<style lang="scss">
.container {
  height: 100%;
}
</style>
