#!/usr/bin/env node

/**
 * MIME Type Diagnostic Test
 * Testa se o servidor está servindo CSS, JS e outros arquivos com MIME types corretos
 *
 * Uso: node test-mime-types.js
 */

const http = require('http');
const https = require('https');

// Cores para output
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m'
};

function colorize(text, color) {
  return `${colors[color]}${text}${colors.reset}`;
}

// Configuração de testes
const tests = [
  {
    url: 'http://localhost:6000',
    file: '/',
    expectedMimeType: 'text/html',
    name: 'index.html'
  },
  {
    url: 'http://localhost:6000',
    file: '/styles.css',
    expectedMimeType: 'text/css',
    name: 'styles.css'
  },
  {
    url: 'http://localhost:6000',
    file: '/index.html',
    expectedMimeType: 'text/html',
    name: 'index.html (explicit)'
  },
  {
    url: 'https://portal-dpa-landing-page.vercel.app',
    file: '/',
    expectedMimeType: 'text/html',
    name: 'Vercel: /'
  },
  {
    url: 'https://portal-dpa-landing-page.vercel.app',
    file: '/styles.css',
    expectedMimeType: 'text/css',
    name: 'Vercel: /styles.css'
  }
];

function testUrl(config) {
  return new Promise((resolve) => {
    const urlObj = new URL(config.file, config.url);
    const protocol = urlObj.protocol === 'https:' ? https : http;

    const options = {
      hostname: urlObj.hostname,
      port: urlObj.port || (urlObj.protocol === 'https:' ? 443 : 80),
      path: urlObj.pathname,
      method: 'HEAD',
      timeout: 5000
    };

    const req = protocol.request(options, (res) => {
      const contentType = res.headers['content-type'] || 'Not provided';
      const status = res.statusCode;

      const mimeTypeMatch = contentType.split(';')[0].trim();
      const isCorrect = mimeTypeMatch === config.expectedMimeType;

      resolve({
        name: config.name,
        status,
        contentType,
        expectedMimeType: config.expectedMimeType,
        isCorrect,
        headers: res.headers
      });
    });

    req.on('error', (error) => {
      resolve({
        name: config.name,
        error: error.message,
        isCorrect: false
      });
    });

    req.on('timeout', () => {
      req.destroy();
      resolve({
        name: config.name,
        error: 'Timeout (server not responding)',
        isCorrect: false
      });
    });

    req.end();
  });
}

async function runTests() {
  console.log(colorize('\n╔═══════════════════════════════════════════════════════════╗', 'cyan'));
  console.log(colorize('║          MIME TYPE DIAGNOSTIC TEST                        ║', 'cyan'));
  console.log(colorize('║       Portal DPA Landing Page — v1.0.3                     ║', 'cyan'));
  console.log(colorize('╚═══════════════════════════════════════════════════════════╝\n', 'cyan'));

  console.log(colorize('Testing MIME types...', 'blue'));
  console.log('─'.repeat(70));

  const results = [];

  for (const test of tests) {
    const result = await testUrl(test);
    results.push(result);

    const statusIcon = result.error ? '❌' : result.isCorrect ? '✅' : '❌';
    const statusColor = result.error ? 'red' : result.isCorrect ? 'green' : 'red';

    console.log(`\n${statusIcon} ${colorize(result.name, statusColor)}`);

    if (result.error) {
      console.log(`   Error: ${colorize(result.error, 'red')}`);
    } else {
      console.log(`   Status: ${colorize(result.status, result.status === 200 ? 'green' : 'red')}`);
      console.log(`   Content-Type: ${colorize(result.contentType, result.isCorrect ? 'green' : 'red')}`);

      if (!result.isCorrect) {
        console.log(`   Expected: ${colorize(result.expectedMimeType, 'yellow')}`);
        console.log(`   Got: ${colorize(result.contentType.split(';')[0], 'red')}`);
      }

      // Show important headers
      const headers = result.headers;
      if (headers['cache-control']) {
        console.log(`   Cache-Control: ${headers['cache-control']}`);
      }
      if (headers['x-content-type-options']) {
        console.log(`   X-Content-Type-Options: ${headers['x-content-type-options']}`);
      }
    }
  }

  console.log('\n' + '─'.repeat(70));

  // Summary
  const passed = results.filter(r => r.isCorrect).length;
  const failed = results.filter(r => !r.isCorrect).length;

  console.log(colorize('\n📊 SUMMARY', 'cyan'));
  console.log(`Total tests: ${results.length}`);
  console.log(colorize(`Passed: ${passed}`, 'green'));
  console.log(colorize(`Failed: ${failed}`, failed > 0 ? 'red' : 'green'));

  if (failed === 0) {
    console.log(colorize('\n✅ All MIME types are correct!', 'green'));
    console.log('Your site should work properly on Vercel.\n');
  } else {
    console.log(colorize('\n❌ Some MIME types are incorrect!', 'red'));
    console.log('\nTo fix this:');
    console.log('1. Check server.js is serving files with correct Content-Type');
    console.log('2. Verify vercel.json has proper headers configuration');
    console.log('3. For Vercel issues: Clear cache and redeploy');
    console.log('\n');
  }

  process.exit(failed > 0 ? 1 : 0);
}

// Run tests
runTests().catch(console.error);
