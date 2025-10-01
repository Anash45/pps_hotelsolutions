import{c as n,b as d,j as e,L as h,r as l,f as m,X as f}from"./app-BIfnRM97.js";import{A as x}from"./ApplicationLogo-BymrPUiF.js";/**
 * @license lucide-react v0.542.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const g=[["path",{d:"m18 15-6-6-6 6",key:"153udz"}]],j=n("chevron-up",g);/**
 * @license lucide-react v0.542.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const y=[["path",{d:"m18 16 4-4-4-4",key:"1inbqp"}],["path",{d:"m6 8-4 4 4 4",key:"15zrgr"}],["path",{d:"m14.5 4-5 16",key:"e7oirm"}]],k=n("code-xml",y);/**
 * @license lucide-react v0.542.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const b=[["path",{d:"M10 22v-6.57",key:"1wmca3"}],["path",{d:"M12 11h.01",key:"z322tv"}],["path",{d:"M12 7h.01",key:"1ivr5q"}],["path",{d:"M14 15.43V22",key:"1q2vjd"}],["path",{d:"M15 16a5 5 0 0 0-6 0",key:"o9wqvi"}],["path",{d:"M16 11h.01",key:"xkw8gn"}],["path",{d:"M16 7h.01",key:"1kdx03"}],["path",{d:"M8 11h.01",key:"1dfujw"}],["path",{d:"M8 7h.01",key:"1vti4s"}],["rect",{x:"4",y:"2",width:"16",height:"20",rx:"2",key:"1uxh74"}]],w=n("hotel",b);/**
 * @license lucide-react v0.542.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const v=[["path",{d:"M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8",key:"5wwlr5"}],["path",{d:"M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z",key:"1d0kgt"}]],N=n("house",v);/**
 * @license lucide-react v0.542.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const M=[["path",{d:"M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z",key:"1s6t7t"}],["circle",{cx:"16.5",cy:"7.5",r:".5",fill:"currentColor",key:"w0ekpg"}]],_=n("key-round",M);/**
 * @license lucide-react v0.542.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const E=[["path",{d:"m16 17 5-5-5-5",key:"1bji2h"}],["path",{d:"M21 12H9",key:"dn1m92"}],["path",{d:"M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4",key:"1uf3rs"}]],$=n("log-out",E);/**
 * @license lucide-react v0.542.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const C=[["path",{d:"M4 12h16",key:"1lakjw"}],["path",{d:"M4 18h16",key:"19g7jn"}],["path",{d:"M4 6h16",key:"1o0s65"}]],A=n("menu",C);/**
 * @license lucide-react v0.542.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const L=[["path",{d:"M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2",key:"975kel"}],["circle",{cx:"12",cy:"7",r:"4",key:"17ys0d"}]],O=n("user",L);/**
 * @license lucide-react v0.542.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const U=[["path",{d:"M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2",key:"1yyitq"}],["path",{d:"M16 3.128a4 4 0 0 1 0 7.744",key:"16gr8j"}],["path",{d:"M22 21v-2a4 4 0 0 0-3-3.87",key:"kshegd"}],["circle",{cx:"9",cy:"7",r:"4",key:"nufk8"}]],H=n("users",U),S=[{name:"Dashboard",icon:N,route:"dashboard"},{name:"Key Management",icon:_,route:"keys.index"},{name:"Hotel Configurator",icon:w,route:"hotels.index"},{name:"Users Management",icon:H,route:"users.index",adminOnly:!0},{name:"Code Generator",icon:k,route:"codes.index",adminOnly:!0}],W=()=>{const t=d(),{props:a}=d(),r=a.auth?.user,o=t.url||window.location.pathname,i=s=>{const c=new URL(route(s)).pathname;return o===c||o.startsWith(c+"/")};return e.jsx("ul",{className:"flex flex-col gap-1 px-4 pb-4",children:S.filter(s=>!(s.adminOnly&&r?.role!=="admin")).map((s,c)=>{const u=s.icon,p=i(s.route);return e.jsx("li",{children:e.jsxs(h,{href:route(s.route),className:`p-2 flex items-center gap-3 text-base leading-[23px] rounded-lg ${p?"bg-[#F1F5F9]":"text-[#09090B]"}`,children:[e.jsx(u,{strokeWidth:2,className:"h-5 w-5"}),e.jsx("span",{children:s.name})]})},c)})})},z=()=>{const[t,a]=l.useState(!1),r=l.useRef(null),o=d().props.auth.user;return l.useEffect(()=>{const i=s=>{r.current&&!r.current.contains(s.target)&&a(!1)};return document.addEventListener("mousedown",i),()=>document.removeEventListener("mousedown",i)},[]),e.jsxs("div",{ref:r,className:"drop-wrapper p-4 relative",children:[e.jsxs("div",{onClick:()=>a(!t),className:`p-[9px] rounded-xl flex items-center gap-3 justify-between cursor-pointer border-2 transition-all duration-300 ${t?"border-[#6366F1]":"border-transparent"}`,children:[e.jsxs("div",{className:"flex items-center gap-3 font-inter",children:[e.jsx("img",{src:o.profile_image?`/storage/${o.profile_image}`:"/images/user-placeholder.png",alt:"User Avatar",className:"h-11 w-11 rounded-[6px] object-cover object-center"}),e.jsxs("div",{className:"flex flex-col gap-0.5",children:[e.jsx("span",{className:"text-[15.5px] leading-[22px] text-[#71717A] font-medium",children:o.first_name}),e.jsx("span",{className:"text-[13.5px] leading-[18px] text-[#71717A] font-medium break-all",children:o.email})]})]}),e.jsx(j,{className:`text-[#71717A] h-[22px] w-[22px] transition-transform duration-300 ${t?"rotate-180":""}`,strokeWidth:2})]}),e.jsx("div",{className:`absolute user-dropup p-2 bottom-full left-4 right-4 bg-white rounded-lg overflow-hidden transition-all duration-300 ${t?"opacity-100 translate-y-0":"opacity-0 translate-y-2 pointer-events-none"}`,children:e.jsxs("ul",{className:"flex flex-col px-2",children:[e.jsx("li",{children:e.jsxs("a",{href:route("profile.edit"),className:"flex items-center gap-3 p-2 text-[#09090B] font-medium rounded-md text-sm hover:bg-gray-100",children:[e.jsx(O,{className:"h-4 w-4 text-[#1E293B]",strokeWidth:2}),e.jsx("span",{children:"My Profile"})]})}),e.jsx("div",{className:"py-1 px-2",children:e.jsx("div",{className:"border-b border-b-[#E4E4E7]"})}),e.jsx("li",{children:e.jsxs("button",{onClick:()=>m.post(route("logout")),className:"flex items-center gap-3 p-2 text-[#09090B] font-medium rounded-md text-sm hover:bg-gray-100 w-full text-left",children:[e.jsx($,{className:"h-4 w-4 text-[#1E293B]",strokeWidth:2}),e.jsx("span",{children:"Sign Out"})]})})]})})]})},q=()=>{const[t,a]=l.useState(!1);return e.jsxs("aside",{className:"lg:w-[290px] w-full bg-white",children:[e.jsxs("div",{className:"py-4 pe-4 flex items-center gap-3 justify-between lg:hidden",children:[e.jsx(h,{href:route("dashboard"),children:e.jsx(x,{className:"md:h-[30.77px] h-6 w-auto"})}),e.jsx("button",{className:"h-8 w-8 rounded-full bg-[#83af8221] flex items-center justify-center flex-col",onClick:()=>{a(!0)},children:e.jsx(A,{strokeWidth:2,className:"text-black h-4 w-4"})})]}),e.jsx("div",{className:`h-full lg:static fixed top-0 left-0 z-50 w-full mobile-sidebar-wrapper transition-all duration-500 ${t?"translate-x-0":"lg:translate-x-0 -translate-x-full"}`,onClick:()=>{a(!1)},children:e.jsxs("div",{className:"flex flex-col pt-4 gap-[22px] h-full lg:w-full w-[290px] bg-white lg:shadow-none shadow-lg",onClick:r=>{r.stopPropagation()},children:[e.jsxs("div",{className:"py-4 flex items-center gap-3 justify-between pe-4",children:[e.jsx(h,{href:route("dashboard"),children:e.jsx(x,{className:"md:h-[30.77px] h-6 w-auto"})}),e.jsx("button",{className:"h-8 w-8 rounded-full bg-[#83af8221] flex items-center justify-center flex-col lg:hidden",onClick:()=>{a(!1)},children:e.jsx(f,{strokeWidth:2,className:"text-black h-4 w-4"})})]}),e.jsxs("div",{className:"flex grow flex-col justify-content-between",children:[e.jsxs("div",{className:"h-full flex flex-col gap-2",children:[e.jsx(W,{}),e.jsx("div",{className:"py-1",children:e.jsx("div",{className:"border-b border-b-[#E4E4E7]"})})]}),e.jsxs("div",{className:"flex flex-col gap-2",children:[e.jsx("div",{className:"py-1",children:e.jsx("div",{className:"border-b border-b-[#E4E4E7]"})}),e.jsx(z,{})]})]})]})})]})};function D({children:t}){d().props.auth.user;const[a,r]=l.useState(!1);return e.jsxs("div",{className:"h-screen max-w-[2500px] mx-auto py-2 px-2 flex lg:flex-row flex-col gap-2 bg-white",children:[e.jsx(q,{}),e.jsx("main",{className:"grow rounded-lg body-main overflow-y-auto",children:t})]})}export{D as A};
