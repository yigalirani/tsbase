startit() //this should emit error: 'startit' was used before it was defined.eslint@typescript-eslint/no-use-before-define
function startit(name='hello'){
  if (name=='hello') //should remit eqeq
    console.log('hello')
  return
  console.log('hello from node')
}
