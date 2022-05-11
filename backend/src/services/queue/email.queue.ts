import Bull from "bull";
import emailProcess from "../process/email.process";

const {REDIS_HOSTS='redis', REDIS_PORT=6379} = process.env;

const emailQueue = new Bull("email", {
  redis: { port: Number(REDIS_PORT), host: REDIS_HOSTS },
});

emailQueue.process(emailProcess);

const sendNewEmail = (data: any) => {
  emailQueue.add(data, {
    attempts: 5,
  });
};

export { sendNewEmail };
