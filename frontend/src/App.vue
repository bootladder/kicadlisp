<script>
import {sexpr} from './sexpr.js'
import {testsexp} from './testsexp.js'
import { app, db } from './firebase.js'
import { collection, doc, onSnapshot, getDoc, updateDoc, arrayUnion, setDoc } from "firebase/firestore";
import keyboard from './keyboard.js'
        const {keybindingexpression, inputexpression, lastkey, workingarea, controlpanel} = keyboard()
import {onMounted,ref, watch} from 'vue/dist/vue.esm-bundler.js';

import {functable} from './functable.js'


//// EVAL
///
const eval_expression = (env, input) => {
    const tokens = input.split(" ")

    if( false == (tokens[0] in functable) ) return functable.defaultfunc(env,tokens)

    const res = functable[tokens[0]](env, tokens.slice(1))
    console.log("hahafd")
    env.lastexpr = input

    return res
}



    

export default {
	components: {
	},
	setup () {

       const env = ref({}); 
       const blah = ref("bla");
		return {
            inputexpression: inputexpression,
            workingarea: workingarea,
            resultarea: ref("no result"),
            resultmodel:ref({dummy:"dummy"}),
            env: env,
            sexpr:sexpr,
            blah:blah,
            testsexp: ref(testsexp),
		}
	},


  watch: {
    inputexpression: {
            handler(exp, old) {
                if(inputexpression.exp == "") return;

                const res = eval_expression(this.env, inputexpression.exp)

                this.resultarea = res
                inputexpression.exp = ""

            }, deep:true,
        }
  },


	methods: {
	},


  async mounted() {
    const lookup = (arr,name) => arr.filter( el => el[0] == name )
    const padx   = (pad) => lookup(pad, "at")[0][1]
    const pady   = (pad) => lookup(pad, "at")[0][2]


    this.env.thedatamodel = this.sexpr(this.testsexp.hello)

    const model = this.env.thedatamodel
    this.resultmodel.length = "model.length = " + model.length

    const footprint = model[0]

    const position =  lookup(footprint, "at")[0]
    this.resultmodel.footprintposition =  position
    this.resultmodel.footprintx =  position[1]
    this.resultmodel.footprinty =  position[2]

    const pads =  lookup(footprint, "pad")
    this.resultmodel.numPads = pads.length
    this.resultmodel.pad0 = pads[0]
    this.resultmodel.pad0at = lookup(pads[0], "at")
    this.resultmodel.pad0x = padx(pads[0])
    this.resultmodel.pad0y = pady(pads[0])
    this.resultmodel.pad0AbsoluteX = parseFloat(padx(pads[0])) + parseFloat(this.resultmodel.footprintx)
    this.resultmodel.pad0AbsoluteY = parseFloat(pady(pads[0])) + parseFloat(this.resultmodel.footprinty)

    const viaX = this.resultmodel.pad0AbsoluteX
    const viaY = this.resultmodel.pad0AbsoluteY
    const viatemplate = `(via (at "${viaX}" "${viaY}") (size 0.4) (drill 0.2) (layers "F.Cu" "B.Cu") (net 0) (tstamp 0d3942ac-c63c-4b67-b85a-fb2fece01205))`

    this.resultmodel.viaOfPad0 = viatemplate
  }
}


</script>

<template>
	<div>Hurr Durr</div>
	<div>Working Area: {{workingarea}} </div>
	<div></div>
	<div>{{inputexpression}} </div>
	<div>{{resultarea}} </div>
	<div>a</div>
	<div>a</div>
	<div>a</div>
	<div>a</div>
	<div class="text-xs" v-for="(v,k) in resultmodel">
        <div>{{k}} : {{v}}</div></div>
	<div>a</div>
	<div>a</div>
	<div>a</div>
	<div>a</div>
	<div></div>
	<div></div>
	<div></div>
	<div class="text-xs">
        <pre>{{JSON.stringify(env.thedatamodel, null, 4)}}</pre></div>
</template>

<!-- 
	<div class="text-xs">
        <pre>{{JSON.stringify(env.thedatamodel, null, 2)}}</pre></div>
	<div>{{testsexp}}</div>

        <pre>{{JSON.stringify(resultmodel,null,4)}}</pre></div>
-->

