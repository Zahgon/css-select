import { SelectorType } from "css-what";
import { attributeRules } from "./attributes.js";
import { getElementParent } from "./helpers/querying.js";
import { compilePseudoSelector } from "./pseudo-selectors/index.js";
import type {
    CompiledQuery,
    CompileToken,
    InternalOptions,
    InternalSelector,
} from "./types.js";

/*
 * All available rules
 */

/**
 * Compile a single selector token.
 * @param next Matcher to run after this matcher succeeds.
 * @param selector Selector used to match elements.
 * @param options Options that control this operation.
 * @param context Context nodes used to scope selector matching.
 * @param compileToken Function used to compile nested selector tokens.
 * @param hasExpensiveSubselector Whether the selector contains expensive subselectors.
 */
export function compileGeneralSelector<Node, ElementNode extends Node>(
    next: CompiledQuery<ElementNode>,
    selector: InternalSelector,
    options: InternalOptions<Node, ElementNode>,
    context: Node[] | undefined,
    compileToken: CompileToken<Node, ElementNode>,
    hasExpensiveSubselector: boolean,
): CompiledQuery<ElementNode> {
    const { adapter, equals, cacheResults } = options;

    switch (selector.type) {
        case SelectorType.PseudoElement: {
            throw new Error("Pseudo-elements are not supported by css-select");
        }
        case SelectorType.ColumnCombinator: {
            throw new Error(
                "Column combinators are not yet supported by css-select",
            );
        }
        case SelectorType.Attribute: {
            if (selector.namespace != null) {
                throw new Error(
                    "Namespaced attributes are not yet supported by css-select",
                );
            }

            if (!options.xmlMode || options.lowerCaseAttributeNames) {
                selector.name = selector.name.toLowerCase();
            }
            return attributeRules[selector.action](next, selector, options);
        }
        case SelectorType.Pseudo: {
            return compilePseudoSelector(
                next,
                selector,
                options,
                context,
                compileToken,
            );
        }
        // Tags
        case SelectorType.Tag: {
            if (selector.namespace != null) {
                throw new Error(
                    "Namespaced tag names are not yet supported by css-select",
                );
            }

            let { name } = selector;

            if (!options.xmlMode || options.lowerCaseTags) {
                name = name.toLowerCase();
            }

            return function tag(element: ElementNode): boolean {
                throw new Error("STUB");
            };
        }

        // Traversal
        case SelectorType.Descendant: {
            if (
                !hasExpensiveSubselector ||
                cacheResults === false ||
                typeof WeakMap === "undefined"
            ) {
                return function descendant(element: ElementNode): boolean {
                    throw new Error("STUB");
                };
            }

            const resultCache = new WeakMap<
                // @ts-expect-error `ElementNode` is not extending object
                ElementNode,
                { matches: boolean }
            >();
            return function cachedDescendant(element: ElementNode): boolean {
                throw new Error("STUB");
            };
        }
        case "_flexibleDescendant": {
            // Include element itself, only used while querying an array
            return function flexibleDescendant(element: ElementNode): boolean {
                throw new Error("STUB");
            };
        }
        case SelectorType.Parent: {
            return function parent(element: ElementNode): boolean {
                throw new Error("STUB");
            };
        }
        case SelectorType.Child: {
            return function child(element: ElementNode): boolean {
                throw new Error("STUB");
            };
        }
        case SelectorType.Sibling: {
            return function sibling(element: ElementNode): boolean {
                throw new Error("STUB");
            };
        }
        case SelectorType.Adjacent: {
            if (adapter.prevElementSibling) {
                return function adjacent(element: ElementNode): boolean {
                    throw new Error("STUB");
                };
            }

            return function adjacent(element: ElementNode): boolean {
                throw new Error("STUB");
            };
        }
        case SelectorType.Universal: {
            if (selector.namespace != null && selector.namespace !== "*") {
                throw new Error(
                    "Namespaced universal selectors are not yet supported by css-select",
                );
            }

            return next;
        }
    }
}
