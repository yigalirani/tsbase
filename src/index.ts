startit()
function startit(){
  setInterval(() => {
    let p = document.createElement('p');
    p.textContent = 'hello world';
    document.body.appendChild(p);
  }, 1000);
}