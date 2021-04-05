// adapted from https://github.com/nrwl/nx-react-native/blob/main/packages/react-native/plugins/metro-resolver.ts
const { appRootPath } = require('@nrwl/workspace/src/utils/app-root');
const { getDefaultConfig } = require('@expo/metro-config');
const metroResolver = require('metro-resolver');
const { createMatchPath, loadConfig } = require('tsconfig-paths');
const chalk = require('chalk');

/*
 * Use tsconfig to resolve additional workspace libs.
 *
 * This resolve function requires projectRoot to be set to
 * workspace root in order modules and assets to be registered and watched.
 */
function resolveRequest(_context, realModuleName, platform, moduleName) {
  // const DEBUG = process.env.NX_REACT_NATIVE_DEBUG === 'true';
  const DEBUG = false;

  if (DEBUG) console.log(chalk.cyan(`[Nx] Resolving: ${moduleName}`));

  const { resolveRequest, ...context } = _context;
  try {
    return metroResolver.resolve(context, moduleName, platform);
  } catch {
    if (DEBUG)
      console.log(
        chalk.cyan(
          `[Nx] Unable to resolve with default Metro resolver: ${moduleName}`
        )
      );
  }
  const matcher = getMatcher();
  const match = matcher(realModuleName);
  if (match) {
    return {
      type: 'sourceFile',
      filePath: match,
    };
  } else {
    if (DEBUG) {
      console.log(
        chalk.red(`[Nx] Failed to resolve ${chalk.bold(moduleName)}`)
      );
      console.log(
        chalk.cyan(
          `[Nx] The following tsconfig paths was used:\n:${chalk.bold(
            JSON.stringify(paths, null, 2)
          )}`
        )
      );
    }
    throw new Error(`Cannot resolve ${chalk.bold(moduleName)}`);
  }
}

let matcher;
let absoluteBaseUrl;
let paths;

function getMatcher() {
  try {
    // const DEBUG = process.env.NX_REACT_NATIVE_DEBUG === 'true';
    const DEBUG = true;
    if (!matcher) {
      const result = loadConfig(__dirname);
      if (result.resultType === 'success') {
        absoluteBaseUrl = result.absoluteBaseUrl;
        paths = result.paths;
        if (DEBUG) {
          console.log(
            chalk.cyan(
              `[Nx] Located tsconfig at ${chalk.bold(absoluteBaseUrl)}`
            )
          );
          console.log(
            chalk.cyan(
              `[Nx] Found the following paths:\n:${chalk.bold(
                JSON.stringify(paths, null, 2)
              )}`
            )
          );
        }
        matcher = createMatchPath(absoluteBaseUrl, paths);
      } else {
        console.log(chalk.cyan(`[Nx] Failed to locate tsconfig}`), result);
        throw new Error(`Could not load tsconfig for project`);
      }
    }
    return matcher;
  } catch (e) {
    console.error(chalk.red(e));
  }
}

const config = getDefaultConfig(__dirname);
const resolver = config.resolver || {};

// Set the root to workspace root so we can resolve modules and assets
config.projectRoot = appRootPath;

// Add support for paths specified by tsconfig
config.resolver = {
  ...resolver,
  resolveRequest,
};

module.exports = config;
