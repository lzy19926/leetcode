// 重构前
class Page extends React.Component {
    constructor() { }

    uploadUpdate = () => {
        const { packageFile, edition } = this.state;
        const body = new FormData();
        body.append('file', packageFile);
        let config = {
            onUploadProgress: progressEvent => {
                if (!this.state.uploadingPackage) {
                    return;
                }
                let loaded = progressEvent.loaded;
                let total = progressEvent.total;
                let percent = ((loaded / total) * 100) | 0;
                let now = Date.now();
                let bytesPerSecond =
                    (1000 * (loaded - this.lastRecordLoaded)) / (now - this.lastRecordTime);
                let remainUploadSeconds = (total - loaded) / bytesPerSecond;
                this.lastRecordTime = now;
                this.lastRecordLoaded = loaded;
                this.setState({
                    percent,
                    bytesPerSecond,
                    remainUploadSeconds
                });
            },
            cancelToken: new CancelToken(cancel => {
                this._cancelUpload = cancel;
            })
        };
        this.setState({ percent: 0, uploadingPackage: true });
        this.lastRecordLoaded = 0;
        this.lastRecordTime = Date.now();
        this._isCanceled = false;
        body.append('update_type', 'system');
        let api = uploadClanPackage;
        api(body, config)
            .then(res => {
                const pkginfo = _.get(res, 'data.data.result.pkginfo', {});
                const pkgVersion = _.get(pkginfo, 'version', '');
                const updatedSameVersionPkgAtCluster = edition === pkgVersion;
                const verify =
                    _.get(res.data.data, 'result.verify') === 'success' ||
                    (_.get(res.data.data, 'result.master_ret.verify') === 'success' &&
                        edition !== pkgVersion);
                this.setState({
                    verifyModalVisible: true,
                    verify,
                    pkginfo,
                    percent: 100,
                    uploadingPackage: false,
                    updatedSameVersionPkgAtCluster,
                    uploadModalVisible: false
                });
            })
            .catch(() => {
                if (!this._isCanceled) {
                    this.setState({
                        uploadingPackage: false,
                        uploadModalVisible: false,
                        verifyModalVisible: true,
                        verify: false
                    });
                } else {
                    this.setState({ uploadingPackage: false });
                }
            });
    };
}

// 重构后
class Page extends React.Component {
    constructor() { }

    uploadUpdatePackageFile = () => {
        initUploadProgressBar()

        const body = initFormData()
        const config = initApiConfig()

        API.uploadClanPackage(body, config)
            .then(onUploadSuccess)
            .catch(onUploadFail);

        // 初始化进度条
        const initUploadProgressBar = () => {
            this.setState({ percent: 0, uploadingPackage: true });
            this.lastRecordLoaded = 0;
            this.lastRecordTime = Date.now();
            this._isCanceled = false;
        }
        // 初始化formData
        const initFormData = () => {
            const body = new FormData();
            body.append('file', this.state.packageFile);
            body.append('update_type', 'system');

            return body
        }
        // 构造api参数
        const initApiConfig = () => {
            return {
                onUploadProgress: renderUploadProgressBar,
                cancelToken: new CancelToken(cancel => {
                    this._cancelUpload = cancel;
                })
            };
        }
        // 单次渲染进度条
        const renderUploadProgressBar = progressEvent => {
            if (!this.state.uploadingPackage) {
                return;
            }
            const { now, loaded, percent, bytesPerSecond, remainUploadSeconds } = caculatePersent()

            this.lastRecordTime = now;
            this.lastRecordLoaded = loaded;
            this.setState({
                percent,
                bytesPerSecond,
                remainUploadSeconds
            });

            const caculatePersent = () => {
                let now = Date.now();
                let loaded = progressEvent.loaded;
                let total = progressEvent.total;
                let percent = ((loaded / total) * 100) | 0;
                let bytesPerSecond =
                    (1000 * (loaded - this.lastRecordLoaded)) / (now - this.lastRecordTime);

                let remainUploadSeconds = (total - loaded) / bytesPerSecond;

                return { now, loaded, percent, bytesPerSecond, remainUploadSeconds }
            }
        }
        // 上传成功
        const onUploadSuccess = res => {
            const pkginfo = _.get(res, 'data.data.result.pkginfo', {});
            const { isValied, isValiedEdition } = validateUploadPkg(res)

            this.setState({
                verifyModalVisible: true,
                verify: isValied,
                pkginfo,
                percent: 100,
                uploadingPackage: false,
                updatedSameVersionPkgAtCluster: isValiedEdition,
                uploadModalVisible: false
            });
        }
        // 上传失败
        const onUploadFail = () => {
            if (!this._isCanceled) {
                this.setState({
                    uploadingPackage: false,
                    uploadModalVisible: false,
                    verifyModalVisible: true,
                    verify: false
                });
            } else {
                this.setState({ uploadingPackage: false });
            }
        }
        // 校验文件及其版本
        const validateUploadPkg = (res) => {
            const result = _.get(res, 'data.data.result', {});
            const pkgVersion = _.get(result, 'pkginfo.version', '');

            const isValiedPkg =
                _.get(result, 'verify') === 'success' ||
                _.get(result, 'master_ret.verify') === 'success'

            const isValied = isValiedPkg && isValiedEdition
            const isValiedEdition = this.state.edition == pkgVersion

            return { isValied, isValiedEdition }
        }
    };
}
