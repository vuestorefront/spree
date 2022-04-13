import { NuxtRouteConfig } from '@nuxt/types/config/router';

/**
 * @param excludeSelf - If true, a given node (and all its descendants) are removed from the tree.
 * @example
 * // Nodes A, B, C, D, Z will be removed from the tree
 * // A: {
 * //   excludeSelf: true,
 * //   children: {
 * //     B: { excludeSelf: ..., children: ... },
 * //     C: { excludeSelf: ..., children: ... },
 * //     D: { excludeSelf: ..., children: ... }
 * //   }
 * // },
 * // X: {
 * //   excludeSelf: false,
 * //   children: {
 * //     Y: {
 * //       excludeSelf: false,
 * //       children: {
 * //         Z: {
 * //           excludeSelf: true,
 * //           children: null
 * //         }
 * //       }
 * //     }
 * //   }
 * // }
 * @param children - A node descendants with unique paths as object keys.
 * @example
 * // A: {
 * //   excludeSelf: false,
 * //   children: {
 * //     B: {
 * //      excludeSelf: false,
 * //      children: {
 * //        C: {
 * //          excludeSelf: true,
 * //          children: null
 * //        }
 * //     },
 * //     D: { excludeSelf: true, children: null },
 * //     F: { excludeSelf: true, children: null }
 * //   }
 * // }
 */
interface TreeNode {
  excludeSelf: boolean;
  children: { [path: string]: TreeNode } | null;
}

type Paths = string[];

/**
 * Builds a tree of paths based on pathsToExlude
 * @example
 * // pathsToExclude = [ 'a/b/c', 'a/b/d/e', 'x' ]
 * // buildPathsTree returns:
 * // '/a': {
 * //   excludeSelf: false,
 * //   children: {
 * //     b: {
 * //       excludeSelf: false,
 * //       children: {
 * //         c: {
 * //           excludeSelf: true,
 * //           children: null
 * //         },
 * //         d: {
 * //           excludeSelf: false,
 * //           children: {
 * //             e: {
 * //               excludeSelf: true,
 * //               children: null
 * //             }
 * //           }
 * //         }
 * //       }
 * //     }
 * //   }
 * // },
 * // '/x': {
 * //   excludeSelf: true,
 * //   children: null
 * // }
 */
const buildPathsTree = (pathsToExclude: Paths) => {
  const buildBranch = (
    root: { [key: string]: TreeNode },
    pathArray,
    depth = 0
  ) => {
    const isLeaf = depth === pathArray.length - 1;
    const path = pathArray[depth];
    // Nuxt router sets root path with '/' as a prefix.
    const key = depth === 0 ? `/${path}` : path;
    if (!root[key]) {
      root[key] = {
        excludeSelf: isLeaf,
        children: isLeaf ? null : {}
      } as TreeNode;
    }
    if (root[key].excludeSelf) return;
    buildBranch(root[key].children, pathArray, depth + 1);
  };
  return pathsToExclude
    .map((path) => path.split('/'))
    .reduce((tree, paths) => {
      buildBranch(tree, paths);
      return tree;
    }, {});
};

/**
 * Excludes paths recursively. Advances node level if given route in routes has any children.
 * Checks if given route in routes should be deleted before advancing the node level
 * (so that it won't call a deeper recursion).
 */
const excludeRecursively = (routes: NuxtRouteConfig[], node) => {
  return routes?.reduce((arr, route) => {
    const routeNode = node[route.path];
    if (!routeNode) return [...arr, route];
    if (routeNode.excludeSelf) return arr;
    const children = excludeRecursively(route.children, routeNode.children);
    if (!children) return [...arr, route];
    const updatedRoute = {...route, children };
    if (!children.length) delete updatedRoute.children;
    return [...arr, updatedRoute];
  }, []);
};

/**
 * Excludes paths from given Nuxt routes array based on absolute paths specified in the pathsToExclude.
 *
 * Uses recursion to delete nested paths from the routes array.
 * Traverses over a created tree of paths based on the given pathsToExclude array,
 * to verify which paths on a given tree level are to be deleted.
 *
 * @param routes - A routes returned by the extendRoutes Nuxt function
 * @param pathsToExclude - Absolute paths that will be removed from the routes array.
 *
 * @returns routes array with excluded paths specified in the pathsToExclude array.
 */
export const excludeRoutes = (
  routes: NuxtRouteConfig[],
  pathsToExclude: Paths
): NuxtRouteConfig[] => {
  const excludeTree = buildPathsTree(pathsToExclude);
  return excludeRecursively(routes, excludeTree);
};
