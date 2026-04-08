const fs = require('fs');
const path = require('path');

const rootDir = process.cwd();
const envProdPath = path.join(rootDir, 'src', 'environments', 'environment.prod.ts');
const capConfigPath = path.join(rootDir, 'capacitor.config.ts');

function fail(message) {
  console.error(`ERROR: ${message}`);
  process.exitCode = 1;
}

function ok(message) {
  console.log(`OK: ${message}`);
}

function hasAllStrings(content, required, sourceName) {
  const missing = required.filter(item => !content.includes(item));
  if (missing.length > 0) {
    fail(`${sourceName} sem campos esperados: ${missing.join(', ')}`);
    return false;
  }
  ok(`${sourceName} com campos obrigatorios presentes`);
  return true;
}

function checkNodeVersion() {
  const version = process.versions.node;
  const major = Number(version.split('.')[0]);

  if (major < 20) {
    fail(`Node ${version} detectado. O projeto exige Node >= 20.`);
    return false;
  }

  ok(`Node ${version} compativel com Capacitor CLI`);
  return true;
}

function checkFile(filePath, fileLabel) {
  if (!fs.existsSync(filePath)) {
    fail(`${fileLabel} nao encontrado em ${filePath}`);
    return null;
  }

  ok(`${fileLabel} encontrado`);
  return fs.readFileSync(filePath, 'utf8');
}

function main() {
  console.log('Iniciando checagem de preparo iOS...');

  checkNodeVersion();

  const envProd = checkFile(envProdPath, 'environment.prod.ts');
  const capConfig = checkFile(capConfigPath, 'capacitor.config.ts');

  if (envProd) {
    hasAllStrings(
      envProd,
      ['sieconwebsuprimentos', 'sieconwebwebapi', 'apiUrl'],
      'environment.prod.ts'
    );
  }

  if (capConfig) {
    hasAllStrings(
      capConfig,
      ['iosScheme', 'allowNavigation'],
      'capacitor.config.ts'
    );
  }

  console.log('Passos no Mac para teste iOS:');
  console.log('1) npm ci');
  console.log('2) npm run ios:ready');
  console.log('3) npm run ios:add');
  console.log('4) npm run ios:sync');
  console.log('5) npm run ios:open');

  if (process.exitCode && process.exitCode !== 0) {
    console.error('Checagem finalizada com pendencias.');
  } else {
    console.log('Checagem finalizada com sucesso.');
  }
}

main();
