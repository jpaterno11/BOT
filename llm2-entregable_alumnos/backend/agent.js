import elAgente from '../frontend/src/main.js';
async function runAgent(message) {
  return await elAgente.run(message);
  
}

export default runAgent;