const nodeGetopt = require('node-getopt');

const retrieveLatestVersion = require('./npm-registry/retrieve-latest-version');
const retrieveVersionForDate = require('./npm-registry/retrieve-version-for-date');
const buildTree = require('./tree/build-tree');
const stringifyTree = require('./tree/stringify-tree');
const jsonifyTree = require('./tree/jsonify-tree');

const getopt = new nodeGetopt([
  ['v', 'version=ARG', 'Version of the package'],
  ['d' , 'date=ARG', 'Date of the version'],
  ['o' , 'output=ARG', 'Output (default is human readable text, "json" for Json)'],
  ['h' , 'help']
]).bindHelp();

const opt = getopt.parse(process.argv.slice(2));

if (opt.argv.length === 0) {
  console.log('The package name is missing');
  return;
}

if (opt.options.version !== undefined && opt.options.date !== undefined) {
  console.log('Incompatible options: a date or a version can be specified not both');
  return;
}

(async () => {
  const packageName = opt.argv[0];
  let version = null;
  if (opt.options.version) {
    version = opt.options.version;
  } else if (opt.options.date) {
    version = await retrieveVersionForDate.execute(packageName, opt.options.date);
  } else {
    version = await retrieveLatestVersion.execute(packageName);
  }

  const root = await buildTree.execute(packageName, version);

  const outputFunction = opt.options.output === 'json' ? jsonifyTree : stringifyTree;

  //console.log(JSON.stringify(root));

  console.log(outputFunction.execute(root));
})();
