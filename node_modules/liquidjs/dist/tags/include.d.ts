import { TopLevelToken, Liquid, Tag, Emitter, TagToken, Context } from '..';
import { Parser } from '../parser';
export default class extends Tag {
    private withVar?;
    private hash;
    constructor(token: TagToken, remainTokens: TopLevelToken[], liquid: Liquid, parser: Parser);
    render(ctx: Context, emitter: Emitter): Generator<unknown, void, unknown>;
}
