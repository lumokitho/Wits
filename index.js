const util = require('./lib/util.js');
const userInfoHelper = require('./lib/userInfoHelper.js');

const setWitsconfigInfo = async data => {
    try {
        const initCommand = require('./command/init.js');
        console.log('WITs::setWitsconfigInfo');

        if (data.hasOwnProperty('baseAppPath')) {
            util.CURRENT_PROJECT_PATH = userInfoHelper.getBaseAppPath(
                data.baseAppPath
            );
        }

        if (data.hasOwnProperty('profilePath')) {
            if (!(await initCommand.isVaildProfile(data.profilePath))) {
                throw new Error(
                    'There is invalid profile. Please create a profile or active the profile.'
                );
            }
        }

        await initCommand.prepareConfigure();
        await userInfoHelper.updateLatestUserAnswer(data);
        return;
        /**
         {
             width: '1920',
             deviceIp: '192.168.250.250',
             hostIp: '192.168.250.250', 
             baseAppPath: 'E:/dev/workspace/test', 
             isDebugMode: false,
             profilePath: 'C:/tizen-studio-data/profile/profiles.xml',
            }
            */
    } catch (error) {
        console.log(`setWitsconfigInfo:::${error}`);
    }
};

const start = async () => {
    try {
        if (!userInfoHelper.WITS_USER_DATA) {
            throw new Error('There is invalid WITS_USER_DATA');
        }
        const startCommand = require('./command/start.js');
        console.log('WITs::start');

        await startCommand.run();
        return;
    } catch (error) {
        console.log(`start:::${error}`);
    }
};

const watch = async () => {
    try {
        if (!userInfoHelper.WITS_USER_DATA) {
            throw new Error('There is invalid WITS_USER_DATA');
        }
        const watchCommand = require('./command/watch.js');
        console.log('WITs::watch');

        await watchCommand.run();
        return;
    } catch (error) {
        console.log(`watch:::${error}`);
    }
};

const disconnect = () => {
    const watchHelper = require('./lib/watchHelper.js');

    try {
        watchHelper.closeSocketServer();
    } catch (error) {
        console.log(`disconnect:::${error}`);
    }
};

module.exports = {
    setWitsconfigInfo,
    start,
    watch,
    disconnect
};
