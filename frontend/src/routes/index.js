import React from 'react'
import { Switch } from 'react-router-dom'
import Route from '~/routes/route'
// import { Container } from './styles';

import EnrollmentsEdit from '~/pages/EnrollmentsEdit'
import EnrollmentsList from '~/pages/EnrollmentsList'
import EnrollmentsRegister from '~/pages/EnrollmentsRegister'
import HelpOrdersAnswer from '~/pages/HelpOrdersAnswer'
import HelpOrdersList from '~/pages/HelpOrdersList'
import PlansList from '~/pages/PlansList'
import PlansRegister from '~/pages/PlansRegister'
import SignIn from '~/pages/SignIn'
import StudentsEdit from '~/pages/StudentsEdit'
import StudentsList from '~/pages/StudentsList'
import StudentsRegister from '~/pages/StudentsRegister'

export default function routes() {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />
      <Route path="/enrollments/edit" isPrivate component={EnrollmentsEdit} />
      <Route path="/enrollments/list" isPrivate component={EnrollmentsList} />
      <Route
        path="/enrollments/register"
        isPrivate
        component={EnrollmentsRegister}
      />
      <Route
        path="/help-orders/answer"
        isPrivate
        component={HelpOrdersAnswer}
      />
      <Route path="/help-orders/list" isPrivate component={HelpOrdersList} />
      <Route path="/plans/list" isPrivate component={PlansList} />
      <Route path="/plans/register" isPrivate component={PlansRegister} />
      <Route path="/students/edit" isPrivate component={StudentsEdit} />
      <Route path="/students/list" isPrivate component={StudentsList} />
      <Route path="/students/register" isPrivate component={StudentsRegister} />
    </Switch>
  )
}
