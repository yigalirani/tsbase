const { exec } = await import('node:child_process');
function filterit(txt){
  return txt.split('\n').filter(x=>x.includes('Linting code')).join('\n')
}
const timing='set TIMING=1&'
//const timing=''
const cmd=timing+'npx --prefix ./eslint  eslint . --debug --config ./eslint/eslint_config.mjs --color '
exec(cmd,(error, stdout, stderr) => {
  console.log(`stdout: ${stdout}`);
  if (stderr)
    console.error(`stderr: ${filterit(stderr)}`);
});

exec('npx --prefix ./eslint  eslint . --config ./eslint/eslint_config.mjs eslint --inspect-config')