import {print} from './printer'
startit() //this should emit error: 'startit' was used before it was defined.eslint@typescript-eslint/no-use-before-define
function startit(name='hello'){
  if (name=='hello') //should remit eqeq
    print(name+"d") //should remit Unexpected string concatenation.eslintprefer-template
  return
  console.log('hello from node') //should warn Unreachable code detected.ts(7027)
}
