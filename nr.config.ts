import { nr } from '@darkobits/tsx';

export default nr(({ command, script }) => {
  script('tunnel', {
    group: 'Other',
    description: 'Start a local server and public HTTPS tunnel.',
    run: [
      command('serve', ['./scripts/dist/bin/serve-ngrok.js', ['dist']], {
        // Options here.
      })
    ]
  });
});
