
// 重构结束可复用
function _formatPopulation(selectPartList, index = 0, currentLevel, opt) {
    if (index < selectPartList.length - 2) {
        currentLevel.path = selectPartList[index];
        currentLevel.populate = {};
        return _formatPopulation(selectPartList, index + 1, currentLevel.populate, opt);
    } else if (index == selectPartList.length - 2) {
        currentLevel.path = selectPartList[index];
        currentLevel.select = selectPartList[index + 1];
        return opt;
    }
    return '';
}

/**
 * 从对应的model中查询结果 (重构结束可复用)
 * @param {String} queryContent - 查询条件. "user>user_id:role_oid>name"
 * @param {*} refMap
 * @returns
 */
async function _queryFromModel(queryContent, refMap) {
    const [queryPart, populatePart] = queryContent.split(':');
    const [modelName, queryIdFieldName] = queryPart.split('>');
    const selectPartList = populatePart.split('>');

    const model = models[modelName];
    const id = refMap[queryIdFieldName];

    let populateOptions = {};
    populateOptions = _formatPopulation(selectPartList, 0, populateOptions, populateOptions);

    let resultList;
    if (populateOptions) {
        resultList = await model
            .find({ _id: { $in: id } })
            .populate(populateOptions)
            .lean();
    } else {
        resultList = await model.find({ _id: { $in: id } }).lean();
    }
    const dataList = resultList.map(item => {
        return _.get(item, selectPartList.join('.'), '');
    });

    const data = dataList.join(',');

    return data;
}