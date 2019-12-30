import React from 'react'
import { Switch } from 'react-router-dom'
import Route from '~/routes/route'
// import { Container } from './styles';

import EnrollmentsUpdate from '~/pages/EnrollmentsUpdate'
import EnrollmentsList from '~/pages/EnrollmentsList'
import EnrollmentsRegister from '~/pages/EnrollmentsRegister'
import HelpOrdersList from '~/pages/HelpOrdersList'
import PlansList from '~/pages/PlansList'
import PlansRegister from '~/pages/PlansRegister'
import PlansUpdate from '~/pages/PlansUpdate'
import SignIn from '~/pages/SignIn'
import StudentsUpdate from '~/pages/StudentsUpdate'
import StudentsList from '~/pages/StudentsList'
import StudentsRegister from '~/pages/StudentsRegister'

export default function routes() {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />
      <Route
        path="/enrollments/update"
        isPrivate
        component={EnrollmentsUpdate}
      />
      <Route path="/enrollments/list" isPrivate component={EnrollmentsList} />
      <Route
        path="/enrollments/register"
        isPrivate
        component={EnrollmentsRegister}
      />
      <Route path="/help-orders/list" isPrivate component={HelpOrdersList} />
      <Route path="/plans/list" isPrivate component={PlansList} />
      <Route path="/plans/register" isPrivate component={PlansRegister} />
      <Route path="/plans/update" isPrivate component={PlansUpdate} />
      <Route path="/students/update" isPrivate component={StudentsUpdate} />
      <Route path="/students/list" isPrivate component={StudentsList} />
      <Route path="/students/register" isPrivate component={StudentsRegister} />
    </Switch>
  )
}
