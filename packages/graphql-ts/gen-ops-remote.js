// gen-ops-remote.js
// Usage: node gen-ops-remote.js https://example.com/graphql ./src/graphql/generated-ops.graphql
// Install: npm install node-fetch graphql
const fs = require('fs');
const fetch = require('node-fetch');
const path = require('path');
const {
  buildClientSchema,
  getIntrospectionQuery,
  isScalarType,
  isObjectType,
  isNonNullType,
  isListType,
  getNamedType,
} = require('graphql');

if (process.argv.length < 4) {
  console.error('Usage: node gen-ops-remote.js <GRAPHQL_ENDPOINT> <OUT_FILE>');
  process.exit(2);
}

const ENDPOINT = process.argv[2];
const OUT_FILE = process.argv[3];

async function fetchSchema(endpoint) {
  const res = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query: getIntrospectionQuery() }),
  });
  if (!res.ok) throw new Error(`HTTP ${res.status} ${res.statusText}`);
  const payload = await res.json();
  if (payload.errors) throw new Error('Introspection errors: ' + JSON.stringify(payload.errors));
  return buildClientSchema(payload.data);
}

function unwrapType(type) {
  return getNamedType(type);
}

function isScalarOrID(type) {
  return isScalarType(type) || (type && type.name === 'ID');
}

function collectScalarSelections(type) {
  const named = unwrapType(type);
  if (!isObjectType(named)) return [];
  const fields = named.getFields();
  return Object.values(fields)
    .filter(f => {
      const nt = unwrapType(f.type);
      return isScalarOrID(nt);
    })
    .map(f => f.name);
}

function collectNestedObjectSelections(type) {
  const named = unwrapType(type);
  if (!isObjectType(named)) return {};
  const fields = named.getFields();
  const nested = {};
  Object.values(fields).forEach(f => {
    const oneLevel = unwrapType(f.type);
    if (isObjectType(oneLevel)) {
      const names = Object.values(oneLevel.getFields())
        .filter(nf => isScalarOrID(unwrapType(nf.type)))
        .map(nf => nf.name);
      if (names.length) nested[f.name] = names;
    }
  });
  return nested;
}

function buildSelectionBlock(field) {
  const scalars = collectScalarSelections(field.type);
  const nested = collectNestedObjectSelections(field.type);

  const lines = [];
  if (scalars.length) lines.push(...scalars);
  Object.entries(nested).forEach(([k, v]) => {
    lines.push(`${k} {`);
    v.forEach(n => lines.push(`  ${n}`));
    lines.push(`}`);
  });

  if (lines.length === 0) lines.push('__typename');
  return lines.map(l => `    ${l}`).join('\n');
}

function typeToString(type) {
  if (isNonNullType(type)) return `${typeToString(type.ofType)}!`;
  if (isListType(type)) return `[${typeToString(type.ofType)}]`;
  const named = getNamedType(type);
  return named.name;
}

async function main() {
  try {
    const schema = await fetchSchema(ENDPOINT);
    const queryType = schema.getQueryType();
    if (!queryType) throw new Error('Schema has no Query type.');

    const ops = [];
    Object.values(queryType.getFields()).forEach(field => {
      const opName = field.name.replace(/[^a-zA-Z0-9]/g, '_');
      const selection = buildSelectionBlock(field);

      const args = field.args || [];
      const varDefs = args.map(a => `$${a.name}: ${typeToString(a.type)}`).join(', ');
      const argsUsage = args.length ? '(' + args.map(a => `${a.name}: $${a.name}`).join(', ') + ')' : '';

      const op = `query ${opName}${varDefs ? `(${varDefs})` : ''} {\n  ${field.name}${argsUsage} {\n${selection}\n  }\n}\n`;
      ops.push(op);
    });

    fs.mkdirSync(path.dirname(OUT_FILE), { recursive: true });
    fs.writeFileSync(OUT_FILE, ops.join('\n'));
    console.log(`Generated ${ops.length} operations -> ${OUT_FILE}`);
  } catch (err) {
    console.error('Error:', err.message || err);
    process.exit(1);
  }
}

main();
