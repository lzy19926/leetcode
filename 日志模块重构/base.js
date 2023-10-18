/*
 * @Author: Luzy
 * @Date: 2023-10-16 16:50:33
 * @LastEditors: Luzy
 * @LastEditTime: 2023-10-16 17:45:01
 * @Description:
 */


async function parseLogParam() {

    // 差异化success与error
    if ('success') {
        ctx.logParam.state = 'success';
    }
    else if ('fail') {
        ctx.logParam.state = 'fail';
        ctx.logParam.error = {
            message: errMsg,
            code: errorCode,
        };
    }


    const requestAddress = ctx.ip.split(':');
    const ip = requestAddress[requestAddress.length - 1];
    const user = ctx.request.user_info;
    const module = ctx.logParam.module;
    const type = ctx.logParam.type;


    const log = await combineLog(ctx.logParam, ctx);
    const logEntry = {
        ip,
        log,
        module
    };

    let userOid;
    let currentUserRoleName;
    if (user) {
        userOid = user._id;
        currentUserRoleName = user.role;
    }
    if (type) {
        logEntry.type = type;
    }
    if (userOid) {
        logEntry.userOid = userOid;
    }
    if (currentUserRoleName) {
        logEntry.current_role_name = currentUserRoleName;
    }

    await saveLog(logEntry);

}




//! restSuccess 处理logParam
if (ctx.logParam) {
    ctx.logParam.state = 'success';
}

//! restError 处理logParam
if (ctx.logParam) {
    ctx.logParam.state = 'fail';
    ctx.logParam.error = {
        message: errMsg,
        code: errorCode,
    };
}

//! downloader 处理logParam
if (ctx.logParam) {
    ctx.logParam.state = 'success';
}

//! errorHandler 处理logParam
//记录错误日志
if (ctx.logParam) {
    ctx.logParam.state = 'fail';
    ctx.logParam.error = err;
}