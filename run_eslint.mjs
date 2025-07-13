const { exec } = await import('node:child_process');

exec('npx eslint . --format visualstudio',(error, stdout, stderr) => {
  console.log(`stdout: ${stdout}`);
  console.error(`stderr: ${stderr}`);
});