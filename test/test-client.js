#!/usr/bin/env node

/**
 * Test client for e-Stat MCP Server
 * Usage: node test/test-client.js [test-name]
 * 
 * Available tests:
 * - list-tools: List all available tools
 * - search-tables: Search statistics tables
 * - get-metadata: Get table metadata
 * - get-data: Get statistical data
 * - ref-dataset: Reference dataset conditions
 * - data-catalog: Get data catalog
 */

import { spawn } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// MCP server path
const serverPath = join(__dirname, '..', 'dist', 'index.js');

// Test configurations
const tests = {
  'list-tools': {
    name: 'List Tools',
    request: {
      jsonrpc: '2.0',
      id: 1,
      method: 'tools/list',
      params: {}
    }
  },
  'search-tables': {
    name: 'Search Statistics Tables',
    request: {
      jsonrpc: '2.0',
      id: 2,
      method: 'tools/call',
      params: {
        name: 'search_e_stat_tables',
        arguments: {
          search_word: '人口',
          limit: 5,
          searchKind: '1'
        }
      }
    }
  },
  'get-metadata': {
    name: 'Get Table Metadata',
    request: {
      jsonrpc: '2.0',
      id: 3,
      method: 'tools/call',
      params: {
        name: 'get_e_stat_meta_info',
        arguments: {
          stats_data_id: '0003448697',
          explanationGetFlg: 'Y'
        }
      }
    }
  },
  'get-data': {
    name: 'Get Statistical Data',
    request: {
      jsonrpc: '2.0',
      id: 4,
      method: 'tools/call',
      params: {
        name: 'get_specific_e_stat_data',
        arguments: {
          stats_data_id: '0003448697',
          limit: 10
        }
      }
    }
  },
  'ref-dataset': {
    name: 'Reference Dataset',
    request: {
      jsonrpc: '2.0',
      id: 5,
      method: 'tools/call',
      params: {
        name: 'get_e_stat_ref_dataset',
        arguments: {
          data_set_id: 'T000002'
        }
      }
    }
  },
  'data-catalog': {
    name: 'Data Catalog',
    request: {
      jsonrpc: '2.0',
      id: 6,
      method: 'tools/call',
      params: {
        name: 'get_e_stat_data_catalog',
        arguments: {
          search_word: '国勢調査',
          limit: 5
        }
      }
    }
  }
};

async function runTest(testName) {
  const test = tests[testName];
  if (!test) {
    console.error(`Unknown test: ${testName}`);
    console.log('Available tests:', Object.keys(tests).join(', '));
    process.exit(1);
  }

  console.log(`🧪 Running test: ${test.name}`);
  console.log('📤 Request:', JSON.stringify(test.request, null, 2));
  console.log('⏳ Waiting for response...\n');

  return new Promise((resolve, reject) => {
    const server = spawn('node', [serverPath], {
      stdio: ['pipe', 'pipe', 'pipe'],
      env: { ...process.env }
    });

    let stdout = '';
    let stderr = '';

    server.stdout.on('data', (data) => {
      stdout += data.toString();
    });

    server.stderr.on('data', (data) => {
      stderr += data.toString();
    });

    server.on('close', (code) => {
      if (code === 0) {
        console.log('📥 Response:');
        console.log(stdout);
        resolve(stdout);
      } else {
        console.error('❌ Test failed with code:', code);
        if (stderr) {
          console.error('Error output:', stderr);
        }
        reject(new Error(`Test failed with code ${code}`));
      }
    });

    server.on('error', (error) => {
      console.error('❌ Failed to start server:', error);
      reject(error);
    });

    // Send the test request
    const requestJson = JSON.stringify(test.request) + '\n';
    server.stdin.write(requestJson);
    server.stdin.end();

    // Set timeout
    setTimeout(() => {
      server.kill();
      reject(new Error('Test timeout'));
    }, 30000);
  });
}

async function runAllTests() {
  console.log('🚀 Running all tests...\n');
  
  for (const [testName, test] of Object.entries(tests)) {
    try {
      await runTest(testName);
      console.log(`✅ ${test.name} - PASSED\n`);
    } catch (error) {
      console.log(`❌ ${test.name} - FAILED: ${error.message}\n`);
    }
  }
}

// Main execution
const testName = process.argv[2];

if (!testName) {
  console.log('Available tests:');
  Object.entries(tests).forEach(([key, test]) => {
    console.log(`  ${key}: ${test.name}`);
  });
  console.log('\nUsage:');
  console.log('  node test/test-client.js [test-name]');
  console.log('  node test/test-client.js all');
  process.exit(0);
}

if (testName === 'all') {
  runAllTests().catch(console.error);
} else {
  runTest(testName).catch(console.error);
}