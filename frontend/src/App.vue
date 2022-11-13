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
    this.env.thedatamodel = this.sexpr(this.testsexp.hello)

    const model = this.env.thedatamodel

    const lookup = (arr,name) => arr.filter( el => el[0] == name )

    const position =  lookup(model, "at")
    this.resultmodel.pos =  position


    const pads =  lookup(model[0], "pad")
    //this.resultmodel = pads[0]

    //const padPos = (p) => { p.filter( el => el[0] == "at" ) }

    //const testPadPos = padPos(pads[0])
    this.resultmodel.padsAt = pads[0].filter( el => el[0] == "at" )

    const via24_x = 37.0
    const via24_y = 34.0
    const viatemplate = '(via (at 48.1 52) (size 0.4) (drill 0.2) (layers "F.Cu" "B.Cu") (net 0) (tstamp 0d3942ac-c63c-4b67-b85a-fb2fece01205))'
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
	<div class="text-xs">
        <div>{{resultmodel}}</div></div>
	<div>a</div>
	<div>a</div>
	<div>a</div>
	<div>a</div>
	<div></div>
	<div></div>
	<div></div>
	<div class="text-xs">
        <pre>{{JSON.stringify(env.thedatamodel, null, 2)}}</pre></div>
</template>

<!-- 
	<div class="text-xs">
        <pre>{{JSON.stringify(env.thedatamodel, null, 2)}}</pre></div>
	<div>{{testsexp}}</div>

-->

