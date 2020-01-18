<template>
<div id="home">
    <ul>
        <li><h4>Employees</h4></li>
        <li v-for="employee in employees" v-bind:key="employee.id" class="">
            <div>{{ employee.dept }}</div>{{ employee.employee_id }} : {{ employee.name }}
            <router-link class=""
            v-bind:to="{ name:'view-employee', params: { employee_id: employee.employee_id } }">
                <i class="fa fa-eye"></i>
            </router-link>
        </li>
    </ul>
    <div class="fixed-action-btn">
        <router-link to="/new" class="btn-floating btn-large red">
            <i class="fa fa-plus"></i>
        </router-link>
    </div>
</div>
</template>

<script>
import db from './firebaseInit'
export default {
    name : 'home',
    data() {
        return {
            employees: []
        }
    },
    created () {
        db.collection('employees').orderBy('dept').get().then(querySnapshot => {
            querySnapshot.forEach(doc => {
                const data = {
                    'id' : doc.id,
                    'employee_id' : doc.data().employee_id,
                    'name' : doc.data().name,
                    'dept' : doc.data().dept,
                    'position' : doc.data().position
                }
                this.employees.push(data)
            })
        })
    }
}
</script>
