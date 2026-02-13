// gen-ops-remote.js
// Usage: node gen-ops-remote.js https://example.com/graphql ./src/graphql/generated-ops.graphql
// Installs required: npm i node-fetch graphql

const fs = require('fs');
const fetch = require('node-fetch');
const {
  buildClientSchema,
  getIntrospectionQuery,
  isScalarType,
  isObjectType,
  print,
  parse,
  GraphQLSchema,
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
  return type.ofType ? unwrapType(type.ofType) : type;
}

function collectScalarSelections(type, schema) {
  const named = unwrapType(type);
  if (!isObjectType(named)) return [];
  const fields = named.getFields();
  const scalarNames = [];
  Object.values(fields).forEach(f => {
    const fieldType = unwrapType(f.type);
    if (isScalarType(fieldType) || fieldType.name === 'ID') {
      scalarNames.push(f.name);
    }
  });
  return scalarNames;
}

function collectNestedObjectSelections(type, schema) {
  const named = unwrapType(type);
  if (!isObjectType(named)) return {};
  const fields = named.getFields();
  const nested = {};
  Object.values(fields).forEach(f => {
    const oneLevel = unwrapType(f.type);
    if (isObjectType(oneLevel)) {
      // collect scalar children of this nested object
      const nestedScalars = Object.values(oneLevel.getFields())
        .map(nf => unwrapType(nf.type))
        .filter(nt => isScalarType(nt) || nt.name === 'ID')
        .map((_, idx) => {
          // we'll get names properly below
          return null;
        });
      // Actually get names:
      const names = Object.values(oneLevel.getFields())
        .filter(nf => {
          const nt = unwrapType(nf.type);
          return isScalarType(nt) || nt.name === 'ID';
        })
        .map(nf => nf.name);
      if (names.length) nested[f.name] = names;
    }
  });
  return nested;
}

function buildSelectionBlock(field, schema) {
  const fieldType = field.type;
  const scalars = collectScalarSelections(fieldType, schema);
  const nested = collectNestedObjectSelections(fieldType, schema);

  const lines = [];
  if (scalars.length) lines.push(...scalars);
  // include one-level nested objects (each with their scalar children)
  Object.entries(nested).forEach(([k, v]) => {
    lines.push(`${k} {`);
    v.forEach(n => lines.push(`  ${n}`));
    lines.push(`}`);
  });

  // if nothing selectable, request __typename
  if (lines.length === 0) lines.push('__typename');
  return lines.map(l => `    ${l}`).join('\n');
}

async function main() {
  try {
    const schema = await fetchSchema(ENDPOINT);
    const queryType = schema.getQueryType();
    if (!queryType) throw new Error('Schema has no Query type.');

    const ops = [];
    Object.values(queryType.getFields()).forEach(field => {
      // Build a name-safe operation name (pascal-case)
      const opName = field.name.replace(/[^a-zA-Z0-9]/g, '_');
      const selection = buildSelectionBlock(field, schema);
      // include basic args in operation signature (all args as variables with scalar types)
      const args = field.args || [];
      const varDefs = args
        .map(a => {
          const t = (() => {
            let ty = a.type;
            // print type as string (rough)
            const getTypeStr = (tt) => {
              if (tt.kind && tt.name) return tt.name;
              if (tt.ofType) {
                const inner = getTypeStr(tt.ofType);
                return tt.kind === 'NON_NULL' ? `${inner}!` : inner;
              }
              return String(tt);
            };
            // fallback simple handling using GraphQL type instances:
            const unwrap = (x) => {
              if (x.kind) return getTypeStr(x);
              // for built schema types, walk .toString if available
              try { return String(a.type); } catch { return 'String'; }
            };
            return unwrap();
          })();
          // fall back to generic scalar type String if unknown
          const typeStr = t || 'String';
          return `$${a.name}: ${typeStr}`;
        })
        .filter(Boolean)
        .join(', ');

      const argsUsage = args.length ? '(' + args.map(a => `${a.name}: $${a.name}`).join(', ') + ')' : '';

      const op = `query ${opName}${varDefs ? `(${varDefs})` : ''} {\n  ${field.name}${argsUsage} {\n${selection}\n  }\n}\n`;
      ops.push(op);
    });

    fs.mkdirSync(require('path').dirname(OUT_FILE), { recursive: true });
    fs.writeFileSync(OUT_FILE, ops.join('\n'));
    console.log(`Generated ${ops.length} operations -> ${OUT_FILE}`);
  } catch (err) {
    console.error('Error:', err.message || err);
    process.exit(1);
  }
}

main();
