(this.webpackJsonpshiny_front_end=this.webpackJsonpshiny_front_end||[]).push([[0],{11:function(e,t,n){},13:function(e,t,n){},15:function(e,t,n){"use strict";n.r(t);var c=n(1),s=n.n(c),r=n(5),a=n.n(r),o=(n(11),n(4)),i=n.n(o),j=n(6),u=n(2),d=n.p+"static/media/logo.6ce24c58.svg",h=n.p+"static/media/shiny_logo.ec1590fe.png",l=(n(13),n(0));var b=function(){var e=Object(c.useState)(""),t=Object(u.a)(e,2),n=t[0],s=t[1],r=Object(c.useState)(""),a=Object(u.a)(r,2),o=a[0],b=a[1],g=Object(c.useState)([]),p=Object(u.a)(g,2),O=p[0],f=p[1];window.Shiny.addCustomMessageHandler("message_from_shiny",(function(e){s(e)})),window.Shiny.addCustomMessageHandler("urls",(function(e){b(e),x(e)}));var x=function(){var e=Object(j.a)(i.a.mark((function e(t){var n;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch(t.example_get_data_url).then((function(e){return e.json()}));case 2:n=e.sent,f(n);case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),m=O.map((function(e){return Object(l.jsx)("li",{children:"".concat(e.county," (").concat(e.state,")")},e.PID)}));return Object(l.jsx)("div",{className:"App",children:Object(l.jsxs)("header",{className:"App-header",children:[Object(l.jsxs)("div",{children:[Object(l.jsx)("img",{src:d,className:"App-logo",alt:"logo"}),Object(l.jsx)("img",{src:h,className:"App-logo",alt:"logo"})]}),Object(l.jsxs)("p",{children:["I AM THE MESSAGE FROM REACT",Object(l.jsx)("br",{}),Object(l.jsx)("i",{children:"whereas"}),Object(l.jsx)("br",{}),n,Object(l.jsx)("br",{}),Object(l.jsx)("i",{children:"but hey, you can send message back to Shiny (check your logs):"}),Object(l.jsx)("br",{}),Object(l.jsx)("input",{type:"text",onChange:function(e){window.Shiny.setInputValue("message_from_react",e.target.value)}})]}),Object(l.jsxs)("p",{children:["And here ",Object(l.jsx)("code",{children:"ggplot"})," fetched from Shiny through REST API:"]}),Object(l.jsx)("img",{src:o.ggplot_url_svg,alt:"GGPLOT2"}),Object(l.jsxs)("p",{children:["And below counties from ",Object(l.jsx)("code",{children:"midwest"})," dataset fetched from Shiny through REST API:"]}),Object(l.jsx)("ul",{children:m})]})})},g=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,16)).then((function(t){var n=t.getCLS,c=t.getFID,s=t.getFCP,r=t.getLCP,a=t.getTTFB;n(e),c(e),s(e),r(e),a(e)}))};a.a.render(Object(l.jsx)(s.a.StrictMode,{children:Object(l.jsx)(b,{})}),document.getElementById("root")),g()}},[[15,1,2]]]);
//# sourceMappingURL=main.360e992b.chunk.js.map