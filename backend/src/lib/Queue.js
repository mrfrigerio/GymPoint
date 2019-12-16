import Bee from 'bee-queue'
import EnrollmentMail from '../app/jobs/EnrollmentMail'
import AnswerMail from '../app/jobs/AnswerMail'
import redisConfig from '../config/redis'

const jobs = [EnrollmentMail, AnswerMail]
class Queue {
  constructor() {
    this.queues = {}
    this.init()
  }

  init() {
    jobs.forEach(({ key, handle }) => {
      this.queues[key] = {
        bee: new Bee(key, { redis: redisConfig }),
        handle
      }
    })
  }

  // Adiciona jobs às filas com os dados 'data' e salva no Redis com o método save() que retorna uma Promise
  add(queue, job) {
    return this.queues[queue].bee.createJob(job).save()
  }

  processQueue() {
    jobs.forEach(job => {
      const { bee, handle } = this.queues[job.key]
      bee.on('failed', this.handleFailure).process(handle)
    })
  }

  handleFailure(job, err) {
    // eslint-disable-next-line no-console
    console.log(`The queue ${job.queue.name} failed: `, err)
  }
}

export default new Queue()
