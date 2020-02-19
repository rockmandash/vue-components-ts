const { execSync } = require('child_process');

execSync(`standard-version`, {
  stdio: 'inherit'
});

execSync(`git push --follow-tags origin master`, {
  stdio: 'inherit'
});
