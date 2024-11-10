import { Hash, ValueToken, Liquid, Tag, Emitter, TagToken, TopLevelToken, Context, Template } from '..';
import { Parser } from '../parser';
export default class extends Tag {
    variable: string;
    collection: ValueToken;
    hash: Hash;
    templates: Template[];
    elseTemplates: Template[];
    constructor(token: TagToken, remainTokens: TopLevelToken[], liquid: Liquid, parser: Parser);
    render(ctx: Context, emitter: Emitter): Generator<unknown, void | string, Template[]>;
}
