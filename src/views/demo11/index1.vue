<template>
  <div class="container">
    <canvas ref="canvas"></canvas>
  </div>
</template>

<script lang="ts" setup>
import * as THREE from "three";
import { ref, onMounted } from "vue";
import func from "vue-temp/vue-editor-bridge";

const canvas: any = ref(null);

onMounted(() => {
  canvas.value.width = window.innerWidth;
  canvas.value.height = window.innerHeight;
  // 获取webgl绘图上下文
  const gl = canvas.value.getContext("webgl");
  // 第一次创建webgl绘图上下文，需要设置视口大小
  gl.viewport(0, 0, canvas.value.width, canvas.value.height);
  // 创建顶点着色器
  const vertexShader = gl.createShader(gl.VERTEX_SHADER);
  // 创建顶点着色器的源码，需要编写glsl代码
  gl.shaderSource(
    vertexShader,
    `
    attribute vec4 a_Position;
    uniform mat4 u_Mat;
    varying vec4 v_Color;
    void main() {
      gl_Position = u_Mat * a_Position;
      v_Color = gl_Position;
    }
  `
  );
  // 编译顶点着色器
  gl.compileShader(vertexShader);

  // 创建片元着色器
  const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
  // 创建顶点着色器的源码，需要编写glsl代码
  gl.shaderSource(
    fragmentShader,
    `
    precision mediump float;
    varying vec4 v_Color;
    void main() {
      gl_FragColor = v_Color;
    }
  `
  );
  // 编译片元着色器
  gl.compileShader(fragmentShader);
  // 创建程序连接顶点着色器和片元着色器
  const program = gl.createProgram();
  // 链接顶点着色器和片元着色器
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  // 链接程序
  gl.linkProgram(program);
  // 使用程序进行渲染
  gl.useProgram(program);
  // 创建顶点缓冲区对象
  const vertexBuffer = gl.createBuffer();
  // 绑定顶点缓冲区对象
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
  // 向顶点缓冲区对象中写入数据
  const vertices = new Float32Array([0.0, 0.5, -0.5, -0.5, 0.5, -0.5]);
  // STATIC_DRAW表示数据不会改变
  gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
  // 获取顶点着色器中的a_Position变量的位置
  const a_Position = gl.getAttribLocation(program, "a_Position");
  // 将顶点缓冲区对象分配给a_Position变量
  // 告诉opengl如何解析顶点数据
  gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 0, 0);
  // 启用顶点着色器中的a_Position变量
  gl.enableVertexAttribArray(a_Position);
  const scale = {
    x: 0.5,
    y: 0.5,
    z: 0.5,
  };
  // const mat = new Float32Array([
  //   scale.x,
  //   0.0,
  //   0.0,
  //   0.0,
  //   0.0,
  //   scale.x,
  //   0.0,
  //   0.0,
  //   0.0,
  //   0.0,
  //   scale.x,
  //   0.0,
  //   0.0,
  //   0.0,
  //   0.0,
  //   1.0,
  // ]);

  // const u_Mat = gl.getUniformLocation(program, "u_Mat");
  // gl.uniformMatrix4fv(u_Mat, false, mat);
  // // 清除canvas
  // gl.clearColor(0.0, 0.0, 0.0, 0.0);
  // gl.clear(gl.COLOR_BUFFER_BIT);

  // // 绘制三角形
  // gl.drawArrays(gl.TRIANGLES, 0, 3);

  function animate() {
    scale.x -= 0.01;
    const mat = new Float32Array([
      scale.x,
      0.0,
      0.0,
      0.0,
      0.0,
      scale.x,
      0.0,
      0.0,
      0.0,
      0.0,
      scale.x,
      0.0,
      0.0,
      0.0,
      0.0,
      1.0,
    ]);
    const u_Mat = gl.getUniformLocation(program, "u_Mat");
    gl.uniformMatrix4fv(u_Mat, false, mat);
    // 绘制三角形
    gl.drawArrays(gl.TRIANGLES, 0, 3);
    requestAnimationFrame(animate);
  }
  animate();
});
</script>

<style lang="scss">
.container {
  height: 100%;
}
</style>
