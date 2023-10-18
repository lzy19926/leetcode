/*
 * @Author: Luzy
 * @Date: 2023-10-16 17:15:05
 * @LastEditors: Luzy
 * @LastEditTime: 2023-10-16 17:42:05
 * @Description:
 */


// 重构结束 可用方法
async function combineLog(param, ctx) {
    const { state, template, refs, grep, module: moduleName, preQueryMap } = param;

    if (!template || !template[state]) {
        return '';
    }

    let targetTemplate = template[state];

    // 替换${module}占位符
    const MODULE_REGEX = /\[module\]/g;
    if (MODULE_REGEX.test(targetTemplate)) {
        targetTemplate = targetTemplate.replace(MODULE_REGEX, MODULE_UI_MAP[moduleName]);
    }

    // 替换${error}占位符
    const ERROR_REGEX = /\[error\]/g;
    if (ERROR_REGEX.test(targetTemplate)) {
        const error_message = param.error ? param.error.message : '';
        targetTemplate = targetTemplate.replace(ERROR_REGEX, error_message);
    }

    // 根据refs替换'${xxx}'格式的内容
    const refMap = {};
    if (typeof refs == 'object') {
        const refKeyList = Object.keys(refs);
        refKeyList.forEach(key => {
            const refRegex = new RegExp(`\\$\\{${key}\\}`, 'g');
            const replacement = _.get(ctx, refs[key]);
            refMap[key] = replacement;
            if (refRegex.test(targetTemplate)) {
                targetTemplate = targetTemplate.replace(refRegex, replacement);
            }
        });
    }

    // 根据grep替换'$$[xxx]'格式的内容
    if (typeof grep == 'object') {
        for (const key in grep) {
            const queryRegex = new RegExp(`\\$\\$\\[${key}\\]`, 'g');
            if (queryRegex.test(targetTemplate)) {
                const grepCondition = grep[key];
                const replacement = (await _queryFromModel(grepCondition, refMap)) || '未找到';
                targetTemplate = targetTemplate.replace(queryRegex, replacement);
            }
        }
    }

    // 根据preQuery替换'$[xxx]'的内容
    if (typeof preQueryMap == 'object') {
        const preQueryKeyList = Object.keys(preQueryMap);
        preQueryKeyList.forEach(key => {
            const preQueryRegex = new RegExp(`\\$\\[${key}\\]`, 'g');
            const replacement = _.get(preQueryMap, key);
            if (preQueryRegex.test(targetTemplate)) {
                targetTemplate = targetTemplate.replace(preQueryRegex, replacement);
            }
        });
    }
    return targetTemplate;
}



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


// 重构结束 可用方法
/**
 * 存储日志记录
 * @param {*} logEntry
 * @returns
 */
function saveLog(logEntry) {
    return OperationLogRepository.insertOne(logEntry);
}
