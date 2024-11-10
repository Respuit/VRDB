import { Template, Liquid, Tag, Emitter, Hash, TagToken, TopLevelToken, Context } from '..';
import { ParsedFileName } from './render';
import { Parser } from '../parser';
export default class extends Tag {
    args: Hash;
    templates: Template[];
    file?: ParsedFileName;
    constructor(token: TagToken, remainTokens: TopLevelToken[], liquid: Liquid, parser: Parser);
    render(ctx: Context, emitter: Emitter): Generator<unknown, unknown, unknown>;
}
