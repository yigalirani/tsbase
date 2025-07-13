import * as esbuild from 'esbuild'

esbuild.build({ 
  entryPoints: ['src/index.tsx'],
  platform: 'node',
  bundle: true,
  outdir: './dist',
  sourcemap: true,
  target: 'node10',
  minifySyntax:false, 
  define: {
    'process.env.NODE_ENV': '"development"',
    'process': '{}',
  },
})
 