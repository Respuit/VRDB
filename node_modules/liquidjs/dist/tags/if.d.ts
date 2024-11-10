import { Liquid, Tag, Value, Emitter, TagToken, TopLevelToken, Context, Template } from '..';
import { Parser } from '../parser';
export default class extends Tag {
    branches: {
        value: Value;
        templates: Template[];
    }[];
    elseTemplates: Template[] | undefined;
    constructor(tagToken: TagToken, remainTokens: TopLevelToken[], liquid: Liquid, parser: Parser);
    render(ctx: Context, emitter: Emitter): Generator<unknown, void, string>;
}
