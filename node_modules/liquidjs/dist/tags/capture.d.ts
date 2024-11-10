import { Liquid, Tag, Template, Context, TagToken, TopLevelToken } from '..';
import { Parser } from '../parser';
export default class extends Tag {
    variable: string;
    templates: Template[];
    constructor(tagToken: TagToken, remainTokens: TopLevelToken[], liquid: Liquid, parser: Parser);
    render(ctx: Context): Generator<unknown, void, string>;
    private readVariableName;
}
