import { task, src, dest, series } from 'gulp';
import del from 'del';
import compress from 'gulp-zip';
import sftp from 'gulp-sftp-up4';
import mergeStream from 'merge-stream';
import { name, parcel, deployments } from './package.json';
import { execSync } from 'child_process';

const packageName = parcel.name || name;       // 打包名
const BUILD_PATH = 'build';                    // 编译文件
const DIST_PATH = 'dist';                      // 目的地文件
const deploymentList = Array.isArray(deployments) ? deployments : [deployments];

function isEnabled(config = {}) {
    return config.enabled || config.enabled === undefined;
}

// 清除 build 目录
task('clean-build', () => del([BUILD_PATH]));

// 清除 dist 目录
task('clean-dist', () => del([DIST_PATH]));

// 项目打包
task('package', series('clean-dist', () => {
    const { zip } = parcel;
    let stream = src([`${BUILD_PATH}/**`], { base: `${BUILD_PATH}/` });

    if (zip) {
        return stream.pipe(compress(`${packageName}.zip`)).pipe(dest(DIST_PATH));
    }

    return stream.pipe(dest(`${DIST_PATH}/${packageName}`));
}));

// 将静态资源部署到服务器
task('deploy', () => {
    // 遍历发布配置
    var streams = deploymentList.filter(isEnabled).map((deployment) => {
        const { zip } = parcel;
        let file = `${DIST_PATH}/${packageName}`;

        if (zip) {
            file += '.zip';
        }
        return src(file).pipe(sftp(deployment));
    });

    return mergeStream(...streams);
});

task('git-push', (done) => {
    execSync('git add -A :/');
    execSync('git commit -m "quick commit"');
    execSync('git push');
    done();
});
