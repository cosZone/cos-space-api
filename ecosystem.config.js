module.exports = {
  apps : [{
    name: 'cos-space-api',
    script: 'pnpm start',
    instances: 1,
    watch: false,
    max_memory_restart: '180M',
    // env: {
    //   NODE_ENV: 'production',
    // }, 
  }]
}
