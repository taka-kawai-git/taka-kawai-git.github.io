webpackJsonp([1],{"2+bH":function(t,e){},"6/ZT":function(t,e){},"9AWF":function(t,e){},"9uCX":function(t,e){t.exports="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJmZWF0aGVyIGZlYXRoZXItYm9vayI+PHBhdGggZD0iTTQgMTkuNUEyLjUgMi41IDAgMCAxIDYuNSAxN0gyMCI+PC9wYXRoPjxwYXRoIGQ9Ik02LjUgMkgyMHYyMEg2LjVBMi41IDIuNSAwIDAgMSA0IDE5LjV2LTE1QTIuNSAyLjUgMCAwIDEgNi41IDJ6Ij48L3BhdGg+PC9zdmc+"},CIDi:function(t,e){},DP6j:function(t,e){},FhNQ:function(t,e){},"HcQ+":function(t,e){},JIvr:function(t,e){},NHnr:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=a("7+uW"),s=a("kxiW"),n=a.n(s),r={name:"navbar",data:function(){return{isLogggedIn:!1,isEmailVerified:!1,currentUser:!1}},created:function(){n.a.auth().currentUser&&(n.a.auth().currentUser.emailVerified?(this.isLogggedIn=!0,this.isEmailVerified=!0,this.currentUser=n.a.auth().currentUser.email):(this.isLogggedIn=!0,this.isEmailVerified=!1,this.currentUser=n.a.auth().currentUser.email))},methods:{logout:function(){var t=this;n.a.auth().signOut().then(function(){t.$router.go({path:t.$router.path})})}}},o={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{attrs:{id:"navbar"}},[i("nav",{staticClass:"z-depth-0 bg-none"},[i("div",{staticClass:"nav-wrapper border-b-grey-l3"},[i("div",{staticClass:"container"},[i("router-link",{staticClass:"black-text exo-800 fs-1-5",attrs:{to:"/"}},[t._v("Company")]),t._v(" "),t.isLogggedIn||t.isEmailVerified?t._e():i("ul",{staticClass:"right"},[i("li",[i("router-link",{staticClass:"black-text fw-b",attrs:{to:"/login"}},[t._v("ログイン")])],1),t._v(" "),i("li",[i("router-link",{staticClass:"black-text fw-b",attrs:{to:"/register"}},[t._v("新規登録")])],1)]),t._v(" "),t.isLogggedIn&&t.isEmailVerified?i("div",{staticClass:"right"},[i("router-link",{staticClass:"black-text",attrs:{to:"/menu"}},[i("img",{staticClass:"v-align-m",attrs:{src:a("RWWN")}})])],1):t._e(),t._v(" "),t.isLogggedIn&&!t.isEmailVerified?i("div",{staticClass:"right"},[i("button",{staticClass:"button-naked fw-b",on:{click:t.logout}},[t._v("ログアウト")])]):t._e()],1)])])])},staticRenderFns:[]};var c={name:"App",components:{Navbar:a("VU/8")(r,o,!1,function(t){a("o0qV")},"data-v-2e045889",null).exports}},l={render:function(){var t=this.$createElement,e=this._self._c||t;return e("div",{attrs:{id:"app"}},[e("Navbar",{key:this.$route.fullPath}),this._v(" "),e("router-view")],1)},staticRenderFns:[]};var d=a("VU/8")(c,l,!1,function(t){a("2+bH")},"data-v-5fdb36c6",null).exports,u=a("/ocq"),m=(a("881v"),n.a.initializeApp({apiKey:"AIzaSyCg0Yx2NdcixJM1mrdoV0wxQNFWkn4Nb50",authDomain:"pigeon-e1a9f.firebaseapp.com",databaseURL:"https://pigeon-e1a9f.firebaseio.com",projectId:"pigeon-e1a9f",storageBucket:"pigeon-e1a9f.appspot.com",messagingSenderId:"660502866911",appId:"1:660502866911:web:2c08feee70600e4cb1b26a",measurementId:"G-EQ2J0GYDZ1"}).firestore()),v=a("0lrd"),h=a.n(v),f={name:"home",data:function(){return{threads_latest:[],threads_popular:[]}},mounted:function(){var t=document.querySelector(".tabs");h.a.Tabs.init(t,{swipeable:!0})},created:function(){var t=this,e=n.a.auth().currentUser.email.split("@")[1];m.collection("domains").doc(e).collection("threads").orderBy("created_at").get().then(function(e){e.forEach(function(e){var a={id:e.id,title:e.data().title,thread_id:e.data().thread_id,num_comments:e.data().comments.length};t.threads_latest.push(a),t.threads_popular.push(a),t.threads_popular.sort(function(t,e){return e.num_comments-t.num_comments})})})}},p={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"container-100",attrs:{id:"home"}},[t._m(0),t._v(" "),a("div",{staticClass:"col s12",attrs:{id:"tab-swipe-1"}},[a("ul",{staticClass:"collection border-x-0 b-color-theme fs-1-1 m-y-0"},t._l(t.threads_latest,function(e){return a("li",{key:e.id,staticClass:"collection-item p-x-0 bg-none b-color-theme l-h-2-5"},[a("router-link",{staticClass:"black-text",attrs:{to:{name:"view-thread",params:{thread_id:e.thread_id}}}},[a("div",{staticClass:"container-sub"},[t._v(t._s(e.title))])])],1)}),0)]),t._v(" "),a("div",{staticClass:"col s12",attrs:{id:"tab-swipe-2"}},[a("ul",{staticClass:"collection border-x-0 b-color-theme fs-1-1 m-y-0"},t._l(t.threads_popular,function(e,i){return a("li",{key:e.id,staticClass:"collection-item p-x-0 bg-none b-color-theme l-h-2-5"},[a("router-link",{staticClass:"black-text",attrs:{to:{name:"view-thread",params:{thread_id:e.thread_id}}}},[a("div",{staticClass:"container-sub"},[a("span",{staticClass:"m-r-1 cyan-text text-accent-4 fw-b"},[t._v(t._s(i+1)+".")]),t._v(t._s(e.title)+"\n                ")])])],1)}),0)]),t._v(" "),a("div",{staticClass:"col s12",attrs:{id:"tab-swipe-3"}}),t._v(" "),a("div",{staticClass:"fixed-action-btn"},[a("router-link",{staticClass:"btn-floating btn-large bg-none z-depth-0",attrs:{to:"/new"}},[a("i",{staticClass:"fa fa-plus text-theme"})])],1)])},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("ul",{staticClass:"tabs bg-none",attrs:{id:"tabs-swipe-ul"}},[e("li",{staticClass:"tab col s3"},[e("a",{staticClass:"active",attrs:{href:"#tab-swipe-1"}},[this._v("最新")])]),this._v(" "),e("li",{staticClass:"tab col s3"},[e("a",{attrs:{href:"#tab-swipe-2"}},[this._v("話題")])]),this._v(" "),e("li",{staticClass:"tab col s3"},[e("a",{attrs:{href:"#tab-swipe-3"}},[this._v("投票")])])])}]};var _=a("VU/8")(f,p,!1,function(t){a("JIvr")},"data-v-0fd829f9",null).exports,g={name:"menu",data:function(){return{}},methods:{logout:function(){var t=this;n.a.auth().signOut().then(function(){t.$router.go({path:t.$router.path})})}}},b={render:function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"container",attrs:{id:"menu"}},[e("ul",{staticClass:"collection border-0 m-y-1-125 fs-1-2"},[e("li",{staticClass:"collection-item p-x-0 bg-none w-100 b-color-theme l-h-2-5"},[e("div",{on:{click:this.logout}},[e("img",{staticClass:"p-r-1 v-align-m",attrs:{src:a("WUVV")}}),this._v("ログアウト")])]),this._v(" "),e("li",{staticClass:"collection-item p-x-0 bg-none w-100 b-color-theme l-h-2-5"},[e("router-link",{staticClass:"black-font",attrs:{to:"/terms"}},[e("div",{staticClass:"black-text"},[e("img",{staticClass:"p-r-1 v-align-m",attrs:{src:a("9uCX")}}),this._v("利用規約")])])],1)])])},staticRenderFns:[]};var C=a("VU/8")(g,b,!1,function(t){a("9AWF")},"data-v-3c09bb4c",null).exports,I={render:function(){this.$createElement;this._self._c;return this._m(0)},staticRenderFns:[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"container",attrs:{id:"terms"}},[a("div",{staticClass:"fs-1-5 fw-b m-y-1-125"},[t._v("利用規約")]),t._v(" "),a("p",{staticClass:"pt-2"},[t._v("この利用規約（以下、「本規約」といいます。）は、管理人がこのウェブサイト上で提供するサービス（以下、「本サービス」といいます。）の利用条件を定めるものです。登録ユーザーの皆さま（以下、「ユーザー」といいます。）には、本規約に従って、本サービスをご利用いただきます。")]),t._v(" "),a("div",{staticClass:"fw-b"},[t._v("第1条（適用）")]),t._v(" "),a("p",[t._v("本規約は、ユーザーと管理人との間の本サービスの利用に関わる一切の関係に適用されるものとします。\n    管理人は本サービスに関し、本規約のほか、ご利用にあたってのルール等、各種の定め（以下、「個別規定」といいます。）をすることがあります。これら個別規定はその名称のいかんに関わらず、本規約の一部を構成するものとします。\n    本規約の規定が前条の個別規定の規定と矛盾する場合には、個別規定において特段の定めなき限り、個別規定の規定が優先されるものとします。")]),t._v(" "),a("div",{staticClass:"fw-b"},[t._v("第2条（利用登録）")]),t._v(" "),a("p",[t._v("本サービスにおいては、登録希望者が本規約に同意の上、管理人の定める方法によって利用登録を申請し、管理人がこれを承認することによって、利用登録が完了するものとします。\n    管理人は、利用登録の申請者に以下の事由があると判断した場合、利用登録の申請を承認しないことがあり、その理由については一切の開示義務を負わないものとします。\n    利用登録の申請に際して虚偽の事項を届け出た場合\n    本規約に違反したことがある者からの申請である場合\n    その他、管理人が利用登録を相当でないと判断した場合")]),t._v(" "),a("div",{staticClass:"fw-b"},[t._v("第3条（ユーザーIDおよびパスワードの管理）")]),t._v(" "),a("p",[t._v("ユーザーは、自己の責任において、本サービスのユーザーIDおよびパスワードを適切に管理するものとします。\n    ユーザーは、いかなる場合にも、ユーザーIDおよびパスワードを第三者に譲渡または貸与し、もしくは第三者と共用することはできません。管理人は、ユーザーIDとパスワードの組み合わせが登録情報と一致してログインされた場合には、そのユーザーIDを登録しているユーザー自身による利用とみなします。\n    ユーザーID及びパスワードが第三者によって使用されたことによって生じた損害は、管理人に故意又は重大な過失がある場合を除き、管理人は一切の責任を負わないものとします。")]),t._v(" "),a("div",{staticClass:"fw-b"},[t._v("第4条（利用料金および支払方法）")]),t._v(" "),a("p",[t._v("ユーザーは、本サービスの有料部分の対価として、管理人が別途定め、本ウェブサイトに表示する利用料金を、管理人が指定する方法により支払うものとします。\n    ユーザーが利用料金の支払を遅滞した場合には、ユーザーは年14．6％の割合による遅延損害金を支払うものとします。")]),t._v(" "),a("div",{staticClass:"fw-b"},[t._v("第5条（禁止事項）")]),t._v(" "),a("p",[t._v("ユーザーは、本サービスの利用にあたり、以下の行為をしてはなりません。\n    \n    法令または公序良俗に違反する行為"),a("br"),t._v("\n    犯罪行為に関連する行為"),a("br"),t._v("\n    本サービスの内容等、本サービスに含まれる著作権、商標権ほか知的財産権を侵害する行為"),a("br"),t._v("\n    管理人、ほかのユーザー、またはその他第三者のサーバーまたはネットワークの機能を破壊したり、妨害したりする行為"),a("br"),t._v("\n    本サービスによって得られた情報を商業的に利用する行為"),a("br"),t._v("\n    管理人のサービスの運営を妨害するおそれのある行為"),a("br"),t._v("\n    不正アクセスをし、またはこれを試みる行為"),a("br"),t._v("\n    他のユーザーに関する個人情報等を収集または蓄積する行為"),a("br"),t._v("\n    不正な目的を持って本サービスを利用する行為"),a("br"),t._v("\n    本サービスの他のユーザーまたはその他の第三者に不利益、損害、不快感を与える行為"),a("br"),t._v("\n    他のユーザーに成りすます行為"),a("br"),t._v("\n    管理人が許諾しない本サービス上での宣伝、広告、勧誘、または営業行為"),a("br"),t._v("\n    面識のない異性との出会いを目的とした行為"),a("br"),t._v("\n    管理人のサービスに関連して、反社会的勢力に対して直接または間接に利益を供与する行為"),a("br"),t._v("\n    その他、管理人が不適切と判断する行為")]),t._v(" "),a("div",{staticClass:"fw-b"},[t._v("第6条（本サービスの提供の停止等）")]),t._v(" "),a("p",[t._v("管理人は、以下のいずれかの事由があると判断した場合、ユーザーに事前に通知することなく本サービスの全部または一部の提供を停止または中断することができるものとします。\n    本サービスにかかるコンピュータシステムの保守点検または更新を行う場合\n    地震、落雷、火災、停電または天災などの不可抗力により、本サービスの提供が困難となった場合\n    コンピュータまたは通信回線等が事故により停止した場合\n    その他、管理人が本サービスの提供が困難と判断した場合\n    管理人は、本サービスの提供の停止または中断により、ユーザーまたは第三者が被ったいかなる不利益または損害についても、一切の責任を負わないものとします。")]),t._v(" "),a("div",{staticClass:"fw-b"},[t._v("第7条（利用制限および登録抹消）")]),t._v(" "),a("p",[t._v("管理人は、ユーザーが以下のいずれかに該当する場合には、事前の通知なく、ユーザーに対して、本サービスの全部もしくは一部の利用を制限し、またはユーザーとしての登録を抹消することができるものとします。\n    本規約のいずれかの条項に違反した場合"),a("br"),t._v("\n    登録事項に虚偽の事実があることが判明した場合"),a("br"),t._v("\n    料金等の支払債務の不履行があった場合"),a("br"),t._v("\n    管理人からの連絡に対し、一定期間返答がない場合"),a("br"),t._v("\n    本サービスについて、最終の利用から一定期間利用がない場合"),a("br"),t._v("\n    その他、管理人が本サービスの利用を適当でないと判断した場合"),a("br"),t._v("\n    管理人は、本条に基づき管理人が行った行為によりユーザーに生じた損害について、一切の責任を負いません。")]),t._v(" "),a("div",{staticClass:"fw-b"},[t._v("第8条（退会）")]),t._v(" "),a("p",[t._v("ユーザーは、管理人の定める退会手続により、本サービスから退会できるものとします。")]),t._v(" "),a("div",{staticClass:"fw-b"},[t._v("第9条（保証の否認および免責事項）")]),t._v(" "),a("p",[t._v("管理人は、本サービスに事実上または法律上の瑕疵（安全性、信頼性、正確性、完全性、有効性、特定の目的への適合性、セキュリティなどに関する欠陥、エラーやバグ、権利侵害などを含みます。）がないことを明示的にも黙示的にも保証しておりません。\n    管理人は、本サービスに起因してユーザーに生じたあらゆる損害について一切の責任を負いません。ただし、本サービスに関する管理人とユーザーとの間の契約（本規約を含みます。）が消費者契約法に定める消費者契約となる場合、この免責規定は適用されません。\n    前項ただし書に定める場合であっても、管理人は、管理人の過失（重過失を除きます。）による債務不履行または不法行為によりユーザーに生じた損害のうち特別な事情から生じた損害（管理人またはユーザーが損害発生につき予見し、または予見し得た場合を含みます。）について一切の責任を負いません。また、管理人の過失（重過失を除きます。）による債務不履行または不法行為によりユーザーに生じた損害の賠償は、ユーザーから当該損害が発生した月に受領した利用料の額を上限とします。\n    管理人は、本サービスに関して、ユーザーと他のユーザーまたは第三者との間において生じた取引、連絡または紛争等について一切責任を負いません。")]),t._v(" "),a("div",{staticClass:"fw-b"},[t._v("第10条（サービス内容の変更等）")]),t._v(" "),a("p",[t._v("管理人は、ユーザーに通知することなく、本サービスの内容を変更しまたは本サービスの提供を中止することができるものとし、これによってユーザーに生じた損害について一切の責任を負いません。")]),t._v(" "),a("div",{staticClass:"fw-b"},[t._v("第11条（利用規約の変更）")]),t._v(" "),a("p",[t._v("管理人は、必要と判断した場合には、ユーザーに通知することなくいつでも本規約を変更することができるものとします。なお、本規約の変更後、本サービスの利用を開始した場合には、当該ユーザーは変更後の規約に同意したものとみなします。")]),t._v(" "),a("div",{staticClass:"fw-b"},[t._v("第12条（個人情報の取扱い）")]),t._v(" "),a("p",[t._v("管理人は、本サービスの利用によって取得する個人情報については、管理人「プライバシーポリシー」に従い適切に取り扱うものとします。")]),t._v(" "),a("div",{staticClass:"fw-b"},[t._v("第13条（通知または連絡）")]),t._v(" "),a("p",[t._v("ユーザーと管理人との間の通知または連絡は、管理人の定める方法によって行うものとします。管理人は,ユーザーから,管理人が別途定める方式に従った変更届け出がない限り,現在登録されている連絡先が有効なものとみなして当該連絡先へ通知または連絡を行い,これらは,発信時にユーザーへ到達したものとみなします。")]),t._v(" "),a("div",{staticClass:"fw-b"},[t._v("第14条（権利義務の譲渡の禁止）")]),t._v(" "),a("p",[t._v("ユーザーは、管理人の書面による事前の承諾なく、利用契約上の地位または本規約に基づく権利もしくは義務を第三者に譲渡し、または担保に供することはできません。")]),t._v(" "),a("div",{staticClass:"fw-b"},[t._v("第15条（準拠法・裁判管轄）")]),t._v(" "),a("p",[t._v("本規約の解釈にあたっては、日本法を準拠法とします。\n    本サービスに関して紛争が生じた場合には、管理人の本店所在地を管轄する裁判所を専属的合意管轄とします。")]),t._v(" "),a("div",{staticClass:"fw-b"},[t._v("第16条（お問い合わせ窓口）")]),t._v(" "),a("p",[t._v("お問い合わせは"),a("a",{attrs:{href:"/menu/imprint"}},[t._v("こちら")]),t._v("まで。")]),t._v(" "),a("p",[t._v("以上。")]),a("br")])}]};var w=a("VU/8")(null,I,!1,function(t){a("FhNQ")},"data-v-141c76e0",null).exports,y=a("fzx2"),x={name:"new-thread",data:function(){return{thread_id:null,title:null,comment:null}},created:function(){this.thread_id=this.$uuid.v1()},methods:{saveThread:function(){for(var t=this,e=n.a.auth().currentUser.email.split("@")[1],a=new Date,i=[],s=0;s<1e3;s++)i.push(0);m.collection("domains").doc(e).collection("threads").add({thread_id:this.thread_id,title:this.title,likes:i,num_shards:10,comments:[{comment:this.comment,posted_at:a,user_id:n.a.auth().currentUser.uid}],created_at:a}).then(function(e){for(var a=0;a<10;a++)e.collection("shards").doc(a.toString()).set({likes:[]});t.$router.push({name:"view-thread",params:{thread_id:t.thread_id}})}).catch(function(t){return console.log(t)})}}},D={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"container",attrs:{id:"new-thread"}},[a("div",{staticClass:"row m-t-1"},[a("form",{staticClass:"col s12 p-x-0 fs-1-2",on:{submit:function(e){return e.preventDefault(),t.saveThread(e)}}},[a("input",{directives:[{name:"model",rawName:"v-model",value:t.title,expression:"title"}],staticClass:"grey lighten-3 border-0 rounded-10",attrs:{type:"text",placeholder:"スレッドタイトル",required:""},domProps:{value:t.title},on:{input:function(e){e.target.composing||(t.title=e.target.value)}}}),t._v(" "),a("textarea",{directives:[{name:"model",rawName:"v-model",value:t.comment,expression:"comment"}],staticClass:"grey lighten-3 border-0 rounded-10 h-10 p-1",attrs:{placeholder:"最初のコメント",required:""},domProps:{value:t.comment},on:{input:function(e){e.target.composing||(t.comment=e.target.value)}}}),t._v(" "),a("button",{staticClass:"btn waves-effect waves-light h-3 rounded-10 w-50 m-y-1\n            bg-theme z-depth-0 right fs-1",attrs:{type:"submit"}},[t._v("作成する")]),t._v(" "),a("router-link",{staticClass:"m-y-1 left fs-1",attrs:{to:"/"}},[t._v("キャンセル")])],1)])])},staticRenderFns:[]};var k=a("VU/8")(x,D,!1,function(t){a("DP6j")},"data-v-62592924",null).exports,U=a("bOdI"),E=a.n(U),M={name:"view-thread",data:function(){return{doc_id:null,thread_id:null,title:null,comments:null,likes:[]}},beforeRouteEnter:function(t,e,a){var i=n.a.auth().currentUser.email.split("@")[1];m.collection("domains").doc(i).collection("threads").where("thread_id","==",t.params.thread_id).get().then(function(t){t.forEach(function(t){a(function(e){e.doc_id=t.id,e.thread_id=t.data().thread_id,e.title=t.data().title,e.comments=t.data().comments})})})},mounted:function(){var t=this;m.collection("users").doc(n.a.auth().currentUser.email).get().then(function(e){if(e.exists){var a=e.get("likes."+t.doc_id);void 0!==a&&(t.likes=a)}else console.log("user doesn't exists.")})},watch:{$route:"fetchData"},methods:{fetchData:function(){var t=this,e=n.a.auth().currentUser.email.split("@")[1];m.collection("domains").doc(e).collection("threads").where("thread_id","==",this.$route.params.thread_id).get().then(function(e){e.forEach(function(e){t.doc_id=e.id,t.thread_id=e.data().thread_id,t.title=e.data().title,t.comments=e.data().comments})})},updateLike:function(t){var e=this,a=n.a.auth().currentUser.email.split("@")[1],i=Math.floor(10*Math.random()).toString();m.collection("domains").doc(a).collection("threads").where("thread_id","==",this.$route.params.thread_id).limit(1).get().then(function(s){s.forEach(function(s){m.collection("domains").doc(a).collection("threads").doc(s.id).collection("shards").doc(i).update({likes:n.a.firestore.FieldValue.arrayUnion(t)}),e.addLike(s.id,t),e.likes.push(t)})})},addLike:function(t,e){m.collection("users").doc(n.a.auth().currentUser.email).update(E()({},"likes."+t,n.a.firestore.FieldValue.arrayUnion(e)))}}},V={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"container-100",attrs:{id:"view-thread"}},[a("div",{staticClass:"fs-1-2 fw-b container-sub"},[a("div",{staticClass:"m-y-2"},[t._v(t._s(t.title))])]),t._v(" "),a("ul",{staticClass:"collection border-x-0 b-color-theme m-t-0"},t._l(t.comments,function(e,i){return a("li",{staticClass:"collection-item bg-none b-color-theme p-x-0"},[a("div",{staticClass:"container-sub"},[a("div",{staticClass:"fs-0-8 m-b-1 grey-text text-lighten-2",attrs:{id:i+1}},[a("span",{staticClass:"m-r-0-5"},[t._v(t._s(i+1)+".　名無しさん")]),t._v(" "),a("span",{staticClass:"m-r-0-5"},[t._v("通報")]),t._v(" "),a("span",{staticClass:"m-r-1"},[t._v(t._s(e.posted_at.toDate().toDateString()))]),t._v(" "),t.likes.includes(i)?t._e():a("span",{on:{click:function(e){return t.updateLike(i)}}},[a("i",{staticClass:"far fa-heart"})])]),t._v(" "),a("div",{staticClass:"fs-1 m-b-2"},[t._v(t._s(e.comment))])])])}),0),t._v(" "),a("div",{staticClass:"fixed-action-btn"},[a("router-link",{staticClass:"btn-floating bg-none lighten-5 z-depth-0",attrs:{to:{name:"new-comment",params:{thread_id:t.thread_id}}}},[a("i",{staticClass:"fas fa-comment text-theme"})])],1)])},staticRenderFns:[]};var P=a("VU/8")(M,V,!1,function(t){a("vOa9")},"data-v-663f24b4",null).exports,N={name:"new-comment",data:function(){return{comment:null}},methods:{saveComment:function(){var t=this,e=n.a.auth().currentUser.email.split("@")[1];m.collection("domains").doc(e).collection("threads").where("thread_id","==",this.$route.params.thread_id).get().then(function(a){a.forEach(function(a){m.collection("domains").doc(e).collection("threads").doc(a.id).update({comments:n.a.firestore.FieldValue.arrayUnion({comment:t.comment,posted_at:new Date,user_id:n.a.auth().currentUser.uid})}),t.$router.push({name:"view-thread",params:{thread_id:t.$route.params.thread_id}})})})}}},H={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"container",attrs:{id:"new-comment"}},[a("div",{staticClass:"row m-t-1"},[a("form",{staticClass:"col s12 p-x-0 fs-1-2",on:{submit:function(e){return e.preventDefault(),t.saveComment(e)}}},[a("textarea",{directives:[{name:"model",rawName:"v-model",value:t.comment,expression:"comment"}],staticClass:"grey lighten-3 border-0 rounded-10 h-10 p-1",attrs:{placeholder:"コメント",required:""},domProps:{value:t.comment},on:{input:function(e){e.target.composing||(t.comment=e.target.value)}}}),t._v(" "),a("button",{staticClass:"btn waves-effect waves-light h-3 rounded-10 w-50 m-y-1\n            bg-theme z-depth-0 right",attrs:{type:"submit"}},[t._v("コメントする")]),t._v(" "),a("router-link",{staticClass:"m-y-1 left fs-1",attrs:{to:"/"}},[t._v("キャンセル")])],1)])])},staticRenderFns:[]};var Z=a("VU/8")(N,H,!1,function(t){a("v0eq")},"data-v-9bce7784",null).exports,R={name:"login",data:function(){return{email:"",password:""}},methods:{login:function(t){var e=this;n.a.auth().signInWithEmailAndPassword(this.email,this.password).then(function(t){console.log("Logged in as "+t.user.email),e.$router.go({path:e.$router.path})},function(t){alert(t.message)}),t.preventDefault()}}},S={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{},[a("div",{staticClass:"container"},[a("div",{staticClass:"row"},[a("div",{staticClass:"col s12 m8 offset-m2"},[a("div",{staticClass:"center"},[a("div",{staticClass:"fs-1-5 fw-b m-y-2 font-bold"},[t._v("ログイン")]),t._v(" "),a("form",[a("input",{directives:[{name:"model",rawName:"v-model",value:t.email,expression:"email"}],staticClass:"grey lighten-3 border-0 rounded-10",attrs:{type:"text",id:"email",placeholder:"メールアドレス"},domProps:{value:t.email},on:{input:function(e){e.target.composing||(t.email=e.target.value)}}}),t._v(" "),a("input",{directives:[{name:"model",rawName:"v-model",value:t.password,expression:"password"}],staticClass:"grey lighten-3 border-0 rounded-10",attrs:{type:"password",id:"password",placeholder:"パスワード"},domProps:{value:t.password},on:{input:function(e){e.target.composing||(t.password=e.target.value)}}}),t._v(" "),a("button",{staticClass:"btn waves-effect waves-light\n                        rounded-10 w-100 bg-theme z-depth-0 m-y-1 h-3",on:{click:t.login}},[t._v("ログイン")])])])])])])])},staticRenderFns:[]};var j=a("VU/8")(R,S,!1,function(t){a("CIDi")},"data-v-632342ef",null).exports,W={render:function(){this.$createElement;this._self._c;return this._m(0)},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{},[e("div",{staticClass:"container",attrs:{id:"email-verified"}},[this._v("\n        メールの認証に成功しました！\n    ")])])}]};var $=a("VU/8")({name:"email-verified",data:function(){return{}}},W,!1,function(t){a("HcQ+")},"data-v-0c0de7c2",null).exports,G={name:"verify-email",data:function(){return{}},created:function(){var t=n.a.auth().currentUser;if(!t.emailVerified){var e=null;e="https://taka-kawai-git.github.io/index.html#/",t.sendEmailVerification({url:e,handleCodeInApp:!1})}},methods:{reload:function(t){this.$router.go({path:this.$router.path})}}},A={render:function(){var t=this.$createElement,e=this._self._c||t;return e("div",{},[e("div",{staticClass:"container",attrs:{id:"verify-email"}},[e("div",{staticClass:"fs-1-5 fw-b m-y-1-125"},[this._v("メールを送信しました！")]),this._v(" "),e("div",{staticClass:"m-b-1"},[this._v("Mavorのご利用にはメールアドレスのアクティベートが必要です。メールに記載されたURLをクリックしてアクティベートを行ってください。")]),this._v(" "),e("button",{staticClass:"btn btn-large rounded-10 w-100 bg-theme-grad",on:{click:this.reload}},[this._v("画面再読み込み")])])])},staticRenderFns:[]};var L=a("VU/8")(G,A,!1,function(t){a("yH9x")},"data-v-56afb2c6",null).exports,q={name:"register",data:function(){return{email:"",password:""}},methods:{register:function(t){var e=this;n.a.auth().createUserWithEmailAndPassword(this.email,this.password).then(function(t){console.log("Logged in as "+t.user.email),e.registerUser(t)},function(t){alert(t.message)}),t.preventDefault()},registerUser:function(t){var e=this,a=t.user.email.split("@")[1];m.collection("users").doc(t.user.email).set({email:t.user.email,domain:a,created_at:new Date,likes:{}}).then(function(){console.log("user created"),e.updateOrRegisterDomain(a)}).catch(function(t){return console.log(t)})},updateOrRegisterDomain:function(t){var e=this,a=m.collection("domains").doc(t);a.get().then(function(i){i.exists?(console.log("Document data:",i.data()),e.updateDomain(a)):(console.log("No such document!"),e.registerDomain(a,t)),e.$router.go({path:e.$router.path})}).catch(function(t){console.log("Error getting document:",t)})},updateDomain:function(t){t.update({participants:n.a.firestore.FieldValue.increment(1)}).then(function(){console.log("Document successfully updated!")}).catch(function(t){console.error("Error updating document: ",t)})},registerDomain:function(t,e){var a={create_at:new Date,domain:e,participants:1};t.set(a).then(function(){console.log("Document successfully written!")}).catch(function(t){console.error("Error updating document: ",t)})}}},z={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{},[a("div",{staticClass:"container"},[a("div",{staticClass:"row"},[a("div",{staticClass:"col s12 m8 offset-m2"},[a("div",{staticClass:"center"},[a("div",{staticClass:"fs-1-5 fw-b m-y-2 font-bold"},[t._v("新規登録")]),t._v(" "),a("form",[a("input",{directives:[{name:"model",rawName:"v-model",value:t.email,expression:"email"}],staticClass:"grey lighten-3 border-0 rounded-10",attrs:{type:"text",id:"email",placeholder:"メールアドレス"},domProps:{value:t.email},on:{input:function(e){e.target.composing||(t.email=e.target.value)}}}),t._v(" "),a("input",{directives:[{name:"model",rawName:"v-model",value:t.password,expression:"password"}],staticClass:"grey lighten-3 border-0 rounded-10",attrs:{type:"password",id:"password",placeholder:"パスワード"},domProps:{value:t.password},on:{input:function(e){e.target.composing||(t.password=e.target.value)}}}),t._v(" "),a("button",{staticClass:"btn waves-effect waves-light\n                        rounded-10 w-100 bg-theme z-depth-0 m-y-1 h-3",on:{click:t.register}},[t._v("登録")])])])])])])])},staticRenderFns:[]};var T=a("VU/8")(q,z,!1,function(t){a("6/ZT")},"data-v-87b902a2",null).exports;i.a.use(u.a),i.a.use(y.a);var B=new u.a({routes:[{path:"/",name:"home",component:_,meta:{requiresEmailVerified:!0}},{path:"/menu",name:"menu",component:C,meta:{requiresEmailVerified:!0}},{path:"/terms",name:"terms",component:w,meta:{requiresEmailVerified:!0}},{path:"/login",name:"login",component:j,meta:{requiresGuest:!0}},{path:"/register",name:"register",component:T,meta:{requiresGuest:!0}},{path:"/email-verified",name:"email-verified",component:$},{path:"/verify-email",name:"verify-email",component:L,meta:{requiresAuth:!0}},{path:"/new",name:"new-thread",component:k,meta:{requiresEmailVerified:!0}},{path:"/:thread_id",name:"view-thread",component:P,meta:{requiresEmailVerified:!0}},{path:"/:thread_id/new",name:"new-comment",component:Z,meta:{requiresEmailVerified:!0}}]});B.beforeEach(function(t,e,a){t.matched.some(function(t){return t.meta.requiresAuth})?n.a.auth().currentUser?n.a.auth().currentUser.emailVerified?a({path:"/",query:{redirect:t.fullpath}}):a():a({path:"/login",query:{redirect:t.fullpath}}):t.matched.some(function(t){return t.meta.requiresEmailVerified})?n.a.auth().currentUser?n.a.auth().currentUser.emailVerified?a():a({path:"/verify-email",query:{redirect:t.fullpath}}):a({path:"/login",query:{redirect:t.fullpath}}):t.matched.some(function(t){return t.meta.requiresGuest})&&n.a.auth().currentUser?n.a.auth().currentUser.emailVerified?a({path:"/",query:{redirect:t.fullpath}}):a({path:"/verify-email",query:{redirect:t.fullpath}}):a()});var F=B;i.a.config.productionTip=!1;var J=void 0;n.a.auth().onAuthStateChanged(function(t){J||(J=new i.a({el:"#app",router:F,components:{App:d},template:"<App/>"}))})},RWWN:function(t,e){t.exports="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJmZWF0aGVyIGZlYXRoZXItbWVudSI+PGxpbmUgeDE9IjMiIHkxPSIxMiIgeDI9IjIxIiB5Mj0iMTIiPjwvbGluZT48bGluZSB4MT0iMyIgeTE9IjYiIHgyPSIyMSIgeTI9IjYiPjwvbGluZT48bGluZSB4MT0iMyIgeTE9IjE4IiB4Mj0iMjEiIHkyPSIxOCI+PC9saW5lPjwvc3ZnPg=="},WUVV:function(t,e){t.exports="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJmZWF0aGVyIGZlYXRoZXItbG9nLW91dCI+PHBhdGggZD0iTTkgMjFINWEyIDIgMCAwIDEtMi0yVjVhMiAyIDAgMCAxIDItMmg0Ij48L3BhdGg+PHBvbHlsaW5lIHBvaW50cz0iMTYgMTcgMjEgMTIgMTYgNyI+PC9wb2x5bGluZT48bGluZSB4MT0iMjEiIHkxPSIxMiIgeDI9IjkiIHkyPSIxMiI+PC9saW5lPjwvc3ZnPg=="},o0qV:function(t,e){},v0eq:function(t,e){},vOa9:function(t,e){},yH9x:function(t,e){}},["NHnr"]);
//# sourceMappingURL=app.7be137125891afffe932.js.map