const { execSync } = require('child_process');

const extensions = /\.(html|ts|scss|css|json)$/;

try {
  const output = execSync('git diff --name-only --cached --diff-filter=ACM', {
    encoding: 'utf-8'
  });

  const files = output
    .split('\n')
    .map((file) => file.trim())
    .filter((file) => extensions.test(file));

  if (files.length > 0) {
    console.log('🧼 Formatting staged files with Prettier:');
    execSync('npx prettier --write ' + files.join(' '), { stdio: 'inherit' });

    // Re-staging
    execSync(`git add ${files.join(' ')}`);
  } else {
    console.log('✅ No staged files matching for formatting.');
  }
} catch (error) {
  console.error('❌ Error running Prettier:', error.message);
  process.exit(1);
}
