const { exec } = await import('node:child_process');
function filterit(txt){
  return txt.split('\n').filter(x=>x.includes('Linting code')).join('\n')
}
const timing='set TIMING=1&'
//const timing=''
const cmd=timing+'npx --prefix ./tools/eslint  eslint . --debug --config ./tools/eslint/eslint.config.mjs --color '
exec(cmd,(error, stdout, stderr) => {
  console.log(`stdout: ${stdout}`);
  if (stderr)
    console.error(`stderr: ${filterit(stderr)}`);
});

exec('npx --prefix ./tools/eslint  eslint . --config ./tools/eslint/eslint.config.mjs eslint --inspect-config')