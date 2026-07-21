import * as boolbase from "boolbase";
import { parse } from "css-what";
import getNCheck from "nth-check";
import { cacheParentResults } from "../helpers/cache.js";
import { copyOptions } from "../helpers/options.js";
import { getElementParent } from "../helpers/querying.js";
import type { CompiledQuery, CompileToken, InternalOptions } from "../types.js";

/**
 * RFC 4647 extended filtering with pre-split subtags.
 * @param tag - Lowercased subtags of the element's language value.
 * @param range - Lowercased subtags of the language range to match against.
 */
function extendedFilter(tag: string[], range: string[]): boolean {
    if (range[0] !== "*" && range[0] !== tag[0]) return false;

    let tagIndex = 1;

    for (let rangeIndex = 1; rangeIndex < range.length; rangeIndex++) {
        if (range[rangeIndex] === "*") continue;

        // Skip non-singleton tag subtags until we find a match.
        while (tagIndex < tag.length && tag[tagIndex] !== range[rangeIndex]) {
            if (tag[tagIndex++].length <= 1) return false;
        }

        if (tagIndex >= tag.length) return false;
        tagIndex++;
    }

    return true;
}

/** @see {@link https://www.w3.org/TR/selectors-4/#the-nth-child-pseudo} */
const nthOfRegex = /^(.+?)\s+of\s+(.+)$/is;

/** A pre-compiled pseudo filter. */
export type Filter = <Node, ElementNode extends Node>(
    next: CompiledQuery<ElementNode>,
    text: string,
    options: InternalOptions<Node, ElementNode>,
    context?: Node[],
    compileToken?: CompileToken<Node, ElementNode>,
) => CompiledQuery<ElementNode>;

function compileNth(reverse: boolean, ofType: boolean): Filter {
    return function nth(next, rule, options, context, compileToken) {
        throw new Error("STUB");
    };
}

/**
 * Pre-compiled pseudo filters.
 */
export const filters: Record<string, Filter> = {
    contains(next, text, options) {
        throw new Error("STUB");
    },
    icontains(next, text, options) {
        throw new Error("STUB");
    },

    // Location specific methods
    "nth-child": compileNth(false, false),
    "nth-last-child": compileNth(true, false),
    "nth-of-type": compileNth(false, true),
    "nth-last-of-type": compileNth(true, true),

    // TODO determine the actual root element
    root(next, _rule, { adapter }) {
        throw new Error("STUB");
    },

    scope<Node, ElementNode extends Node>(
        next: CompiledQuery<ElementNode>,
        rule: string,
        options: InternalOptions<Node, ElementNode>,
        context?: Node[],
    ): CompiledQuery<ElementNode> {
        throw new Error("STUB");
    },

    lang(next, code, { adapter }) {
        throw new Error("STUB");
    },

    hover: dynamicStatePseudo("isHovered"),
    visited: dynamicStatePseudo("isVisited"),
    active: dynamicStatePseudo("isActive"),
};

/**
 * Dynamic state pseudos. These depend on optional Adapter methods.
 * @param name The name of the adapter method to call.
 * @returns Pseudo for the `filters` object.
 */
function dynamicStatePseudo(
    name: "isHovered" | "isVisited" | "isActive",
): Filter {
    return function dynamicPseudo(next, _rule, { adapter }) {
        throw new Error("STUB");
    };
}
