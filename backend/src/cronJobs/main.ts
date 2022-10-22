const CronJob = require('node-cron');
import { Query, pool } from "../util/db";

exports.initScheduledJobs = () => {
    const scheduledJobFunction = CronJob.schedule('* * * * *', async () => {
        // Posts that need to be changed from scheduled to published
        const scheduledPosts = "UPDATE posts SET `businessState` = 1 WHERE `businessState` = 2 AND `businessScheduleTime` <= NOW()";
        await Query(scheduledPosts, []) as any;
    });

    scheduledJobFunction.start();
};