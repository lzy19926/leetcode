/*
 * @Author: Luzy
 * @Date: 2023-10-16 16:52:57
 * @LastEditors: Luzy
 * @LastEditTime: 2023-10-19 10:26:40
 * @Description:
 */



async function fillPreQueryMap(options) {
    const { preQuery, refs } = options;
    if (preQuery && refs) {
        const refMap = {};
        if (typeof refs == 'object') {
            for (const key in refs) {
                refMap[key] = _.get(ctx, refs[key]);
            }
        }

        if (typeof preQuery == 'object') {
            options.preQueryMap = {};
            for (const key in preQuery) {
                const queryContent = preQuery[key];
                const replacement = (await _queryFromModel(queryContent, refMap)) || '未找到';
                options.preQueryMap[key] = replacement;
            }
        }
    }

    return options
}