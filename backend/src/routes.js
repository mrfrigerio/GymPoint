import { Router } from 'express'

import UserController from './app/controllers/UserController'
import SessionController from './app/controllers/SessionController'
import StudentController from './app/controllers/StudentController'
import PlanController from './app/controllers/PlanController'
import EnrollmentController from './app/controllers/EnrollmentController'
import CheckinController from './app/controllers/CheckinController'
import HelpOrderStudentController from './app/controllers/HelpOrderStudentController'
import HelpOrderAdminController from './app/controllers/HelpOrderAdminController'

import jwtValidator from './app/middlewares/jwtvalidator'

const routes = Router()

// Sessions
routes.post('/sessions', SessionController.store)

// Checkins
routes.get('/students/:studentId/checkins', CheckinController.index)
routes.post('/students/:studentId/checkins', CheckinController.store)

// Help Orders (Students)
routes.get('/students/:studentId/help-orders', HelpOrderStudentController.index)
routes.post(
  '/students/:studentId/help-orders',
  HelpOrderStudentController.store
)

// JWT Validation middleware
routes.use(jwtValidator)

// Users
routes.get('/users', UserController.index)
routes.post('/users', UserController.store)
routes.put('/users', UserController.update)

// Students
routes.get('/students', StudentController.index)
routes.post('/students', StudentController.store)
routes.put('/students/:studentId', StudentController.update)
routes.delete('/students/:studentId', StudentController.delete)

// Plans
routes.get('/plans', PlanController.index)
routes.post('/plans', PlanController.store)
routes.put('/plans/:planId', PlanController.update)
routes.delete('/plans/:planId', PlanController.delete)

// Enrollments
routes.get('/enrollments', EnrollmentController.index)
routes.post('/students/:studentId/enrollments', EnrollmentController.store)
routes.put('/enrollments/:enrollmentId', EnrollmentController.update)
routes.delete('/enrollments/:enrollmentId', EnrollmentController.delete)

// Help Orders (Admin)
routes.get('/help-orders', HelpOrderAdminController.index)
routes.put('/help-orders/:helpOrderId/answer', HelpOrderAdminController.update)

export default routes
