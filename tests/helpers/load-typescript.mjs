import { readFileSync } from "node:fs";
import { runInNewContext } from "node:vm";
import ts from "typescript";

// Execute the real TypeScript modules with controlled dependencies.
// Contact delivery is always mocked; tests never send external enquiries.
export function loadTypeScript(relativePath, globals = {}) {
  const source = readFileSync(new URL(relativePath, import.meta.url), "utf8");
  const compiled = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, jsx: ts.JsxEmit.ReactJSX } }).outputText;
  const compiledModule = { exports: {} };
  runInNewContext(compiled, {
    exports: compiledModule.exports, module: compiledModule,
    URL, Request, Response, AbortSignal, TextDecoder, Uint8Array, Date,
    process: { env: {} },
    console: { error() {} },
    require() { throw new Error("Unexpected dependency in test."); },
    ...globals,
  });
  return compiledModule.exports;
}

export function loadContactRoute(env = {}, fetchMock = async () => { throw new Error("Unexpected external request."); }) {
  const validator = loadTypeScript("../../src/lib/enquiry.ts");
  return loadTypeScript("../../src/app/api/contact/route.ts", {
    process: { env },
    fetch: fetchMock,
    require(name) {
      if (name === "../../../lib/enquiry") return validator;
      throw new Error("Unexpected dependency: " + name);
    },
  });
}
