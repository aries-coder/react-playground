export function convertTsconfigToMonaco(
  monaco: any,
  raw: string
) {
  const enumMaps: Record<
    string,
    Record<string, any>
  > = {
    target: {
      es3: monaco.languages.typescript
        .ScriptTarget.ES3,
      es5: monaco.languages.typescript
        .ScriptTarget.ES5,
      es6: monaco.languages.typescript
        .ScriptTarget.ES2015,
      es2015:
        monaco.languages.typescript.ScriptTarget
          .ES2015,
      es2016:
        monaco.languages.typescript.ScriptTarget
          .ES2016,
      es2017:
        monaco.languages.typescript.ScriptTarget
          .ES2017,
      es2018:
        monaco.languages.typescript.ScriptTarget
          .ES2018,
      es2019:
        monaco.languages.typescript.ScriptTarget
          .ES2019,
      es2020:
        monaco.languages.typescript.ScriptTarget
          .ES2020,
      es2021:
        monaco.languages.typescript.ScriptTarget
          .ES2021,
      es2022:
        monaco.languages.typescript.ScriptTarget
          .ES2022,
      esnext:
        monaco.languages.typescript.ScriptTarget
          .ESNext,
      latest:
        monaco.languages.typescript.ScriptTarget
          .Latest
    },
    module: {
      none: monaco.languages.typescript.ModuleKind
        .None,
      commonjs:
        monaco.languages.typescript.ModuleKind
          .CommonJS,
      amd: monaco.languages.typescript.ModuleKind
        .AMD,
      umd: monaco.languages.typescript.ModuleKind
        .UMD,
      system:
        monaco.languages.typescript.ModuleKind
          .System,
      es6: monaco.languages.typescript.ModuleKind
        .ES2015,
      es2015:
        monaco.languages.typescript.ModuleKind
          .ES2015,
      es2020:
        monaco.languages.typescript.ModuleKind
          .ES2020,
      es2022:
        monaco.languages.typescript.ModuleKind
          .ES2022,
      esnext:
        monaco.languages.typescript.ModuleKind
          .ESNext,
      nodenext:
        monaco.languages.typescript.ModuleKind
          .NodeNext,
      node16:
        monaco.languages.typescript.ModuleKind
          .Node16
    },
    jsx: {
      'preserve':
        monaco.languages.typescript.JsxEmit
          .Preserve,
      'react':
        monaco.languages.typescript.JsxEmit.React,
      'react-jsx':
        monaco.languages.typescript.JsxEmit
          .ReactJSX,
      'react-jsxdev':
        monaco.languages.typescript.JsxEmit
          .ReactJSXDev,
      'react-native':
        monaco.languages.typescript.JsxEmit
          .ReactNative
    },
    moduleResolution: {
      classic:
        monaco.languages.typescript
          .ModuleResolutionKind.Classic,
      node: monaco.languages.typescript
        .ModuleResolutionKind.NodeJs,
      nodenext:
        monaco.languages.typescript
          .ModuleResolutionKind.Node16
    }
  }

  const res: Record<string, any> = {}
  const rawoptions: Record<string, any> =
    JSON.parse(raw).compilerOptions
  for (const key in rawoptions) {
    const value = rawoptions[key]
    if (key in enumMaps) {
      res[key] =
        enumMaps[key][String(value).toLowerCase()]
    } else {
      res[key] = value
    }
  }

  return res
}
