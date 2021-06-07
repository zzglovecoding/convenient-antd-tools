let fs = require('fs');
let minimist = require('minimist');
let argv = minimist(process.argv.slice(2));

function configureEnvironment(args) {
    let code;

    switch (args.branch) {
        // 开发分支
        case 'dev':
            code = `export default {

            };`;
            break;
        // 测试分支
        case 'test': 
            code = `export default {
                
            };`;
            break;
    }
    
    code && fs.writeFileSync('src/config/environment.js', code);
}

// configureEnvironment(argv);