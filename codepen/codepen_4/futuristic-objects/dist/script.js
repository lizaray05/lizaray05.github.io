/*!
Futuristic Objects

Copyright (c) 2025 by Wakana Y.K. (https://codepen.io/wakana-k/pen/VYZRwNb)
*/
"use strict";
import * as I from "three";
import { OrbitControls as P } from "three/addons/controls/OrbitControls.js";
import * as D from "three/addons/utils/BufferGeometryUtils.js";
import { ParametricGeometry as b } from "three/addons/geometries/ParametricGeometry.js";
import { RGBELoader as e } from "three/addons/loaders/RGBELoader.js";
import "three/addons/exporters/OBJExporter.js";
{
  function v(e, t, r) {
    var a;
    return (
      (e *= Math.PI),
      (t = t * Math.PI * 2),
      (a = 0.5 * (1 - Math.cos(e)) * Math.sin(e) * Math.cos(t)),
      (t = 0.5 * (1 - Math.cos(e)) * Math.sin(e) * Math.sin(t)),
      (e = Math.cos(e)),
      r.set(a, t, e)
    );
  }
  function x(e = "droplet") {
    var t = p.attributes.position.array,
      r = new Set();
    for (let e = 0; e < t.length; e += 3) {
      var a = Math.round(100 * t[e]) / 100,
        o = Math.round(100 * t[e + 1]) / 100,
        n = Math.round(100 * t[e + 2]) / 100;
      r.add(a + `,${o},` + n);
    }
    var s = Array.from(r).map((e) => {
      var [e, t, r] = e.split(",").map(Number);
      return { x: e, y: t, z: r };
    });
    return (
      (m = (function (e, t = "droplet") {
        M = [];
        for (var r = 0; r < e.length; r++) {
          m = ("ball" == t ? d : g).clone();
          var a = new I.Vector3(e[r].x, e[r].y, e[r].z),
            o = new I.Matrix4();
          o.lookAt(a, new I.Vector3(0, 0, 0), new I.Vector3(0, 1, 0)),
            m.applyMatrix4(o),
            m.translate(a.x, a.y, a.z),
            M.push(m);
        }
        return (m = D.mergeGeometries(M, !1));
      })(s, e)),
      (M = []),
      (p = p.toNonIndexed()),
      (m = m.toNonIndexed()),
      M.push(p),
      M.push(m),
      (m = D.mergeGeometries(M, !1)).computeBoundingSphere(),
      m.computeVertexNormals(),
      m
    );
  }
  function S() {
    var e, t;
    (e = f.clientWidth),
      (t = f.clientHeight),
      (f.width === e && f.height === t) || h.setSize(e, t, !1),
      h.setScissorTest(!1),
      h.clear(),
      h.setScissorTest(!0),
      G.forEach(function (e) {
        var t,
          r,
          a = e.userData.element,
          o = a.getBoundingClientRect();
        "false" != a.dataset.inView &&
          ((a = o.width),
          (t = o.height),
          (a = Math.ceil(a)),
          (t = Math.ceil(t)),
          (r = o.left),
          (o =
            document.documentElement.offsetHeight -
            o.bottom -
            (document.documentElement.offsetHeight -
              h.domElement.getBoundingClientRect().bottom)),
          (r = Math.ceil(r)),
          (o = Math.ceil(o)),
          h.setViewport(r, o, a, t),
          h.setScissor(r, o, a, t),
          (r = e.userData.camera),
          e.userData.controls.update(),
          h.render(e, r));
      });
  }
  let s,
    i,
    h,
    l,
    m,
    u,
    c,
    p,
    d,
    g,
    M = [],
    w = 1,
    f,
    G = [],
    y = [];
  (u = new I.MeshStandardMaterial({
    roughness: 0,
    metalness: 1,
    flatShading: !0
  })),
    ((s = new I.PerspectiveCamera(35, 1, 0.1, 20)).position.z = 6.5),
    new e().load(
      "https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/equirectangular/quarry_01_1k.hdr",
      function (e) {
        var t, r, a, o, n;
        (e.mapping = I.EquirectangularReflectionMapping),
          (c = e),
          (f = document.getElementById("c")),
          (h = new I.WebGLRenderer({
            canvas: f,
            antialias: !0,
            alpha: !0
          })).setPixelRatio(Math.min(window.devicePixelRatio, 2)),
          h.setAnimationLoop(S),
          (M = []),
          (m = new I.CylinderGeometry(0.03, 0.03, 0.4, 10)).translate(
            0,
            0.2,
            0
          ),
          M.push(m),
          (m = new I.SphereGeometry(0.1, 10, 8)).translate(0, 0.4, 0),
          M.push(m),
          (d = D.mergeGeometries(M, !1)).translate(0, -0.1, 0),
          d.rotateX(Math.PI / 2),
          (M = []),
          (m = new b(v, 20, 20)).rotateX(Math.PI / 2),
          m.translate(0, 0.5, 0),
          M.push(m),
          (g = D.mergeGeometries(M, !1)).scale(0.15, 0.3, 0.15),
          g.rotateX(Math.PI / 2),
          (M = []),
          (p = new I.TetrahedronGeometry(1, 0)),
          M.push(p),
          (p = p.clone()).rotateY(Math.PI / 2),
          M.push(p),
          (p = D.mergeGeometries(M, !1)),
          ((m = x()).userData.title = "Tetrahedron 1"),
          y.push(m),
          (w = 6),
          (M = []),
          (p = new I.TorusGeometry(0.25, 1 / 1.5, 6, 6)),
          M.push(p),
          (p = p.clone()).rotateY(Math.PI / 2),
          M.push(p),
          (p = D.mergeGeometries(M, !1)),
          ((m = x("ball")).userData.title = "Torus 1"),
          y.push(m),
          (w = 4),
          (M = []),
          (p = new I.TorusGeometry(0.25, 1 / 1.5, 12, 12)),
          M.push(p),
          (p = p.clone()).rotateY(Math.PI / 2),
          M.push(p),
          (p = D.mergeGeometries(M, !1)),
          ((m = x("ball")).userData.title = "Torus 2"),
          y.push(m),
          (w = 4),
          (M = []),
          (p = new I.TorusGeometry(0.25, 1 / 1.5, 12, 20)),
          M.push(p),
          (p = p.clone()).rotateY(Math.PI / 2),
          M.push(p),
          (p = D.mergeGeometries(M, !1)),
          ((m = x("ball")).userData.title = "Torus 3"),
          y.push(m),
          (w = 3),
          (M = []),
          (p = new I.CylinderGeometry(0, 1, 1, 3, 1, !0)).translate(
            0,
            p.parameters.height / 2,
            0
          ),
          M.push(p),
          (p = new I.CylinderGeometry(1, 0, 1, 3, 1, !0)).translate(
            0,
            -p.parameters.height / 2,
            0
          ),
          M.push(p),
          (p = D.mergeGeometries(M, !1)),
          (M = []).push(p),
          (p = p.clone()).rotateY(Math.PI / 3),
          M.push(p),
          (p = D.mergeGeometries(M, !1)),
          ((m = x()).userData.title = "Cylinder 1"),
          y.push(m),
          (M = []),
          (p = new I.BoxGeometry(1, 1, 1, 1, 1, 1)),
          M.push(p),
          (m = p.clone()).rotateY(Math.PI / 4),
          m.rotateX(Math.PI / 4),
          M.push(m),
          (m = p.clone()).rotateZ(Math.PI / 4),
          m.rotateX(Math.PI / 4),
          M.push(m),
          (p = D.mergeGeometries(M, !1)),
          ((m = x("ball")).userData.title = "Box 1"),
          y.push(m),
          (M = []),
          (p = new I.SphereGeometry(1, 1, 6)),
          M.push(p),
          (p = p.clone()).rotateY(Math.PI / 3),
          M.push(p),
          (p = D.mergeGeometries(M, !1)),
          ((m = x()).userData.title = "Sphere 1"),
          y.push(m),
          (M = []),
          (p = new I.SphereGeometry(1, 1, 3)),
          M.push(p),
          (p = p.clone()).rotateY(Math.PI / 3),
          M.push(p),
          (p = D.mergeGeometries(M, !1)),
          ((m = x()).userData.title = "Sphere 2"),
          y.push(m),
          (t = document.getElementById("gallery")),
          (r = new IntersectionObserver((e) => {
            for (const t of e)
              t.isIntersecting
                ? (t.target.dataset.inView = !0)
                : (t.target.dataset.inView = !1);
          }));
        for (let e = 0; e < y.length; e++) {
          (i = new I.Scene()).environment = c;
          (a = document.createElement("article")),
            (o = ((a.className = "card"), document.createElement("div"))),
            (n =
              ((o.className = "geo"),
              (o.dataset.index = e),
              (o.dataset.inView = !0),
              a.appendChild(o),
              document.createElement("div")));
          (n.className = "title"),
            (n.innerText = "Shape " + (e + 1)),
            a.appendChild(n),
            (i.userData.element = o),
            t.appendChild(a),
            (s = s.clone()),
            (i.userData.camera = s),
            ((l = new P(
              i.userData.camera,
              i.userData.element
            )).autoRotate = !0),
            (l.minDistance = 2),
            (l.maxDistance = s.far / 2),
            (l.enablePan = !1),
            (l.enableZoom = !1),
            (l.enableDamping = !0),
            (i.userData.controls = l),
            (m = y[e]),
            i.add(new I.Mesh(m, u)),
            m.userData.title && (n.innerHTML = m.userData.title),
            G.push(i),
            r.observe(o);
        }
      }
    );
}
const r = new Lenis({});
requestAnimationFrame(function e(t) {
  r.raf(t), requestAnimationFrame(e);
});