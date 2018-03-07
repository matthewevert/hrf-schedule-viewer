<template>
  <div class="container">

    <h1 class="title is-1">Test</h1>

    <br>
    <!-- {{team}} -->
    <div class="columns">

      <div class="column">
        <h2 class="title is-3">Team</h2>
        <ul>
          <li v-for="member in team" :key="member.id">
            {{member.id}} - {{member.attributes.first_name}}
          </li>
        </ul>
      </div>

      <div class="column">
        <h2 class="title is-3">Upcoming Services</h2>
        <ul>
          <li v-for="plan in plans" :key="plan.id">
            {{plan.id}} - {{plan.attributes.dates}}
          </li>
        </ul>
      </div>

    </div>

  </div>
</template>

<script>
// import request from 'request'
import axios from 'axios'
export default {
  name: 'HelloWorld',
  data () {
    return {
      plans: {},
      team: {}
    }
  },
  props: {
  },
  methods: {
    loadWorshipTeam: function () {
      let self = this
      var method = 'GET'
      // var headers = {'User-Agent': 'curl'}
      var auth = { username: '46058fc292d4df0a7bc79919e0e1f6083ba644f21d1345090c37bbc20ec44527', password: 'fc55679cfbab130232a2680afc587fb5eb1be270d86f74ccc82eeedb6acd903e' }
      var url = 'https://api.planningcenteronline.com/services/v2/teams/1074188/people/'
      var options = {
        method: method,
        url: url,
        /* headers: headers, */
        auth: auth
      }
      // get worship team
      axios.get(url, options)
        .then(function (response) {
          console.log('team members: ' + response.data.data.length)
          var teamArray = response.data.data
          for (var index in teamArray) {
            console.log('member: ' + JSON.stringify(teamArray[index].id))
            self.team[teamArray[index].id] = teamArray[index]
          }
          var newObj = {}
          var oldObj = self.team
          self.team = {}
          self.team = Object.assign(oldObj, newObj)
          // self.testFunc()
        })
        .catch(function (error) {
          console.log('error: ' + error)
        })
    },
    loadUpcomingServices: function () {
      let self = this
      var method = 'GET'
      // var headers = {'User-Agent': 'curl'}
      var auth = { username: '46058fc292d4df0a7bc79919e0e1f6083ba644f21d1345090c37bbc20ec44527', password: 'fc55679cfbab130232a2680afc587fb5eb1be270d86f74ccc82eeedb6acd903e' }
      var url = 'https://api.planningcenteronline.com/services/v2/service_types/299966/plans?filter=future&order=created_at'
      var options = {
        method: method,
        url: url,
        /* headers: headers, */
        auth: auth
      }
      // get upcoming services
      axios.get(url, options)
        .then(function (response) {
          console.log('plans: ' + response.data.data.length)
          var planArray = response.data.data
          for (var index in planArray) {
            console.log('plan: ' + JSON.stringify(planArray[index].id))
            self.plans[planArray[index].id] = planArray[index]
          }
          var newObj = {}
          var oldObj = self.plans
          self.plans = {}
          self.plans = Object.assign(oldObj, newObj)
        })
        .catch(function (error) {
          console.log('error: ' + error)
        })
    }
  },
  mounted () {
    this.loadWorshipTeam()
    this.loadUpcomingServices()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
</style>
