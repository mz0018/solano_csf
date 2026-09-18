import{a as e,t}from"./jsx-runtime-UyaNSxZQ.js";import{t as n}from"./react-Bv8XCUKB.js";import{t as r}from"./bell-sLZnGIUJ.js";import{t as i}from"./chevron-down-DC36jfOV.js";import{c as a,i as o,l as s,s as c,u as l}from"./index--Z3hpeBy.js";import{t as u}from"./DropdownHelper-DEvj1Arb.js";import{t as d}from"./Buttons-BzP2YRJz.js";var f=l(`brick-wall-shield`,[[`path`,{d:`M12 9v1.258`,key:`iwpddn`}],[`path`,{d:`M16 3v5.46`,key:`d7ew98`}],[`path`,{d:`M21 9.118V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h5.75`,key:`137t5x`}],[`path`,{d:`M22 17.5c0 2.499-1.75 3.749-3.83 4.474a.5.5 0 0 1-.335-.005c-2.085-.72-3.835-1.97-3.835-4.47V14a.5.5 0 0 1 .5-.499c1 0 2.25-.6 3.12-1.36a.6.6 0 0 1 .76-.001c.875.765 2.12 1.36 3.12 1.36a.5.5 0 0 1 .5.5z`,key:`16j3tf`}],[`path`,{d:`M3 15h7`,key:`1qldh6`}],[`path`,{d:`M3 9h12.142`,key:`1yjd6m`}],[`path`,{d:`M8 15v6`,key:`1stoo3`}],[`path`,{d:`M8 3v6`,key:`vlvjmk`}]]),p=l(`files`,[[`path`,{d:`M15 2h-4a2 2 0 0 0-2 2v11a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V8`,key:`14sh0y`}],[`path`,{d:`M16.706 2.706A2.4 2.4 0 0 0 15 2v5a1 1 0 0 0 1 1h5a2.4 2.4 0 0 0-.706-1.706z`,key:`1970lx`}],[`path`,{d:`M5 7a2 2 0 0 0-2 2v11a2 2 0 0 0 2 2h8a2 2 0 0 0 1.732-1`,key:`l4dndm`}]]),m=l(`log-out`,[[`path`,{d:`m16 17 5-5-5-5`,key:`1bji2h`}],[`path`,{d:`M21 12H9`,key:`dn1m92`}],[`path`,{d:`M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4`,key:`1uf3rs`}]]),h=l(`panel-left`,[[`rect`,{width:`18`,height:`18`,x:`3`,y:`3`,rx:`2`,key:`afitv7`}],[`path`,{d:`M9 3v18`,key:`fh3hqa`}]]),g=l(`radio`,[[`path`,{d:`M16.247 7.761a6 6 0 0 1 0 8.478`,key:`1fwjs5`}],[`path`,{d:`M19.075 4.933a10 10 0 0 1 0 14.134`,key:`ehdyv1`}],[`path`,{d:`M4.925 19.067a10 10 0 0 1 0-14.134`,key:`1q22gi`}],[`path`,{d:`M7.753 16.239a6 6 0 0 1 0-8.478`,key:`r2q7qm`}],[`circle`,{cx:`12`,cy:`12`,r:`2`,key:`1c9p78`}]]),_=l(`settings-2`,[[`path`,{d:`M14 17H5`,key:`gfn3mx`}],[`path`,{d:`M19 7h-9`,key:`6i9tg`}],[`circle`,{cx:`17`,cy:`17`,r:`3`,key:`18b49y`}],[`circle`,{cx:`7`,cy:`7`,r:`3`,key:`dfmy0x`}]]),v=l(`user-round`,[[`circle`,{cx:`12`,cy:`8`,r:`5`,key:`1hypcn`}],[`path`,{d:`M20 21a8 8 0 0 0-16 0`,key:`rfgkzh`}]]),y=e(n(),1),b=t(),x=({navLinks:e,user:t})=>{let[n,r]=(0,y.useState)(()=>{if(typeof window<`u`){let e=localStorage.getItem(`sidebar-collapsed`);return e===null?window.innerWidth<768:JSON.parse(e)}return!1});return(0,y.useEffect)(()=>{let e=()=>{window.innerWidth<768&&r(!0)};return e(),window.addEventListener(`resize`,e),()=>window.removeEventListener(`resize`,e)},[]),(0,y.useEffect)(()=>{localStorage.setItem(`sidebar-collapsed`,JSON.stringify(n))},[n]),(0,b.jsxs)(`aside`,{className:`
        fixed lg:static
        h-full
        sidebar-surface text-[#1f2937]
        flex flex-col
        z-50
        transition-all duration-300
        ${n?`w-16`:`w-80`}
        translate-x-0
        border-r border-[#cbd5e1]
      `,children:[(0,b.jsxs)(`div`,{className:`p-4 flex justify-between items-center border-b border-[#cbd5e1]`,children:[(0,b.jsxs)(`div`,{className:`flex items-center gap-3 min-w-0`,children:[(0,b.jsx)(`div`,{className:`
              flex
              items-center
              justify-center
              shrink-0
              h-10
              rounded-full
              bg-blue-500
              text-white
              font-semibold
              text-sm
              uppercase
              shadow-sm
              overflow-hidden
              transition-all
              duration-300
              ease-in-out
              ${n?`w-0 opacity-0 scale-75 -ml-3`:`w-10 opacity-100 scale-100 ml-0`}
            `,children:t?.userName?.charAt(0)||`U`}),(0,b.jsx)(`div`,{className:`
              flex flex-col leading-tight
              overflow-hidden
              whitespace-nowrap
              transition-all duration-300 ease-in-out
              ${n?`w-0 max-w-0 opacity-0 -translate-x-2`:`w-[180px] max-w-[180px] opacity-100 translate-x-0`}
            `,children:(0,b.jsx)(`h1`,{className:`text-xl font-semibold text-gray-900`,children:t?.role===`hr_admin`?`Human Resource`:t?.role===`super_admin`?`Super Admin`:`Office Admin`})})]}),(0,b.jsx)(`button`,{onClick:()=>r(!n),className:`cursor-pointer flex items-center justify-center p-2 rounded-sm text-[#476581] hover:bg-[#dbeafe] hover:text-[#1e3a5f] transition-colors duration-150`,children:(0,b.jsx)(h,{size:20})})]}),(0,b.jsx)(`nav`,{className:`flex-1 p-2 space-y-2 overflow-hidden`,children:e.map(e=>e.children?(0,b.jsx)(u,{item:e,collapsed:n,setCollapsed:r},e.name):(0,b.jsx)(c,{to:e.path||`#`,className:({isActive:e})=>`
                  sidebar-item
                  sidebar-link-border
                  flex
                  items-center
                  h-10
                  rounded-sm
                  overflow-hidden
                  transition-all
                  duration-300
                  ease-in-out

                  ${n?`w-full justify-center px-0`:`w-full px-4 gap-3`}

                  ${e?`bg-[#dbeafe] text-[#1e3a5f] active`:`text-[#476581] hover:bg-[#dbeafe] hover:text-[#1e3a5f] p-5`}
                `,children:({isActive:t})=>(0,b.jsxs)(b.Fragment,{children:[(0,b.jsx)(`span`,{className:`
                      flex
                      items-center
                      justify-center
                      shrink-0
                      w-6
                      h-6
                      transition-all
                      duration-300
                      ${t?`text-[#1e3a5f]`:`text-[#476581]`}
                    `,children:e.icon}),(0,b.jsx)(`span`,{className:`
                      whitespace-nowrap
                      overflow-hidden
                      transition-all
                      duration-300
                      ease-in-out
                      ${n?`w-0 max-w-0 opacity-0 -translate-x-2`:`w-auto max-w-[200px] opacity-100 translate-x-0`}
                    `,children:e.name})]})},e.path))})]})},S=({children:e,className:t})=>(0,b.jsx)(`div`,{className:`ml-16 lg:ml-0 ${t}`,children:e}),C=({collapsed:e=!1})=>{let{signOut:t}=o(),n=s();return(0,b.jsxs)(d,{className:`sidebar-item sidebar-link-border w-full text-[#476581] bg-transparent hover:bg-[#dbeafe] hover:text-[#1e3a5f] ${e?`justify-center`:`justify-start`}`,onClick:async()=>{confirm(`Are you sure you want to log out?`)&&(await t(),n(`/signin`,{replace:!0}))},children:[(0,b.jsx)(m,{size:20}),!e&&`Log out`]})},w=()=>{let{user:e}=o(),t=s(),[n,a]=(0,y.useState)(!1),c=(0,y.useRef)(null),l=()=>{c.current&&=(clearTimeout(c.current),null),a(e=>!e)},u=()=>{c.current&&=(clearTimeout(c.current),null)},d=()=>{n&&(c.current=setTimeout(()=>{a(!1)},200))};return(0,b.jsxs)(`header`,{className:`flex items-center justify-between sidebar-surface text-[#1f2937] border-b border-[#cbd5e1] px-6 py-3 shadow-xs`,children:[(0,b.jsx)(`div`,{className:`flex w-full items-center gap-3`}),(0,b.jsxs)(`div`,{className:`flex items-center gap-3`,children:[(0,b.jsxs)(`button`,{type:`button`,onClick:()=>t(`/admin/settings/notifications`),className:`relative flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-white text-gray-500 transition hover:bg-gray-200 hover:text-gray-700`,"aria-label":`Notifications`,children:[(0,b.jsx)(r,{size:17}),(0,b.jsx)(`span`,{className:`absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-red-500 ring-2 ring-white`})]}),(0,b.jsxs)(`div`,{className:`relative flex items-center gap-2 rounded-lg px-2 py-1.5`,onMouseEnter:u,onMouseLeave:d,children:[(0,b.jsx)(`button`,{type:`button`,onClick:()=>t(`/admin/settings/profile`),className:`relative flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-white text-gray-500 transition hover:bg-gray-200 hover:text-gray-700`,"aria-label":`Profile`,children:(0,b.jsx)(v,{size:17})}),(0,b.jsxs)(`button`,{type:`button`,onClick:l,className:`hidden cursor-pointer items-center gap-1 text-left sm:flex`,"aria-expanded":n,"aria-haspopup":`menu`,children:[(0,b.jsxs)(`span`,{className:`text-sm font-medium text-gray-700 whitespace-nowrap`,children:[`Welcome back, `,e?.userName]}),(0,b.jsx)(i,{size:15,className:`text-gray-400 transition-transform duration-200 ${n?`rotate-180`:``}`})]}),n&&(0,b.jsx)(`div`,{className:`absolute right-0 top-full z-50 mt-2 w-48 overflow-hidden rounded-lg border border-gray-200 bg-white py-1 shadow-lg`,onMouseEnter:u,onMouseLeave:d,children:(0,b.jsx)(C,{})})]})]})]})},T=()=>{let{user:e}=o(),t=[{name:`Overview`,path:`/admin/overview`,icon:(0,b.jsx)(g,{size:20}),roles:[`super_admin`]},{name:`Dashboard`,path:`/admin/queue/dashboard`,icon:(0,b.jsx)(f,{size:20}),roles:[`office_admin`,`hr_admin`]},{name:`Live Monitoring`,path:`/admin/queue/monitor`,icon:(0,b.jsx)(g,{size:20}),roles:[`office_admin`,`hr_admin`]},{name:`Reports`,icon:(0,b.jsx)(p,{size:20}),roles:[`hr_admin`,`super_admin`],children:[{name:`Queue Statistics`,path:`/admin/queue/statistics`,roles:[`hr_admin`,`super_admin`]},{name:`Review Office Feedback`,path:`/admin/queue/offices/feedbacks`,roles:[`hr_admin`,`super_admin`]}]},{name:`Settings`,path:`/admin/settings`,icon:(0,b.jsx)(_,{size:20}),roles:[`office_admin`,`hr_admin`,`super_admin`]}].filter(t=>t.roles.includes(e?.role??``));return(0,b.jsxs)(`div`,{id:`admin-theme`,className:`h-screen bg-gray-100 lg:flex`,style:{backgroundColor:`transparent`,border:`none`,boxShadow:`none`,transform:`none`},children:[(0,b.jsx)(`style`,{children:`
        #admin-theme span { color: inherit !important; }
        #admin-theme aside button:hover, #admin-theme aside a:hover { transform: none !important; }
      `}),(0,b.jsxs)(`div`,{className:`flex w-full`,children:[(0,b.jsx)(x,{navLinks:t,user:e}),(0,b.jsxs)(`div`,{className:`flex min-w-0 flex-1 flex-col`,children:[(0,b.jsx)(w,{}),(0,b.jsx)(`main`,{className:`flex-1 overflow-y-auto p-6`,children:(0,b.jsx)(S,{children:(0,b.jsx)(a,{})})})]})]})]})};export{T as default};