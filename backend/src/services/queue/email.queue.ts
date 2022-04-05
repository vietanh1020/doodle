import Bull from 'bull';
import emailProcess from '../process/email.process';

const emailQueue = new Bull("email", {
  redis: { port: 6379, host: "redis" },
});

emailQueue.process(emailProcess);

const sendNewEmail = (data: any) => {
    emailQueue.add(data, {
        attempts: 5
    });
};

export {
    sendNewEmail
}
