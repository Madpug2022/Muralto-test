import ve, { useState as gt, useRef as me, useEffect as At } from "react";
import * as j from "three";
import { TrianglesDrawMode as Ln, TriangleFanDrawMode as Nt, TriangleStripDrawMode as mn, Loader as On, LoaderUtils as it, FileLoader as gn, Color as Ce, LinearSRGBColorSpace as Ee, SpotLight as In, PointLight as Dn, DirectionalLight as Nn, MeshBasicMaterial as ke, SRGBColorSpace as ot, MeshPhysicalMaterial as _e, Vector2 as ie, Matrix4 as Xe, Vector3 as T, Quaternion as le, InstancedMesh as jn, InstancedBufferAttribute as kn, Object3D as rt, TextureLoader as Hn, ImageBitmapLoader as Fn, BufferAttribute as St, InterleavedBuffer as Un, InterleavedBufferAttribute as zn, LinearFilter as jt, LinearMipmapLinearFilter as _n, RepeatWrapping as kt, NearestFilter as yn, PointsMaterial as Bn, Material as Mt, LineBasicMaterial as wn, MeshStandardMaterial as bn, DoubleSide as xn, PropertyBinding as Gn, BufferGeometry as yt, SkinnedMesh as Yn, Mesh as _, LineSegments as Xn, Line as xe, LineLoop as Kn, Points as Zn, Group as Rt, PerspectiveCamera as Vn, MathUtils as Tn, OrthographicCamera as En, Skeleton as Wn, AnimationClip as Qn, Bone as qn, InterpolateLinear as An, ColorManagement as zt, NearestMipmapNearestFilter as $n, LinearMipmapNearestFilter as Jn, NearestMipmapLinearFilter as es, ClampToEdgeWrapping as ts, MirroredRepeatWrapping as ns, InterpolateDiscrete as ss, FrontSide as is, Texture as Bt, VectorKeyframeTrack as Gt, NumberKeyframeTrack as Yt, QuaternionKeyframeTrack as Xt, Box3 as os, Sphere as rs, Interpolant as as, Ray as cs, Plane as ls, Controls as Sn, MOUSE as Ge, TOUCH as Be, Spherical as Kt, Float32BufferAttribute as wt, ShaderMaterial as Zt, UniformsUtils as hs, WebGLRenderTarget as us, HalfFloatType as ds, NoBlending as fs, Clock as ps, Raycaster as ms, Euler as gs, CylinderGeometry as ae, BoxGeometry as se, OctahedronGeometry as ht, SphereGeometry as _s, TorusGeometry as Qe, PlaneGeometry as ys } from "three";
import * as ws from "dat.gui";
import { gsap as bs } from "gsap";
import { N8AOPass as xs } from "n8ao";
var ut = { exports: {} }, qe = {};
/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Vt;
function Ts() {
  if (Vt) return qe;
  Vt = 1;
  var a = Symbol.for("react.transitional.element"), e = Symbol.for("react.fragment");
  function t(i, n, o) {
    var s = null;
    if (o !== void 0 && (s = "" + o), n.key !== void 0 && (s = "" + n.key), "key" in n) {
      o = {};
      for (var r in n)
        r !== "key" && (o[r] = n[r]);
    } else o = n;
    return n = o.ref, {
      $$typeof: a,
      type: i,
      key: s,
      ref: n !== void 0 ? n : null,
      props: o
    };
  }
  return qe.Fragment = e, qe.jsx = t, qe.jsxs = t, qe;
}
var $e = {};
/**
 * @license React
 * react-jsx-runtime.development.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Wt;
function Es() {
  return Wt || (Wt = 1, process.env.NODE_ENV !== "production" && function() {
    function a(l) {
      if (l == null) return null;
      if (typeof l == "function")
        return l.$$typeof === oe ? null : l.displayName || l.name || null;
      if (typeof l == "string") return l;
      switch (l) {
        case A:
          return "Fragment";
        case X:
          return "Portal";
        case v:
          return "Profiler";
        case S:
          return "StrictMode";
        case Q:
          return "Suspense";
        case fe:
          return "SuspenseList";
      }
      if (typeof l == "object")
        switch (typeof l.tag == "number" && console.error(
          "Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."
        ), l.$$typeof) {
          case O:
            return (l.displayName || "Context") + ".Provider";
          case C:
            return (l._context.displayName || "Context") + ".Consumer";
          case he:
            var g = l.render;
            return l = l.displayName, l || (l = g.displayName || g.name || "", l = l !== "" ? "ForwardRef(" + l + ")" : "ForwardRef"), l;
          case K:
            return g = l.displayName || null, g !== null ? g : a(l.type) || "Memo";
          case z:
            g = l._payload, l = l._init;
            try {
              return a(l(g));
            } catch {
            }
        }
      return null;
    }
    function e(l) {
      return "" + l;
    }
    function t(l) {
      try {
        e(l);
        var g = !1;
      } catch {
        g = !0;
      }
      if (g) {
        g = console;
        var w = g.error, N = typeof Symbol == "function" && Symbol.toStringTag && l[Symbol.toStringTag] || l.constructor.name || "Object";
        return w.call(
          g,
          "The provided key is an unsupported type %s. This value must be coerced to a string before using it here.",
          N
        ), e(l);
      }
    }
    function i() {
    }
    function n() {
      if (te === 0) {
        at = console.log, He = console.info, Ke = console.warn, Ae = console.error, ct = console.group, Fe = console.groupCollapsed, ye = console.groupEnd;
        var l = {
          configurable: !0,
          enumerable: !0,
          value: i,
          writable: !0
        };
        Object.defineProperties(console, {
          info: l,
          log: l,
          warn: l,
          error: l,
          group: l,
          groupCollapsed: l,
          groupEnd: l
        });
      }
      te++;
    }
    function o() {
      if (te--, te === 0) {
        var l = { configurable: !0, enumerable: !0, writable: !0 };
        Object.defineProperties(console, {
          log: $({}, l, { value: at }),
          info: $({}, l, { value: He }),
          warn: $({}, l, { value: Ke }),
          error: $({}, l, { value: Ae }),
          group: $({}, l, { value: ct }),
          groupCollapsed: $({}, l, { value: Fe }),
          groupEnd: $({}, l, { value: ye })
        });
      }
      0 > te && console.error(
        "disabledDepth fell below zero. This is a bug in React. Please file an issue."
      );
    }
    function s(l) {
      if (Le === void 0)
        try {
          throw Error();
        } catch (w) {
          var g = w.stack.trim().match(/\n( *(at )?)/);
          Le = g && g[1] || "", Oe = -1 < w.stack.indexOf(`
    at`) ? " (<anonymous>)" : -1 < w.stack.indexOf("@") ? "@unknown:0:0" : "";
        }
      return `
` + Le + l + Oe;
    }
    function r(l, g) {
      if (!l || re) return "";
      var w = Se.get(l);
      if (w !== void 0) return w;
      re = !0, w = Error.prepareStackTrace, Error.prepareStackTrace = void 0;
      var N = null;
      N = H.H, H.H = null, n();
      try {
        var J = {
          DetermineComponentFrameRoot: function() {
            try {
              if (g) {
                var Me = function() {
                  throw Error();
                };
                if (Object.defineProperty(Me.prototype, "props", {
                  set: function() {
                    throw Error();
                  }
                }), typeof Reflect == "object" && Reflect.construct) {
                  try {
                    Reflect.construct(Me, []);
                  } catch (be) {
                    var lt = be;
                  }
                  Reflect.construct(l, [], Me);
                } else {
                  try {
                    Me.call();
                  } catch (be) {
                    lt = be;
                  }
                  l.call(Me.prototype);
                }
              } else {
                try {
                  throw Error();
                } catch (be) {
                  lt = be;
                }
                (Me = l()) && typeof Me.catch == "function" && Me.catch(function() {
                });
              }
            } catch (be) {
              if (be && lt && typeof be.stack == "string")
                return [be.stack, lt.stack];
            }
            return [null, null];
          }
        };
        J.DetermineComponentFrameRoot.displayName = "DetermineComponentFrameRoot";
        var G = Object.getOwnPropertyDescriptor(
          J.DetermineComponentFrameRoot,
          "name"
        );
        G && G.configurable && Object.defineProperty(
          J.DetermineComponentFrameRoot,
          "name",
          { value: "DetermineComponentFrameRoot" }
        );
        var R = J.DetermineComponentFrameRoot(), we = R[0], Ue = R[1];
        if (we && Ue) {
          var ne = we.split(`
`), Ie = Ue.split(`
`);
          for (R = G = 0; G < ne.length && !ne[G].includes(
            "DetermineComponentFrameRoot"
          ); )
            G++;
          for (; R < Ie.length && !Ie[R].includes(
            "DetermineComponentFrameRoot"
          ); )
            R++;
          if (G === ne.length || R === Ie.length)
            for (G = ne.length - 1, R = Ie.length - 1; 1 <= G && 0 <= R && ne[G] !== Ie[R]; )
              R--;
          for (; 1 <= G && 0 <= R; G--, R--)
            if (ne[G] !== Ie[R]) {
              if (G !== 1 || R !== 1)
                do
                  if (G--, R--, 0 > R || ne[G] !== Ie[R]) {
                    var We = `
` + ne[G].replace(
                      " at new ",
                      " at "
                    );
                    return l.displayName && We.includes("<anonymous>") && (We = We.replace("<anonymous>", l.displayName)), typeof l == "function" && Se.set(l, We), We;
                  }
                while (1 <= G && 0 <= R);
              break;
            }
        }
      } finally {
        re = !1, H.H = N, o(), Error.prepareStackTrace = w;
      }
      return ne = (ne = l ? l.displayName || l.name : "") ? s(ne) : "", typeof l == "function" && Se.set(l, ne), ne;
    }
    function c(l) {
      if (l == null) return "";
      if (typeof l == "function") {
        var g = l.prototype;
        return r(
          l,
          !(!g || !g.isReactComponent)
        );
      }
      if (typeof l == "string") return s(l);
      switch (l) {
        case Q:
          return s("Suspense");
        case fe:
          return s("SuspenseList");
      }
      if (typeof l == "object")
        switch (l.$$typeof) {
          case he:
            return l = r(l.render, !1), l;
          case K:
            return c(l.type);
          case z:
            g = l._payload, l = l._init;
            try {
              return c(l(g));
            } catch {
            }
        }
      return "";
    }
    function h() {
      var l = H.A;
      return l === null ? null : l.getOwner();
    }
    function d(l) {
      if (ue.call(l, "key")) {
        var g = Object.getOwnPropertyDescriptor(l, "key").get;
        if (g && g.isReactWarning) return !1;
      }
      return l.key !== void 0;
    }
    function u(l, g) {
      function w() {
        Ve || (Ve = !0, console.error(
          "%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://react.dev/link/special-props)",
          g
        ));
      }
      w.isReactWarning = !0, Object.defineProperty(l, "key", {
        get: w,
        configurable: !0
      });
    }
    function f() {
      var l = a(this.type);
      return D[l] || (D[l] = !0, console.error(
        "Accessing element.ref was removed in React 19. ref is now a regular prop. It will be removed from the JSX Element type in a future release."
      )), l = this.props.ref, l !== void 0 ? l : null;
    }
    function p(l, g, w, N, J, G) {
      return w = G.ref, l = {
        $$typeof: x,
        type: l,
        key: g,
        props: G,
        _owner: J
      }, (w !== void 0 ? w : null) !== null ? Object.defineProperty(l, "ref", {
        enumerable: !1,
        get: f
      }) : Object.defineProperty(l, "ref", { enumerable: !1, value: null }), l._store = {}, Object.defineProperty(l._store, "validated", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: 0
      }), Object.defineProperty(l, "_debugInfo", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: null
      }), Object.freeze && (Object.freeze(l.props), Object.freeze(l)), l;
    }
    function m(l, g, w, N, J, G) {
      if (typeof l == "string" || typeof l == "function" || l === A || l === v || l === S || l === Q || l === fe || l === I || typeof l == "object" && l !== null && (l.$$typeof === z || l.$$typeof === K || l.$$typeof === O || l.$$typeof === C || l.$$typeof === he || l.$$typeof === pe || l.getModuleId !== void 0)) {
        var R = g.children;
        if (R !== void 0)
          if (N)
            if (V(R)) {
              for (N = 0; N < R.length; N++)
                E(R[N], l);
              Object.freeze && Object.freeze(R);
            } else
              console.error(
                "React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead."
              );
          else E(R, l);
      } else
        R = "", (l === void 0 || typeof l == "object" && l !== null && Object.keys(l).length === 0) && (R += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports."), l === null ? N = "null" : V(l) ? N = "array" : l !== void 0 && l.$$typeof === x ? (N = "<" + (a(l.type) || "Unknown") + " />", R = " Did you accidentally export a JSX literal instead of a component?") : N = typeof l, console.error(
          "React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s",
          N,
          R
        );
      if (ue.call(g, "key")) {
        R = a(l);
        var we = Object.keys(g).filter(function(ne) {
          return ne !== "key";
        });
        N = 0 < we.length ? "{key: someKey, " + we.join(": ..., ") + ": ...}" : "{key: someKey}", Y[R + N] || (we = 0 < we.length ? "{" + we.join(": ..., ") + ": ...}" : "{}", console.error(
          `A props object containing a "key" prop is being spread into JSX:
  let props = %s;
  <%s {...props} />
React keys must be passed directly to JSX without using spread:
  let props = %s;
  <%s key={someKey} {...props} />`,
          N,
          R,
          we,
          R
        ), Y[R + N] = !0);
      }
      if (R = null, w !== void 0 && (t(w), R = "" + w), d(g) && (t(g.key), R = "" + g.key), "key" in g) {
        w = {};
        for (var Ue in g)
          Ue !== "key" && (w[Ue] = g[Ue]);
      } else w = g;
      return R && u(
        w,
        typeof l == "function" ? l.displayName || l.name || "Unknown" : l
      ), p(l, R, G, J, h(), w);
    }
    function E(l, g) {
      if (typeof l == "object" && l && l.$$typeof !== Ze) {
        if (V(l))
          for (var w = 0; w < l.length; w++) {
            var N = l[w];
            y(N) && b(N, g);
          }
        else if (y(l))
          l._store && (l._store.validated = 1);
        else if (l === null || typeof l != "object" ? w = null : (w = Z && l[Z] || l["@@iterator"], w = typeof w == "function" ? w : null), typeof w == "function" && w !== l.entries && (w = w.call(l), w !== l))
          for (; !(l = w.next()).done; )
            y(l.value) && b(l.value, g);
      }
    }
    function y(l) {
      return typeof l == "object" && l !== null && l.$$typeof === x;
    }
    function b(l, g) {
      if (l._store && !l._store.validated && l.key == null && (l._store.validated = 1, g = M(g), !q[g])) {
        q[g] = !0;
        var w = "";
        l && l._owner != null && l._owner !== h() && (w = null, typeof l._owner.tag == "number" ? w = a(l._owner.type) : typeof l._owner.name == "string" && (w = l._owner.name), w = " It was passed a child from " + w + ".");
        var N = H.getCurrentStack;
        H.getCurrentStack = function() {
          var J = c(l.type);
          return N && (J += N() || ""), J;
        }, console.error(
          'Each child in a list should have a unique "key" prop.%s%s See https://react.dev/link/warning-keys for more information.',
          g,
          w
        ), H.getCurrentStack = N;
      }
    }
    function M(l) {
      var g = "", w = h();
      return w && (w = a(w.type)) && (g = `

Check the render method of \`` + w + "`."), g || (l = a(l)) && (g = `

Check the top-level render call using <` + l + ">."), g;
    }
    var L = ve, x = Symbol.for("react.transitional.element"), X = Symbol.for("react.portal"), A = Symbol.for("react.fragment"), S = Symbol.for("react.strict_mode"), v = Symbol.for("react.profiler"), C = Symbol.for("react.consumer"), O = Symbol.for("react.context"), he = Symbol.for("react.forward_ref"), Q = Symbol.for("react.suspense"), fe = Symbol.for("react.suspense_list"), K = Symbol.for("react.memo"), z = Symbol.for("react.lazy"), I = Symbol.for("react.offscreen"), Z = Symbol.iterator, oe = Symbol.for("react.client.reference"), H = L.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, ue = Object.prototype.hasOwnProperty, $ = Object.assign, pe = Symbol.for("react.client.reference"), V = Array.isArray, te = 0, at, He, Ke, Ae, ct, Fe, ye;
    i.__reactDisabledLog = !0;
    var Le, Oe, re = !1, Se = new (typeof WeakMap == "function" ? WeakMap : Map)(), Ze = Symbol.for("react.client.reference"), Ve, D = {}, Y = {}, q = {};
    $e.Fragment = A, $e.jsx = function(l, g, w, N, J) {
      return m(l, g, w, !1, N, J);
    }, $e.jsxs = function(l, g, w, N, J) {
      return m(l, g, w, !0, N, J);
    };
  }()), $e;
}
var Qt;
function As() {
  return Qt || (Qt = 1, process.env.NODE_ENV === "production" ? ut.exports = Ts() : ut.exports = Es()), ut.exports;
}
var k = As();
function qt(a, e) {
  if (e === Ln)
    return console.warn("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Geometry already defined as triangles."), a;
  if (e === Nt || e === mn) {
    let t = a.getIndex();
    if (t === null) {
      const s = [], r = a.getAttribute("position");
      if (r !== void 0) {
        for (let c = 0; c < r.count; c++)
          s.push(c);
        a.setIndex(s), t = a.getIndex();
      } else
        return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Undefined position attribute. Processing not possible."), a;
    }
    const i = t.count - 2, n = [];
    if (e === Nt)
      for (let s = 1; s <= i; s++)
        n.push(t.getX(0)), n.push(t.getX(s)), n.push(t.getX(s + 1));
    else
      for (let s = 0; s < i; s++)
        s % 2 === 0 ? (n.push(t.getX(s)), n.push(t.getX(s + 1)), n.push(t.getX(s + 2))) : (n.push(t.getX(s + 2)), n.push(t.getX(s + 1)), n.push(t.getX(s)));
    n.length / 3 !== i && console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unable to generate correct amount of triangles.");
    const o = a.clone();
    return o.setIndex(n), o.clearGroups(), o;
  } else
    return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unknown draw mode:", e), a;
}
class Ss extends On {
  constructor(e) {
    super(e), this.dracoLoader = null, this.ktx2Loader = null, this.meshoptDecoder = null, this.pluginCallbacks = [], this.register(function(t) {
      return new Cs(t);
    }), this.register(function(t) {
      return new Ls(t);
    }), this.register(function(t) {
      return new Us(t);
    }), this.register(function(t) {
      return new zs(t);
    }), this.register(function(t) {
      return new Bs(t);
    }), this.register(function(t) {
      return new Is(t);
    }), this.register(function(t) {
      return new Ds(t);
    }), this.register(function(t) {
      return new Ns(t);
    }), this.register(function(t) {
      return new js(t);
    }), this.register(function(t) {
      return new vs(t);
    }), this.register(function(t) {
      return new ks(t);
    }), this.register(function(t) {
      return new Os(t);
    }), this.register(function(t) {
      return new Fs(t);
    }), this.register(function(t) {
      return new Hs(t);
    }), this.register(function(t) {
      return new Rs(t);
    }), this.register(function(t) {
      return new Gs(t);
    }), this.register(function(t) {
      return new Ys(t);
    });
  }
  load(e, t, i, n) {
    const o = this;
    let s;
    if (this.resourcePath !== "")
      s = this.resourcePath;
    else if (this.path !== "") {
      const h = it.extractUrlBase(e);
      s = it.resolveURL(h, this.path);
    } else
      s = it.extractUrlBase(e);
    this.manager.itemStart(e);
    const r = function(h) {
      n ? n(h) : console.error(h), o.manager.itemError(e), o.manager.itemEnd(e);
    }, c = new gn(this.manager);
    c.setPath(this.path), c.setResponseType("arraybuffer"), c.setRequestHeader(this.requestHeader), c.setWithCredentials(this.withCredentials), c.load(e, function(h) {
      try {
        o.parse(h, s, function(d) {
          t(d), o.manager.itemEnd(e);
        }, r);
      } catch (d) {
        r(d);
      }
    }, i, r);
  }
  setDRACOLoader(e) {
    return this.dracoLoader = e, this;
  }
  setKTX2Loader(e) {
    return this.ktx2Loader = e, this;
  }
  setMeshoptDecoder(e) {
    return this.meshoptDecoder = e, this;
  }
  register(e) {
    return this.pluginCallbacks.indexOf(e) === -1 && this.pluginCallbacks.push(e), this;
  }
  unregister(e) {
    return this.pluginCallbacks.indexOf(e) !== -1 && this.pluginCallbacks.splice(this.pluginCallbacks.indexOf(e), 1), this;
  }
  parse(e, t, i, n) {
    let o;
    const s = {}, r = {}, c = new TextDecoder();
    if (typeof e == "string")
      o = JSON.parse(e);
    else if (e instanceof ArrayBuffer)
      if (c.decode(new Uint8Array(e, 0, 4)) === Mn) {
        try {
          s[P.KHR_BINARY_GLTF] = new Xs(e);
        } catch (u) {
          n && n(u);
          return;
        }
        o = JSON.parse(s[P.KHR_BINARY_GLTF].content);
      } else
        o = JSON.parse(c.decode(e));
    else
      o = e;
    if (o.asset === void 0 || o.asset.version[0] < 2) {
      n && n(new Error("THREE.GLTFLoader: Unsupported asset. glTF versions >=2.0 are supported."));
      return;
    }
    const h = new ii(o, {
      path: t || this.resourcePath || "",
      crossOrigin: this.crossOrigin,
      requestHeader: this.requestHeader,
      manager: this.manager,
      ktx2Loader: this.ktx2Loader,
      meshoptDecoder: this.meshoptDecoder
    });
    h.fileLoader.setRequestHeader(this.requestHeader);
    for (let d = 0; d < this.pluginCallbacks.length; d++) {
      const u = this.pluginCallbacks[d](h);
      u.name || console.error("THREE.GLTFLoader: Invalid plugin found: missing name"), r[u.name] = u, s[u.name] = !0;
    }
    if (o.extensionsUsed)
      for (let d = 0; d < o.extensionsUsed.length; ++d) {
        const u = o.extensionsUsed[d], f = o.extensionsRequired || [];
        switch (u) {
          case P.KHR_MATERIALS_UNLIT:
            s[u] = new Ps();
            break;
          case P.KHR_DRACO_MESH_COMPRESSION:
            s[u] = new Ks(o, this.dracoLoader);
            break;
          case P.KHR_TEXTURE_TRANSFORM:
            s[u] = new Zs();
            break;
          case P.KHR_MESH_QUANTIZATION:
            s[u] = new Vs();
            break;
          default:
            f.indexOf(u) >= 0 && r[u] === void 0 && console.warn('THREE.GLTFLoader: Unknown extension "' + u + '".');
        }
      }
    h.setExtensions(s), h.setPlugins(r), h.parse(i, n);
  }
  parseAsync(e, t) {
    const i = this;
    return new Promise(function(n, o) {
      i.parse(e, t, n, o);
    });
  }
}
function Ms() {
  let a = {};
  return {
    get: function(e) {
      return a[e];
    },
    add: function(e, t) {
      a[e] = t;
    },
    remove: function(e) {
      delete a[e];
    },
    removeAll: function() {
      a = {};
    }
  };
}
const P = {
  KHR_BINARY_GLTF: "KHR_binary_glTF",
  KHR_DRACO_MESH_COMPRESSION: "KHR_draco_mesh_compression",
  KHR_LIGHTS_PUNCTUAL: "KHR_lights_punctual",
  KHR_MATERIALS_CLEARCOAT: "KHR_materials_clearcoat",
  KHR_MATERIALS_DISPERSION: "KHR_materials_dispersion",
  KHR_MATERIALS_IOR: "KHR_materials_ior",
  KHR_MATERIALS_SHEEN: "KHR_materials_sheen",
  KHR_MATERIALS_SPECULAR: "KHR_materials_specular",
  KHR_MATERIALS_TRANSMISSION: "KHR_materials_transmission",
  KHR_MATERIALS_IRIDESCENCE: "KHR_materials_iridescence",
  KHR_MATERIALS_ANISOTROPY: "KHR_materials_anisotropy",
  KHR_MATERIALS_UNLIT: "KHR_materials_unlit",
  KHR_MATERIALS_VOLUME: "KHR_materials_volume",
  KHR_TEXTURE_BASISU: "KHR_texture_basisu",
  KHR_TEXTURE_TRANSFORM: "KHR_texture_transform",
  KHR_MESH_QUANTIZATION: "KHR_mesh_quantization",
  KHR_MATERIALS_EMISSIVE_STRENGTH: "KHR_materials_emissive_strength",
  EXT_MATERIALS_BUMP: "EXT_materials_bump",
  EXT_TEXTURE_WEBP: "EXT_texture_webp",
  EXT_TEXTURE_AVIF: "EXT_texture_avif",
  EXT_MESHOPT_COMPRESSION: "EXT_meshopt_compression",
  EXT_MESH_GPU_INSTANCING: "EXT_mesh_gpu_instancing"
};
class Rs {
  constructor(e) {
    this.parser = e, this.name = P.KHR_LIGHTS_PUNCTUAL, this.cache = { refs: {}, uses: {} };
  }
  _markDefs() {
    const e = this.parser, t = this.parser.json.nodes || [];
    for (let i = 0, n = t.length; i < n; i++) {
      const o = t[i];
      o.extensions && o.extensions[this.name] && o.extensions[this.name].light !== void 0 && e._addNodeRef(this.cache, o.extensions[this.name].light);
    }
  }
  _loadLight(e) {
    const t = this.parser, i = "light:" + e;
    let n = t.cache.get(i);
    if (n) return n;
    const o = t.json, c = ((o.extensions && o.extensions[this.name] || {}).lights || [])[e];
    let h;
    const d = new Ce(16777215);
    c.color !== void 0 && d.setRGB(c.color[0], c.color[1], c.color[2], Ee);
    const u = c.range !== void 0 ? c.range : 0;
    switch (c.type) {
      case "directional":
        h = new Nn(d), h.target.position.set(0, 0, -1), h.add(h.target);
        break;
      case "point":
        h = new Dn(d), h.distance = u;
        break;
      case "spot":
        h = new In(d), h.distance = u, c.spot = c.spot || {}, c.spot.innerConeAngle = c.spot.innerConeAngle !== void 0 ? c.spot.innerConeAngle : 0, c.spot.outerConeAngle = c.spot.outerConeAngle !== void 0 ? c.spot.outerConeAngle : Math.PI / 4, h.angle = c.spot.outerConeAngle, h.penumbra = 1 - c.spot.innerConeAngle / c.spot.outerConeAngle, h.target.position.set(0, 0, -1), h.add(h.target);
        break;
      default:
        throw new Error("THREE.GLTFLoader: Unexpected light type: " + c.type);
    }
    return h.position.set(0, 0, 0), h.decay = 2, Te(h, c), c.intensity !== void 0 && (h.intensity = c.intensity), h.name = t.createUniqueName(c.name || "light_" + e), n = Promise.resolve(h), t.cache.add(i, n), n;
  }
  getDependency(e, t) {
    if (e === "light")
      return this._loadLight(t);
  }
  createNodeAttachment(e) {
    const t = this, i = this.parser, o = i.json.nodes[e], r = (o.extensions && o.extensions[this.name] || {}).light;
    return r === void 0 ? null : this._loadLight(r).then(function(c) {
      return i._getNodeRef(t.cache, r, c);
    });
  }
}
class Ps {
  constructor() {
    this.name = P.KHR_MATERIALS_UNLIT;
  }
  getMaterialType() {
    return ke;
  }
  extendParams(e, t, i) {
    const n = [];
    e.color = new Ce(1, 1, 1), e.opacity = 1;
    const o = t.pbrMetallicRoughness;
    if (o) {
      if (Array.isArray(o.baseColorFactor)) {
        const s = o.baseColorFactor;
        e.color.setRGB(s[0], s[1], s[2], Ee), e.opacity = s[3];
      }
      o.baseColorTexture !== void 0 && n.push(i.assignTexture(e, "map", o.baseColorTexture, ot));
    }
    return Promise.all(n);
  }
}
class vs {
  constructor(e) {
    this.parser = e, this.name = P.KHR_MATERIALS_EMISSIVE_STRENGTH;
  }
  extendMaterialParams(e, t) {
    const n = this.parser.json.materials[e];
    if (!n.extensions || !n.extensions[this.name])
      return Promise.resolve();
    const o = n.extensions[this.name].emissiveStrength;
    return o !== void 0 && (t.emissiveIntensity = o), Promise.resolve();
  }
}
class Cs {
  constructor(e) {
    this.parser = e, this.name = P.KHR_MATERIALS_CLEARCOAT;
  }
  getMaterialType(e) {
    const i = this.parser.json.materials[e];
    return !i.extensions || !i.extensions[this.name] ? null : _e;
  }
  extendMaterialParams(e, t) {
    const i = this.parser, n = i.json.materials[e];
    if (!n.extensions || !n.extensions[this.name])
      return Promise.resolve();
    const o = [], s = n.extensions[this.name];
    if (s.clearcoatFactor !== void 0 && (t.clearcoat = s.clearcoatFactor), s.clearcoatTexture !== void 0 && o.push(i.assignTexture(t, "clearcoatMap", s.clearcoatTexture)), s.clearcoatRoughnessFactor !== void 0 && (t.clearcoatRoughness = s.clearcoatRoughnessFactor), s.clearcoatRoughnessTexture !== void 0 && o.push(i.assignTexture(t, "clearcoatRoughnessMap", s.clearcoatRoughnessTexture)), s.clearcoatNormalTexture !== void 0 && (o.push(i.assignTexture(t, "clearcoatNormalMap", s.clearcoatNormalTexture)), s.clearcoatNormalTexture.scale !== void 0)) {
      const r = s.clearcoatNormalTexture.scale;
      t.clearcoatNormalScale = new ie(r, r);
    }
    return Promise.all(o);
  }
}
class Ls {
  constructor(e) {
    this.parser = e, this.name = P.KHR_MATERIALS_DISPERSION;
  }
  getMaterialType(e) {
    const i = this.parser.json.materials[e];
    return !i.extensions || !i.extensions[this.name] ? null : _e;
  }
  extendMaterialParams(e, t) {
    const n = this.parser.json.materials[e];
    if (!n.extensions || !n.extensions[this.name])
      return Promise.resolve();
    const o = n.extensions[this.name];
    return t.dispersion = o.dispersion !== void 0 ? o.dispersion : 0, Promise.resolve();
  }
}
class Os {
  constructor(e) {
    this.parser = e, this.name = P.KHR_MATERIALS_IRIDESCENCE;
  }
  getMaterialType(e) {
    const i = this.parser.json.materials[e];
    return !i.extensions || !i.extensions[this.name] ? null : _e;
  }
  extendMaterialParams(e, t) {
    const i = this.parser, n = i.json.materials[e];
    if (!n.extensions || !n.extensions[this.name])
      return Promise.resolve();
    const o = [], s = n.extensions[this.name];
    return s.iridescenceFactor !== void 0 && (t.iridescence = s.iridescenceFactor), s.iridescenceTexture !== void 0 && o.push(i.assignTexture(t, "iridescenceMap", s.iridescenceTexture)), s.iridescenceIor !== void 0 && (t.iridescenceIOR = s.iridescenceIor), t.iridescenceThicknessRange === void 0 && (t.iridescenceThicknessRange = [100, 400]), s.iridescenceThicknessMinimum !== void 0 && (t.iridescenceThicknessRange[0] = s.iridescenceThicknessMinimum), s.iridescenceThicknessMaximum !== void 0 && (t.iridescenceThicknessRange[1] = s.iridescenceThicknessMaximum), s.iridescenceThicknessTexture !== void 0 && o.push(i.assignTexture(t, "iridescenceThicknessMap", s.iridescenceThicknessTexture)), Promise.all(o);
  }
}
class Is {
  constructor(e) {
    this.parser = e, this.name = P.KHR_MATERIALS_SHEEN;
  }
  getMaterialType(e) {
    const i = this.parser.json.materials[e];
    return !i.extensions || !i.extensions[this.name] ? null : _e;
  }
  extendMaterialParams(e, t) {
    const i = this.parser, n = i.json.materials[e];
    if (!n.extensions || !n.extensions[this.name])
      return Promise.resolve();
    const o = [];
    t.sheenColor = new Ce(0, 0, 0), t.sheenRoughness = 0, t.sheen = 1;
    const s = n.extensions[this.name];
    if (s.sheenColorFactor !== void 0) {
      const r = s.sheenColorFactor;
      t.sheenColor.setRGB(r[0], r[1], r[2], Ee);
    }
    return s.sheenRoughnessFactor !== void 0 && (t.sheenRoughness = s.sheenRoughnessFactor), s.sheenColorTexture !== void 0 && o.push(i.assignTexture(t, "sheenColorMap", s.sheenColorTexture, ot)), s.sheenRoughnessTexture !== void 0 && o.push(i.assignTexture(t, "sheenRoughnessMap", s.sheenRoughnessTexture)), Promise.all(o);
  }
}
class Ds {
  constructor(e) {
    this.parser = e, this.name = P.KHR_MATERIALS_TRANSMISSION;
  }
  getMaterialType(e) {
    const i = this.parser.json.materials[e];
    return !i.extensions || !i.extensions[this.name] ? null : _e;
  }
  extendMaterialParams(e, t) {
    const i = this.parser, n = i.json.materials[e];
    if (!n.extensions || !n.extensions[this.name])
      return Promise.resolve();
    const o = [], s = n.extensions[this.name];
    return s.transmissionFactor !== void 0 && (t.transmission = s.transmissionFactor), s.transmissionTexture !== void 0 && o.push(i.assignTexture(t, "transmissionMap", s.transmissionTexture)), Promise.all(o);
  }
}
class Ns {
  constructor(e) {
    this.parser = e, this.name = P.KHR_MATERIALS_VOLUME;
  }
  getMaterialType(e) {
    const i = this.parser.json.materials[e];
    return !i.extensions || !i.extensions[this.name] ? null : _e;
  }
  extendMaterialParams(e, t) {
    const i = this.parser, n = i.json.materials[e];
    if (!n.extensions || !n.extensions[this.name])
      return Promise.resolve();
    const o = [], s = n.extensions[this.name];
    t.thickness = s.thicknessFactor !== void 0 ? s.thicknessFactor : 0, s.thicknessTexture !== void 0 && o.push(i.assignTexture(t, "thicknessMap", s.thicknessTexture)), t.attenuationDistance = s.attenuationDistance || 1 / 0;
    const r = s.attenuationColor || [1, 1, 1];
    return t.attenuationColor = new Ce().setRGB(r[0], r[1], r[2], Ee), Promise.all(o);
  }
}
class js {
  constructor(e) {
    this.parser = e, this.name = P.KHR_MATERIALS_IOR;
  }
  getMaterialType(e) {
    const i = this.parser.json.materials[e];
    return !i.extensions || !i.extensions[this.name] ? null : _e;
  }
  extendMaterialParams(e, t) {
    const n = this.parser.json.materials[e];
    if (!n.extensions || !n.extensions[this.name])
      return Promise.resolve();
    const o = n.extensions[this.name];
    return t.ior = o.ior !== void 0 ? o.ior : 1.5, Promise.resolve();
  }
}
class ks {
  constructor(e) {
    this.parser = e, this.name = P.KHR_MATERIALS_SPECULAR;
  }
  getMaterialType(e) {
    const i = this.parser.json.materials[e];
    return !i.extensions || !i.extensions[this.name] ? null : _e;
  }
  extendMaterialParams(e, t) {
    const i = this.parser, n = i.json.materials[e];
    if (!n.extensions || !n.extensions[this.name])
      return Promise.resolve();
    const o = [], s = n.extensions[this.name];
    t.specularIntensity = s.specularFactor !== void 0 ? s.specularFactor : 1, s.specularTexture !== void 0 && o.push(i.assignTexture(t, "specularIntensityMap", s.specularTexture));
    const r = s.specularColorFactor || [1, 1, 1];
    return t.specularColor = new Ce().setRGB(r[0], r[1], r[2], Ee), s.specularColorTexture !== void 0 && o.push(i.assignTexture(t, "specularColorMap", s.specularColorTexture, ot)), Promise.all(o);
  }
}
class Hs {
  constructor(e) {
    this.parser = e, this.name = P.EXT_MATERIALS_BUMP;
  }
  getMaterialType(e) {
    const i = this.parser.json.materials[e];
    return !i.extensions || !i.extensions[this.name] ? null : _e;
  }
  extendMaterialParams(e, t) {
    const i = this.parser, n = i.json.materials[e];
    if (!n.extensions || !n.extensions[this.name])
      return Promise.resolve();
    const o = [], s = n.extensions[this.name];
    return t.bumpScale = s.bumpFactor !== void 0 ? s.bumpFactor : 1, s.bumpTexture !== void 0 && o.push(i.assignTexture(t, "bumpMap", s.bumpTexture)), Promise.all(o);
  }
}
class Fs {
  constructor(e) {
    this.parser = e, this.name = P.KHR_MATERIALS_ANISOTROPY;
  }
  getMaterialType(e) {
    const i = this.parser.json.materials[e];
    return !i.extensions || !i.extensions[this.name] ? null : _e;
  }
  extendMaterialParams(e, t) {
    const i = this.parser, n = i.json.materials[e];
    if (!n.extensions || !n.extensions[this.name])
      return Promise.resolve();
    const o = [], s = n.extensions[this.name];
    return s.anisotropyStrength !== void 0 && (t.anisotropy = s.anisotropyStrength), s.anisotropyRotation !== void 0 && (t.anisotropyRotation = s.anisotropyRotation), s.anisotropyTexture !== void 0 && o.push(i.assignTexture(t, "anisotropyMap", s.anisotropyTexture)), Promise.all(o);
  }
}
class Us {
  constructor(e) {
    this.parser = e, this.name = P.KHR_TEXTURE_BASISU;
  }
  loadTexture(e) {
    const t = this.parser, i = t.json, n = i.textures[e];
    if (!n.extensions || !n.extensions[this.name])
      return null;
    const o = n.extensions[this.name], s = t.options.ktx2Loader;
    if (!s) {
      if (i.extensionsRequired && i.extensionsRequired.indexOf(this.name) >= 0)
        throw new Error("THREE.GLTFLoader: setKTX2Loader must be called before loading KTX2 textures");
      return null;
    }
    return t.loadTextureImage(e, o.source, s);
  }
}
class zs {
  constructor(e) {
    this.parser = e, this.name = P.EXT_TEXTURE_WEBP, this.isSupported = null;
  }
  loadTexture(e) {
    const t = this.name, i = this.parser, n = i.json, o = n.textures[e];
    if (!o.extensions || !o.extensions[t])
      return null;
    const s = o.extensions[t], r = n.images[s.source];
    let c = i.textureLoader;
    if (r.uri) {
      const h = i.options.manager.getHandler(r.uri);
      h !== null && (c = h);
    }
    return this.detectSupport().then(function(h) {
      if (h) return i.loadTextureImage(e, s.source, c);
      if (n.extensionsRequired && n.extensionsRequired.indexOf(t) >= 0)
        throw new Error("THREE.GLTFLoader: WebP required by asset but unsupported.");
      return i.loadTexture(e);
    });
  }
  detectSupport() {
    return this.isSupported || (this.isSupported = new Promise(function(e) {
      const t = new Image();
      t.src = "data:image/webp;base64,UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA", t.onload = t.onerror = function() {
        e(t.height === 1);
      };
    })), this.isSupported;
  }
}
class Bs {
  constructor(e) {
    this.parser = e, this.name = P.EXT_TEXTURE_AVIF, this.isSupported = null;
  }
  loadTexture(e) {
    const t = this.name, i = this.parser, n = i.json, o = n.textures[e];
    if (!o.extensions || !o.extensions[t])
      return null;
    const s = o.extensions[t], r = n.images[s.source];
    let c = i.textureLoader;
    if (r.uri) {
      const h = i.options.manager.getHandler(r.uri);
      h !== null && (c = h);
    }
    return this.detectSupport().then(function(h) {
      if (h) return i.loadTextureImage(e, s.source, c);
      if (n.extensionsRequired && n.extensionsRequired.indexOf(t) >= 0)
        throw new Error("THREE.GLTFLoader: AVIF required by asset but unsupported.");
      return i.loadTexture(e);
    });
  }
  detectSupport() {
    return this.isSupported || (this.isSupported = new Promise(function(e) {
      const t = new Image();
      t.src = "data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAABcAAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAEAAAABAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQAMAAAAABNjb2xybmNseAACAAIABoAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAAB9tZGF0EgAKCBgABogQEDQgMgkQAAAAB8dSLfI=", t.onload = t.onerror = function() {
        e(t.height === 1);
      };
    })), this.isSupported;
  }
}
class Gs {
  constructor(e) {
    this.name = P.EXT_MESHOPT_COMPRESSION, this.parser = e;
  }
  loadBufferView(e) {
    const t = this.parser.json, i = t.bufferViews[e];
    if (i.extensions && i.extensions[this.name]) {
      const n = i.extensions[this.name], o = this.parser.getDependency("buffer", n.buffer), s = this.parser.options.meshoptDecoder;
      if (!s || !s.supported) {
        if (t.extensionsRequired && t.extensionsRequired.indexOf(this.name) >= 0)
          throw new Error("THREE.GLTFLoader: setMeshoptDecoder must be called before loading compressed files");
        return null;
      }
      return o.then(function(r) {
        const c = n.byteOffset || 0, h = n.byteLength || 0, d = n.count, u = n.byteStride, f = new Uint8Array(r, c, h);
        return s.decodeGltfBufferAsync ? s.decodeGltfBufferAsync(d, u, f, n.mode, n.filter).then(function(p) {
          return p.buffer;
        }) : s.ready.then(function() {
          const p = new ArrayBuffer(d * u);
          return s.decodeGltfBuffer(new Uint8Array(p), d, u, f, n.mode, n.filter), p;
        });
      });
    } else
      return null;
  }
}
class Ys {
  constructor(e) {
    this.name = P.EXT_MESH_GPU_INSTANCING, this.parser = e;
  }
  createNodeMesh(e) {
    const t = this.parser.json, i = t.nodes[e];
    if (!i.extensions || !i.extensions[this.name] || i.mesh === void 0)
      return null;
    const n = t.meshes[i.mesh];
    for (const h of n.primitives)
      if (h.mode !== de.TRIANGLES && h.mode !== de.TRIANGLE_STRIP && h.mode !== de.TRIANGLE_FAN && h.mode !== void 0)
        return null;
    const s = i.extensions[this.name].attributes, r = [], c = {};
    for (const h in s)
      r.push(this.parser.getDependency("accessor", s[h]).then((d) => (c[h] = d, c[h])));
    return r.length < 1 ? null : (r.push(this.parser.createNodeMesh(e)), Promise.all(r).then((h) => {
      const d = h.pop(), u = d.isGroup ? d.children : [d], f = h[0].count, p = [];
      for (const m of u) {
        const E = new Xe(), y = new T(), b = new le(), M = new T(1, 1, 1), L = new jn(m.geometry, m.material, f);
        for (let x = 0; x < f; x++)
          c.TRANSLATION && y.fromBufferAttribute(c.TRANSLATION, x), c.ROTATION && b.fromBufferAttribute(c.ROTATION, x), c.SCALE && M.fromBufferAttribute(c.SCALE, x), L.setMatrixAt(x, E.compose(y, b, M));
        for (const x in c)
          if (x === "_COLOR_0") {
            const X = c[x];
            L.instanceColor = new kn(X.array, X.itemSize, X.normalized);
          } else x !== "TRANSLATION" && x !== "ROTATION" && x !== "SCALE" && m.geometry.setAttribute(x, c[x]);
        rt.prototype.copy.call(L, m), this.parser.assignFinalMaterial(L), p.push(L);
      }
      return d.isGroup ? (d.clear(), d.add(...p), d) : p[0];
    }));
  }
}
const Mn = "glTF", Je = 12, $t = { JSON: 1313821514, BIN: 5130562 };
class Xs {
  constructor(e) {
    this.name = P.KHR_BINARY_GLTF, this.content = null, this.body = null;
    const t = new DataView(e, 0, Je), i = new TextDecoder();
    if (this.header = {
      magic: i.decode(new Uint8Array(e.slice(0, 4))),
      version: t.getUint32(4, !0),
      length: t.getUint32(8, !0)
    }, this.header.magic !== Mn)
      throw new Error("THREE.GLTFLoader: Unsupported glTF-Binary header.");
    if (this.header.version < 2)
      throw new Error("THREE.GLTFLoader: Legacy binary file detected.");
    const n = this.header.length - Je, o = new DataView(e, Je);
    let s = 0;
    for (; s < n; ) {
      const r = o.getUint32(s, !0);
      s += 4;
      const c = o.getUint32(s, !0);
      if (s += 4, c === $t.JSON) {
        const h = new Uint8Array(e, Je + s, r);
        this.content = i.decode(h);
      } else if (c === $t.BIN) {
        const h = Je + s;
        this.body = e.slice(h, h + r);
      }
      s += r;
    }
    if (this.content === null)
      throw new Error("THREE.GLTFLoader: JSON content not found.");
  }
}
class Ks {
  constructor(e, t) {
    if (!t)
      throw new Error("THREE.GLTFLoader: No DRACOLoader instance provided.");
    this.name = P.KHR_DRACO_MESH_COMPRESSION, this.json = e, this.dracoLoader = t, this.dracoLoader.preload();
  }
  decodePrimitive(e, t) {
    const i = this.json, n = this.dracoLoader, o = e.extensions[this.name].bufferView, s = e.extensions[this.name].attributes, r = {}, c = {}, h = {};
    for (const d in s) {
      const u = Ht[d] || d.toLowerCase();
      r[u] = s[d];
    }
    for (const d in e.attributes) {
      const u = Ht[d] || d.toLowerCase();
      if (s[d] !== void 0) {
        const f = i.accessors[e.attributes[d]], p = Ye[f.componentType];
        h[u] = p.name, c[u] = f.normalized === !0;
      }
    }
    return t.getDependency("bufferView", o).then(function(d) {
      return new Promise(function(u, f) {
        n.decodeDracoFile(d, function(p) {
          for (const m in p.attributes) {
            const E = p.attributes[m], y = c[m];
            y !== void 0 && (E.normalized = y);
          }
          u(p);
        }, r, h, Ee, f);
      });
    });
  }
}
class Zs {
  constructor() {
    this.name = P.KHR_TEXTURE_TRANSFORM;
  }
  extendTexture(e, t) {
    return (t.texCoord === void 0 || t.texCoord === e.channel) && t.offset === void 0 && t.rotation === void 0 && t.scale === void 0 || (e = e.clone(), t.texCoord !== void 0 && (e.channel = t.texCoord), t.offset !== void 0 && e.offset.fromArray(t.offset), t.rotation !== void 0 && (e.rotation = t.rotation), t.scale !== void 0 && e.repeat.fromArray(t.scale), e.needsUpdate = !0), e;
  }
}
class Vs {
  constructor() {
    this.name = P.KHR_MESH_QUANTIZATION;
  }
}
class Rn extends as {
  constructor(e, t, i, n) {
    super(e, t, i, n);
  }
  copySampleValue_(e) {
    const t = this.resultBuffer, i = this.sampleValues, n = this.valueSize, o = e * n * 3 + n;
    for (let s = 0; s !== n; s++)
      t[s] = i[o + s];
    return t;
  }
  interpolate_(e, t, i, n) {
    const o = this.resultBuffer, s = this.sampleValues, r = this.valueSize, c = r * 2, h = r * 3, d = n - t, u = (i - t) / d, f = u * u, p = f * u, m = e * h, E = m - h, y = -2 * p + 3 * f, b = p - f, M = 1 - y, L = b - f + u;
    for (let x = 0; x !== r; x++) {
      const X = s[E + x + r], A = s[E + x + c] * d, S = s[m + x + r], v = s[m + x] * d;
      o[x] = M * X + L * A + y * S + b * v;
    }
    return o;
  }
}
const Ws = new le();
class Qs extends Rn {
  interpolate_(e, t, i, n) {
    const o = super.interpolate_(e, t, i, n);
    return Ws.fromArray(o).normalize().toArray(o), o;
  }
}
const de = {
  FLOAT: 5126,
  //FLOAT_MAT2: 35674,
  FLOAT_MAT3: 35675,
  FLOAT_MAT4: 35676,
  FLOAT_VEC2: 35664,
  FLOAT_VEC3: 35665,
  FLOAT_VEC4: 35666,
  LINEAR: 9729,
  REPEAT: 10497,
  SAMPLER_2D: 35678,
  POINTS: 0,
  LINES: 1,
  LINE_LOOP: 2,
  LINE_STRIP: 3,
  TRIANGLES: 4,
  TRIANGLE_STRIP: 5,
  TRIANGLE_FAN: 6,
  UNSIGNED_BYTE: 5121,
  UNSIGNED_SHORT: 5123
}, Ye = {
  5120: Int8Array,
  5121: Uint8Array,
  5122: Int16Array,
  5123: Uint16Array,
  5125: Uint32Array,
  5126: Float32Array
}, Jt = {
  9728: yn,
  9729: jt,
  9984: $n,
  9985: Jn,
  9986: es,
  9987: _n
}, en = {
  33071: ts,
  33648: ns,
  10497: kt
}, Pt = {
  SCALAR: 1,
  VEC2: 2,
  VEC3: 3,
  VEC4: 4,
  MAT2: 4,
  MAT3: 9,
  MAT4: 16
}, Ht = {
  POSITION: "position",
  NORMAL: "normal",
  TANGENT: "tangent",
  TEXCOORD_0: "uv",
  TEXCOORD_1: "uv1",
  TEXCOORD_2: "uv2",
  TEXCOORD_3: "uv3",
  COLOR_0: "color",
  WEIGHTS_0: "skinWeight",
  JOINTS_0: "skinIndex"
}, Re = {
  scale: "scale",
  translation: "position",
  rotation: "quaternion",
  weights: "morphTargetInfluences"
}, qs = {
  CUBICSPLINE: void 0,
  // We use a custom interpolant (GLTFCubicSplineInterpolation) for CUBICSPLINE tracks. Each
  // keyframe track will be initialized with a default interpolation type, then modified.
  LINEAR: An,
  STEP: ss
}, vt = {
  OPAQUE: "OPAQUE",
  MASK: "MASK",
  BLEND: "BLEND"
};
function $s(a) {
  return a.DefaultMaterial === void 0 && (a.DefaultMaterial = new bn({
    color: 16777215,
    emissive: 0,
    metalness: 1,
    roughness: 1,
    transparent: !1,
    depthTest: !0,
    side: is
  })), a.DefaultMaterial;
}
function De(a, e, t) {
  for (const i in t.extensions)
    a[i] === void 0 && (e.userData.gltfExtensions = e.userData.gltfExtensions || {}, e.userData.gltfExtensions[i] = t.extensions[i]);
}
function Te(a, e) {
  e.extras !== void 0 && (typeof e.extras == "object" ? Object.assign(a.userData, e.extras) : console.warn("THREE.GLTFLoader: Ignoring primitive type .extras, " + e.extras));
}
function Js(a, e, t) {
  let i = !1, n = !1, o = !1;
  for (let h = 0, d = e.length; h < d; h++) {
    const u = e[h];
    if (u.POSITION !== void 0 && (i = !0), u.NORMAL !== void 0 && (n = !0), u.COLOR_0 !== void 0 && (o = !0), i && n && o) break;
  }
  if (!i && !n && !o) return Promise.resolve(a);
  const s = [], r = [], c = [];
  for (let h = 0, d = e.length; h < d; h++) {
    const u = e[h];
    if (i) {
      const f = u.POSITION !== void 0 ? t.getDependency("accessor", u.POSITION) : a.attributes.position;
      s.push(f);
    }
    if (n) {
      const f = u.NORMAL !== void 0 ? t.getDependency("accessor", u.NORMAL) : a.attributes.normal;
      r.push(f);
    }
    if (o) {
      const f = u.COLOR_0 !== void 0 ? t.getDependency("accessor", u.COLOR_0) : a.attributes.color;
      c.push(f);
    }
  }
  return Promise.all([
    Promise.all(s),
    Promise.all(r),
    Promise.all(c)
  ]).then(function(h) {
    const d = h[0], u = h[1], f = h[2];
    return i && (a.morphAttributes.position = d), n && (a.morphAttributes.normal = u), o && (a.morphAttributes.color = f), a.morphTargetsRelative = !0, a;
  });
}
function ei(a, e) {
  if (a.updateMorphTargets(), e.weights !== void 0)
    for (let t = 0, i = e.weights.length; t < i; t++)
      a.morphTargetInfluences[t] = e.weights[t];
  if (e.extras && Array.isArray(e.extras.targetNames)) {
    const t = e.extras.targetNames;
    if (a.morphTargetInfluences.length === t.length) {
      a.morphTargetDictionary = {};
      for (let i = 0, n = t.length; i < n; i++)
        a.morphTargetDictionary[t[i]] = i;
    } else
      console.warn("THREE.GLTFLoader: Invalid extras.targetNames length. Ignoring names.");
  }
}
function ti(a) {
  let e;
  const t = a.extensions && a.extensions[P.KHR_DRACO_MESH_COMPRESSION];
  if (t ? e = "draco:" + t.bufferView + ":" + t.indices + ":" + Ct(t.attributes) : e = a.indices + ":" + Ct(a.attributes) + ":" + a.mode, a.targets !== void 0)
    for (let i = 0, n = a.targets.length; i < n; i++)
      e += ":" + Ct(a.targets[i]);
  return e;
}
function Ct(a) {
  let e = "";
  const t = Object.keys(a).sort();
  for (let i = 0, n = t.length; i < n; i++)
    e += t[i] + ":" + a[t[i]] + ";";
  return e;
}
function Ft(a) {
  switch (a) {
    case Int8Array:
      return 1 / 127;
    case Uint8Array:
      return 1 / 255;
    case Int16Array:
      return 1 / 32767;
    case Uint16Array:
      return 1 / 65535;
    default:
      throw new Error("THREE.GLTFLoader: Unsupported normalized accessor component type.");
  }
}
function ni(a) {
  return a.search(/\.jpe?g($|\?)/i) > 0 || a.search(/^data\:image\/jpeg/) === 0 ? "image/jpeg" : a.search(/\.webp($|\?)/i) > 0 || a.search(/^data\:image\/webp/) === 0 ? "image/webp" : a.search(/\.ktx2($|\?)/i) > 0 || a.search(/^data\:image\/ktx2/) === 0 ? "image/ktx2" : "image/png";
}
const si = new Xe();
class ii {
  constructor(e = {}, t = {}) {
    this.json = e, this.extensions = {}, this.plugins = {}, this.options = t, this.cache = new Ms(), this.associations = /* @__PURE__ */ new Map(), this.primitiveCache = {}, this.nodeCache = {}, this.meshCache = { refs: {}, uses: {} }, this.cameraCache = { refs: {}, uses: {} }, this.lightCache = { refs: {}, uses: {} }, this.sourceCache = {}, this.textureCache = {}, this.nodeNamesUsed = {};
    let i = !1, n = -1, o = !1, s = -1;
    if (typeof navigator < "u") {
      const r = navigator.userAgent;
      i = /^((?!chrome|android).)*safari/i.test(r) === !0;
      const c = r.match(/Version\/(\d+)/);
      n = i && c ? parseInt(c[1], 10) : -1, o = r.indexOf("Firefox") > -1, s = o ? r.match(/Firefox\/([0-9]+)\./)[1] : -1;
    }
    typeof createImageBitmap > "u" || i && n < 17 || o && s < 98 ? this.textureLoader = new Hn(this.options.manager) : this.textureLoader = new Fn(this.options.manager), this.textureLoader.setCrossOrigin(this.options.crossOrigin), this.textureLoader.setRequestHeader(this.options.requestHeader), this.fileLoader = new gn(this.options.manager), this.fileLoader.setResponseType("arraybuffer"), this.options.crossOrigin === "use-credentials" && this.fileLoader.setWithCredentials(!0);
  }
  setExtensions(e) {
    this.extensions = e;
  }
  setPlugins(e) {
    this.plugins = e;
  }
  parse(e, t) {
    const i = this, n = this.json, o = this.extensions;
    this.cache.removeAll(), this.nodeCache = {}, this._invokeAll(function(s) {
      return s._markDefs && s._markDefs();
    }), Promise.all(this._invokeAll(function(s) {
      return s.beforeRoot && s.beforeRoot();
    })).then(function() {
      return Promise.all([
        i.getDependencies("scene"),
        i.getDependencies("animation"),
        i.getDependencies("camera")
      ]);
    }).then(function(s) {
      const r = {
        scene: s[0][n.scene || 0],
        scenes: s[0],
        animations: s[1],
        cameras: s[2],
        asset: n.asset,
        parser: i,
        userData: {}
      };
      return De(o, r, n), Te(r, n), Promise.all(i._invokeAll(function(c) {
        return c.afterRoot && c.afterRoot(r);
      })).then(function() {
        for (const c of r.scenes)
          c.updateMatrixWorld();
        e(r);
      });
    }).catch(t);
  }
  /**
   * Marks the special nodes/meshes in json for efficient parse.
   */
  _markDefs() {
    const e = this.json.nodes || [], t = this.json.skins || [], i = this.json.meshes || [];
    for (let n = 0, o = t.length; n < o; n++) {
      const s = t[n].joints;
      for (let r = 0, c = s.length; r < c; r++)
        e[s[r]].isBone = !0;
    }
    for (let n = 0, o = e.length; n < o; n++) {
      const s = e[n];
      s.mesh !== void 0 && (this._addNodeRef(this.meshCache, s.mesh), s.skin !== void 0 && (i[s.mesh].isSkinnedMesh = !0)), s.camera !== void 0 && this._addNodeRef(this.cameraCache, s.camera);
    }
  }
  /**
   * Counts references to shared node / Object3D resources. These resources
   * can be reused, or "instantiated", at multiple nodes in the scene
   * hierarchy. Mesh, Camera, and Light instances are instantiated and must
   * be marked. Non-scenegraph resources (like Materials, Geometries, and
   * Textures) can be reused directly and are not marked here.
   *
   * Example: CesiumMilkTruck sample model reuses "Wheel" meshes.
   */
  _addNodeRef(e, t) {
    t !== void 0 && (e.refs[t] === void 0 && (e.refs[t] = e.uses[t] = 0), e.refs[t]++);
  }
  /** Returns a reference to a shared resource, cloning it if necessary. */
  _getNodeRef(e, t, i) {
    if (e.refs[t] <= 1) return i;
    const n = i.clone(), o = (s, r) => {
      const c = this.associations.get(s);
      c != null && this.associations.set(r, c);
      for (const [h, d] of s.children.entries())
        o(d, r.children[h]);
    };
    return o(i, n), n.name += "_instance_" + e.uses[t]++, n;
  }
  _invokeOne(e) {
    const t = Object.values(this.plugins);
    t.push(this);
    for (let i = 0; i < t.length; i++) {
      const n = e(t[i]);
      if (n) return n;
    }
    return null;
  }
  _invokeAll(e) {
    const t = Object.values(this.plugins);
    t.unshift(this);
    const i = [];
    for (let n = 0; n < t.length; n++) {
      const o = e(t[n]);
      o && i.push(o);
    }
    return i;
  }
  /**
   * Requests the specified dependency asynchronously, with caching.
   * @param {string} type
   * @param {number} index
   * @return {Promise<Object3D|Material|THREE.Texture|AnimationClip|ArrayBuffer|Object>}
   */
  getDependency(e, t) {
    const i = e + ":" + t;
    let n = this.cache.get(i);
    if (!n) {
      switch (e) {
        case "scene":
          n = this.loadScene(t);
          break;
        case "node":
          n = this._invokeOne(function(o) {
            return o.loadNode && o.loadNode(t);
          });
          break;
        case "mesh":
          n = this._invokeOne(function(o) {
            return o.loadMesh && o.loadMesh(t);
          });
          break;
        case "accessor":
          n = this.loadAccessor(t);
          break;
        case "bufferView":
          n = this._invokeOne(function(o) {
            return o.loadBufferView && o.loadBufferView(t);
          });
          break;
        case "buffer":
          n = this.loadBuffer(t);
          break;
        case "material":
          n = this._invokeOne(function(o) {
            return o.loadMaterial && o.loadMaterial(t);
          });
          break;
        case "texture":
          n = this._invokeOne(function(o) {
            return o.loadTexture && o.loadTexture(t);
          });
          break;
        case "skin":
          n = this.loadSkin(t);
          break;
        case "animation":
          n = this._invokeOne(function(o) {
            return o.loadAnimation && o.loadAnimation(t);
          });
          break;
        case "camera":
          n = this.loadCamera(t);
          break;
        default:
          if (n = this._invokeOne(function(o) {
            return o != this && o.getDependency && o.getDependency(e, t);
          }), !n)
            throw new Error("Unknown type: " + e);
          break;
      }
      this.cache.add(i, n);
    }
    return n;
  }
  /**
   * Requests all dependencies of the specified type asynchronously, with caching.
   * @param {string} type
   * @return {Promise<Array<Object>>}
   */
  getDependencies(e) {
    let t = this.cache.get(e);
    if (!t) {
      const i = this, n = this.json[e + (e === "mesh" ? "es" : "s")] || [];
      t = Promise.all(n.map(function(o, s) {
        return i.getDependency(e, s);
      })), this.cache.add(e, t);
    }
    return t;
  }
  /**
   * Specification: https://github.com/KhronosGroup/glTF/blob/master/specification/2.0/README.md#buffers-and-buffer-views
   * @param {number} bufferIndex
   * @return {Promise<ArrayBuffer>}
   */
  loadBuffer(e) {
    const t = this.json.buffers[e], i = this.fileLoader;
    if (t.type && t.type !== "arraybuffer")
      throw new Error("THREE.GLTFLoader: " + t.type + " buffer type is not supported.");
    if (t.uri === void 0 && e === 0)
      return Promise.resolve(this.extensions[P.KHR_BINARY_GLTF].body);
    const n = this.options;
    return new Promise(function(o, s) {
      i.load(it.resolveURL(t.uri, n.path), o, void 0, function() {
        s(new Error('THREE.GLTFLoader: Failed to load buffer "' + t.uri + '".'));
      });
    });
  }
  /**
   * Specification: https://github.com/KhronosGroup/glTF/blob/master/specification/2.0/README.md#buffers-and-buffer-views
   * @param {number} bufferViewIndex
   * @return {Promise<ArrayBuffer>}
   */
  loadBufferView(e) {
    const t = this.json.bufferViews[e];
    return this.getDependency("buffer", t.buffer).then(function(i) {
      const n = t.byteLength || 0, o = t.byteOffset || 0;
      return i.slice(o, o + n);
    });
  }
  /**
   * Specification: https://github.com/KhronosGroup/glTF/blob/master/specification/2.0/README.md#accessors
   * @param {number} accessorIndex
   * @return {Promise<BufferAttribute|InterleavedBufferAttribute>}
   */
  loadAccessor(e) {
    const t = this, i = this.json, n = this.json.accessors[e];
    if (n.bufferView === void 0 && n.sparse === void 0) {
      const s = Pt[n.type], r = Ye[n.componentType], c = n.normalized === !0, h = new r(n.count * s);
      return Promise.resolve(new St(h, s, c));
    }
    const o = [];
    return n.bufferView !== void 0 ? o.push(this.getDependency("bufferView", n.bufferView)) : o.push(null), n.sparse !== void 0 && (o.push(this.getDependency("bufferView", n.sparse.indices.bufferView)), o.push(this.getDependency("bufferView", n.sparse.values.bufferView))), Promise.all(o).then(function(s) {
      const r = s[0], c = Pt[n.type], h = Ye[n.componentType], d = h.BYTES_PER_ELEMENT, u = d * c, f = n.byteOffset || 0, p = n.bufferView !== void 0 ? i.bufferViews[n.bufferView].byteStride : void 0, m = n.normalized === !0;
      let E, y;
      if (p && p !== u) {
        const b = Math.floor(f / p), M = "InterleavedBuffer:" + n.bufferView + ":" + n.componentType + ":" + b + ":" + n.count;
        let L = t.cache.get(M);
        L || (E = new h(r, b * p, n.count * p / d), L = new Un(E, p / d), t.cache.add(M, L)), y = new zn(L, c, f % p / d, m);
      } else
        r === null ? E = new h(n.count * c) : E = new h(r, f, n.count * c), y = new St(E, c, m);
      if (n.sparse !== void 0) {
        const b = Pt.SCALAR, M = Ye[n.sparse.indices.componentType], L = n.sparse.indices.byteOffset || 0, x = n.sparse.values.byteOffset || 0, X = new M(s[1], L, n.sparse.count * b), A = new h(s[2], x, n.sparse.count * c);
        r !== null && (y = new St(y.array.slice(), y.itemSize, y.normalized)), y.normalized = !1;
        for (let S = 0, v = X.length; S < v; S++) {
          const C = X[S];
          if (y.setX(C, A[S * c]), c >= 2 && y.setY(C, A[S * c + 1]), c >= 3 && y.setZ(C, A[S * c + 2]), c >= 4 && y.setW(C, A[S * c + 3]), c >= 5) throw new Error("THREE.GLTFLoader: Unsupported itemSize in sparse BufferAttribute.");
        }
        y.normalized = m;
      }
      return y;
    });
  }
  /**
   * Specification: https://github.com/KhronosGroup/glTF/tree/master/specification/2.0#textures
   * @param {number} textureIndex
   * @return {Promise<THREE.Texture|null>}
   */
  loadTexture(e) {
    const t = this.json, i = this.options, o = t.textures[e].source, s = t.images[o];
    let r = this.textureLoader;
    if (s.uri) {
      const c = i.manager.getHandler(s.uri);
      c !== null && (r = c);
    }
    return this.loadTextureImage(e, o, r);
  }
  loadTextureImage(e, t, i) {
    const n = this, o = this.json, s = o.textures[e], r = o.images[t], c = (r.uri || r.bufferView) + ":" + s.sampler;
    if (this.textureCache[c])
      return this.textureCache[c];
    const h = this.loadImageSource(t, i).then(function(d) {
      d.flipY = !1, d.name = s.name || r.name || "", d.name === "" && typeof r.uri == "string" && r.uri.startsWith("data:image/") === !1 && (d.name = r.uri);
      const f = (o.samplers || {})[s.sampler] || {};
      return d.magFilter = Jt[f.magFilter] || jt, d.minFilter = Jt[f.minFilter] || _n, d.wrapS = en[f.wrapS] || kt, d.wrapT = en[f.wrapT] || kt, d.generateMipmaps = !d.isCompressedTexture && d.minFilter !== yn && d.minFilter !== jt, n.associations.set(d, { textures: e }), d;
    }).catch(function() {
      return null;
    });
    return this.textureCache[c] = h, h;
  }
  loadImageSource(e, t) {
    const i = this, n = this.json, o = this.options;
    if (this.sourceCache[e] !== void 0)
      return this.sourceCache[e].then((u) => u.clone());
    const s = n.images[e], r = self.URL || self.webkitURL;
    let c = s.uri || "", h = !1;
    if (s.bufferView !== void 0)
      c = i.getDependency("bufferView", s.bufferView).then(function(u) {
        h = !0;
        const f = new Blob([u], { type: s.mimeType });
        return c = r.createObjectURL(f), c;
      });
    else if (s.uri === void 0)
      throw new Error("THREE.GLTFLoader: Image " + e + " is missing URI and bufferView");
    const d = Promise.resolve(c).then(function(u) {
      return new Promise(function(f, p) {
        let m = f;
        t.isImageBitmapLoader === !0 && (m = function(E) {
          const y = new Bt(E);
          y.needsUpdate = !0, f(y);
        }), t.load(it.resolveURL(u, o.path), m, void 0, p);
      });
    }).then(function(u) {
      return h === !0 && r.revokeObjectURL(c), Te(u, s), u.userData.mimeType = s.mimeType || ni(s.uri), u;
    }).catch(function(u) {
      throw console.error("THREE.GLTFLoader: Couldn't load texture", c), u;
    });
    return this.sourceCache[e] = d, d;
  }
  /**
   * Asynchronously assigns a texture to the given material parameters.
   * @param {Object} materialParams
   * @param {string} mapName
   * @param {Object} mapDef
   * @return {Promise<Texture>}
   */
  assignTexture(e, t, i, n) {
    const o = this;
    return this.getDependency("texture", i.index).then(function(s) {
      if (!s) return null;
      if (i.texCoord !== void 0 && i.texCoord > 0 && (s = s.clone(), s.channel = i.texCoord), o.extensions[P.KHR_TEXTURE_TRANSFORM]) {
        const r = i.extensions !== void 0 ? i.extensions[P.KHR_TEXTURE_TRANSFORM] : void 0;
        if (r) {
          const c = o.associations.get(s);
          s = o.extensions[P.KHR_TEXTURE_TRANSFORM].extendTexture(s, r), o.associations.set(s, c);
        }
      }
      return n !== void 0 && (s.colorSpace = n), e[t] = s, s;
    });
  }
  /**
   * Assigns final material to a Mesh, Line, or Points instance. The instance
   * already has a material (generated from the glTF material options alone)
   * but reuse of the same glTF material may require multiple threejs materials
   * to accommodate different primitive types, defines, etc. New materials will
   * be created if necessary, and reused from a cache.
   * @param  {Object3D} mesh Mesh, Line, or Points instance.
   */
  assignFinalMaterial(e) {
    const t = e.geometry;
    let i = e.material;
    const n = t.attributes.tangent === void 0, o = t.attributes.color !== void 0, s = t.attributes.normal === void 0;
    if (e.isPoints) {
      const r = "PointsMaterial:" + i.uuid;
      let c = this.cache.get(r);
      c || (c = new Bn(), Mt.prototype.copy.call(c, i), c.color.copy(i.color), c.map = i.map, c.sizeAttenuation = !1, this.cache.add(r, c)), i = c;
    } else if (e.isLine) {
      const r = "LineBasicMaterial:" + i.uuid;
      let c = this.cache.get(r);
      c || (c = new wn(), Mt.prototype.copy.call(c, i), c.color.copy(i.color), c.map = i.map, this.cache.add(r, c)), i = c;
    }
    if (n || o || s) {
      let r = "ClonedMaterial:" + i.uuid + ":";
      n && (r += "derivative-tangents:"), o && (r += "vertex-colors:"), s && (r += "flat-shading:");
      let c = this.cache.get(r);
      c || (c = i.clone(), o && (c.vertexColors = !0), s && (c.flatShading = !0), n && (c.normalScale && (c.normalScale.y *= -1), c.clearcoatNormalScale && (c.clearcoatNormalScale.y *= -1)), this.cache.add(r, c), this.associations.set(c, this.associations.get(i))), i = c;
    }
    e.material = i;
  }
  getMaterialType() {
    return bn;
  }
  /**
   * Specification: https://github.com/KhronosGroup/glTF/blob/master/specification/2.0/README.md#materials
   * @param {number} materialIndex
   * @return {Promise<Material>}
   */
  loadMaterial(e) {
    const t = this, i = this.json, n = this.extensions, o = i.materials[e];
    let s;
    const r = {}, c = o.extensions || {}, h = [];
    if (c[P.KHR_MATERIALS_UNLIT]) {
      const u = n[P.KHR_MATERIALS_UNLIT];
      s = u.getMaterialType(), h.push(u.extendParams(r, o, t));
    } else {
      const u = o.pbrMetallicRoughness || {};
      if (r.color = new Ce(1, 1, 1), r.opacity = 1, Array.isArray(u.baseColorFactor)) {
        const f = u.baseColorFactor;
        r.color.setRGB(f[0], f[1], f[2], Ee), r.opacity = f[3];
      }
      u.baseColorTexture !== void 0 && h.push(t.assignTexture(r, "map", u.baseColorTexture, ot)), r.metalness = u.metallicFactor !== void 0 ? u.metallicFactor : 1, r.roughness = u.roughnessFactor !== void 0 ? u.roughnessFactor : 1, u.metallicRoughnessTexture !== void 0 && (h.push(t.assignTexture(r, "metalnessMap", u.metallicRoughnessTexture)), h.push(t.assignTexture(r, "roughnessMap", u.metallicRoughnessTexture))), s = this._invokeOne(function(f) {
        return f.getMaterialType && f.getMaterialType(e);
      }), h.push(Promise.all(this._invokeAll(function(f) {
        return f.extendMaterialParams && f.extendMaterialParams(e, r);
      })));
    }
    o.doubleSided === !0 && (r.side = xn);
    const d = o.alphaMode || vt.OPAQUE;
    if (d === vt.BLEND ? (r.transparent = !0, r.depthWrite = !1) : (r.transparent = !1, d === vt.MASK && (r.alphaTest = o.alphaCutoff !== void 0 ? o.alphaCutoff : 0.5)), o.normalTexture !== void 0 && s !== ke && (h.push(t.assignTexture(r, "normalMap", o.normalTexture)), r.normalScale = new ie(1, 1), o.normalTexture.scale !== void 0)) {
      const u = o.normalTexture.scale;
      r.normalScale.set(u, u);
    }
    if (o.occlusionTexture !== void 0 && s !== ke && (h.push(t.assignTexture(r, "aoMap", o.occlusionTexture)), o.occlusionTexture.strength !== void 0 && (r.aoMapIntensity = o.occlusionTexture.strength)), o.emissiveFactor !== void 0 && s !== ke) {
      const u = o.emissiveFactor;
      r.emissive = new Ce().setRGB(u[0], u[1], u[2], Ee);
    }
    return o.emissiveTexture !== void 0 && s !== ke && h.push(t.assignTexture(r, "emissiveMap", o.emissiveTexture, ot)), Promise.all(h).then(function() {
      const u = new s(r);
      return o.name && (u.name = o.name), Te(u, o), t.associations.set(u, { materials: e }), o.extensions && De(n, u, o), u;
    });
  }
  /** When Object3D instances are targeted by animation, they need unique names. */
  createUniqueName(e) {
    const t = Gn.sanitizeNodeName(e || "");
    return t in this.nodeNamesUsed ? t + "_" + ++this.nodeNamesUsed[t] : (this.nodeNamesUsed[t] = 0, t);
  }
  /**
   * Specification: https://github.com/KhronosGroup/glTF/blob/master/specification/2.0/README.md#geometry
   *
   * Creates BufferGeometries from primitives.
   *
   * @param {Array<GLTF.Primitive>} primitives
   * @return {Promise<Array<BufferGeometry>>}
   */
  loadGeometries(e) {
    const t = this, i = this.extensions, n = this.primitiveCache;
    function o(r) {
      return i[P.KHR_DRACO_MESH_COMPRESSION].decodePrimitive(r, t).then(function(c) {
        return tn(c, r, t);
      });
    }
    const s = [];
    for (let r = 0, c = e.length; r < c; r++) {
      const h = e[r], d = ti(h), u = n[d];
      if (u)
        s.push(u.promise);
      else {
        let f;
        h.extensions && h.extensions[P.KHR_DRACO_MESH_COMPRESSION] ? f = o(h) : f = tn(new yt(), h, t), n[d] = { primitive: h, promise: f }, s.push(f);
      }
    }
    return Promise.all(s);
  }
  /**
   * Specification: https://github.com/KhronosGroup/glTF/blob/master/specification/2.0/README.md#meshes
   * @param {number} meshIndex
   * @return {Promise<Group|Mesh|SkinnedMesh>}
   */
  loadMesh(e) {
    const t = this, i = this.json, n = this.extensions, o = i.meshes[e], s = o.primitives, r = [];
    for (let c = 0, h = s.length; c < h; c++) {
      const d = s[c].material === void 0 ? $s(this.cache) : this.getDependency("material", s[c].material);
      r.push(d);
    }
    return r.push(t.loadGeometries(s)), Promise.all(r).then(function(c) {
      const h = c.slice(0, c.length - 1), d = c[c.length - 1], u = [];
      for (let p = 0, m = d.length; p < m; p++) {
        const E = d[p], y = s[p];
        let b;
        const M = h[p];
        if (y.mode === de.TRIANGLES || y.mode === de.TRIANGLE_STRIP || y.mode === de.TRIANGLE_FAN || y.mode === void 0)
          b = o.isSkinnedMesh === !0 ? new Yn(E, M) : new _(E, M), b.isSkinnedMesh === !0 && b.normalizeSkinWeights(), y.mode === de.TRIANGLE_STRIP ? b.geometry = qt(b.geometry, mn) : y.mode === de.TRIANGLE_FAN && (b.geometry = qt(b.geometry, Nt));
        else if (y.mode === de.LINES)
          b = new Xn(E, M);
        else if (y.mode === de.LINE_STRIP)
          b = new xe(E, M);
        else if (y.mode === de.LINE_LOOP)
          b = new Kn(E, M);
        else if (y.mode === de.POINTS)
          b = new Zn(E, M);
        else
          throw new Error("THREE.GLTFLoader: Primitive mode unsupported: " + y.mode);
        Object.keys(b.geometry.morphAttributes).length > 0 && ei(b, o), b.name = t.createUniqueName(o.name || "mesh_" + e), Te(b, o), y.extensions && De(n, b, y), t.assignFinalMaterial(b), u.push(b);
      }
      for (let p = 0, m = u.length; p < m; p++)
        t.associations.set(u[p], {
          meshes: e,
          primitives: p
        });
      if (u.length === 1)
        return o.extensions && De(n, u[0], o), u[0];
      const f = new Rt();
      o.extensions && De(n, f, o), t.associations.set(f, { meshes: e });
      for (let p = 0, m = u.length; p < m; p++)
        f.add(u[p]);
      return f;
    });
  }
  /**
   * Specification: https://github.com/KhronosGroup/glTF/tree/master/specification/2.0#cameras
   * @param {number} cameraIndex
   * @return {Promise<THREE.Camera>}
   */
  loadCamera(e) {
    let t;
    const i = this.json.cameras[e], n = i[i.type];
    if (!n) {
      console.warn("THREE.GLTFLoader: Missing camera parameters.");
      return;
    }
    return i.type === "perspective" ? t = new Vn(Tn.radToDeg(n.yfov), n.aspectRatio || 1, n.znear || 1, n.zfar || 2e6) : i.type === "orthographic" && (t = new En(-n.xmag, n.xmag, n.ymag, -n.ymag, n.znear, n.zfar)), i.name && (t.name = this.createUniqueName(i.name)), Te(t, i), Promise.resolve(t);
  }
  /**
   * Specification: https://github.com/KhronosGroup/glTF/tree/master/specification/2.0#skins
   * @param {number} skinIndex
   * @return {Promise<Skeleton>}
   */
  loadSkin(e) {
    const t = this.json.skins[e], i = [];
    for (let n = 0, o = t.joints.length; n < o; n++)
      i.push(this._loadNodeShallow(t.joints[n]));
    return t.inverseBindMatrices !== void 0 ? i.push(this.getDependency("accessor", t.inverseBindMatrices)) : i.push(null), Promise.all(i).then(function(n) {
      const o = n.pop(), s = n, r = [], c = [];
      for (let h = 0, d = s.length; h < d; h++) {
        const u = s[h];
        if (u) {
          r.push(u);
          const f = new Xe();
          o !== null && f.fromArray(o.array, h * 16), c.push(f);
        } else
          console.warn('THREE.GLTFLoader: Joint "%s" could not be found.', t.joints[h]);
      }
      return new Wn(r, c);
    });
  }
  /**
   * Specification: https://github.com/KhronosGroup/glTF/tree/master/specification/2.0#animations
   * @param {number} animationIndex
   * @return {Promise<AnimationClip>}
   */
  loadAnimation(e) {
    const t = this.json, i = this, n = t.animations[e], o = n.name ? n.name : "animation_" + e, s = [], r = [], c = [], h = [], d = [];
    for (let u = 0, f = n.channels.length; u < f; u++) {
      const p = n.channels[u], m = n.samplers[p.sampler], E = p.target, y = E.node, b = n.parameters !== void 0 ? n.parameters[m.input] : m.input, M = n.parameters !== void 0 ? n.parameters[m.output] : m.output;
      E.node !== void 0 && (s.push(this.getDependency("node", y)), r.push(this.getDependency("accessor", b)), c.push(this.getDependency("accessor", M)), h.push(m), d.push(E));
    }
    return Promise.all([
      Promise.all(s),
      Promise.all(r),
      Promise.all(c),
      Promise.all(h),
      Promise.all(d)
    ]).then(function(u) {
      const f = u[0], p = u[1], m = u[2], E = u[3], y = u[4], b = [];
      for (let M = 0, L = f.length; M < L; M++) {
        const x = f[M], X = p[M], A = m[M], S = E[M], v = y[M];
        if (x === void 0) continue;
        x.updateMatrix && x.updateMatrix();
        const C = i._createAnimationTracks(x, X, A, S, v);
        if (C)
          for (let O = 0; O < C.length; O++)
            b.push(C[O]);
      }
      return new Qn(o, void 0, b);
    });
  }
  createNodeMesh(e) {
    const t = this.json, i = this, n = t.nodes[e];
    return n.mesh === void 0 ? null : i.getDependency("mesh", n.mesh).then(function(o) {
      const s = i._getNodeRef(i.meshCache, n.mesh, o);
      return n.weights !== void 0 && s.traverse(function(r) {
        if (r.isMesh)
          for (let c = 0, h = n.weights.length; c < h; c++)
            r.morphTargetInfluences[c] = n.weights[c];
      }), s;
    });
  }
  /**
   * Specification: https://github.com/KhronosGroup/glTF/tree/master/specification/2.0#nodes-and-hierarchy
   * @param {number} nodeIndex
   * @return {Promise<Object3D>}
   */
  loadNode(e) {
    const t = this.json, i = this, n = t.nodes[e], o = i._loadNodeShallow(e), s = [], r = n.children || [];
    for (let h = 0, d = r.length; h < d; h++)
      s.push(i.getDependency("node", r[h]));
    const c = n.skin === void 0 ? Promise.resolve(null) : i.getDependency("skin", n.skin);
    return Promise.all([
      o,
      Promise.all(s),
      c
    ]).then(function(h) {
      const d = h[0], u = h[1], f = h[2];
      f !== null && d.traverse(function(p) {
        p.isSkinnedMesh && p.bind(f, si);
      });
      for (let p = 0, m = u.length; p < m; p++)
        d.add(u[p]);
      return d;
    });
  }
  // ._loadNodeShallow() parses a single node.
  // skin and child nodes are created and added in .loadNode() (no '_' prefix).
  _loadNodeShallow(e) {
    const t = this.json, i = this.extensions, n = this;
    if (this.nodeCache[e] !== void 0)
      return this.nodeCache[e];
    const o = t.nodes[e], s = o.name ? n.createUniqueName(o.name) : "", r = [], c = n._invokeOne(function(h) {
      return h.createNodeMesh && h.createNodeMesh(e);
    });
    return c && r.push(c), o.camera !== void 0 && r.push(n.getDependency("camera", o.camera).then(function(h) {
      return n._getNodeRef(n.cameraCache, o.camera, h);
    })), n._invokeAll(function(h) {
      return h.createNodeAttachment && h.createNodeAttachment(e);
    }).forEach(function(h) {
      r.push(h);
    }), this.nodeCache[e] = Promise.all(r).then(function(h) {
      let d;
      if (o.isBone === !0 ? d = new qn() : h.length > 1 ? d = new Rt() : h.length === 1 ? d = h[0] : d = new rt(), d !== h[0])
        for (let u = 0, f = h.length; u < f; u++)
          d.add(h[u]);
      if (o.name && (d.userData.name = o.name, d.name = s), Te(d, o), o.extensions && De(i, d, o), o.matrix !== void 0) {
        const u = new Xe();
        u.fromArray(o.matrix), d.applyMatrix4(u);
      } else
        o.translation !== void 0 && d.position.fromArray(o.translation), o.rotation !== void 0 && d.quaternion.fromArray(o.rotation), o.scale !== void 0 && d.scale.fromArray(o.scale);
      return n.associations.has(d) || n.associations.set(d, {}), n.associations.get(d).nodes = e, d;
    }), this.nodeCache[e];
  }
  /**
   * Specification: https://github.com/KhronosGroup/glTF/tree/master/specification/2.0#scenes
   * @param {number} sceneIndex
   * @return {Promise<Group>}
   */
  loadScene(e) {
    const t = this.extensions, i = this.json.scenes[e], n = this, o = new Rt();
    i.name && (o.name = n.createUniqueName(i.name)), Te(o, i), i.extensions && De(t, o, i);
    const s = i.nodes || [], r = [];
    for (let c = 0, h = s.length; c < h; c++)
      r.push(n.getDependency("node", s[c]));
    return Promise.all(r).then(function(c) {
      for (let d = 0, u = c.length; d < u; d++)
        o.add(c[d]);
      const h = (d) => {
        const u = /* @__PURE__ */ new Map();
        for (const [f, p] of n.associations)
          (f instanceof Mt || f instanceof Bt) && u.set(f, p);
        return d.traverse((f) => {
          const p = n.associations.get(f);
          p != null && u.set(f, p);
        }), u;
      };
      return n.associations = h(o), o;
    });
  }
  _createAnimationTracks(e, t, i, n, o) {
    const s = [], r = e.name ? e.name : e.uuid, c = [];
    Re[o.path] === Re.weights ? e.traverse(function(f) {
      f.morphTargetInfluences && c.push(f.name ? f.name : f.uuid);
    }) : c.push(r);
    let h;
    switch (Re[o.path]) {
      case Re.weights:
        h = Yt;
        break;
      case Re.rotation:
        h = Xt;
        break;
      case Re.position:
      case Re.scale:
        h = Gt;
        break;
      default:
        switch (i.itemSize) {
          case 1:
            h = Yt;
            break;
          case 2:
          case 3:
          default:
            h = Gt;
            break;
        }
        break;
    }
    const d = n.interpolation !== void 0 ? qs[n.interpolation] : An, u = this._getArrayFromAccessor(i);
    for (let f = 0, p = c.length; f < p; f++) {
      const m = new h(
        c[f] + "." + Re[o.path],
        t.array,
        u,
        d
      );
      n.interpolation === "CUBICSPLINE" && this._createCubicSplineTrackInterpolant(m), s.push(m);
    }
    return s;
  }
  _getArrayFromAccessor(e) {
    let t = e.array;
    if (e.normalized) {
      const i = Ft(t.constructor), n = new Float32Array(t.length);
      for (let o = 0, s = t.length; o < s; o++)
        n[o] = t[o] * i;
      t = n;
    }
    return t;
  }
  _createCubicSplineTrackInterpolant(e) {
    e.createInterpolant = function(i) {
      const n = this instanceof Xt ? Qs : Rn;
      return new n(this.times, this.values, this.getValueSize() / 3, i);
    }, e.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline = !0;
  }
}
function oi(a, e, t) {
  const i = e.attributes, n = new os();
  if (i.POSITION !== void 0) {
    const r = t.json.accessors[i.POSITION], c = r.min, h = r.max;
    if (c !== void 0 && h !== void 0) {
      if (n.set(
        new T(c[0], c[1], c[2]),
        new T(h[0], h[1], h[2])
      ), r.normalized) {
        const d = Ft(Ye[r.componentType]);
        n.min.multiplyScalar(d), n.max.multiplyScalar(d);
      }
    } else {
      console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.");
      return;
    }
  } else
    return;
  const o = e.targets;
  if (o !== void 0) {
    const r = new T(), c = new T();
    for (let h = 0, d = o.length; h < d; h++) {
      const u = o[h];
      if (u.POSITION !== void 0) {
        const f = t.json.accessors[u.POSITION], p = f.min, m = f.max;
        if (p !== void 0 && m !== void 0) {
          if (c.setX(Math.max(Math.abs(p[0]), Math.abs(m[0]))), c.setY(Math.max(Math.abs(p[1]), Math.abs(m[1]))), c.setZ(Math.max(Math.abs(p[2]), Math.abs(m[2]))), f.normalized) {
            const E = Ft(Ye[f.componentType]);
            c.multiplyScalar(E);
          }
          r.max(c);
        } else
          console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.");
      }
    }
    n.expandByVector(r);
  }
  a.boundingBox = n;
  const s = new rs();
  n.getCenter(s.center), s.radius = n.min.distanceTo(n.max) / 2, a.boundingSphere = s;
}
function tn(a, e, t) {
  const i = e.attributes, n = [];
  function o(s, r) {
    return t.getDependency("accessor", s).then(function(c) {
      a.setAttribute(r, c);
    });
  }
  for (const s in i) {
    const r = Ht[s] || s.toLowerCase();
    r in a.attributes || n.push(o(i[s], r));
  }
  if (e.indices !== void 0 && !a.index) {
    const s = t.getDependency("accessor", e.indices).then(function(r) {
      a.setIndex(r);
    });
    n.push(s);
  }
  return zt.workingColorSpace !== Ee && "COLOR_0" in i && console.warn(`THREE.GLTFLoader: Converting vertex colors from "srgb-linear" to "${zt.workingColorSpace}" not supported.`), Te(a, e), oi(a, e, t), Promise.all(n).then(function() {
    return e.targets !== void 0 ? Js(a, e.targets, t) : a;
  });
}
const nn = { type: "change" }, Ut = { type: "start" }, Pn = { type: "end" }, dt = new cs(), sn = new ls(), ri = Math.cos(70 * Tn.DEG2RAD), W = new T(), ce = 2 * Math.PI, F = {
  NONE: -1,
  ROTATE: 0,
  DOLLY: 1,
  PAN: 2,
  TOUCH_ROTATE: 3,
  TOUCH_PAN: 4,
  TOUCH_DOLLY_PAN: 5,
  TOUCH_DOLLY_ROTATE: 6
}, Lt = 1e-6;
class ai extends Sn {
  constructor(e, t = null) {
    super(e, t), this.state = F.NONE, this.enabled = !0, this.target = new T(), this.cursor = new T(), this.minDistance = 0, this.maxDistance = 1 / 0, this.minZoom = 0, this.maxZoom = 1 / 0, this.minTargetRadius = 0, this.maxTargetRadius = 1 / 0, this.minPolarAngle = 0, this.maxPolarAngle = Math.PI, this.minAzimuthAngle = -1 / 0, this.maxAzimuthAngle = 1 / 0, this.enableDamping = !1, this.dampingFactor = 0.05, this.enableZoom = !0, this.zoomSpeed = 1, this.enableRotate = !0, this.rotateSpeed = 1, this.enablePan = !0, this.panSpeed = 1, this.screenSpacePanning = !0, this.keyPanSpeed = 7, this.zoomToCursor = !1, this.autoRotate = !1, this.autoRotateSpeed = 2, this.keys = { LEFT: "ArrowLeft", UP: "ArrowUp", RIGHT: "ArrowRight", BOTTOM: "ArrowDown" }, this.mouseButtons = { LEFT: Ge.ROTATE, MIDDLE: Ge.DOLLY, RIGHT: Ge.PAN }, this.touches = { ONE: Be.ROTATE, TWO: Be.DOLLY_PAN }, this.target0 = this.target.clone(), this.position0 = this.object.position.clone(), this.zoom0 = this.object.zoom, this._domElementKeyEvents = null, this._lastPosition = new T(), this._lastQuaternion = new le(), this._lastTargetPosition = new T(), this._quat = new le().setFromUnitVectors(e.up, new T(0, 1, 0)), this._quatInverse = this._quat.clone().invert(), this._spherical = new Kt(), this._sphericalDelta = new Kt(), this._scale = 1, this._panOffset = new T(), this._rotateStart = new ie(), this._rotateEnd = new ie(), this._rotateDelta = new ie(), this._panStart = new ie(), this._panEnd = new ie(), this._panDelta = new ie(), this._dollyStart = new ie(), this._dollyEnd = new ie(), this._dollyDelta = new ie(), this._dollyDirection = new T(), this._mouse = new ie(), this._performCursorZoom = !1, this._pointers = [], this._pointerPositions = {}, this._controlActive = !1, this._onPointerMove = li.bind(this), this._onPointerDown = ci.bind(this), this._onPointerUp = hi.bind(this), this._onContextMenu = _i.bind(this), this._onMouseWheel = fi.bind(this), this._onKeyDown = pi.bind(this), this._onTouchStart = mi.bind(this), this._onTouchMove = gi.bind(this), this._onMouseDown = ui.bind(this), this._onMouseMove = di.bind(this), this._interceptControlDown = yi.bind(this), this._interceptControlUp = wi.bind(this), this.domElement !== null && this.connect(), this.update();
  }
  connect() {
    this.domElement.addEventListener("pointerdown", this._onPointerDown), this.domElement.addEventListener("pointercancel", this._onPointerUp), this.domElement.addEventListener("contextmenu", this._onContextMenu), this.domElement.addEventListener("wheel", this._onMouseWheel, { passive: !1 }), this.domElement.getRootNode().addEventListener("keydown", this._interceptControlDown, { passive: !0, capture: !0 }), this.domElement.style.touchAction = "none";
  }
  disconnect() {
    this.domElement.removeEventListener("pointerdown", this._onPointerDown), this.domElement.removeEventListener("pointermove", this._onPointerMove), this.domElement.removeEventListener("pointerup", this._onPointerUp), this.domElement.removeEventListener("pointercancel", this._onPointerUp), this.domElement.removeEventListener("wheel", this._onMouseWheel), this.domElement.removeEventListener("contextmenu", this._onContextMenu), this.stopListenToKeyEvents(), this.domElement.getRootNode().removeEventListener("keydown", this._interceptControlDown, { capture: !0 }), this.domElement.style.touchAction = "auto";
  }
  dispose() {
    this.disconnect();
  }
  getPolarAngle() {
    return this._spherical.phi;
  }
  getAzimuthalAngle() {
    return this._spherical.theta;
  }
  getDistance() {
    return this.object.position.distanceTo(this.target);
  }
  listenToKeyEvents(e) {
    e.addEventListener("keydown", this._onKeyDown), this._domElementKeyEvents = e;
  }
  stopListenToKeyEvents() {
    this._domElementKeyEvents !== null && (this._domElementKeyEvents.removeEventListener("keydown", this._onKeyDown), this._domElementKeyEvents = null);
  }
  saveState() {
    this.target0.copy(this.target), this.position0.copy(this.object.position), this.zoom0 = this.object.zoom;
  }
  reset() {
    this.target.copy(this.target0), this.object.position.copy(this.position0), this.object.zoom = this.zoom0, this.object.updateProjectionMatrix(), this.dispatchEvent(nn), this.update(), this.state = F.NONE;
  }
  update(e = null) {
    const t = this.object.position;
    W.copy(t).sub(this.target), W.applyQuaternion(this._quat), this._spherical.setFromVector3(W), this.autoRotate && this.state === F.NONE && this._rotateLeft(this._getAutoRotationAngle(e)), this.enableDamping ? (this._spherical.theta += this._sphericalDelta.theta * this.dampingFactor, this._spherical.phi += this._sphericalDelta.phi * this.dampingFactor) : (this._spherical.theta += this._sphericalDelta.theta, this._spherical.phi += this._sphericalDelta.phi);
    let i = this.minAzimuthAngle, n = this.maxAzimuthAngle;
    isFinite(i) && isFinite(n) && (i < -Math.PI ? i += ce : i > Math.PI && (i -= ce), n < -Math.PI ? n += ce : n > Math.PI && (n -= ce), i <= n ? this._spherical.theta = Math.max(i, Math.min(n, this._spherical.theta)) : this._spherical.theta = this._spherical.theta > (i + n) / 2 ? Math.max(i, this._spherical.theta) : Math.min(n, this._spherical.theta)), this._spherical.phi = Math.max(this.minPolarAngle, Math.min(this.maxPolarAngle, this._spherical.phi)), this._spherical.makeSafe(), this.enableDamping === !0 ? this.target.addScaledVector(this._panOffset, this.dampingFactor) : this.target.add(this._panOffset), this.target.sub(this.cursor), this.target.clampLength(this.minTargetRadius, this.maxTargetRadius), this.target.add(this.cursor);
    let o = !1;
    if (this.zoomToCursor && this._performCursorZoom || this.object.isOrthographicCamera)
      this._spherical.radius = this._clampDistance(this._spherical.radius);
    else {
      const s = this._spherical.radius;
      this._spherical.radius = this._clampDistance(this._spherical.radius * this._scale), o = s != this._spherical.radius;
    }
    if (W.setFromSpherical(this._spherical), W.applyQuaternion(this._quatInverse), t.copy(this.target).add(W), this.object.lookAt(this.target), this.enableDamping === !0 ? (this._sphericalDelta.theta *= 1 - this.dampingFactor, this._sphericalDelta.phi *= 1 - this.dampingFactor, this._panOffset.multiplyScalar(1 - this.dampingFactor)) : (this._sphericalDelta.set(0, 0, 0), this._panOffset.set(0, 0, 0)), this.zoomToCursor && this._performCursorZoom) {
      let s = null;
      if (this.object.isPerspectiveCamera) {
        const r = W.length();
        s = this._clampDistance(r * this._scale);
        const c = r - s;
        this.object.position.addScaledVector(this._dollyDirection, c), this.object.updateMatrixWorld(), o = !!c;
      } else if (this.object.isOrthographicCamera) {
        const r = new T(this._mouse.x, this._mouse.y, 0);
        r.unproject(this.object);
        const c = this.object.zoom;
        this.object.zoom = Math.max(this.minZoom, Math.min(this.maxZoom, this.object.zoom / this._scale)), this.object.updateProjectionMatrix(), o = c !== this.object.zoom;
        const h = new T(this._mouse.x, this._mouse.y, 0);
        h.unproject(this.object), this.object.position.sub(h).add(r), this.object.updateMatrixWorld(), s = W.length();
      } else
        console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."), this.zoomToCursor = !1;
      s !== null && (this.screenSpacePanning ? this.target.set(0, 0, -1).transformDirection(this.object.matrix).multiplyScalar(s).add(this.object.position) : (dt.origin.copy(this.object.position), dt.direction.set(0, 0, -1).transformDirection(this.object.matrix), Math.abs(this.object.up.dot(dt.direction)) < ri ? this.object.lookAt(this.target) : (sn.setFromNormalAndCoplanarPoint(this.object.up, this.target), dt.intersectPlane(sn, this.target))));
    } else if (this.object.isOrthographicCamera) {
      const s = this.object.zoom;
      this.object.zoom = Math.max(this.minZoom, Math.min(this.maxZoom, this.object.zoom / this._scale)), s !== this.object.zoom && (this.object.updateProjectionMatrix(), o = !0);
    }
    return this._scale = 1, this._performCursorZoom = !1, o || this._lastPosition.distanceToSquared(this.object.position) > Lt || 8 * (1 - this._lastQuaternion.dot(this.object.quaternion)) > Lt || this._lastTargetPosition.distanceToSquared(this.target) > Lt ? (this.dispatchEvent(nn), this._lastPosition.copy(this.object.position), this._lastQuaternion.copy(this.object.quaternion), this._lastTargetPosition.copy(this.target), !0) : !1;
  }
  _getAutoRotationAngle(e) {
    return e !== null ? ce / 60 * this.autoRotateSpeed * e : ce / 60 / 60 * this.autoRotateSpeed;
  }
  _getZoomScale(e) {
    const t = Math.abs(e * 0.01);
    return Math.pow(0.95, this.zoomSpeed * t);
  }
  _rotateLeft(e) {
    this._sphericalDelta.theta -= e;
  }
  _rotateUp(e) {
    this._sphericalDelta.phi -= e;
  }
  _panLeft(e, t) {
    W.setFromMatrixColumn(t, 0), W.multiplyScalar(-e), this._panOffset.add(W);
  }
  _panUp(e, t) {
    this.screenSpacePanning === !0 ? W.setFromMatrixColumn(t, 1) : (W.setFromMatrixColumn(t, 0), W.crossVectors(this.object.up, W)), W.multiplyScalar(e), this._panOffset.add(W);
  }
  // deltaX and deltaY are in pixels; right and down are positive
  _pan(e, t) {
    const i = this.domElement;
    if (this.object.isPerspectiveCamera) {
      const n = this.object.position;
      W.copy(n).sub(this.target);
      let o = W.length();
      o *= Math.tan(this.object.fov / 2 * Math.PI / 180), this._panLeft(2 * e * o / i.clientHeight, this.object.matrix), this._panUp(2 * t * o / i.clientHeight, this.object.matrix);
    } else this.object.isOrthographicCamera ? (this._panLeft(e * (this.object.right - this.object.left) / this.object.zoom / i.clientWidth, this.object.matrix), this._panUp(t * (this.object.top - this.object.bottom) / this.object.zoom / i.clientHeight, this.object.matrix)) : (console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."), this.enablePan = !1);
  }
  _dollyOut(e) {
    this.object.isPerspectiveCamera || this.object.isOrthographicCamera ? this._scale /= e : (console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."), this.enableZoom = !1);
  }
  _dollyIn(e) {
    this.object.isPerspectiveCamera || this.object.isOrthographicCamera ? this._scale *= e : (console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."), this.enableZoom = !1);
  }
  _updateZoomParameters(e, t) {
    if (!this.zoomToCursor)
      return;
    this._performCursorZoom = !0;
    const i = this.domElement.getBoundingClientRect(), n = e - i.left, o = t - i.top, s = i.width, r = i.height;
    this._mouse.x = n / s * 2 - 1, this._mouse.y = -(o / r) * 2 + 1, this._dollyDirection.set(this._mouse.x, this._mouse.y, 1).unproject(this.object).sub(this.object.position).normalize();
  }
  _clampDistance(e) {
    return Math.max(this.minDistance, Math.min(this.maxDistance, e));
  }
  //
  // event callbacks - update the object state
  //
  _handleMouseDownRotate(e) {
    this._rotateStart.set(e.clientX, e.clientY);
  }
  _handleMouseDownDolly(e) {
    this._updateZoomParameters(e.clientX, e.clientX), this._dollyStart.set(e.clientX, e.clientY);
  }
  _handleMouseDownPan(e) {
    this._panStart.set(e.clientX, e.clientY);
  }
  _handleMouseMoveRotate(e) {
    this._rotateEnd.set(e.clientX, e.clientY), this._rotateDelta.subVectors(this._rotateEnd, this._rotateStart).multiplyScalar(this.rotateSpeed);
    const t = this.domElement;
    this._rotateLeft(ce * this._rotateDelta.x / t.clientHeight), this._rotateUp(ce * this._rotateDelta.y / t.clientHeight), this._rotateStart.copy(this._rotateEnd), this.update();
  }
  _handleMouseMoveDolly(e) {
    this._dollyEnd.set(e.clientX, e.clientY), this._dollyDelta.subVectors(this._dollyEnd, this._dollyStart), this._dollyDelta.y > 0 ? this._dollyOut(this._getZoomScale(this._dollyDelta.y)) : this._dollyDelta.y < 0 && this._dollyIn(this._getZoomScale(this._dollyDelta.y)), this._dollyStart.copy(this._dollyEnd), this.update();
  }
  _handleMouseMovePan(e) {
    this._panEnd.set(e.clientX, e.clientY), this._panDelta.subVectors(this._panEnd, this._panStart).multiplyScalar(this.panSpeed), this._pan(this._panDelta.x, this._panDelta.y), this._panStart.copy(this._panEnd), this.update();
  }
  _handleMouseWheel(e) {
    this._updateZoomParameters(e.clientX, e.clientY), e.deltaY < 0 ? this._dollyIn(this._getZoomScale(e.deltaY)) : e.deltaY > 0 && this._dollyOut(this._getZoomScale(e.deltaY)), this.update();
  }
  _handleKeyDown(e) {
    let t = !1;
    switch (e.code) {
      case this.keys.UP:
        e.ctrlKey || e.metaKey || e.shiftKey ? this.enableRotate && this._rotateUp(ce * this.rotateSpeed / this.domElement.clientHeight) : this.enablePan && this._pan(0, this.keyPanSpeed), t = !0;
        break;
      case this.keys.BOTTOM:
        e.ctrlKey || e.metaKey || e.shiftKey ? this.enableRotate && this._rotateUp(-ce * this.rotateSpeed / this.domElement.clientHeight) : this.enablePan && this._pan(0, -this.keyPanSpeed), t = !0;
        break;
      case this.keys.LEFT:
        e.ctrlKey || e.metaKey || e.shiftKey ? this.enableRotate && this._rotateLeft(ce * this.rotateSpeed / this.domElement.clientHeight) : this.enablePan && this._pan(this.keyPanSpeed, 0), t = !0;
        break;
      case this.keys.RIGHT:
        e.ctrlKey || e.metaKey || e.shiftKey ? this.enableRotate && this._rotateLeft(-ce * this.rotateSpeed / this.domElement.clientHeight) : this.enablePan && this._pan(-this.keyPanSpeed, 0), t = !0;
        break;
    }
    t && (e.preventDefault(), this.update());
  }
  _handleTouchStartRotate(e) {
    if (this._pointers.length === 1)
      this._rotateStart.set(e.pageX, e.pageY);
    else {
      const t = this._getSecondPointerPosition(e), i = 0.5 * (e.pageX + t.x), n = 0.5 * (e.pageY + t.y);
      this._rotateStart.set(i, n);
    }
  }
  _handleTouchStartPan(e) {
    if (this._pointers.length === 1)
      this._panStart.set(e.pageX, e.pageY);
    else {
      const t = this._getSecondPointerPosition(e), i = 0.5 * (e.pageX + t.x), n = 0.5 * (e.pageY + t.y);
      this._panStart.set(i, n);
    }
  }
  _handleTouchStartDolly(e) {
    const t = this._getSecondPointerPosition(e), i = e.pageX - t.x, n = e.pageY - t.y, o = Math.sqrt(i * i + n * n);
    this._dollyStart.set(0, o);
  }
  _handleTouchStartDollyPan(e) {
    this.enableZoom && this._handleTouchStartDolly(e), this.enablePan && this._handleTouchStartPan(e);
  }
  _handleTouchStartDollyRotate(e) {
    this.enableZoom && this._handleTouchStartDolly(e), this.enableRotate && this._handleTouchStartRotate(e);
  }
  _handleTouchMoveRotate(e) {
    if (this._pointers.length == 1)
      this._rotateEnd.set(e.pageX, e.pageY);
    else {
      const i = this._getSecondPointerPosition(e), n = 0.5 * (e.pageX + i.x), o = 0.5 * (e.pageY + i.y);
      this._rotateEnd.set(n, o);
    }
    this._rotateDelta.subVectors(this._rotateEnd, this._rotateStart).multiplyScalar(this.rotateSpeed);
    const t = this.domElement;
    this._rotateLeft(ce * this._rotateDelta.x / t.clientHeight), this._rotateUp(ce * this._rotateDelta.y / t.clientHeight), this._rotateStart.copy(this._rotateEnd);
  }
  _handleTouchMovePan(e) {
    if (this._pointers.length === 1)
      this._panEnd.set(e.pageX, e.pageY);
    else {
      const t = this._getSecondPointerPosition(e), i = 0.5 * (e.pageX + t.x), n = 0.5 * (e.pageY + t.y);
      this._panEnd.set(i, n);
    }
    this._panDelta.subVectors(this._panEnd, this._panStart).multiplyScalar(this.panSpeed), this._pan(this._panDelta.x, this._panDelta.y), this._panStart.copy(this._panEnd);
  }
  _handleTouchMoveDolly(e) {
    const t = this._getSecondPointerPosition(e), i = e.pageX - t.x, n = e.pageY - t.y, o = Math.sqrt(i * i + n * n);
    this._dollyEnd.set(0, o), this._dollyDelta.set(0, Math.pow(this._dollyEnd.y / this._dollyStart.y, this.zoomSpeed)), this._dollyOut(this._dollyDelta.y), this._dollyStart.copy(this._dollyEnd);
    const s = (e.pageX + t.x) * 0.5, r = (e.pageY + t.y) * 0.5;
    this._updateZoomParameters(s, r);
  }
  _handleTouchMoveDollyPan(e) {
    this.enableZoom && this._handleTouchMoveDolly(e), this.enablePan && this._handleTouchMovePan(e);
  }
  _handleTouchMoveDollyRotate(e) {
    this.enableZoom && this._handleTouchMoveDolly(e), this.enableRotate && this._handleTouchMoveRotate(e);
  }
  // pointers
  _addPointer(e) {
    this._pointers.push(e.pointerId);
  }
  _removePointer(e) {
    delete this._pointerPositions[e.pointerId];
    for (let t = 0; t < this._pointers.length; t++)
      if (this._pointers[t] == e.pointerId) {
        this._pointers.splice(t, 1);
        return;
      }
  }
  _isTrackingPointer(e) {
    for (let t = 0; t < this._pointers.length; t++)
      if (this._pointers[t] == e.pointerId) return !0;
    return !1;
  }
  _trackPointer(e) {
    let t = this._pointerPositions[e.pointerId];
    t === void 0 && (t = new ie(), this._pointerPositions[e.pointerId] = t), t.set(e.pageX, e.pageY);
  }
  _getSecondPointerPosition(e) {
    const t = e.pointerId === this._pointers[0] ? this._pointers[1] : this._pointers[0];
    return this._pointerPositions[t];
  }
  //
  _customWheelEvent(e) {
    const t = e.deltaMode, i = {
      clientX: e.clientX,
      clientY: e.clientY,
      deltaY: e.deltaY
    };
    switch (t) {
      case 1:
        i.deltaY *= 16;
        break;
      case 2:
        i.deltaY *= 100;
        break;
    }
    return e.ctrlKey && !this._controlActive && (i.deltaY *= 10), i;
  }
}
function ci(a) {
  this.enabled !== !1 && (this._pointers.length === 0 && (this.domElement.setPointerCapture(a.pointerId), this.domElement.addEventListener("pointermove", this._onPointerMove), this.domElement.addEventListener("pointerup", this._onPointerUp)), !this._isTrackingPointer(a) && (this._addPointer(a), a.pointerType === "touch" ? this._onTouchStart(a) : this._onMouseDown(a)));
}
function li(a) {
  this.enabled !== !1 && (a.pointerType === "touch" ? this._onTouchMove(a) : this._onMouseMove(a));
}
function hi(a) {
  switch (this._removePointer(a), this._pointers.length) {
    case 0:
      this.domElement.releasePointerCapture(a.pointerId), this.domElement.removeEventListener("pointermove", this._onPointerMove), this.domElement.removeEventListener("pointerup", this._onPointerUp), this.dispatchEvent(Pn), this.state = F.NONE;
      break;
    case 1:
      const e = this._pointers[0], t = this._pointerPositions[e];
      this._onTouchStart({ pointerId: e, pageX: t.x, pageY: t.y });
      break;
  }
}
function ui(a) {
  let e;
  switch (a.button) {
    case 0:
      e = this.mouseButtons.LEFT;
      break;
    case 1:
      e = this.mouseButtons.MIDDLE;
      break;
    case 2:
      e = this.mouseButtons.RIGHT;
      break;
    default:
      e = -1;
  }
  switch (e) {
    case Ge.DOLLY:
      if (this.enableZoom === !1) return;
      this._handleMouseDownDolly(a), this.state = F.DOLLY;
      break;
    case Ge.ROTATE:
      if (a.ctrlKey || a.metaKey || a.shiftKey) {
        if (this.enablePan === !1) return;
        this._handleMouseDownPan(a), this.state = F.PAN;
      } else {
        if (this.enableRotate === !1) return;
        this._handleMouseDownRotate(a), this.state = F.ROTATE;
      }
      break;
    case Ge.PAN:
      if (a.ctrlKey || a.metaKey || a.shiftKey) {
        if (this.enableRotate === !1) return;
        this._handleMouseDownRotate(a), this.state = F.ROTATE;
      } else {
        if (this.enablePan === !1) return;
        this._handleMouseDownPan(a), this.state = F.PAN;
      }
      break;
    default:
      this.state = F.NONE;
  }
  this.state !== F.NONE && this.dispatchEvent(Ut);
}
function di(a) {
  switch (this.state) {
    case F.ROTATE:
      if (this.enableRotate === !1) return;
      this._handleMouseMoveRotate(a);
      break;
    case F.DOLLY:
      if (this.enableZoom === !1) return;
      this._handleMouseMoveDolly(a);
      break;
    case F.PAN:
      if (this.enablePan === !1) return;
      this._handleMouseMovePan(a);
      break;
  }
}
function fi(a) {
  this.enabled === !1 || this.enableZoom === !1 || this.state !== F.NONE || (a.preventDefault(), this.dispatchEvent(Ut), this._handleMouseWheel(this._customWheelEvent(a)), this.dispatchEvent(Pn));
}
function pi(a) {
  this.enabled !== !1 && this._handleKeyDown(a);
}
function mi(a) {
  switch (this._trackPointer(a), this._pointers.length) {
    case 1:
      switch (this.touches.ONE) {
        case Be.ROTATE:
          if (this.enableRotate === !1) return;
          this._handleTouchStartRotate(a), this.state = F.TOUCH_ROTATE;
          break;
        case Be.PAN:
          if (this.enablePan === !1) return;
          this._handleTouchStartPan(a), this.state = F.TOUCH_PAN;
          break;
        default:
          this.state = F.NONE;
      }
      break;
    case 2:
      switch (this.touches.TWO) {
        case Be.DOLLY_PAN:
          if (this.enableZoom === !1 && this.enablePan === !1) return;
          this._handleTouchStartDollyPan(a), this.state = F.TOUCH_DOLLY_PAN;
          break;
        case Be.DOLLY_ROTATE:
          if (this.enableZoom === !1 && this.enableRotate === !1) return;
          this._handleTouchStartDollyRotate(a), this.state = F.TOUCH_DOLLY_ROTATE;
          break;
        default:
          this.state = F.NONE;
      }
      break;
    default:
      this.state = F.NONE;
  }
  this.state !== F.NONE && this.dispatchEvent(Ut);
}
function gi(a) {
  switch (this._trackPointer(a), this.state) {
    case F.TOUCH_ROTATE:
      if (this.enableRotate === !1) return;
      this._handleTouchMoveRotate(a), this.update();
      break;
    case F.TOUCH_PAN:
      if (this.enablePan === !1) return;
      this._handleTouchMovePan(a), this.update();
      break;
    case F.TOUCH_DOLLY_PAN:
      if (this.enableZoom === !1 && this.enablePan === !1) return;
      this._handleTouchMoveDollyPan(a), this.update();
      break;
    case F.TOUCH_DOLLY_ROTATE:
      if (this.enableZoom === !1 && this.enableRotate === !1) return;
      this._handleTouchMoveDollyRotate(a), this.update();
      break;
    default:
      this.state = F.NONE;
  }
}
function _i(a) {
  this.enabled !== !1 && a.preventDefault();
}
function yi(a) {
  a.key === "Control" && (this._controlActive = !0, this.domElement.getRootNode().addEventListener("keyup", this._interceptControlUp, { passive: !0, capture: !0 }));
}
function wi(a) {
  a.key === "Control" && (this._controlActive = !1, this.domElement.getRootNode().removeEventListener("keyup", this._interceptControlUp, { passive: !0, capture: !0 }));
}
const bi = {
  name: "CopyShader",
  uniforms: {
    tDiffuse: { value: null },
    opacity: { value: 1 }
  },
  vertexShader: (
    /* glsl */
    `

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`
  ),
  fragmentShader: (
    /* glsl */
    `

		uniform float opacity;

		uniform sampler2D tDiffuse;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );
			gl_FragColor = opacity * texel;


		}`
  )
};
class Tt {
  constructor() {
    this.isPass = !0, this.enabled = !0, this.needsSwap = !0, this.clear = !1, this.renderToScreen = !1;
  }
  setSize() {
  }
  render() {
    console.error("THREE.Pass: .render() must be implemented in derived pass.");
  }
  dispose() {
  }
}
const xi = new En(-1, 1, 1, -1, 0, 1);
class Ti extends yt {
  constructor() {
    super(), this.setAttribute("position", new wt([-1, 3, 0, -1, -1, 0, 3, -1, 0], 3)), this.setAttribute("uv", new wt([0, 2, 0, 0, 2, 0], 2));
  }
}
const Ei = new Ti();
class Ai {
  constructor(e) {
    this._mesh = new _(Ei, e);
  }
  dispose() {
    this._mesh.geometry.dispose();
  }
  render(e) {
    e.render(this._mesh, xi);
  }
  get material() {
    return this._mesh.material;
  }
  set material(e) {
    this._mesh.material = e;
  }
}
class Si extends Tt {
  constructor(e, t) {
    super(), this.textureID = t !== void 0 ? t : "tDiffuse", e instanceof Zt ? (this.uniforms = e.uniforms, this.material = e) : e && (this.uniforms = hs.clone(e.uniforms), this.material = new Zt({
      name: e.name !== void 0 ? e.name : "unspecified",
      defines: Object.assign({}, e.defines),
      uniforms: this.uniforms,
      vertexShader: e.vertexShader,
      fragmentShader: e.fragmentShader
    })), this.fsQuad = new Ai(this.material);
  }
  render(e, t, i) {
    this.uniforms[this.textureID] && (this.uniforms[this.textureID].value = i.texture), this.fsQuad.material = this.material, this.renderToScreen ? (e.setRenderTarget(null), this.fsQuad.render(e)) : (e.setRenderTarget(t), this.clear && e.clear(e.autoClearColor, e.autoClearDepth, e.autoClearStencil), this.fsQuad.render(e));
  }
  dispose() {
    this.material.dispose(), this.fsQuad.dispose();
  }
}
class on extends Tt {
  constructor(e, t) {
    super(), this.scene = e, this.camera = t, this.clear = !0, this.needsSwap = !1, this.inverse = !1;
  }
  render(e, t, i) {
    const n = e.getContext(), o = e.state;
    o.buffers.color.setMask(!1), o.buffers.depth.setMask(!1), o.buffers.color.setLocked(!0), o.buffers.depth.setLocked(!0);
    let s, r;
    this.inverse ? (s = 0, r = 1) : (s = 1, r = 0), o.buffers.stencil.setTest(!0), o.buffers.stencil.setOp(n.REPLACE, n.REPLACE, n.REPLACE), o.buffers.stencil.setFunc(n.ALWAYS, s, 4294967295), o.buffers.stencil.setClear(r), o.buffers.stencil.setLocked(!0), e.setRenderTarget(i), this.clear && e.clear(), e.render(this.scene, this.camera), e.setRenderTarget(t), this.clear && e.clear(), e.render(this.scene, this.camera), o.buffers.color.setLocked(!1), o.buffers.depth.setLocked(!1), o.buffers.color.setMask(!0), o.buffers.depth.setMask(!0), o.buffers.stencil.setLocked(!1), o.buffers.stencil.setFunc(n.EQUAL, 1, 4294967295), o.buffers.stencil.setOp(n.KEEP, n.KEEP, n.KEEP), o.buffers.stencil.setLocked(!0);
  }
}
class Mi extends Tt {
  constructor() {
    super(), this.needsSwap = !1;
  }
  render(e) {
    e.state.buffers.stencil.setLocked(!1), e.state.buffers.stencil.setTest(!1);
  }
}
class Ri {
  constructor(e, t) {
    if (this.renderer = e, this._pixelRatio = e.getPixelRatio(), t === void 0) {
      const i = e.getSize(new ie());
      this._width = i.width, this._height = i.height, t = new us(this._width * this._pixelRatio, this._height * this._pixelRatio, { type: ds }), t.texture.name = "EffectComposer.rt1";
    } else
      this._width = t.width, this._height = t.height;
    this.renderTarget1 = t, this.renderTarget2 = t.clone(), this.renderTarget2.texture.name = "EffectComposer.rt2", this.writeBuffer = this.renderTarget1, this.readBuffer = this.renderTarget2, this.renderToScreen = !0, this.passes = [], this.copyPass = new Si(bi), this.copyPass.material.blending = fs, this.clock = new ps();
  }
  swapBuffers() {
    const e = this.readBuffer;
    this.readBuffer = this.writeBuffer, this.writeBuffer = e;
  }
  addPass(e) {
    this.passes.push(e), e.setSize(this._width * this._pixelRatio, this._height * this._pixelRatio);
  }
  insertPass(e, t) {
    this.passes.splice(t, 0, e), e.setSize(this._width * this._pixelRatio, this._height * this._pixelRatio);
  }
  removePass(e) {
    const t = this.passes.indexOf(e);
    t !== -1 && this.passes.splice(t, 1);
  }
  isLastEnabledPass(e) {
    for (let t = e + 1; t < this.passes.length; t++)
      if (this.passes[t].enabled)
        return !1;
    return !0;
  }
  render(e) {
    e === void 0 && (e = this.clock.getDelta());
    const t = this.renderer.getRenderTarget();
    let i = !1;
    for (let n = 0, o = this.passes.length; n < o; n++) {
      const s = this.passes[n];
      if (s.enabled !== !1) {
        if (s.renderToScreen = this.renderToScreen && this.isLastEnabledPass(n), s.render(this.renderer, this.writeBuffer, this.readBuffer, e, i), s.needsSwap) {
          if (i) {
            const r = this.renderer.getContext(), c = this.renderer.state.buffers.stencil;
            c.setFunc(r.NOTEQUAL, 1, 4294967295), this.copyPass.render(this.renderer, this.writeBuffer, this.readBuffer, e), c.setFunc(r.EQUAL, 1, 4294967295);
          }
          this.swapBuffers();
        }
        on !== void 0 && (s instanceof on ? i = !0 : s instanceof Mi && (i = !1));
      }
    }
    this.renderer.setRenderTarget(t);
  }
  reset(e) {
    if (e === void 0) {
      const t = this.renderer.getSize(new ie());
      this._pixelRatio = this.renderer.getPixelRatio(), this._width = t.width, this._height = t.height, e = this.renderTarget1.clone(), e.setSize(this._width * this._pixelRatio, this._height * this._pixelRatio);
    }
    this.renderTarget1.dispose(), this.renderTarget2.dispose(), this.renderTarget1 = e, this.renderTarget2 = e.clone(), this.writeBuffer = this.renderTarget1, this.readBuffer = this.renderTarget2;
  }
  setSize(e, t) {
    this._width = e, this._height = t;
    const i = this._width * this._pixelRatio, n = this._height * this._pixelRatio;
    this.renderTarget1.setSize(i, n), this.renderTarget2.setSize(i, n);
    for (let o = 0; o < this.passes.length; o++)
      this.passes[o].setSize(i, n);
  }
  setPixelRatio(e) {
    this._pixelRatio = e, this.setSize(this._width, this._height);
  }
  dispose() {
    this.renderTarget1.dispose(), this.renderTarget2.dispose(), this.copyPass.dispose();
  }
}
class Pi extends Tt {
  constructor(e, t, i = null, n = null, o = null) {
    super(), this.scene = e, this.camera = t, this.overrideMaterial = i, this.clearColor = n, this.clearAlpha = o, this.clear = !0, this.clearDepth = !1, this.needsSwap = !1, this._oldClearColor = new Ce();
  }
  render(e, t, i) {
    const n = e.autoClear;
    e.autoClear = !1;
    let o, s;
    this.overrideMaterial !== null && (s = this.scene.overrideMaterial, this.scene.overrideMaterial = this.overrideMaterial), this.clearColor !== null && (e.getClearColor(this._oldClearColor), e.setClearColor(this.clearColor, e.getClearAlpha())), this.clearAlpha !== null && (o = e.getClearAlpha(), e.setClearAlpha(this.clearAlpha)), this.clearDepth == !0 && e.clearDepth(), e.setRenderTarget(this.renderToScreen ? null : i), this.clear === !0 && e.clear(e.autoClearColor, e.autoClearDepth, e.autoClearStencil), e.render(this.scene, this.camera), this.clearColor !== null && e.setClearColor(this._oldClearColor), this.clearAlpha !== null && e.setClearAlpha(o), this.overrideMaterial !== null && (this.scene.overrideMaterial = s), e.autoClear = n;
  }
}
var vn = {
  color: void 0,
  size: void 0,
  className: void 0,
  style: void 0,
  attr: void 0
}, rn = ve.createContext && /* @__PURE__ */ ve.createContext(vn), vi = ["attr", "size", "title"];
function Ci(a, e) {
  if (a == null) return {};
  var t = Li(a, e), i, n;
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(a);
    for (n = 0; n < o.length; n++)
      i = o[n], !(e.indexOf(i) >= 0) && Object.prototype.propertyIsEnumerable.call(a, i) && (t[i] = a[i]);
  }
  return t;
}
function Li(a, e) {
  if (a == null) return {};
  var t = {};
  for (var i in a)
    if (Object.prototype.hasOwnProperty.call(a, i)) {
      if (e.indexOf(i) >= 0) continue;
      t[i] = a[i];
    }
  return t;
}
function bt() {
  return bt = Object.assign ? Object.assign.bind() : function(a) {
    for (var e = 1; e < arguments.length; e++) {
      var t = arguments[e];
      for (var i in t)
        Object.prototype.hasOwnProperty.call(t, i) && (a[i] = t[i]);
    }
    return a;
  }, bt.apply(this, arguments);
}
function an(a, e) {
  var t = Object.keys(a);
  if (Object.getOwnPropertySymbols) {
    var i = Object.getOwnPropertySymbols(a);
    e && (i = i.filter(function(n) {
      return Object.getOwnPropertyDescriptor(a, n).enumerable;
    })), t.push.apply(t, i);
  }
  return t;
}
function xt(a) {
  for (var e = 1; e < arguments.length; e++) {
    var t = arguments[e] != null ? arguments[e] : {};
    e % 2 ? an(Object(t), !0).forEach(function(i) {
      Oi(a, i, t[i]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(a, Object.getOwnPropertyDescriptors(t)) : an(Object(t)).forEach(function(i) {
      Object.defineProperty(a, i, Object.getOwnPropertyDescriptor(t, i));
    });
  }
  return a;
}
function Oi(a, e, t) {
  return e = Ii(e), e in a ? Object.defineProperty(a, e, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : a[e] = t, a;
}
function Ii(a) {
  var e = Di(a, "string");
  return typeof e == "symbol" ? e : e + "";
}
function Di(a, e) {
  if (typeof a != "object" || !a) return a;
  var t = a[Symbol.toPrimitive];
  if (t !== void 0) {
    var i = t.call(a, e || "default");
    if (typeof i != "object") return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (e === "string" ? String : Number)(a);
}
function Cn(a) {
  return a && a.map((e, t) => /* @__PURE__ */ ve.createElement(e.tag, xt({
    key: t
  }, e.attr), Cn(e.child)));
}
function Et(a) {
  return (e) => /* @__PURE__ */ ve.createElement(Ni, bt({
    attr: xt({}, a.attr)
  }, e), Cn(a.child));
}
function Ni(a) {
  var e = (t) => {
    var {
      attr: i,
      size: n,
      title: o
    } = a, s = Ci(a, vi), r = n || t.size || "1em", c;
    return t.className && (c = t.className), a.className && (c = (c ? c + " " : "") + a.className), /* @__PURE__ */ ve.createElement("svg", bt({
      stroke: "currentColor",
      fill: "currentColor",
      strokeWidth: "0"
    }, t.attr, i, s, {
      className: c,
      style: xt(xt({
        color: a.color || t.color
      }, t.style), a.style),
      height: r,
      width: r,
      xmlns: "http://www.w3.org/2000/svg"
    }), o && /* @__PURE__ */ ve.createElement("title", null, o), a.children);
  };
  return rn !== void 0 ? /* @__PURE__ */ ve.createElement(rn.Consumer, null, (t) => e(t)) : e(vn);
}
function ji(a) {
  return Et({ tag: "svg", attr: { viewBox: "0 0 24 24" }, child: [{ tag: "g", attr: { id: "Maximize_2" }, child: [{ tag: "g", attr: {}, child: [{ tag: "path", attr: { d: "M10.513,3.066H4.93a2.058,2.058,0,0,0-1.15.22,1.6,1.6,0,0,0-.717,1.437v5.793a.5.5,0,0,0,1,0V5.107a2.521,2.521,0,0,1,.022-.689c.115-.373.469-.352.777-.352h5.651a.5.5,0,0,0,0-1Z" }, child: [] }, { tag: "path", attr: { d: "M3.063,13.488v5.583a2.057,2.057,0,0,0,.221,1.15,1.6,1.6,0,0,0,1.436.717h5.793a.5.5,0,0,0,0-1H5.1a2.483,2.483,0,0,1-.689-.022c-.372-.115-.352-.469-.352-.777V13.488a.5.5,0,0,0-1,0Z" }, child: [] }, { tag: "path", attr: { d: "M13.487,20.934H19.07a2.058,2.058,0,0,0,1.15-.22,1.6,1.6,0,0,0,.717-1.437V13.484a.5.5,0,0,0-1,0v5.409a2.521,2.521,0,0,1-.022.689c-.115.373-.469.352-.777.352H13.487a.5.5,0,0,0,0,1Z" }, child: [] }, { tag: "path", attr: { d: "M20.937,10.512V4.929a2.057,2.057,0,0,0-.221-1.15,1.6,1.6,0,0,0-1.436-.717H13.487a.5.5,0,0,0,0,1H18.9a2.483,2.483,0,0,1,.689.022c.372.115.352.469.352.777v5.651a.5.5,0,0,0,1,0Z" }, child: [] }] }] }] })(a);
}
function ki(a) {
  return Et({ tag: "svg", attr: { viewBox: "0 0 256 256", fill: "currentColor" }, child: [{ tag: "path", attr: { d: "M208,96a16,16,0,0,0,16-16V48a16,16,0,0,0-16-16H176a16,16,0,0,0-16,16v8H96V48A16,16,0,0,0,80,32H48A16,16,0,0,0,32,48V80A16,16,0,0,0,48,96h8v64H48a16,16,0,0,0-16,16v32a16,16,0,0,0,16,16H80a16,16,0,0,0,16-16v-8h64v8a16,16,0,0,0,16,16h32a16,16,0,0,0,16-16V176a16,16,0,0,0-16-16h-8V96ZM176,48h32V80H176ZM48,48H80V63.9a.51.51,0,0,0,0,.2V80H48ZM80,208H48V176H80v15.9a.51.51,0,0,0,0,.2V208Zm128,0H176V176h32Zm-24-48h-8a16,16,0,0,0-16,16v8H96v-8a16,16,0,0,0-16-16H72V96h8A16,16,0,0,0,96,80V72h64v8a16,16,0,0,0,16,16h8Z" }, child: [] }] })(a);
}
function Hi(a) {
  return Et({ tag: "svg", attr: { viewBox: "0 0 24 24" }, child: [{ tag: "path", attr: { fill: "none", d: "M0 0h24v24H0V0z" }, child: [] }, { tag: "path", attr: { d: "M14 13v-1c0-.55-.45-1-1-1H9c-.55 0-1 .45-1 1v4c0 .55.45 1 1 1h4c.55 0 1-.45 1-1v-1l2 1.06v-4.12L14 13zm-2-7.5 6 4.5v9H6v-9l6-4.5M12 3 4 9v12h16V9l-8-6z" }, child: [] }] })(a);
}
function Fi({ children: a, onClick: e }) {
  return /* @__PURE__ */ k.jsx(
    "button",
    {
      onClick: e,
      style: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "2rem",
        width: "2rem",
        background: "#f9f9f9",
        color: "#3D3C3B",
        borderRadius: "50%",
        boxShadow: "0 0 5px rgba(0, 0, 0, 0.1)",
        border: "none",
        cursor: "pointer",
        padding: "0.2rem"
      },
      children: a
    }
  );
}
function Ui(a) {
  return Et({ tag: "svg", attr: { viewBox: "0 0 192 512" }, child: [{ tag: "path", attr: { d: "M176 432c0 44.112-35.888 80-80 80s-80-35.888-80-80 35.888-80 80-80 80 35.888 80 80zM25.26 25.199l13.6 272C39.499 309.972 50.041 320 62.83 320h66.34c12.789 0 23.331-10.028 23.97-22.801l13.6-272C167.425 11.49 156.496 0 142.77 0H49.23C35.504 0 24.575 11.49 25.26 25.199z" }, child: [] }] })(a);
}
function Ot({ children: a, text: e }) {
  const [t, i] = gt(!1);
  return /* @__PURE__ */ k.jsxs(
    "div",
    {
      style: {
        overflow: "visible"
      },
      onMouseEnter: () => i(!0),
      onMouseLeave: () => i(!1),
      children: [
        t && /* @__PURE__ */ k.jsxs(
          "section",
          {
            style: {
              minWidth: "8rem",
              position: "absolute",
              bottom: "100%",
              left: 0,
              right: 0,
              borderRadius: "6px",
              boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
              backgroundColor: "#f9f9f9",
              color: "black",
              padding: "6px",
              marginBottom: "6px",
              textAlign: "center",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "0.3rem"
            },
            children: [
              /* @__PURE__ */ k.jsx(
                Ui,
                {
                  style: {
                    color: "black",
                    width: "10px",
                    height: "10px"
                  }
                }
              ),
              /* @__PURE__ */ k.jsx(
                "p",
                {
                  style: {
                    margin: 0,
                    fontSize: "12px"
                  },
                  children: e
                }
              )
            ]
          }
        ),
        a
      ]
    }
  );
}
function ze({ children: a, onClick: e }) {
  return /* @__PURE__ */ k.jsx(
    "button",
    {
      onClick: e,
      style: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#3D3C3B",
        borderRadius: "5px",
        border: "none",
        cursor: "pointer",
        padding: "0.2rem",
        background: "transparent"
      },
      children: a
    }
  );
}
const Ne = new ms(), ee = new T(), Pe = new T(), B = new le(), cn = {
  X: new T(1, 0, 0),
  Y: new T(0, 1, 0),
  Z: new T(0, 0, 1)
}, It = { type: "change" }, ln = { type: "mouseDown", mode: null }, hn = { type: "mouseUp", mode: null }, un = { type: "objectChange" };
class zi extends Sn {
  constructor(e, t = null) {
    super(void 0, t);
    const i = new Zi(this);
    this._root = i;
    const n = new Vi();
    this._gizmo = n, i.add(n);
    const o = new Wi();
    this._plane = o, i.add(o);
    const s = this;
    function r(L, x) {
      let X = x;
      Object.defineProperty(s, L, {
        get: function() {
          return X !== void 0 ? X : x;
        },
        set: function(A) {
          X !== A && (X = A, o[L] = A, n[L] = A, s.dispatchEvent({ type: L + "-changed", value: A }), s.dispatchEvent(It));
        }
      }), s[L] = x, o[L] = x, n[L] = x;
    }
    r("camera", e), r("object", void 0), r("enabled", !0), r("axis", null), r("mode", "translate"), r("translationSnap", null), r("rotationSnap", null), r("scaleSnap", null), r("space", "world"), r("size", 1), r("dragging", !1), r("showX", !0), r("showY", !0), r("showZ", !0), r("minX", -1 / 0), r("maxX", 1 / 0), r("minY", -1 / 0), r("maxY", 1 / 0), r("minZ", -1 / 0), r("maxZ", 1 / 0);
    const c = new T(), h = new T(), d = new le(), u = new le(), f = new T(), p = new le(), m = new T(), E = new T(), y = new T(), b = 0, M = new T();
    r("worldPosition", c), r("worldPositionStart", h), r("worldQuaternion", d), r("worldQuaternionStart", u), r("cameraPosition", f), r("cameraQuaternion", p), r("pointStart", m), r("pointEnd", E), r("rotationAxis", y), r("rotationAngle", b), r("eye", M), this._offset = new T(), this._startNorm = new T(), this._endNorm = new T(), this._cameraScale = new T(), this._parentPosition = new T(), this._parentQuaternion = new le(), this._parentQuaternionInv = new le(), this._parentScale = new T(), this._worldScaleStart = new T(), this._worldQuaternionInv = new le(), this._worldScale = new T(), this._positionStart = new T(), this._quaternionStart = new le(), this._scaleStart = new T(), this._getPointer = Bi.bind(this), this._onPointerDown = Yi.bind(this), this._onPointerHover = Gi.bind(this), this._onPointerMove = Xi.bind(this), this._onPointerUp = Ki.bind(this), t !== null && this.connect();
  }
  connect() {
    this.domElement.addEventListener("pointerdown", this._onPointerDown), this.domElement.addEventListener("pointermove", this._onPointerHover), this.domElement.addEventListener("pointerup", this._onPointerUp), this.domElement.style.touchAction = "none";
  }
  disconnect() {
    this.domElement.removeEventListener("pointerdown", this._onPointerDown), this.domElement.removeEventListener("pointermove", this._onPointerHover), this.domElement.removeEventListener("pointermove", this._onPointerMove), this.domElement.removeEventListener("pointerup", this._onPointerUp), this.domElement.style.touchAction = "auto";
  }
  getHelper() {
    return this._root;
  }
  pointerHover(e) {
    if (this.object === void 0 || this.dragging === !0) return;
    e !== null && Ne.setFromCamera(e, this.camera);
    const t = Dt(this._gizmo.picker[this.mode], Ne);
    t ? this.axis = t.object.name : this.axis = null;
  }
  pointerDown(e) {
    if (!(this.object === void 0 || this.dragging === !0 || e != null && e.button !== 0) && this.axis !== null) {
      e !== null && Ne.setFromCamera(e, this.camera);
      const t = Dt(this._plane, Ne, !0);
      t && (this.object.updateMatrixWorld(), this.object.parent.updateMatrixWorld(), this._positionStart.copy(this.object.position), this._quaternionStart.copy(this.object.quaternion), this._scaleStart.copy(this.object.scale), this.object.matrixWorld.decompose(this.worldPositionStart, this.worldQuaternionStart, this._worldScaleStart), this.pointStart.copy(t.point).sub(this.worldPositionStart)), this.dragging = !0, ln.mode = this.mode, this.dispatchEvent(ln);
    }
  }
  pointerMove(e) {
    const t = this.axis, i = this.mode, n = this.object;
    let o = this.space;
    if (i === "scale" ? o = "local" : (t === "E" || t === "XYZE" || t === "XYZ") && (o = "world"), n === void 0 || t === null || this.dragging === !1 || e !== null && e.button !== -1) return;
    e !== null && Ne.setFromCamera(e, this.camera);
    const s = Dt(this._plane, Ne, !0);
    if (s) {
      if (this.pointEnd.copy(s.point).sub(this.worldPositionStart), i === "translate")
        this._offset.copy(this.pointEnd).sub(this.pointStart), o === "local" && t !== "XYZ" && this._offset.applyQuaternion(this._worldQuaternionInv), t.indexOf("X") === -1 && (this._offset.x = 0), t.indexOf("Y") === -1 && (this._offset.y = 0), t.indexOf("Z") === -1 && (this._offset.z = 0), o === "local" && t !== "XYZ" ? this._offset.applyQuaternion(this._quaternionStart).divide(this._parentScale) : this._offset.applyQuaternion(this._parentQuaternionInv).divide(this._parentScale), n.position.copy(this._offset).add(this._positionStart), this.translationSnap && (o === "local" && (n.position.applyQuaternion(B.copy(this._quaternionStart).invert()), t.search("X") !== -1 && (n.position.x = Math.round(n.position.x / this.translationSnap) * this.translationSnap), t.search("Y") !== -1 && (n.position.y = Math.round(n.position.y / this.translationSnap) * this.translationSnap), t.search("Z") !== -1 && (n.position.z = Math.round(n.position.z / this.translationSnap) * this.translationSnap), n.position.applyQuaternion(this._quaternionStart)), o === "world" && (n.parent && n.position.add(ee.setFromMatrixPosition(n.parent.matrixWorld)), t.search("X") !== -1 && (n.position.x = Math.round(n.position.x / this.translationSnap) * this.translationSnap), t.search("Y") !== -1 && (n.position.y = Math.round(n.position.y / this.translationSnap) * this.translationSnap), t.search("Z") !== -1 && (n.position.z = Math.round(n.position.z / this.translationSnap) * this.translationSnap), n.parent && n.position.sub(ee.setFromMatrixPosition(n.parent.matrixWorld)))), n.position.x = Math.max(this.minX, Math.min(this.maxX, n.position.x)), n.position.y = Math.max(this.minY, Math.min(this.maxY, n.position.y)), n.position.z = Math.max(this.minZ, Math.min(this.maxZ, n.position.z));
      else if (i === "scale") {
        if (t.search("XYZ") !== -1) {
          let r = this.pointEnd.length() / this.pointStart.length();
          this.pointEnd.dot(this.pointStart) < 0 && (r *= -1), Pe.set(r, r, r);
        } else
          ee.copy(this.pointStart), Pe.copy(this.pointEnd), ee.applyQuaternion(this._worldQuaternionInv), Pe.applyQuaternion(this._worldQuaternionInv), Pe.divide(ee), t.search("X") === -1 && (Pe.x = 1), t.search("Y") === -1 && (Pe.y = 1), t.search("Z") === -1 && (Pe.z = 1);
        n.scale.copy(this._scaleStart).multiply(Pe), this.scaleSnap && (t.search("X") !== -1 && (n.scale.x = Math.round(n.scale.x / this.scaleSnap) * this.scaleSnap || this.scaleSnap), t.search("Y") !== -1 && (n.scale.y = Math.round(n.scale.y / this.scaleSnap) * this.scaleSnap || this.scaleSnap), t.search("Z") !== -1 && (n.scale.z = Math.round(n.scale.z / this.scaleSnap) * this.scaleSnap || this.scaleSnap));
      } else if (i === "rotate") {
        this._offset.copy(this.pointEnd).sub(this.pointStart);
        const r = 20 / this.worldPosition.distanceTo(ee.setFromMatrixPosition(this.camera.matrixWorld));
        let c = !1;
        t === "XYZE" ? (this.rotationAxis.copy(this._offset).cross(this.eye).normalize(), this.rotationAngle = this._offset.dot(ee.copy(this.rotationAxis).cross(this.eye)) * r) : (t === "X" || t === "Y" || t === "Z") && (this.rotationAxis.copy(cn[t]), ee.copy(cn[t]), o === "local" && ee.applyQuaternion(this.worldQuaternion), ee.cross(this.eye), ee.length() === 0 ? c = !0 : this.rotationAngle = this._offset.dot(ee.normalize()) * r), (t === "E" || c) && (this.rotationAxis.copy(this.eye), this.rotationAngle = this.pointEnd.angleTo(this.pointStart), this._startNorm.copy(this.pointStart).normalize(), this._endNorm.copy(this.pointEnd).normalize(), this.rotationAngle *= this._endNorm.cross(this._startNorm).dot(this.eye) < 0 ? 1 : -1), this.rotationSnap && (this.rotationAngle = Math.round(this.rotationAngle / this.rotationSnap) * this.rotationSnap), o === "local" && t !== "E" && t !== "XYZE" ? (n.quaternion.copy(this._quaternionStart), n.quaternion.multiply(B.setFromAxisAngle(this.rotationAxis, this.rotationAngle)).normalize()) : (this.rotationAxis.applyQuaternion(this._parentQuaternionInv), n.quaternion.copy(B.setFromAxisAngle(this.rotationAxis, this.rotationAngle)), n.quaternion.multiply(this._quaternionStart).normalize());
      }
      this.dispatchEvent(It), this.dispatchEvent(un);
    }
  }
  pointerUp(e) {
    e !== null && e.button !== 0 || (this.dragging && this.axis !== null && (hn.mode = this.mode, this.dispatchEvent(hn)), this.dragging = !1, this.axis = null);
  }
  dispose() {
    this.disconnect(), this._root.dispose();
  }
  // Set current object
  attach(e) {
    return this.object = e, this._root.visible = !0, this;
  }
  // Detach from object
  detach() {
    return this.object = void 0, this.axis = null, this._root.visible = !1, this;
  }
  reset() {
    this.enabled && this.dragging && (this.object.position.copy(this._positionStart), this.object.quaternion.copy(this._quaternionStart), this.object.scale.copy(this._scaleStart), this.dispatchEvent(It), this.dispatchEvent(un), this.pointStart.copy(this.pointEnd));
  }
  getRaycaster() {
    return Ne;
  }
  // TODO: deprecate
  getMode() {
    return this.mode;
  }
  setMode(e) {
    this.mode = e;
  }
  setTranslationSnap(e) {
    this.translationSnap = e;
  }
  setRotationSnap(e) {
    this.rotationSnap = e;
  }
  setScaleSnap(e) {
    this.scaleSnap = e;
  }
  setSize(e) {
    this.size = e;
  }
  setSpace(e) {
    this.space = e;
  }
}
function Bi(a) {
  if (this.domElement.ownerDocument.pointerLockElement)
    return {
      x: 0,
      y: 0,
      button: a.button
    };
  {
    const e = this.domElement.getBoundingClientRect();
    return {
      x: (a.clientX - e.left) / e.width * 2 - 1,
      y: -(a.clientY - e.top) / e.height * 2 + 1,
      button: a.button
    };
  }
}
function Gi(a) {
  if (this.enabled)
    switch (a.pointerType) {
      case "mouse":
      case "pen":
        this.pointerHover(this._getPointer(a));
        break;
    }
}
function Yi(a) {
  this.enabled && (document.pointerLockElement || this.domElement.setPointerCapture(a.pointerId), this.domElement.addEventListener("pointermove", this._onPointerMove), this.pointerHover(this._getPointer(a)), this.pointerDown(this._getPointer(a)));
}
function Xi(a) {
  this.enabled && this.pointerMove(this._getPointer(a));
}
function Ki(a) {
  this.enabled && (this.domElement.releasePointerCapture(a.pointerId), this.domElement.removeEventListener("pointermove", this._onPointerMove), this.pointerUp(this._getPointer(a)));
}
function Dt(a, e, t) {
  const i = e.intersectObject(a, !0);
  for (let n = 0; n < i.length; n++)
    if (i[n].object.visible || t)
      return i[n];
  return !1;
}
const ft = new gs(), U = new T(0, 1, 0), dn = new T(0, 0, 0), fn = new Xe(), pt = new le(), _t = new le(), ge = new T(), pn = new Xe(), nt = new T(1, 0, 0), je = new T(0, 1, 0), st = new T(0, 0, 1), mt = new T(), et = new T(), tt = new T();
class Zi extends rt {
  constructor(e) {
    super(), this.isTransformControlsRoot = !0, this.controls = e, this.visible = !1;
  }
  // updateMatrixWorld updates key transformation variables
  updateMatrixWorld(e) {
    const t = this.controls;
    t.object !== void 0 && (t.object.updateMatrixWorld(), t.object.parent === null ? console.error("TransformControls: The attached 3D object must be a part of the scene graph.") : t.object.parent.matrixWorld.decompose(t._parentPosition, t._parentQuaternion, t._parentScale), t.object.matrixWorld.decompose(t.worldPosition, t.worldQuaternion, t._worldScale), t._parentQuaternionInv.copy(t._parentQuaternion).invert(), t._worldQuaternionInv.copy(t.worldQuaternion).invert()), t.camera.updateMatrixWorld(), t.camera.matrixWorld.decompose(t.cameraPosition, t.cameraQuaternion, t._cameraScale), t.camera.isOrthographicCamera ? t.camera.getWorldDirection(t.eye).negate() : t.eye.copy(t.cameraPosition).sub(t.worldPosition).normalize(), super.updateMatrixWorld(e);
  }
  dispose() {
    this.traverse(function(e) {
      e.geometry && e.geometry.dispose(), e.material && e.material.dispose();
    });
  }
}
class Vi extends rt {
  constructor() {
    super(), this.isTransformControlsGizmo = !0, this.type = "TransformControlsGizmo";
    const e = new ke({
      depthTest: !1,
      depthWrite: !1,
      fog: !1,
      toneMapped: !1,
      transparent: !0
    }), t = new wn({
      depthTest: !1,
      depthWrite: !1,
      fog: !1,
      toneMapped: !1,
      transparent: !0
    }), i = e.clone();
    i.opacity = 0.15;
    const n = t.clone();
    n.opacity = 0.5;
    const o = e.clone();
    o.color.setHex(16711680);
    const s = e.clone();
    s.color.setHex(65280);
    const r = e.clone();
    r.color.setHex(255);
    const c = e.clone();
    c.color.setHex(16711680), c.opacity = 0.5;
    const h = e.clone();
    h.color.setHex(65280), h.opacity = 0.5;
    const d = e.clone();
    d.color.setHex(255), d.opacity = 0.5;
    const u = e.clone();
    u.opacity = 0.25;
    const f = e.clone();
    f.color.setHex(16776960), f.opacity = 0.25, e.clone().color.setHex(16776960);
    const m = e.clone();
    m.color.setHex(7895160);
    const E = new ae(0, 0.04, 0.1, 12);
    E.translate(0, 0.05, 0);
    const y = new se(0.08, 0.08, 0.08);
    y.translate(0, 0.04, 0);
    const b = new yt();
    b.setAttribute("position", new wt([0, 0, 0, 1, 0, 0], 3));
    const M = new ae(75e-4, 75e-4, 0.5, 3);
    M.translate(0, 0.25, 0);
    function L(z, I) {
      const Z = new Qe(z, 75e-4, 3, 64, I * Math.PI * 2);
      return Z.rotateY(Math.PI / 2), Z.rotateX(Math.PI / 2), Z;
    }
    function x() {
      const z = new yt();
      return z.setAttribute("position", new wt([0, 0, 0, 1, 1, 1], 3)), z;
    }
    const X = {
      X: [
        [new _(E, o), [0.5, 0, 0], [0, 0, -Math.PI / 2]],
        [new _(E, o), [-0.5, 0, 0], [0, 0, Math.PI / 2]],
        [new _(M, o), [0, 0, 0], [0, 0, -Math.PI / 2]]
      ],
      Y: [
        [new _(E, s), [0, 0.5, 0]],
        [new _(E, s), [0, -0.5, 0], [Math.PI, 0, 0]],
        [new _(M, s)]
      ],
      Z: [
        [new _(E, r), [0, 0, 0.5], [Math.PI / 2, 0, 0]],
        [new _(E, r), [0, 0, -0.5], [-Math.PI / 2, 0, 0]],
        [new _(M, r), null, [Math.PI / 2, 0, 0]]
      ],
      XYZ: [
        [new _(new ht(0.1, 0), u.clone()), [0, 0, 0]]
      ],
      XY: [
        [new _(new se(0.15, 0.15, 0.01), d.clone()), [0.15, 0.15, 0]]
      ],
      YZ: [
        [new _(new se(0.15, 0.15, 0.01), c.clone()), [0, 0.15, 0.15], [0, Math.PI / 2, 0]]
      ],
      XZ: [
        [new _(new se(0.15, 0.15, 0.01), h.clone()), [0.15, 0, 0.15], [-Math.PI / 2, 0, 0]]
      ]
    }, A = {
      X: [
        [new _(new ae(0.2, 0, 0.6, 4), i), [0.3, 0, 0], [0, 0, -Math.PI / 2]],
        [new _(new ae(0.2, 0, 0.6, 4), i), [-0.3, 0, 0], [0, 0, Math.PI / 2]]
      ],
      Y: [
        [new _(new ae(0.2, 0, 0.6, 4), i), [0, 0.3, 0]],
        [new _(new ae(0.2, 0, 0.6, 4), i), [0, -0.3, 0], [0, 0, Math.PI]]
      ],
      Z: [
        [new _(new ae(0.2, 0, 0.6, 4), i), [0, 0, 0.3], [Math.PI / 2, 0, 0]],
        [new _(new ae(0.2, 0, 0.6, 4), i), [0, 0, -0.3], [-Math.PI / 2, 0, 0]]
      ],
      XYZ: [
        [new _(new ht(0.2, 0), i)]
      ],
      XY: [
        [new _(new se(0.2, 0.2, 0.01), i), [0.15, 0.15, 0]]
      ],
      YZ: [
        [new _(new se(0.2, 0.2, 0.01), i), [0, 0.15, 0.15], [0, Math.PI / 2, 0]]
      ],
      XZ: [
        [new _(new se(0.2, 0.2, 0.01), i), [0.15, 0, 0.15], [-Math.PI / 2, 0, 0]]
      ]
    }, S = {
      START: [
        [new _(new ht(0.01, 2), n), null, null, null, "helper"]
      ],
      END: [
        [new _(new ht(0.01, 2), n), null, null, null, "helper"]
      ],
      DELTA: [
        [new xe(x(), n), null, null, null, "helper"]
      ],
      X: [
        [new xe(b, n.clone()), [-1e3, 0, 0], null, [1e6, 1, 1], "helper"]
      ],
      Y: [
        [new xe(b, n.clone()), [0, -1e3, 0], [0, 0, Math.PI / 2], [1e6, 1, 1], "helper"]
      ],
      Z: [
        [new xe(b, n.clone()), [0, 0, -1e3], [0, -Math.PI / 2, 0], [1e6, 1, 1], "helper"]
      ]
    }, v = {
      XYZE: [
        [new _(L(0.5, 1), m), null, [0, Math.PI / 2, 0]]
      ],
      X: [
        [new _(L(0.5, 0.5), o)]
      ],
      Y: [
        [new _(L(0.5, 0.5), s), null, [0, 0, -Math.PI / 2]]
      ],
      Z: [
        [new _(L(0.5, 0.5), r), null, [0, Math.PI / 2, 0]]
      ],
      E: [
        [new _(L(0.75, 1), f), null, [0, Math.PI / 2, 0]]
      ]
    }, C = {
      AXIS: [
        [new xe(b, n.clone()), [-1e3, 0, 0], null, [1e6, 1, 1], "helper"]
      ]
    }, O = {
      XYZE: [
        [new _(new _s(0.25, 10, 8), i)]
      ],
      X: [
        [new _(new Qe(0.5, 0.1, 4, 24), i), [0, 0, 0], [0, -Math.PI / 2, -Math.PI / 2]]
      ],
      Y: [
        [new _(new Qe(0.5, 0.1, 4, 24), i), [0, 0, 0], [Math.PI / 2, 0, 0]]
      ],
      Z: [
        [new _(new Qe(0.5, 0.1, 4, 24), i), [0, 0, 0], [0, 0, -Math.PI / 2]]
      ],
      E: [
        [new _(new Qe(0.75, 0.1, 2, 24), i)]
      ]
    }, he = {
      X: [
        [new _(y, o), [0.5, 0, 0], [0, 0, -Math.PI / 2]],
        [new _(M, o), [0, 0, 0], [0, 0, -Math.PI / 2]],
        [new _(y, o), [-0.5, 0, 0], [0, 0, Math.PI / 2]]
      ],
      Y: [
        [new _(y, s), [0, 0.5, 0]],
        [new _(M, s)],
        [new _(y, s), [0, -0.5, 0], [0, 0, Math.PI]]
      ],
      Z: [
        [new _(y, r), [0, 0, 0.5], [Math.PI / 2, 0, 0]],
        [new _(M, r), [0, 0, 0], [Math.PI / 2, 0, 0]],
        [new _(y, r), [0, 0, -0.5], [-Math.PI / 2, 0, 0]]
      ],
      XY: [
        [new _(new se(0.15, 0.15, 0.01), d), [0.15, 0.15, 0]]
      ],
      YZ: [
        [new _(new se(0.15, 0.15, 0.01), c), [0, 0.15, 0.15], [0, Math.PI / 2, 0]]
      ],
      XZ: [
        [new _(new se(0.15, 0.15, 0.01), h), [0.15, 0, 0.15], [-Math.PI / 2, 0, 0]]
      ],
      XYZ: [
        [new _(new se(0.1, 0.1, 0.1), u.clone())]
      ]
    }, Q = {
      X: [
        [new _(new ae(0.2, 0, 0.6, 4), i), [0.3, 0, 0], [0, 0, -Math.PI / 2]],
        [new _(new ae(0.2, 0, 0.6, 4), i), [-0.3, 0, 0], [0, 0, Math.PI / 2]]
      ],
      Y: [
        [new _(new ae(0.2, 0, 0.6, 4), i), [0, 0.3, 0]],
        [new _(new ae(0.2, 0, 0.6, 4), i), [0, -0.3, 0], [0, 0, Math.PI]]
      ],
      Z: [
        [new _(new ae(0.2, 0, 0.6, 4), i), [0, 0, 0.3], [Math.PI / 2, 0, 0]],
        [new _(new ae(0.2, 0, 0.6, 4), i), [0, 0, -0.3], [-Math.PI / 2, 0, 0]]
      ],
      XY: [
        [new _(new se(0.2, 0.2, 0.01), i), [0.15, 0.15, 0]]
      ],
      YZ: [
        [new _(new se(0.2, 0.2, 0.01), i), [0, 0.15, 0.15], [0, Math.PI / 2, 0]]
      ],
      XZ: [
        [new _(new se(0.2, 0.2, 0.01), i), [0.15, 0, 0.15], [-Math.PI / 2, 0, 0]]
      ],
      XYZ: [
        [new _(new se(0.2, 0.2, 0.2), i), [0, 0, 0]]
      ]
    }, fe = {
      X: [
        [new xe(b, n.clone()), [-1e3, 0, 0], null, [1e6, 1, 1], "helper"]
      ],
      Y: [
        [new xe(b, n.clone()), [0, -1e3, 0], [0, 0, Math.PI / 2], [1e6, 1, 1], "helper"]
      ],
      Z: [
        [new xe(b, n.clone()), [0, 0, -1e3], [0, -Math.PI / 2, 0], [1e6, 1, 1], "helper"]
      ]
    };
    function K(z) {
      const I = new rt();
      for (const Z in z)
        for (let oe = z[Z].length; oe--; ) {
          const H = z[Z][oe][0].clone(), ue = z[Z][oe][1], $ = z[Z][oe][2], pe = z[Z][oe][3], V = z[Z][oe][4];
          H.name = Z, H.tag = V, ue && H.position.set(ue[0], ue[1], ue[2]), $ && H.rotation.set($[0], $[1], $[2]), pe && H.scale.set(pe[0], pe[1], pe[2]), H.updateMatrix();
          const te = H.geometry.clone();
          te.applyMatrix4(H.matrix), H.geometry = te, H.renderOrder = 1 / 0, H.position.set(0, 0, 0), H.rotation.set(0, 0, 0), H.scale.set(1, 1, 1), I.add(H);
        }
      return I;
    }
    this.gizmo = {}, this.picker = {}, this.helper = {}, this.add(this.gizmo.translate = K(X)), this.add(this.gizmo.rotate = K(v)), this.add(this.gizmo.scale = K(he)), this.add(this.picker.translate = K(A)), this.add(this.picker.rotate = K(O)), this.add(this.picker.scale = K(Q)), this.add(this.helper.translate = K(S)), this.add(this.helper.rotate = K(C)), this.add(this.helper.scale = K(fe)), this.picker.translate.visible = !1, this.picker.rotate.visible = !1, this.picker.scale.visible = !1;
  }
  // updateMatrixWorld will update transformations and appearance of individual handles
  updateMatrixWorld(e) {
    const i = (this.mode === "scale" ? "local" : this.space) === "local" ? this.worldQuaternion : _t;
    this.gizmo.translate.visible = this.mode === "translate", this.gizmo.rotate.visible = this.mode === "rotate", this.gizmo.scale.visible = this.mode === "scale", this.helper.translate.visible = this.mode === "translate", this.helper.rotate.visible = this.mode === "rotate", this.helper.scale.visible = this.mode === "scale";
    let n = [];
    n = n.concat(this.picker[this.mode].children), n = n.concat(this.gizmo[this.mode].children), n = n.concat(this.helper[this.mode].children);
    for (let o = 0; o < n.length; o++) {
      const s = n[o];
      s.visible = !0, s.rotation.set(0, 0, 0), s.position.copy(this.worldPosition);
      let r;
      if (this.camera.isOrthographicCamera ? r = (this.camera.top - this.camera.bottom) / this.camera.zoom : r = this.worldPosition.distanceTo(this.cameraPosition) * Math.min(1.9 * Math.tan(Math.PI * this.camera.fov / 360) / this.camera.zoom, 7), s.scale.set(1, 1, 1).multiplyScalar(r * this.size / 4), s.tag === "helper") {
        s.visible = !1, s.name === "AXIS" ? (s.visible = !!this.axis, this.axis === "X" && (B.setFromEuler(ft.set(0, 0, 0)), s.quaternion.copy(i).multiply(B), Math.abs(U.copy(nt).applyQuaternion(i).dot(this.eye)) > 0.9 && (s.visible = !1)), this.axis === "Y" && (B.setFromEuler(ft.set(0, 0, Math.PI / 2)), s.quaternion.copy(i).multiply(B), Math.abs(U.copy(je).applyQuaternion(i).dot(this.eye)) > 0.9 && (s.visible = !1)), this.axis === "Z" && (B.setFromEuler(ft.set(0, Math.PI / 2, 0)), s.quaternion.copy(i).multiply(B), Math.abs(U.copy(st).applyQuaternion(i).dot(this.eye)) > 0.9 && (s.visible = !1)), this.axis === "XYZE" && (B.setFromEuler(ft.set(0, Math.PI / 2, 0)), U.copy(this.rotationAxis), s.quaternion.setFromRotationMatrix(fn.lookAt(dn, U, je)), s.quaternion.multiply(B), s.visible = this.dragging), this.axis === "E" && (s.visible = !1)) : s.name === "START" ? (s.position.copy(this.worldPositionStart), s.visible = this.dragging) : s.name === "END" ? (s.position.copy(this.worldPosition), s.visible = this.dragging) : s.name === "DELTA" ? (s.position.copy(this.worldPositionStart), s.quaternion.copy(this.worldQuaternionStart), ee.set(1e-10, 1e-10, 1e-10).add(this.worldPositionStart).sub(this.worldPosition).multiplyScalar(-1), ee.applyQuaternion(this.worldQuaternionStart.clone().invert()), s.scale.copy(ee), s.visible = this.dragging) : (s.quaternion.copy(i), this.dragging ? s.position.copy(this.worldPositionStart) : s.position.copy(this.worldPosition), this.axis && (s.visible = this.axis.search(s.name) !== -1));
        continue;
      }
      s.quaternion.copy(i), this.mode === "translate" || this.mode === "scale" ? (s.name === "X" && Math.abs(U.copy(nt).applyQuaternion(i).dot(this.eye)) > 0.99 && (s.scale.set(1e-10, 1e-10, 1e-10), s.visible = !1), s.name === "Y" && Math.abs(U.copy(je).applyQuaternion(i).dot(this.eye)) > 0.99 && (s.scale.set(1e-10, 1e-10, 1e-10), s.visible = !1), s.name === "Z" && Math.abs(U.copy(st).applyQuaternion(i).dot(this.eye)) > 0.99 && (s.scale.set(1e-10, 1e-10, 1e-10), s.visible = !1), s.name === "XY" && Math.abs(U.copy(st).applyQuaternion(i).dot(this.eye)) < 0.2 && (s.scale.set(1e-10, 1e-10, 1e-10), s.visible = !1), s.name === "YZ" && Math.abs(U.copy(nt).applyQuaternion(i).dot(this.eye)) < 0.2 && (s.scale.set(1e-10, 1e-10, 1e-10), s.visible = !1), s.name === "XZ" && Math.abs(U.copy(je).applyQuaternion(i).dot(this.eye)) < 0.2 && (s.scale.set(1e-10, 1e-10, 1e-10), s.visible = !1)) : this.mode === "rotate" && (pt.copy(i), U.copy(this.eye).applyQuaternion(B.copy(i).invert()), s.name.search("E") !== -1 && s.quaternion.setFromRotationMatrix(fn.lookAt(this.eye, dn, je)), s.name === "X" && (B.setFromAxisAngle(nt, Math.atan2(-U.y, U.z)), B.multiplyQuaternions(pt, B), s.quaternion.copy(B)), s.name === "Y" && (B.setFromAxisAngle(je, Math.atan2(U.x, U.z)), B.multiplyQuaternions(pt, B), s.quaternion.copy(B)), s.name === "Z" && (B.setFromAxisAngle(st, Math.atan2(U.y, U.x)), B.multiplyQuaternions(pt, B), s.quaternion.copy(B))), s.visible = s.visible && (s.name.indexOf("X") === -1 || this.showX), s.visible = s.visible && (s.name.indexOf("Y") === -1 || this.showY), s.visible = s.visible && (s.name.indexOf("Z") === -1 || this.showZ), s.visible = s.visible && (s.name.indexOf("E") === -1 || this.showX && this.showY && this.showZ), s.material._color = s.material._color || s.material.color.clone(), s.material._opacity = s.material._opacity || s.material.opacity, s.material.color.copy(s.material._color), s.material.opacity = s.material._opacity, this.enabled && this.axis && (s.name === this.axis || this.axis.split("").some(function(c) {
        return s.name === c;
      })) && (s.material.color.setHex(16776960), s.material.opacity = 1);
    }
    super.updateMatrixWorld(e);
  }
}
class Wi extends _ {
  constructor() {
    super(
      new ys(1e5, 1e5, 2, 2),
      new ke({ visible: !1, wireframe: !0, side: xn, transparent: !0, opacity: 0.1, toneMapped: !1 })
    ), this.isTransformControlsPlane = !0, this.type = "TransformControlsPlane";
  }
  updateMatrixWorld(e) {
    let t = this.space;
    switch (this.position.copy(this.worldPosition), this.mode === "scale" && (t = "local"), mt.copy(nt).applyQuaternion(t === "local" ? this.worldQuaternion : _t), et.copy(je).applyQuaternion(t === "local" ? this.worldQuaternion : _t), tt.copy(st).applyQuaternion(t === "local" ? this.worldQuaternion : _t), U.copy(et), this.mode) {
      case "translate":
      case "scale":
        switch (this.axis) {
          case "X":
            U.copy(this.eye).cross(mt), ge.copy(mt).cross(U);
            break;
          case "Y":
            U.copy(this.eye).cross(et), ge.copy(et).cross(U);
            break;
          case "Z":
            U.copy(this.eye).cross(tt), ge.copy(tt).cross(U);
            break;
          case "XY":
            ge.copy(tt);
            break;
          case "YZ":
            ge.copy(mt);
            break;
          case "XZ":
            U.copy(tt), ge.copy(et);
            break;
          case "XYZ":
          case "E":
            ge.set(0, 0, 0);
            break;
        }
        break;
      case "rotate":
      default:
        ge.set(0, 0, 0);
    }
    ge.length() === 0 ? this.quaternion.copy(this.cameraQuaternion) : (pn.lookAt(ee.set(0, 0, 0), ge, U), this.quaternion.setFromRotationMatrix(pn)), super.updateMatrixWorld(e);
  }
}
const Qi = () => {
  const [a, e] = gt(!1), [t, i] = gt(!1), [n, o] = gt([]), s = me(), r = me(), c = me(), h = me(), d = me(), u = me(null), f = me(new j.Raycaster()), p = me(null), m = me(null), E = me(null), y = new Ss(), b = new DRACOLoader();
  b.setDecoderPath(
    "https://www.gstatic.com/draco/versioned/decoders/1.5.7/"
  ), b.setDecoderConfig({ type: "js" }), y.setDRACOLoader(b), At(() => {
    const A = s.current.clientWidth, S = s.current.clientHeight, v = new j.Scene();
    v.background = new j.Color(14346226), d.current = v;
    const C = new j.PerspectiveCamera(75, A / S, 0.1, 1e3);
    C.position.set(-17, 26, 16), r.current = C;
    const O = new j.WebGLRenderer({
      antialias: !0,
      alpha: !0,
      preserveDrawingBuffer: !0,
      stencil: !0
    });
    O.setPixelRatio(window.devicePixelRatio), O.setSize(A, S), O.shadowMap.enabled = !0, O.shadowMap.type = j.PCFSoftShadowMap, O.outputEncoding = j.sRGBEncoding, O.localClippingEnabled = !0, O.toneMapping = j.ACESFilmicToneMapping, O.physicallyCorrectLights = !0, s.current.appendChild(O.domElement), h.current = O;
    function he() {
      O.render(v, C);
    }
    const Q = new ai(C, O.domElement);
    Q.dampingFactor = 0.2, Q.enableDamping = !0, Q.target.set(3, 7, -3), c.current = Q;
    const fe = new zi(C, O.domElement);
    fe.addEventListener("objectChange", he), fe.addEventListener("dragging-changed", function(D) {
      Q.enabled = !D.value;
    }), E.current = fe;
    const K = new j.AmbientLight(16777215, 0.3);
    v.add(K);
    const z = new j.HemisphereLight(16777215, 16777215, 0.5);
    v.add(z);
    const I = new j.DirectionalLight();
    I.color.setHex(16777215), I.intensity = 4, I.castShadow = !0;
    const Z = 1.5, oe = 0.75, H = 50, ue = H * Math.sin(Z) * Math.cos(oe), $ = H * Math.cos(Z), pe = H * Math.sin(Z) * Math.sin(oe);
    I.position.set(ue, $, pe), I.shadow.radius = 0, I.shadow.mapSize.width = 8192, I.shadow.mapSize.height = 8192, I.shadow.camera.near = 0.1, I.shadow.camera.far = 100, I.shadow.camera.left = -15, I.shadow.camera.right = 15, I.shadow.camera.top = 15, I.shadow.camera.bottom = -15, I.shadow.bias = -2e-4, I.shadow.normalBias = 1e-3, v.add(I);
    const V = new ws.GUI(), te = V.addFolder("Ambient Light");
    te.add(K, "intensity", 0, 10, 0.1).name("Intensity");
    const at = {
      color: K.color.getHex()
    };
    te.addColor(at, "color").name("Color").onChange((D) => {
      K.color.setHex(D);
    });
    const He = V.addFolder("Hemisphere Light");
    He.add(z, "intensity", 0, 10, 0.1).name("Intensity");
    const Ke = {
      skyColor: z.color.getHex(),
      // Color del cielo inicial
      groundColor: z.groundColor.getHex()
      // Color del suelo inicial
    };
    He.addColor(Ke, "skyColor").name("Sky Color").onChange((D) => {
      z.color.setHex(D);
    }), He.addColor(Ke, "groundColor").name("Ground Color").onChange((D) => {
      z.groundColor.setHex(D);
    });
    const Ae = V.addFolder("Directional Light");
    Ae.add(I, "intensity", 0, 10, 0.1).name("Intensity");
    const ct = {
      color: I.color.getHex()
      // Color inicial
    };
    Ae.addColor(ct, "color").name("Color").onChange((D) => {
      I.color.setHex(D);
    });
    const Fe = {
      x: I.position.x,
      y: I.position.y,
      z: I.position.z
    };
    Ae.add(Fe, "x", -100, 100, 0.1).name("Position X").onChange((D) => {
      I.position.x = D;
    }), Ae.add(Fe, "y", -100, 100, 0.1).name("Position Y").onChange((D) => {
      I.position.y = D;
    }), Ae.add(Fe, "z", -100, 100, 0.1).name("Position Z").onChange((D) => {
      I.position.z = D;
    });
    const ye = [];
    for (let D = 0; D < 5; D++) {
      const Y = new j.SpotLight(16777215, 1);
      Y.position.set((D - 2) * 5, 10, 5), Y.castShadow = !0, Y.angle = Math.PI / 6, Y.penumbra = 0.5, v.add(Y), ye.push({
        color: Y.color.getHex(),
        intensity: Y.intensity,
        x: Y.position.x,
        y: Y.position.y,
        z: Y.position.z
      });
      const q = V.addFolder(`SpotLight ${D + 1}`);
      q.addColor(ye[D], "color").name("Color").onChange((l) => {
        Y.color.setHex(l);
      }), q.add(ye[D], "intensity", 0, 10, 0.1).name("Intensity").onChange((l) => {
        Y.intensity = l;
      }), q.add(ye[D], "x", -20, 20, 0.1).name("Position X").onChange((l) => {
        Y.position.x = l;
      }), q.add(ye[D], "y", 0, 20, 0.1).name("Position Y").onChange((l) => {
        Y.position.y = l;
      }), q.add(ye[D], "z", -20, 20, 0.1).name("Position Z").onChange((l) => {
        Y.position.z = l;
      });
    }
    let Le = [];
    y.load(
      modelRoute,
      (D) => {
        const Y = D.scene;
        Y.traverse((q) => {
          if (q.isMesh) {
            q.material.metalness = 0.5, q.material.roughness = 0.8, q.material.side = j.DoubleSide, q.castShadow = !0, q.receiveShadow = !0;
            const l = q.name.match(/<(\d{7})/), g = l && l[1];
            Le.push(g), q.geometry.computeVertexNormals();
          }
        }), v.add(Y), Le.length !== n.length && o(Le), u.current = new j.Box3().setFromObject(Y);
      },
      (D) => {
        console.log("Modelo cargado");
      },
      (D) => {
        console.error("Error cargando el modelo:", D);
      }
    );
    const Oe = new Ri(O);
    Oe.addPass(new Pi(v, C));
    const re = new xs(v, C, A, S);
    Oe.addPass(re), re.configuration.gammaCorrection = !1, re.configuration.aoRadius = 5, re.configuration.distanceFalloff = 1, re.configuration.intensity = 5, re.configuration.color = new j.Color(0, 0, 0), re.setQualityMode("high");
    const Se = new j.WebGLRenderTarget(A, S);
    Se.depthTexture = new j.DepthTexture(
      A,
      S,
      j.UnsignedIntType
    ), Se.depthTexture.format = j.DepthFormat, Se.depthTexture = new j.DepthTexture(
      A,
      S,
      j.UnsignedInt248Type
    ), Se.depthTexture.format = j.DepthStencilFormat;
    const Ze = V.addFolder("AAO");
    Ze.add(re.configuration, "aoRadius", 0.1, 10, 0.1).name("AO Radius"), Ze.add(re.configuration, "distanceFalloff", 0.1, 5, 0.1).name("Distance Falloff"), Ze.add(re.configuration, "intensity", 0, 10, 0.1).name("Intensity");
    const Ve = () => {
      requestAnimationFrame(Ve), Q.update(), Oe.render();
    };
    return Ve(), window.addEventListener("resize", () => {
      O.setSize(window.innerWidth, window.innerHeight), Oe.setSize(window.innerWidth, window.innerHeight), C.aspect = window.innerWidth / window.innerHeight, C.updateProjectionMatrix();
    }), () => {
      window.removeEventListener("resize", handleResize), s.current && s.current.removeChild(O.domElement), h.current && h.current.dispose();
    };
  }, []), At(() => {
    const A = h.current, S = (v) => {
      t && M(v);
    };
    t ? A.domElement.addEventListener("dblclick", S) : A.domElement.removeEventListener("dblclick", S);
  }, [t]);
  const M = (A) => {
    const S = h.current, v = r.current, C = d.current, O = f.current, he = E.current;
    if (!S || !v || !C || !O || !he)
      return;
    const Q = S.domElement.getBoundingClientRect(), fe = (A.clientX - Q.left) / Q.width * 2 - 1, K = -((A.clientY - Q.top) / Q.height) * 2 + 1;
    O.setFromCamera({ x: fe, y: K }, v);
    const z = O.intersectObjects(C.children, !0);
    if (z.length === 0) return;
    const Z = z[0].point, oe = new j.Plane();
    p.current = oe;
    const H = he.getHelper();
    C.add(H), m.current && (C.remove(m.current), he.detach(m.current), m.current.geometry.dispose(), m.current.material.dispose(), m.current = null);
    const ue = 8, $ = new j.PlaneGeometry(ue, ue), pe = new j.MeshPhongMaterial({
      color: 9491967,
      side: j.DoubleSide,
      transparent: !0,
      opacity: 0.3
    }), V = new j.Mesh($, pe);
    V.position.copy(Z);
    const te = new j.Vector3();
    v.getWorldDirection(te), Math.abs(te.y) > 0.7 ? te.y > 0 ? V.rotation.set(-Math.PI / 2, 0, 0) : V.rotation.set(Math.PI / 2, 0, 0) : V.rotation.set(0, 0, 0), C.add(V), m.current = V, L(), S.clippingPlanes = [oe], he.attach(V), he.addEventListener("change", L);
  }, L = () => {
    const A = p.current, S = m.current;
    if (!A || !S) return;
    const v = new j.Vector3(0, 0, 1);
    S.getWorldDirection(v);
    const C = new j.Vector3().setFromMatrixPosition(
      S.matrixWorld
    );
    A.setFromNormalAndCoplanarPoint(v, C);
  }, x = (A, S = 1) => {
    const v = r.current, C = c.current;
    if (!v || !C) return;
    const O = new j.Vector3();
    u.current.getCenter(O), bs.to(v.position, {
      duration: S,
      x: A.x,
      y: A.y,
      z: A.z,
      ease: "power2.inOut",
      onUpdate: () => {
        C.update();
      },
      onComplete: () => {
        v.lookAt(O), C.target.copy(O), C.update();
      }
    });
  }, X = () => {
    const A = d.current, S = h.current, v = E.current;
    m.current && (A.remove(m.current), v.detach(m.current), m.current.geometry.dispose(), m.current.material.dispose(), m.current = null), S && (S.clippingPlanes = []), p.current = null;
  };
  return At(() => {
    t || X();
  }, [t]), /* @__PURE__ */ k.jsxs(
    "div",
    {
      style: {
        position: "relative",
        width: "100%",
        height: "100%"
      },
      children: [
        /* @__PURE__ */ k.jsx(
          "section",
          {
            ref: s,
            style: {
              position: "relative",
              width: "100%",
              height: "100%"
            }
          }
        ),
        /* @__PURE__ */ k.jsxs(
          "nav",
          {
            style: {
              display: "flex",
              gap: "15px",
              position: "absolute",
              bottom: "20px",
              left: "50%",
              padding: "10px"
            },
            children: [
              /* @__PURE__ */ k.jsx(Ot, { text: "Centra la camara en el modelo", children: /* @__PURE__ */ k.jsx(Fi, { onClick: () => x({ x: -17, y: 26, z: 16 }), children: /* @__PURE__ */ k.jsx(ji, {}) }) }),
              /* @__PURE__ */ k.jsx(Ot, { text: "Activa un boundingbox alrededor del modelo", children: /* @__PURE__ */ k.jsx(
                "button",
                {
                  onClick: () => i(!t),
                  style: {
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    height: "2rem",
                    width: "2rem",
                    background: t ? "#3D3C3B" : "#f9f9f9",
                    color: t ? "#f9f9f9" : "#3D3C3B",
                    borderRadius: "50%",
                    boxShadow: "0 0 5px rgba(0, 0, 0, 0.1)",
                    border: "none",
                    cursor: "pointer",
                    padding: "0.2rem"
                  },
                  children: /* @__PURE__ */ k.jsx(ki, {})
                }
              ) }),
              /* @__PURE__ */ k.jsxs("div", { style: { position: "relative" }, children: [
                /* @__PURE__ */ k.jsx(Ot, { text: "Abre Menu de navegacion de la camara", children: /* @__PURE__ */ k.jsx(
                  "button",
                  {
                    onClick: () => e(!a),
                    style: {
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      height: "2rem",
                      width: "2rem",
                      background: a ? "#3D3C3B" : "#f9f9f9",
                      color: a ? "#f9f9f9" : "#3D3C3B",
                      borderRadius: "50%",
                      boxShadow: "0 0 5px rgba(0, 0, 0, 0.1)",
                      border: "none",
                      cursor: "pointer",
                      padding: "0.2rem"
                    },
                    children: /* @__PURE__ */ k.jsx(Hi, {})
                  }
                ) }),
                a && /* @__PURE__ */ k.jsxs(
                  "div",
                  {
                    style: {
                      position: "absolute",
                      display: "flex",
                      flexDirection: "column",
                      gap: "5px",
                      bottom: "100%",
                      marginBottom: "5px",
                      padding: "5px",
                      background: "#f9f9f9",
                      borderRadius: "5px",
                      boxShadow: "0 0 5px rgba(0,0,0,0.1)"
                    },
                    children: [
                      /* @__PURE__ */ k.jsx(ze, { onClick: () => x({ x: 0, y: 30, z: 0 }), children: "Arriba" }),
                      /* @__PURE__ */ k.jsx(ze, { onClick: () => x({ x: -30, y: 0, z: 0 }), children: "Izquierda" }),
                      /* @__PURE__ */ k.jsx(ze, { onClick: () => x({ x: 0, y: -30, z: 0 }), children: "Abajo" }),
                      /* @__PURE__ */ k.jsx(ze, { onClick: () => x({ x: 30, y: 0, z: 0 }), children: "Derecha" }),
                      /* @__PURE__ */ k.jsx(ze, { onClick: () => x({ x: 0, y: 0, z: 30 }), children: "Frente" }),
                      /* @__PURE__ */ k.jsx(ze, { onClick: () => x({ x: 0, y: 0, z: -30 }), children: "Detras" })
                    ]
                  }
                )
              ] })
            ]
          }
        ),
        n && /* @__PURE__ */ k.jsxs(
          "section",
          {
            style: {
              display: "flex",
              flexDirection: "column",
              overflow: "hidden",
              borderRadius: "5px",
              gap: "10px",
              position: "absolute",
              width: "300px",
              bottom: "50px",
              left: "5px",
              padding: "10px",
              background: "#f9f9f9",
              color: "#3D3C3B"
            },
            children: [
              /* @__PURE__ */ k.jsx("p", { children: "Meshes in the model" }),
              /* @__PURE__ */ k.jsx("div", { style: { overflowY: "auto", maxHeight: "200px" }, children: n.map((A, S) => /* @__PURE__ */ k.jsx("p", { style: { margin: 0, fontSize: "10px" }, children: A }, S)) })
            ]
          }
        )
      ]
    }
  );
}, to = () => /* @__PURE__ */ k.jsx(Qi, {});
export {
  to as Visor
};
