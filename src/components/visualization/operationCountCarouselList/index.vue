<template>
  <div style="height: 100%; width: 100%;">
    <dv-border-box-13>
      <div>
        <dv-decoration-7 style="width:100%;height:50px; font-size: 18px;color:rgba(0,234,255,0.96);">{{title}}</dv-decoration-7>
        <div style="height: 100%;width: 100%; display: flex; justify-content: center; align-items: center;">
          <dv-scroll-board
            :config="config"
            style="height: 33vh;width: 90%;color:rgba(0,216,255,0.98);"
          />
        </div>
      </div>
    </dv-border-box-13>
  </div>
</template>


<script>
import {getDepartment, getPost} from "@/api/select";
import {mapGetters} from "vuex";
import {
   getDepartmentBusinessSonSystemAllCount,
  getSecondProtectedBusinessSonSystem
} from '@/api/dashboard'

export default {
  data() {
    return {
      title: '',
      config: {},
      listData: [],
      postAllName: [],
      BusinessSonSystemAllCount: [],
      SecondProtectedBusinessSystemAllCount: []
    }
  },
  computed: {
    ...mapGetters([
      'roleid',
      'role_department_id',
      'role_name',
      'roles'
    ])
  },
  mounted() {
    this.initDataByCurrentRole()
  },
  methods: {
    async handelPostCountData() {
      const response = await getPost();
      return response.data.items.map(item => ({ postName: item.postName }));
    },
    async handleDepartmentCountData() {
      let list = []
      let result = []
      await getDepartment(this.roleid).then(response => {
        list = response.data.items
      })
      for (let i = 0; i < list.length; i++) {
        result.push({ departmentName: list[i].departmentName })
      }
      return result
    },
    async handlePostOrDepartmentBusinessSonSystemAllCount() {
      let list = []
      let result = []
      await getDepartmentBusinessSonSystemAllCount().then((response) => {
        list = response.data.items
        console.log("response",response)
      })
      for (let i = 0; i < list.length; i++) {
        result.push({ name: list[i].name, value: list[i].total })
      }
      return result
    },
    async handleSecondProtectedBusinessSystemCount() {
      let list = []
      let result = []
      await getSecondProtectedBusinessSonSystem().then((response) => {
        list = response.data.items
      })
      for (let i = 0; i < list.length; i++) {
        result.push({ name: list[i].name, value: list[i].total })
      }
      return result
    },
    async initDataByCurrentRole() {
      if (this.roles[0] === '超级管理员') {
        this.title = '各单位业务子系统/等保二级'
        // 获取所有单位名字
        this.postAllName = await this.handelPostCountData()
        // 获取各单位业务子系统数量
        this.BusinessSonSystemAllCount = await this.handlePostOrDepartmentBusinessSonSystemAllCount()
        // 获取各单位等保二级数量
        this.SecondProtectedBusinessSystemAllCount = await this.handleSecondProtectedBusinessSystemCount()
        // 根据已知数据构建listData数组
        this.listData = this.postAllName.map(post => {
          // 查找对应单位业务子系统数量
          const BusinessSonSystemCountObj = this.BusinessSonSystemAllCount.find(item => item.name === post.postName)
          // 查找对应单位等保二级数量
          const SecondProtectedBusinessSystemObj = this.SecondProtectedBusinessSystemAllCount.find(item => item.name === post.postName)

          // 获取业务子系统数量和等保二级数量，如果找不到对应项，默认为0
          const BusinessSonSystemCount = BusinessSonSystemCountObj ? BusinessSonSystemCountObj.value : 0
          const SecondProtectedBusinessSystemCount = SecondProtectedBusinessSystemObj ? SecondProtectedBusinessSystemObj.value : 0

          // 返回组合的对象
          return {
            postName: post.postName,
            BusinessSonSystemCount: BusinessSonSystemCount,
            SecondProtectedBusinessSystemCount: SecondProtectedBusinessSystemCount
          }
        })
        //按BusinessSonSystemCount业务子系统数量降序排序
        this.listData.sort((a, b) => {
          return b.BusinessSonSystemCount - a.BusinessSonSystemCount
        })
        //↓当业务子系统数量=0时自动过滤，不计入轮播表
        this.listData = this.listData.filter(item => item.BusinessSonSystemCount !== 0);
        console.log(this.listData)
        this.config = {
          data: this.listData.map(item => [item.postName, item.BusinessSonSystemCount,item.SecondProtectedBusinessSystemCount]),
          header: ['单位名称', '业务子系统数量', '等保二级数量'],
          align: 'center',
          headerHeight: 35,
          rowNum: 8,
          columnWidth: [200, 150, 150],
          waitTime: 2000,
          headerBGC: 'rgba(25,255,220,0.15)',
          oddRowBGC: 'rgba(0,216,255,0.3)',
          evenRowBGC: 'rgba(0,216,255,0.22)',
          scrollable: true,
          carousel: 'single'
        }
      } else {
        this.title = '各部门业务子系统/等保二级'
        // 获取所有部门名字
        this.departmentAllName = await this.handleDepartmentCountData()
        // 获取各部门业务子系统数量
        this.BusinessSonSystemAllCount = await this.handlePostOrDepartmentBusinessSonSystemAllCount()
        // 获取各单位等保二级数量
        this.SecondProtectedBusinessSystemAllCount = await this.handleSecondProtectedBusinessSystemCount()

        // 根据已知数据构建listData数组
        this.listData = this.departmentAllName.map(department => {
          // 查找对应单位设备总数
          const BusinessSonSystemCountObj = this.BusinessSonSystemAllCount.find(item => item.name === department.departmentName)
          // 查找对应单位国产设备总数
          const SecondProtectedBusinessSystemObj = this.SecondProtectedBusinessSystemAllCount.find(item => item.name === department.departmentName)

          // 获取设备总数和国产设备总数，如果找不到对应项，默认为0
          const BusinessSonSystemCount = BusinessSonSystemCountObj ? BusinessSonSystemCountObj.value : 0
          const SecondProtectedBusinessSystemCount = SecondProtectedBusinessSystemObj ? SecondProtectedBusinessSystemObj.value : 0
          // 返回组合的对象
          return {
            departmentName: department.departmentName,
            BusinessSonSystemCount: BusinessSonSystemCount,
            SecondProtectedBusinessSystemCount: SecondProtectedBusinessSystemCount
          }
        })
        //按equipmentCount降序排序
        this.listData.sort((a, b) => {
          return b.BusinessSonSystemCount - a.BusinessSonSystemCount
        })
        this.listData = this.listData.filter(item => item.BusinessSonSystemCount !== 0);
        this.config = {
          data: this.listData.map(item => [item.departmentName, item.BusinessSonSystemCount, item.SecondProtectedBusinessSystemCount]),
          header: ['部门名称', '业务子系统数量', '等保二级数量'],
          align: 'center',
          headerHeight: 35,
          rowNum: 8,
          columnWidth: [200],
          waitTime: 2000,
          headerBGC: 'rgba(25,255,220,0.15)',
          oddRowBGC: 'rgba(0,216,255,0.3)',
          evenRowBGC: 'rgba(0,216,255,0.22)',
          carousel: 'single',
        }
      }
    }
  }
}
</script>

<style scoped>
</style>
