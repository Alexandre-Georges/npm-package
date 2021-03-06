const nodeGetopt = require('node-getopt');

const retrieveLatestVersion = require('./npm-registry/retrieve-latest-version');
const retrieveVersionForDate = require('./npm-registry/retrieve-version-for-date');
const retrieveInfos = require('./npm-registry/retrieve-infos');

const stringifyTree = require('./format/stringify-tree');
const jsonifyTree = require('./format/jsonify-tree');

const getopt = new nodeGetopt([
  ['v', 'version=ARG', 'Version of the package'],
  ['d' , 'date=ARG', 'Date of the version'],
  ['o' , 'output=ARG', 'Output (default is human readable text, "json" for Json)'],
  ['', 'dev', 'Developement dependencies'],
  ['h' , 'help'],
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

  const isDev = opt.options.dev === true;

  const root = await retrieveInfos.execute(packageName, version, isDev);
  const outputFunction = opt.options.output === 'json' ? jsonifyTree : stringifyTree;

  console.log(outputFunction.execute(root));
})();
