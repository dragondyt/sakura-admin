var d={term:!0,method:!0,accu:!0,rule:!0,then:!0,is:!0,and:!0,or:!0,if:!0,default:!0},f={var_input:!0,var_output:!0,fuzzify:!0,defuzzify:!0,function_block:!0,ruleblock:!0},o={end_ruleblock:!0,end_defuzzify:!0,end_function_block:!0,end_fuzzify:!0,end_var:!0},p={true:!0,false:!0,nan:!0,real:!0,min:!0,max:!0,cog:!0,cogs:!0},l=/[+\-*&^%:=<>!|\/]/;function i(e,n){var t=e.next();if(/[\d\.]/.test(t))return t=="."?e.match(/^[0-9]+([eE][\-+]?[0-9]+)?/):t=="0"?e.match(/^[xX][0-9a-fA-F]+/)||e.match(/^0[0-7]+/):e.match(/^[0-9]*\.?[0-9]*([eE][\-+]?[0-9]+)?/),"number";if(t=="/"||t=="("){if(e.eat("*"))return n.tokenize=c,c(e,n);if(e.eat("/"))return e.skipToEnd(),"comment"}if(l.test(t))return e.eatWhile(l),"operator";e.eatWhile(/[\w\$_\xa1-\uffff]/);var r=e.current().toLowerCase();return d.propertyIsEnumerable(r)||f.propertyIsEnumerable(r)||o.propertyIsEnumerable(r)?"keyword":p.propertyIsEnumerable(r)?"atom":"variable"}function c(e,n){for(var t=!1,r;r=e.next();){if((r=="/"||r==")")&&t){n.tokenize=i;break}t=r=="*"}return"comment"}function a(e,n,t,r,u){this.indented=e,this.column=n,this.type=t,this.align=r,this.prev=u}function k(e,n,t){return e.context=new a(e.indented,n,t,null,e.context)}function v(e){if(!!e.context.prev){var n=e.context.type;return n=="end_block"&&(e.indented=e.context.indented),e.context=e.context.prev}}const x={name:"fcl",startState:function(e){return{tokenize:null,context:new a(-e,0,"top",!1),indented:0,startOfLine:!0}},token:function(e,n){var t=n.context;if(e.sol()&&(t.align==null&&(t.align=!1),n.indented=e.indentation(),n.startOfLine=!0),e.eatSpace())return null;var r=(n.tokenize||i)(e,n);if(r=="comment")return r;t.align==null&&(t.align=!0);var u=e.current().toLowerCase();return f.propertyIsEnumerable(u)?k(n,e.column(),"end_block"):o.propertyIsEnumerable(u)&&v(n),n.startOfLine=!1,r},indent:function(e,n,t){if(e.tokenize!=i&&e.tokenize!=null)return 0;var r=e.context,u=o.propertyIsEnumerable(n);return r.align?r.column+(u?0:1):r.indented+(u?0:t.unit)},languageData:{commentTokens:{line:"//",block:{open:"(*",close:"*)"}}}};export{x as fcl};
