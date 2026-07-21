import * as boolbase from "boolbase";
import type { AttributeAction, AttributeSelector } from "css-what";
import type { CompiledQuery, InternalOptions } from "./types.js";

/**
 * All reserved characters in a regex, used for escaping.
 *
 * Taken from XRegExp, (c) 2007-2020 Steven Levithan under the MIT license
 * https://github.com/slevithan/xregexp/blob/95eeebeb8fac8754d54eafe2b4743661ac1cf028/src/xregexp.js#L794
 */
const reChars = /[-[\]{}()*+?.,\\^$|#\s]/g;
const whitespaceRe = /\s/;
function escapeRegex(value: string): string {
    return value.replace(reChars, "\\$&");
}

/**
 * Attributes that are case-insensitive in HTML.
 * @see https://html.spec.whatwg.org/multipage/semantics-other.html#case-sensitivity-of-selectors
 */
const caseInsensitiveAttributes = new Set([
    "accept",
    "accept-charset",
    "align",
    "alink",
    "axis",
    "bgcolor",
    "charset",
    "checked",
    "clear",
    "codetype",
    "color",
    "compact",
    "declare",
    "defer",
    "dir",
    "direction",
    "disabled",
    "enctype",
    "face",
    "frame",
    "hreflang",
    "http-equiv",
    "lang",
    "language",
    "link",
    "media",
    "method",
    "multiple",
    "nohref",
    "noresize",
    "noshade",
    "nowrap",
    "readonly",
    "rel",
    "rev",
    "rules",
    "scope",
    "scrolling",
    "selected",
    "shape",
    "target",
    "text",
    "type",
    "valign",
    "valuetype",
    "vlink",
]);

function shouldIgnoreCase<Node, ElementNode extends Node>(
    selector: AttributeSelector,
    options: InternalOptions<Node, ElementNode>,
): boolean {
    return typeof selector.ignoreCase === "boolean"
        ? selector.ignoreCase
        : selector.ignoreCase === "quirks"
          ? !!options.quirksMode
          : !options.xmlMode && caseInsensitiveAttributes.has(selector.name);
}

/**
 * Attribute selectors
 */
export const attributeRules: Record<
    AttributeAction,
    <Node, ElementNode extends Node>(
        next: CompiledQuery<ElementNode>,
        data: AttributeSelector,
        options: InternalOptions<Node, ElementNode>,
    ) => CompiledQuery<ElementNode>
> = {
    equals(next, data, options) {
        const { adapter } = options;
        const { name } = data;
        let { value } = data;

        if (shouldIgnoreCase(data, options)) {
            value = value.toLowerCase();

            return (element) => {
                throw new Error("STUB");
            };
        }

        return (element) =>
            { throw new Error("STUB"); };
    },
    hyphen(next, data, options) {
        throw new Error("STUB");
    },
    element(next, data, options) {
        throw new Error("STUB");
    },
    exists(next, { name }, { adapter }) {
        throw new Error("STUB");
    },
    start(next, data, options) {
        throw new Error("STUB");
    },
    end(next, data, options) {
        throw new Error("STUB");
    },
    any(next, data, options) {
        throw new Error("STUB");
    },
    not(next, data, options) {
        throw new Error("STUB");
    },
};
