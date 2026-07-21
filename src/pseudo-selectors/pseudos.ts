import type { PseudoSelector } from "css-what";
import type { InternalOptions } from "../types.js";

type Pseudo = <Node, ElementNode extends Node>(
    element: ElementNode,
    options: InternalOptions<Node, ElementNode>,
    subselect?: string | null,
) => boolean;

/**
 * CSS limits the characters considered as whitespace to space, tab & line
 * feed. We add carriage returns as htmlparser2 doesn't normalize them to
 * line feeds.
 * @see {@link https://www.w3.org/TR/css-text-3/#white-space}
 */
const isDocumentWhiteSpace = /^[ \t\r\n]*$/;

// While filters are precompiled, pseudos get called when they are needed
/** Runtime pseudo selector implementations. */
export const pseudos: Record<string, Pseudo> = {
    empty(element, { adapter }) {
        throw new Error("STUB");
    },

    "first-child"(element, { adapter, equals }) {
        throw new Error("STUB");
    },
    "last-child"(element, { adapter, equals }) {
        throw new Error("STUB");
    },
    "first-of-type"(element, { adapter, equals }) {
        throw new Error("STUB");
    },
    "last-of-type"(element, { adapter, equals }) {
        throw new Error("STUB");
    },
    "only-of-type"(element, { adapter, equals }) {
        throw new Error("STUB");
    },
    "only-child"(element, { adapter, equals }) {
        throw new Error("STUB");
    },
};

/**
 * Validate pseudo selector argument arity.
 * @param pseudoClassCondition Pseudo-function implementation to wrap.
 * @param name Name of the pseudo selector.
 * @param subselect Subselector passed to the pseudo-function.
 * @param argumentIndex Index of the argument parser to apply.
 */
export function verifyPseudoArguments<T extends unknown[]>(
    pseudoClassCondition: (...parameters: T) => boolean,
    name: string,
    subselect: PseudoSelector["data"],
    argumentIndex: number,
): void {
    if (subselect === null) {
        if (pseudoClassCondition.length > argumentIndex) {
            throw new Error(`Pseudo-class :${name} requires an argument`);
        }
    } else if (pseudoClassCondition.length === argumentIndex) {
        throw new Error(`Pseudo-class :${name} doesn't have any arguments`);
    }
}
