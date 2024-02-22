import defineConfig from '@darkobits/nr';
import { defaultPackageScripts } from '@darkobits/tsx';

export default defineConfig([
  defaultPackageScripts,
  ({ command, script }) => {
    script('tunnel', [
      command.node('./scripts/dist/bin/serve-ngrok.js', {
        args: 'dist'
      })
    ], {
      group: 'Other',
      description: 'Start a local server and public HTTPS tunnel.'
    });
  }
]);
