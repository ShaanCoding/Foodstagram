const CronJob = require('node-cron');

exports.initScheduledJobs = () => {
    const scheduledJobFunction = CronJob.schedule('* * * * *', () => {
        console.log('scheduled job ran');
    });

    scheduledJobFunction.start();
};