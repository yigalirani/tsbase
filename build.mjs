import * as esbuild from 'esbuild'

esbuild.build({ 
  entryPoints: ['src/index.tsx'],
  platform: 'browser',
  bundle: true,
  outdir: './dist',
  sourcemap: true,
  target: 'es2020', 
  format: 'iife', 
  minifySyntax:false, 
  define: {
    'process.env.NODE_ENV': '"development"',
    'process': '{}',
  },
})
 