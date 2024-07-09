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
import pxImg from "@/assets/textures/environmentMaps/2/px.jpg";
import nxImg from "@/assets/textures/environmentMaps/2/nx.jpg";
import pyImg from "@/assets/textures/environmentMaps/2/py.jpg";
import nyImg from "@/assets/textures/environmentMaps/2/ny.jpg";
import pzImg from "@/assets/textures/environmentMaps/2/pz.jpg";
import nzImg from "@/assets/textures/environmentMaps/2/nz.jpg";
import particles3Img from "@/assets/textures/particles/3.png";
import xuehuaImg from "@/assets/textures/particles/xuehua.png";

const threeDom: any = ref(null);

onMounted(() => {
  // 目标：设置漫天的雪花

  const gui = new dat.GUI();
  // 1、创建场景
  const scene = new THREE.Scene();

  // 2、创建相机
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    30
  );

  // 设置相机位置
  camera.position.set(0, 0, 40);
  scene.add(camera);

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

  function createPoints(url: any, size = 0.5) {
    const particlesGeometry = new THREE.BufferGeometry();
    const count = 10000;

    // 设置缓冲区数组
    const positions = new Float32Array(count * 3);
    // 设置粒子顶点颜色
    const colors = new Float32Array(count * 3);
    // 设置顶点
    for (let i = 0; i < count * 3; i++) {
      positions[i] = (Math.random() - 0.5) * 100;
      colors[i] = 0.5;
    }
    particlesGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(positions, 3)
    );
    particlesGeometry.setAttribute(
      "color",
      new THREE.BufferAttribute(colors, 3)
    );

    // 设置点材质
    const pointsMaterial = new THREE.PointsMaterial();
    pointsMaterial.size = size;
    pointsMaterial.color.set(0xffffff);
    // 相机深度而衰减
    pointsMaterial.sizeAttenuation = true;

    // 载入纹理
    const textureLoader = new THREE.TextureLoader();

    const obj: any = {
      3: particles3Img,
      xuehua: xuehuaImg,
    };

    const texture = textureLoader.load(obj[url]);
    // 设置点材质纹理
    pointsMaterial.map = texture;
    pointsMaterial.alphaMap = texture;
    pointsMaterial.transparent = true;
    pointsMaterial.depthWrite = false;
    pointsMaterial.blending = THREE.AdditiveBlending;
    // 设置启动顶点颜色
    pointsMaterial.vertexColors = true;

    const points = new THREE.Points(particlesGeometry, pointsMaterial);

    scene.add(points);
    return points;
  }

  const points = createPoints("3", 0.5);
  const points2 = createPoints("3", 1);
  const points3 = createPoints("xuehua", 0.25);

  // 初始化渲染器
  const renderer = new THREE.WebGLRenderer();
  // 设置渲染的尺寸大小
  renderer.setSize(window.innerWidth, window.innerHeight);
  // 开启场景中的阴影贴图
  renderer.shadowMap.enabled = true;
  renderer.physicallyCorrectLights = true;

  // console.log(renderer);
  // 将webgl渲染的canvas内容添加到body
  threeDom.value.appendChild(renderer.domElement);

  // // 使用渲染器，通过相机将场景渲染进来
  // renderer.render(scene, camera);

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
    let time = clock.getElapsedTime();
    points.rotation.x = time * 0.15;
    points2.rotation.x = time * 0.25;
    points2.rotation.y = time * 0.2;
    points3.rotation.x = time * 0.1;
    points3.rotation.y = time * 0.1;
    controls.update();
    renderer.render(scene, camera);
    //   渲染下一帧的时候就会调用render函数
    requestAnimationFrame(render);
  }

  render();

  // 监听画面变化，更新渲染画面
  window.addEventListener("resize", () => {
    //   console.log("画面变化了");

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
