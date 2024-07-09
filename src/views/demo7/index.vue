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
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader";
// import hdrImg from "@/assets/texture/hdr/002.hdr";
import pxImg from "@/assets/textures/environmentMaps/1/px.jpg";
import nxImg from "@/assets/textures/environmentMaps/1/nx.jpg";
import pyImg from "@/assets/textures/environmentMaps/1/py.jpg";
import nyImg from "@/assets/textures/environmentMaps/1/ny.jpg";
import pzImg from "@/assets/textures/environmentMaps/1/pz.jpg";
import nzImg from "@/assets/textures/environmentMaps/1/nz.jpg";

const threeDom: any = ref(null);

onMounted(() => {
  // const rgbeLoader = new RGBELoader();
  // rgbeLoader.loadAsync(hdrImg).then((texture) => {
  //   texture.mapping = THREE.EquirectangularReflectionMapping;
  // });

  // 1.创建场景
  const scene = new THREE.Scene();

  // 2.创建相机
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );

  // 设置相机位置
  camera.position.set(0, 0, 10);

  // 导入纹理

  // 设置cube纹理加载器
  const cubeTextureLoader = new THREE.CubeTextureLoader();
  const envMapTexture = cubeTextureLoader.load([
    pxImg,
    nxImg,
    pyImg,
    nyImg,
    pzImg,
    nzImg,
  ]);

  const sphereGeometry = new THREE.SphereBufferGeometry(1, 20, 20);
  const material = new THREE.MeshStandardMaterial({
    metalness: 1, // 0白色，1金属
    roughness: 0.1, // 光滑度
    envMap: envMapTexture, // 环境映射
  });
  const sphere = new THREE.Mesh(sphereGeometry, material);
  scene.add(sphere);

  scene.background = envMapTexture;

  // 灯光
  // const light = new THREE.AmbientLight( 0xffffff ); // soft white light
  // scene.add( light );
  // 直线光
  const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
  directionalLight.position.set(10, 10, 10);
  scene.add(directionalLight);

  // 初始化渲染器
  const renderer = new THREE.WebGLRenderer();
  // 设置渲染的尺寸大小
  renderer.setSize(window.innerWidth, window.innerHeight);
  // 将webgl渲染的canvas内容添加到body
  threeDom.value.appendChild(renderer.domElement);

  // 创建轨道控制器
  const controls = new OrbitControls(camera, renderer.domElement);
  // 设置控制器阻尼
  controls.enableDamping = true;

  // 添加坐标轴辅助器
  const axesHelper = new THREE.AxesHelper(5);
  scene.add(axesHelper);

  function render() {
    controls.update();
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
