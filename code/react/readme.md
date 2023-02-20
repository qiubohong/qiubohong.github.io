# 如何手动创建一个react项目

## 创建文件夹
```sh
mkdir webpack-react
cd webpack-react
npm init --y
git init

```

## 添加依赖

1. 添加React核心库
```shell
yarn add react react-dom
yarn add @types/react @types/react-dom
```

2. TypeScript 类型模块
```shell
yarn add typescript -D
```

3. 初始化Typescript配置

```shell
yarn tsc --init
```
修改配置内容如下：
```json
{
  "compilerOptions": {
    /* 访问 https://aka.ms/tsconfig 获取更多配置解释信息*/

    /* 项目相关 */
    // "incremental": true,                              /* 保存.tsbuildinfo文件以允许增量编译项目 */
    // "composite": true,                                /* 启用允许TypeScript项目与项目引用一起使用的约束 */
    // "tsBuildInfoFile": "./.tsbuildinfo",              /* 指定.tsbuildinfo增量编译文件的路径. */
    // "disableSourceOfProjectReferenceRedirect": true,  /* 在引用复合项目时禁用首选源文件而不是声明文件. */
    // "disableSolutionSearching": true,                 /* 编辑时选择不进行多项目参考检查的项目. */
    // "disableReferencedProjectLoad": true,             /* 减少TypeScript自动加载的项目数 */

    /* 语言和编译环境 */
    "target": "es2016",                                  /* 最后转义成哪个版本的JS语言规范 */
    "lib": ["DOM", "es2016"],                            /* 程序运行环境所需要的库，比如在浏览器执行需要DOM API去编译，这里包含：DOM、ES2015、ES2016和Worker等 */
    "jsx": "react-jsx",                                  /* 决定tsx文件以那种方式进行编译，有：react,react-jsx,react-native,preserve  */
    "experimentalDecorators": true,                      /* 允许装饰符使用，如：@xxxx() */
    "emitDecoratorMetadata": true,                       /* 允许装饰符中metadata元数据使用 */
    // "jsxFactory": "",                                 /* 使用何种方式去编译jsx语法，如：h 或 React.createElement， 或者preact.h等 */
    // "jsxFragmentFactory": "",                         /* 使用何种方式去编译jsx Fragment语法 如： 'React.Fragment' or 'Fragment'. */
    // "jsxImportSource": "",                            /* 使用何种方式编译import语法 */
    // "reactNamespace": "",                             /* 与jsxFactory一样 */
    // "noLib": true,                                    /* 禁止包含任何全局库 */
    // "useDefineForClassFields": true,                  /* 支持class. */
    // "moduleDetection": "auto",                        /* 控制所有ts文件要转换成js模块，可选择有：auto、legacy、force */

    /* 模块化相关配置 */
    "module": "ESNext",                                  /* 编译成哪种模块化规范，如：CommonJS、ESNext、UMD、ES2015/ES6等 */
    "rootDir": "./src",                                  /* 编译哪个文件夹下的代码 */
    "moduleResolution": "node",                          /* 指定模块解析策略. */
    "baseUrl": "./",                                     /* 项目根目录 */
    "paths": {                                           /* 路径映射配置 */
        "@/*": ["src/*"]
    },                                     
    // "rootDirs": [],                                   /* Allow multiple folders to be treated as one when resolving modules. */
    // "typeRoots": [],                                  /* Specify multiple folders that act like './node_modules/@types'. */
    // "types": [],                                      /* Specify type package names to be included without being referenced in a source file. */
    // "allowUmdGlobalAccess": true,                     /* Allow accessing UMD globals from modules. */
    // "moduleSuffixes": [],                             /* List of file name suffixes to search when resolving a module. */
    "resolveJsonModule": true,                           /* 支持json直接引入 */
    // "noResolve": true,                                /* Disallow 'import's, 'require's or '<reference>'s from expanding the number of files TypeScript should add to a project. */

    /* JavaScript 支持 */
    "allowJs": true,                                     /* 允许在项目中导入JavaScript文件 */
    "checkJs": true,                                     /* 与allowJs协同工作。如果启用了CheckJs，则会在JavaScript文件中报告错误。 */
    // "maxNodeModuleJsDepth": 1,                        /* Specify the maximum folder depth used for checking JavaScript files from 'node_modules'. Only applicable with 'allowJs'. */

    /* 编译相关 */
    // "declaration": true,                              /* Generate .d.ts files from TypeScript and JavaScript files in your project. */
    // "declarationMap": true,                           /* Create sourcemaps for d.ts files. */
    // "emitDeclarationOnly": true,                      /* Only output d.ts files and not JavaScript files. */
    // "sourceMap": true,                                /* Create source map files for emitted JavaScript files. */
    // "outFile": "./",                                  /* Specify a file that bundles all outputs into one JavaScript file. If 'declaration' is true, also designates a file that bundles all .d.ts output. */
    "outDir": "./dist",                                  /* 编译后输出的文件夹 */
    "removeComments": true,                              /* 禁止编译注释 */
    // "noEmit": true,                                   /* Disable emitting files from a compilation. */
    // "importHelpers": true,                            /* Allow importing helper functions from tslib once per project, instead of including them per-file. */
    // "importsNotUsedAsValues": "remove",               /* Specify emit/checking behavior for imports that are only used for types. */
    // "downlevelIteration": true,                       /* Emit more compliant, but verbose and less performant JavaScript for iteration. */
    // "sourceRoot": "",                                 /* Specify the root path for debuggers to find the reference source code. */
    // "mapRoot": "",                                    /* Specify the location where debugger should locate map files instead of generated locations. */
    // "inlineSourceMap": true,                          /* Include sourcemap files inside the emitted JavaScript. */
    // "inlineSources": true,                            /* Include source code in the sourcemaps inside the emitted JavaScript. */
    // "emitBOM": true,                                  /* Emit a UTF-8 Byte Order Mark (BOM) in the beginning of output files. */
    // "newLine": "crlf",                                /* Set the newline character for emitting files. */
    // "stripInternal": true,                            /* Disable emitting declarations that have '@internal' in their JSDoc comments. */
    // "noEmitHelpers": true,                            /* Disable generating custom helper functions like '__extends' in compiled output. */
    // "noEmitOnError": true,                            /* Disable emitting files if any type checking errors are reported. */
    // "preserveConstEnums": true,                       /* Disable erasing 'const enum' declarations in generated code. */
    // "declarationDir": "./",                           /* Specify the output directory for generated declaration files. */
    // "preserveValueImports": true,                     /* Preserve unused imported values in the JavaScript output that would otherwise be removed. */

    /* 约束 */
    "isolatedModules": true,                             /* 规定每个js文件都必须模块化 */
    "allowSyntheticDefaultImports": true,                /* 支持直接将整个对象从模块文件里引入 */
    "esModuleInterop": true,                             /* 兼容ES Module CommonJS  UMD规范 */
    // "preserveSymlinks": true,                         /* Disable resolving symlinks to their realpath. This correlates to the same flag in node. */
    "forceConsistentCasingInFileNames": true,            /* 在import文件的时候是否强制区分大小写 */

    /* Type Checking */
    "strict": true,                                      /* Enable all strict type-checking options. */
    // "noImplicitAny": true,                            /* Enable error reporting for expressions and declarations with an implied 'any' type. */
    // "strictNullChecks": true,                         /* When type checking, take into account 'null' and 'undefined'. */
    // "strictFunctionTypes": true,                      /* When assigning functions, check to ensure parameters and the return values are subtype-compatible. */
    // "strictBindCallApply": true,                      /* Check that the arguments for 'bind', 'call', and 'apply' methods match the original function. */
    // "strictPropertyInitialization": true,             /* Check for class properties that are declared but not set in the constructor. */
    // "noImplicitThis": true,                           /* Enable error reporting when 'this' is given the type 'any'. */
    // "useUnknownInCatchVariables": true,               /* Default catch clause variables as 'unknown' instead of 'any'. */
    // "alwaysStrict": true,                             /* Ensure 'use strict' is always emitted. */
    // "noUnusedLocals": true,                           /* Enable error reporting when local variables aren't read. */
    // "noUnusedParameters": true,                       /* Raise an error when a function parameter isn't read. */
    // "exactOptionalPropertyTypes": true,               /* Interpret optional property types as written, rather than adding 'undefined'. */
    // "noImplicitReturns": true,                        /* Enable error reporting for codepaths that do not explicitly return in a function. */
    // "noFallthroughCasesInSwitch": true,               /* Enable error reporting for fallthrough cases in switch statements. */
    // "noUncheckedIndexedAccess": true,                 /* Add 'undefined' to a type when accessed using an index. */
    // "noImplicitOverride": true,                       /* Ensure overriding members in derived classes are marked with an override modifier. */
    // "noPropertyAccessFromIndexSignature": true,       /* Enforces using indexed accessors for keys declared using an indexed type. */
    // "allowUnusedLabels": true,                        /* Disable error reporting for unused labels. */
    // "allowUnreachableCode": true,                     /* Disable error reporting for unreachable code. */

    /* Completeness */
    // "skipDefaultLibCheck": true,                      /* Skip type checking .d.ts files that are included with TypeScript. */
    "skipLibCheck": true                                 /* 跳过声明文件的类型检查。 */
  },
  "include": ["src/"]                                    /* 包含哪些目录 */
}
```


4. 安装webpack构建工具
```shell
yarn add webpack webpack-cli webpack-dev-server webpack-merge -D
```
新增cross-env，该模块主要是用于支持在不同的操作系统下保证环境变量正确
```shell
yarn add cross-env -D
```

接下来是各个配置文件的内容：
```
scripts:
---  common.js  /* 公共构建脚本文件 */
---  dev.js     /* 本地开发模式 */
---  prod.js    /* 发布模式 */
```
分别内容如下：(忽略，直接看看js文件)

- [common.js](./my-app/scripts/common.js)
- [dev.js](./my-app/scripts/dev.js)
- [prod.js](./my-app/scripts/prod.js)

5. 添加一些webpack loader

typescript相关loader
```
# 支持 ts 和 tsx 文件的处理
yarn add ts-loader -D
# 美化终端输出，安装特定版本是为了处理模块化包的问题
yarn add chalk@4.1.2 -D
# 将 /public/index.html 作为模板入口文件打包
yarn add html-webpack-plugin -D
# 美化 webpack 编译时候的进度条
yarn add progress-bar-webpack-plugin -D
```

css相关loader
```
# style-loader 将 css 注入到 HTML 的内联样式
# css-loader 用于加载 CSS 文件，转化 CSS 为 CommonJS
yarn add style-loader css-loader -D
# postcss 用于处理 CSS 兼容性
# autoprefixer 用于自动根据兼容需求增加 CSS 属性的前缀
yarn add postcss postcss-loader autoprefixer -D
# sass 主要是用于支持 “CSS 编程”
# sass-loader 会将 .scss 后缀文件编译成 CSS
yarn add sass sass-loader -D
```

生产模式下压缩相关插件
```shell
# 用于将 CSS 导出到单独文件
yarn add mini-css-extract-plugin -D
# 用于做源代码压缩
yarn add terser-webpack-plugin -D
```

6. CSS 自动前缀处理兼容性，因此可以将需要兼容浏览器版本的配置放到 package.json -> browserslist 属性

```json
// package.json
{
...
  "browserslist": {
    "production": [
      ">0.2%",
      "not dead",
      "not op_mini all"
    ],
    "development": [
      "defaults",
      "not ie < 11",
      "last 2 versions",
      "> 1%",
      "iOS 9",
      "last 3 iOS versions"
    ]
  }
...
}
```

7. Bable 处理兼容性
按照webpack babel loader
```
# 安装 babel 核心和加载器
yarn add @babel/core babel-loader -D
# core-js 中有各种各样的 pollyfill，用于提升兼容性
# https://github.com/zloirock/core-js
yarn add core-js -D
# 预制环境
yarn add @babel/preset-env @babel/preset-react -D
# 统一的 pollyfill，打包时候加载到代码中，减少冗余代码
yarn add @babel/plugin-transform-runtime -D
```
新增webpack配置
```js
...
rules: [
  {
    test: /\.tsx?$/,
    use: [
      {
        loader: "babel-loader",
        options: {
          presets: [
            [
              "@babel/preset-env", // 预制配置
              {
                corejs: {
                  version: 3,
                },
                useBuiltIns: "usage", // 按需引入 pollyfill
              },
            ],
            "@babel/preset-react", // React 环境
          ],
          plugins: ["@babel/plugin-transform-runtime"],
        },
      },
      "ts-loader",
    ],
    exclude: /node_modules/,
  },
  ...
 ],
 ...
```

8. 安装React-router路由

```shell
yarn add react-router-dom
```

新增路由配置文件[./my-app/src/router/index.tsx](./my-app/src/router/index.tsx)。

9. 测试脚本支持

安装依赖
```
# 语法编译
yarn add --dev jest babel-jest @babel/preset-env @babel/preset-react react-test-renderer
# dom渲染
yarn add @testing-library/react @testing-library/jest-dom -D
```

相关文档
[webpack中jest指引](https://jestjs.io/zh-Hans/docs/webpack)

10. 安装Redux状态管理

