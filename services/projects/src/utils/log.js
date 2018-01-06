export default function log(message = '') {
  console.log(`[${new Date().toISOString()}] ${message}`);
}
