startit()
function startit(){
  setInterval(() => {
    const p = document.createElement('p');
    p.textContent = 'hello world';
    document.body.appendChild(p);
  }, 1000);
}