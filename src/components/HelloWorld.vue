<template>
  <div class="container">

    <br>

    <ul>
      <li v-for="plan in plans" :key="plan.id">
        <h1 class="title is-3">
          <span>{{plan.attributes.dates}}</span>
        </h1>
        <h2 class="subtitle is-5">
          <span>{{plan.id}}</span>
        </h2>
        <!-- <p>{{plans2[plan.id]}}</p> -->
        <ul>
          <li v-for="item in plans2[plan.id].data" v-if="item.attributes.item_type === 'song'" :key="item.id">
            {{item.attributes.title}}
          </li>
        </ul>
        <br><br>
      </li>
    </ul>

  </div>
</template>

<script>
// import request from 'request'
import axios from 'axios'
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      plans: [],
      plans2: {}
    }
  },
  props: {
  },
  mounted () {
    // console.log('outside - plans: ' + this.plans)
    var method = 'GET'
    // var headers = {'User-Agent': 'curl'}
    var auth = { username: '46058fc292d4df0a7bc79919e0e1f6083ba644f21d1345090c37bbc20ec44527', password: 'fc55679cfbab130232a2680afc587fb5eb1be270d86f74ccc82eeedb6acd903e' }
    let self = this
    var url = 'https://api.planningcenteronline.com/services/v2/service_types/299966/plans?filter=future&order=created_at'
    var options = {
      method: method,
      url: url,
      /* headers: headers, */
      auth: auth
    }
    axios.get(url, options)
      .then(function (response) {
        // console.log('success: ' + response)
        var plans = response.data
        // console.log('self.plans: ' + self.plans)
        for (var a = 0; a < plans.data.length; a++) {
          console.log('Getting items for plan: ' + plans.data[a].id)
          self.plans.push(plans.data[a])
          self.plans2[plans.data[a].id] = plans.data[a]
          var url = 'https://api.planningcenteronline.com/services/v2/service_types/299966/plans/' + plans.data[a].id + '/items?include=song,arrangement,key'
          var options = {
            method: 'GET',
            url: url,
            auth: { username: '46058fc292d4df0a7bc79919e0e1f6083ba644f21d1345090c37bbc20ec44527', password: 'fc55679cfbab130232a2680afc587fb5eb1be270d86f74ccc82eeedb6acd903e' }
          }
          axios.get(url, options)
            .then(function (response) {
              // console.log('success 2: ' + response)
              // console.log(response.data.meta.parent)
              // console.log('selfplans2: ' + self.plans2)
              self.plans2[response.data.meta.parent.id] = response.data
              var newObj = {}
              var oldObj = self.plans2
              self.plans2 = {}
              self.plans2 = Object.assign(oldObj, newObj)
            })
            .catch(function (error) {
              console.log('error 2: ' + error)
            })
        }
      })
      .catch(function (error) {
        console.log('error: ' + error)
      })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
</style>
