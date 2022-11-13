
export const functable = {
    help        : (env, args) => { return Object.keys(functable)},
    defaultfunc : (env, args) => { return "NO FUNC FOUND : " + args},
    dump        : (env, args) => { return JSON.stringify(env.thedatamodel)},
    length      : (env, args) => { return env.thedatamodel.length},
    index		: (env, args) => { return env.thedatamodel[args[0]] },
}
