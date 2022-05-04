var e=Object.defineProperty,t=Object.defineProperties,a=Object.getOwnPropertyDescriptors,i=Object.getOwnPropertySymbols,s=Object.prototype.hasOwnProperty,r=Object.prototype.propertyIsEnumerable,o=(t,a,i)=>a in t?e(t,a,{enumerable:!0,configurable:!0,writable:!0,value:i}):t[a]=i,n=(e,t)=>{for(var a in t||(t={}))s.call(t,a)&&o(e,a,t[a]);if(i)for(var a of i(t))r.call(t,a)&&o(e,a,t[a]);return e},l=(e,i)=>t(e,a(i));import{_ as d}from"./Dashboard.8c697e59.js";import{_ as c}from"./Payouts.fc00da12.js";import{_ as m}from"./Settings.4fd5e693.js";import{u,B as g,C as h,v as p,aB as f,m as y,j as v,K as b,r as w,o as k,c as I,a as M,f as P,g as T,ar as x,aC as C,as as S,i as j,t as E,k as $,p as _,h as O,n as H,w as A,e as W,b as R,T as U,E as B,aD as D}from"./vendor.49fd770e.js";import{L as q,W as L,_ as N,D as F}from"./main.1ece6314.js";import{T as V}from"./Tooltip.9de05253.js";import{_ as z}from"./Worker.ad9da261.js";import"./AnimateNumber.3586cfa2.js";import"./AbstractTable.d595876d.js";import"./plus_button_orange.6678e63d.js";import"./RealtimeSwitch.2ba7aa20.js";import"./RequestPayout.da274350.js";import"./HashrateChart.81deea54.js";import"./stock.5a9d879d.js";import"./SharesChart.04d90b8b.js";var G=Object.freeze({__proto__:null,[Symbol.toStringTag]:"Module",get default(){return wt}});const J={name:"miner-settings",props:["id"],setup(){const e=u().state.config,t=g({title:"Settings - "+e.poolName+" - "+e.fullName+" ("+e.symbol+") mining pool"});h({title:p((()=>t.title)),meta:[{property:"og:title",content:p((()=>t.title))}]})},mounted(){void 0!==window&&void 0!==window.ethereum&&ethereum.isMetaMask&&(ethereum.on("accountsChanged",(e=>{e&&e.length&&this.setWalletAddress(e[0])})),ethereum.on("chainChanged",(e=>{this.resetWallet()}))),this.unsubscribe=this.$store.subscribe(((e,t)=>{"setActiveWallet"===e.type&&!1===t.wallet.available&&(t.wallet.network&&"1"!==t.wallet.network&&"137"===t.wallet.network?(this.modalHeader="Wrong Network Version",this.modalBody="Switch to the <b>Ethereum Mainnet</b> or <b>Polygon Network</b> in order to change your settings.",this.toggleModal()):(this.modalHeader="MetaMask not found",this.modalBody='You need to install <a style="color:var(--primary-color);" href="https://metamask.io/">MetaMask</a> before you can change your settings without the need for an IP. If MetaMask is enabled and you are still seeing this message try reloading the page.',this.toggleModal()))}))},unmounted(){this.unsubscribe()},data:()=>({localIp:"",lifecycle:"",modalBody:"",modalHeader:"",deviceIP:"",signature:"",unsubscribe:()=>{}}),components:{Loading:q,Tooltip:V,Wallet:L},computed:l(n({},f({ip:e=>e.settings.ip,email:e=>e.settings.email,config:e=>e.config,language:e=>e.language})),{monitor:{get(){return!!this.$store.state.settings.monitor},set(e){this.$store.commit("setSettingsMonitor",e)}},threshold:{get(){return this.$store.state.settings.threshold},set(e){this.$store.commit("setSettingsThreshold",e)}},email:{get(){return this.$store.state.settings.email},set(e){this.$store.commit("setSettingsEmail",e)}},isWalletConnected(){return this.$store.state.wallet.address.toLowerCase().replace(/^0x/,"")==this.id.replace(/^0x/,"").toLowerCase()},workers(){return this.$store.getters.getActiveWorkers},matchIpHint(){if(!this.ip&&!this.deviceIP)return!1;let e=this.ip.split(".");if(e.length<4)return!1;let t=this.deviceIP.split(".");if(t.length<4)return!1;let a=t[3],i=e[3];return!(!i||!e)&&a===i}}),methods:l(n(n({},y(["setWalletAddress","resetWallet"])),v(["resetWallet"])),{getSignature(){return new Promise(((e,t)=>{if(!this.isWalletConnected)return e("");const a=this.$store.state.wallet.address,i=JSON.stringify({email:this.email,threshold:""+this.threshold,monitor:this.monitor?"on":"off"},null,"\t"),s="0x"+new b.Buffer(i,"utf8").toString("hex");ethereum.sendAsync({method:"personal_sign",params:[s,a],from:a},((a,s)=>{a&&t(a),s&&s.result?e({message:i,signature:s.result}):t("error failed to get signature.")}))}))},submitForm(){this.getSignature().catch((e=>{this.modalHeader="Signing Failed",this.modalBody="Failed to sign the request to update your settings.",this.toggleModal()})).then((({message:e,signature:t})=>{this.lifecycle="prepare-loading",setTimeout((()=>{"fulfilled"!==this.lifecycle&&"fulfilled-error"!==this.lifecycle&&(this.lifecycle="loading")}),500);const a=JSON.stringify({monitor:this.monitor?"on":"off",email:this.email,threshold:""+this.threshold,ip:this.localIp,signature:t,message:e});fetch(`https://api.lgdlkq.ml/miner/${this.id}/dashboard/settings`,{method:"POST",headers:{Accept:"application/json","Content-Type":"application/json"},mode:"cors",body:a}).then((e=>(this.lifecycle="fulfilled",e.json()))).then((e=>{if("ERROR"===e.status)throw e.error;this.modalHeader="Settings Updated",this.modalBody="Your settings have been successfully updated.",this.toggleModal()})).catch((e=>{this.lifecycle="fulfilled-error",this.modalHeader=this.language.errorOccured,"Invalid IP"===e?(this.modalHeader="Invalid IP Address",this.modalBody=this.language.wrongIpAddress(this.ip)):"Invalid email address provided"===e?(this.modalHeader="Invalid Email Address",this.modalBody=this.language.wrongEmail):"DB Error"===e?this.modalBody=this.language.genericError:"Invalid address"===e?(this.modalHeader="Invalid Miner Address",this.modalBody=this.language.wrongAddress):this.modalBody="Payout threshold to low for hashrate"===e?this.language.lowPayoutThresholdError:this.language.genericError,this.toggleModal(),console.error(e)}))}))},toggleModal(){this.$refs.modal.classList.toggle("open")},getUserIP(){fetch("https://ip.seeip.org/jsonip").then((e=>e.json())).then((({ip:e})=>{this.deviceIP=e}))}})},Y=e=>(_("data-v-4a401c36"),e=e(),O(),e),K={class:"container"},X={key:0,style:{display:"flex","flex-wrap":"wrap","align-items":"center"}},Z={style:{margin:".5rem .5rem .5rem 0"}},Q={style:{margin:".5rem 0 .5rem 0","font-family":"'Roboto'","font-weight":"300",overflow:"hidden"}},ee={key:0},te={key:1,style:{color:"var(--danger-color)","font-family":"'Roboto Mono'",overflow:"hidden"}},ae=Y((()=>M("b",null,[j("Unexpected account connected. Make sure that the account you connect matches the one shown at the top of the page. "),M("i",null,"Open Metamask to switch account.")],-1))),ie={key:2},se=[j(" Connect to MetaMask to change your settings "),Y((()=>M("i",null,"(beta)",-1)))],re={class:"form-group"},oe=["disabled"],ne=Y((()=>M("label",{for:"monitor"},"Send a mail if one of my workers goes offline",-1))),le={class:"form-group"},de=Y((()=>M("label",{for:"email"}," Email address (Only used for alerts. To prevent spam the first 3 characters are not shown). ",-1))),ce=["required","disabled"],me={key:0,class:"form-group"},ue={for:"payment-threshold"},ge={key:0},he=j("). "),pe={key:1},fe=["href"],ye=j(" Payout Policy"),ve=["min","max","disabled"],be={key:1},we=[Y((()=>M("ol",{class:"payout-policy"},[M("li",null,[j(" Unpaid balances above "),M("b",null,"0.05 ETH"),j(" will always be paid out at least once every "),M("b",null,"7 days")]),M("li",null,[j(" Unpaid balances above "),M("b",null,"0.01 ETH"),j(" will always be paid out at least once every "),M("b",null,"14 days")])],-1)))],ke={style:{"min-height":"100px"},class:"form-group"},Ie={key:0,for:"ip"},Me={key:1,style:{color:"grey"}},Pe=["required","placeholder","disabled"],Te={key:2,class:"ip-info"},xe={key:0},Ce={key:1},Se=j("Hint for the required IP is "),je={style:{"font-weight":"bold"}},Ee={key:0},$e=Y((()=>M("span",{style:{margin:"0 .1rem"}}," | ",-1))),_e=j(" The IP of "),Oe=Y((()=>M("b",null,"this",-1))),He=j(" device is "),Ae={style:{"font-weight":"bold"}},We={key:2,style:{display:"flex","justify-content":"center","margin-top":"1.2rem"}},Re=["disabled"],Ue={class:"modal-content"},Be={class:"feedback-card"},De={class:"header"},qe={class:"body"},Le=["innerHTML"];var Ne=N(J,[["render",function(e,t,a,i,s,r){const o=w("Wallet"),n=w("fa-icon"),l=w("Loading");return k(),I("div",K,["ETH"===e.$store.state.config.key?(k(),I("div",X,[M("div",Z,[P(o)]),M("div",Q,[r.isWalletConnected?(k(),I("span",ee,"Settings can now be changed without providing an IP.")):e.$store.state.wallet.address?(k(),I("span",te,[ae,T(' <div style="color: var(--font-color);font-size:80%; margin-top: .5rem;">Expected: 0x{{id}}</div>\n          <div style="color: var(--font-color);font-size:80%;">Received: {{$store.state.wallet.address}}</div> ')])):(k(),I("span",ie,se))])])):T("v-if",!0),M("form",{onSubmit:t[4]||(t[4]=$(((...e)=>r.submitForm&&r.submitForm(...e)),["prevent"]))},[M("div",re,[x(M("input",{"onUpdate:modelValue":t[0]||(t[0]=e=>r.monitor=e),type:"checkbox",name:"monitor",id:"monitor",disabled:s.lifecycle.includes("loading")},null,8,oe),[[C,r.monitor]]),ne]),M("div",le,[de,x(M("input",{required:r.monitor,"onUpdate:modelValue":t[1]||(t[1]=e=>r.email=e),type:"text",name:"email",id:"email",disabled:s.lifecycle.includes("loading")},null,8,ce),[[S,r.email]])]),"ETP"!==e.config.key?(k(),I("div",me,[M("label",ue,[j(" Payment threshold in "+E(e.config.currency)+" (Min: "+E(e.config.minPayout)+" "+E(e.config.currency)+", Max: "+E(e.config.maxPayout)+" "+E(e.config.currency)+" ",1),1==e.config.payoutWarning?(k(),I("span",ge," , if set to less than "+E(e.config.minPayoutWithoutTaxes)+" "+E(e.config.currency)+" a fixed tx fee of "+E(e.config.payoutTaxes)+" "+E(e.config.currency)+" will be deducted from the payout ",1)):T("v-if",!0),he,e.config.payoutFrequency&&e.config.payoutFrequency>0?(k(),I("span",pe,"Max one payout every "+E(e.config.payoutFrequency||24)+" hours.",1)):T("v-if",!0),e.config.payoutPolicy?(k(),I("a",{key:2,style:{color:"var(--primary-color)","text-decoration":"none","margin-left":".5rem"},href:e.config.payoutPolicy},[P(n,{class:"external",style:{"margin-left":"0.1rem",position:"relative"},size:"sm",icon:["fal","external-link"]}),ye],8,fe)):T("v-if",!0)]),x(M("input",{required:"","onUpdate:modelValue":t[2]||(t[2]=e=>r.threshold=e),type:"number",name:"threshold",id:"threshold",min:e.config.minPayout,max:e.config.maxPayout,step:"any",disabled:s.lifecycle.includes("loading")},null,8,ve),[[S,r.threshold]])])):T("v-if",!0),"ETH"===e.config.key?(k(),I("div",be,we)):T("v-if",!0),M("div",ke,[r.isWalletConnected?(k(),I("label",Me,"Wallet successfully connected for this address, IP is not required.")):(k(),I("label",Ie," To save, validate your account by completing the IP given below (the IP corresponds to the public IP address of your highest performing worker). ")),x(M("input",{required:!r.isWalletConnected,"onUpdate:modelValue":t[3]||(t[3]=e=>s.localIp=e),placeholder:r.isWalletConnected?e.$store.state.wallet.address:e.ip,type:"text",name:"ip",id:"ip",disabled:s.lifecycle.includes("loading")||r.isWalletConnected},null,8,Pe),[[S,s.localIp]]),r.isWalletConnected?T("v-if",!0):(k(),I("div",Te,[M("small",null,["MINER NOT ACTIVE"===e.ip?(k(),I("span",xe,"An active miner is required to change the settings.")):(k(),I("span",Ce,[M("span",null,[Se,M("span",je,E(e.ip),1)]),s.deviceIP&&s.deviceIP.length?(k(),I("span",Ee,[$e,_e,Oe,He,M("span",Ae,E(s.deviceIP),1)])):T("v-if",!0),T(' <Tooltip text="Only you will be able to see this IP" v-else>\n            <button class="ip-button" type="button" @click="getUserIP()" style="margin-left: 1rem;">Get IP for this device</button>\n          </Tooltip> ')]))])]))]),"loading"===s.lifecycle?(k(),I("div",We,[P(l)])):(k(),I("input",{key:3,ref:"submit",type:"submit",value:"Submit",disabled:s.lifecycle.includes("loading")},null,8,Re))],32),M("div",{onClick:t[5]||(t[5]=$(((...e)=>r.toggleModal&&r.toggleModal(...e)),["self"])),ref:"modal",class:"modal-container"},[M("div",Ue,[M("div",Be,[M("div",De,[M("span",{ref:"modalHeader"},E(s.modalHeader),513)]),M("div",qe,[M("span",{ref:"modalBody",innerHTML:s.modalBody},null,8,Le)])]),P(n,{onClick:r.toggleModal,class:"modal-close",icon:["fal","times"]},null,8,["onClick"]),T(' <button class="modal-close" @click="toggleModal()">Close</button> ')])],512),T(" </div> ")])}],["__scopeId","data-v-4a401c36"]]),Fe=Object.freeze({__proto__:null,[Symbol.toStringTag]:"Module",default:Ne});const Ve={name:"miner-nav-bar",props:["id"],data:()=>({links:[],active:"Worker"}),computed:{language(){return this.$store.state.language},config(){return this.$store.state.config}},components:{Dropdown:F},mounted(){const e=this.$refs.dropdown.querySelector("a.active-link span");e&&(this.active=e.innerHTML)},created(){this.$router.afterEach((e=>{let t=e.path.split("/");if(t&&t.length)switch(t[t.length-1]){case"settings":this.active="Settings";break;case"payouts":this.active="Payouts";break;case"worker":this.active="Worker";break;case"dashboard":this.active="Dashboard"}}))}},ze=e=>(_("data-v-5f4c10e4"),e=e(),O(),e),Ge={ref:"minerNav",class:"miner-nav-container"},Je={class:"content"},Ye=["href"],Ke={key:1},Xe=["href"],Ze={ref:"dropdown",class:"dropdown"},Qe={ref:"dashboard"},et={ref:"payout"},tt={ref:"settings"},at={class:"help",ref:"help"},it={href:"https://discord.io/ethermine"},st=ze((()=>M("span",{style:{"margin-right":"0.5rem"}},"Support",-1))),rt=ze((()=>M("span",null,null,-1)));var ot=N(Ve,[["render",function(e,t,a,i,s,r){const o=w("router-link"),n=w("fa-icon"),l=w("dropdown");return k(),I("div",Ge,[M("div",Je,[M("div",{class:H({address:!0,smaller:"ERG"===r.config.key})},["ETC"===r.config.key?(k(),I("a",{key:0,target:"_blank",rel:"noopener",href:r.config.explorer.url+r.config.explorer.account+(a.id[0]+a.id[1]==="0x"?a.id:"0x"+a.id)},E(a.id[0]+a.id[1]==="0x"?a.id:r.config.addressPrefix+a.id),9,Ye)):"BEAM"===r.config.key?(k(),I("span",Ke,E(a.id),1)):(k(),I("a",{key:2,target:"_blank",rel:"noopener",href:r.config.explorer.url+r.config.explorer.account+a.id},E(a.id[0]+a.id[1]==="0x"?a.id:r.config.addressPrefix+a.id),9,Xe))],2),M("div",Ze,[M("span",null,[P(l,{class:"nav",responsive:!0,active:s.active},{default:A((()=>[M("li",Qe,[P(o,{"active-class":"active-link",to:"/miners/"+a.id+"/dashboard"},{default:A((()=>[M("span",null,E(r.language.dashboard),1)])),_:1},8,["to"])],512),M("li",et,[P(o,{"active-class":"active-link",to:"/miners/"+a.id+"/payouts"},{default:A((()=>[M("span",null,E(r.language.payouts),1)])),_:1},8,["to"])],512),M("li",tt,[P(o,{"active-class":"active-link",to:"/miners/"+a.id+"/settings"},{default:A((()=>[M("span",null,E(r.language.settings),1)])),_:1},8,["to"])],512),M("li",at,[M("a",it,[st,P(n,{class:"external",style:{position:"relative"},size:"sm",icon:["fal","external-link"]})])],512)])),_:1},8,["active"])]),rt],512)])],512)}],["__scopeId","data-v-5f4c10e4"]]);const nt={props:["id"],name:"miner",data:()=>({tos:"",msgId:null,unsubscribe:()=>{},interval:null,countdownInterval:null,bannedCountry:!1}),mounted(){this.unsubscribe=this.$store.subscribe(((e,t)=>{if("setRealtimeUpdates"===e.type&&(t.settings.isRealtime?this.startRealtimeUpdates():this.endRealtimeUpdates()),"setDashboard"===e.type)try{let e=localStorage.getItem("searches"),t=this.id;e=e?JSON.parse(e):{},e=Object.assign({},e),"ETC"!==this.config.key&&"ETH"!==this.config.key||t&&t.length>2&&t[0]+t[1]!=="0x"&&(t="0x"+t),void 0!==e[t]?e[t]+=1:e[t]=-1,localStorage.setItem("searches",JSON.stringify(e))}catch(a){console.error("Could not save searches to local storage",a)}}));try{"true"===localStorage.getItem("settings.isRealtime")?this.setRealtimeUpdates(!0):this.setRealtimeUpdates(!1)}catch(e){console.error("real time updates are not supported",e)}this.prefetch()},computed:{config(){return this.$store.state.config},language(){return this.$store.state.language},dashboard(){return this.$store.state.dashboard},lifecycle(){return this.$store.state.requests.dashboard.currentState},suspended(){return this.$store.state.settings.initial.suspended}},unmounted(){this.unsubscribe(),this.endRealtimeUpdates()},created(){this.fetchData().then((()=>{this.$store.state.settings.initial.suspended&&(this.setModalContent({header:"Your account has been suspended.",body:'\n        Suspended accounts can continue to mine on the pool but will not receive any pool payouts. \n        To reactivate your account please create a support ticket at\n        <a\n          style="color: var(--primary-color);"\n          rel="noopener"\n          href="https://support.bitfly.at/support/home"\n          target="_blank"\n        >support.bitfly.at</a>.'}),this.toggleModal())})),fetch(`https://api.lgdlkq.ml/miner/${this.id}/dashboard/msg`).then((e=>e.json())).then((({data:e,status:t})=>{this.bannedCountry=e.bannedCountry||!1,e&&"OK"===t&&e.msg&&(this.msgId=e.msg.id,this.tos=e.msg.msg.replace(/<a/g,'<a style="color: var(--primary-color); text-decoration: none; margin: 0 0.3rem;"'))}))},watch:{id(e,t){e!==t&&(this.endRealtimeUpdates(),this.fetchData(),this.startRealtimeUpdates())}},methods:l(n(n({prefetch:()=>({"/src/views/Miner/Dashboard.vue":d,"/src/views/Miner/Index.vue":G,"/src/views/Miner/Payouts.vue":c,"/src/views/Miner/Settings.vue":m,"/src/views/Miner/SettingsOLD.vue":Fe,"/src/views/Miner/Worker.vue":z})},y(["setRealtimeUpdates","setCountdown","decrementCountdown","setModalContent","toggleModal"])),v(["getDashboard","getPayouts","getSettings"])),{async fetchData(){return Promise.all([this.getDashboard(this.id),this.getPayouts(this.id),this.getSettings(this.id)])},startRealtimeUpdates(){this.setCountdown(60),this.countdownInterval&&clearInterval(this.countdownInterval),this.countdownInterval=setInterval((()=>{this.decrementCountdown()}),1e3),localStorage.getItem("settings.isRealtime")&&(this.interval=setInterval((()=>{this.setCountdown(60),this.getDashboard(this.id)}),61e3))},endRealtimeUpdates(){this.interval&&clearInterval(this.interval),this.countdownInterval&&clearInterval(this.countdownInterval)},accept(){if(this.tos=null,this.msgId&&this.id){let e=this.id;"ETC"!=this.config.key&&"ETH"!=this.config.key||e&&e.length>2&&e[0]+e[1]==="0x"&&(e=e.slice(2)),fetch(`https://api.lgdlkq.ml/miner/${e}/confirm/${this.msgId}`,{method:"POST",cache:"no-store",headers:{"Access-Control-Allow-Origin":"*","Access-Control-Allow-Methods":"GET, POST, PATCH, PUT, DELETE, OPTIONS","Access-Control-Allow-Headers":"Origin, Content-Type, X-Auth-Token","Cache-Control":"no-cache"}})}},reject(){this.$router.push("/")}}),components:{MinerNavBar:ot}},lt={class:"miners-container"},dt={key:0,class:"lifecycle-empty"},ct=["innerHTML"],mt={key:1,class:"lifecycle-empty"},ut={key:2,class:"lifecycle-empty"},gt=M("a",{style:{color:"var(--primary-color)"},rel:"noopener",href:"https://support.bitfly.at/support/home",target:"_blank"},"support.bitfly.at",-1),ht=j(". "),pt={key:3,class:"lifecycle-empty"},ft=W('<div style="font-family:&#39;Roboto&#39;;font-weight:500;"><p>Dear User,</p><p> To be compliant with our local regulations laid out in the Financial Market Money Laundering Act (FM GwG), we will no longer be able to provide our mining services to miners located in the following countries: <ul style="display:flex;flex-wrap:wrap;flex-direction:row;margin:.5rem 0;list-style-type:circle;color:var(--bad-color);"><li style="margin:.3rem;margin-left:1rem;">Afghanistan</li><li style="margin:.3rem;margin-left:1rem;">Bahamas</li><li style="margin:.3rem;margin-left:1rem;">Barbados</li><li style="margin:.3rem;margin-left:1rem;">Belarus</li><li style="margin:.3rem;margin-left:1rem;">Botswana</li><li style="margin:.3rem;margin-left:1rem;">Cambodia</li><li style="margin:.3rem;margin-left:1rem;">Ethiopia</li><li style="margin:.3rem;margin-left:1rem;">Ghana</li><li style="margin:.3rem;margin-left:1rem;">Iran</li><li style="margin:.3rem;margin-left:1rem;">Iraq</li><li style="margin:.3rem;margin-left:1rem;">Jamaica</li><li style="margin:.3rem;margin-left:1rem;">Mauritius</li><li style="margin:.3rem;margin-left:1rem;">Mongolia</li><li style="margin:.3rem;margin-left:1rem;">Myanmar</li><li style="margin:.3rem;margin-left:1rem;">Nicaragua</li><li style="margin:.3rem;margin-left:1rem;">North Korea</li><li style="margin:.3rem;margin-left:1rem;">Pakistan</li><li style="margin:.3rem;margin-left:1rem;">Panama</li><li style="margin:.3rem;margin-left:1rem;">Russia</li><li style="margin:.3rem;margin-left:1rem;">Syria</li><li style="margin:.3rem;margin-left:1rem;">Trinidad and Tobago</li><li style="margin:.3rem;margin-left:1rem;">Uganda</li><li style="margin:.3rem;margin-left:1rem;">Vanuatu</li><li style="margin:.3rem;margin-left:1rem;">Yemen</li><li style="margin:.3rem;margin-left:1rem;">Zimbabwe</li></ul><p> As you are currently viewing this dashboard from one of the listed countries, we kindly ask you to finalize your mining activity on this pool as soon as possible. We will apply technical measures to limit access to our stratum servers from listed countries starting from the 28th of March 2022. We appreciate your understanding! </p></p></div>',1),yt={class:"miner-content"},vt={key:4,class:"tos-container"},bt=["innerHTML"];var wt=N(nt,[["render",function(e,t,a,i,s,r){const o=w("miner-nav-bar"),n=w("router-link"),l=w("router-view");return k(),I("div",lt,[P(o,{id:a.id},null,8,["id"]),"ETH"===r.config.key&&r.config.minerMessage(r.dashboard.currentStatistics.highTxFeeAmount)?(k(),I("div",dt,[M("div",null,[M("span",{innerHTML:r.config.minerMessage(r.dashboard.currentStatistics.highTxFeeAmount)},null,8,ct)])])):r.suspended||"fulfilled"!==r.lifecycle&&"reloading"!==r.lifecycle||r.dashboard.workers&&r.dashboard.workers.length?r.suspended?(k(),I("div",ut,[M("div",null,[M("span",null,E(r.language.suspended)+" ",1),gt,ht])])):T("v-if",!0):(k(),I("div",mt,[M("div",null,[j(E(r.language.dashboardEmpty+".If you just started mining, it can take up to 10 minutes for your stats to become visible in the dashboard.")+" "+E(r.dashboard.currentStatistics.time?r.language.lastUpdate+" "+r.dashboard.currentStatistics.lastSeen+".":"")+" ",1),P(n,{class:"start-mining",to:"/start"},{default:A((()=>[M("span",null," "+E(r.language.heroStartMining),1)])),_:1})])])),s.bannedCountry?(k(),I("div",pt,[ft,T(' <div><span>{{ language.bannedCountry }}</span>\n      View our \n        <a\n            style="color: var(--primary-color);"\n            rel="noopener"\n            href="https://support.bitfly.at/support/home"\n            target="_blank"\n          >Terms</a> for more information.\n      </div> ')])):T("v-if",!0),M("div",yt,[P(l,null,{default:A((({Component:e})=>[(k(),R(D,null,[P(U,{name:"fade"},{default:A((()=>[(k(),R(B(e),{id:a.id},null,8,["id"]))])),_:2},1024)],1024))])),_:1})]),s.tos?(k(),I("div",vt,[M("div",{class:"tos-indicator",innerHTML:s.tos},null,8,bt),M("button",{onClick:t[0]||(t[0]=(...e)=>r.accept&&r.accept(...e)),class:"tos-button accept is-mobile"},E(r.language.accept),1),M("button",{onClick:t[1]||(t[1]=(...e)=>r.accept&&r.accept(...e)),class:"tos-button accept is-desktop"},E(r.language.acceptClose),1),T(' <button @click="reject" class="tos-button reject">{{language.reject}}</button> ')])):T("v-if",!0)])}]]);export{wt as default};
