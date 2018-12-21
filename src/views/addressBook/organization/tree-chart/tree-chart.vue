<style >
    .tree-container{
        background-color: #fff;
        min-height: 500px
    }
</style>

<template>
    <div class="tree-container" id="chartContainerId"></div>
</template>

<script>
require('orgchart')
export default {
    
    data(){
        return {

        };
    },

    created(){
       
    },
    mounted(){
            var datasource = {
      'name': 'Lao Lao',
      'title': 'general manager',
      'office': '白城',
      'children': [
        { 'name': 'Bo Miao', 'title': 'department manager', 'office': '北京' },
        { 'name': 'Su Miao', 'title': 'department manager', 'office': '北戴河',
          'children': [
            { 'name': 'Tie Hua', 'title': 'senior engineer', 'office': '北戴河' },
            { 'name': 'Hei Hei', 'title': 'senior engineer', 'office': '北戴河' }
          ]
        },
        { 'name': 'Yu Jie', 'title': 'department manager', 'office': '长春' },
        { 'name': 'Yu Li', 'title': 'department manager', 'office': '长春' },
        { 'name': 'Hong Miao', 'title': 'department manager', 'office': '长春' },
        { 'name': 'Yu Wei', 'title': 'department manager', 'office': '长春' },
        { 'name': 'Chun Miao', 'title': 'department manager', 'office': '长春' },
        { 'name': 'Yu Tie', 'title': 'department manager', 'office': '长春' }
      ]
    };

    var nodeTemplate = function(data) {
      return `
        <div><img src="resources/images/icon/user.png" width=30></div>
        <span class="office">${data.office}</span>
        <div class="title">${data.name}</div>
        <div class="content">${data.title}</div>
      `;
    };

    var oc = $('#chartContainerId').orgchart({
      'data' : datasource,
      'nodeTemplate': nodeTemplate
    });
    }

   

}
</script>