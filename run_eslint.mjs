const { exec } = await import('node:child_process');
const cmd='npx --prefix ./eslint  eslint . --config eslint/eslint.config.mjs --color'
exec(cmd,(error, stdout, stderr) => {
  console.log(`stdout: ${stdout}`);
  if (stderr)
    console.error(`stderr: ${stderr}`);
});