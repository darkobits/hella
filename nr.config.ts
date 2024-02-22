import defineConfig from '@darkobits/nr';
import { defaultPackageScripts } from '@darkobits/tsx';

export default defineConfig([
  defaultPackageScripts,
  ({ command, script }) => {
    script('start', command('next', { args: 'dev' }), {
      group: 'Development',
      description: 'Start a Next.JS development server.'
    });

    script('preview', command('next', { args: 'start' }), {
      group: 'Development',
      description: 'Start a Next.JS preview server.'
    });

    script('build', command('next', { args: 'build' }), {
      group: 'Development',
      description: 'Build the Next.JS application.'
    });

    script('lint', command('next', { args: 'lint' }), {
      group: 'Development',
      description: 'Start Next.JS in development mode.'
    });

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
